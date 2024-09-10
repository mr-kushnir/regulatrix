import {styled} from "@mui/material";

const StyledPaper = styled('div')(({theme}) => ({
    backgroundColor: '#2f2f2f',
    color: 'white',
    padding: "5px",
    boxShadow: theme.shadows[5],
    borderRadius: '8px',
}));

export default StyledPaper;