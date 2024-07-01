import classes from "./Sidebar.module.scss"
import { useManageIngredients } from "../../pages/Discovery/IngredientsContext"
import { FilterChip } from "../FilterChip/FilterChip"
import { Switch } from "../Switch/Switch"
import { IngredientSearch } from "../Search/SearchBar/IngredientSearch"
import { Button } from "../Buttons/Button/Button"
import { IcoButton } from "../Buttons/IcoButton/IcoButton"

import CloseIcon from "@mui/icons-material/Close"
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined"
import { FilterChipRecipes } from "../FilterChip/FilterChipRecipes"
import { useRecipesContext } from "../../contexts/RecipesContext"

export function Sidebar({ sidebarState = false, handleSidebarToggle }) {
    const { handleDeselectAll, blackList } = useManageIngredients()
    const { toggleFilter, filter } = useManageIngredients()
    const { toggleRecipeFilter, recipeFilter, handleDeselectRecipeFilters } = useRecipesContext()

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
                            action={() => {
                                handleDeselectRecipeFilters()
                                handleDeselectAll("isBlackListed")
                            }}
                        />
                        <IcoButton action={handleSidebarToggle} style="transparent" icon={<CloseIcon fontSize="small" />} />
                    </div>
                </header>
                <section className={classes.sidebarBody}>
                    <div className={classes.blackListedWrapper}>
                        <h4>Add ingredeints to black list</h4>
                        <div className={classes.blackListed}>
                            <IngredientSearch isFixed={true} sidebarSearch={true} searchCriteria="isBlackListed" />
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
                    <div className={classes.filterSection}>
                        <h4>Preferences</h4>
                        <div className={classes.switchesWrapper}>
                            {/* filtra gli ingredienti, inoltre imposta recipeFilter in modo che il fitro 
                            venga passato anche alla richiesta di fetch */}
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
                    <div className={classes.filterSection}>
                        <h4>Preparation Time</h4>
                        <div className={classes.filterChipWrapper}>
                            <FilterChipRecipes filterType={"preparationTime"} label="All" />
                            <FilterChipRecipes filterType={"preparationTime"} numericValue={30} label="30m or less" />
                            <FilterChipRecipes filterType={"preparationTime"} numericValue={45} label="45m or less" />
                            <FilterChipRecipes filterType={"preparationTime"} numericValue={60} label="60m or less" />
                        </div>
                    </div>

                    <div className={classes.filterSection}>
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

                    <div className={classes.filterSection}>
                        <h4>Caloric Apport</h4>
                        <div className={classes.filterChipWrapper}>
                            <FilterChipRecipes filterType={"caloricApport"} label="All" />
                            <FilterChipRecipes numericValue={350} filterType={"caloricApport"} label="350 kcal or less" />
                            <FilterChipRecipes numericValue={450} filterType={"caloricApport"} label="450 kcal of less" />
                            <FilterChipRecipes numericValue={550} filterType={"caloricApport"} label="550 kcal or less" />
                        </div>
                    </div>

                    <div className={classes.filterSection}>
                        <h4>Difficulty</h4>
                        <div className={classes.filterChipWrapper}>
                            <FilterChipRecipes numericValue={"all"} filterType={"difficulty"} label="All" />
                            <FilterChipRecipes numericValue={"easy"} filterType={"difficulty"} label="Easy" />
                            <FilterChipRecipes numericValue={"medium"} filterType={"difficulty"} label="Medium" />
                            <FilterChipRecipes numericValue={"hard"} filterType={"difficulty"} label="Hard" />
                        </div>
                    </div>
                </section>
                <footer></footer>
            </div>
        </div>
    )
}
