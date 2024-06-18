import { IngredientCard } from "../../components/IngredientCard/IngredientCard"
import { useManageIngredients } from "../Discovery/IngredientsContext"
import { Snackbar } from "../../components/Snackbar/Snackbar"
import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { Button } from "../../components/Buttons/Button/Button"
import { useButtonState } from "../../hooks/ButtonState/useButtonState"
import { useMemo, useState } from "react"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { useLocationHook } from "../../hooks/useLocationHook"

import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined"
import AddIcon from "@mui/icons-material/Add"
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined"
import classes from "./Discovery.module.scss"

export function Discovery() {
    const { displayedIng, shuffleIng, handleIngIncrement } = useManageIngredients()
    const {searchRecipeByIng} = useRecipesContext()

    const { isActive, setIsActive } = useButtonState(true)
    const [animateButton, seAnimateButton] = useState(false)

    const {location } = useLocationHook()
    const { animate } = useAnimate(location)

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
                    icon={<AddIcon fontSize="small" />}
                    size={18}
                    iconWheight={600}
                />
                <button
                    className={`${classes.cycleButton} ${animateButton && classes.cycleButtonAnimation}`}
                    onClick={() => {
                        seAnimateButton((b) => !b)
                        shuffleIng()
                    }}
                >
                    {" "}
                    <LoopOutlinedIcon fontSize="medium" />
                </button>

                <Button
                    link={"recipes-results"}
                    width={"fill"}
                    active={true}
                    action={() => searchRecipeByIng(displayedIng)}
                    label="Recipes"
                    icon={<ManageSearchOutlinedIcon fontSize="small" />}
                    size={20}
                />
            </div>
            <Snackbar />
        </div>
    )
}
