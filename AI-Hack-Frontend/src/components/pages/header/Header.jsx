import {
    Box,
    Typography,
} from "@mui/material";
import ViewSidebarRoundedIcon from '@mui/icons-material/ViewSidebarRounded';
import React from "react";
import StyledIconButton from "../../theme/styled/SquareIconButton.js";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {useDispatch} from "react-redux";
import {setCurrentChatIndex, setMessages} from "../../../store/slices/chat/chatSlice.js";
import SquareIconButton from "../../theme/styled/SquareIconButton.js";
import regulLogo from "../../../assets/regulLogo.png"

const Header = ({isChatsLoading, handleChange}) => {
    const dispatch = useDispatch()

    const setNewChat = () => {
        dispatch(setCurrentChatIndex(null))
        dispatch(setMessages([]))
    }

    return (<Box className='header'>
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
            <Box display='flex' alignItems='center' gap='10px'>
                <StyledIconButton disableTouchRipple onClick={handleChange} size="small" color="primary">
                    <OpenInNewIcon size='small'/>
                </StyledIconButton>
                <img className="logo" src={regulLogo} alt="Логотип"/>
            </Box>
            <SquareIconButton disabled={isChatsLoading} disableTouchRipple={true} onClick={setNewChat}
                              color='primary'>
                <ViewSidebarRoundedIcon size='small'/>
            </SquareIconButton>
        </Box>
    </Box>)
}
export default Header;
