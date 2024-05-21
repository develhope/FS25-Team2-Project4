import { Link } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import { GoogleLoginBtn } from "../SocialLoginButtons/GoogleLoginBtn";
import classes from "./Authentication.module.scss";
import { FacebookSocialBtn } from "../SocialLoginButtons/FacebookLoginBtn";

export function Authentication() {
  return (
    <section className={classes.pageBox}>
      <Logo />
      <div className={classes.container}>
        <Link to="/signup">
          <button className={classes.signupBtn}> Sign up</button>
        </Link>{" "}
        <Link to="/login">
          <button className={classes.loginBtn}>Login</button>
        </Link>{" "}
        <hr />
        <GoogleLoginBtn />
        <FacebookSocialBtn/>
      </div>
    </section>
  );
}
