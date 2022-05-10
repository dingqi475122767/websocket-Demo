const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http,{cors: true})

app.get('/', function(req, res) {
  res.sendFile('<h1>Hello World</h1>')
})
let id = 0
io.on('connection', socket => {
  id++
  socket.username = id
  console.log(`用户${socket.username}进入群聊`)
  io.emit('message', `用户${socket.username}进入群聊`)
  socket.on('send', data => {
    console.log(data)
    io.emit('message', `用户${socket.username}: ${data}`)
  })
})


http.listen(12138, function() {
  console.log('服务器已启动，端口号：',12138)
})