import { IngredientCard } from "../../components/IngredientCard/IngredientCard"
import { useManageIngredients } from "../Discovery/IngredientsContext"
import { Snackbar } from "../../components/Snackbar/Snackbar"

import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { Button } from "../../components/Buttons/Button/Button"

import { useButtonState } from "../../hooks/ButtonState/useButtonState"
import { useMemo, useState } from "react"


import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined"
import AddIcon from "@mui/icons-material/Add"
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined"

import classes from "./Discovery.module.scss"

export function Discovery({ handleSidebarToggle }) {
    const { displayedIng, shuffleIng, handleIngIncrement, handleDeselectAll } = useManageIngredients()
    const { animate } = useAnimate()
    const { isActive, setIsActive } = useButtonState(true)
    const [animateButton, seAnimateButton] = useState(false)

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
                    action={() =>
                        console.log(
                            `Find 5 ${["(filters)"]} recipes with these ingredients`,
                            displayedIng.map((ing) => ing.name)
                        )
                    }
                    label="Recipes"
                    icon={<ManageSearchOutlinedIcon fontSize="small" />}
                    size={20}
                />
            </div>
            <Snackbar />
        </div>
    )
}
