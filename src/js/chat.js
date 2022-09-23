"user strict"

const socket = io();

const nickname = document.querySelector("#nickname")
const chatlist = document.querySelector(".chatting-List")
const chatInput = document.querySelector(".chatting-Input")
const sendButton = document.querySelector(".send-Button")

sendButton.addEventListener("click",()=>{
    const param = {
        name: nickname.value,
        msg: chatInput.value
    }
    socket.emit("chatting", param)
})


socket.on("chatting",(data) => {
   const li = document.createElement("li");
   li.innerText = `${data.name}님이 - ${data.msg}`;
   chatlist.appendChild(li)
})

console.log(socket)


//메시지 보낼 때
//emit

//메시지 받을 때
//on