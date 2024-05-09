import { useState } from "react";

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
    <div className="container">
      <header className="title">
        <h1>Login</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="input-box">
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

        <div className="btn-box">
          <button disabled={!data.username || !data.password} >Login</button>
          <button>Sign Up</button>
        </div>
      </form>

      <footer className="icons-box">
        
      </footer>
    </div>
  );
}
