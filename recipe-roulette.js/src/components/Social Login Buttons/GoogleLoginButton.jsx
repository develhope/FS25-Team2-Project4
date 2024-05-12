import { createButton } from "react-social-login-buttons";
import "./styleBtns.scss"
import 'bootstrap-icons/font/bootstrap-icons.css';


const config = {

  className: "googlebtn",
/*   style: { background: "#293e69" },
  activeStyle: { background: "#293e69" }, */
};

const GoogleLoginButton = createButton(config);

export default GoogleLoginButton;