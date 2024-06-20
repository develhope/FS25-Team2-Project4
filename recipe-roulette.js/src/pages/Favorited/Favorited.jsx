import RecipeCard from "../../components/RecipeCard/RecipeCard"
import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { useMemo, useState } from "react"
import { Link } from "react-router-dom"

import { useAuth } from "../../hooks/Auth/useAuth"
import { Popup } from "../../components/Pop-up/Popup"
import { createPortal } from "react-dom"
import { Login } from "../../components/authentication/login/Login"
import { useLocationHook } from "../../hooks/useLocationHook"

import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined"
import LoginIcon from "@mui/icons-material/Login"
import classes from "./Favorite.module.scss"

export function Favorited() {
    const { searchFilteredRecipes, filteredRecipes, recipes, inputValue } = useRecipesContext()
    const { isAuthenticated } = useAuth()
    const [showPopup, setShowPopup] = useState()

    const { location } = useLocationHook()
    const { animate } = useAnimate(location)

    const filterFavoritecipes = useMemo(() => {
        return searchFilteredRecipes.filter((recipe) => recipe.isFavorited)
    }, [inputValue, filteredRecipes, searchFilteredRecipes])

    const favoriteRecipes = useMemo(() => {
        return recipes.filter((recipe) => recipe.isFavorited)
    }, [recipes])

    return (
        <div className={`${classes.favoritePage} ${animate && classes.animateFavorite}`}>
            {isAuthenticated && favoriteRecipes.length > 0 ? (
                <>
                    {favoriteRecipes && filterFavoritecipes.length > 0 ? (
                        <section className={classes.recipesWrapper}>
                            {filterFavoritecipes.map((recipe) => {
                                return (
                                    <RecipeCard
                                        recipeId={recipe.id}
                                        key={recipe.id}
                                        title={recipe.title}
                                        image={recipe.image}
                                        attributes={recipe.attributes}
                                        isFav={recipe.isFavorited}
                                        preparation={recipe.preparation}
                                        ingredients={recipe.ingredients}
                                        isGlutenFree={recipe.isGlutenFree}
                                        isVegetarian={recipe.isVegetarian}
                                        isVegan={recipe.isVegan}
                                    />
                                )
                            })}
                        </section>
                    ) : (
                        <div className={`${classes.placeholder} ${classes.placeholderSearch}`}>
                            <h2>
                                There is <span>no recipe</span> <br />
                                matching your search!
                            </h2>
                            <div className={classes.placeholderImage}>
                                <img src="../src/assets/images/undraw_cancel_re_pkdm 1.svg" alt="" />
                            </div>
                        </div>
                    )}
                </>
            ) : isAuthenticated ? (
                <div className={classes.placeholder}>
                    <div className={classes.placeholderImage}>
                        <img src="../src/assets/images/undraw_add_files_re_v09.svg" alt="" />
                    </div>
                    <h2>
                        <span>Your Favorited list is empty!</span> <br />
                        Find and favorite your first recipe!
                    </h2>

                    <Link className={classes.cta} to={"/discovery"}>
                        <LoopOutlinedIcon />
                        <p>Start Ingredients Shuffle</p>
                    </Link>
                </div>
            ) : (
                <div className={classes.placeholder}>
                    <div className={classes.placeholderImage}>
                        <img src="../src/assets/images/undraw_access_account_re_8spm.svg" alt="" />
                    </div>
                    <h2>
                        <span>You need to login</span> <br />
                        To add or see your Favorited!
                    </h2>
                    {showPopup &&
                        createPortal(
                            <Popup handleClosePopup={() => setShowPopup(false)}>
                                <Login setShowPopup={setShowPopup} />
                            </Popup>,
                            document.getElementById("popup-root")
                        )}
                    <Link className={classes.cta} onClick={() => setShowPopup(true)}>
                        <LoginIcon fontSize="small" />
                        <p>Signup or Login</p>
                    </Link>
                </div>
            )}
        </div>
    )
}
