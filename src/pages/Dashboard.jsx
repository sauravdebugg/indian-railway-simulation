import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import RailwayMap from '../components/RailwayMap'
import TrainCard from '../components/TrainCard'
import Analytics from '../components/Analytics'
import EventLogs from '../components/EventLogs'
import CollisionMonitor from '../components/CollisionMonitor'
import AiRecommendationPanel from '../components/AiRecommendationPanel'
import NetworkHealthPanel from '../components/NetworkHealthPanel'
import WeatherPanel from '../components/WeatherPanel'
import JunctionMonitorPanel from '../components/JunctionMonitorPanel'

const trains = [
  { name: 'Rajdhani Express', speed: 90, track: 'A', platform: 2, signal: 'Green', status: 'On time', eta: '05:10' },
  { name: 'Shatabdi Express', speed: 88, track: 'B', platform: 4, signal: 'Yellow', status: 'Moderate', eta: '05:42' },
  { name: 'Vande Bharat', speed: 96, track: 'C', platform: 6, signal: 'Green', status: 'On time', eta: '06:05' },
  { name: 'Garib Rath', speed: 72, track: 'D', platform: 5, signal: 'Red', status: 'Delayed', eta: '06:20' },
]

const initialSignals = {
  S101: 'GREEN',
  S205: 'YELLOW',
  S312: 'RED',
}

const initialNotifications = [
  'Signal S101 changed.',
  'Collision alert generated.',
  'Train entered Platform 4.',
]

const initialAssistantMessages = [
  'AI: Which trains are delayed?',
  'Assistant: 3 trains are delayed by more than 10 minutes.',
]

