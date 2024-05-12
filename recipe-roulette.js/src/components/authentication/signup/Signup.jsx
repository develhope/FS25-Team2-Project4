import { useState } from "react";
import classes from "./Signup.module.scss";
import { Logo } from "../../Logo/Logo";

function createData() {
  return {
    username: ``,
    email: ``,
    password: ``,
    confirmPass: ``,
    check: ``,
  };
}

export function Signup() {
  const [data, setData] = useState(createData());
  const [passError, setPassError] = useState(null);

  function handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    const checked = e.target.checked;
    const type = e.target.type;

    setData((d) => {
      return {
        ...d,
        [name]: type === `checkbox` ? checked : value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (data.password === data.confirmPass) {
      console.log(data);
    } else {
      setPassError(`Please, confirm your password correctly`);
    }
  }

  return (
    <section className={classes.pageBox}>

      <Logo/>

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
            placeholder="Repeat Password"
            required
          />
          <p>{passError}</p>

          <label htmlFor="check" className={classes.checkLabel}>I Agree with<span>Terms & Conditions</span>
          <input
            type="checkbox"
            name="check"
            id="check"
            checked={data.check}
            onChange={handleInput}
            required
          /></label>
     
        </div>

          <button className={classes.signupBtn}>Sign Up</button>
      </form>
    </div>
    </section>
    
  );
}
