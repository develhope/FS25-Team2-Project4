import React, { useEffect, useCallback, useRef, useState } from "react"
import { useIngredientSearch } from "./useIngredientSearch"
import { IngredientSuggestions } from "../Suggestions/IngredientSuggestions"

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"

import classes from "./IngredientSearch.module.scss"

export function IngredientSearch({ isFixed = false, sidebarSearch = false, searchCriteria = "isBlackListed" }) {
    const {
        suggestions,
        inputValues,
        searchState,
        fixedPosition,
        condition,
        setCondition,
        handlePressEnter,
        handleInputChange,
        handleInputActivation,
        handleBlur,
        handleXClick,
    } = useIngredientSearch(isFixed, searchCriteria)

    const inputRef = useRef(null)

    // Handle back button when fixedPosition is true
    const handleBackButton = useCallback(
        (event) => {
            if (searchState.inputActive) {
                event.preventDefault()
                if (inputRef.current) {
                    inputRef.current.blur()
                    handleBlur(event) // Update the focus state
                    setCondition(true)
                }
            }
        },
        [searchState.inputActive]
    )

    useEffect(() => {
        if (searchState.inputActive && condition) {
            window.history.pushState(null, document.title, window.location.href)
            window.addEventListener("popstate", handleBackButton)
            setCondition(false)
        } else if (searchState.inputActive) {
            window.history.replaceState(null, document.title, window.location.href)
            window.addEventListener("popstate", handleBackButton)
        } else {
            window.removeEventListener("popstate", handleBackButton)
        }

        return () => {
            window.removeEventListener("popstate", handleBackButton)
        }
    }, [searchState.inputActive, handleBackButton])

    return (
        <div
            className={`${fixedPosition && classes.positionFixed} ${fixedPosition && sidebarSearch && classes.sidebarSearch} ${classes.search}`}
        >
            <div className={`${classes.searchBar} ${searchState.inputActive ? classes.inputActive : classes.inputInactive}`}>
                <input
                    ref={inputRef}
                    autoComplete="off"
                    className={classes.header}
                    onClick={handleInputActivation}
                    placeholder={`${searchCriteria === "isSelected" ? "Add an ingredient" : "Blacklist an ingredient"}`}
                    name="search"
                    type="text"
                    onBlur={(e) => handleBlur(e)}
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
    )
}
