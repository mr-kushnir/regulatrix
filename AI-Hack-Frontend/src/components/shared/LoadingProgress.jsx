import React from 'react';
import {CircularProgress} from "@mui/material";

const LoadingProgress = ({isLoading, size = 23, value}) => {
    return (
        <>
            {isLoading ? <CircularProgress size={size} color='primary'/> : value}
        </>
    );
};

export default LoadingProgress;
