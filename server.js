const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users');
//const io = socketio(server);
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const botName='ChatBot';

app.use(express.static(path.join(__dirname,'public')));

io.on('connection', socket =>{
    //se conecta alguien
    socket.on('joinRoom',({username, room}) =>{
        const user = userJoin(socket.id, username, room)
        socket.join(user.room)
        socket.emit('message',formatMessage( botName, 'Bienvenido al chat'));
        // a todos los usuario menos el nuevo integrante
        socket.broadcast.to(user.room).emit('message', formatMessage(botName,`${user.username} Entro al chat`));
        
        
        //examen<
        socket.broadcast.to(user.room).emit('message', formatMessage(botName,`estos son el numero de usuarios conectados${getRoomUsers(user.room).length}Estos son los usuarios actuales: 
        ${getRoomUsers(user.room).map((user,index, array) => {return user.username})}`))
          
        //examen>
        
     



        //  console.log(msg);
        
        io.to(user.room).emit('roomUsers', {room:user.room, users: getRoomUsers(user.room)});
        
    });
    socket.on('chatMessage', msg =>{
        const user = getCurrentUser(socket.id);
       
        console.log(msg);
        
        io.to(user.room).emit('message', formatMessage(`${user.username}`, msg));
    });

    
    socket.on('disconect', () =>{
        const user = userLeave(socket.id);

        
        //mensaje a todos los usuarios conectados en la conversacion
        //io.emit('message', formatMessage('user', msg));

        if (user) {
            io.to(user.room).emit('message', formatMessage(botName,`${user.username} ah salido del chat` ));

            io.to(user.room).emit('roomUsers', {room:user.room, users: getRoomUsers(user.room)});
        }
    });
    

});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
