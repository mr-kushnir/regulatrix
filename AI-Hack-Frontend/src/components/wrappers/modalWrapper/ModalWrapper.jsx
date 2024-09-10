import React from 'react';
import {Box, Fade, IconButton, Modal, Paper, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


const ModalWrapper = ({maxWidth = '700px', children, open, handleClose, title}) => {

    return (
        <Modal
            open={open}
            onClose={handleClose}
            disableScrollLock
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Fade in={open}>
                <Box display="flex" justifyContent="center" alignItems='center' width="100vh"
                     height="100vh"
                     m="auto" onClick={handleClose}>
                    <Paper sx={{maxWidth, width: '100%', height: 'max-content'}}
                           onClick={(e) => e.stopPropagation()}>
                        <Box p="10px 20px">
                            <Box display='flex' justifyContent='space-between' alignItems='center'>
                                <Typography variant='h6'>{title}</Typography>
                                <IconButton color='primary' onClick={handleClose}>
                                    <CloseIcon/>
                                </IconButton>
                            </Box>
                            {children}
                        </Box>
                    </Paper>
                </Box>
            </Fade>
        </Modal>
    );
};

export default ModalWrapper;
