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

const signup = async (req, res) => {
    try {
        const { email, username, password } = req.body
        const emailExists = await db.oneOrNone(`SELECT email FROM users WHERE email=$1`, email)
        const usernameExists = await db.oneOrNone(`SELECT username FROM users WHERE username=$1`, username)
        if (!emailExists && !usernameExists) {
            const { id } = await db.one(`INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id;`, [
                username,
                email,
                password,
            ])
            res.status(201).json({ id, msg: "User created successfully" })
        } else {
            res.status(400).json({ msg: "An user with this email or username already exists" })
        }
    } catch (error) {
        console.log()
        res.status(500).json({ msg: "Internal server error" })
    }
}

export { getUsers, signup }
