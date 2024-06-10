import classes from "./Logo.module.scss"


export function Logo() {
  return (
    <div className={classes.logo}>
      <h1 className={classes.meriendaBold} >Welcome to <span className={classes.span}>RecipeRoulette</span></h1>
    </div>
  );
}
