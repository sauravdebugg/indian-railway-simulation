const NetworkHealthPanel = () => {
  return (
    <article className="panel">
      <div className="panel-head">
        <div>
          <p className="eyebrow">System health</p>
          <h3>Network status</h3>
        </div>
      </div>

      <div className="info-stack">
        <p><strong>Simulator:</strong> Connected</p>
        <p><strong>Latency:</strong> 12 ms</p>
        <p><strong>CPU Usage:</strong> 32%</p>
        <p><strong>Memory:</strong> 1.2 GB</p>
        <p><strong>Status:</strong> Operational</p>
      </div>
    </article>
  )
}

export default NetworkHealthPanel
