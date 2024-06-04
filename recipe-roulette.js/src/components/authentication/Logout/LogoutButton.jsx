import { useNavigate } from "react-router";
import { useAuth } from "../../../hooks/Auth/useAuth";
import { Button } from "../../Buttons/Button/Button";
import LogoutIcon from '@mui/icons-material/Logout';

export function LogoutButton () {
    const { logout } = useAuth()
    const navigate = useNavigate()

    function handleLogout () {
        window.localStorage.removeItem(`username`)
        window.localStorage.removeItem(`password`)
        logout()
        navigate("./")
    }

    return (
        <Button action={handleLogout} label="Logout" icon={<LogoutIcon fontSize="small"/>} />
    )
}