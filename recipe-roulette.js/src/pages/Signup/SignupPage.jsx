import classes from "./SignupPage.module.scss"
import { Signup } from "../../components/authentication/signup/Signup"
import { useAnimate } from "../../hooks/animatePages/useAnimate"

export function SignupPage() {
    const { animate } = useAnimate()
    return (
        <section className={`${classes.pageBox} ${animate && classes.animateSignupPage}`}>
            <Signup />
        </section>
    )
}
