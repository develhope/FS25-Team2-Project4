import { MaterialSymbol } from "react-material-symbols"
import { Link } from "react-router-dom"

import classes from "./SideMenu.module.scss"
import Discovery from "../../pages/Discovery/Discovery"
import Favorited from "../../pages/Favorited/Favorited"
import { Settings } from "../../pages/Settings/Settings"

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
                    <Link className={`${classes.link} ${path === "/" && classes.activeLink}`} to="/">
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
                </section>
            </div>
        </div>
    )
}
