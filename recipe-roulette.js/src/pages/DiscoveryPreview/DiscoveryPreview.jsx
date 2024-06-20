import { Link } from "react-router-dom"
import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { useLocationHook } from "../../hooks/useLocationHook"

import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined"
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined"
import classes from "./DiscoveryPreview.module.scss"

export function DiscoveryPreview() {
    const { location } = useLocationHook()
    const { animate } = useAnimate(location)

    return (
        <div className={`${classes.discoveryPreview} ${animate && classes.discoveryPreviewAnimate}`}>
            <div className={classes.mainContent}>
                <img src="../src/assets/images/undraw_ideas_flow_re_bmea.svg" alt="" />

                <h2>
                    Reduce food wastes and get inspired by <span>RecipeRoulette!</span>
                </h2>
                
                <div className={classes.bottomItems}>
                    <Link className={classes.cta} to={"./discovery"}>
                        <LoopOutlinedIcon />
                        <p>Start Ingredients Shuffle</p>
                    </Link>

                    <Link className={classes.button} to={"./discovery"}>
                        <VolunteerActivismOutlinedIcon />
                        <p>Support the Developers</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}
