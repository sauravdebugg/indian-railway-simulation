const events = [
  { time: '21:45', message: 'Rajdhani departed Delhi' },
  { time: '21:47', message: 'Train entered Agra' },
  { time: '21:50', message: 'Collision Alert' },
  { time: '21:53', message: 'Platform Assigned' },
  { time: '21:55', message: 'Signal S102 changed to Yellow' },
  { time: '21:57', message: 'Train 205 approaching Kanpur' },
  { time: '22:00', message: 'Platform 2 cleared' },
  { time: '22:02', message: 'Speed reduced for Rajdhani' },
  { time: '22:04', message: 'Route updated for Vande Bharat' },
  { time: '22:06', message: 'Maintenance window opened' },
]

const EventLogs = () => {
  return (
    <article className="panel">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Event logs</p>
          <h3>Timeline</h3>
        </div>
      </div>

      <div className="event-list">
        {events.map((event) => (
          <div key={event.time} className="event-item">
            <div className="event-time">{event.time}</div>
            <div className="event-message">{event.message}</div>
          </div>
        ))}
      </div>
    </article>
  )
}

export default EventLogs
