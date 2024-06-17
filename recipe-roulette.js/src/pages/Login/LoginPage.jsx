import { Login } from "../../components/authentication/login/Login"
import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { useLocationHook } from "../../hooks/useLocationHook"

import classes from "./LoginPage.module.scss"

export function LoginPage() {
    const {location } = useLocationHook()
    const { animate } = useAnimate(location)

    return (
        <section className={`${classes.pageBox} ${animate && classes.animateLoginPage}`}>
            <Login prevLocation={location.pathname} />
        </section>
    )
}
