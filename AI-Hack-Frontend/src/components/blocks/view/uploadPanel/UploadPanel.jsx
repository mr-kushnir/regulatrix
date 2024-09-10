import {Box, Typography, Collapse, Button, Paper, IconButton, useTheme} from "@mui/material";
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import {useEffect, useState} from "react";
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import CollapsePanel from "../../../theme/styled/Collapse.js";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import {server} from "../../../../config/axios.js";
import TextField from "../../../theme/styled/TextField.js";

const useUploadPaned = (setChatName) => {
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState(null)
    const [isUploaded, setIsUploaded] = useState(false)
    const [isVisiblePanel, setIsVisiblePanel] = useState(true)
    const [isDragging, setIsDragging] = useState(false);

    const changeVisiblePanel = () => {
        const handler = setTimeout(() => {
            setIsVisiblePanel(false);
            clearTimeout(handler)
        }, 2000);
    }
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length) {
            setFile(files[0])
            setIsUploaded(true)
            changeVisiblePanel()
        }
    };
    const handleFileUpload = (e) => {
        const files = e.target.files;
        if (files?.length > 0) {
            setIsUploaded(true)
            setFile(files[0])
        }
        changeVisiblePanel()
    };
    const deleteFile = () => {
        setFile(null)
        setIsUploaded(false)
        setFileName(null)
        setChatName("")
    }

    useEffect(() => {
        if (file?.name.length > 30) {
            setFileName(`${file.name.slice(0, 30)}...`)
        }

        setFileName(file?.name)
    }, [file]);
    return {
        deleteFile,
        isDragging,
        isUploaded,
        fileName,
        handleFileUpload,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        isVisiblePanel
    }
}

const UploadPanel = ({user}) => {

    const [isLoading, setIsLoading] = useState(false)
    const [chatName, setChatName] = useState("")
    const theme = useTheme()
    const {
        isDragging,
        isUploaded,
        fileName,
        handleFileUpload,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        deleteFile,
        isVisiblePanel
    } = useUploadPaned(setChatName)

    const createChat = async () => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("user_id", user.id)
        try {
            setIsLoading(true)
            const response = await server.post("/chat/", {})
        } catch (e) {

        } finally {
            setIsLoading(true)

        }
    }


    return (<Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' gap='10px'>
        <Collapse in={isVisiblePanel}>
            <label htmlFor="fileUpload" style={{marginTop: '10px', cursor: 'pointer'}}>
                <Box border="2px dashed gray" borderRadius='8px' p='30px' display='flex' justifyContent='center'
                     flexDirection='column'
                     bgcolor={isDragging ? theme.palette.primary.middleGray : theme.palette.primary.lightGray}
                     alignItems='center'
                     onDragOver={handleDragOver}
                     onDragLeave={handleDragLeave}
                     onDrop={handleDrop}>
                    <CollapsePanel in={isUploaded}>
                        <DoneRoundedIcon sx={{
                            width: '50%', height: "50%"
                        }}/>
                    </CollapsePanel>
                    <CollapsePanel in={!isUploaded}>
                        <CloudUploadRoundedIcon sx={{
                            width: '50%', height: "50%"
                        }}/>
                    </CollapsePanel>
                    <input
                        type="file"
                        style={{display: 'none'}}
                        id="fileUpload"
                        onChange={handleFileUpload}
                    />
                    <Collapse in={!isUploaded}>
                        <Box display='flex' flexDirection='column' alignItems='center' justifyContent="center">
                            <Typography variant='h6'>Перетащите или загрузите файл</Typography>
                            <Typography variant="subtitle2" color={theme.palette.primary.blueBell}>Поддерживаемые
                                форматы:
                                PDF,
                                DOCX</Typography>
                        </Box>
                    </Collapse>
                </Box>
            </label>
        </Collapse>
        <Collapse sx={{width: "100%"}} in={isUploaded}>
            <Box display='flex' flexDirection='column' gap='10px'>
                <Typography variant='subtitle1'>Загружено – 1/1 файлов</Typography>
                <Paper>
                    <Box display='flex' justifyContent='space-between'>
                        <Box p='5px 10px'>
                            {fileName}
                        </Box>
                        <IconButton onClick={deleteFile} size='small' color='error'>
                            <ClearRoundedIcon size='small'/>
                        </IconButton>
                    </Box>
                </Paper>
                <TextField label='Имя чата' placeholder="Введите имя чата" size="small"
                           onChange={(e) => setChatName(e.target.value)} value={chatName}/>
                <Button onClick={createChat}>
                    Создать чат
                </Button>
            </Box>
        </Collapse>
    </Box>)
}

export default UploadPanel;