import classes from "./IngredientCard.module.scss"
import { MaterialSymbol } from "react-material-symbols"
import { useIngredientCard } from "./useIngredientCard"
import { useEffect } from "react"

export function IngredientCard({
    id,
    label = "ingredient",
    bgColor = "#fbfbfb",
    isSelected = false,
}) {
    const {
        handleIngredientSelect,
        handleInputActivation,
        handleInputChange,
        handleInputDeactivation,
        handlePressEnter,
        selectSate,
        inputValues,
    } = useIngredientCard(label, isSelected, id)

    const bg = {
        backgroundColor: bgColor,
    }
    useEffect(() => {
        isSelected = selectSate
    }, [selectSate])

    console.log(isSelected);
    return (
        <div
            onClick={handleIngredientSelect}
            className={`${classes.ingredientCard}  ${selectSate ? classes.selected : classes.unselected}`}
        >
            <div style={bg} className={classes.header}>
                <div className={classes.leftItems}>
                    <MaterialSymbol
                        className={classes.checkIco}
                        icon="check_circle"
                        size={24}
                        grade={24}
                    />

                    {/* da trasformare in input */}
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
