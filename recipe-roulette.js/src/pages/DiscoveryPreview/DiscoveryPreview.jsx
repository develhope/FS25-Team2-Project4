import { Link } from "react-router-dom"
import { MaterialSymbol } from "react-material-symbols"
import classes from "./DiscoveryPreview.module.scss"

export function DiscoveryPreview() {
    return (
        <div className={classes.discoveryPreview}>
            <div className={classes.mainContent}>
                <img src="/src/assets/images/undraw_ideas_flow_re_bmea.svg" alt="My Happy SVG" />
                <h2>Reduce food wastes and get inspired by <span>RecipeRoulette!</span></h2>
                <Link className={classes.cta} to={"./discovery"}>
                    <MaterialSymbol icon="cycle" size={18} grade={18} weight={600} />
                    <p>Start Ingredients Shuffle</p>
                </Link>

                <Link className={classes.button} to={"./discovery"}>
                    <MaterialSymbol icon="volunteer_activism" size={18} grade={18} weight={600} />
                    <p>Support the Developers</p>
                </Link>
            </div>
        </div>
    )
}
