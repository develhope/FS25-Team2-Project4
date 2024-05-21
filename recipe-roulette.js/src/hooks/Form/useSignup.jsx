import { useEffect, useRef, useState } from "react";

export function useSignup() {
  const [data, setData] = useState(createData());
  const [passError, setPassError] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);


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

  return {
    data,
    passError,
    inputRef,
    handleInput,
    handleSubmit,
  };
}
