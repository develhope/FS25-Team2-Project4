import { useManageIngredients } from "../../pages/Discovery/IngredientsContext"

export function useFilterChips( id )  {
    const { handleBlackListUpdate } = useManageIngredients()


    function handleDeselectChip() {
        console.log(id);
        handleBlackListUpdate(false,id)
    }

    return {
        handleDeselectChip,
    }
}
