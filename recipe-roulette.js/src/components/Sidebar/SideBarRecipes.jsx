import { MaterialSymbol } from "react-material-symbols";
import { Switch } from "../Switch/Switch";
import { FilterChipRecipes } from "../FilterChip/FilterChipRecipes";
import classes from "./SideBarRecipes.module.scss";
import { useFilterChipRecipes } from "../FilterChip/useFilterChipRecipes";

export function SideBarRecipes({ state, toggleSidebarRecipes }) {
  const { handleSelected } = useFilterChipRecipes()

  function handleSidebarClick(e) {
    e.stopPropagation();
  }

  return (
    <div>
      <div
        onClick={toggleSidebarRecipes}
        className={`${classes.backgroundOverlay} ${
          state && classes.backgroundOverlayToggled
        }`}
      ></div>
      <div
        className={`${classes.sidebar} ${state && classes.sidebarToggled}`}
        onClick={handleSidebarClick}
      >
        <header>
          <h2>Filters</h2>
          <div className={classes.rightItems}>
            <button className={classes.deselectAllButton} onClick={handleSelected}>
              <MaterialSymbol
                className={classes.ico}
                icon="rotate_left"
                weight={500}
                size={18}
                grade={18}
              />
              Reset all
            </button>
            <MaterialSymbol
              onClick={toggleSidebarRecipes}
              className={classes.closeIco}
              icon="close"
              size={24}
              grade={24}
            />
          </div>
        </header>

        <section>
          <div className={classes.preparationTime}>
            <h4>Preparation Time</h4>
            <div className={classes.filterChipWrapper}>
              <FilterChipRecipes label="All" />
              <FilterChipRecipes label="30 min" />
              <FilterChipRecipes label="45 min" />
              <FilterChipRecipes label="60 min" />
              <FilterChipRecipes label="90 min +" />
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
  );
}
