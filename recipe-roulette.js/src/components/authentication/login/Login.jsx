import classes from "./Login.module.scss";
import { Link } from "react-router-dom";
import { LoginSocialGoogle } from "reactjs-social-login";
import GoogleLoginButton from "../../Social Login Buttons/GoogleLoginButton";
import { MaterialSymbol } from "react-material-symbols";
import { Logo } from "../../Logo/Logo";
import { useForm } from "../../../hooks/Form/useForm";



export function Login() {

  const {data, handleInput, handleSubmit} = useForm()

  return (
    <section className={classes.pageBox}>

      <Logo/>

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
            type="password"
            name="password"
            id="password"
            value={data.password}
            placeholder="Insert password here"
            onChange={handleInput}
            required
          />
        </div>

        <button
          disabled={!data.username || !data.password}
          className={classes.loginBtn}
        ><MaterialSymbol icon="login" size={22} wght={28}/>
          Login
        </button>

        <p>
          Not registered yet?{" "}
          <span>
            <Link to="/signup">Sign Up</Link>
          </span>
        </p>
      </form>

      <footer className={classes.iconsBox}>
        <LoginSocialGoogle
          isOnlyGetToken
          client_id={
            "511651854576-4md3njisbf61ha7i2b0hn4nmp7gug82q.apps.googleusercontent.com"
          }
          onResolve={({ provider, data }) => {
            console.log(provider, data);
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >

          <GoogleLoginButton/>
        </LoginSocialGoogle>
      </footer>
    </div>

    </section>
    
  );
}
