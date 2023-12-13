async function sendMessage() {
    console.log("sendMessage function called"); 

    const inputEl = document.getElementById('user-input');
    const chatList = document.getElementById('chat-list');  // Ensure this is the ID of your UL element.
    const userMessage = inputEl.value;
    inputEl.value = '';
    
    const userLi = document.createElement('li');
    userLi.className = 'user';
    userLi.innerHTML = `<div class="message"><span class="message-content">User: ${userMessage}</span></div>`;
    chatList.appendChild(userLi);

    const typingLi = document.createElement('li');
        typingLi.className = 'bot typing';
        typingLi.innerHTML = `<div class="message"><span class="message-content">GlutenBot is typing...</span></div>`;
        chatList.appendChild(typingLi);
        chatList.scrollTop = chatList.scrollHeight;


    try {
        const response = await fetch('http://127.0.0.1:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        });

        

        const data = await response.json();
        console.log("Received data from server:", data);
        chatList.removeChild(typingLi);



        
        // Replace newline characters with <br> for HTML formatting.
        const formattedReply = data.reply.replace(/\n/g, '<br>');

        const botLi = document.createElement('li');
        botLi.className = 'bot';
        botLi.innerHTML = `<div class="message"><span class="message-content">Bot: ${formattedReply}</span></div>`;
        chatList.appendChild(botLi);
        chatList.scrollTop = chatList.scrollHeight;


    } catch (error) {
        console.error("Error fetching chatbot reply:", error);
    }
    // Auto-scroll to the bottom of the chatbox
    
}

document.getElementById('user-input').addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        sendMessage();
    }
});
