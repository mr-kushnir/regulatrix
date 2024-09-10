import React from 'react';
import {Button} from "@mui/material";
import LoadingProgress from "./LoadingProgress";


const SaveButton = ({
                        onClick,
                        disabled,
                        isLoading,
                        fullWidth = true,
                        value = "Сохранить",
                        color = "primary",
                        sx,
                        startIcon
                    }) => {
    return (
        <Button
            sx={sx}
            startIcon={startIcon}
            fullWidth={fullWidth}
            color={color}
            disabled={disabled || isLoading}
            variant="contained"
            size="small"
            type="submit"
            onClick={onClick}>
            <LoadingProgress value={value} isLoading={isLoading}/>
        </Button>);
};

export default SaveButton;
