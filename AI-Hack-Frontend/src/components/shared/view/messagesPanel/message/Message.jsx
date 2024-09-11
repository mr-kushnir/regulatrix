import {Box, Fade, Typography, useTheme} from "@mui/material";
import clsx from "clsx";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import DoneIcon from '@mui/icons-material/Done';
import {useState} from "react";
import {useSnackbar} from "notistack";

const AI = "AI"
const USER = "USER"
const Message = ({item}) => {
    const {enqueueSnackbar} = useSnackbar()
    const theme = useTheme()
    const [isCopy, setIsCopy] = useState(false)
    const [isIconVisible, setIsIconVisible] = useState(false)

    const copyToBuffer = (message) => {
        setIsCopy(prev => !prev)
        navigator.clipboard.writeText(message);
    }
    const sendStatus = () => {
        enqueueSnackbar("Спасибо за отзыв!", {variant: "info"})
    }

    return (<Box className={clsx({
            "message--center": item.message_type === AI, "message--right": item.message_type === USER,
        })}
                 onMouseEnter={() => setIsIconVisible(true)}
                 onMouseLeave={() => setIsIconVisible(false)}
        >
            <Box key={item.id}
                 bgcolor={item.message_type === AI ? "inherit" : theme.palette.primary.lightGray}
                 borderRadius='20px'
                 minWidth='36px'
                 display='flex'
                 padding={item.message_type === AI ? "" : "2px 15px"}
                 justifyContent='center'
                 alignItems='center'>
                <Fade in={true}>
                    <Box className={clsx({
                        "message__title": true, "message__title--active": item.message_type === AI,
                    })}>
                        <Markdown remarkPlugins={[[remarkGfm, {singleTilde: false}]]}>
                            {item.message}
                        </Markdown>
                    </Box>
                </Fade>
            </Box>
            <Fade in={isIconVisible}>
                <Box position="absolute" display="flex" gap="5px" bottom="-20px">
                    {isCopy ? <DoneIcon onClick={() => copyToBuffer(item.message)} className="panel__icon"/> :
                        <ContentCopyIcon onClick={() => copyToBuffer(item.message)} className="panel__icon"/>}
                    <ThumbUpOffAltIcon onClick={() => sendStatus(true)} className="panel__icon"/>
                    <ThumbDownOffAltIcon onClick={() => sendStatus(true)} className="panel__icon"/>
                </Box>
            </Fade>
        </Box>


    )
}

export default Message;