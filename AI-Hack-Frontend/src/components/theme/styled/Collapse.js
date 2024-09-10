import {Collapse, styled} from "@mui/material";

const CollapsePanel = styled(Collapse)(({theme}) => ({
    '& .MuiCollapse-wrapper': {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    },
    '& .MuiCollapse-wrapperInner': {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }

}));

export default CollapsePanel