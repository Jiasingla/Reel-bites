import express from 'express'
import db from '../src/db.js'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import bcrypt from 'bcrypt'
const router=express.Router()

router.post("/user/register",(req,res)=>{
const {username,email,password}=req.body
db.query("SELECT * FROM user WHERE username=? OR email=?",[username,email],async (err,rows)=>{
    if(err){
        return res.json({
            message:"error occured"
        })
    }else{
        if(rows.length>0){
            return res.json({
                message:"user already exist"
            })
        }else{
            const hashedpassword=await bcrypt.hash(password,10)
            db.query("INSERT INTO user(username,email,password) VALUES(?,?,?)",[username,email,hashedpassword],(err,result)=>{
                if(err){
                    return res.json({
                        error:err
                    })
                }else{
                    const token=jwt.sign({
                        id:result.insertId,
                        username:username
                    },(process.env.JWT_SECRET_KEY))
                    res.cookie("token",token)
                    res.json({
                        message:"user registered successfully"
                    })
                }
            })
        }
    }
})
})
router.post("/login",(req,res)=>{
    const {identifier,password}=req.body
    db.query("SELECT * FROM user WHERE username=? OR email=?",[identifier,identifier],async (err,result)=>{
        if(err){
            return res.json({error:err})
        }else{
            if(result.length==0){
                return res.json({
                    message:"User isnt registered"
                })
            }else{
                const user=result[0]
                const isloggedin=await bcrypt.compare(password,user.password)
                if(isloggedin){
                    const token=jwt.sign({
                        id:user.sno,
                        username:user.username
                    },(process.env.JWT_SECRET_KEY))
                    res.cookie("token",token)
                    return res.json({
                        message:"user logged in successfully"
                    })
                }else{
                    
                    return res.json({
                        message:"incorrect password"
                    })
                }
            }
        }
    })
})
router.get("/logout",(req,res)=>{
    res.clearCookie("token")
    res.json({
        message:"user logged out successfully"
    })
})
router.post("/foodpartner/register",(req,res)=>{
const {name,email,password}=req.body
db.query("SELECT * FROM foodpartner WHERE email=?",[email],async (err,rows)=>{
    if(err){
        return res.json({
            message:"error occured"
        })
    }else{
        if(rows.length>0){
            return res.json({
                message:"foodpartner already exist"
            })
        }else{
            const hashedpassword=await bcrypt.hash(password,10)
            db.query("INSERT INTO foodpartner(name,email,password) VALUES(?,?,?)",[name,email,hashedpassword],(err,result)=>{
                if(err){
                    return res.json({
                        error:err
                    })
                }else{
                    const token=jwt.sign({
                        id:result.insertId,
                        name:name
                    },(process.env.JWT_SECRET_KEY))
                    res.cookie("foodpartner_token",token)
                    res.json({
                        message:"foodpartner registered successfully"
                    })
                }
            })
        }
    }
})
})
router.post("/foodpartner/login",(req,res)=>{
    const {email,password}=req.body
    db.query("SELECT * FROM foodpartner WHERE email=?",[email],async (err,result)=>{
        if(err){
            return res.json({error:err})
        }else{
            if(result.length==0){
                return res.json({
                    message:"User isnt registered"
                })
            }else{
                const user=result[0]
                const isloggedin=await bcrypt.compare(password,user.password)
                if(isloggedin){
                    const token=jwt.sign({
                        id:user.sno,
                        name:user.name
                    },(process.env.JWT_SECRET_KEY))
                    res.cookie("foodpartner_token",token)
                    return res.json({
                        message:"user logged in successfully"
                    })
                }else{
                    
                    return res.json({
                        message:"incorrect password"
                    })
                }
            }
        }
    })
})
router.get("/foodpartner/logout",(req,res)=>{
    res.clearCookie("foodpartner_token")
    res.json({
        message:"user logged out successfully"
    })
})


export default router