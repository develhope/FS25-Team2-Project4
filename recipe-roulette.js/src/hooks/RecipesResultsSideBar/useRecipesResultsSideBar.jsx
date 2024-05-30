import { useState } from "react";

export function useRecipesResultsSideBar() {
  const [sideBarState, setSideBarState] = useState(false);

  function toggleSidebarRecipes() {
    setSideBarState((prev) => !prev);
  }

  return {
    sideBarState,
    toggleSidebarRecipes,
  };
}
