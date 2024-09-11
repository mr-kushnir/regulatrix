import StyledPaper from "../../../theme/styled/Paper.js";
import {Box, Button, FormControl, FormControlLabel, Popover, Radio, RadioGroup, Typography} from "@mui/material";
import React, {useState} from "react";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import usePopover from "../../../hooks/usePopover.jsx";

const AITypeButton = () => {
    const {anchorEl, open, closePopover, openPopover} = usePopover()
    const [AIType, setAIType] = useState("Mistral 7b")
    return (
        <>
            <Button onClick={openPopover} size="small"
                    endIcon={<KeyboardArrowDownRoundedIcon/>}>PuzzleGPT</Button>
            <Popover
                open={open}
                anchorEl={anchorEl}
                PaperProps={{
                    component: StyledPaper
                }}
                onClose={closePopover}
                anchorOrigin={{
                    vertical: 'bottom', horizontal: 'left',
                }}
            >
                <Box display="flex" flexDirection="column" p='10px'>
                    <FormControl>
                        <Typography>Тип AI</Typography>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={AIType}
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="Mistral 7b"
                                              control={<Radio onChange={(e) => setAIType(e.target.value)}
                                                              color='info'/>} label="Mistral 7b"/>
                            <FormControlLabel value="Ya GPT" control={<Radio onChange={(e) => setAIType(e.target.value)}
                                                                             color='info'/>} label="Ya GPT"/>
                        </RadioGroup>
                    </FormControl>
                </Box>
            </Popover>
        </>
    )
}

export default AITypeButton