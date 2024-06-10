import classes from "./Settings.module.scss";

export function LinkBox({ handleLogoutClick }) {
    return (
        <>
            <div className={classes.menuSection}>
                <button className={classes.menuItem}>Food Preferences</button>
                <button className={classes.menuItem}>Recipes History</button>
                <button className={classes.menuItem}>Feedback & Support</button>
            </div>
            <div className={classes.logoutButtonWrapper}>
                <button className={classes.logoutButton} onClick={handleLogoutClick}>Logout</button>
            </div>
        </>
    );
}