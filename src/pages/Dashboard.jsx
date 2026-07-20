import { useMemo } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import RailwayMap from '../components/RailwayMap'
import TrainCard from '../components/TrainCard'
import SignalPanel from '../components/SignalPanel'
import CollisionPanel from '../components/CollisionPanel'
import Analytics from '../components/Analytics'
import EventLogs from '../components/EventLogs'
import CollisionMonitor from '../components/CollisionMonitor'
import PlatformPanel from '../components/PlatformPanel'
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

const signals = [
  { id: 'S101', state: 'Green', track: 'A' },
  { id: 'S205', state: 'Yellow', track: 'B' },
  { id: 'S312', state: 'Red', track: 'C' },
]

const platforms = [
  { name: 'Platform 1', status: 'Occupied', train: 'Rajdhani' },
  { name: 'Platform 2', status: 'Available', train: 'Available' },
  { name: 'Platform 3', status: 'Occupied', train: 'Vande Bharat' },
]

const collisionAlert = {
  title: 'Collision Risk',
  trainA: 'Train 101',
  trainB: 'Train 205',
  distance: '1.8 km',
  risk: 'HIGH',
}

const Dashboard = () => {
  const currentTime = useMemo(() => {
    const now = new Date()
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }, [])

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
          <div className="railway-map-span">
            <RailwayMap />
          </div>

          <div className="train-panel-span">
            <div className="stacked-panel">
              <div className="train-list">
                {trains.map((train) => (
                  <TrainCard key={train.name} train={train} />
                ))}
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Live Signals</p>
                <h3>Signal overview</h3>
              </div>
            </div>
            <div className="signal-body">
              {signals.map((s) => (
                <div key={s.id} className="route-node">
                  <div>
                    <strong>{s.id}</strong> - Track {s.track}
                  </div>
                  <div className={"signal-dot " + (s.state === 'Green' ? '' : s.state === 'Yellow' ? 'yellow' : 'red')}></div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <CollisionMonitor />
          </div>

          <div className="panel">
            <EventLogs />
          </div>

          <div className="panel">
            <Analytics />
          </div>

          <div className="panel">
            <AiRecommendationPanel />
          </div>

          <div className="panel">
            <NetworkHealthPanel />
          </div>

          <div className="panel">
            <WeatherPanel />
          </div>

          <div className="panel">
            <JunctionMonitorPanel />
          </div>

          <div className="panel today-summary">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Today's Summary</p>
                <h3>Overview</h3>
              </div>
            </div>
            <div className="map-route">
              <div className="route-node">Total Trains: <strong>124</strong></div>
              <div className="route-node">Delayed: <strong>3</strong></div>
              <div className="route-node">On Time: <strong>118</strong></div>
              <div className="route-node">Cancelled: <strong>3</strong></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Dashboard
