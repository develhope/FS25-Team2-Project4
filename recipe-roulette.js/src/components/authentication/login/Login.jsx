import { useState } from "react";
import classes from "./Login.module.scss"

function createData () {
    return {
        username: ``,
        password: ``,
    }
}


export function Login() {
    
    const [data, setData] = useState(createData())

    function handleInput (e) {
        const name = e.target.name
        const value = e.target.value

        setData((d) => {
            return {
                ...d,
                [name] : value
            }
        })
    }

    function handleSubmit (e) {
        e.preventDefault()
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
            placeholder="Insert username here"
            onChange={handleInput}
            required
          />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder="Insert password here" onChange={handleInput} required/>
        </div>

        <div className={classes.btnBox}>
          <button disabled={!data.username || !data.password} className={classes.loginBtn}>Login</button>
          <button className={classes.signupBtn}>Sign Up</button>
        </div>
      </form>

      <footer className={classes.iconsBox}>
          <div>

          </div>
      </footer>
    </div>
  );
}
