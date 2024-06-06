import classes from "./Login.module.scss"
import { Link } from "react-router-dom"
import { useLogin } from "../../../hooks/Form/useLogin"
import { GoogleLoginBtn } from "../../SocialLoginButtons/GoogleLoginBtn"
import { FacebookSocialBtn } from "../../SocialLoginButtons/FacebookLoginBtn"
import { Button } from "../../Buttons/Button/Button"

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import VisibilityIcon from "@mui/icons-material/Visibility"
import LoginIcon from "@mui/icons-material/Login"
import StartIcon from "@mui/icons-material/Start"

export function Login() {
    const { data, showPassword, handleInput, handleSubmit, handleShowPassword } = useLogin()

    return (
        <section className={classes.pageBox}>
            <div className={classes.container}>
                <header className={classes.title}>
                    <h1>Login</h1>
                </header>

                <form onSubmit={handleSubmit} className={classes.formBox}>
                    <div className={classes.inputBox}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={data.username}
                            placeholder="Insert username here"
                            onChange={handleInput}
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <div className={classes.passInput}>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                value={data.password}
                                placeholder="Insert password here"
                                onChange={handleInput}
                                required
                            />
                            {showPassword ? (
                                <div onClick={handleShowPassword} className={classes.passwordIcon}>
                                    {" "}
                                    <VisibilityOffIcon fontSize="small" />
                                </div>
                            ) : (
                                <div onClick={handleShowPassword} className={classes.passwordIcon}>
                                    {" "}
                                    <VisibilityIcon fontSize="small" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={classes.buttonsWrapper}>
                        <Button
                            style="primary"
                            type="submit"
                            label="Login"
                            icon={<LoginIcon fontSize="small" />}
                            active={!data.username || data.password}
                        />
                        <Button label="Skip" icon={<StartIcon fontSize="small" />} link={" "} />

                    </div>

                    <p>
                        Not registered yet?{" "}
                        <span>
                            <Link to="/signup">Sign Up</Link>
                        </span>
                    </p>
                </form>

                <div className={classes.loginBtnBox}>
                    <GoogleLoginBtn />
                    <FacebookSocialBtn />
                </div>
            </div>
        </section>
    )
}
