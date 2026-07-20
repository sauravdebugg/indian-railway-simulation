import { FiCircle } from 'react-icons/fi'

const SignalPanel = ({ signal }) => {
  return (
    <article className="panel compact-panel">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Signal</p>
          <h3>{signal.id}</h3>
        </div>
        <span className={`signal-dot ${signal.state.toLowerCase()}`}>
          <FiCircle />
        </span>
      </div>

      <div className="signal-body">
        <p className="signal-state">{signal.state}</p>
        <p className="signal-track">Track {signal.track}</p>
      </div>
    </article>
  )
}

export default SignalPanel
