import { useState } from "react";
import { useAuth } from "../Auth/useAuth";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "../../components/Snackbar/useSnackbar";

export function useLogin() {
  const [data, setData] = useState(createData());
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const {handleOpenSnackbar} = useSnackbar()
  const navigate = useNavigate();

  function createData() {
    return {
      username: ``,
      password: ``,
      check: ``,
    };
  }

  function setItem(data) {
    try {
      localStorage.setItem("username", data.username);
      localStorage.setItem("password", data.password);
    } catch (error) {
      console.error("Error while saving to localStorage:", error);
    }
  }

  function getItem(data) {
    try {
      const username = window.localStorage.getItem("username");
      const password = window.localStorage.getItem("password");

      if (username && password) {
        setData({ ...data, username, password });
      }
    } catch (error) {
      console.log(error);
    }
  }

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

  async function handlePostLoginData(data) {
    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } catch (error) {
      console.error("Error while fetching data:", error);
      throw new Error("Error while fetching data");
    }
  }

  const mutation = useMutation({
    mutationFn: handlePostLoginData,
    onSuccess: (data) => {
      console.log(data);
      getItem(data);
      setItem(data);
      handleOpenSnackbar("Logged in")
      login();
    },
    onError: (error) => {
      handleOpenSnackbar("Login Failed")
      console.error("Login failed:", error.message);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate({ username: data.username, password: data.password });
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return {
    data,
    showPassword,
    mutation,
    handleInput,
    handleSubmit,
    handleShowPassword,
    setItem,
  };
}
