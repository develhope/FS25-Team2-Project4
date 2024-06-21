import { Login } from "../../components/authentication/login/Login"
import { Signup } from "../../components/authentication/signup/Signup"
import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { useLocationHook } from "../../hooks/useLocationHook"

import classes from "./LoginPage.module.scss"
import { useLoginToSignup } from "../../hooks/loginToSignup/useLoginToSignup"

export function LoginPage() {
    const { location } = useLocationHook()
    const { animate } = useAnimate(location)
    const {changeToSignup, setChangeToSignup} = useLoginToSignup()

    return (
        <section className={`${classes.pageBox} ${animate && classes.animateLoginPage}`}>
            <h2>
                Welcome back to <br /> <span>RecipeRoulette!</span>
            </h2>
            {!changeToSignup ? <Login setChangeToSignup={setChangeToSignup} /> : <Signup setChangeToSignup={setChangeToSignup} />}
        </section>
    )
}
