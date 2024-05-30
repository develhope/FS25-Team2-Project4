import { MaterialSymbol } from "react-material-symbols"
import { IngredientCard } from "../../components/IngredientCard/IngredientCard"
import { IngredientSearch } from "../../components/Search/SearchBar/IngredientSearch"
import { useManageIngredients } from "../Discovery/IngredientsContext"
import { Snackbar } from "../../components/Snackbar/Snackbar"

import classes from "./Discovery.module.scss"
import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { Button } from "../../components/Buttons/Button/Button"
import { IcoButton } from "../../components/Buttons/IcoButton/IcoButton"

import { useButtonState } from "../../hooks/ButtonState/useButtonState"
import { useMemo } from "react"

export function Discovery({ handleSidebarToggle }) {
    const { displayedIng, shuffleIng, handleIngIncrement, handleDeselectAll } = useManageIngredients()
    const { animate } = useAnimate()
    const { isActive, setIsActive } = useButtonState(true)

    const setButtonState = useMemo(() => {
        if (displayedIng.length === 8) {
            setIsActive(false)
        } else {
            setIsActive(true)
        }
    }, [displayedIng.length])

    return (
        <div className={`${classes.discoveryPage} ${animate && classes.animateDiscovery}`}>
            <div className={classes.contentWrapper}>
                <div className={classes.globalActions}>
                    <IngredientSearch isFixed={true} searchCriteria="isSelected" />
                    <IcoButton action={() => handleSidebarToggle()} icon="tune" size={20} />
                    <IcoButton action={() => handleDeselectAll("isSelected")} icon="lock_reset" size={22} />
                </div>
                <div className={classes.ingredientsWrapper}>
                    {displayedIng.length > 0 &&
                        displayedIng.map((ing) => {
                            return <IngredientCard key={ing.id} ing={ing} />
                        })}
                </div>
            </div>

            <div className={classes.bottomButtons}>
                <Button
                    width={"fill"}
                    active={isActive}
                    action={() => handleIngIncrement()}
                    label="Ingredient"
                    icon="add"
                    size={18}
                    iconWheight={600}
                />
                <button className={classes.cycleButton} onClick={() => shuffleIng()}>
                    {" "}
                    <MaterialSymbol className={classes.ico} icon="cycle" weight={600} size={18} grade={18} />
                </button>

                <Button
                    width={"fill"}
                    active={true}
                    action={() =>
                        console.log(
                            `Find 5 ${["(filters)"]} recipes with these ingredients`,
                            displayedIng.map((ing) => ing.name)
                        )
                    }
                    label="Recipes"
                    icon="frame_inspect"
                    size={20}
                />
            </div>
            <Snackbar />
        </div>
    )
}
