const AiRecommendationPanel = () => {
  return (
    <article className="panel">
      <div className="panel-head">
        <div>
          <p className="eyebrow">AI assistant</p>
          <h3>Collision prevention</h3>
        </div>
      </div>

      <div className="info-stack">
        <p><strong>Collision Risk:</strong> HIGH</p>
        <p><strong>Recommendation:</strong></p>
        <ul>
          <li>Reduce Train 205 speed.</li>
          <li>Divert to Track B.</li>
          <li>Change Signal S205 to Red.</li>
        </ul>
        <p><strong>Confidence:</strong> 97%</p>
      </div>
    </article>
  )
}

export default AiRecommendationPanel
