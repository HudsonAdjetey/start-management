import React, { useEffect, useState } from "react";
import "../styles/auth.css";
import FormAuth from "../components/login/FormAuth";
import Footer from "../components/footer/Footer";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "axios";
import { toastError, toastSuccess } from "../toastify/toastMes";
import NormalLoader from "../components/loadingSpinner/NormalLoader";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/slice";

const URL = `http://localhost:5010/api-bill/user-system/login`;

const Login = () => {
  const dispatch = useDispatch();
  const [usernameID, setUserNameID] = useState("");
  const [pwd, setPwd] = useState("");
  const [loginID, setLoginID] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: "login",
    mutationFn: (data) => {
      return axios.post(`${URL}`, data);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: "login", exact: true });
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (usernameID == "" || pwd == "" || loginID == "") {
      toastError("All fields are required");
      return;
    }
    try {
      const response = await mutation.mutateAsync({
        username: usernameID,
        loginID: loginID,
        password: pwd,
      });
      toastSuccess("Success");

      dispatch(setCredentials(response.data.data));
    } catch (error) {
      if (error.response.status == 500) {
        toastError("Something went wrong or check internet");
      } else {
        toastError(error?.response?.data?.msg);
      }
    }
  };

  useEffect(() => {
    if (mutation.isPaused) {
      toastError("Check your internet");
    }
  }, [mutation]);

  return (
    <section id="auth__container" className="flex_col">
      {mutation.isPaused !== true && mutation.isPending && <NormalLoader />}
      {/* FORM HEADER */}
      <div className="logo_header flex_col">
        <i className="bi bi-person"></i>
        <h2>Welcome to the app</h2>
      </div>
      {/* FORM CONTAINER */}
      <FormAuth
        usernameID={usernameID}
        setUserNameID={setUserNameID}
        onSubmit={onSubmit}
        pwd={pwd}
        setPwd={setPwd}
        loginID={loginID}
        setLoginID={setLoginID}
      />
      {/* FORM CONTAINER */}

      {/* FOOTER */}
      <Footer />
      {/* FOOTER */}
    </section>
  );
};

export default Login;
