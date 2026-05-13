import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Userlogin = () => {
  const navigate=useNavigate()
   async function handlesubmit(e){
        e.preventDefault()
        const response= await axios.post("http://localhost:3000/api/auth/user/register",{
          email,password
        },{
          withCredentials:true
        })
        console.log(response.data)
        if(response.data.message=='user registered successfully'){
 navigate("/createfood")
        }else{
          alert("error occured")
        }
       
    }
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
  return (
    <div className='login'>
        <h1>Foodpartner Login Page</h1>
        <p>Switch <Link to='/user/register'>User</Link></p>
      <form onSubmit={handlesubmit} >
        <input onChange={(e)=>{
          setemail(e.target.value)
        }} value={email} name="email" placeholder='Enter email'></input>
        <input value={password} onChange={(e)=>{
          setpassword(e.target.value)
        }} name="password" placeholder='Enter password' ></input>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Userlogin
