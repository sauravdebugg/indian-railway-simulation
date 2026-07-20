const platforms = [
  { name: 'Platform 1', train: 'Rajdhani', status: 'occupied' },
  { name: 'Platform 2', train: 'Available', status: 'available' },
  { name: 'Platform 3', train: 'Shatabdi', status: 'reserved' },
  { name: 'Platform 4', train: 'Reserved', status: 'reserved' },
]

const PlatformPanel = () => {
  return (
    <article className="panel">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Platform occupancy</p>
          <h3>Track status</h3>
        </div>
      </div>

      <div className="platform-list">
        {platforms.map(({ name, train, status }) => (
          <div key={name} className="platform-item">
            <div>
              <strong>{name}</strong>
              <p>{train}</p>
            </div>
            <span className={`status-dot ${status}`}>{status}</span>
          </div>
        ))}
      </div>
    </article>
  )
}

export default PlatformPanel
