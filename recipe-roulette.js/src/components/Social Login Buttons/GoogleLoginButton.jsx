import { createButton } from "react-social-login-buttons";
import "./styleBtns.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const icon = <FontAwesomeIcon icon="fa-brands fa-google" />
const config = {
  icon: `${icon}`,
  iconFormat: (google) => `fa fa-${google}`,
  className: "googlebtn",
  iconSize: "8px",
  style: { border: "none"}
/*   style: { background: "#293e69" },
  activeStyle: { background: "#293e69" }, */
};

const GoogleLoginButton = createButton(config);

export default GoogleLoginButton;