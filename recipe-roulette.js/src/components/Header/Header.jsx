import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import classes from "./Header.module.scss";
import { MaterialSymbol } from "react-material-symbols";
import { SideBarRecipes } from "../Sidebar/SideBarRecipes";

export function Header({ handleMenuToggle }) {
  const [title, setTitle] = useState("/");
  const location = useLocation();
  const [sideBarState, setSideBarState] = useState(false)

  function toggleSidebarRecipes () {
    setSideBarState(prev => !prev)
  }

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setTitle("Welcome!");
        break;
      case "/discovery":
        setTitle("Discovery");
        break;
      case "/favorited":
        setTitle("Favorited");
        break;
      case "/settings":
        setTitle("Settings");
        break;
      case "/recipes-results":
        setTitle("Results");
        break;
    }
  }, [location.pathname]);

  return (
    <header>
      <div className={classes.leftItems}>
        <MaterialSymbol
          onClick={handleMenuToggle}
          className={classes.menu}
          icon="menu"
          weight={500}
          size={24}
          grade={24}
        />
        <h1>{title}</h1>
      </div>

      {location.pathname === "/favorited" && (
        <button className={classes.leftIcoButton}>
          <MaterialSymbol icon="tune" />
          Filters
        </button>
      )}
      {location.pathname === "/recipes-results" && (
        <div>
        <button className={classes.leftIcoButton} onClick={toggleSidebarRecipes}>
          <MaterialSymbol icon="tune" />
          Filters
          <SideBarRecipes isOpen={sideBarState} toggleSidebarRecipes={toggleSidebarRecipes} />
        </button>
        </div>
      )}
    </header>
  );
}
