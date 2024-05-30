import classes from "./Sidebar.module.scss"
import { useManageIngredients } from "../../pages/Discovery/IngredientsContext"
import { FilterChip } from "../FilterChip/FilterChip"
import { MaterialSymbol } from "react-material-symbols"
import { Switch } from "../Switch/Switch"
import { IngredientSearch } from "../Search/SearchBar/IngredientSearch"
import { Button } from "../Buttons/Button/Button"

export function Sidebar({ sidebarState = false, handleSidebarToggle }) {
    const { handleDeselectAll, blackList } = useManageIngredients()

    return (
        <div>
            <div
                onClick={handleSidebarToggle}
                className={`${classes.backgroundOverlay} ${sidebarState && classes.backgroundOverlayToggled}`}
            ></div>
            <div className={`${classes.sidebar} ${sidebarState && classes.sidebarToggled}`}>
                <header>
                    <h2>Filters</h2>
                    <div className={classes.rightItems}>
                        <Button
                            label="Reset All"
                            icon="rotate_left"
                            size={18}
                            action={() => handleDeselectAll("isBlackListed")}
                        />
                        <MaterialSymbol
                            onClick={handleSidebarToggle}
                            className={classes.closeIco}
                            icon="close"
                            size={24}
                            grade={24}
                        />
                    </div>
                </header>
                <section>
                    <div className={classes.blackListed}>
                        <h4>Add ingredeints to black list</h4>
                        <IngredientSearch isFixed={false} searchCriteria="isBlackListed" />
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
                                                bgColor={ing.bgColor}
                                                isBlackListed={ing.isBlackListed}
                                                isSelected={ing.isSelected}
                                            />
                                        )
                                    })}
                            </div>
                        )}
                    </div>
                    <div className={classes.preferences}>
                        <h4>Preferences</h4>
                        <div className={classes.switchesWrapper}>
                            <Switch label={"Gluten free"} prop={"isGlutenFree"} />
                            <Switch label={"Vegetarian"} prop={"isVegetarian"} />
                            <Switch label={"Vegan"} prop={"isVegan"} />
                        </div>
                    </div>
                </section>
                <footer></footer>
            </div>
        </div>
    )
}
