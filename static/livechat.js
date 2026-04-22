var socket = io(); 

var username = prompt('Please enter a username'); 

 document.getElementById('milk').addEventListener('submit', (event) => 
    {
        event.preventDefault(); 
        data =  

{ 

message : document.getElementById("message").value, 


time: Date.now(), 

}

socket.emit("message", data)

document.getElementById("message").value = ""

    })

socket.on("receive message",  (data) => { 

const message = document.createElement('div');  

message.innerHTML = data.message

data.time

message.classList.add('chatMessage'); 

id = document.getElementById("chatBox").appendChild(message)

})

