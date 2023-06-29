document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("chat-form");
  const chatMessages = document.getElementById("chat-messages");
  const userInput = document.getElementById("user-input");

  const instanceId = "c103c359-f64a-4605-a498-2458ac6b631c";
  const userEmail = "theaculy@gmail.com";

  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const message = userInput.value;
    if (!message) return;

    addMessageToChat("user", message);
    userInput.value = "";

    const data = await queryBerri(message);
    console.log("Response from queryBerri:", data);
    const reply = data.response.trim();
    console.log("Berri reply:", reply);
    addChatbotMessage(reply);
  });

  function addMessageToChat(sender, message) {
    const messageElem = document.createElement("div");
    messageElem.classList.add("message", sender);
    messageElem.textContent = message;

    const typingIndicator = document.getElementById("typing-indicator");

    chatMessages.insertBefore(messageElem, typingIndicator);

    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function addChatbotMessage(content) {
    const message = document.createElement("div");
    message.classList.add("message", "berri");

    const avatarContainer = document.createElement("div");
    avatarContainer.classList.add("avatar-container");

    const avatar = document.createElement("img");
    avatar.src = "https://i.imgur.com/7pQ6QJB.png";
    avatar.alt = "Chatbot Avatar";
    avatar.classList.add("chatbot-avatar");

    const messageContent = document.createElement("div");
    messageContent.classList.add("berri-message-content");
    messageContent.innerText = content;

    avatarContainer.appendChild(avatar);
    avatarContainer.appendChild(messageContent);
    message.appendChild(avatarContainer);

    const typingIndicator = document.getElementById("typing-indicator");

    chatMessages.insertBefore(message, typingIndicator);

    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  async function queryBerri(query) {
    const url = "https://api.berri.ai/query";
    const params = new URLSearchParams({
      user_email: userEmail,
      instance_id: instanceId,
      query: query,
      model: "gpt-3.5-turbo",
    });

    const typingIndicator = document.getElementById("typing-indicator");

    typingIndicator.classList.remove("hidden");

    chatMessages.scrollTop = chatMessages.scrollHeight;

    const response = await fetch(`${url}?${params}`);
    const data = await response.json();

    typingIndicator.classList.add("hidden");

    chatMessages.scrollTop = chatMessages.scrollHeight;

    console.log("Berri response:", data);
    return data;
  }

  // Add the following code for open and close functionality
const chatWidgetToggle = document.querySelector(".chat-widget-toggle");
const chatWidget = document.querySelector(".chat-widget");
const closeButton = document.getElementById("close-button");

function toggleIframeHeight(isOpen) {
  window.parent.postMessage(
    {
      action: "toggleChatWidget",
      isOpen: isOpen,
    },
    "*"
  );
}

chatWidgetToggle.addEventListener("click", () => {
  chatWidget.style.display = "flex";
  chatWidgetToggle.style.display = "none";
  toggleIframeHeight(true);
});

closeButton.addEventListener("click", () => {
  chatWidget.style.display = "none";
  chatWidgetToggle.style.display = "block";
  toggleIframeHeight(false);
});

// Set initial state of chat widget and toggle button
chatWidget.style.display = "none";
  });






