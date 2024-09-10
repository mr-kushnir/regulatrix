import {IconButton, styled} from "@mui/material";

const StyledIconButton = styled(IconButton)(({theme, borderRadius = "6px"}) => ({
    width: '40px',
    height: '40px',
    borderRadius: borderRadius,
}));


export default StyledIconButton;