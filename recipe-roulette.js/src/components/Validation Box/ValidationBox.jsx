import { IcoButton } from "../Buttons/IcoButton/IcoButton";
import classes from "./ValidationBox.module.scss";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from "../Buttons/Button/Button";


export function ValidationBox ({message, setShowPopup = null, handleValidationAction}) {
    
    return (
        <div className={`${classes.container}`}>
            <header>
                {message}
            </header>
            <div className={classes.buttonsWrapper}>
                <Button label="Cancel" action={() => setShowPopup(false)}/>
                <Button label="Log out" action={() => {handleValidationAction(), setShowPopup(false)}}/>
            </div>
        </div>
    )
}