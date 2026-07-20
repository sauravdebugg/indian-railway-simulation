import { FiAlertTriangle } from 'react-icons/fi'

const CollisionPanel = ({ alert }) => {
  return (
    <article className="panel alert-panel">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Collision monitor</p>
          <h3>{alert.title}</h3>
        </div>
        <span className="alert-icon">
          <FiAlertTriangle />
        </span>
      </div>

      <div className="collision-body">
        <p>{alert.trainA}</p>
        <p className="muted">↓</p>
        <p>{alert.trainB}</p>
      </div>

      <div className="collision-footer">
        <p>Distance {alert.distance}</p>
        <p className="risk">Risk {alert.risk}</p>
      </div>
    </article>
  )
}

export default CollisionPanel
