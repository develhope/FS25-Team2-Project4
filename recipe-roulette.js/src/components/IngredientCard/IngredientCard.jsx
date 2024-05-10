import classes from "./IngredientCard.module.scss"
import { MaterialSymbol } from "react-material-symbols"
import { useIngredientCard } from "./useIngredientCard"

export function IngredientCard({ label = "ingredient", bgColor, isSelected = false }) {
    const {
        handleIngredientSelect,
        handleInputActivation,
        handleInputChange,
        handleInputDeactivation,
        handlePressEnter,
        selectSate,
        inputValues,
    } = useIngredientCard(label, isSelected)

    const bg = {
        backgroundColor: bgColor,
    }

    return (
        <div
            onClick={handleIngredientSelect}
            className={`${classes.ingredientCard}  ${selectSate ? classes.selected : classes.unselected}`}
        >
            <div style={bg} className={classes.header}>
                <MaterialSymbol
                    className={classes.checkIco}
                    icon="check_circle"
                    size={24}
                    grade={24}
                />

                {/* da trasformare in input */}
                <input
                    style={{bgColor}}
                    type="text"
                    onClick={handleInputActivation}
                    onBlur={handleInputDeactivation}
                    onKeyDown={handlePressEnter}
                    onChange={handleInputChange}
                    value={inputValues.current}
                />

                <div className={classes.closeIco}>
                    <MaterialSymbol icon="close" size={24} grade={24} />
                </div>
            </div>
        </div>
    )
}
