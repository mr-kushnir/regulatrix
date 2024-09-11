import {Box, InputAdornment} from "@mui/material";
import StyledTextField from "../../../theme/styled/TextField";
import {useState} from "react";
import LoadingProgress from "../../LoadingProgress.jsx";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ChatService from "../../../../services/chat/ChatService.js";
import {useDispatch} from "react-redux";
import {setChats} from "../../../../store/slices/chat/chatSlice.js";

const FindInput = ({user}) => {

    const [searchText, setSearchText] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const setSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            dispatch(setChats(await ChatService.getChats(user.id, searchText)))
        } catch (e) {

        } finally {
            setIsLoading(false)
        }
    }

    return (

        <Box pb='10px'>
            <form onSubmit={setSubmit}>
                <StyledTextField value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Поиск"
                                 fullWidth
                                 size='small'
                                 InputProps={{
                                     startAdornment: (<InputAdornment position="start">
                                         <LoadingProgress isLoading={isLoading}
                                                          value={<SearchIcon color='primary'/>}/>
                                     </InputAdornment>),
                                     endAdornment: (searchText && <InputAdornment position="end">
                                         <ClearIcon cursor="pointer" onClick={() => setSearchText("")} color="primary"/>
                                     </InputAdornment>)
                                 }}
                />
            </form>
        </Box>


    )
}


export default FindInput