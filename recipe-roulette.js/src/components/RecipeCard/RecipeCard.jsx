import { Link } from "react-router-dom"
import { useFavorite } from "./useFavorite"
import { MaterialSymbol } from "react-material-symbols"

import classes from "./RecipeCard.module.scss"
import { FilterChip } from "../FilterChip/FilterChip"

const defaultImg =
    "https://img.freepik.com/free-photo/delicious-mahi-mahi-fish-still-life_23-2150457331.jpg?t=st=1715248356~exp=1715251956~hmac=45d0d10ecc8eb065b7fad68bd57cf951a4e48e4c58c74a1d49bf2783b0d2e9cd&w=740"
const defaultTitle = "Card Title"

function RecipeCard({ title = defaultTitle, image = defaultImg, chips, isFav = false }) {
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
                <img src={image} alt="" />
            </div>

            {/* bottomItems */}
            <div className={classes.bottomItems}>
                <section className={classes.chipsWrapper}>
                    {chips && chips.map((chip, index) => <FilterChip key={index} label={chip} />)}
                </section>
                <p className={classes.title}>{title}</p>
            </div>
        </Link>
    )
}

export default RecipeCard
