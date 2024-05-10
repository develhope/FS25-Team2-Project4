import { useState } from "react"
import classes from "./IngredientCard.module.scss"
import { MaterialSymbol } from "react-material-symbols"

export function IngredientCard({ label, bgColor, isSelected = true }) {
    const [selectSate, setSelectSate] = useState(isSelected)
    const bg = {
        backgroundColor: bgColor,
    }

    function handleIngredientClick() {
        setSelectSate((s) => !s)
    }
    return (
        <div
            onClick={handleIngredientClick}
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
                <p>{label}</p>

                <div className={classes.closeIco}>
                    <MaterialSymbol icon="close" size={24} grade={24} />
                </div>
            </div>
        </div>
    )
}
