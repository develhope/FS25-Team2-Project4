import { Button } from "../../components/Buttons/Button/Button";

import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";

import classes from "./Settings.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../../hooks/Auth/useAuth";
import { PopupLogin } from "../../components/Pop-up/Popup"
import { Login } from "../../components/authentication/login/Login";

export function LinkBox({ handleLogoutClick }) {
  const [showPopup, setShowPopup] = useState();
  const { isAuthenticated } = useAuth();

  return (
    <>
      <div className={classes.menuSection}>
        <Link to="/food-preferences" className={classes.menuItem}>
          Food Preferences
          <NavigateNextOutlinedIcon fontSize="medium" />
        </Link>

        <Link to="/recipes-hisory" className={classes.menuItem}>
          Recipes History
          <NavigateNextOutlinedIcon fontSize="medium" />
        </Link>

        <Link to="/feedback-&-support" className={classes.menuItem}>
          Feedback & Support
          <NavigateNextOutlinedIcon fontSize="medium" />
        </Link>
      </div>
      <div className={classes.logoutButtonWrapper}>
        {isAuthenticated ? (
          <Button
            label="Logout"
            width="fill"
            action={handleLogoutClick}
            icon={<LogoutIcon fontSize="small" />}
            link="login"
          />
        ) : (
          <Button
            type="submit"
            style="primary"
            label="Login"
            width="fill"
            icon={<LoginIcon fontSize="small" />}
            action={(e) => {
              setShowPopup(true);
            }}
          />
        )}
      </div>
      {showPopup &&
        createPortal(
          <PopupLogin handleClosePopup={() => setShowPopup(false)}>
            <Login setShowPopup={setShowPopup} />
          </PopupLogin>,
          document.getElementById("popup-root")
        )}
    </>
  );
}
