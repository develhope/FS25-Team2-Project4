import { useEffect, useState } from "react"
import { useManageIngredients } from "../../pages/Discovery/IngredientsContext"
import { FilterChip } from "../Search/FilterChip"
import { Search } from "../Search/Search"
import classes from "./Sidebar.module.scss"
import { MaterialSymbol } from "react-material-symbols"
import { Switch } from "../Search/Switch"

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
                <div className={classes.rightItems}>
                    <button className={classes.deselectAllButton} onClick={handleBlackListReset}>
                        <MaterialSymbol
                            className={classes.ico}
                            icon="rotate_left"
                            weight={500}
                            size={18}
                            grade={18}
                        />
                        Reset all
                    </button>
                    <MaterialSymbol className={classes.ico} icon="close" size={24} grade={24} />
                </div>
            </header>
            <section>
                <div className={classes.blackListed}>
                    <h4>Black listed ingredients</h4>
                    <Search />
                    {blackList.length > 0 && (
                        <div className={classes.filterChipWrapper}>
                            {blackList
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
                    )}
                </div>
                <div className={classes.preferences}>
                    <h4>Preferences</h4>
                    <div className={classes.switchesWrapper}>
                        <Switch label={"Gluten free"} />
                        <Switch label={"Vegetarian"} />
                        <Switch label={"Vegan"} />
                    </div>
                </div>
            </section>
            <footer></footer>
        </div>
    )
}
