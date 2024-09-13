import {Box, Button, IconButton, InputAdornment, Typography, useMediaQuery, useTheme} from "@mui/material";
import clsx from "clsx";
import StyledTextField from "../../theme/styled/TextField";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import {useSelector, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import MessagesPanel from "./messagesPanel/MessagesPanel.jsx";
import {
    setChats,
    setCurrentChatIndex,
    setMessages,
    appendMessage,
    prependChat
} from "../../../store/slices/chat/chatSlice.js";
import {getErrorMessage} from "../../../config/error.js";
import {useSnackbar} from "notistack";
import LoadingProgress from "../../shared/LoadingProgress.jsx";
import {useNavigate} from "react-router-dom";
import ChatService from "../../../services/chat/ChatService.js";
import VisuallyHiddenInput from "../../theme/styled/input.js";

const View = ({isSidebarOpen}) => {
    const {enqueueSnackbar} = useSnackbar();
    const breakpoint = useMediaQuery('(max-width:896px)');
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isAILoading, setIsAILoading] = useState(false)
    const {user, chats, currentChatIndex} = useSelector(state => {
        return {
            user: state.user.user,
            chats: state.chat.chats,
            currentChatIndex: state.chat.currentChatIndex,
        }
    })
    useEffect(() => {
        if (!user?.id) {
            navigate("/login")
        }
    }, [user, navigate])

    const createUserChat = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        setMessage("");
        if (message === "") {
            enqueueSnackbar("Введите сообщение", {variant: 'info'});
            return
        }
        try {
            // Создаем новый чат
            const chat = await ChatService.createChat(user.id, message);
            // Получаем обновленный список чатов
            dispatch(prependChat(chat))

            // Получаем сообщения для созданного чата
            dispatch(setMessages(
                await ChatService.getMessages(chat.id)
            ))
            setIsAILoading(true)
            dispatch(appendMessage(
                await ChatService.getAIResponse(chat.id, message)
            ))

            dispatch(setCurrentChatIndex(0));
        } catch (error) {
            // Обрабатываем ошибку и показываем сообщение
            enqueueSnackbar(getErrorMessage(error), {variant: 'error'});
        } finally {
            setIsAILoading(false)
            setIsLoading(false)
        }
    };


    const createUserMessage = async (e) => {
        setIsLoading(true)
        setMessage('')
        e.preventDefault()
        if (message === "") {
            enqueueSnackbar("Введите сообщение", {variant: 'info'});
            return
        }
        try {
            const chat_id = chats[currentChatIndex].id
            dispatch(appendMessage(
                await ChatService.createMessage(chat_id, user.id, message)
            ))
            setIsAILoading(true)
            dispatch(appendMessage(
                await ChatService.getAIResponse(chat_id, message)
            ))
        } catch (e) {
            enqueueSnackbar(getErrorMessage(e), {variant: "error"})
        } finally {
            setIsAILoading(false)
            setIsLoading(false)
        }
    }


    const setSubmit = (e) => {
        if (currentChatIndex !== null) {
            createUserMessage(e)
            return
        }
        createUserChat(e)
    }

    return (
        <>
            <Box className={clsx({
                view: true, "view-disabled": !isSidebarOpen,
            })}>
                <Box className="view__container">
                    <MessagesPanel isAILoading={isAILoading}/>
                    <Box className='view__gradient'></Box>
                    <Box position='absolute'/>
                    <Box display="flex" flexDirection='column' gap="5px" alignItems="center"
                         justifyContent="center">
                        <form className="form" onSubmit={setSubmit}>
                            <StyledTextField onChange={(e) => setMessage(e.target.value)} value={message} fullWidth
                                             variant="outlined" label="Сообщение..."
                                             placeholder="Введите сообщение"
                                             size={breakpoint ? "small" : "medium"}
                                             InputProps={{
                                                 endAdornment: (<InputAdornment position="end">
                                                     {breakpoint ? <LoadingProgress isLoading={isLoading}
                                                                                    value={<SendRoundedIcon
                                                                                        onClick={setSubmit}
                                                                                        type="submit"
                                                                                        color="primary"/>}/> :
                                                         <Button disabled={isLoading} variant="contained"
                                                                 type="submit"
                                                                 size='small'
                                                                 onClick={setSubmit}>
                                                             <LoadingProgress isLoading={isLoading}
                                                                              value={<SendRoundedIcon
                                                                                  color="black"/>}/>
                                                         </Button>
                                                     }
                                                 </InputAdornment>),
                                             }}/>
                        </form>
                    </Box>
                </Box>
            </Box>
        </>
    )
}


export default View;
