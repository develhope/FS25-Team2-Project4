// può contenere i metodi da riutilizzare
import pgPromise from "pg-promise"
import dotenv from "dotenv"

dotenv.config()

const url = process.env.DATABASE_URL

export const db = pgPromise()(url)