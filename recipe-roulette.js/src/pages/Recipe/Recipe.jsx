import classes from "./Recipe.module.scss"

export function Recipe({ recipe }) {
    return <div className={classes.recipePage}>{recipe}</div>
}
