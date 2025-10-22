import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { prismaClient } from "prisma/client"

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

export const authenticateUser = async(req: Request, res: Response, next: NextFunction) => {
    const header = req.headers['authorization'] || ''

    const token = header.split('Bearer ')[1]

    if(!token){
        res.status(400).json({
            message: "Token not available"
        })

        return
    }

    const verify = await jwt.verify(token, JWT_SECRET_KEY as string)

    if(!verify){
        return res.status(400).json({
            message: "User not found"
        })
    }

    const verifiedUser = await prismaClient.user.findFirst({
        where: {
            //@ts-ignore
            id: verify?.id
        }
    })

    //@ts-ignore
    req.userId = verifiedUser.id
    
    next()
}

