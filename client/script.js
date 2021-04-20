let socket = io.connect();

let target = document.getElementById('output');

document.getElementById('sendToAll').addEventListener('click', function () {
    let message = document.getElementById('message').value;
    let user = document.getElementById('username').value;
    socket.emit('sendToAll', {username: user, text: message});

    // Clear the input field and put focus onto the field
    message.value = '';
    //message.focus();
})

document.getElementById('sendToMe').addEventListener('click', function () {
    let message = document.getElementById('message').value;
    let user = document.getElementById('username').value;
    socket.emit('sendToMe', {username: user, text: message});
})

socket.on('displayMessage', (message) => {
    console.log(message)
    target.innerHTML += '<br>' + message.username + ' wrote: ' + message.text;
})