const WeatherPanel = () => {
  return (
    <article className="panel">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Weather</p>
          <h3>Corridor conditions</h3>
        </div>
      </div>

      <div className="info-stack">
        <p><strong>Delhi:</strong> 31°C</p>
        <p><strong>Kanpur:</strong> 29°C</p>
        <p><strong>Varanasi:</strong> 30°C</p>
        <p><strong>Visibility:</strong> Good</p>
      </div>
    </article>
  )
}

export default WeatherPanel
