import {Box, Typography, useTheme} from "@mui/material";
import React, {useState} from "react";
import Login from "../auth/Login"
import Registration from "../auth/Registration"

const Auth = () => {
    const [login, setLogin] = useState("")
    const [isExisting, setIsExisting] = useState(null)

    const exist = isExisting === true || isExisting === null
    const theme = useTheme()
    return (
        <Box display="flex" height="100vh" width="100vw">
            <Box width="50%" overflow="hidden">
                <img className='img' src="startPage.jpg" alt="Изображение"/>
            </Box>
            <Box bgcolor={theme.palette.primary.middleGray} width="50%" flexGrow={1} display="flex"
                 flexDirection='column'
                 alignItems="center"
                 justifyContent="center" p="40px" boxShadow="inset 18px 5px 10px -5px rgba(0, 0, 0, 0.5)">
                <Box width='100%' display="flex" gap="10px" mb="20px">
                    <Typography fontWeight={300} variant="h5"
                                color={theme.palette.primary.typography}>{exist ? "Войти в" : "Зарегистрироваться в"}</Typography>
                    <Typography fontWeight={600} variant="h5" color={theme.palette.primary.typography}>
                        Regulatrix</Typography>
                </Box>
                {exist &&
                    <Box display="flex" alignItems="flex-start" width="100%" mb='15px'>
                        <Typography color={theme.palette.primary.gray}>
                            {isExisting ? "Введите пароль от Вашей учетной записи" : "Если у вас нет учетной записи, мы ее создадим"}
                        </Typography>
                    </Box>
                }
                <Box width='100%' display="flex" gap="20px">
                    {isExisting === false ?
                        <Registration login={login} setLogin={setLogin}/> :
                        <Login login={login} setLogin={setLogin} setIsExisting={setIsExisting}/>
                    }
                </Box>
            </Box>
        </Box>

    )
}

export default Auth