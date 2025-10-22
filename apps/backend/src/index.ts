import express, { Express } from "express"
import cors from "cors"
import AuthRouter from "./Controllers/Auth.js"
import AdminRouter from "./Controllers/Admin/index.js"
import dotenv from "dotenv"

dotenv.config()

const app: Express = express()

app.use(express.json())
app.use(cors())

app.use("/api/v1/auth", AuthRouter)
app.use("/api/v1/admin", AdminRouter)


app.listen(4000)

export { app }