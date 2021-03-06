let socket = io.connect();

let output = document.getElementById('output');
let user = document.getElementById('username');
let message = document.getElementById('message');
let btnAll = document.getElementById('sendToAll');
let btnMe = document.getElementById('sendToMe');
let feedback = document.getElementById('feedback');
let displayUsers = document.getElementById('users');

btnAll.addEventListener('click', function(){
    socket.emit('sendToAll', {
        username: user.value,
        text: message.value,
        socketID: socket.id
    });
    // Clear the input field and put focus onto the field
    message.value = '';
    message.focus();
});

btnMe.addEventListener('click', function(){
    socket.emit('sendToMe', {
        username: user.value,
        text: message.value,
        socketID: socket.id
    });
});

message.addEventListener('keypress', function(){
    socket.emit('typing', user.value);
});

socket.on('displayMessage', (message) => {
    console.log(message);
    feedback.innerHTML = '';
    output.innerHTML += '<br>' + message.username + ' wrote: ' + message.text;
});

socket.on('joinMessage', (message) => {
    output.innerHTML += '<br>' + message;
})

socket.on('leaveMessage', (message) => {
    output.innerHTML += '<br>' + message;
})

socket.on('typing', (data) => {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

socket.on('showUsers', (users) => {
    console.log(users);
    displayUsers.innerHTML = "";
    users.forEach( (user) => {
        displayUsers.innerHTML += '<br>' + user.username;
    });
});