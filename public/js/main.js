const chatForm = document.getElementById('chat-form')
const chatMessage = document.querySelector('.chat-messages')
//practica 11//
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users');
//fin practica 11//

const {username,room} = Qs.parse(location.search,{
  ignoreQueryPrefix: true
});

const socket = io();
//unirse a la sala datos
socket.emit('joinRoom', {username, room});

//

socket.on('roomUsers', ({room, users}) =>{
  outputRoomName(room);
  outputUsers(users);
})

//

socket.on('message', message =>{
  // console.log(message);
  outputMessage(message);
  // top del scroll
  chatMessage.scrollTop = chatMessage.scrollHeight;
});

chatForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  //obtener el valor del input de chat-from 
  const msg = e.target.elements.msg.value
// console.log(msg)
  socket.emit('chatMessage', msg)

  e.target.elements.msg.value ='';
  e.target.elements.msg.focus();

})

function outputMessage(message){
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML= `<p class= = "meta"> ${message.username} <span>${message.time}</span></p>
  <p class= "text">
    ${message.text}
  </p>`

  document.querySelector('.chat-messages').appendChild(div);
}

//__________________________________________________________________________________________________

document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('¿Estás seguro que quieres salir?');
  if (leaveRoom) {
    window.location = '../index.html';
  }
  else{
  }
});

function outputRoomName(room){
  roomName.innerHTML = room;
}

function outputUsers(users) {
  userList.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`;
}
//__________________________________________________________________________________________________