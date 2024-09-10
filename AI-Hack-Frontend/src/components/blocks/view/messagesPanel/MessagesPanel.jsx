import {Box, Fade, Typography, useTheme} from "@mui/material";
import clsx from "clsx";
import {useSelector} from "react-redux";
import LoadingProgress from "../../../shared/LoadingProgress.jsx";

const AI = "AI"
const USER = "USER"

const MessagesPanel = ({isAILoading}) => {
    const theme = useTheme()
    const chatMessages = useSelector(state => state.chat.chatMessages)


    return (<Box display="flex" flexDirection='column' gap='20px' pt='20px' width="-webkit-fill-available"
                 justifyContent="flex-start" position='relative'>
        {chatMessages.length !== 0 && chatMessages.map((item) => (<Box className={clsx({
            "message--center": item.message_type === AI, "message--right": item.message_type === USER,
        })}>
            <Box key={item.id} bgcolor={item.message_type === AI ? "inherit" : theme.palette.primary.lightGray}
                 borderRadius='20px'
                 p='4px'
                 minWidth='36px'
                 display='flex'
                 justifyContent='center'
                 alignItems='center'>
                <Fade in={true}>
                    <Typography className={clsx({
                        "message__title": true, "message__title--active": item.message_type === AI,
                    })} variant='subtitle2'>
                        {item.message}
                    </Typography>
                </Fade>
            </Box>
        </Box>))}
        <LoadingProgress value="" isLoading={isAILoading}/>
    </Box>)
}

export default MessagesPanel