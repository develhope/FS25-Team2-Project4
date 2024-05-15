import { useContext } from "react";
import IngredientsContext from "./IngredientsContext";

const useManageIngredients = () => {
  const context = useContext(IngredientsContext);
  if (!context) {
    throw new Error("useManageIngredients must be used within an IngredientsProvider");
  }
  return context;
};

export default useManageIngredients;