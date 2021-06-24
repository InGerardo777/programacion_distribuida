const users =['Gerardo', 'Garcia', 'Gonzalez'];
//unirse usuario al chat
function userJoin (id, username,room) {
    const user = {id, username, room};
    
    users.push(user);
    
    return user;
}

//Obtener usuario actual
 function getCurrentUser(id) {
    return users.find(user => user.id === id)
 }


//___________________________________________________

function userLeave(id){
    const index = users.findIndex(user => user.id === id)
}

function userLeave(id){
    const index = users.findIndex (user => user.id === id);

    if(index !== -1){
        return console.log(users.splice(index, 1)[0])
    }
}

function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}

 //____________________________________________________


 module.exports = {
     userJoin,
     getCurrentUser,
     userLeave,
     getRoomUsers
 }