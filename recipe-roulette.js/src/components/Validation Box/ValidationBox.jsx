import classes from "./ValidationBox.module.scss";
import { Button } from "../Buttons/Button/Button";


export function ValidationBox ({message, setShowPopup = null, handleValidationAction}) {
    
    return (
        <div className={`${classes.container}`}>
            <header>
                {message}
            </header>
            <div className={classes.buttonsWrapper}>
                <Button label="Cancel" action={() => setShowPopup(false)} style="transparent"/>
                <Button label="Log out" action={() => {handleValidationAction(), setShowPopup(false)}} style="primary"/>
            </div>
        </div>
    )
}