import pgPromise from "pg-promise"
import dotenv from "dotenv"
dotenv.config()

const url = process.env.DATABASE_URL

const db = pgPromise()(url)

const getUsers = async (req, res) => {
    try {
        const users = await db.manyOrNone(`SELECT * FROM users`)
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ msg: "internal server error" })
    }
}

const signup = (req, res) => {}

export { getUsers, signup }
