import {combineReducers} from '@reduxjs/toolkit';
import {userPersist} from "../persists/persistsReducers.js";
import chatSlice from "../slices/chat/chatSlice.js";


const rootReducer = combineReducers({
    user: userPersist,
    chat: chatSlice
});
export default rootReducer;
