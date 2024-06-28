import { useEffect, useState } from "react";
import { useAuth } from "../Auth/useAuth";
import { useNavigate } from "react-router";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export function useLogin() {
  const [data, setData] = useState(createData());
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
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
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });
  
/*       if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      } */
  
      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } catch (error) {
      console.error('Error while fetching data:', error);
      throw new Error('Error while fetching data');
    }
  }

  const mutation = useMutation(
    {
      mutationFn: handlePostLoginData,
      onSuccess: (data) => {
        console.log(data);
        setItem(data)
        login();
        navigate("/discovery");
      },
      onError: (error) => {
        console.error("Login failed:", error.message);
      },
    },
  );

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
    handleInput,
    handleSubmit,
    handleShowPassword,
    setItem,
  };
}
