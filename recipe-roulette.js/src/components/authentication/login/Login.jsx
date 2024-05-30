import classes from "./Login.module.scss";
import { Link } from "react-router-dom";
import { MaterialSymbol } from "react-material-symbols";
import { Logo } from "../../Logo/Logo";
import { useLogin } from "../../../hooks/Form/useLogin";
import { GoogleLoginBtn } from "../../SocialLoginButtons/GoogleLoginBtn";
import { FacebookSocialBtn } from "../../SocialLoginButtons/FacebookLoginBtn";

export function Login() {
  const { data, showPassword, handleInput, handleSubmit, handleShowPassword } = useLogin();

  return (
    <section className={classes.pageBox}>
      
      <Logo />

      <div className={classes.container}>
        <header className={classes.title}>
          <h1>Login</h1>
        </header>

        <form onSubmit={handleSubmit} className={classes.formBox}>
          <div className={classes.inputBox}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={data.username}
              placeholder="Insert username here"
              onChange={handleInput}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password" }
              name="password"
              id="password"
              value={data.password}
              placeholder="Insert password here"
              onChange={handleInput}
              className={classes.passInput}
              required
            />
            {showPassword ? <MaterialSymbol icon="visibility_off" size={20}  onClick={handleShowPassword} className={classes.passwordIcon}/> : <MaterialSymbol icon="Visibility" size={20}  onClick={handleShowPassword} className={classes.passwordIcon}/>}
          </div>

          <button
            disabled={!data.username || !data.password}
            className={classes.loginBtn}
          >
            <MaterialSymbol icon="login" size={20} />
            Login
          </button>

          <p>
            Not registered yet?{" "}
            <span>
              <Link to="/signup">Sign Up</Link>
            </span>
          </p>
        </form>

        <div className={classes.loginBtnBox}>
          <GoogleLoginBtn/>
          <FacebookSocialBtn/>
        </div>
      </div>
    </section>
  );
}
