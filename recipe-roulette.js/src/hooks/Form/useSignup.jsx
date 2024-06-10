import { useState } from "react";

export function useSignup() {
  const [data, setData] = useState(createData());
  const [passError, setPassError] = useState(null);

  function createData() {
    return {
      username: ``,
      email: ``,
      password: ``,
      confirmPass: ``,
      check: ``,
    };
  }

  function handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    const checked = e.target.checked;
    const type = e.target.type;

    setData((d) => ({
      ...d,
      [name]: type === `checkbox` ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (data.password === data.confirmPass) {
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);
      localStorage.setItem("password", data.password);
      console.log(data);
    } else {
      setPassError(`Please, confirm your password correctly`);
    }
  }

  return {
    data,
    passError,
    handleInput,
    handleSubmit,
  };
}