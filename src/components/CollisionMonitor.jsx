const riskStyles = {
  Safe: 'safe',
  Medium: 'medium',
  Critical: 'critical',
}

const CollisionMonitor = () => {
  return (
    <article className="panel collision-monitor-panel">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Collision monitor</p>
          <h3>Train 101 vs Train 205</h3>
        </div>
      </div>

      <div className="collision-metrics">
        <div className="metric-row">
          <span>Distance</span>
          <strong>1.2 km</strong>
        </div>
        <div className="metric-row">
          <span>Closing Speed</span>
          <strong>80 km/h</strong>
        </div>
        <div className="metric-row">
          <span>Risk</span>
          <strong className={`risk-pill ${riskStyles.Critical}`}>HIGH</strong>
        </div>
      </div>

      <div className="recommendation-box">
        <p className="eyebrow">Recommendation</p>
        <p>Reduce Speed</p>
      </div>
    </article>
  )
}

export default CollisionMonitor
