import { Router } from "express";
import { prismaClient } from "prisma/client";
import { authenticateAdmin } from "../../Middleware/admin.js";

const router: Router = Router()

router.post('/add-problem',authenticateAdmin, async(req, res) => {
    try {
        const { title, description } = req.body

        if(!title || !description){
            res.status(400).json({
                message: "Enter required fields"
            })

            return
        }

        const testCases = req.body.testCases

        if(testCases.length === 0){
            res.status(400).json({
                message: "Missing testcases"
            })

            return
        }

        // gotta check for duplicate problems
        const duplicates = await prismaClient.problem.findFirst({
            where: {
                OR: [
                    {title: {
                        equals: title.substring(0, 20),
                        mode: 'insensitive'
                    }},
                    {
                        testCases: {
                            
                        }
                    }
                ]
            }
        })

        if(!duplicates){
            res.status(400).json({
                message: "Duplicates found"
            })

            return
        }
        //@ts-ignore
        const adminId = req?.adminId

        const uploadedProblem = await prismaClient.problem.create({
            data: {
                authorId: adminId,
                title: title.trim(),
                description: description.trim(),
                testCases: testCases
            }
        })
        
        res.status(200).json({
            message: "Uploaded problem",
            problem: uploadedProblem
        })

        return

    } catch (error) {
        console.error('Faield tp upload problem', error)
        res.status(500).json({
            message: "Server error"
        })

        return
    }
})

export default router