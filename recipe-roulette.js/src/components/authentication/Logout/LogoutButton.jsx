import { useAuth } from "../../../hooks/Auth/useAuth";

export function LogoutButton () {
    const { logout } = useAuth

    function handleLogout () {
        window.localStorage.removeItem(`username`)
        window.localStorage.removeItem(`password`)
        logout()
    }

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    )
}