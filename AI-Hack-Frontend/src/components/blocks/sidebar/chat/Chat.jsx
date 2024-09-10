import {Box, Typography} from "@mui/material";
import ChatItem from "../chatItem/ChatItem.jsx";
import {useEffect, useState} from "react";
import {server} from "../../../../config/axios.js";


const Chat = ({user, item}) => {
    return (
        <Box display="flex" flexDirection="column" gap="2px" overflow="hidden">
            <Box pl="5px" m='20px 0 10px 0'>
                <Typography whiteSpace="nowrap" fontWeight={600}>{item.title}</Typography>
            </Box>
            {chatItems.map((item, index) => (<ChatItem item={item} key={index}/>))}
        </Box>
    )
}
export default Chat
