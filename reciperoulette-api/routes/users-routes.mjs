import express from "express"
import {getUsers } from "../controllers/users-controllers.mjs"

export const router = express.Router()

router.get("/", getUsers)

/* router.get("/:id", getUserById) */