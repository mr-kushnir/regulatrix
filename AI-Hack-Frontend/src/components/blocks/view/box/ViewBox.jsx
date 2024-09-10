import {Button, Typography} from "@mui/material";

const ViewBox = ({title}) => {

    return (
        <Button className="view__box">
            <Typography>{title}</Typography>
        </Button>

    )
}


export default ViewBox