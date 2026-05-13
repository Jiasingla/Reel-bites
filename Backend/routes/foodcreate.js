import express from 'express'
import db from '../src/db.js'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import bcrypt from 'bcrypt'
import multer from 'multer'
import uploadfile from '../services.js'

const upload = multer({ dest: '/tmp/uploads' })
const router = express.Router()

export async function authFoodPartnerMiddleware(req, res, next) {
  const token = req.cookies.foodpartner_token
  if (!token) {
    return res.json({ message: "please login first" })
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
      db.query("SELECT * FROM foodpartner WHERE sno=?", [decoded.id], (err, rows) => {
        if (err) {
          res.json({ message: "error occured", error: err })
        } else {
          if (rows.length === 0) {
            return res.status(401).json({ message: "user not found" })
          } else {
            req.foodpartner = rows[0]
            next()
          }
        }
      })
    } catch (err) {
      res.json({ error: err })
    }
  }
}

router.post("/", authFoodPartnerMiddleware, upload.single("video"), async (req, res) => {
  const { name, description } = req.body
  const fileuploadresult = await uploadfile(req.file.path, req.file.originalname)
  console.log("upload result:", fileuploadresult)
  const video = fileuploadresult.url
  const foodpartnername = req.foodpartner.name
  const foodpartner_id = req.foodpartner.sno

  db.query("INSERT INTO foodschema(name,video,description,foodpartnername,foodpartner_id) VALUES(?,?,?,?,?)",
    [name, video, description, foodpartnername,foodpartner_id], (err, rows) => {
      
      if (!err) {
        res.json({ message: "inserted successfuly", rows: rows })
      } else {
        res.json({ error: err })
      }
    })
})

router.get("/", (req, res) => {
  db.query("SELECT * FROM foodschema", (err, result) => {
    if (err) {
      res.json({ message: "error" })
    } else {
      res.json({ rows: result })
    }
  })
})

// NEW ROUTE — get all videos by food partner id
router.get('/by-partner/:id', (req, res) => {
  const { id } = req.params
  db.query('SELECT * FROM foodschema WHERE foodpartner_id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error', error: err })
    res.json({ rows: results })
  })
})
router.post("/likes", (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ message: "User not logged in" })
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
  const user_id = decoded.id
  const { food_id } = req.body  // send food_id from frontend

  // Check if already liked
  db.query("SELECT * FROM likes WHERE user_id=? AND food_id=?", [user_id, food_id], (err, result) => {
    if (err) return res.json({ message: "error", error: err })

    if (result.length > 0) {
      // Already liked → unlike
      db.query("DELETE FROM likes WHERE user_id=? AND food_id=?", [user_id, food_id], (err) => {
        if (err) return res.json({ message: "error", error: err })
        res.json({ message: "unliked" })
      })
    } else {
      // Not liked → like
      db.query("INSERT INTO likes(user_id, food_id) VALUES(?,?)", [user_id, food_id], (err) => {
        if (err) return res.json({ message: "error", error: err })
        res.json({ message: "liked" })
      })
    }
  })
})
router.post("/save", (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ message: "User not logged in" })
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
  const user_id = decoded.id
  const { food_id } = req.body  // send food_id from frontend

  // Check if already liked
  db.query("SELECT * FROM save WHERE user_id=? AND food_id=?", [user_id, food_id], (err, result) => {
    if (err) return res.json({ message: "error", error: err })

    if (result.length > 0) {
      // Already liked → unlike
      db.query("DELETE FROM save WHERE user_id=? AND food_id=?", [user_id, food_id], (err) => {
        if (err) return res.json({ message: "error", error: err })
        res.json({ message: "unliked" })
      })
    } else {
      // Not liked → like
      db.query("INSERT INTO save(user_id, food_id) VALUES(?,?)", [user_id, food_id], (err) => {
        if (err) return res.json({ message: "error", error: err })
        res.json({ message: "liked" })
      })
    }
  })
})
router.get("/save",(req,res)=>{
  const token=req.cookies.token
  if(!token){
    res.json({
      message:"plz login first",
    })
  }else{
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
    if(!decoded){
      res.json({
        error:err,
      })
    }else{
      db.query(`SELECT f.sno, f.name, f.video, f.description, f.foodpartnername, f.foodpartner_id 
     FROM save s 
     JOIN foodschema f ON s.food_id = f.sno 
     WHERE s.user_id = ?`,
    [decoded.id],(err,result)=>{
        if(err){
          res.json({
            error:err
          })
        }else{
          res.json({rows:result

          })
        }
      })
    }
  }
})
export default router