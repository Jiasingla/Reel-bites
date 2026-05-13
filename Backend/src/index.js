import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import authroute from '../routes/authroute.js'
import foodroute from '../routes/foodcreate.js'
import foodpartner from '../routes/food-partner.route.js'

import cors from 'cors'
const app=express()

console.log(process.env.JWT_SECRET_KEY)

app.use(cors({
    origin: "http://localhost:5173",  // ✅ exact frontend URL, not *
  credentials: true  
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authroute)
app.use("/api/food",foodroute)
app.use("/api/food-partner",foodpartner)
export default app