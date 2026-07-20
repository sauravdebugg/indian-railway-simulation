import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const routeNodes = [
  { name: 'Delhi', signal: 'green' },
  { name: 'Agra', signal: 'yellow' },
  { name: 'Kanpur', signal: 'green' },
  { name: 'Prayagraj', signal: 'green' },
  { name: 'Varanasi', signal: 'red' },
  { name: 'Patna', signal: 'yellow' },
  { name: 'Howrah', signal: 'green' },
]

const RailwayMap = () => {
  const [activeTrain, setActiveTrain] = useState(0)
  const [signals, setSignals] = useState(routeNodes)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTrain((prev) => (prev + 1) % routeNodes.length)
    }, 1400)

    return () => clearInterval(timer)
  }, [])

  const toggleSignal = (index) => {
    setSignals((prev) =>
      prev.map((node, nodeIndex) => {
        if (nodeIndex !== index) return node
        const states = ['green', 'yellow', 'red']
        const currentIndex = states.indexOf(node.signal)
        return { ...node, signal: states[(currentIndex + 1) % states.length] }
      }),
    )
  }

  return (
    <article className="panel map-panel">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Railway map</p>
          <h3>Delhi to Varanasi corridor</h3>
        </div>
      </div>

          <div className="map-track">
        {signals.map((node, index) => (
          <div key={node.name} className="map-node-wrap">
            <button type="button" className={`map-node ${index === activeTrain ? 'active' : ''}`} onClick={() => toggleSignal(index)}>
              {node.name}
            </button>
            {index < signals.length - 1 && <div className="map-line" />}
          </div>
        ))}
      </div>

      <div className="map-route">
        {signals.map((node, index) => (
          <div key={node.name} className={`route-node ${index === activeTrain ? 'active' : ''}`}>
            <span>{node.name}</span>
            <span className={`signal ${node.signal}`} />
          </div>
        ))}
      </div>

      <div className="map-journey">
        <motion.div className="map-station" animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          🚆 101 →
        </motion.div>
        <div className="map-station">Prayagraj</div>
        <div className="map-station">Varanasi</div>
      </div>
    </article>
  )
}

export default RailwayMap
