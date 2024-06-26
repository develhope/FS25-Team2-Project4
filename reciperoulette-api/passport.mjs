import passport from "passport"
import passportJWT from "passport-jwt"
import dotenv from "dotenv"
import { db } from "./utils/DBhelpers.mjs"

dotenv.config()

const secretKey = process.env.SECRET_KEY

if (!secretKey) {
    throw new Error("No KEY variable was found in .env file")
}

const { Strategy, ExtractJwt } = passportJWT

passport.use(
    new Strategy(
        {
            secretOrKey: secretKey,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        async (payload, done) => {
            try {
                const user = await db.oneOrNone(`SELECT * FROM users WHERE id=$1`, [payload.id])
                if (user) {
                    return done(null, user)
                } else {
                    return done(null, false, { msg: "User not found" })
                }
            } catch (error) {
                done(error, false)
            }
        }
    )
)

export { passport }
