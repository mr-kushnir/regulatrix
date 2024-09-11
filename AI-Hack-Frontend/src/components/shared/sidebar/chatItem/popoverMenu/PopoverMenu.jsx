import {
    Box, Typography, ListItemButton, Divider
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useState} from "react";
import {useSnackbar} from "notistack";
import {getErrorMessage} from "../../../../../config/error.js";
import {useDispatch, useSelector} from "react-redux";
import {setChats} from "../../../../../store/slices/chat/chatSlice"
import ChatService from "../../../../../services/chat/ChatService.js";
import ArchiveIcon from '@mui/icons-material/Archive';
import LoadingProgress from "../../../LoadingProgress.jsx";

const PopoverMenu = ({closePopover, chat_id}) => {
    const {user} = useSelector(state => state.user)
    const {enqueueSnackbar} = useSnackbar();
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    const deleteChat = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await ChatService.deleteChat(user.id, chat_id)
            dispatch(setChats(
                await ChatService.getChats(user.id)
            ))
        } catch (e) {
            enqueueSnackbar(getErrorMessage(e), {variant: "error"})
        } finally {
            setIsLoading(false)
            closePopover()
        }
    }


    return (
        <Box display="flex" flexDirection="column">
            <ListItemButton disabled={true}>
                <Box display='flex' alignItems='center' gap='10px'>
                    <ArchiveIcon size="small"/>
                    <Typography textAlign="left" variant="subtitle2">
                        В архив
                    </Typography>
                </Box>
            </ListItemButton>
            <Divider/>
            <ListItemButton disabled={isLoading} onClick={deleteChat}>
                <Box display='flex' alignItems='center' gap='10px'>
                    <LoadingProgress isLoading={isLoading} color="error" value={
                        <DeleteIcon size="small" color="error"/>
                    }/>
                    <Typography textAlign="left" color='error' variant="subtitle2">
                        Удалить
                    </Typography>
                </Box>
            </ListItemButton>
        </Box>
    )
}

export default PopoverMenu