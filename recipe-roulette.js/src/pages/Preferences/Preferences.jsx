import { Switch } from "../../components/Switch/Switch"
import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { useManageIngredients } from "../Discovery/IngredientsContext"
import classes from "./Preferences.module.scss"
import { Button } from "../../components/Buttons/Button/Button"
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined"
import { IngredientSearch } from "../../components/Search/SearchBar/IngredientSearch"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { useEffect, useState } from "react"
import { FilterChip } from "../../components/FilterChip/FilterChip"


export function useLocalSave(){
    const {local_filter,setLocal_filter}= useState({})
    const {local_recipeFilter,setLocal_recipeFilter}= useState({})
    const {local_blacklist,setLocal_blacklist}= useState([])

   
    if(localStorage.getItem(local_filter) === null) {console.log("no local save");}else {
        setLocal_filter(JSON.parse(localStorage.getItem(local_filter)));
        setLocal_recipeFilter(JSON.parse(localStorage.getItem(local_recipeFilter)));
        setLocal_blacklist( JSON.parse(localStorage.getItem(local_blacklist)));
        console.log("loading local save");
    }

    return{
        local_filter,
        local_recipeFilter,
        local_blacklist
    }


}


export function Preferences() {
    const { animate } = useAnimate()
    const { handleDeselectAll, blackList, setBlackList } = useManageIngredients()
    const { toggleFilter, filter } = useManageIngredients()
    const { recipeFilter, toggleRecipeFilter } = useRecipesContext()
    const {local_filter, local_recipeFilter, local_blacklist}= useLocalSave()


    useEffect(()=> {
        if(local_filter){
            if(local_filter.isGlutenFree !== filter.isGlutenFree){toggleFilter(isGlutenFree)};
            if(local_filter.isVegetarian !== filter.isVegetarian){toggleFilter(isVegetarian)};
            if(local_filter.isVegan !== filter.isVegan){toggleFilter(isVegan)};

            if(local_recipeFilter.isGlutenFree !== recipeFilter.isGlutenFree){togglerecipeFilter(isGlutenFree)};
            if(local_recipeFilter.isVegetarian !== recipeFilter.isVegetarian){togglerecipeFilter(isVegetarian)};
            if(local_recipeFilter.isVegan !== recipeFilter.isVegan){togglerecipeFilter(isVegan)};
            
            setBlackList([...local_blacklist]);
        }
    },[])

    

    function handleApply(e) { 
        if (e.target.checked === true){
            if(filter.isGlutenFree !== recipeFilter.isGlutenFree) {toggleRecipeFilter('isGlutenFree')};
            if(filter.isVegetarian !== recipeFilter.isVegetarian) {toggleRecipeFilter('isVegetarian')};
            if(filter.isVegan !== recipeFilter.isVegan) {toggleRecipeFilter('isVegan')}
        };
    }

    function handleSave(event) {
        localStorage.setItem("local_filter", JSON.stringify(filter));
        localStorage.setItem("local_recipeFilter", JSON.stringify(recipeFilter));
        localStorage.setItem("local_blacklist", JSON.stringify(blackList));
        console.log("saving test");
    }

/*     useEffect(() => {
        setInputValue("")
    }, [location.pathname]) */

    return (
        <div className={`${classes.preferencesPage} ${animate && classes.animateSettings}`}>
            <p>the preferences you set here
                will affect both ingredients 
                and recipes results</p>
            <br/>

        
            <div className={classes.blackListedWrapper}>
                    <h4>Add ingredients to black list</h4>
                    <div className={classes.blackListed}>
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
                                    })
                                }
                            </div>
                        )}
                    </div>
            </div>

            <div className={classes.switchesWrapper}>
            <Switch state={filter.isGlutenFree} action={toggleFilter} label={"Gluten free"} prop={"isGlutenFree"} />
                <Switch state={filter.isVegetarian} action={toggleFilter} label={"Vegetarian"} prop={"isVegetarian"} />
                <Switch state={filter.isVegan} action={toggleFilter} label={"Vegan"} prop={"isVegan"} />
            </div>
            <div>
                <label><input type="checkbox" onClick={handleApply} /> same for recipes?</label>
            </div>
            <div className={classes.bottomButtons}>
                <Button className={classes.bottomButtons.reset} label="Reset All" icon={<RotateLeftOutlinedIcon fontSize="small" />} size={18}
                    action={() => handleDeselectAll("isBlackListed")}
                />
                <Button type="button" className="save" label="Save" action={handleSave} width={"fill"}/>
            </div>
            
        </div>
    )
}
