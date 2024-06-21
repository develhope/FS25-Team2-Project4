import pgPromise from "pg-promise";

const db = pgPromise()("postgresql://reciperoulettedb_owner:Xug4zHntU8cM@ep-shrill-block-a5m0moto.us-east-2.aws.neon.tech/reciperoulettedb?sslmode=require");


const getUsers = async (req, res) => {
   const users = await db.manyOrNone(`SELECT * FROM collection`)
   res.status(200).json(users)
}

/* const getUserById = async (req, res) => {
    const id = req.params.id
    const user = await prisma.user.findUnique({
    where: {
        id: id
    }
})
res.json(user)
} */

export {
    getUsers
}