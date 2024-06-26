import { db } from "../utils/DBhelpers.mjs"

const getIngredients = async (req, res) => {
    try {
        const ingredients = await db.manyOrNone(`SELECT * FROM ingredients`)
        ingredients ? res.status(200).json(ingredients) : res.status(400).json({ msg: "No ingredients found" })
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" })
    }
}

export { getIngredients }
