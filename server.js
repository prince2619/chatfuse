const express = require('express') // importing express.
const app = express() // creating a variable name aap and call exprexss function.
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT,()=>{
    console.log(`Server is listining on port ${PORT}`)
})
// creating a middleware
app.use(express.static(__dirname + '/public'))

// CREATING A ROUTE
app.get('/',(req,res)=>{
    // res.send('hello world') -- here we need to render our html page so in next line code is
    res.sendFile(__dirname + '/index.html')
})

// Scocket
const io = require('socket.io')(http)

io.on('connection',(socket)=>{
    console.log('Connected...')
    //listinig the the message send by the user 
    socket.on('message',(msg)=>{
        // console.log(msg) // This will print user name and message in console but we have to send it to another client so i comment it .
        socket.broadcast.emit('message',msg)
    })
})