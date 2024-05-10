import { useState } from "react";
import classes from "./Signup.module.scss";

function createData() {
  return {
    firstName: ``,
    lastName: ``,
    email: ``,
    username: ``,
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
    <div className={classes.container}>
      <header className={classes.title}>
        <h1>Signup</h1>
      </header>

      <form onSubmit={handleSubmit} className={classes.formBox}>
        <div className={classes.inputBox}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={data.firstName}
            onChange={handleInput}
            placeholder="Insert your first name"
            required
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={data.lastName}
            onChange={handleInput}
            placeholder="Insert your last name"
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

          <label htmlFor="check"></label>
          <input
            type="checkbox"
            name="check"
            id="check"
            checked={data.check}
            onChange={handleInput}
            required
          />
        </div>

        <div className={classes.btnBox}>
          <button className={classes.signupBtn}>Sign Up</button>
        </div>
      </form>

      <footer className={classes.iconsBox}>
        <p>Signup with:</p>
        <span className={classes.firstIcon}>mail</span>

        <span className={classes.secondIcon}>mail</span>
      </footer>
    </div>
  );
}
