import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { House, Bookmark ,Search} from 'lucide-react'
import { Link } from 'react-router-dom'
const Savedpage = () => {
  const [savedata, setsavedata] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchdata() {
      const response = await axios.get("http://localhost:3000/api/food/save", { withCredentials: true })
      setsavedata(response.data.rows)
      setLoading(false)
    }
    fetchdata()
  }, [])

  return (
    <>
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ff6b00 0%, #ff9a3c 40%, #fff7f0 100%)', paddingBottom: '80px' }}>

        {/* Header */}
        <div style={{
          padding: '20px 16px 16px',
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.15)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 4px' }}>
            Collection
          </p>
          <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: '700', margin: 0 }}>
            Saved Reels
            <span style={{ marginLeft: '10px', fontSize: '13px', fontWeight: '500', color: 'rgba(255,255,255,0.7)' }}>
              {savedata.length} videos
            </span>
          </h1>
        </div>

        {/* Loading */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              border: '3px solid rgba(255,255,255,0.2)',
              borderTop: '3px solid #fff',
              animation: 'spin 0.8s linear infinite'
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </div>

        ) : savedata.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔖</div>
            <p style={{ fontSize: '16px', color: '#fff', fontWeight: '600' }}>No saved videos yet</p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Save reels from the home feed to see them here</p>
          </div>

        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            padding: '12px',
          }}>
            {savedata.map((data, index) => (
              <div key={index} style={{
                position: 'relative',
                aspectRatio: '9/16',
                overflow: 'hidden',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}>
                <video
                  autoPlay muted loop playsInline
                  src={data.video}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '24px 8px 8px',
                  background: 'linear-gradient(transparent, rgba(255,100,0,0.6))',
                  borderRadius: '0 0 12px 12px',
                }}>
                  <p style={{ color: '#fff', fontSize: '11px', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {data.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ outside everything */}
      <div className="bottom">
        <Link to="/homepage"><House size={34} color="#f7f7f7" strokeWidth={2.5} /></Link>
                <Search size={34} color="#f7f7f7" strokeWidth={2.5} />
                <Link to="/savepage"><Bookmark size={34} color="#f7f7f7" strokeWidth={2.5}/></Link>
      </div>
    </>
  )
}

export default Savedpage