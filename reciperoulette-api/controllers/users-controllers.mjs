import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const getUsers = async (req, res) => {
   const users = await prisma.user.findMany()
   res.json(users)
}

const getUserById = async (req, res) => {
    const id = req.params.id
    const user = await prisma.user.findUnique({
    where: {
        id: id
    }
})
res.json(user)
}

export {
    getUsers,
    getUserById
}