import classes from "./RecipesResults.module.scss";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { useState } from "react";
import { MaterialSymbol } from "react-material-symbols";
import { useDiscovery } from "../Discovery/useDiscovery";

export function RecipeResults() {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
  const { handleSidebarToggle, isToggled } = useDiscovery()

  function handleClick(index) {
    setSelectedButtonIndex((prevIndex) => (prevIndex === index ? null : index));
  }

  return (
    <div className={classes.recipesResultsPage}>
      <header>
        <h1>Results</h1>
        <button className={classes.btnFilters} onClick={handleSidebarToggle} >
          <MaterialSymbol
            className={classes.icon}
            icon="tune"
            size={20}
            grade={18}
          />
          Filters
        </button>
      </header>
      <div className={classes.subHeading}>
        <p className={classes.text}>Preparation time</p>
        <div className={classes.chipBox}>
          <button
            onClick={() => handleClick(0)}
            className={selectedButtonIndex === 0 ? classes.selected : ""}
          >
            {selectedButtonIndex === 0 && (
              <MaterialSymbol
                className={classes.icon}
                icon="check"
                size={22}
                grade={18}
              />
            )}
            <p></p>
            30 min
          </button>
          <button
            onClick={() => handleClick(1)}
            className={selectedButtonIndex === 1 ? classes.selected : ""}
          >
            {selectedButtonIndex === 1 && (
              <MaterialSymbol
                className={classes.icon}
                icon="check"
                size={22}
                grade={18}
              />
            )}
            <p>45 min</p>
          </button>
          <button
            onClick={() => handleClick(2)}
            className={selectedButtonIndex === 2 ? classes.selected : ""}
          >
            {selectedButtonIndex === 2 && (
              <MaterialSymbol
                className={classes.icon}
                icon="check"
                size={22}
                grade={18}
              />
            )}
            <p>60 min +</p>
          </button>
        </div>
      </div>

      <div className={classes.resultsBox}></div>
      <RecipeCard title="Just a title" />
      <RecipeCard title="Just another title" />
      <RecipeCard title="Just anotherother title" />
    </div>
  );
}

