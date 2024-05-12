import classes from "./IngredientCard.module.scss"
import { MaterialSymbol } from "react-material-symbols"
import { useIngredientCard } from "./useIngredientCard"
import { useEffect } from "react"
import { useManageIngredients } from "../../pages/Discovery/IngredientsContext"


export function IngredientCard({
    id,
    label = "ingredient",
    bgColor = "#fbfbfb",
    isSelected = false,
}) {
    const {
        handleInputActivation,
        handleInputChange,
        handleInputDeactivation,
        handlePressEnter,
        inputValues,
    } = useIngredientCard(label, isSelected, id, bgColor)

    const { handleIngredientUpdate } = useManageIngredients()
    const bg = {
        backgroundColor: bgColor,
    }
    useEffect(() => {
        isSelected, bgColor, id, label
    }, [isSelected, bgColor, id, label])

    return (
        <div
            onClick={() => handleIngredientUpdate(!isSelected, id)}
            className={`${classes.ingredientCard}  ${isSelected ? classes.selected : classes.unselected}`}
        >
            <div style={bg} className={classes.header}>
                <div className={classes.leftItems}>
                    <MaterialSymbol
                        className={classes.checkIco}
                        icon="check_circle"
                        size={24}
                        grade={24}
                    />

                    <input
                        style={{ bgColor }}
                        type="text"
                        placeholder={inputValues.initial}
                        onClick={handleInputActivation}
                        onBlur={handleInputDeactivation}
                        onKeyDown={handlePressEnter}
                        onChange={handleInputChange}
                        value={inputValues.current}
                    />
                </div>

                <div className={classes.closeIco}>
                    <MaterialSymbol icon="close" size={24} grade={24} />
                </div>
            </div>
        </div>
    )
}
