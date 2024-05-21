import classes from "./Signup.module.scss";
import { Logo } from "../../Logo/Logo";
import {useSignup} from "../../../hooks/Form/useSignup"

export function Signup() {

  const { data, passError, inputRef, handleInput, handleSubmit} = useSignup()


  return (
    <section className={classes.pageBox}>
      <Logo />

      <div className={classes.container}>
        <header className={classes.title}>
          <h1>Signup</h1>
        </header>

        <form onSubmit={handleSubmit} className={classes.formBox}>
          <div className={classes.inputBox}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={data.username}
              onChange={handleInput}
              ref={inputRef}
              placeholder="Insert your username"
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={data.email}
              onChange={handleInput}
              placeholder="Insert your email"
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={data.password}
              onChange={handleInput}
              placeholder="Insert a valid password"
              required
            />
            <label htmlFor="confirmPass">Confirm password</label>
            <input
              type="password"
              name="confirmPass"
              id="confirmPass"
              value={data.confirmPass}
              onChange={handleInput}
              placeholder="Repeat password"
              required
            />
            <p>{passError}</p>

            <label htmlFor="check" className={classes.checkLabel}>
              I Agree with<span>Terms & Conditions</span>
              <input
                type="checkbox"
                name="check"
                id="check"
                checked={data.check}
                onChange={handleInput}
                required
              />
            </label>
          </div>

          <button className={classes.signupBtn}>Sign Up</button>
        </form>
      </div>
    </section>
  );
}