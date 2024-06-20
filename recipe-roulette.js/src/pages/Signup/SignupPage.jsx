import classes from "./SignupPage.module.scss"
import { Signup } from "../../components/authentication/signup/Signup"
import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { useLocationHook } from "../../hooks/useLocationHook"

export function SignupPage() {
    const { location } = useLocationHook()
    const { animate } = useAnimate(location)
    return (
        <section className={`${classes.pageBox} ${animate && classes.animateSignupPage}`}>
            <h2>
                Welcome to <span>RecipeRoulette!</span>
            </h2>
            <Signup />
        </section>
    )
}
