import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { useProfile } from "../../hooks/Form/useProfile"
import { CardSetting } from "./CardSetting"
import { LinkBox } from "./Linkbox"
import { useAuth } from "../../hooks/Auth/useAuth"
import { useLocationHook } from "../../hooks/useLocationHook"

import classes from "./Settings.module.scss"

export function Settings() {
    const { editing, avatar, signupData, handleEditClick, handleSaveClick, handleAvatarChange, handleSignupInput,handleDiscardClick } = useProfile()
    const { logout } = useAuth()
    
    const {location } = useLocationHook()
    const { animate } = useAnimate(location)

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
