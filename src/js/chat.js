"user strict";

const socket = io();

const nickname = document.querySelector("#nickname");
const chatlist = document.querySelector(".chatting-List");
const chatInput = document.querySelector(".chatting-Input");
const sendButton = document.querySelector(".send-Button");
const displayContainer = document.querySelector(".display-container");

//엔터로 채팅 보낸 후 초기화
chatInput.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    send()
    chatInput.value = ""
  }
});

function send() {
  const param = {
    name: nickname.value,
    msg: chatInput.value,
  };
  socket.emit("chatting", param);
}

sendButton.addEventListener("click", send);

//채팅을 보냈을 때 최근 채팅으로 스크롤 됨
socket.on("chatting", (data) => {
  const { name, msg, time } = data;
  const item = new LiModel(name, msg, time);
  item.makeLi();
  displayContainer.scrollTo(0, displayContainer.scrollHeight);
});

function LiModel(name, msg, time) {
  this.name = name;
  this.msg = msg;
  this.time = time;

  this.makeLi = () => {
    const li = document.createElement("li");
    li.classList.add(nickname.value === this.name ? "sent" : "receive");
    const dom = `<span class = "profile">
                        <span class = "user">${this.name}</span>
                    <img calss ="img" src = "https://placeimg.com/50/50/any" alt = "any">
                </span>
                <span class = "message">${this.msg}</span>
                <span class = "time">${this.time}</span>`;
    li.innerHTML = dom;
    chatlist.appendChild(li);
  };
}

//메시지 보낼 때
//emit

//메시지 받을 때
//on
