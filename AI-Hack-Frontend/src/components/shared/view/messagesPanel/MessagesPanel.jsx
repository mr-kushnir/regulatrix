import {Box, Fade, Typography, useTheme} from "@mui/material";
import clsx from "clsx";
import {useSelector} from "react-redux";
import LoadingProgress from "../../../shared/LoadingProgress.jsx";
import {useEffect, useRef} from "react";

import Message from "../messagesPanel/message/Message.jsx";


const MessagesPanel = ({isAILoading}) => {
    const chatMessages = useSelector(state => state.chat.chatMessages)
    const containerRef = useRef(null);

    const scrollToBottom = () => {
        containerRef.current?.scrollTo({top: containerRef.current.scrollHeight + 50, behavior: "smooth"});
    };
    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    return (<Box
            position='relative'
            width="-webkit-fill-available"
            display="flex"
            height="100%"
            flex-direction="column"
            gap="10px"
            overflow="scroll"
            ref={containerRef}
        >
            <Box display="flex" flexDirection='column' gap='35px' pt='20px'
                 width="-webkit-fill-available"
                 justifyContent="flex-start" position='relative'>
                {chatMessages.length !== 0 && chatMessages.map((item) => (
                    <Message key={item.id} item={item}/>
                ))}
                <Fade in={isAILoading}>
                    <Box className="message--center">
                        <LoadingProgress isLoading={isAILoading}/>
                    </Box>
                </Fade>
            </Box>
        </Box>
    )
}

export default MessagesPanel