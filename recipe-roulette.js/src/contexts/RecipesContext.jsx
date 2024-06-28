import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../hooks/Auth/useAuth";
import axios from "axios";

const RecipesContext = createContext();

function RecipeFilter({
    isVegetarian = false,
    isGlutenFree = false,
    isVegan = false,
    cuisineEthnicity = [
        "all",
        "italian",
        "french",
        "chinese",
        "japanese",
        "indian",
        "greek",
        "spanish",
        "mexican",
        "thai",
        "middle eastern",
    ],
    preparationTime = 9999,
    caloricApport = 9999,
} = {}) {
    this.isVegetarian = isVegetarian;
    this.isGlutenFree = isGlutenFree;
    this.isVegan = isVegan;
    this.cuisineEthnicity = cuisineEthnicity;
    this.preparationTime = preparationTime;
    this.caloricApport = caloricApport;
}

export const RecipesProvider = ({ children }) => {
    const [recipeFilter, setRecipeFilter] = useState(new RecipeFilter());
    const [recipes, setRecipes] = useState({
        results: [],
        favorited: [],
        filtered: [],
        searched: [],
        targetedRecipe: null,
    });

    const [inputValue, setInputValue] = useState("");
    const [recipeAnimation, setRecipeAnimation] = useState(true);
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    useEffect(() => {
        setInputValue("");
    }, [location.pathname]);

    useEffect(() => {
        setRecipes((prev) => ({
            ...prev,
            filtereAndSearched: prev.filtered.filter((rec) =>
                rec.title.toLowerCase().includes(inputValue.toLowerCase())
            ),
        }));
    }, [inputValue]);

    useEffect(() => {
        (async () => {
            try {
                const localRecipes = JSON.parse(window.localStorage.getItem("recipes")) || {};
                const sessionFilter = JSON.parse(window.localStorage.getItem("recipeFilter"));
                if (isAuthenticated) {
                    if (Object.keys(localRecipes).length) {
                        setRecipes(localRecipes);
                    }
                } else {
                    let { results = [], filtered = [], targetedRecipe, favorited = [] } = localRecipes;
                    results = results.map((rec) => ({ ...rec, isFavorited: false }));
                    filtered = filtered.map((rec) => ({ ...rec, isFavorited: false }));
                    if (targetedRecipe) targetedRecipe = { ...targetedRecipe, isFavorited: false };
                    favorited = favorited.map((rec) => ({ ...rec, isFavorited: false }));

                    setRecipes((prev) => ({
                        ...prev,
                        results: results.length ? results : prev.results,
                        filtered: filtered.length ? filtered : prev.filtered,
                        targetedRecipe: targetedRecipe || prev.targetedRecipe,
                        favorited: favorited.length ? favorited : prev.favorited,
                    }));

                    if (sessionFilter) setRecipeFilter(sessionFilter);
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, [location, isAuthenticated]);

    useEffect(() => {
        (async () => {
            try {
                const jsonFilters = JSON.stringify(recipeFilter);
                window.sessionStorage.setItem("recipeFilter", jsonFilters);
            } catch (error) {
                console.error(error);
            }
        })();

        if (recipeAnimation) setTimeout(() => setRecipeAnimation(false), 0);
        setTimeout(() => setRecipeAnimation(true), 300);
    }, [recipeFilter]);

    useEffect(() => {
        let filtering = recipes.favorited.filter(
            (rec) =>
                rec.caloricApport <= recipeFilter.caloricApport &&
                rec.preparationTime <= recipeFilter.preparationTime
        );

        if (recipeFilter.isGlutenFree)
            filtering = filtering.filter((item) => item.isGlutenFree);
        if (recipeFilter.isVegetarian)
            filtering = filtering.filter((item) => item.isVegetarian);
        if (recipeFilter.isVegan)
            filtering = filtering.filter((item) => item.isVegan);

        if (!recipeFilter.cuisineEthnicity.includes("all")) {
            filtering = filtering.filter((rec) =>
                recipeFilter.cuisineEthnicity.some((cuisine) =>
                    cuisine.toLowerCase() === rec.cuisineEthnicity.toLowerCase()
                )
            );
        }

        setRecipes((prev) => ({
            ...prev,
            filtered: filtering,
        }));
    }, [recipeFilter, recipes.favorited]);

    const handleRecipesUpdate = (recipeState, setRecipeState, location) => {
        if (location === "/recipes-results") {
            const updatedResults = recipes.results.map((recipe) =>
                recipe.id === recipeState.id
                    ? { ...recipe, isFavorited: !recipeState.isFavorited }
                    : recipe
            );

            const updatedResult = updatedResults.find((recipe) => recipe.id === recipeState.id);

            setRecipes((prev) => {
                const newFavorited = updatedResult.isFavorited
                    ? [...prev.favorited, updatedResult]
                    : prev.favorited.filter((rec) => rec.id !== recipeState.id);

                const updatedRecipes = {
                    ...prev,
                    results: updatedResults,
                    favorited: newFavorited,
                };

                if (isAuthenticated) {
                    window.localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
                }

                return updatedRecipes;
            });

            setRecipeState((prev) => ({ ...prev, isFavorited: updatedResult.isFavorited }));
        } else if (location === "/favorited") {
            setTimeout(() => {
                setRecipes((prev) => {
                    const newFavorited = prev.favorited.filter((rec) => rec.id !== recipeState.id);

                    const updatedRecipes = {
                        ...prev,
                        favorited: newFavorited,
                    };

                    if (isAuthenticated) {
                        window.localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
                    }

                    return updatedRecipes;
                });
            }, 300);
        }
    };

    const handleTargetedRecipe = async (recipe) => {
        if (recipe) {
            setRecipes((prev) => ({
                ...prev,
                targetedRecipe: recipe,
            }));

            if (isAuthenticated) {
                try {
                    const jsonRecipes = JSON.stringify(recipes);
                    localStorage.setItem("recipes", jsonRecipes);
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };

    const toggleRecipeFilter = (prop) => {
        setRecipeFilter((prevData) => ({
            ...prevData,
            [prop]: !recipeFilter[prop],
        }));
    };

    const handlePreferencesToggle = (filterType, value, handleSelected, selectedState) => {
        if (filterType === "caloricApport" || filterType === "preparationTime") {
            setRecipeFilter((prevData) => ({
                ...prevData,
                [filterType]: selectedState ? 9999 : value,
            }));
        } else if (filterType === "cuisineEthnicity") {
            let updatedEthnicity = [...recipeFilter.cuisineEthnicity];
            const alreadyThere = updatedEthnicity.find((cuisine) => cuisine.toLowerCase() === value);

            if (value === "all") {
                updatedEthnicity = recipeFilter.cuisineEthnicity.includes("all")
                    ? []
                    : [...new RecipeFilter().cuisineEthnicity];
                handleSelected(!recipeFilter.cuisineEthnicity.includes("all"));
            } else {
                updatedEthnicity = alreadyThere
                    ? updatedEthnicity.filter((item) => item !== value.toLowerCase() && item !== "all")
                    : [...updatedEthnicity, value.toLowerCase()];

                if (updatedEthnicity.length === 10) updatedEthnicity.push("all");
            }

            setRecipeFilter((prevData) => ({
                ...prevData,
                cuisineEthnicity: updatedEthnicity,
            }));
        }
    };

    const handleDeselectRecipeFilters = () => {
        setRecipeFilter(new RecipeFilter());
    };

    return (
        <RecipesContext.Provider
            value={{
                recipes,
                inputValue,
                recipeAnimation,
                recipeFilter,
                handleRecipesUpdate,
                handleTargetedRecipe,
                toggleRecipeFilter,
                setInputValue,
                handlePreferencesToggle,
                handleDeselectRecipeFilters,
                setRecipes,
            }}
        >
            {children}
        </RecipesContext.Provider>
    );
};

export const useRecipesContext = () => {
    return useContext(RecipesContext);
};
