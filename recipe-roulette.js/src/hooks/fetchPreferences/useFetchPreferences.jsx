import axios from "axios"

export const useFetchPreferences = async (preferences, userId) => {
    try {
        if (preferences && userId) {
            //se viene passato anche l'id allora aggiorniamo anche i dati sul server
            const response = await axios.post("http://localhost:3000/api/preferences/set-preferences", {
                reqPreferences: preferences,
                userId,
            })
            console.log(response)
        }
    } catch (error) {
        console.error("An error occurred while fetching recipes:", error)
    }
}
