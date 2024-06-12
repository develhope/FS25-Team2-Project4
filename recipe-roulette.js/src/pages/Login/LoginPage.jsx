import { useLocation } from "react-router-dom"
import { Login } from "../../components/authentication/login/Login"
import { useAnimate } from "../../hooks/animatePages/useAnimate"

import classes from "./LoginPage.module.scss"

export function LoginPage() {
    const { animate } = useAnimate()
    const location = useLocation()

    return (
        <section className={`${classes.pageBox} ${animate && classes.animateLoginPage}`}>
            <Login prevLocation={location.pathname} />
        </section>
    )
}
