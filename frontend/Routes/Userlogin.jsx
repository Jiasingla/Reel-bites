import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'

const Userlogin = () => {
  const navigate = useNavigate()
  const [identifier, setidentifier] = useState("")
  const [password, setpassword] = useState("")

  async function handlesubmit(e) {
    e.preventDefault()
    const response = await axios.post("http://localhost:3000/api/auth/login", {
      identifier, password
    }, { withCredentials: true })

    if (response.data.message === "user logged in successfully") {
      navigate("/homepage")
    } else {
      alert("error occured")
    }
  }

  return (
    <motion.div
      className='login'
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1>Login Page</h1>
      <p>Switch <Link to='/foodpartner/login'>Foodpartner</Link> . <Link to='/user/login'>User</Link></p>

      <form onSubmit={handlesubmit}>
        <input
          onChange={(e) => setidentifier(e.target.value)}
          value={identifier}
          name="identifier"
          placeholder='Enter email or username'
        />
        <input
          onChange={(e) => setpassword(e.target.value)}
          value={password}
          name="password"
          type="password"
          placeholder='Enter password'
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
        >
          Submit
        </motion.button>
      </form>
    </motion.div>
  )
}

export default Userlogin