import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const bg = { background: 'linear-gradient(135deg, #ff6b00 0%, #ff9a3c 40%, #fff7f0 100%)' }

const Visitstore = () => {
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await axios.get(
          `http://localhost:3000/api/food-partner/${id}`,
          { withCredentials: true }
        )
        setProfile(profileRes.data.result[0])
        const videosRes = await axios.get(
          `http://localhost:3000/api/food/by-partner/${id}`,
          { withCredentials: true }
        )
        setVideos(videosRes.data.rows)
      } catch (err) {
        console.error('Error fetching store data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  if (loading) return (
    <div className='w-full min-h-screen flex items-center justify-center' style={bg}>
      <p style={{ color: 'white', fontSize: 16 }}>Loading store...</p>
    </div>
  )

  if (!profile) return (
    <div className='w-full min-h-screen flex items-center justify-center' style={bg}>
      <p style={{ color: 'white', fontSize: 18 }}>Store not found.</p>
    </div>
  )

  return (
    <div className='w-full min-h-screen' style={bg}>

      {/* Profile Card — original format kept */}
      <div className='px-4 pt-10 pb-4'>
        <div className='rounded-2xl overflow-hidden' style={{
          background: 'white',
          border: '1px solid rgba(255,107,0,0.15)',
          boxShadow: '0 4px 24px rgba(255,107,0,0.15)'
        }}>

          <div className='flex items-center gap-4 p-5'>
            <div className='relative shrink-0'>
              <img
                className='w-20 h-20 object-cover rounded-2xl'
                src='data:image/jpeg;base64,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'
                alt={profile.name}
              />
              <span className='absolute bottom-1 right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white'></span>
            </div>
            <div className='flex flex-col gap-1'>
              <h2 className='text-xl font-bold leading-tight' style={{ color: '#cc4400' }}>
                {profile.name}
              </h2>
              <p className='text-sm' style={{ color: '#888' }}>
                📍 {profile.address || 'Address, City'}
              </p>
              <span className='text-xs font-medium' style={{ color: '#22c55e' }}>● Open Now</span>
            </div>
          </div>

          <div style={{ height: '1px', background: '#ffe0c8' }}></div>

          <div className='flex'>
            <div className='flex-1 flex flex-col items-center py-4 gap-1'>
              <span className='text-2xl font-bold' style={{ color: '#333' }}>{videos.length}</span>
              <span className='text-xs uppercase tracking-wider' style={{ color: '#888' }}>Menu Items</span>
            </div>
            <div style={{ width: '1px', background: '#ffe0c8' }}></div>
            <div className='flex-1 flex flex-col items-center py-4 gap-1'>
              <span className='text-2xl font-bold' style={{ color: '#333' }}>15k</span>
              <span className='text-xs uppercase tracking-wider' style={{ color: '#888' }}>Served</span>
            </div>
            <div style={{ width: '1px', background: '#ffe0c8' }}></div>
            <div className='flex-1 flex flex-col items-center py-4 gap-1'>
              <span className='text-2xl font-bold' style={{ color: '#e65000' }}>4.8★</span>
              <span className='text-xs uppercase tracking-wider' style={{ color: '#888' }}>Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Videos Section */}
      <div style={{ padding: '8px 16px 40px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{ width: 4, height: 18, background: '#e05a00', borderRadius: 4 }} />
          <h3 style={{
            color: '#7a2d00', fontSize: 13, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: 2, margin: 0
          }}>
            Featured Items
          </h3>
        </div>

        {videos.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '40px 20px',
            background: 'white', borderRadius: 16,
            boxShadow: '0 2px 12px rgba(255,107,0,0.1)'
          }}>
            <p style={{ color: '#999', fontSize: 14 }}>No items posted yet.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {videos.map((video, i) => (
              <div key={i} style={{
                background: 'white', borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 2px 16px rgba(255,107,0,0.14)'
              }}>
                <video
                  style={{ width: '100%', aspectRatio: '9/16', objectFit: 'cover', display: 'block' }}
                  autoPlay muted loop playsInline
                  src={video.video}
                />
                
               
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Visitstore