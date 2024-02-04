const express = require('express');
// const serverless = require('serverless-http');
const app = express();
// const app = express.app();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

http.listen(PORT,()=>{
    console.log(`Listening to Port ${PORT}`)
})

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html');
})

//Socket

const io = require('socket.io')(http);

io.on('connection',(socket)=> {
    console.log('Connected...');
    socket.on('message',(msg) => {
        socket.broadcast.emit('message',msg);
    })
})


// app.use('/.netlify/functions/api',app);
// module.exports = app;
// module.exports.handler = serverless(app);

