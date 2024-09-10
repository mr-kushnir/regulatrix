import {useState} from "react";

const useShowPassword = () => {
    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassword = () => setShowPassword((show) => !show);

    return {
        showPassword, handleShowPassword,
    }
}

export default useShowPassword