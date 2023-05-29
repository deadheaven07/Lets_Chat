const socket = io('http://localhost:8000');
//Get DOM elements in respective JS variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
//connecting audio file that will play 
var audio = new Audio("./Images/Sound.wav");

//Function which will append to the container 
const appendMessage = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.appendChild(messageElement);
    audio.play();
};

//Ask new user for his/her name let server know
const userName = prompt("PLease Enter Your G00d Name To Join");
socket.emit('new-user-joined', userName);

//If a new user joins receive the event from the server
socket.on('user-joined', joinedUserName => {
    appendMessage(`${joinedUserName} joined the chat`, 'left');
});
//If server sends a message , receive it
socket.on('receive', data => {
    appendMessage(`${data.name}: ${data.message}`, 'left');
});
//If a user leaves the chat , append the info to the container
socket.on('leave', userName => {
    appendMessage(`${userName} left the chat`, 'left');
});

//Send buttons (If a form gets submitted , send the server)
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
});
