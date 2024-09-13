import {Box, IconButton, InputAdornment, Typography, useTheme} from "@mui/material";
import React, {useState} from "react";
import TextField from "../../theme/styled/TextField";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import SaveButton from "../../shared/SaveButton";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import useShowPassword from "../../hooks/useShowPassword"
import {server} from "../../../config/axios.js";
import {useNavigate} from "react-router-dom";
import {getErrorMessage} from "../../../config/error.js";
import {useSnackbar} from "notistack";
import {useDispatch} from "react-redux";
import {setUser} from "../../../store/slices/auth/userSlice.js";

const Registration = ({login, setLogin}) => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const {
        showPassword, handleShowPassword,
    } = useShowPassword()

    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const registration = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const response = await server.post("user/registration", {
                user_name: name, password, login
            })
            console.log(response)
            dispatch(setUser(response.data))
            navigate("/")
        } catch (e) {
            enqueueSnackbar(getErrorMessage(e), {variant: "error"})
        } finally {
            setIsLoading(false)
            enqueueSnackbar("Аккаунт успешно зарегистрирован", {variant: "success"})
        }
    }

    const disabled = repeatPassword !== password || !name || !password || !repeatPassword || !login
    return (
        <form className="form" onSubmit={registration}>
            <Box className="form__container">
                <TextField label="Имя" onChange={(e) => setName(e.target.value)} value={name}
                           placeholder="Введите имя"
                           variant="outlined"
                           size="small"
                />
                <TextField label="Придумайте пароль" onChange={(e) => setPassword(e.target.value)} value={password}
                           placeholder="Введите пароль"
                           variant="outlined"
                           size="small"
                           type={showPassword ? 'text' : 'password'}
                           InputProps={{
                               endAdornment: <InputAdornment position="end">
                                   <IconButton
                                       onClick={handleShowPassword}
                                       edge="end">
                                       {showPassword ? <VisibilityOff color="primary"/> :
                                           <Visibility color="primary"/>}
                                   </IconButton>
                               </InputAdornment>
                           }}
                />
                <TextField label="Повторите пароль" onChange={(e) => setRepeatPassword(e.target.value)}
                           value={repeatPassword}
                           placeholder="Введите пароль"
                           variant="outlined"
                           size="small"
                           type={showPassword ? 'text' : 'password'}
                />
                <Box display="flex" gap="10px">
                    <TextField label="Логин" onChange={(e) => setLogin(e.target.value)}
                               placeholder="Введите логин"
                               value={login}
                               fullWidth
                               variant="outlined"
                               size="small"
                    />
                    <SaveButton onClick={registration} fullWidth={false} disabled={disabled}
                                isLoading={isLoading}
                                value={<ArrowForwardIosRoundedIcon/>}/>
                </Box>
            </Box>
        </form>
    )
}


export default Registration
