import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { prismaClient } from "prisma/client"

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

export const authenticateAdmin = async(req: Request, res: Response, next: NextFunction) => {
    const header = req.headers['authorization'] || ''

    const token = header.split('Bearer ')[1]

    if(!token){
        res.status(400).json({
            message: "Token not available"
        })

        return
    }

    const user = await jwt.verify(token, JWT_SECRET_KEY as string)

    if(!user){
        return res.status(400).json({
            message: "User not found"
        })
    }

    const admin = await prismaClient.user.findFirst({
        where: {
            //@ts-ignore
            id: user?.id
        }
    })

    if(admin?.type !== "Admin"){
        res.status(400).json({
            message: "Invlaid admin"
        })

        return
    }
    //@ts-ignore
    req.adminId = admin.id
    
    next()
}

