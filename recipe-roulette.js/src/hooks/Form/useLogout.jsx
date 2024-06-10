import { useNavigate } from 'react-router-dom';

export function useLogout() {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.removeItem("avatar");
        navigate('/login');
    };

    return {
        handleLogoutClick,
    };
}