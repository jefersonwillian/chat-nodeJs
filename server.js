const express = require('express');
const path = require('path'); //Path padrão do nodeJs

const app = express();
const server = require('http').createServer(app); 
const io = require('socket.io')(server); //Protocolo socket.io

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.render('index.html');
});

let messages = [];

io.on('connection', socket => {
    console.log(`Socket Conectado:  ${socket.id}`);

    socket.emit('previousMessages', messages);
    
    socket.on('sendMessage', data => {
        messages.push(data);
        socket.broadcast.emit('receiveMessage', data);
    });
})

server.listen(3000);