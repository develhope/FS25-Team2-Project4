import { MaterialSymbol } from "react-material-symbols"
import { NavigationLink } from "./NavigationLink/NavigationLink"

import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined"
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined"
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined"
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined"
import AutorenewIcon from '@mui/icons-material/Autorenew';

import classes from "./SideMenu.module.scss"

export function SideMenu({ handleMenuToggle, menuState = false, path = "/" }) {
    return (
        <div>
            <div
                onClick={handleMenuToggle}
                className={`${classes.backgroundOverlay} ${menuState && classes.backgroundOverlayToggled}`}
            ></div>
            <div className={`${classes.sidebar} ${menuState && classes.sidebarToggled}`}>
                <header>
                    <h4>Browse</h4>
                    <div onClick={handleMenuToggle} className={classes.closeIco}>

                    <MenuOpenOutlinedIcon />
                    </div>
                </header>
                <section className={classes.links}>
                    <NavigationLink
                        path={path}
                        handleMenuToggle={handleMenuToggle}
                        label="Roulette"
                        destination="/discovery"
                        icon={<AutorenewIcon fontSize="small" />}
                    />
                    <NavigationLink
                        path={path}
                        handleMenuToggle={handleMenuToggle}
                        label="Favorited"
                        destination="/favorited"
                        icon={<BookmarksOutlinedIcon fontSize="small" />}
                    />
                    <NavigationLink
                        path={path}
                        handleMenuToggle={handleMenuToggle}
                        label="Settings"
                        destination="/settings"
                        icon={<SettingsOutlinedIcon fontSize="small" />}
                    />
                    <NavigationLink
                        path={path}
                        handleMenuToggle={handleMenuToggle}
                        label="Login"
                        destination="/login"
                        icon={<LoginOutlinedIcon fontSize="small" />}
                    />
                    <NavigationLink
                        path={path}
                        handleMenuToggle={handleMenuToggle}
                        label="Sign up"
                        destination="/signup"
                        icon={<AppRegistrationOutlinedIcon fontSize="small" />}
                    />
                    <NavigationLink
                        path={path}
                        handleMenuToggle={handleMenuToggle}
                        label="Results"
                        destination="/recipes-results"
                        icon={<MenuBookOutlinedIcon fontSize="small" />}
                    />
                </section>
            </div>
        </div>
    )
}
