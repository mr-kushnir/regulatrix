import {Box, Button, IconButton, Popover, Typography, Fade, Divider, useTheme, useMediaQuery} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {useEffect, useState} from "react";
import StyledPaper from "../../../theme/styled/Paper.js";
import usePopover from "../../../hooks/usePopover.jsx";
import PopoverMenu from "./popoverMenu/PopoverMenu.jsx";
import clsx from "clsx";
import {setCurrentChatIndex, setMessages} from "../../../../store/slices/chat/chatSlice.js";
import LoadingProgress from "../../../shared/LoadingProgress.jsx"
import ChatService from "../../../../services/chat/ChatService.js";
import {useNavigate} from "react-router-dom";

const ChatItem = ({isChatLoading, setIsChatLoading, handleChange, currentChatIndex, item, index, dispatch}) => {
    const breakpoint = useMediaQuery('(max-width:896px)');
    const {anchorEl, open, openPopover, closePopover} = usePopover()
    const [isHovered, setHovered] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const theme = useTheme()


    const setupChat = async (e) => {
        navigate("/")
        e.stopPropagation()
        e.preventDefault()
        dispatch(setCurrentChatIndex(index))
        setIsLoading(true)
        setIsChatLoading(true)
        if (breakpoint) {
            handleChange()
        }
        try {
            dispatch(setMessages(
                await ChatService.getMessages(item.id)
            ))
        } catch (e) {

        } finally {
            setIsLoading(false)
            setIsChatLoading(false)
        }
    }
    const isActive = index === currentChatIndex
    return (
        <>
            <Button onClick={setupChat}
                    fullWidth
                    disabled={isChatLoading}
                    disableRipple
                    size="small"
                    sx={{
                        backgroundColor: isActive ? theme.palette.primary.lightGray : "",
                        padding: '4px 8px',
                    }}
                    endIcon={
                        <>
                            <Fade in={isHovered}>
                                <Box className="icon">
                                    <Box className="icon__gradient"/>
                                    <IconButton onClick={openPopover} size='small' color="primary">
                                        <MoreHorizIcon size="small"/>
                                    </IconButton>
                                </Box>
                            </Fade>
                            <Fade in={!isHovered}>
                                <Box className="icon"/>
                            </Fade>
                        </>
                    }

                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
            >
                <Box position="relative" flexGrow={1} display="flex" alignItems='center'>
                    <Box className="item__gradient"/>
                    <LoadingProgress isLoading={isLoading} value={
                        <Typography position="absolute" top='-10px' variant="subtitle2" whiteSpace="nowrap">
                            {item.title}
                        </Typography>
                    }/>
                </Box>
            </Button>
            <Divider/>
            <Popover
                open={open}
                anchorEl={anchorEl}
                PaperProps={{
                    component: StyledPaper
                }}
                onClose={closePopover}
                anchorOrigin={{
                    vertical: 'bottom', horizontal: 'right',
                }}
            >
                <PopoverMenu closePopover={closePopover} chat_id={item.id}/>
            </Popover>
        </>

    )
}

export default ChatItem