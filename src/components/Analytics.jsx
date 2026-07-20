import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const analyticsData = [
  { name: '08:00', trains: 8, speed: 72, occupancy: 5, collisions: 0 },
  { name: '10:00', trains: 10, speed: 78, occupancy: 6, collisions: 1 },
  { name: '12:00', trains: 12, speed: 84, occupancy: 7, collisions: 1 },
  { name: '14:00', trains: 11, speed: 88, occupancy: 6, collisions: 1 },
  { name: '16:00', trains: 13, speed: 92, occupancy: 8, collisions: 2 },
]

const occupancyData = [
  { name: 'Available', value: 8, color: '#34d399' },
  { name: 'Reserved', value: 4, color: '#f59e0b' },
  { name: 'Occupied', value: 6, color: '#ef4444' },
]

const Analytics = () => {
  return (
    <article className="panel analytics-panel">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Analytics</p>
          <h3>Operations trend</h3>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="chart-line">
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={analyticsData}>
            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line type="monotone" dataKey="trains" stroke="#38bdf8" strokeWidth={2} />
            <Line type="monotone" dataKey="speed" stroke="#f59e0b" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
        </div>

        <div className="chart-bar">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={analyticsData}>
            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Bar dataKey="collisions" fill="#ef4444" />
            <Bar dataKey="occupancy" fill="#34d399" />
          </BarChart>
        </ResponsiveContainer>
        </div>

        <div className="chart-pie">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={occupancyData} dataKey="value" nameKey="name" outerRadius={70}>
                {occupancyData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </article>
  )
}

export default Analytics
