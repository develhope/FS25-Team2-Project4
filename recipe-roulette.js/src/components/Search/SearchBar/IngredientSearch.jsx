import React, { useEffect, useCallback, useRef } from "react";
import classes from "./IngredientSearch.module.scss";
import { useIngredientSearch } from "./useIngredientSearch";
import { IngredientSuggestions } from "../Suggestions/IngredientSuggestions";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export function IngredientSearch({ isFixed = false, searchCriteria = "isBlackListed" }) {
    const {
        suggestions,
        inputValues,
        searchState,
        fixedPosition,
        handlePressEnter,
        handleInputChange,
        handleInputActivation,
        handleBlur,
        handleXClick,
    } = useIngredientSearch(isFixed, searchCriteria);

    const inputRef = useRef(null);

    // Handle back button when fixedPosition is true
    const handleBackButton = useCallback((event) => {
        if (fixedPosition) {
            event.preventDefault();
            window.history.pushState(null, document.title, window.location.href);
            console.log('Back button pressed, but navigation prevented due to fixed position.');
            if (inputRef.current) {
                inputRef.current.blur();
            }
        }
    }, [fixedPosition]);

    useEffect(() => {
        if (fixedPosition) {
            window.history.pushState(null, document.title, window.location.href);
            window.addEventListener('popstate', handleBackButton);
        }

        return () => {
            window.removeEventListener('popstate', handleBackButton);
        };
    }, [fixedPosition, handleBackButton]);

    return (
        <div className={`${fixedPosition && classes.positionFixed} ${classes.search}`}>
            <div className={`${classes.searchBar} ${searchState.inputActive ? classes.inputActive : classes.inputInactive}`}>
                <input
                    ref={inputRef}
                    autoComplete="off"
                    className={classes.header}
                    onClick={handleInputActivation}
                    placeholder={`${searchCriteria === "isSelected" ? "Add an ingredient" : "Blacklist an ingredient"}`}
                    name="search"
                    type="text"
                    onBlur={(e) =>
                        setTimeout(() => {
                            handleBlur(e);
                        }, 0)
                    }
                    onKeyDown={(e) => handlePressEnter(e)}
                    onChange={handleInputChange}
                    value={inputValues.current}
                />
                {!searchState.inputActive && (
                    <div className={`${classes.ico} ${classes.searchIco}`}>
                        <SearchOutlinedIcon fontSize="small" />
                    </div>
                )}

                {searchState.inputActive && (
                    <div onClick={(e) => handleXClick(e)} className={`${classes.ico} ${classes.closeIco}`}>
                        <CloseOutlinedIcon fontSize="small" />
                    </div>
                )}
            </div>
            <IngredientSuggestions
                inputActive={searchState.inputActive}
                searchCriteria={searchCriteria}
                suggestions={suggestions}
            />
        </div>
    );
}
