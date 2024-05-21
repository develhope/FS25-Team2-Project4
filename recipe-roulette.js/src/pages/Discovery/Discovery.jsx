import classes from "./Discovery.module.scss"
import { MaterialSymbol } from "react-material-symbols"
import { IngredientCard } from "../../components/IngredientCard/IngredientCard"
import { IngredientSearch } from "../../components/Search/SearchBar/IngredientSearch"
import { useManageIngredients } from "../Discovery/IngredientsContext"
import { Sidebar } from "../../components/Sidebar/Sidebar"
import { useDiscovery } from "./useDiscovery"

function Discovery() {
    const { displayedIng, shuffleIng, handleIngIncrement, handleDeselectAll, ingNum } = useManageIngredients()
    const { handleSidebarToggle, isToggled } = useDiscovery()

    return (
        <div className={classes.discoveryPage}>
            <Sidebar isToggled={isToggled} handleSidebarToggle={handleSidebarToggle} />
            <header>
                <h1>Discovery</h1>
            </header>

            <div className={classes.ingredientsWrapper}>
                <div className={classes.globalActions}>
                    <IngredientSearch isFixed={true} searchCriteria="isSelected" />
                    <button onClick={handleSidebarToggle} className={classes.icoButton}>
                        <MaterialSymbol className={classes.ico} icon="tune" size={18} grade={18} />
                    </button>
                    <button onClick={() => handleDeselectAll("isSelected")} className={classes.icoButton}>
                        <MaterialSymbol className={classes.ico} icon="rotate_left" size={18} grade={18} />
                    </button>
                </div>

                {displayedIng.length > 0 &&
                    displayedIng.map((ing) => {
                        return <IngredientCard key={ing.id} ing={ing} />
                    })}
            </div>

            <div className={classes.bottomButtons}>
                <button className={`${classes.button} ${ingNum === 8 && classes.disabled}`} onClick={() => handleIngIncrement()}>
                    <MaterialSymbol className={classes.ico} icon="add" size={18} grade={18} />
                    ingredient
                </button>
                <button className={classes.cycleButton} onClick={() => shuffleIng()}>
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
