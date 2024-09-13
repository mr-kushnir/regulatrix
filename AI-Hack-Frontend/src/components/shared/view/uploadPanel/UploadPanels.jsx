import {Box, Typography, Collapse, Button, Paper, IconButton, useTheme, useMediaQuery} from "@mui/material";
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import {useEffect, useState} from "react";
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import CollapsePanel from "../../../theme/styled/Collapse.js";
import {server} from "../../../../config/axios.js";
import {formatFileSize} from "./uploadPanels.functions.js";
import CancelIcon from '@mui/icons-material/Cancel';

import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const useUploadPaned = () => {
    const [files, setFile] = useState([])
    const [isUploaded, setIsUploaded] = useState(false)
    const [isVisiblePanel, setIsVisiblePanel] = useState(true)
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (files.length === 0) {
            setIsUploaded(false)
        }
    }, [files]);
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
        if (files.length && files.length <= 5) {
            const arrayFiles = Array.from(files)
            setFile((prev) => [...
                prev, ...Array.from(files)
            ])
            setIsUploaded(true)
            changeVisiblePanel()
        }
    };
    const handleFileUpload = (e) => {
        const files = e.target.files;
        console.log(files)
        if (files.length && files.length <= 5) {
            setIsUploaded(true)
            setFile((prev) => [...
                prev, ...Array.from(files)
            ])
        }
        changeVisiblePanel()
    };
    const deleteFile = (name) => {
        setFile(files.filter((element) => element.name !== name))
    }


    return {
        deleteFile,
        isDragging,
        isUploaded,
        files,
        handleFileUpload,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        isVisiblePanel
    }
}

const UploadPanel = ({user}) => {
    const breakpoint = useMediaQuery('(max-width:896px)');

    const [isLoading, setIsLoading] = useState(false)
    const theme = useTheme()
    const {
        isDragging,
        isUploaded,
        files,
        handleFileUpload,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        deleteFile,
        isVisiblePanel
    } = useUploadPaned()

    const uploadFiles = async () => {
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
    const cursor = files.length === 5 ? "default" : "pointer"
    const iconSize = breakpoint ? "50%" : "30%"

    return (<Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' gap='10px'
                 p={breakpoint ? "40px 10px 30px 10px " : "40px 30px 30px 30px"}>
        <label htmlFor="fileUpload" style={{
            marginTop: '10px',
            width: '100%',
            cursor: cursor
        }}>
            <Box border={files.length === 5 ? "2px dashed #80808000" : "2px dashed gray"} borderRadius='8px' p='30px'
                 display='flex'
                 justifyContent='center'
                 flexDirection='column'
                 bgcolor={isDragging ? theme.palette.primary.middleGray : theme.palette.primary.lightGray}
                 alignItems='center'

                 onDragOver={handleDragOver}
                 onDragLeave={handleDragLeave}
                 onDrop={handleDrop}>
                <CollapsePanel in={isUploaded}>
                    <DoneRoundedIcon sx={{
                        width: iconSize, height: iconSize,
                        color: files.length >= 5 ? "gray" : "white",
                    }}/>
                </CollapsePanel>
                <CollapsePanel in={!isUploaded}>
                    <CloudUploadRoundedIcon sx={{
                        width: iconSize, height: iconSize
                    }}/>
                </CollapsePanel>
                <input
                    disabled={files.length >= 5}
                    type="file"
                    style={{display: 'none'}}
                    id="fileUpload"
                    multiple
                    onChange={handleFileUpload}
                />
                <Box display='flex' flexDirection='column' alignItems='center' justifyContent="center">
                    <Box display='flex' gap='5px' alignItems='center'>
                        <Typography whiteSpace="nowrap"
                                    color={files.length >= 5 ? "gray" : theme.palette.primary.blueBell}>Выберите
                            файлы</Typography>
                        <Typography whiteSpace="nowrap" color={files.length >= 5 ? "gray" : "white"}>или перетащите
                            сюда</Typography>
                    </Box>
                    <Typography variant="subtitle2" textAlign={breakpoint ? "center" : "start"} color="gray">Загрузите
                        не более 5 файлов
                        до 10 ГБ –
                        PDF,
                        DOCX</Typography>
                </Box>
            </Box>
        </label>
        <Collapse sx={{width: "100%"}} in={isUploaded}>
            <Box display='flex' flexDirection='column' gap='10px'>
                <Typography variant='subtitle1'>Загружено – {files.length}/5</Typography>
                {files.map((element) => (
                    <Collapse key={element.name} in={true}>
                        <Box borderRadius='6px' display='flex' justifyContent='space-between' alignItems='center'
                             bgcolor={theme.palette.primary.lightGray}>
                            <Box display="flex" gap='10px' p='5px 10px' alignItems='center'>
                                <InsertDriveFileIcon size='small'/>
                                <Typography variant='subtitle2'>
                                    {element.name}
                                </Typography>
                                <Typography variant='subtitle2' color='gray'>
                                    {formatFileSize(element.size)}
                                </Typography>
                            </Box>
                            <IconButton onClick={() => deleteFile(element.name)} size='small'>
                                <CancelIcon color="primary" sx={{
                                    width: "18px"
                                }}/>
                            </IconButton>
                        </Box>
                    </Collapse>
                ))}
                <Box display='flex' justifyContent='end' width='100%'>
                    <Button onClick={uploadFiles} variant='contained' size='small'>
                        Сохранить
                    </Button>
                </Box>
            </Box>
        </Collapse>
    </Box>)
}

export default UploadPanel;