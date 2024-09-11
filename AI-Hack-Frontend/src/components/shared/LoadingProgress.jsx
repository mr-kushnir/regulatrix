import React from 'react';
import {CircularProgress} from "@mui/material";

const LoadingProgress = ({className = "", isLoading, size = 23, value = "", color = "primary"}) => {
    return (
        <>
            {isLoading ? <CircularProgress className={className} size={size} color={color}/> : value}
        </>
    );
};

export default LoadingProgress;
