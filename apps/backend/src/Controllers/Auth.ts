import { Router } from "express";
import { Request, Response } from "express";
import { prismaClient } from "prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const router: Router = Router()

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

router.post("/signup", async(req: Request, res: Response) => {
    const { fullName, username, email, password, type } = req.body

    if(!fullName || !username || !email || !password || !type){
        res.status(400).json({
            message: "Enter all fields"
        })

        return
    }

    const existingUser = await prismaClient.user.findFirst({
        where: {
            username: username,
            email: email
        },
    })

    if(existingUser?.id){
        res.status(400).json({
            message: "User already exists"
        })
        
        return
    }

    const encryptedPass = await bcrypt.hash(password, 10)

    const user = await prismaClient.user.create({
        data: {
            username: username,
            type: type,
            fullName: fullName,
            email: email,
            password: encryptedPass
        }
    })

    res.status(200).json({
        user: user
    })

    return 
})

router.post("/login", async(req: Request, res: Response) => {
    const { email, password } = req.body

    if(!email || !password){
        res.status(400).json({
            message: "Enter all fields"
        })

        return
    }
    
    const user = await prismaClient.user.findFirst({
        where: {
            email: email
        }
    })

    if(!user){
        res.status(400).json({
            message: "No user exists"
        })

        return
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if(!isPasswordCorrect){
        res.status(400).json({
            message: "Password is incorrect"
        })

        return
    }

    const token = await jwt.sign({
        username: user.username,
        email: user.email,
        id: user.id
    }, String(JWT_SECRET_KEY))

    res.status(200).json({
        message: "Logged in !!",
        token: token
    })

    return
})

router.post("/logout", (req: Request, res: Response) => {
    
})

export default router;