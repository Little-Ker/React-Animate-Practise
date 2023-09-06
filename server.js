const express = require('express')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)

// 根據開啟的網頁位置調整跨域
const socketIO = new Server(server, {
  cors: {
    origin: 'http://localhost:3001',
  },
})

app.use(cors())

const port = 4040

let users = []

// 設定 WebSocket 連接監聽
socketIO.on('connection', (socket) => {
  console.log('Client connected')

  // 廣播訊息給所有客戶端
  socket.on('sendMessage', (message) => {
    console.log('Received message:', message)
    socketIO.emit('message', message) 
  })

  // 斷開連接時觸發
  socket.on('disconnect', () => {
    console.log('Client disconnected')
    socketIO.emit('userDisconnected')
  })

  // 新用戶加入
  socket.on('userResponse', (data) => {
    users.push(data)
    console.log('USERdata',users)
    socketIO.emit('userResponse', users)
  })

  // 移除用戶
  socket.on('removeUserResponse', (userId) => {
    let findPos = -1 
    users.forEach((cur, index) => {
      if (cur.id === userId) findPos = index
    })
    if (findPos !== -1) users.splice(findPos, 1)
    socketIO.emit('userResponse', users)
  })
})

// 啟動伺服器
server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})