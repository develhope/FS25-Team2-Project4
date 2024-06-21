import express from "express"
import cors from "cors"
import { getUsers } from "./controllers/users-controllers.mjs"

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/users", getUsers)


app.listen(3000, () => {
    console.log(`Server running at port 3000`);
})

