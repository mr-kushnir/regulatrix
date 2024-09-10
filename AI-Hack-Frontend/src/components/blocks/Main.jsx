import React from "react";
import {Box} from "@mui/material";
import useSidebar from "../hooks/useSidebar.jsx";
import {Header, LeftSidebar} from "./_index.js";
import View from "./view/View.jsx";

const Main = () => {

    const {handleChange, isSidebarOpen} = useSidebar()

    return (
        <Box height="100vh" width="100vw">
            <Header handleChange={handleChange}/>
            <Box display="flex" height='100vh' width='100vw'>
                <LeftSidebar isSidebarOpen={isSidebarOpen}/>
                <View isSidebarOpen={isSidebarOpen}/>
            </Box>
        </Box>

    )
}

export default Main
