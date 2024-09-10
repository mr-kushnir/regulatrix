import {Box, Collapse, Fade, Typography, Skeleton, useTheme} from "@mui/material";
import clsx from "clsx";
import {useSelector, useDispatch} from "react-redux";
import {useEffect, useState,} from "react";
import ChatItem from "./chatItem/ChatItem.jsx";
import ChatService from '../../../services/chat/ChatService'
import {setChats} from "../../../store/slices/chat/chatSlice"

const LeftSidebar = ({isSidebarOpen}) => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const theme = useTheme()
    const {chats, user, currentChatIndex} = useSelector(state => {
        return {
            chats: state.chat.chats, currentChatIndex: state.chat.currentChatIndex, user: state.user.user
        }
    });
    useEffect(() => {
        const fetchChats = async () => {
            setIsLoading(true)
            try {
                const chats = await ChatService.getChats(user.id)
                dispatch(setChats(chats))
            } catch (e) {

            } finally {
                setIsLoading(false)
            }
        }
        fetchChats()
    }, []);

    return <Box className={clsx({
        menu: true, "menu-disabled": !isSidebarOpen,
    })}>
        <Box p='20px 10px 20px 10px' mt="50px" display="flex" flexDirection="column" width="100%">
            <Box display="flex" flexDirection="column" overflow="hidden">
                <Box p='0 0 5px 3px'>
                    <Typography variant="subtitle" color={theme.palette.primary.gray}
                                fontWeight='600'>Сегодня</Typography>
                </Box>
                <Collapse in={isLoading}>
                    <Box display='flex' flexDirection="column" gap="5px">
                        {[0, 1, 2, 3, 4, 5].map((element) => (
                            <Skeleton key={element} sx={{bgcolor: theme.palette.primary.skeleton}} variant="rounded"
                                      animation="wave"
                                      width="100%" height="38px"/>

                        ))}
                    </Box>
                </Collapse>
                <Collapse in={!isLoading}>
                    <Box display='flex' flexDirection="column" gap='5px'>
                        {chats.map((item, index) => <ChatItem key={item.id} item={item} index={index}
                                                              dispatch={dispatch}
                                                              currentChatIndex={currentChatIndex}/>)}
                    </Box>
                </Collapse>
            </Box>
        </Box>
    </Box>
}


export default LeftSidebar