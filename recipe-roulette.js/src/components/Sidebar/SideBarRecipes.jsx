import { useState } from "react";
import { MaterialSymbol } from "react-material-symbols";
import { Switch } from "../Switch/Switch";
import classes from "./SideBarRecipes.module.scss"


export function SideBarRecipes() {
  const [state, setState] = useState(false);

  function handleSideBarState() {
    setState((prev) => !prev);
  }

  return (
    <div>
      <div
        onClick={handleSideBarState}
        className={`${classes.backgroundOverlay} ${
         state && classes.backgroundOverlayToggled
        }`}
      ></div>
      <div
        className={`${classes.sidebar} ${
         state && classes.sidebarToggled
        }`}
      >
        <header>
          <h2>Filters</h2>
          <div className={classes.rightItems}>
            <button
              className={classes.deselectAllButton}
            >
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
              onClick={handleSideBarState}
              className={classes.closeIco}
              icon="close"
              size={24}
              grade={24}
            />
          </div>
        </header>

        <section>

        



        <div className={classes.preferences}>
                        <h4>Preferences</h4>
                        <div className={classes.switchesWrapper}>
                            <Switch label={"Gluten free"} prop={"isGlutenFree"} />
                            <Switch label={"Vegetarian"} prop={"isVegetarian"} />
                            <Switch label={"Vegan"} prop={"isVegan"}/>
                        </div>
                    </div>

        </section>
        
      </div>
    </div>
  );
}
