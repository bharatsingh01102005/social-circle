import express from "express"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import connectDb from "./config/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRouter from "./routes/auth.routes.js"
import postRouter from "./routes/post.routes.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()
const port = process.env.PORT || 8000
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173"

app.use(cors({
  origin: clientUrl,
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

// Serve uploaded files
app.use("/uploads", express.static("public"))

// Serve frontend static files
app.use(express.static("../frontend/dist"))

// API routes
app.use("/api/auth", authRouter)
app.use("/api/post", postRouter)

// Serve frontend for all non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
})

app.listen(port, () => {
  connectDb()
  console.log(`server started on ${port}`)
})

