import {
    Box,
    Typography,
} from "@mui/material";
import ViewSidebarRoundedIcon from '@mui/icons-material/ViewSidebarRounded';
import React from "react";
import StyledIconButton from "../../theme/styled/SquareIconButton.js";
import AITypeButton from "./intelligenceTypeButton/AITypeButton.jsx";
import AvatarPanel from "../../shared/sidebar/avatarPanel/AvatarPanel.jsx";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {useDispatch} from "react-redux";
import {setCurrentChatIndex, setMessages} from "../../../store/slices/chat/chatSlice.js";
import SquareIconButton from "../../theme/styled/SquareIconButton.js";

const Header = ({handleChange}) => {
    const dispatch = useDispatch()

    const setNewChat = () => {
        dispatch(setCurrentChatIndex(null))
        dispatch(setMessages([]))
    }

    return <Box position="absolute" height="42px" p="5px 5px 0 10px" top={0} left={0} right={0}
                zIndex={10}>
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
            <Box display='flex' alignItems='center' gap='10px'>
                <StyledIconButton disableTouchRipple onClick={handleChange} size="small" color="primary">
                    <ViewSidebarRoundedIcon/>
                </StyledIconButton>
                <Typography variant='h6' fontWeight={600}>Regulatrix</Typography>
            </Box>
            <SquareIconButton disableTouchRipple={true}  onClick={setNewChat} color='primary'>
                <OpenInNewIcon size='small'/>
            </SquareIconButton>
            {/*<AITypeButton/>*/}
        </Box>
    </Box>
}

export default Header
