import {Box, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useState} from "react";
import {useSnackbar} from "notistack";
import {getErrorMessage} from "../../../../../config/error.js";
import {useDispatch, useSelector} from "react-redux";
import SaveButton from "../../../../shared/SaveButton.jsx";
import {setChats} from "../../../../../store/slices/chat/chatSlice"
import ChatService from "../../../../../services/chat/ChatService.js";

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
            <SaveButton color="" onClick={deleteChat} startIcon={<DeleteIcon size="small" color="error"/>}
                        isLoading={isLoading}
                        value={
                            <Typography textAlign="left" color='error'>
                                Удалить
                            </Typography>
                        }>

            </SaveButton>
        </Box>
    )
}

export default PopoverMenu