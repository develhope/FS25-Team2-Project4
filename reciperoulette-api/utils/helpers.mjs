// può contenere i metodi da riutilizzare
import pgPromise from "pg-promise"
import dotenv from "dotenv"

//import { PrismaClient } from "@prisma/client";

//export const prisma = new PrismaClient()

dotenv.config()
const url = process.env.DATABASE_URL

export const db = pgPromise()(url)