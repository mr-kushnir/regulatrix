import React from 'react';
import {
    Box,
    Typography,
    Modal,
    Paper,
    IconButton,
    Fade, Collapse, Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const SidebarWrapper = ({children, title, isSidebarOpen, closeSidebar, openSidebar}) => {
    return (
        // <Collapse in={isSidebarOpen}>
        <Box display="flex" maxWidth="800px" width="100%" height="100%"
             mr="auto">
            <Paper square sx={{width: '100%', height: '100%'}}>
                <Box p="10px 20px">
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb="5px">
                        <Typography component="h2" fontSize="1.25rem">{title}</Typography>
                        <IconButton onClick={closeSidebar} color="primary" size="small">
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                    {children}
                </Box>
            </Paper>
        </Box>
        // </Collapse>
    );
};

export default SidebarWrapper;
