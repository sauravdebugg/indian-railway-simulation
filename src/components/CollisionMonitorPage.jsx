const collisionMetrics = [
  { label: 'Train A', value: 'Train 101' },
  { label: 'Train B', value: 'Train 205' },
  { label: 'Distance', value: '1.2 km' },
  { label: 'Closing Speed', value: '80 km/h' },
  { label: 'Time Remaining', value: '54 sec' },
  { label: 'Risk', value: 'HIGH' },
]

const CollisionMonitorPage = () => {
  return (
    <article className="panel collision-monitor">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Collision monitor</p>
          <h3>Real-time threat assessment</h3>
        </div>
      </div>

      <div className="collision-grid">
        {collisionMetrics.map((item) => (
          <div key={item.label} className="metric-box">
            <span className="metric-label">{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>

      <div className="recommendation-box">
        <h4>Recommendation</h4>
        <ul>
          <li>Reduce speed to 40 km/h</li>
          <li>Divert to Track B</li>
        </ul>
      </div>
    </article>
  )
}

export default CollisionMonitorPage
