import { Switch } from "../Switch/Switch"
import { FilterChipRecipes } from "../FilterChip/FilterChipRecipes"

import CloseIcon from "@mui/icons-material/Close"
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined"

import { Button } from "../Buttons/Button/Button"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { IcoButton } from "../Buttons/IcoButton/IcoButton"

import classes from "./SideBarRecipes.module.scss"
import { useManageIngredients } from "../../pages/Discovery/IngredientsContext"

export function SideBarRecipes({ state, toggleSidebarRecipes }) {
    const { toggleRecipeFilter, recipeFilter } = useRecipesContext()
    const { toggleFilter, filter, handleDeselectPreferences } = useManageIngredients()
    const { handleDeselectRecipeFilters } = useRecipesContext()

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
                            action={() => {
                                handleDeselectRecipeFilters()
                                handleDeselectPreferences("isBlackListed")
                            }}
                            icon={<RotateLeftOutlinedIcon className={classes.ico} fontSize="small" />}
                        />
                        <IcoButton action={toggleSidebarRecipes} style="transparent" icon={<CloseIcon fontSize="small" />} />
                    </div>
                </header>

                <section className={classes.sidebarBody}>
                    <div className={classes.preparationTime}>
                        <h4>Preparation Time</h4>
                        <div className={classes.filterChipWrapper}>
                            <FilterChipRecipes filterType={"preparationTime"} label="All" />
                            <FilterChipRecipes filterType={"preparationTime"} numericValue={30} label="30m or less" />
                            <FilterChipRecipes filterType={"preparationTime"} numericValue={45} label="45m or less" />
                            <FilterChipRecipes filterType={"preparationTime"} numericValue={60} label="60m or less" />
                        </div>
                    </div>

                    <div className={classes.preferences}>
                        <h4>Preferences</h4>
                        <div className={classes.switchesWrapper}>
                            <Switch
                                state={filter.isGlutenFree}
                                action={() => {
                                    toggleFilter("isGlutenFree")
                                    toggleRecipeFilter("isGlutenFree")
                                }}
                                label={"Gluten free"}
                            />
                            <Switch
                                state={filter.isVegetarian}
                                action={() => {
                                    toggleFilter("isVegetarian")
                                    toggleRecipeFilter("isVegetarian")
                                }}
                                label={"Vegetarian"}
                            />
                            <Switch
                                state={filter.isVegan}
                                action={() => {
                                    toggleFilter("isVegan")
                                    toggleRecipeFilter("isVegan")
                                }}
                                label={"Vegan"}
                            />
                        </div>
                    </div>
                    <div className={classes.cousineEtnicity}>
                        <h4>Cousine Etnicity</h4>
                        <div className={classes.filterChipWrapper}>
                            <FilterChipRecipes filterType={"cuisineEthnicity"} label="All" />
                            <FilterChipRecipes filterType={"cuisineEthnicity"} label="Italian" />
                            <FilterChipRecipes filterType={"cuisineEthnicity"} label="French" />
                            <FilterChipRecipes filterType={"cuisineEthnicity"} label="Chinese" />
                            <FilterChipRecipes filterType={"cuisineEthnicity"} label="Japanese" />
                            <FilterChipRecipes filterType={"cuisineEthnicity"} label="Indian" />
                            <FilterChipRecipes filterType={"cuisineEthnicity"} label="Greek" />
                            <FilterChipRecipes filterType={"cuisineEthnicity"} label="Spanish" />
                            <FilterChipRecipes filterType={"cuisineEthnicity"} label="Mexican" />
                            <FilterChipRecipes filterType={"cuisineEthnicity"} label="Thai" />
                            <FilterChipRecipes filterType={"cuisineEthnicity"} label="Middle Eastern" />
                        </div>
                    </div>
                    <div className={classes.caloricApport}>
                        <h4>Caloric Apport</h4>
                        <div className={classes.filterChipWrapper}>
                            <FilterChipRecipes filterType={"caloricApport"} label="All" />
                            <FilterChipRecipes numericValue={250} filterType={"caloricApport"} label="250 kcal or less" />
                            <FilterChipRecipes numericValue={350} filterType={"caloricApport"} label="350 kcal of less" />
                            <FilterChipRecipes numericValue={500} filterType={"caloricApport"} label="500 kcal or less" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
