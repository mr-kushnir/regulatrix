import {Box, IconButton, InputAdornment, useTheme,} from "@mui/material";
import React from "react";
import TextField from "../../theme/styled/TextField.js";
import SaveButton from "../../shared/SaveButton.jsx";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useShowPassword from "../../hooks/useShowPassword"
import useAuthorization from "./useAuthorization.js";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const Login = ({login, setLogin, setIsExisting}) => {
    const {
        authorize, checkUser, setPassword, password, check, isLoading
    } = useAuthorization(login, setIsExisting)
    const {
        showPassword, handleShowPassword,
    } = useShowPassword()


    return (
        <form className="form" onSubmit={check ? authorize : checkUser}>
            <Box display="flex" width='50%' flexDirection="column" gap='10px'>
                {check ? <>
                    <TextField label="Пароль" onChange={(e) => setPassword(e.target.value)} value={password}
                               placeholder="Введите пароль"
                               variant="outlined"
                               fullWidth
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
                    <SaveButton onClick={authorize} type="submit" isLoading={isLoading}
                                value="Войти"/>
                </> : <TextField label='Логин' onChange={(e) => setLogin(e.target.value)} value={login}
                                 fullWidth
                                 placeholder="Введите логин" variant="outlined" size="small"/>}
            </Box>
            {!check &&
                <SaveButton onClick={checkUser} type="submit" fullWidth={false} disabled={!login}
                            isLoading={isLoading}
                            value={<ArrowForwardIosRoundedIcon/>}/>}
        </form>
    )
}

export default Login