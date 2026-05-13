import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Foodpartnerregister = () => {
  const navigate=useNavigate()
    async function handlesubmit(e){
        e.preventDefault()
        const response= await axios.post("http://localhost:3000/api/auth/foodpartner/register",{
          email,name,password
        },{
          withCredentials:true
        })
        console.log(response.data)
        navigate("/createfood")
    }
     const [email,setemail]=useState("")
        const [password,setpassword]=useState("")
        const [name,setname]=useState("")
  return (
    <div className='login'>
        <h1>FoodPartner Register</h1>
        
      <form onSubmit={handlesubmit}>
        <input value={name} onChange={(e)=>{
          setname(e.target.value)
        }} name="name" placeholder='Enter name'></input>
        <input onChange={(e)=>{
          setemail(e.target.value)
        }} value={email} name="email" placeholder='Enter email'></input>
        <input onChange={(e)=>{
          setpassword(e.target.value)
        }} value={password} name='password' placeholder='Enter password'></input>
        <button>Submit</button>
      </form>
    </div>
  
  )
}

export default Foodpartnerregister
