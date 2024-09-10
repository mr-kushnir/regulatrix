import React from 'react';
import {Popover} from "@mui/material";

const PopoverWrapper = ({
                            disableRestoreFocus = false,
                            vertical = 'bottom',
                            horizontal = 'left',
                            open,
                            anchorEl,
                            handleClose,
                            children,
                            pointerEvents = 'all'
                        }) => {

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            // disableScrollLock
            onClose={handleClose}
            anchorOrigin={{
                vertical,
                horizontal,
            }}
            // sx={{
            //     pointerEvents: pointerEvents,
            // disableRestoreFocus={disableRestoreFocus}
        >
            {children}
        </Popover>
    );
};

export default PopoverWrapper;
