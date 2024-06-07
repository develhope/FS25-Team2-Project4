import classes from "./Sidebar.module.scss"
import { useManageIngredients } from "../../pages/Discovery/IngredientsContext"
import { FilterChip } from "../FilterChip/FilterChip"
import { Switch } from "../Switch/Switch"
import { IngredientSearch } from "../Search/SearchBar/IngredientSearch"
import { Button } from "../Buttons/Button/Button"

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined"

export function Sidebar({ sidebarState = false, handleSidebarToggle }) {
    const { handleDeselectAll, blackList } = useManageIngredients()
    const { toggleFilter, filter } = useManageIngredients()

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
                            icon={<RotateLeftOutlinedIcon fontSize="small" />}
                            size={18}
                            action={() => handleDeselectAll("isBlackListed")}
                        />
                        <div onClick={handleSidebarToggle} className={classes.closeIco}>
                            <CloseOutlinedIcon />
                        </div>
                    </div>
                </header>
                <section className={classes.sidebarBody}>
                    <div className={classes.blackListedWrapper}>
                        <h4>Add ingredeints to black list</h4>
                        <div className={classes.blackListed}>
                            <IngredientSearch isFixed={true} searchCriteria="isBlackListed" />
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
                    </div>
                    <div className={classes.preferences}>
                        <h4>Preferences</h4>
                        <div className={classes.switchesWrapper}>
                            <Switch state={filter.isGlutenFree} action={toggleFilter} label={"Gluten free"} prop={"isGlutenFree"} />
                            <Switch state={filter.isVegetarian} action={toggleFilter} label={"Vegetarian"} prop={"isVegetarian"} />
                            <Switch state={filter.isVegan} action={toggleFilter} label={"Vegan"} prop={"isVegan"} />
                        </div>
                    </div>
                </section>
                <footer></footer>
            </div>
        </div>
    )
}
