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
                        {children}
                    </Paper>
                </Box>
            </Fade>
        </Modal>
    );
};

export default ModalWrapper;
