// Cargar el modelo GLB (mantén este código si estás usando Three.js)
const loader = new THREE.GLTFLoader();
const avatarUrl = "https://models.readyplayer.me/65e0bde83f080f9a6d96814c.glb";

loader.load(avatarUrl, (gltf) => {
    // ... (resto del código Three.js para mostrar el modelo 3D)
});

// Chat functionality
const messageInput = document.getElementById('message-input');
const messagesContainer = document.getElementById('messages');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', async () => {
    const messageText = messageInput.value.trim();
    if (messageText) {
        addMessage('user', messageText); // Mostrar mensaje del usuario en el chat
        messageInput.value = ''; // Limpiar el input

        try {
            // Enviar mensaje al backend
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: messageText })
            });

            // Obtener respuesta del backend (que a su vez obtiene la respuesta de OpenAI)
            const data = await response.json();
            addMessage('bot', data.response); // Mostrar respuesta del bot en el chat
        } catch (error) {
            console.error("Error al comunicarse con el backend:", error);
            addMessage('bot', "Lo siento, no puedo responder en este momento.");
        }
    }
});

function addMessage(sender, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender); // Agregar una clase para distinguir entre usuario y bot
    messageElement.textContent = `${sender}: ${text}`;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Desplazarse al final del chat
}
