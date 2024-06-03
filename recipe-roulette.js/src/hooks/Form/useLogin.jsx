import { useEffect, useState } from "react";
import { useAuth } from "../Auth/useAuth";
import { useNavigate } from "react-router";

export function useLogin() {
  const [data, setData] = useState(createData());
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  function createData() {
    return {
      username: ``,
      password: ``,
      check: ``,
    };
  }

  function setItem(data) {
    try {
      window.localStorage.setItem("username", data.username);
      window.localStorage.setItem("password", data.password);
    } catch (error) {
      console.log(error);
    }
  }

  function getItem(data) {
    try {
      const username = window.localStorage.getItem("username");
      const password = window.localStorage.getItem("password");

      if (username && password) {
        setData({ ...data, username, password});
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getItem()
  }, [])

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
    login()
    console.log(data);
    navigate("/")
  }

  function handleShowPassword () {
    setShowPassword(!showPassword)
  }

  return {
    data,
    showPassword,
    handleInput,
    handleSubmit,
    handleShowPassword,
  };
}
