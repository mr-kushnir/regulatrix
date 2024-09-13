import StyledIconButton from "../../../theme/styled/SquareIconButton.js";
import {
    Avatar,
    Box,
    Button, Divider,
    FormControl,
    FormControlLabel, ListItemButton, ListItemText,
    Popover,
    Radio,
    RadioGroup,
    Typography, useMediaQuery
} from "@mui/material";
import React from "react";
import StyledPaper from "../../../theme/styled/Paper.js";
import usePopover from "../../../hooks/usePopover.jsx";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const AvatarPanel = ({handleChange}) => {
    const breakpoint = useMediaQuery('(max-width:896px)');
    const {openPopover, anchorEl, open, closePopover} = usePopover()
    const navigate = useNavigate()
    const {user} = useSelector(state => state.user)

    const navigatePage = (url) => {
        if (breakpoint) {
            handleChange()
        }
        navigate(url)
        closePopover()
    }


    return (
        <Box width='100%' height='40px'>
            <ListItemButton onClick={openPopover} sx={{borderRadius: "6px", height: "45px", padding: "0 4px"}}>
                <Box display='flex' gap='10px' alignItems='center'>
                    <StyledIconButton borderradius="50%">
                        <Avatar sx={{width: "35px", height: "35px"}}/>
                    </StyledIconButton>
                    <Typography>{user.user_name}</Typography>
                </Box>
            </ListItemButton>
            <Popover
                open={open}
                anchorEl={anchorEl}
                PaperProps={{
                    component: StyledPaper
                }}
                onClose={closePopover}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <Box display="flex" flexDirection="column">
                    <ListItemButton disabled={true} onClick={() => navigatePage("/my-profile")}>
                        <Typography variant="subtitle2">Профиль</Typography>
                    </ListItemButton>
                    <Divider/>
                    <ListItemButton disabled={true} onClick={() => navigatePage("/my-profile")}>
                        <Typography variant="subtitle2">Настройки</Typography>
                    </ListItemButton>
                    <Divider/>
                    <ListItemButton onClick={() => navigatePage("/")}>
                        <Typography variant="subtitle2">Чат</Typography>
                    </ListItemButton>
                    <Divider/>
                    <ListItemButton onClick={() => navigatePage("/regulatory-documentation")}>
                        <Typography variant="subtitle2">Нормативная документация</Typography>
                    </ListItemButton>
                </Box>
            </Popover>
        </Box>

    )
}

export default AvatarPanel