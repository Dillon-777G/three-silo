/**
 * Asynchronously sends a message to a server and displays the response in the chat interface.
 */
async function sendMessage() {
    console.log("sendMessage function called"); // Logs that the function is called


    // Get the user input element and the chat list container
    const inputEl = document.getElementById('user-input'); 
    const chatList = document.getElementById('chat-list');  

    // Extract the message from the input field and clear the field for future messages
    const userMessage = inputEl.value;
    inputEl.value = '';
    


    // Create a list item for the user message and append it to the chat list
    const userLi = document.createElement('li');
    userLi.className = 'user';
    userLi.innerHTML = `<div class="message"><span class="message-content">User: ${userMessage}</span></div>`;
    chatList.appendChild(userLi);



    // Show a temporary 'typing' message from the bot
    const typingLi = document.createElement('li');
    typingLi.className = 'bot typing';
    typingLi.innerHTML = `<div class="message"><span class="message-content">GlutenBot is typing...</span></div>`;
    chatList.appendChild(typingLi);
    chatList.scrollTop = chatList.scrollHeight;



    try {
        // Send the user's message to the server and wait for the response
        const response = await fetch('http://127.0.0.1:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        });



        // Extract the JSON response containing the bot's reply
        const data = await response.json();
        console.log("Received data from server:", data);

        // Remove the 'typing' message
        chatList.removeChild(typingLi);

        // Format the bot's reply for display (convert newline characters to HTML line breaks)
        const formattedReply = data.reply.replace(/\n/g, '<br>');

        // Display the bot's reply in the chat list
        const botLi = document.createElement('li');
        botLi.className = 'bot';
        botLi.innerHTML = `<div class="message"><span class="message-content">Bot: ${formattedReply}</span></div>`;
        chatList.appendChild(botLi);
        chatList.scrollTop = chatList.scrollHeight; // Auto-scroll to show the latest message

    } catch (error) {
        console.error("Error fetching chatbot reply:", error); // Log any errors during fetch
    }
}

// Add an event listener for the 'Enter' key in the input field to send messages
document.getElementById('user-input').addEventListener('keyup', function(event) {
    if (event.keyCode === 13) { // Check if the key pressed is the 'Enter' key
        sendMessage();
    }
});
