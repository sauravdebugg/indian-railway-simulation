const statuses = [
  { name: 'Platform 1', train: 'Rajdhani', state: 'occupied' },
  { name: 'Platform 2', train: 'Available', state: 'available' },
  { name: 'Platform 3', train: 'Shatabdi', state: 'reserved' },
  { name: 'Platform 4', train: 'Reserved', state: 'reserved' },
]

const PlatformOccupancyPanel = () => {
  return (
    <article className="panel">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Platform occupancy</p>
          <h3>Track availability</h3>
        </div>
      </div>

      <div className="occupancy-list">
        {statuses.map(({ name, train, state }) => (
          <div key={name} className="occupancy-item">
            <div>
              <strong>{name}</strong>
              <p>{train}</p>
            </div>
            <span className={`state-pill ${state}`}>{state}</span>
          </div>
        ))}
      </div>
    </article>
  )
}

export default PlatformOccupancyPanel
