import express from "express"
import { getUserById, getUsers } from "../controllers/users-controllers.mjs"

export const router = express.Router()

router.get("/", getUsers)

router.get("/:id", getUserById)