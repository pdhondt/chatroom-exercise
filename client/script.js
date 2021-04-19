let socket = io.connect();

let target = document.getElementById('output');

document.getElementById('sendToAll').addEventListener('click', function () {
    let message = document.getElementById('message').value;
    socket.emit('sendToAll', (message));
})

socket.on('displayMessage', (message) => {
    target.innerHTML = '<br>' + message;
})