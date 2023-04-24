import { requestForecast } from "./modules/foreca-weather.js";

const pedroSelectorBtn = document.querySelector("#pedro-chat");
const alecSelectorBtn = document.querySelector("#alec-chat");
const botSelectorBtn = document.querySelector("#bot-chat");
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
    botSelectorBtn.classList.remove("active-chat");
    chatMessages.innerHTML = "";
    messages.forEach((message) => {
      if (message.sender === "Pedro" || message.sender === "Alec")
        chatMessages.innerHTML += createChatMessageElement(message);
    });
  }
  if (name === "Alec") {
    alecSelectorBtn.classList.add("active-chat");
    pedroSelectorBtn.classList.remove("active-chat");
    botSelectorBtn.classList.remove("active-chat");
    chatMessages.innerHTML = "";
    messages.forEach((message) => {
      if (message.sender === "Pedro" || message.sender === "Alec")
        chatMessages.innerHTML += createChatMessageElement(message);
    });
  }
  if (name === "BOT") {
    botSelectorBtn.classList.add("active-chat");
    pedroSelectorBtn.classList.remove("active-chat");
    alecSelectorBtn.classList.remove("active-chat");
    chatMessages.innerHTML = "";
    const message = {
      sender: messageSender,
      text: `Olá, eu sou o BOT de previsão do tepo. Escolha uma cidade para ver a previsão.
      1) Rio de Janeiro 
      2) São Paulo`,
      timestamp: new Date().toLocaleString("pt-BR", {
        hour: "numeric",
        minute: "numeric",
      }),
    };
    chatMessages.innerHTML += createChatMessageElement(message);
    messages.forEach((message) => {
      if (message.sender === "BOT")
        chatMessages.innerHTML += createChatMessageElement(message);
    });
  }
  chatInput.focus();
};

pedroSelectorBtn.onclick = () => updateMessageSender("Pedro");
alecSelectorBtn.onclick = () => updateMessageSender("Alec");
botSelectorBtn.onclick = () => updateMessageSender("BOT");

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
  if (message.sender === "BOT") {
    if (chatInput.value === "1" || chatInput.value === "2") {
      const weekForecast = requestForecast(chatInput.value);
      console.log(weekForecast);
      const message = {
        sender: messageSender,
        text: `The Maximum temperature is ${String(
          weekForecast.maxTemp
        )}°C and the Minimum temperature is ${weekForecast.minTemp}°C for ${
          weekForecast.date
        }`,
        timestamp,
      };
      messages.push(message);
      localStorage.setItem("messages", JSON.stringify(messages));
      chatMessages.innerHTML += createChatMessageElement(message);
    } else {
      const message = {
        sender: messageSender,
        text: "Im sorry I didn't understand",
        timestamp,
      };
    }
    messages.push(message);
    localStorage.setItem("messages", JSON.stringify(messages));
    chatMessages.innerHTML += createChatMessageElement(message);
  }
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
