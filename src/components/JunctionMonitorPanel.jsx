const JunctionMonitorPanel = () => {
  return (
    <article className="panel">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Junction monitor</p>
          <h3>Central Junction</h3>
        </div>
      </div>

      <div className="info-stack">
        <p><strong>Incoming Train:</strong> 101</p>
        <p><strong>Outgoing Train:</strong> 205</p>
        <p><strong>Switch Position:</strong> LEFT</p>
      </div>
    </article>
  )
}

export default JunctionMonitorPanel
