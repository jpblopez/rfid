const http = require('http')
const app = require('./app')
const socketio = require('socket.io')
// const serialport = require('serialport')

const server = http.createServer(app)
const io = socketio(server)

server.listen(3000, () => { console.log('Server started') });

// const sp = new serialport('/dev/cu.usbmodem1421', {
//     baudRate: 9600
// })

// sp.on('data', (data) => {
//     console.log(data);
// })
