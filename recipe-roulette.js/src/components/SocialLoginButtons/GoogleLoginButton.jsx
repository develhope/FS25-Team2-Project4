/* import { createButton } from "react-social-login-buttons";
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
  activeStyle: { background: "#293e69" },
};

const GoogleLoginButton = createButton(config);

export default GoogleLoginButton; */

import { createButton } from "react-social-login-buttons";

/* const config = {
  text: "Log in with Facebook",
  icon: "facebook",
  iconFormat: (name) => `fa fa-${name}`,
  style: { background: "#3b5998" },
  activeStyle: { background: "#293e69" },
};

type SocialLoginButtonProps = PropsWithChildren<{
  activeStyle?: {};
  align?: "left" | "right" | "center";
  className?: string;
  icon?: string | React.ComponentType<{
      size: string | number;
      color: string;
  }>;
  iconFormat?: (name: string) => string;
  iconSize?: string | number;
  iconColor?: string;
  onClick?: VoidFunction;
  onMouseEnter?: VoidFunction;
  onMouseLeave?: VoidFunction;
  preventActiveStyles?: boolean;
  size?: string;
  style?: {};
  text?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}>;
/** My Facebook login button. */



const config = {
  icon: "heart",
  iconFormat: (name) => `bi bi-${name}`,
  style: { 
    background: "#3b5998",
    // Adjust styles to hide text
    padding: "0",
    fontSize: "0",
    lineHeight: "0",
  },
  activeStyle: { background: "#293e69" },
};
/** My Facebook login button. */

const MyFacebookLoginButton = createButton(config);

export default MyFacebookLoginButton;