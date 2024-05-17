import { MaterialSymbol } from "react-material-symbols"
import { IngredientCard } from "../../components/IngredientCard/IngredientCard"
import { useManageIngredients } from "../Discovery/IngredientsContext"

import classes from "./Discovery.module.scss"
import { Search } from "../../components/Search/Search"

function Discovery() {
    const {
        displayedIngredients,
        shuffleIngredients,
        handleIngredientsIncrement,
        handleDeselectAll,
        initialValue,
    } = useManageIngredients()
    return (
        <div className={classes.discoveryPage}>
            <header>
                <h1>Discovery</h1>
                <button onClick={handleDeselectAll} className={classes.button}>
                    Deselect all
                    <MaterialSymbol className={classes.ico} icon="deselect" size={18} grade={18} />
                </button>
            </header>

            <div className={classes.ingredientsWrapper}>
                <Search />
                {displayedIngredients &&
                    displayedIngredients.map((ingredient) => {
                        return (
                            <IngredientCard
                                id={ingredient.id}
                                key={ingredient.id}
                                label={ingredient.name}
                                bgColor={ingredient.bgColor}
                                isSelected={ingredient.isSelected}
                            />
                        )
                    })}
            </div>
            <div className={classes.bottomButtons}>
                <button
                    className={`${classes.button} ${(initialValue === 8) && classes.disabled}`}
                    onClick={() => handleIngredientsIncrement()}
                >
                    <MaterialSymbol className={classes.ico} icon="add" size={18} grade={18} />
                    ingredient
                </button>
                <button className={classes.cycleButton} onClick={() => shuffleIngredients()}>
                    {" "}
                    <MaterialSymbol className={classes.ico} icon="cycle" size={18} grade={18} />
                </button>
                <button className={classes.button}>
                    <MaterialSymbol className={classes.ico} icon="done_all" size={18} grade={18} />
                    find recipes
                </button>
            </div>
        </div>
    )
}

export default Discovery
