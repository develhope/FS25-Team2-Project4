import { MaterialSymbol } from "react-material-symbols"
import { NavigationLink } from "./NavigationLink/NavigationLink"

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
                    <NavigationLink path={path} handleMenuToggle={handleMenuToggle} label="Discovery" destination="/discovery" icon="explore" />
                    <NavigationLink path={path} handleMenuToggle={handleMenuToggle} label="Favorited" destination="/favorited" icon="bookmarks" />
                    <NavigationLink path={path} handleMenuToggle={handleMenuToggle} label="Settings" destination="/settings" icon="settings" />
                </section>
            </div>
        </div>
    )
}
