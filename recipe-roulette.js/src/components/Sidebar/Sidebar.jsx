import { useEffect, useState } from "react"
import { useManageIngredients } from "../../pages/Discovery/IngredientsContext"
import { FilterChip } from "../Search/FilterChip"
import { Search } from "../Search/Search"
import classes from "./Sidebar.module.scss"
import { MaterialSymbol } from "react-material-symbols"

export function Sidebar() {
    const { ingredients, handleBlackListReset } = useManageIngredients()
    const [blackList, setBlackList] = useState([])

    useEffect(() => {
        setBlackList([...ingredients.filter((ing) => ing.isBlackListed)])
    }, [ingredients])

    return (
        <div className={classes.sidebar}>
            <header>
                <h2>Filters</h2>
                <button className={classes.deselectAllButton} onClick={handleBlackListReset}>
                    <MaterialSymbol className={classes.ico} icon="deselect" size={18} grade={18} />
                    Deselect all
                </button>
            </header>
            <section>
                <div className={classes.blackListed}>
                    <h4>Black listed ingredients</h4>
                    <Search />
                    <div className={classes.filterChipWrapper}>
                        {" "}
                        {blackList &&
                            blackList
                                .filter((ing) => ing.isBlackListed)
                                .sort((a, b) => (a.name === b.name ? 0 : a.name > b.name ? 1 : -1))
                                .map((ing) => {
                                    return (
                                        <FilterChip
                                            key={ing.id}
                                            id={ing.id}
                                            label={ing.name}
                                            isBlackListed={ing.isBlackListed}
                                        />
                                    )
                                })}
                    </div>
                </div>
            </section>
            <footer></footer>
        </div>
    )
}
