var socket = io(); 

var username = prompt('Please enter a username'); 

socket.emit('join', username); 

 document.getElementById('milk').addEventListener('submit', (event) => 
    {
        event.preventDefault(); 
        data =  

{ 

message : document.getElementById("message").value, name : username,


time: Date.now(), 

}

socket.emit("message", data)

document.getElementById("message").value = ""

    })

socket.on("receive message",  (data) => { 

const message = document.createElement('div');  

 

let date = new Date(data.time); 

          let options = { 

            day:'numeric', 

            month:'numeric', 

            year:'numeric', 

            hour:'2-digit', 

            minute: 'numeric', 

            //second:'numeric', 

          } 

message.innerHTML = ` 

        <span class = "U">${data.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                       </span>

        <span class = "D">${date.toLocaleTimeString("de-DE", options)}</span> 

        <p>${data.message}</p> 

    `; 

 

data.time

message.classList.add('chatMessage'); 

id = document.getElementById("chatBox").appendChild(message)

})

socket.on("join message",  (data) => { 

const message = document.createElement('div');  

message.innerHTML = ` 

        <span class = "U">${data}</span> <span class = "userJoined">joined! </span>

        
    `; 

 

data.time

message.classList.add('chatMessage'); 

id = document.getElementById("chatBox").appendChild(message)

})
 
socket.on("leave message",  (data) => { 

const message = document.createElement('div');  

message.innerHTML = ` 

        <span>${data} left! </span>

        
    `; 

 

data.time

message.classList.add('chatMessage'); 

id = document.getElementById("chatBox").appendChild(message)

})
 