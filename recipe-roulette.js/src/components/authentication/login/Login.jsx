import { Link, useLocation } from "react-router-dom"
import { useLogin } from "../../../hooks/Form/useLogin"
import { GoogleLoginBtn } from "../../SocialLoginButtons/GoogleLoginBtn"
import { FacebookSocialBtn } from "../../SocialLoginButtons/FacebookLoginBtn"
import { Button } from "../../Buttons/Button/Button"
import { useInput } from "../../../hooks/useInput"

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import VisibilityIcon from "@mui/icons-material/Visibility"
import LoginIcon from "@mui/icons-material/Login"
import StartIcon from "@mui/icons-material/Start"

import classes from "./Login.module.scss"

export function Login({ setShowPopup = null }) {
    const { data, showPassword, handleInput, handleSubmit, handleShowPassword } = useLogin()
    const { inputState, handleBlur, handleInputActivation } = useInput()
    const location = useLocation()

    return (
        <div className={`${classes.container} ${inputState && classes.active}`}>
            <header className={classes.title}>
                <h1>Login</h1>
            </header>

            <form
                onSubmit={(e) => {
                    handleSubmit(e)
                    setShowPopup && setShowPopup(false)
                }}
                className={classes.formBox}
            >
                <div className={classes.inputBox}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={data.username}
                        placeholder="Insert username here"
                        onChange={handleInput}
                        onFocus={handleInputActivation}
                        onBlur={(e) => handleBlur(e)}
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
                            onFocus={handleInputActivation}
                            onBlur={(e) => handleBlur(e)}
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
                        prevPath={location.pathname}
                        icon={<LoginIcon fontSize="small" />}
                        active={data.username && data.password}
                    />
                    <Button
                        action={() => setShowPopup && setShowPopup(false)}
                        prevPath={location.pathname}
                        label="Skip"
                        icon={<StartIcon fontSize="small" />}
                    />
                </div>

                <div className={classes.message}>
                    <p>Don't you have an account yet?</p>
                    <span className={classes.signup}>
                        <Button link="signup" label="Sign Up" />
                    </span>
                </div>
            </form>

            <div className={classes.loginBtnBox}>
                <GoogleLoginBtn />
                <FacebookSocialBtn />
            </div>
        </div>
    )
}
