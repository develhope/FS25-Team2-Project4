import classes from "./SignupPage.module.scss"
import { Signup } from "../../components/authentication/signup/Signup"

export function SignupPage () {
    return (
        <section className={classes.pageBox}>
            <Signup/>
        </section>
    )
}