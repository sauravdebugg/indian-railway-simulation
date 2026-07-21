const items = [
  { label: 'Dashboard', emoji: '🏠' },
  { label: 'Trains', emoji: '🚆' },
  { label: 'Signals', emoji: '🚦' },
  { label: 'Platforms', emoji: '🚉' },
  { label: 'Collision Monitor', emoji: '⚠' },
  { label: 'Analytics', emoji: '📈' },
  { label: 'Settings', emoji: '⚙' },
]

import { useState } from 'react'

const Sidebar = () => {
  const [query, setQuery] = useState('')
  const [selectedTrain, setSelectedTrain] = useState('Rajdhani Express')
  const [activeItem, setActiveItem] = useState('Dashboard')
  const trains = ['Rajdhani Express', 'Shatabdi Express', 'Vande Bharat', 'Garib Rath']

  const handleTrainSelect = (train) => {
    setSelectedTrain(train)
    setQuery(train)
  }

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-badge">IR</div>
        <div>
          <p className="eyebrow">Operations</p>
          <h2>Live View</h2>
        </div>
      </div>

      <nav className="nav-links">
        {items.map(({ label, emoji }) => (
          <button
            key={label}
            type="button"
            className={`nav-link ${activeItem === label ? 'active' : ''}`}
            onClick={() => setActiveItem(label)}
          >
            <span>{emoji}</span>
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div style={{ marginTop: 18 }}>
        <p className="eyebrow">Search Train</p>
        <input
          className="search-input"
          placeholder="Search Train"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div style={{ marginTop: 8 }}>
          <p className="eyebrow">Quick Picks</p>
          <div className="nav-links" style={{ gap: 6, marginTop: 6 }}>
            {trains.map((train) => (
              <button
                key={train}
                type="button"
                className={`nav-link ${selectedTrain === train ? 'active' : ''}`}
                onClick={() => handleTrainSelect(train)}
              >
                <span>🚆</span>
                <span>{train}</span>
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 8 }}>
          <p className="eyebrow">Current Position:</p>
          <div className="route-node">{selectedTrain ? 'Prayagraj' : '—'}</div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
