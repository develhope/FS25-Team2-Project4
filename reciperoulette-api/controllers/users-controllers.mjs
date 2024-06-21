import pgPromise from "pg-promise"
import dotenv from "dotenv"

dotenv.config()
const url = process.env.DATABASE_URL

const db = pgPromise()(url)

const getUsers = async (req, res) => {
    const users = await db.manyOrNone(`SELECT * FROM users`)
    res.status(200).json(users)
}

export { getUsers }