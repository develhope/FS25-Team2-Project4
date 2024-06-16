import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { useProfile } from "../../hooks/Form/useProfile"
import { CardSetting } from "./CardSetting"
import { LinkBox } from "./Linkbox"
import classes from "./Settings.module.scss"
import { useAuth } from "../../hooks/Auth/useAuth"

export function Settings() {
    const { animate } = useAnimate()
    const { editing, avatar, signupData, handleEditClick, handleSaveClick, handleAvatarChange, handleSignupInput,handleDiscardClick } = useProfile()
    const { logout } = useAuth()

    const passError = signupData.password !== signupData.confirmPass ? "Passwords do not match" : ""

    return (
        <div className={`${classes.settingsPage} ${animate && classes.animateSettings}`}>
            <CardSetting
                editing={editing}
                avatar={avatar}
                signupData={signupData}
                handleAvatarChange={handleAvatarChange}
                handleSignupInput={handleSignupInput}
                handleSaveClick={handleSaveClick}
                handleEditClick={handleEditClick}
                handleDiscardClick={handleDiscardClick}
                passError={passError}
            />
            {!editing && <LinkBox handleLogoutClick={logout} />}
        </div>
    )
}
