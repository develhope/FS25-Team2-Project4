import React, { useCallback, useEffect, useRef } from "react"

import { BaseSearchSuggestion } from "./BaseSearchSuggestion"
import { useBaseSearch } from "./useBaseSearch"

import CloseIcon from "@mui/icons-material/Close"
import SearchIcon from "@mui/icons-material/Search"

import classes from "./BaseSearch.module.scss"

export function BaseSearch({ data = [], inputValue = "", setInputValue }) {
    const { handleBlur, handlePressEnter, handleInputActivation, setCondition, condition, isFocused } =
        useBaseSearch(setInputValue)

    const inputRef = useRef(null)
    // Handle back button when fixedPosition is true
    const handleBackButton = useCallback(
        (event) => {
            if (isFocused) {
                event.preventDefault()
                if (inputRef.current) {
                    inputRef.current.blur()
                    handleBlur(event) // Update the focus state
                    setCondition(true)
                }
            }
        },
        [isFocused]
    )

    useEffect(() => {
        if (isFocused && condition) {
            window.history.pushState(null, document.title, window.location.href)
            window.addEventListener("popstate", handleBackButton)
            setCondition(false)
        } else if (isFocused) {
            window.history.replaceState(null, document.title, window.location.href)
            window.addEventListener("popstate", handleBackButton)
        } else {
            window.removeEventListener("popstate", handleBackButton)
        }

        return () => {
            window.removeEventListener("popstate", handleBackButton)
        }
    }, [isFocused, handleBackButton])

    return (
        <div className={`${classes.baseSearch} ${isFocused && classes.baseSearchActive}`}>
            <div className={classes.searchBar}>
                <input
                    ref={inputRef}
                    autoComplete="off"
                    className={classes.input}
                    onKeyDown={(e) => handlePressEnter(e)}
                    onClick={handleInputActivation}
                    onChange={(e) => setInputValue(e.target.value)}
                    onBlur={(e) => handleBlur(e)}
                    value={inputValue}
                    type="text"
                    placeholder="Search a recipe"
                />
                <div
                    onMouseDown={(e) => {
                        if (isFocused && inputValue !== "") {
                            e.stopPropagation()
                            e.preventDefault()
                            setInputValue("")
                        } else if (isFocused && inputValue === "") {
                            e.stopPropagation()
                            handleBlur(e)
                            inputRef.current.blur()
                        } else if (!isFocused && inputValue !== "") {
                            e.stopPropagation()
                            e.preventDefault()
                            setInputValue("")
                        }
                    }}
                    className={classes.ico}
                >
                    {isFocused || inputValue !== "" ? <CloseIcon fontSize="small" /> : <SearchIcon fontSize="small" />}
                </div>
            </div>
            <div className={classes.suggestionsWrapper}>
                {data.length > 0 ? (
                    data.map((recipe) => (
                        <BaseSearchSuggestion
                            inputRef={inputRef}
                            key={recipe.id}
                            id={recipe.id}
                            handleBlur={handleBlur}
                            setInputValue={setInputValue}
                            title={recipe.title}
                        />
                    ))
                ) : (
                    <div className={classes.placeholder}>
                        <h2>
                            There is <span>no recipe</span> <br />
                            matching your search!
                        </h2>
                        <div className={classes.placeholderImage}>
                            <img src="../src/assets/images/undraw_cancel_re_pkdm 1.svg" alt="" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
