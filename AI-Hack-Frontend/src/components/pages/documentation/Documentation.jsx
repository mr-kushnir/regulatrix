import {Box} from "@mui/material";
import UploadPanel from "../../shared/view/uploadPanel/UploadPanels.jsx";
import clsx from "clsx";

const Documentation = ({isSidebarOpen}) => {


    return (
        <Box className={clsx({
            view: true, "view-disabled": !isSidebarOpen,
        })}>
            <UploadPanel/>
        </Box>
    )
}

export default Documentation