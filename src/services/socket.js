import { io } from 'socket.io-client'

const socket = io('http://localhost:3001', {
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
})

socket.on('connect', () => {
  console.log('Socket connected', socket.id)
})

export default socket
