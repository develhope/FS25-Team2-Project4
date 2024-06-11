import express from "express"
import cors from "cors"
import { router as usersRouters } from "./routes/users-routes.mjs"

const app = express()
app.use(cors())

app.use("/api/users", usersRouters )


app.listen(3000, () => {
    console.log(`Server running at port 3000`);
})

