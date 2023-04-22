const pedroSelectorBtn = document.querySelector("#pedro-chat");
const alecSelectorBtn = document.querySelector("#alec-chat");
const chatHeader = document.querySelector(".chat-header");
const chatMessages = document.querySelector(".chat-messages");
const chatInputForm = document.querySelector(".chat-input-form");
const chatInput = document.querySelector(".chat-input");
const clearChatBtn = document.querySelector(".clear-chat-button");

let messageSender = "Pedro";

const messages = JSON.parse(localStorage.getItem("messages")) || [];

const createChatMessageElement = (message) => `
        <div class="message ${
          message.sender === "Pedro" ? "blue-bg" : "gray-bg"
        }">
          <div class="message-sender">${message.sender}</div>
          <div class="message-text">${message.text}</div>
          <div class="message-timestamp">${message.timestamp}</div>
        </div>
`;

window.onload = () => {
  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message);
  });
};

const updateMessageSender = (name) => {
  messageSender = name;
  chatInput.placeholder = "Mensagem...";

  if (name === "Pedro") {
    pedroSelectorBtn.classList.add("active-chat");
    alecSelectorBtn.classList.remove("active-chat");
  }
  if (name === "Alec") {
    alecSelectorBtn.classList.add("active-chat");
    pedroSelectorBtn.classList.remove("active-chat");
  }

  chatInput.focus();
};

pedroSelectorBtn.onclick = () => updateMessageSender("Pedro");
alecSelectorBtn.onclick = () => updateMessageSender("Alec");

const sendMessage = (event) => {
  event.preventDefault();

  const timestamp = new Date().toLocaleString("pt-BR", {
    hour: "numeric",
    minute: "numeric",
  });
  const message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp,
  };

  messages.push(message);
  localStorage.setItem("messages", JSON.stringify(messages));
  chatMessages.innerHTML += createChatMessageElement(message);

  chatInputForm.reset();
  chatHeader.innerText = "";
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

const showIsTiping = () => {
  chatHeader.innerText = `${messageSender} está digitando...`;
  setTimeout(() => {
    if (chatInput.value === "") chatHeader.innerText = "";
    else showIsTiping();
  }, 1500);
};

chatInputForm.addEventListener("submit", sendMessage);
chatInputForm.addEventListener("keypress", showIsTiping);
clearChatBtn.addEventListener("click", () => {
  localStorage.clear();
  chatMessages.innerHTML = "";
});
