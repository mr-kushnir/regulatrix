import React from "react";
import {Route, Routes, useLocation} from 'react-router-dom';
import Auth from "./components/pages/auth/Auth";
import {Documentation, Header, Profile} from "./components/pages/_index.js";
import {Box} from "@mui/material";
import useSidebar from "./components/hooks/useSidebar.jsx";
import LeftSidebar from "./components/shared/sidebar/Sidebar.jsx";
import View from './components/shared/view/View.jsx'
const App = () => {
    const {handleChange, isSidebarOpen} = useSidebar(true)
    const location = useLocation();

    return (
        <>
            <Box height="100vh" width="100vw">
                {location.pathname !== '/login' && <Header handleChange={handleChange}/>}
                <Box display="flex" height='100vh' width='100vw'>
                    {location.pathname !== '/login' && <LeftSidebar isSidebarOpen={isSidebarOpen}/>}
                    <Routes>
                        <Route path="/" element={<View isSidebarOpen={isSidebarOpen}/>}/>
                        <Route path="/my-profile" element={<Profile isSidebarOpen={isSidebarOpen}/>}/>
                        <Route path="/regulatory-documentation"
                               element={<Documentation isSidebarOpen={isSidebarOpen}/>}/>
                        <Route path="/login" element={<Auth isSidebarOpen={isSidebarOpen}/>}/>
                    </Routes>
                </Box>
            </Box>
        </>
    );
}

export default App;