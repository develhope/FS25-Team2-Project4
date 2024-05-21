import { useEffect, useRef, useState } from "react";

export function useLogin() {
  const [data, setData] = useState(createData());
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function createData() {
    return {
      username: ``,
      password: ``,
      check: ``,
    };
  }

  function setItem(data) {
    try {
      window.localStorage.setItem("username", JSON.stringify(data.username));
      window.localStorage.setItem("password", JSON.stringify(data.password));
    } catch (error) {
      console.log(error);
    }
  }


/*
    function getItem(data) {
      try {
        const username = window.localStorage.getItem("usernam", JSON.parse(data));
        const password = window.localStorage.getItem("password", JSON.parse(data.password));
        
      } catch (error) {
        console.log(error);
      }
    } */

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
    setItem(data);
    console.log(data);
  }

  return {
    data,
    inputRef,
    handleInput,
    handleSubmit,
  };
}
