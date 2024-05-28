import { MaterialSymbol } from "react-material-symbols"
import { Link } from "react-router-dom"

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
                    <MaterialSymbol
                        onClick={handleMenuToggle}
                        className={classes.closeIco}
                        icon="menu_open"
                        size={24}
                        grade={24}
                    />
                </header>
                <section className={classes.links}>
                    <Link className={`${classes.link} ${path === "/discovery" && classes.activeLink}`} to="/discovery">
                        <MaterialSymbol className={classes.ico} icon="explore" weight={500} size={24} grade={24} />
                        Discovery
                    </Link>
                    <Link className={`${classes.link} ${path === "/favorited" && classes.activeLink}`} to="/favorited">
                        <MaterialSymbol className={classes.ico} icon="bookmarks" weight={500} size={24} grade={24} />
                        Favorited
                    </Link>
                    <Link className={`${classes.link} ${path === "/settings" && classes.activeLink}`} to="/settings">
                        <MaterialSymbol className={classes.ico} icon="settings" weight={500} size={24} grade={24} />
                        Settings
                    </Link>
                    <Link className={`${classes.link} ${path === "/login" && classes.activeLink}`} to="/login">
                        <MaterialSymbol className={classes.ico} icon="login" weight={500} size={24} grade={24} />
                        Login
                    </Link>
                    <Link className={`${classes.link} ${path === "/signup" && classes.activeLink}`} to="/signup">
                        <MaterialSymbol className={classes.ico} icon="app_registration" weight={500} size={24} grade={24} />
                        Sign up
                    </Link>
                    <Link className={`${classes.link} ${path === "/recipes-results" && classes.activeLink}`} to="/recipes-results">
                        <MaterialSymbol className={classes.ico} icon="menu_book" weight={500} size={24} grade={24} />
                        Results
                    </Link>
                </section>
            </div>
        </div>
    )
}
