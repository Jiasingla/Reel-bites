import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Userregister = () => {
  const navigate = useNavigate()
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [username, setusername] = useState("")

  async function handlesubmit(e) {
    e.preventDefault()
    const response = await axios.post("http://localhost:3000/api/auth/user/register", {
      email, username, password
    }, { withCredentials: true })
    console.log(response.data)
    navigate("/homepage")
  }

  return (
    <motion.div
      className='login'
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1>Create your Account</h1>
      <form onSubmit={handlesubmit}>
        <input onChange={(e) => setemail(e.target.value)} name='email' value={email} placeholder='Enter email' />
        <input onChange={(e) => setusername(e.target.value)} name='username' value={username} placeholder='Enter username' />
        <input onChange={(e) => setpassword(e.target.value)} name='password' value={password} placeholder='Enter password' />
        <motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }}>
          Submit
        </motion.button>
      </form>
    </motion.div>
  )
}

export default Userregister