import React from 'react';
const colorsSnackbar = {
    error: "#e53935",
    success: "#43a047",
    info: "#5048E5",
    warning: "#FFB020"

}

export const useSnackbar = () => {
    const [snackbar, setSnackbar] = React.useState({
        open: false,
        message: '',
        severity: ''
    });

    const closeSnackbar = () => {
        setSnackbar({...snackbar, open: false, message: ''});
    };
    const openSnackbar = (param) => {
        setSnackbar({...snackbar, open: true, message: param.message, severity: colorsSnackbar[param.severity]});
    };

    return {snackbar, closeSnackbar, openSnackbar};
};