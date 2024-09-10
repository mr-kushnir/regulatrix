import React from "react";
import Main from "./components/blocks/Main";
import {Route, Routes} from 'react-router-dom';
import Auth from "./components/blocks/auth/Auth";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/login" element={<Auth/>}/>
        </Routes>
    );
}

export default App;