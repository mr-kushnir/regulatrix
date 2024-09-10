import {styled, TextField} from "@mui/material";

const StyledTextField = styled(TextField)(({theme}) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'transparent', // убирает границу
        },
        '&:hover fieldset': {
            borderColor: 'transparent', // убирает границу при ховере
        },
        '&.Mui-focused fieldset': {
            borderColor: 'transparent', // убирает границу при фокусе
        },
        backgroundColor: theme.palette.primary.lightGray,
        color: "white"

    },
    '& .MuiInputBase-input': {
        color: 'white', // цвет текста
    },
    '& .MuiInputLabel-root': {
        color: 'white', // цвет label по умолчанию
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: 'white', // цвет label при фокусе
    },
}));

export default StyledTextField