import { useEffect, useMemo, useState } from "react";
import { useManageIngredients } from "../../../pages/Discovery/IngredientsContext";

export function useIngredientSearch(isFixed) {
    const {
        ing,
        blackList,
        selectedIng,
        handleDeselectAll,
        handleIngUpdate,
        setRefresh,
    } = useManageIngredients();

    const [inputValues, setInputValues] = useState({ initial: "", current: "" });
    const [searchState, setSearchState] = useState({ inputActive: false });
    const [suggestions, setSuggestions] = useState(ing);
    const [fixedPosition, setFixedPosition] = useState(false);
    const [cardState, setCardState] = useState({
        id: null,
        label: null,
        bgColor: null,
        isSelected: null,
        isBlacklisted: null,
    });

    useEffect(() => {
        setSuggestions(ing);
    }, [searchState.inputActive, selectedIng]);

    useMemo(() => {
        setSuggestions(ing);
    }, [ing]);

    const handleInputActivation = (e) => {
        e.stopPropagation();
        isFixed && setFixedPosition(true);
        setSearchState({ inputActive: true });
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value.toUpperCase();
        setInputValues((prev) => ({ ...prev, current: e.target.value }));
        setSuggestions(ing.filter((ingredient) => ingredient.name.toUpperCase().includes(inputValue)));
    };

    const handleSuggestionClick = (e, prop, cardState, setCardState) => {
        e.stopPropagation();
        console.log(cardState.label);
        setInputValues((prev) => ({ ...prev, current: cardState.label }));
        console.log(inputValues);
        if (prop === "isBlackListed") {
            setTimeout(() => {
                handleIngUpdate(prop, cardState, setCardState);
            }, 0);
        } else if (prop === "isSelected" && selectedIng.length < 8) {
            setTimeout(() => {
                handleIngUpdate(prop, cardState, setCardState);
            }, 0);
        } else {
            // snackbar di avviso che spunta dal basso
            console.log("maximum number of ingredient reached!");
        }
        setSearchState({ inputActive: false });
        setTimeout(() => {
            setRefresh((b) => !b);
        }, 25);
        setInputValues((prev) => ({ ...prev, current: "" }));
    };

    const handleInputDeactivation = (prop) => {
        console.log("gogo");
        let firstAvailableIngredient;
        const isInDatabase = ing.filter(
            (ingredient) =>
                ingredient.name.toUpperCase().includes(inputValues.current.toUpperCase()) &&
                !ingredient.isSelected &&
                !ingredient.isBlackListed
        );
        if (prop === "isBlackListed") {
            const isAlreadyBL = blackList.filter((blIngredient) =>
                isInDatabase.some(
                    (dbIngredient) =>
                        dbIngredient.id === blIngredient.id ||
                        dbIngredient.name.toUpperCase() === blIngredient.name.toUpperCase()
                )
            );
            firstAvailableIngredient = isInDatabase.find(
                (dbIngredient) => !isAlreadyBL.some((blIngredient) => blIngredient.id === dbIngredient.id)
            );
        } else if (prop === "isSelected" && selectedIng.length < 8) {
            const isAlreadySelected = selectedIng.filter((selectedIng) =>
                isInDatabase.some(
                    (dbIngredient) =>
                        dbIngredient.id === selectedIng.id ||
                        dbIngredient.name.toUpperCase() === selectedIng.name.toUpperCase()
                )
            );
            firstAvailableIngredient = isInDatabase.find(
                (dbIngredient) => !isAlreadySelected.some((blIngredient) => blIngredient.id === dbIngredient.id)
            );
        } else {
            // snackbar di avviso che spunta dal basso
            console.log("maximum number of ingredient reached!");
        }
        if (inputValues.current !== "" && firstAvailableIngredient) {
            setInputValues((prev) => ({ ...prev, current: "" }));
            setSearchState({ inputActive: false });
            handleIngUpdate(prop, firstAvailableIngredient, setCardState);
            setRefresh((b) => !b)
        } else {
            setInputValues((prev) => ({ ...prev, current: "" }));
            setSearchState({ inputActive: false });
        }
        setSuggestions(ing.filter((ing) => !ing.isBlacklisted));
        isFixed && setFixedPosition(false);
    };

    const handlePressEnter = (e) => {
        if (e.keyCode === 13) {
            e.target.blur();
        }
    };

    const handleXClick = (e) => {
        e.stopPropagation();
        setSearchState({ inputActive: false });
    };

    const handleReset = (prop, cardState, setCardState) => {
        handleDeselectAll(prop, cardState, setCardState);
    };

    return {
        handleInputActivation,
        handleInputChange,
        handleInputDeactivation,
        handleSuggestionClick,
        handlePressEnter,
        handleXClick,
        handleReset,
        setInputValues,
        inputValues,
        searchState,
        suggestions,
        fixedPosition,
    };
}
