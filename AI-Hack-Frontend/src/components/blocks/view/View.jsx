import {Box, Button, IconButton, InputAdornment, Typography, useTheme} from "@mui/material";
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

const View = ({isSidebarOpen}) => {
    const {enqueueSnackbar} = useSnackbar();
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

    return <Box className={clsx({
        view: true, "view-disabled": !isSidebarOpen,
    })}>
        <Box height="-webkit-fill-available" display="flex" flexDirection='column' p='40px 40px 10px 40px'>
            <Box
                width="-webkit-fill-available"
                display="flex"
                height="100%"
                flex-direction="column"
                gap="10px"
                overflow="scroll"
            >
                <MessagesPanel isAILoading={isAILoading}/>

            </Box>
            <Box display="flex" flexDirection='column' gap="5px" alignItems="center"
                 justifyContent="center">
                <form className="form" onSubmit={setSubmit}>
                    <StyledTextField onChange={(e) => setMessage(e.target.value)} value={message} fullWidth
                                     variant="outlined" label="Сообщение..."
                                     placeholder="Введите сообщение"
                                     InputProps={{
                                         endAdornment: (<InputAdornment position="end">
                                             <Button disabled={isLoading} variant="contained" type="submit"
                                                     size='small'
                                                     onClick={setSubmit}>
                                                 <LoadingProgress isLoading={isLoading}
                                                                  value={<SendRoundedIcon color="black"/>}/>
                                             </Button>
                                         </InputAdornment>)
                                         // startAdornment: (<InputAdornment position="start">
                                         //     <Button
                                         //         component="label"
                                         //         role={undefined}
                                         //         variant="contained"
                                         //         tabIndex={-1}
                                         //         startIcon={<CloudUploadIcon/>}
                                         //     >
                                         //         {file ? "Загружено" : "Загрузить файл"}
                                         //         <VisuallyHiddenInput
                                         //             type="file"
                                         //             onChange={(event) => setFile(event.target.files[0])}
                                         //         />
                                         //     </Button>
                                         // </InputAdornment>)
                                     }}/>
                </form>
            </Box>
        </Box>
    </Box>
}


export default View;
