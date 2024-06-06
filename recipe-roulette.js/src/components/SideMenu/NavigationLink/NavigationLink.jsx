import { Link } from "react-router-dom"
import classes from "../SideMenu.module.scss"

export function NavigationLink({ label, icon, destination, path, handleMenuToggle, action }) {
    return (
        <Link
            onClick={()=>{
                handleMenuToggle()
                action && action()
            }}
            className={`${classes.link} ${path === destination && classes.activeLink}`}
            to={destination}
        >   
            {icon}
            {label}
        </Link>
    )
}
