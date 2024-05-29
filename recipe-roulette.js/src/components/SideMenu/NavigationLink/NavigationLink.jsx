import { Link } from "react-router-dom"
import { MaterialSymbol } from "react-material-symbols"
import classes from "../SideMenu.module.scss"

export function NavigationLink({label, icon, destination, path, handleMenuToggle}) {
    return (
        <Link
            onClick={handleMenuToggle}
            className={`${classes.link} ${path === destination && classes.activeLink}`}
            to={destination}
        >
            <MaterialSymbol className={classes.ico} icon={icon} weight={500} size={24} grade={24} />
            {label}
        </Link>
    )
}
