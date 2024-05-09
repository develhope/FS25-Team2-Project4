import classes from "./IngredientCard.module.scss"
import { MaterialSymbol } from "react-material-symbols"

export function IngredientCard({ label, bgColor, isSelected = true }) {
    const bg = {
        backgroundColor: bgColor,
    }

    return (
        <div
            className={`${classes.ingredientCard}  ${isSelected ? classes.selected : classes.unselected}`}
        >
            <div style={bg} className={classes.header}>
                <MaterialSymbol className={classes.checkIco} icon="check_circle" size={24} grade={24} />

                <p>{label}</p>
                <div className={classes.closeIco}>
                    <MaterialSymbol icon="close" size={24} grade={24} />
                </div>
            </div>
        </div>
    )
}
