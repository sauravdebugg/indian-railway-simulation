import { FiArrowRight, FiMapPin, FiShield } from 'react-icons/fi'
import { motion } from 'framer-motion'

const TrainCard = ({ train }) => {
  return (
    <motion.article
      className="panel train-card"
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="panel-head">
        <div>
          <p className="eyebrow">Live train</p>
          <h3>{train.name}</h3>
        </div>
        <span className="status-chip">{train.status}</span>
      </div>

      <div className="train-stats">
        <div>
          <FiArrowRight />
          <span>Speed: {train.speed} km/h</span>
        </div>
        <div>
          <FiMapPin />
          <span>Track: {train.track}</span>
        </div>
        <div>
          <FiShield />
          <span>Signal: {train.signal}</span>
        </div>
      </div>

      <div className="train-footer">
        <span>Platform: {train.platform}</span>
        <span>ETA: {train.eta}</span>
      </div>
    </motion.article>
  )
}

export default TrainCard
