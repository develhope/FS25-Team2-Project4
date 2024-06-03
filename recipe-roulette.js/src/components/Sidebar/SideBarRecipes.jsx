import { MaterialSymbol } from "react-material-symbols"
import { Switch } from "../Switch/Switch"
import { FilterChipRecipes } from "../FilterChip/FilterChipRecipes"
import { useFilterChipRecipes } from "../FilterChip/useFilterChipRecipes"

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined"

import classes from "./SideBarRecipes.module.scss"
import { Button } from "../Buttons/Button/Button"

export function SideBarRecipes({ state, toggleSidebarRecipes }) {
    const { handleSelected } = useFilterChipRecipes()

    function handleSidebarClick(e) {
        e.stopPropagation()
    }

    return (
        <div>
            <div
                onClick={toggleSidebarRecipes}
                className={`${classes.backgroundOverlay} ${state && classes.backgroundOverlayToggled}`}
            ></div>
            <div className={`${classes.sidebar} ${state && classes.sidebarToggled}`} onClick={handleSidebarClick}>
                <header>
                    <h2>Filters</h2>
                    <div className={classes.rightItems}>
                        <Button
                            label="Reset All"
                            action={handleSelected}
                            icon={<RotateLeftOutlinedIcon className={classes.ico} fontSize="small" />}
                        />
                        <div onClick={toggleSidebarRecipes} className={classes.closeIco}>
                            <CloseOutlinedIcon />
                        </div>
                    </div>
                </header>

                <section className={classes.sidebarBody}>
                    <div className={classes.preparationTime}>
                        <h4>Preparation Time</h4>
                        <div className={classes.filterChipWrapper}>
                            <FilterChipRecipes label="All" />
                            <FilterChipRecipes label="30m" />
                            <FilterChipRecipes label="45m" />
                            <FilterChipRecipes label="60m +" />
                        </div>
                    </div>

                    <div className={classes.preferences}>
                        <h4>Preferences</h4>
                        <div className={classes.switchesWrapper}>
                            <Switch label={"Gluten free"} prop={"isGlutenFree"} />
                            <Switch label={"Vegetarian"} prop={"isVegetarian"} />
                            <Switch label={"Vegan"} prop={"isVegan"} />
                        </div>
                    </div>
                    <div className={classes.cousineEtnicity}>
                        <h4>Cousine Etnicity</h4>
                        <div className={classes.filterChipWrapper}>
                            <FilterChipRecipes label="All" />
                            <FilterChipRecipes label="Italian" />
                            <FilterChipRecipes label="French" />
                            <FilterChipRecipes label="British" />
                            <FilterChipRecipes label="Japanese" />
                            <FilterChipRecipes label="Korean" />
                            <FilterChipRecipes label="Chinese" />
                        </div>
                    </div>
                    <div className={classes.caloricApport}>
                        <h4>Caloric Apport</h4>
                        <div className={classes.filterChipWrapper}>
                            <FilterChipRecipes label="250 kcal" />
                            <FilterChipRecipes label="300 to 500 kcal" />
                            <FilterChipRecipes label="500 kcal +" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
