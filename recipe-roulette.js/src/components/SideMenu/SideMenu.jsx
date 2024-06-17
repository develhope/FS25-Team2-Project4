import { NavigationLink } from "./NavigationLink/NavigationLink"

import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined"
import BookmarksIcon from "@mui/icons-material/Bookmarks"

import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import SettingsIcon from "@mui/icons-material/Settings"

import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined"
import AutorenewIcon from "@mui/icons-material/Autorenew"
import LogoutIcon from "@mui/icons-material/Logout"
import CloseIcon from "@mui/icons-material/Close"

import { useAuth } from "../../hooks/Auth/useAuth"

import classes from "./SideMenu.module.scss"
import { useLocation } from "react-router-dom"

export function SideMenu({ handleMenuToggle, menuState = false, path = "/" }) {
    const { logout, isAuthenticated } = useAuth()
    const location = useLocation()
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
                        <CloseIcon fontSize="small" />
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
                        icon={
                            location.pathname === "/favorited" ? (
                                <BookmarksIcon fontSize="small" />
                            ) : (
                                <BookmarksOutlinedIcon fontSize="small" />
                            )
                        }
                    />
                    <NavigationLink
                        path={path}
                        handleMenuToggle={handleMenuToggle}
                        label="Settings"
                        destination="/settings"
                        icon={
                            location.pathname === "/settings" ? (
                                <SettingsIcon fontSize="small" />
                            ) : (
                                <SettingsOutlinedIcon fontSize="small" />
                            )
                        }
                    />
                    <div className={classes.separator} />
                    {isAuthenticated ? (
                        <NavigationLink
                            path={path}
                            handleMenuToggle={handleMenuToggle}
                            label="Logout"
                            icon={<LogoutIcon fontSize="small" />}
                            action={logout}
                        />
                    ) : (
                        <NavigationLink
                            path={path}
                            handleMenuToggle={handleMenuToggle}
                            label="Login"
                            destination="/login"
                            icon={<LoginOutlinedIcon fontSize="small" />}
                        />
                    )}
                </section>
            </div>
        </div>
    )
}
