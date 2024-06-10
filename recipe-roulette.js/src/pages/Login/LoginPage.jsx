import { Login } from "../../components/authentication/login/Login"
import { useAnimate } from "../../hooks/animatePages/useAnimate"

import classes from "./LoginPage.module.scss"

export function LoginPage() {
    const { animate } = useAnimate()

    return (
        <section className={`${classes.pageBox} ${animate && classes.animateLoginPage}`}>
            <Login />
        </section>
    )
}
