import express from "express"
import cors from "cors"
import { getUsers, signup, login, logout } from "./controllers/users-controllers.mjs"
import { getIngredients } from "./controllers/ingredients-controllers.mjs"
import { blacklistIngredient } from "./controllers/preferences-controller.mjs"
import { authorize } from "./utils/authHelpers.mjs"
import { passport } from "./passport.mjs"

const app = express()

app.use(express.json())
app.use(cors())
app.use(passport.initialize())

//users routes
app.get("/api/users", getUsers)
app.post("/api/users/signup", signup)
app.post("/api/users/login", login)
app.post("/api/users/logout", authorize, logout)

//ingredients routes
app.get("/api/ingredients", getIngredients)
app.post("/api/preferences/blacklisted-ingredients", blacklistIngredient)


app.use((err, res, next) => {
    if (err) {
        res.status(err.statusCode || 500).json({ msg: err.statusMessage || "Internal Server Error" })
    } else {
        next()
    }
})

app.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`)
})
