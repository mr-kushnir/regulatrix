import {createSlice} from '@reduxjs/toolkit';
import initialState from "./state.js";


const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setCurrentChatIndex(state, action) {
            state.currentChatIndex = action.payload
        },
        setChats(state, action) {
            state.chats = action.payload
        },
        prependChat(state, action) {
            state.chats = [action.payload, ...state.chats]
        },
        setMessages(state, action) {
            state.chatMessages = action.payload
        },
        appendMessage(state, action) {
            state.chatMessages.push(action.payload)
        }
    }
});

export default chatSlice.reducer;
export const {setCurrentChatIndex, setChats, setMessages, prependChat, appendMessage} = chatSlice.actions;
