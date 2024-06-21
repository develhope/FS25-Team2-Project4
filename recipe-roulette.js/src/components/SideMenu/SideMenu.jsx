import { NavigationLink } from "./NavigationLink/NavigationLink";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import LogoutIcon from "@mui/icons-material/Logout";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import { useAuth } from "../../hooks/Auth/useAuth";
import classes from "./SideMenu.module.scss";
import { createPortal } from "react-dom";
import { Popup } from "../Pop-up/Popup";
import { useState } from "react";
import { ValidationBox } from "../Validation Box/ValidationBox";

export function SideMenu({ handleMenuToggle, menuState = false, path = "/" }) {
  const { logout, isAuthenticated } = useAuth();
  const [showPopup, setShowPopup] = useState();

  return (
    <div>
      <div
        onClick={handleMenuToggle}
        className={`${classes.backgroundOverlay} ${
          menuState && classes.backgroundOverlayToggled
        }`}
      ></div>
      <div
        className={`${classes.sidebar} ${menuState && classes.sidebarToggled}`}
      >
        <header>
          <h4>Browse</h4>
          <div onClick={handleMenuToggle} className={classes.closeIco}>
            <MenuOpenOutlinedIcon />
          </div>
        </header>
        <section className={classes.links}>
          <NavigationLink
            path={path}
            handleMenuToggle={handleMenuToggle}
            label="Roulette"
            destination="/discovery"
            icon={<AutorenewIcon fontSize="small" />}
          />
          <NavigationLink
            path={path}
            handleMenuToggle={handleMenuToggle}
            label="Favorited"
            destination="/favorited"
            icon={<BookmarksOutlinedIcon fontSize="small" />}
          />
          <NavigationLink
            path={path}
            handleMenuToggle={handleMenuToggle}
            label="Settings"
            destination="/settings"
            icon={<SettingsOutlinedIcon fontSize="small" />}
          />
          {/*           <NavigationLink
            path={path}
            handleMenuToggle={handleMenuToggle}
            label="Preferences"
            destination="/preferences"
            icon={<ClassOutlinedIcon fontSize="small" />}
          /> */}
          <div className={classes.separator} />
          {isAuthenticated ? (
            <NavigationLink
              path={path}
              handleMenuToggle={handleMenuToggle}
              label={"Logout"}
              icon={<LogoutIcon fontSize="small" />}
              action={() => setShowPopup(true)}
            />
          ) : (
            <NavigationLink
              path={path}
              handleMenuToggle={handleMenuToggle}
              label="Login"
              destination="/login"
              icon={<LoginOutlinedIcon fontSize="small" />}
            />
          )}
        </section>
      </div>
      {showPopup &&
        createPortal(
          <Popup handleClosePopup={() => setShowPopup(false)}>
            <ValidationBox
              message="Confirm logout?"
              setShowPopup={setShowPopup}
              handleValidationAction={logout}
            />
          </Popup>,
          document.getElementById("popup-root")
        )}
    </div>
  );
}
