import classes from "./RecipesResults.module.scss";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
/* import { useDiscoverySidebar } from "../../hooks/DiscoverySidebar/useDiscoverySidebar"; */
import { FilterChipRecipes } from "../../components/FilterChip/FilterChipRecipes";
import { useAnimate } from "../../hooks/animatePages/useAnimate";

export function RecipeResults() {
/*   const { handleSidebarToggle, sidebarState } = useDiscoverySidebar() */
  const { animate } = useAnimate()

  return (
    <div className={`${classes.recipesResultsPage} ${animate && classes.animateFavorite} ` }>
      <div className={classes.subHeading}>
        <p className={classes.text}>Preparation time</p>
        
        <div className={classes.chipWrapper}>
          <FilterChipRecipes label="30min"/>
          <FilterChipRecipes label="45min"/>
          <FilterChipRecipes label="60min +"/>
        </div>
      </div>

      <div className={classes.resultsWrapper}>
      <RecipeCard
                    title="Lemon and Green Pepper Salmon"
                    image="https://img.freepik.com/free-photo/delicious-mahi-mahi-fish-still-life_23-2150457374.jpg?size=626&ext=jpg%C3%B9"
                    chips={["Gluten Free", "30 min", "Fresh"]}
                    isFav={true}
                />
                <RecipeCard
                    title="Gyoza Dumplings"
                    image="https://img.freepik.com/free-photo/flat-lay-japanese-dumplings-assortment_23-2148809862.jpg?t=st=1716615398~exp=1716618998~hmac=e433b90bd901df6cedcf882fc2e1212ab5fd6010d88534dfe815fc22b8da4a7d&w=740"
                    chips={["Vegan", "45 min", "Light"]}
                    isFav={true}
                />
                <RecipeCard
                    title="Chocolate and blueberry pancakes"
                    image="https://img.freepik.com/free-photo/front-view-sweet-pancakes-tower-arrangement_23-2148654085.jpg?t=st=1716615037~exp=1716618637~hmac=dbe8de11f0add1e852353069591021ccdeb9a8b61ae358f89177244cdccac430&w=740"
                    chips={["Vegetarian", "45 min"]}
                    isFav={true}
                />

      </div>

    </div>
  );
}

