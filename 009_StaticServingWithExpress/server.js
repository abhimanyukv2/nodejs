// const { application } = require('express')
var express = require('express')
var bodyParser = require('body-parser')
// const { Socket } = require('socket.io')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var message = [
    {name: "Abhimanyu", message: "Hi"},
    {name: "Jane", message: "Hello"}
]

app.get('/message', (req, res) => {
    res.send(message)
})

app.post('/message', (req, res) => {
    // console.log(req.body)
    message.push(req.body)
    io.emit('message', req.body)
    res.sendStatus(200)
})

io.on('connection', (socket) => {
    console.log('a user connected')
})

var server = http.listen(3000, () =>{
    console.log('server is listening to the port', server.address().port)
})