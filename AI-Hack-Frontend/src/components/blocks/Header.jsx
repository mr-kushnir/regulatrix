import {Avatar, Box, Button, Divider, Typography, Popover} from "@mui/material";
import ViewSidebarRoundedIcon from '@mui/icons-material/ViewSidebarRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import React, {useState} from "react";
import StyledPaper from "../theme/styled/Paper.js";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import StyledIconButton from "../theme/styled/SquareIconButton";

const Header = ({handleChange}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl)
    const popoverHandleChange = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const popoverHandleClose = () => {
        setAnchorEl(null);
    };

    return <Box position="absolute" height="42px" p="5px 5px 0 10px" top={0} left={0} right={0}
                zIndex={10}>
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
            <Box display='flex' alignItems='center' gap='10px'>
                <StyledIconButton disableTouchRipple onClick={handleChange} size="small" color="primary">
                    <ViewSidebarRoundedIcon/>
                </StyledIconButton>
                <Typography variant='h6' fontWeight={600}>Regulatrix</Typography>
            </Box>
            {/*<Button onClick={popoverHandleChange} size="small"*/}
            {/*        endIcon={<KeyboardArrowDownRoundedIcon/>}>PuzzleGPT</Button>*/}
            <Popover
                open={open}
                anchorEl={anchorEl}
                PaperProps={{
                    component: StyledPaper
                }}
                onClose={popoverHandleClose}
                anchorOrigin={{
                    vertical: 'bottom', horizontal: 'left',
                }}
            >
                <Box display="flex" flexDirection="column">
                    <Button startIcon={<AutoAwesomeIcon size="small"/>}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Button>
                    <Button startIcon={<TipsAndUpdatesIcon size="small"/>}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Button>
                    <Box p="5px 0 5px 0">
                        <Divider/>
                    </Box>
                    <Button startIcon={<AllInclusiveIcon size="small"/>}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Button>
                </Box>
            </Popover>
            <StyledIconButton borderradius="50%">
                <Avatar/>
            </StyledIconButton>
        </Box>
    </Box>
}

export default Header
