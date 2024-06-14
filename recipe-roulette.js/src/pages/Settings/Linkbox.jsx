import { Button } from "../../components/Buttons/Button/Button"

import LogoutIcon from "@mui/icons-material/Logout"
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined"

import classes from "./Settings.module.scss"
import { Link } from "react-router-dom"

export function LinkBox({ handleLogoutClick }) {
    return (
        <>
            <div className={classes.menuSection}>
                <Link to="/food-preferences" className={classes.menuItem}>
                    Food Preferences
                    <NavigateNextOutlinedIcon fontSize="medium" />
                </Link>

                <Link to="/recipes-hisory" className={classes.menuItem}>
                    Recipes History
                    <NavigateNextOutlinedIcon fontSize="medium" />
                </Link>

                <Link to="/feedback-&-support" className={classes.menuItem}>
                    Feedback & Support
                    <NavigateNextOutlinedIcon fontSize="medium" />
                </Link>
            </div>
            <div className={classes.logoutButtonWrapper}>
                <Button label="Logout" width="fill" action={handleLogoutClick} icon={<LogoutIcon fontSize="small" />} link="login" />
            </div>
        </>
    )
}
