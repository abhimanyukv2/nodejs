// const { application } = require('express')
var express = require('express')
var bodyParser = require('body-parser')
// const { Socket } = require('socket.io')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var dbUrl = 'mongodb+srv://abhimanyukv2:7209773005@cluster0.fw8j5pp.mongodb.net/?retryWrites=true&w=majority'

var Message = mongoose.model('Message', {
    name : String,
    message: String
})

var message = [
    {name: "Abhimanyu", message: "Hi"},
    {name: "Jane", message: "Hello"}
]

app.get('/message', (req, res) => {
    Message.find({}, (err, message) => {
        res.send(message)
    })
})

app.post('/message', (req, res) => {
    // console.log(req.body)
    var message  = new Message(req.body)
    message.save((err) => {
        if(err){
            res.sendStatus(500)
        }
        // message.push(req.body)
        io.emit('message', req.body)
        res.sendStatus(200)
    })
})

io.on('connection', (socket) => {
    console.log('a user connected')
})

mongoose.connect(dbUrl, (err) => {
    console.log('mongo db connection', err)
})

var server = http.listen(3000, () =>{
    console.log('server is listening to the port', server.address().port)
})