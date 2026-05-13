import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Heart, Bookmark, House, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Homepage = () => {
  const [videos, setvideos] = useState([])
  const [liked, setLiked] = useState({})
  const [saved, setSaved] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchvideos = async () => {
      const response = await axios.get("http://localhost:3000/api/food/", { withCredentials: true })
      setvideos(response.data.rows)
      setLoading(false)
    }
    fetchvideos()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleLike = async (food_id) => {
    try {
      const response = await axios.post("http://localhost:3000/api/food/likes",
        { food_id },
        { withCredentials: true }
      )
      if (response.data.message === "liked") {
        setLiked({ ...liked, [food_id]: true })
      } else {
        setLiked({ ...liked, [food_id]: false })
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleSave = async (food_id) => {
    try {
      const response = await axios.post("http://localhost:3000/api/food/save",
        { food_id },
        { withCredentials: true }
      )
      if (response.data.message === "liked") {
        setSaved({ ...saved, [food_id]: true })
      } else {
        setSaved({ ...saved, [food_id]: false })
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              background: 'linear-gradient(135deg, #ff6b00 0%, #ff9a3c 40%, #fff7f0 100%)',
              gap: '16px'
            }}
          >
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              border: '3px solid rgba(255,255,255,0.2)',
              borderTop: '3px solid #fff',
              animation: 'spin 0.8s linear infinite'
            }} />
            <p style={{ color: '#fff', fontSize: '14px', fontWeight: '500' }}>Loading...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </motion.div>

        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {videos.map((video, i) => (
              <motion.div
                key={i}
                className="video-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                <video autoPlay muted loop playsInline src={video.video} />

                <div className='video-between'>
                  <motion.div
                    whileTap={{ scale: 1.3 }}
                    whileHover={{ scale: 1.2, y: -2 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Heart
                      size={26}
                      strokeWidth={3.5}
                      onClick={() => handleLike(video.sno)}
                      color={liked[video.sno] ? "red" : "#faf5f5"}
                      fill={liked[video.sno] ? "red" : "none"}
                      style={{ cursor: 'pointer' }}
                    />
                  </motion.div>

                  <motion.div
                    whileTap={{ scale: 1.3 }}
                    whileHover={{ scale: 1.2, y: -2 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Bookmark
                      size={26}
                      strokeWidth={3.5}
                      onClick={() => handleSave(video.sno)}
                      color={saved[video.sno] ? "black" : "#ffffff"}
                      fill={saved[video.sno] ? "white" : "none"}
                      style={{ cursor: 'pointer' }}
                    />
                  </motion.div>
                </div>

                <div className="video-below">
                  <p className="video-desc">{video.description}</p>
                  <Link to={`/food-partner/${video.foodpartner_id}`}>
                    <motion.button
                      className="visit-btn"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      Visit Store
                    </motion.button>
                  </Link>
                </div>

              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="bottom"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Link to="/homepage">
          <motion.div
            whileHover={{ scale: 1.2, y: -4 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <House size={34} color="#f7f7f7" strokeWidth={2.5} />
          </motion.div>
        </Link>

        <motion.div
          whileHover={{ scale: 1.2, y: -4 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Search size={34} color="#f7f7f7" strokeWidth={2.5} />
        </motion.div>

        <Link to="/savepage">
          <motion.div
            whileHover={{ scale: 1.2, y: -4 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Bookmark size={34} color="#f7f7f7" strokeWidth={2.5} />
          </motion.div>
        </Link>
      </motion.div>
    </>
  )
}

export default Homepage