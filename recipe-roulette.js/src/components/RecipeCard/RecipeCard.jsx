import { Link } from "react-router-dom"
import { useFavorite } from "./useFavorite"
import { MaterialSymbol } from "react-material-symbols"
import { FilterChip } from "../FilterChip/FilterChip"
/* import Skeleton from "@mui/material/Skeleton" */

import classes from "./RecipeCard.module.scss"

const defaultTitle = "Card Title"

function RecipeCard({ title = defaultTitle, /* image = null, */ chips, isFav = false }) {
    const { handleFavState, favState } = useFavorite(isFav)

    return (
        <Link to="recipeName" className={classes.recipeCard}>
            {/* topItems */}
            <div className={classes.topItems}>
                <div
                    onClick={(e) => handleFavState(e)}
                    className={`${classes.favIcon} ${favState ? classes.isFav : classes.notFav}`}
                >
                    {classes.favIcon && <MaterialSymbol icon="favorite" fill size={24} grade={24} />}
                </div>
                {/* da implementare la logica per capire se il caricamento dell'immagine è finito */}
{/*                 {false ? (
                    <Skeleton sx={{ bgcolor: "#C5E4C9" }} variant="rectangular" height={"100%"} />
                ) : (
                    <img src={image} alt="" />
                )} */}
            </div>

            {/* bottomItems */}
            <div className={classes.bottomItems}>
                <section className={classes.chipsWrapper}>
                    {chips && chips.length > 0 && chips.map((chip, index) => <FilterChip key={index} label={chip} />)}
                </section>
                <p className={classes.title}>{title}</p>
            </div>
        </Link>
    )
}

export default RecipeCard
