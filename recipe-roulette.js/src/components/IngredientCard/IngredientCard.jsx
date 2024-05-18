import classes from "./IngredientCard.module.scss"
import { MaterialSymbol } from "react-material-symbols"
import { useIngredientCard } from "./useIngredientCard"
import { IngredientSearch } from "./IngredientSearch"

export function IngredientCard({ ing }) {
    const { handleIngredientClick, handleXClick, cardState } = useIngredientCard(
        ing.id,
        ing.name,
        ing.bgColor,
        ing.isSelected,
        ing.isBlackListed
    )
    let inputActive = false
    const bg = {
        backgroundColor: cardState.bgColor,
    }
    return (
        <div
            onClick={handleIngredientClick}
            style={bg}
            className={`${classes.ingredientCard} ${cardState.isSelected ? classes.selected : classes.unselected}`}
        >
            <div className={classes.leftItems}>
                <MaterialSymbol className={classes.checkIco} icon="check_circle" weight={300} size={24} grade={24} />
                <p>{ing.name}</p>
            </div>
            <div className={classes.rightItems}>
                <MaterialSymbol
                    //onClick function to edit
                    className={classes.rightIco}
                    icon="edit_note"
                    weight={300}
                    size={24}
                    grade={24}
                />
                <MaterialSymbol
                    onClick={(e) => handleXClick(e)}
                    className={classes.rightIco}
                    icon="close"
                    weight={300}
                    size={24}
                    grade={24}
                />
            </div>
        </div>
    )
}

{
    /* <div className={`${classes.searchBar} ${searchState.inputActive ? classes.inputActive : classes.inputInactive}`}>
{searchState.inputActive ? (
    <input
        className={classes.header}
        onClick={handleInputActivation}
        placeholder="Search an ingredient"
        name="search"
        type="text"
        onBlur={(e) =>
            setTimeout(() => {
                handleInputDeactivation(e)
            }, 25)
        }
        onKeyDown={handlePressEnter}
        onChange={handleInputChange}
        value={inputValues.current}
    />
) : (
    <p className={classes.header}> {cardState.label} </p>
)}

{!searchState.inputActive && (
    <MaterialSymbol
        className={`${classes.ico} ${classes.searchIco}`}
        icon="search"
        weight={400}
        size={18}
        grade={18}
    />
)} */
}
