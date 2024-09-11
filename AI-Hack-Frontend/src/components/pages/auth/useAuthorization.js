import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {server} from "../../../config/axios.js";
import {useSnackbar} from "notistack";
import {getErrorMessage} from "../../../config/error.js";
import {setUser} from "../../../store/slices/auth/userSlice.js";
import {useDispatch} from "react-redux";

const useAuthorization = (login, setIsExisting) => {
    const {enqueueSnackbar} = useSnackbar();
    const [isLoading, setIsLoading] = useState(false)
    const [password, setPassword] = useState("")
    const [check, setIsCheck] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const checkUser = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const response = await server.get(`/user/${login}`)
            setIsExisting(true)
        } catch (e) {
            setIsExisting(false)
        } finally {
            setIsLoading(false)
            setIsCheck(true)
        }
    }
    const authorize = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const response = await server.post(`/user/authorize`, {
                login, password
            })
            navigate("/")
            dispatch(setUser(response.data))
        } catch (e) {
            enqueueSnackbar(getErrorMessage(e), {variant: "error"})
        } finally {
            setIsLoading(false)
            setIsCheck(true)
        }
    }
    return {authorize, checkUser, setPassword, password, check, isLoading}
}

export default useAuthorization