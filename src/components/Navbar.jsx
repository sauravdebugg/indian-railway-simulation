import { FiClock, FiWifi, FiBell, FiMoon, FiSun } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const Navbar = ({ currentTime }) => {
  const [lastSync, setLastSync] = useState(currentTime)
  const [alerts, setAlerts] = useState(3)
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const t = setInterval(() => setLastSync(new Date().toLocaleTimeString()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <motion.header
      className="navbar"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <p className="eyebrow">Railway control center</p>
        <h1>Indian Railway Control Centre</h1>
      </div>

      <div className="navbar-meta">
        <div className="meta-pill">
          <FiClock />
          <span>{currentTime}</span>
        </div>

        <div className="meta-pill active">
          <FiWifi />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>Simulator: Open Rails</span>
            <small style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Last Sync: {lastSync}</small>
          </div>
        </div>

        <div className="meta-pill">
          <button className="control-btn" onClick={() => alert('Pause Simulation')}>Pause</button>
          <button className="control-btn" onClick={() => alert('Resume Simulation')}>Resume</button>
          <button className="control-btn danger" onClick={() => alert('EMERGENCY STOP')}>Emergency</button>
          <button className="control-btn" onClick={() => alert('Reset Simulation')}>Reset</button>
        </div>

        <div className="meta-pill">
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button className="icon-btn" onClick={() => setAlerts((a) => Math.max(0, a - 1))}>
              <FiBell /> {alerts}
            </button>
            <button className="icon-btn" onClick={() => setDark((d) => !d)}>{dark ? <FiMoon /> : <FiSun />}</button>
            <span className="avatar">👤</span>
            <span>Admin Kumar</span>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Navbar
