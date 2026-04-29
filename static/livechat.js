var socket = io(); 

var username = prompt('Please enter a username'); 

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

 

date = new Date(data.time); 

          options = { 

            day:'numeric', 

            month:'numeric', 

            year:'numeric', 

            hour:'2-digit', 

            minute: 'numeric', 

            second:'numeric', 

          } 

date.toLocaleString("de-DE", options) 
 

message.innerHTML = ` 

       <p> ${data.name} </p>

        <p> ${date}</p> 

        <p>${data.message}</p> 

    `; 

 

data.time

message.classList.add('chatMessage'); 

id = document.getElementById("chatBox").appendChild(message)

})


