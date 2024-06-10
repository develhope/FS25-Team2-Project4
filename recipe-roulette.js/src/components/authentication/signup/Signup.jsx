import classes from "./Signup.module.scss"
import { useSignup } from "../../../hooks/Form/useSignup"
import { Button } from "../../Buttons/Button/Button"

import EditNoteIcon from "@mui/icons-material/EditNote"
import StartIcon from "@mui/icons-material/Start"
import { useInput } from "../../../hooks/useInput"

export function Signup() {
    const { data, passError, handleInput, handleSubmit } = useSignup()
    const { inputState, handleBlur, handleInputActivation } = useInput()
    
    return (
        <div className={`${classes.container} ${inputState && classes.active}`}>
            <header className={classes.title}>
                <h1>Signup</h1>
            </header>

            <form onSubmit={handleSubmit} className={classes.formBox}>
                <div className={classes.inputBox}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={data.username}
                        onChange={handleInput}
                        onFocus={(e)=>handleInputActivation(e)}
                        onBlur={(e) => handleBlur(e)}
                        placeholder="Insert your username"
                        required
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={data.email}
                        onChange={handleInput}
                        onFocus={(e)=>handleInputActivation(e)}
                        onBlur={(e) => handleBlur(e)}
                        placeholder="Insert your email"
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={data.password}
                        onChange={handleInput}
                        onFocus={(e)=>handleInputActivation(e)}
                        onBlur={(e) => handleBlur(e)}
                        placeholder="Insert password"
                        required
                    />
                    <label htmlFor="confirmPass">Confirm password</label>
                    <input
                        type="password"
                        name="confirmPass"
                        id="confirmPass"
                        value={data.confirmPass}
                        onChange={handleInput}
                        onFocus={(e)=>handleInputActivation(e)}
                        onBlur={(e) => handleBlur(e)}
                        placeholder="Repeat password"
                        required
                    />
                    {passError && <p>{passError}</p>}

                    <label htmlFor="check" className={classes.checkLabel}>
                        I Agree with<span>Terms & Conditions</span>
                        <input type="checkbox" name="check" id="check" checked={data.check} onChange={handleInput} required />
                    </label>
                </div>

                <div className={classes.buttonsWrapper}>
                    <Button
                        style="primary"
                        width="fill"
                        type="submit"
                        label="Sign up"
                        icon={<EditNoteIcon fontSize="small" />}
                        active={data.username && data.password && data.confirmPass && data.email && data.check}
                        link={" "}
                    />
                    <Button label="Skip" icon={<StartIcon fontSize="small" />} link={" "} />
                </div>
            </form>
        </div>
    )
}