const Dashboard = () => {
  const currentTime = useMemo(() => {
    const now = new Date()
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }, [])

  const [searchQuery, setSearchQuery] = useState('12301')
  const [searchResult, setSearchResult] = useState({
    code: '12301',
    name: 'Rajdhani Express',
    station: 'Kanpur',
    speed: 120,
    platform: 2,
    eta: '05:10',
  })
  const [signalStates, setSignalStates] = useState(initialSignals)
  const [selectedSignal, setSelectedSignal] = useState('S101')
  const [notifications, setNotifications] = useState(initialNotifications)
  const [statusMessage, setStatusMessage] = useState('Simulation running normally')
  const [assistantInput, setAssistantInput] = useState('')
  const [assistantMessages, setAssistantMessages] = useState(initialAssistantMessages)
  const [activeCCTV, setActiveCCTV] = useState('Platform 2')
  const [announcementText, setAnnouncementText] = useState('Attention please, Train 12301 Rajdhani Express is arriving at Platform 2.')

  const addNotification = (message) => {
    setNotifications((prev) => [message, ...prev].slice(0, 6))
  }

  const handleSearch = (event) => {
    event.preventDefault()
    const normalized = searchQuery.trim().toLowerCase()

    if (normalized === '12301' || normalized.includes('rajdhani')) {
      setSearchResult({
        code: '12301',
        name: 'Rajdhani Express',
        station: 'Kanpur',
        speed: 120,
        platform: 2,
        eta: '05:10',
      })
    } else if (normalized === '12002' || normalized.includes('shatabdi')) {
      setSearchResult({
        code: '12002',
        name: 'Shatabdi Express',
        station: 'Agra',
        speed: 108,
        platform: 4,
        eta: '05:42',
      })
    } else {
      setSearchResult({
        code: normalized.toUpperCase() || 'N/A',
        name: 'No match',
        station: 'Unknown',
        speed: 0,
        platform: '--',
        eta: '--',
      })
    }

    addNotification(`Searched train ${searchQuery}`)
  }

  const handleEmergencyAction = (action) => {
    setStatusMessage(action)
    addNotification(action)
  }

  const handleSignalChange = (color) => {
    const nextColor = color.toUpperCase()
    setSignalStates((prev) => ({ ...prev, [selectedSignal]: nextColor }))
    addNotification(`${selectedSignal} set to ${nextColor}`)
  }

  const handleAssistantSubmit = (event) => {
    event.preventDefault()
    const value = assistantInput.trim()
    if (!value) return

    const response = value.toLowerCase().includes('delay')
      ? 'Assistant: 3 trains are delayed by more than 10 minutes.'
      : value.toLowerCase().includes('signal')
        ? 'Assistant: Signal S101 is GREEN and S205 is YELLOW.'
        : 'Assistant: The control centre is tracking 12 active trains and 2 collision alerts.'

    setAssistantMessages((prev) => [`You: ${value}`, response, ...prev].slice(0, 6))
    setAssistantInput('')
    addNotification('AI assistant answered a query')
  }

  const speakAnnouncement = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return
    }

    const utterance = new SpeechSynthesisUtterance(announcementText)
    utterance.lang = 'en-IN'
    utterance.rate = 1
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
    addNotification('Voice announcement played')
  }

  return (
    <div className="dashboard-shell">
      <Sidebar />
      <main className="dashboard-main">
        <Navbar currentTime={currentTime} />

        <section className="grid grid-cols-4 gap-4 auto-rows-min kpi-grid">
          <article className="panel kpi-card">
            <p className="eyebrow">Running trains</p>
            <h2>12</h2>
          </article>
          <article className="panel kpi-card">
            <p className="eyebrow">Active signals</p>
            <h2>42</h2>
          </article>
          <article className="panel kpi-card">
            <p className="eyebrow">Platforms occupied</p>
            <h2>8</h2>
          </article>
          <article className="panel kpi-card">
            <p className="eyebrow">Collision alerts</p>
            <h2>1</h2>
          </article>
        </section>

        <section className="dashboard-grid grid auto-rows-min">
          <div className="panel railway-map-panel railway-map">
            <RailwayMap />
          </div>

          <div className="panel live-trains">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Live Trains</p>
                <h3>Active movement</h3>
              </div>
            </div>
            <div className="train-list">
              {trains.map((train) => (
                <TrainCard key={train.name} train={train} />
              ))}
            </div>
          </div>

          <div className="panel signals">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Live Signals</p>
                <h3>Signal overview</h3>
              </div>
            </div>
            <div className="signal-body">
              {Object.entries(signalStates).map(([id, state]) => (
                <div key={id} className="route-node">
                  <div>
                    <strong>{id}</strong>
                  </div>
                  <div className={"signal-dot " + (state === 'GREEN' ? '' : state === 'YELLOW' ? 'yellow' : 'red')}>{state}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel collision">
            <CollisionMonitor />
          </div>

          <div className="panel logs">
            <EventLogs />
          </div>

          <div className="panel analytics">
            <Analytics />
          </div>

          <div className="panel ai ai-panel">
            <AiRecommendationPanel />
          </div>

          <div className="panel health health-panel">
            <NetworkHealthPanel />
          </div>

          <div className="panel junction junction-panel">
            <JunctionMonitorPanel />
          </div>

          <div className="panel weather weather-panel">
            <WeatherPanel />
          </div>

          <div className="panel wide-panel search-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Train Search</p>
                <h3>Search train</h3>
              </div>
            </div>
            <form className="search-form" onSubmit={handleSearch}>
              <input
                className="search-input"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Enter train number"
              />
              <button className="action-btn" type="submit">Search</button>
            </form>
            <div className="search-result">
              <div className="result-line"><span>Result</span><strong>{searchResult.name}</strong></div>
              <div className="result-line"><span>Current station</span><strong>{searchResult.station}</strong></div>
              <div className="result-line"><span>Speed</span><strong>{searchResult.speed} km/h</strong></div>
              <div className="result-line"><span>Platform</span><strong>{searchResult.platform}</strong></div>
              <div className="result-line"><span>ETA</span><strong>{searchResult.eta}</strong></div>
            </div>
          </div>

          <div className="panel wide-panel emergency-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Emergency Controls</p>
                <h3>Control centre actions</h3>
              </div>
            </div>
            <div className="status-pill">{statusMessage}</div>
            <div className="control-grid">
              <button className="action-btn" type="button" onClick={() => handleEmergencyAction('Pause Simulation')}>Pause Simulation</button>
              <button className="action-btn" type="button" onClick={() => handleEmergencyAction('Resume Simulation')}>Resume</button>
              <button className="action-btn danger" type="button" onClick={() => handleEmergencyAction('Emergency Stop')}>Emergency Stop</button>
              <button className="action-btn" type="button" onClick={() => handleEmergencyAction('Reset Signals')}>Reset Signals</button>
            </div>
          </div>

          <div className="panel cctv-panel compact-card">
            <div className="panel-head">
              <div>
                <p className="eyebrow">CCTV Monitoring</p>
                <h3>Platform feed</h3>
              </div>
            </div>
            <div className="cctv-tabs">
              {['Platform 1', 'Platform 2', 'Platform 3'].map((platform) => (
                <button
                  key={platform}
                  type="button"
                  className={activeCCTV === platform ? 'chip active' : 'chip'}
                  onClick={() => setActiveCCTV(platform)}
                >
                  {platform}
                </button>
              ))}
            </div>
            <div className="cctv-feed">
              <div className="cctv-overlay">{activeCCTV}</div>
              <div className="cctv-visual">
                <div className="camera-badge">📹</div>
                <div className="cctv-text">Train 12301 • Platform 2</div>
                <div className="cctv-text muted">Open Rails camera feed active</div>
              </div>
            </div>
          </div>

          <div className="panel delay-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Delay Prediction</p>
                <h3>AI forecast</h3>
              </div>
            </div>
            <div className="prediction-card">
              <h4>Rajdhani Express</h4>
              <p className="prediction-value">85% chance of 10 min delay</p>
              <ul>
                <li>Signal congestion</li>
                <li>Weather impact</li>
              </ul>
            </div>
          </div>

          <div className="panel passengers-panel compact-card">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Passenger Statistics</p>
                <h3>Today</h3>
              </div>
            </div>
            <div className="stat-block compact-stat">
              <div className="big-number">24,500</div>
              <div className="tiny-list">
                <div>Peak: 8-10 AM</div>
                <div>Evening: 6-8 PM</div>
              </div>
            </div>
          </div>

          <div className="panel route-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Route Planner</p>
                <h3>Delhi → Howrah</h3>
              </div>
            </div>
            <div className="route-list">
              <div className="route-item"><span>Distance</span><strong>1450 km</strong></div>
              <div className="route-item"><span>Agra</span><strong>Stop</strong></div>
              <div className="route-item"><span>Kanpur</span><strong>Stop</strong></div>
              <div className="route-item"><span>Prayagraj</span><strong>Stop</strong></div>
              <div className="route-item"><span>Varanasi</span><strong>Stop</strong></div>
              <div className="route-item"><span>Patna</span><strong>Stop</strong></div>
            </div>
          </div>

          <div className="panel wide-panel notifications-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Notifications</p>
                <h3>Center feed</h3>
              </div>
            </div>
            <ul className="notification-list">
              {notifications.map((message, index) => (
                <li key={`${message}-${index}`}>{message}</li>
              ))}
            </ul>
          </div>

          <div className="panel metrics-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Performance Metrics</p>
                <h3>System health</h3>
              </div>
            </div>
            <div className="metric-grid">
              <div className="metric-box"><span className="metric-label">CPU Usage</span><strong>28%</strong></div>
              <div className="metric-box"><span className="metric-label">Memory</span><strong>1.2 GB</strong></div>
              <div className="metric-box"><span className="metric-label">API latency</span><strong>12 ms</strong></div>
              <div className="metric-box"><span className="metric-label">Simulator FPS</span><strong>60</strong></div>
            </div>
          </div>

          <div className="panel wide-panel ai-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">AI Assistant</p>
                <h3>Ask AI</h3>
              </div>
            </div>
            <form className="assistant-form" onSubmit={handleAssistantSubmit}>
              <input
                className="search-input"
                value={assistantInput}
                onChange={(event) => setAssistantInput(event.target.value)}
                placeholder="Which trains are delayed?"
              />
              <button className="action-btn" type="submit">Ask</button>
            </form>
            <div className="assistant-log">
              {assistantMessages.map((message, index) => (
                <div key={`${message}-${index}`} className="assistant-message">{message}</div>
              ))}
            </div>
          </div>

          <div className="panel timeline-panel compact-card">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Train Timeline</p>
                <h3>Rajdhani Express</h3>
              </div>
            </div>
            <div className="timeline-list">
              <div className="timeline-item"><span>Delhi</span><strong>22:00</strong></div>
              <div className="timeline-item"><span>Agra</span><strong>23:10</strong></div>
              <div className="timeline-item"><span>Kanpur</span><strong>01:00</strong></div>
              <div className="timeline-item"><span>Prayagraj</span><strong>03:00</strong></div>
              <div className="timeline-item"><span>Varanasi</span><strong>05:10</strong></div>
            </div>
          </div>

          <div className="panel signal-panel compact-card">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Signal Control Panel</p>
                <h3>{selectedSignal}</h3>
              </div>
            </div>
            <div className="signal-controls">
              <div className="cctv-tabs">
                {Object.keys(signalStates).map((signal) => (
                  <button
                    key={signal}
                    type="button"
                    className={selectedSignal === signal ? 'chip active' : 'chip'}
                    onClick={() => setSelectedSignal(signal)}
                  >
                    {signal}
                  </button>
                ))}
              </div>
              <div className="signal-current">Current: {signalStates[selectedSignal]}</div>
              <div className="signal-details">
                <div>Track: A</div>
                <div>State: {signalStates[selectedSignal]}</div>
                <div>Last updated: 01:42</div>
              </div>
              <div className="control-grid compact">
                <button className="action-btn" type="button" onClick={() => handleSignalChange('green')}>GREEN</button>
                <button className="action-btn" type="button" onClick={() => handleSignalChange('yellow')}>YELLOW</button>
                <button className="action-btn danger" type="button" onClick={() => handleSignalChange('red')}>RED</button>
              </div>
            </div>
          </div>

          <div className="panel heat-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Collision Heat Map</p>
                <h3>Risk zones</h3>
              </div>
            </div>
            <div className="heat-map">
              <div className="heat-card safe">
                <span>Low Risk</span>
                <strong>Delhi</strong>
              </div>
              <div className="heat-card medium">
                <span>Medium Risk</span>
                <strong>Kanpur</strong>
              </div>
              <div className="heat-card critical">
                <span>High Risk</span>
                <strong>Prayagraj</strong>
              </div>
            </div>
          </div>

          <div className="panel weather-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Weather Radar</p>
                <h3>Current conditions</h3>
              </div>
            </div>
            <div className="weather-list">
              <div className="weather-item"><strong>Delhi</strong><span>31°C</span></div>
              <div className="weather-item"><strong>Kanpur</strong><span>Rain</span></div>
              <div className="weather-item"><strong>Varanasi</strong><span>Fog</span></div>
            </div>
          </div>

          <div className="panel today-summary summary-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Today's Summary</p>
                <h3>Operations overview</h3>
              </div>
            </div>
            <div className="summary-grid">
              <div className="metric-box"><span className="metric-label">Total trains</span><strong>124</strong></div>
              <div className="metric-box"><span className="metric-label">On time</span><strong>118</strong></div>
              <div className="metric-box"><span className="metric-label">Delayed</span><strong>3</strong></div>
              <div className="metric-box"><span className="metric-label">Cancelled</span><strong>3</strong></div>
              <div className="metric-box"><span className="metric-label">Collisions prevented</span><strong>2</strong></div>
            </div>
          </div>

          <div className="panel voice-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Voice Announcements</p>
                <h3>Audio cue</h3>
              </div>
            </div>
            <p className="announcement-text">{announcementText}</p>
            <textarea
              className="search-input"
              value={announcementText}
              onChange={(event) => setAnnouncementText(event.target.value)}
              rows="3"
            />
            <button className="action-btn wide" type="button" onClick={speakAnnouncement}>Play announcement</button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Dashboard
