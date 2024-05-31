import { Link } from "react-router-dom"
import { useFavorite } from "./useFavorite"
import { MaterialSymbol } from "react-material-symbols"

import FavoriteIcon from "@mui/icons-material/Favorite"

import { FilterChip } from "../FilterChip/FilterChip"
import Skeleton from "@mui/material/Skeleton"

import classes from "./RecipeCard.module.scss"

const defaultTitle = "Card Title"

function RecipeCard({ title = defaultTitle, image = null, attributes, isFav = false }) {
    const { handleFavState, favState } = useFavorite(isFav)

    return (
        <Link to="" className={classes.recipeCard}>
            {/* topItems */}
            <div className={classes.topItems}>
                <div onClick={(e) => handleFavState(e)} className={`${classes.favIcon} ${!favState ? classes.notFav : classes.isFav }`}>
                    <FavoriteIcon />
                </div>
                {/* da implementare la logica per capire se il caricamento dell'immagine è finito */}
                {false ? (
                    <Skeleton sx={{ bgcolor: "#C5E4C9" }} variant="rectangular" height={"100%"} />
                ) : (
                    <img src={image} alt="" />
                )}
            </div>

            {/* bottomItems */}
            <div className={classes.bottomItems}>
                <section className={classes.chipsWrapper}>
                    {attributes &&
                        attributes.length > 0 &&
                        attributes.map((chip, index) => <FilterChip key={index} label={chip} />)}
                </section>
                <p className={classes.title}>{title}</p>
            </div>
        </Link>
    )
}

export default RecipeCard
