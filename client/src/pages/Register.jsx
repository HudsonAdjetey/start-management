import React, { useEffect, useState } from "react";
import Footer from "../components/footer/Footer";
import RegisterForm from "../components/register/RegisterForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastSuccess, toastError } from "../toastify/toastMes";
import NormalLoader from "../components/loadingSpinner/NormalLoader";
import axios from "axios";
import { useDispatch } from "react-redux";

const URL = `http://localhost:5010/api-bill/user-system/register`;

const Register = () => {
  const dispatch = useDispatch();
  const [loginID, setLoginID] = useState("");
  const [role, setRole] = useState("");
  const [usernameID, setUserNameID] = useState("");
  const [pwd, setPwd] = useState("");

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: "register",
    mutationFn: async (data) => {
      return await axios.post(`${URL}`, data);
    },

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: "register", exact: true });
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await mutation.mutateAsync({
        loginID: loginID,
        role: role.toLocaleLowerCase(),
        username: usernameID,
        password: pwd,
      });
      dispatch(setCredentials(response.data.data));

      toastSuccess("Registered");
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
      <RegisterForm
        onSubmit={onSubmit}
        loginID={loginID}
        role={role}
        setRole={setRole}
        usernameID={usernameID}
        setUsernameID={setUserNameID}
        pwd={pwd}
        setPwd={setPwd}
        setLoginID={setLoginID}
      />
      {/* FORM CONTAINER */}

      {/* FOOTER */}
      <Footer />
      {/* FOOTER */}
    </section>
  );
};

export default Register;
