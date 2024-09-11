import React from "react";
import {Box} from "@mui/material";
import LeftSidebar from "../shared/sidebar/Sidebar.jsx";
import View from "../shared/view/View.jsx";

const Main = ({isSidebarOpen}) => {

    return (
        <Box display="flex" height='100vh' width='100vw'>
            <LeftSidebar isSidebarOpen={isSidebarOpen}/>
            <View isSidebarOpen={isSidebarOpen}/>
        </Box>
    )
}

export default Main
