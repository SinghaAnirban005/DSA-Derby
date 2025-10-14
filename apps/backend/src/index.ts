import express, { Express } from "express"
import cors from "cors"
import AuthRouter from "./Controllers/Auth.js"

const app: Express = express()

app.use(express.json())
app.use(cors())

app.use("/api/v1/auth", AuthRouter)


app.listen(4000)

export { app }