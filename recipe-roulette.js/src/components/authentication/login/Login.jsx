import { useState } from "react";
import classes from "./Login.module.scss";
import { Link } from "react-router-dom";
import { LoginSocialGoogle } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";

function createData() {
  return {
    username: ``,
    password: ``,
  };
}

export function Login() {
  const [data, setData] = useState(createData());

  function handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;

    setData((d) => {
      return {
        ...d,
        [name]: value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(data);
  }

  return (
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
        >
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
            client_id={'511651854576-4md3njisbf61ha7i2b0hn4nmp7gug82q.apps.googleusercontent.com'}
            onResolve={({ provider, data }) => {
             console.log(provider, data);
            }}
            onReject={(err) => {
              console.log(err)
            }}
          >
            <GoogleLoginButton/>
          </LoginSocialGoogle>
      </footer>
    </div>
  );
}
