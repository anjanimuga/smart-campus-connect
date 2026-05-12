import { useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

import API from "../services/api";

export default function Login() {

  const navigate =
    useNavigate();

  const [isRegister,
    setIsRegister] =
    useState(false);

  const [formData,
    setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        // REGISTER
        if (
          isRegister
        ) {

          const res =
            await API.post(
              "/register",
              formData
            );

          console.log(
            res.data
          );

          alert(
            "Registration successful"
          );

          setIsRegister(
            false
          );

          return;

        }

        // LOGIN
        const res =
          await API.post(
            "/login",
            {
              email:
                formData.email,
              password:
                formData.password,
            }
          );

        localStorage.setItem(
          "token",
          res.data.token
        );

       console.log(
  "LOGIN RESPONSE:",
  res.data
);

localStorage.setItem(
  "role",
  res.data.role
);

        localStorage.setItem(
          "user",
          JSON.stringify(
            res.data.user
          )
        );

        // ADMIN
        if (
          res.data.role ===
          "admin"
        ) {

          navigate(
            "/admin"
          );

        } else {

          navigate(
            "/dashboard"
          );

        }

      } catch (error) {

        console.log(
          error.response?.data ||
          error.message
        );

        alert(
          error.response?.data?.message ||
          "Authentication failed"
        );

      }

    };

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#151312] text-white px-6">

      <form
        onSubmit={
          handleSubmit
        }
        className="bg-white/5 border border-white/10 p-10 rounded-3xl w-full max-w-md"
      >

        <h1 className="text-4xl font-semibold mb-8 text-center">

          {
            isRegister
              ? "Register"
              : "Login"
          }

        </h1>

        {

          isRegister && (

            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={
                handleChange
              }
              className="w-full mb-5 px-5 py-4 rounded-2xl bg-black border border-white/10 outline-none"
              required
            />

          )

        }

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={
            handleChange
          }
          className="w-full mb-5 px-5 py-4 rounded-2xl bg-black border border-white/10 outline-none"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={
            handleChange
          }
          className="w-full mb-8 px-5 py-4 rounded-2xl bg-black border border-white/10 outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-white text-black py-4 rounded-2xl font-semibold hover:bg-gray-200 transition"
        >

          {
            isRegister
              ? "Register"
              : "Login"
          }

        </button>

        <button
          type="button"
          onClick={() =>
            setIsRegister(
              !isRegister
            )
          }
          className="w-full mt-5 text-gray-400 hover:text-white transition"
        >

          {
            isRegister
              ? "Already have an account? Login"
              : "Don't have an account? Register"
          }

        </button>

      </form>

    </div>

  );

}