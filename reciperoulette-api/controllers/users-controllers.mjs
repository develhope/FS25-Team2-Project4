import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import { db } from "../utils/DBhelpers.mjs"

dotenv.config()

const secretKey = process.env.SECRET_KEY

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
            const hashedPassword = await bcrypt.hash(password, 10)
            //creo il nuovo utente utilizzando i dati ricevuti
            const { id } = await db.one(`INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id;`, [
                username,
                email,
                hashedPassword,
            ])
            //assegno una riga di preferences a questo utente e inizializzo le colonne JSON e INTEGER []
            await db.none(`INSERT INTO preferences (user_id, blacklisted_ingredients, preferred_cuisines, dietary_preferences) VALUES ($1, $2, $3, $4);`, [
                id,
                [],
                [],
                {}
            ]) 
            res.status(201).json({ id, msg: "User created successfully" })
        } else {
            res.status(400).json({ msg: "A user with this email or username already exists" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Internal server error" })
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await db.oneOrNone(`SELECT * FROM users WHERE username=$1`, [username])

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: "7d" })
            await db.none(`UPDATE users SET token=$2 WHERE username=$1`, [username, token])
            res.status(200).json({ msg: "Logged in", id: user.id, username: user.username, token })
        } else {
            res.status(401).json({ msg: "Invalid credentials" })
        }
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" })
    }
}

const logout = async (req, res) => {
    try {
        const user = req.user

        if (!user) {
            return res.status(400).json({ msg: "User not authenticated" })
        }

        await db.none(`UPDATE users SET token=$2 WHERE id=$1`, [user.id, null])
        res.status(200).json({ msg: "User logged out" })
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" })
    }
}

export { getUsers, signup, login, logout }
