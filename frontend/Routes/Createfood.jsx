import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const CreateFood = () => {
  const navigate=useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!name || !description || !video) return alert("Fill all fields!")
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('video', video)
    try {
      setLoading(true)
      await axios.post('http://localhost:3000/api/food/', formData, { withCredentials: true })
      alert("Food added!")
      navigate("/homepage")
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full min-h-screen flex items-center justify-center px-4 py-10'
      style={{ background: 'linear-gradient(135deg, #ff6b00 0%, #ff9a3c 40%, #fff7f0 100%)' }}>
      <div className='w-full max-w-md'>

        {/* Header */}
        <div className='text-center mb-6'>
         
          <h2 className='text-2xl font-semibold text-white mb-1'>Add New Food</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)' }} className='text-sm'>Share your dish with the world</p>
        </div>

        {/* Card */}
        <div className='rounded-3xl p-7 bg-white' style={{ boxShadow: '0 8px 40px rgba(255,107,0,0.18)' }}>

          {/* Video */}
          <div className='mb-5'>
            <label className='block text-xs font-medium uppercase tracking-widest mb-2' style={{ color: '#ff6b00' }}>
              Video
            </label>
            <label className='flex flex-col items-center justify-center cursor-pointer rounded-2xl py-7 px-4'
              style={{ border: '2px dashed #ffd0a8', background: '#fff7f0' }}>
              <span className='text-3xl mb-2' style={{ color: '#ff9a3c' }}>💳</span>
              <p className='text-sm font-medium' style={{ color: '#cc5500' }}>
                {video ? video.name : 'Click to upload'}
              </p>
              <p className='text-xs mt-1' style={{ color: '#ffaa66' }}>MP4, MOV up to 100MB</p>
              <input type='file' accept='video/*' className='hidden'
                onChange={(e) => setVideo(e.target.files[0])} />
            </label>
          </div>

          {/* Food Name */}
          <div className='mb-5'>
            <label className='block text-xs font-medium uppercase tracking-widest mb-2' style={{ color: '#ff6b00' }}>
              Food Name
            </label>
            <input type='text' placeholder='e.g. Butter Chicken'
              value={name} onChange={(e) => setName(e.target.value)}
              className='w-full rounded-xl px-4 py-3 text-sm outline-none'
              style={{ border: '1.5px solid #ffd0a8', background: '#fff7f0', color: '#333' }} />
          </div>

          {/* Description */}
          <div className='mb-6'>
            <label className='block text-xs font-medium uppercase tracking-widest mb-2' style={{ color: '#ff6b00' }}>
              Description
            </label>
            <textarea placeholder='Describe your dish...' rows={3}
              value={description} onChange={(e) => setDescription(e.target.value)}
              className='w-full rounded-xl px-4 py-3 text-sm outline-none resize-none'
              style={{ border: '1.5px solid #ffd0a8', background: '#fff7f0', color: '#333', fontFamily: 'inherit' }} />
          </div>

          {/* Button */}
          <button onClick={handleSubmit} disabled={loading}
            className='w-full py-3 rounded-2xl text-white font-medium text-sm'
            style={{ background: 'linear-gradient(135deg, #ff6b00, #ff9a3c)' }}>
            {loading ? 'Uploading...' : '+ Add Food'}
          </button>
        </div>

        <p className='text-center text-s mt-4 font-bold' style={{ color: 'rgba(255,255,255,0.6)' }}>
          Your food will be visible to all customers
        </p>
      </div>
    </div>
  )
}

export default CreateFood