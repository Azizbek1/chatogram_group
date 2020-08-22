const socketio = require('socket.io');
const moment = require('moment');
const io = socketio();

const users = [];
const socketApi = {};

socketApi.io = io

const botName = 'BOT'

io.on("connection", (socket) => {
  console.log("Foydalanuvchi bog'landi");

// Join chat Room
  socket.on("joinRoom", ({username, room}) => {
       console.log(username);
       const user = userJoin(socket.id, username, room)
       socket.join(user.room)

      // Welcome
       socket.emit("message", formatMessage(botName,"Hush kelibsiz Chatogramga"))

       // Hammaga ko'rinadigan
       socket.broadcast.to(user.room).emit("message", formatMessage(botName,`${user.username} digan foydalanuvchi kirdi`));

       io.to(user.room).emit('roomUsers', {room: user.room, users: getRoomUsers(user.room)
      });
  })


 


  //Hatni qabul qilamiz frontdan va qayta jo'natamiz
  socket.on('chatMessage', (msg) => {
      const user = getCurrentUser(socket.id)

      io.to(user.room).emit("message",formatMessage(user.username, msg) )
  })

 
  // Klyent chiqib ketkanda chaqiriladi
  socket.on("disconnect", () => {
    const user = userLeave(socket.id)
    if(user){
       io.to(user.room).emit("message", formatMessage(botName,`${user.username}  chiqib ketdi`))

       // Отправлять информацию о пользователях и комнате
       io.to(user.room).emit('roomUsers', {room: user.room, users: getRoomUsers(user.room)}  );
       
    }
    
  })



    
})

// Voxtlari 
function formatMessage(username, text) {
  return {
    username, 
    text,
    time: moment().format('h:mm a')
  }
}



// Присоединиться к пользовательскому чату
function userJoin(id, username, room) {
  const user = {id, username, room}
  users.push(user)
  return user;
}


// Get получить текущего пользователя
function getCurrentUser(id) {
  return users.find(user => user.id === id)
}


// Foydalanuvchi chatdan chiqanda 
function userLeave(id) {
  const index = users.findIndex(user => user.id === id)
  if(index !== -1){
    return users.splice(index, 1)[0];
  }
}

// Get Room users 
function getRoomUsers(room) {
  return users.filter(user => user.room === room)
}





module.exports = socketApi