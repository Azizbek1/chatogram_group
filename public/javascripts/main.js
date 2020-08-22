// Malumotlar 
$chat__form = $('.chat__form'); // indexdagi 
$chat2__form_btn = $('.chat2__form_btn')
$chat2__form_control = $('.form-control')
const romName = document.querySelector('.chat__room_name');
const userList = document.querySelector('.chat_userss');
const chat__messages = document.querySelector('.chat__messages');

//chat_userss
const chat_userss = document.querySelector('.chat_userss');

// Username bilan room olamiz adress bo'yicha 
const {username, room} = Qs.parse(location.search, {
  ignoreQueryPrefix: true
})
// console.log(username, room);

const socket = io();


// Join chat Room 
socket.emit('joinRoom', { username, room })


 // Отправлять информацию о пользователях и комнате
 socket.on("roomUsers", ({room, users}) => {
  // console.log(room);
  // console.log(users);
  outputRoomName(room)
  outputUsers(users)
  chat_userss.scrollTop = chat_userss.scrollHeight;
})


socket.on("message", (data) => {
    // console.log(data);
    outputMessage(data)
})


$chat2__form_btn.on('click', (e) => {
    e.preventDefault();
    const msg = $chat2__form_control.val();
    // console.log(msg);

    // Hat yuboramiz serverga 
    $chat2__form_control.val('')
    socket.emit("chatMessage", msg)

    // scroll Down 
    chat__messages.scrollTop = chat__messages.scrollHeight;

})


// Messaglar uchun 
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
      <div class="meta">
        <span class="meta__time">${message.time}</span>
        <span class="meta__username">${message.username}</span>
        <div class="meta__text">${message.text}</div>
      </div>
    `;
    document.querySelector('.chat__messages').appendChild(div)
  }




  //room  qo'yish uchun
  function outputRoomName(room) {
    romName.innerText = room;
  } 


  //Users Foydalanuvchilar qo'yish uchun
  function outputUsers(users) {
    userList.innerHTML = `
      ${  users.map(user => `<li class="alert alert-danger"> ${user.username} </li>`).join('') }
    `;
  } 

