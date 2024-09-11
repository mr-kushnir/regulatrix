import {server} from "../../config/axios.js";

class ChatService {
    // Создание чата
    static async createChat(user_id, message) {
        const response = await server.post('/chat', {user_id, message});
        return response.data;
    }

    // Удаление чата
    static async deleteChat(user_id, chat_id) {
        const response = await server.delete(`/user/${user_id}/chat/${chat_id}`);
        return response.data; // Убедитесь, что сервер возвращает данные
    }

    // Получение списка чатов
    static async getChats(user_id, search_text = null) {
        console.log(search_text)
        const param = `?search_text=${search_text}`
        const response = await server.get(`/user/${user_id}/chats${search_text ? param : ""}`);
        return response.data;
    }

    // Создание сообщения в чате
    static async createMessage(chat_id, user_id, message) {
        const response = await server.post(`/chat/${chat_id}/create_message`, {
            user_id, message
        });
        return response.data;
    }

    // Получение сообщений в чате
    static async getMessages(chat_id) {
        const response = await server.get(`/chat/${chat_id}/messages`);
        return response.data;
    }

    static async getAIResponse(chat_id, message) {
        const response = await server.post(`/gpt/chat`, {chat_id, message})
        return response.data
    }
}

export default ChatService