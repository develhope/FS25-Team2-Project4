import express from "express"
import cors from "cors"
import { getUsers, signup } from "./controllers/users-controllers.mjs"

const app = express()
app.use(express.json())
app.use(cors())

app.get("/api/users", getUsers)

app.post("/api/users/signup", signup)

app.use((err, res, next) => {
    if (err) {
        res.status(err.statusCode || 500).json({ msg: err.statusMessage || "Internal Server Error" })
    } else {
        next()
    }
})

app.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`);
})

