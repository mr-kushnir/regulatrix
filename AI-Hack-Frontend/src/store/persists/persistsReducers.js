import {persistReducer} from 'redux-persist';
import authSlice from "../slices/auth/userSlice.js";
import {userPersistConfig} from "./config.js";

const userPersist = persistReducer(userPersistConfig, authSlice);

export {userPersist};
