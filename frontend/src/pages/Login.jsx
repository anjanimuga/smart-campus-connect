import { useState } from "react";
import { motion } from "framer-motion";

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

    <div className="relative min-h-screen overflow-hidden bg-[#f8f4ff] font-['Outfit'] flex items-center justify-center px-6">

      {/* BACKGROUND BLOBS */}

      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-pink-200/40 blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-violet-200/40 blur-[120px]"
      />

      {/* LOGIN CARD */}

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
        }}
        className="relative z-10 w-full max-w-md"
      >

        <form
          onSubmit={
            handleSubmit
          }
          className="bg-white/40 backdrop-blur-3xl border border-white/50 rounded-[40px] p-10 shadow-[0_20px_80px_rgba(180,140,255,0.15)]"
        >

          {/* TOP BADGE */}

          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/50 border border-white/50 mb-8">

            <span className="w-3 h-3 rounded-full bg-violet-500" />

            <p className="text-slate-700 font-semibold text-sm">
              CampusConnect Access
            </p>

          </div>

          {/* HEADING */}

          <h1 className="text-5xl font-black text-slate-900 mb-3 tracking-tight">

            {
              isRegister
                ? "Create Account"
                : "Welcome Back"
            }

          </h1>

          <p className="text-slate-600 text-lg mb-10 leading-relaxed">

            {
              isRegister
                ? "Join your smart campus ecosystem."
                : "Login to continue your campus experience."
            }

          </p>

          {/* NAME */}

          {

            isRegister && (

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={
                  handleChange
                }
                className="w-full mb-5 px-6 py-5 rounded-3xl bg-white/50 border border-white/50 outline-none text-slate-800 placeholder:text-slate-500 backdrop-blur-xl focus:ring-2 focus:ring-violet-300 transition"
                required
              />

            )

          }

          {/* EMAIL */}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={
              handleChange
            }
            className="w-full mb-5 px-6 py-5 rounded-3xl bg-white/50 border border-white/50 outline-none text-slate-800 placeholder:text-slate-500 backdrop-blur-xl focus:ring-2 focus:ring-violet-300 transition"
            required
          />

          {/* PASSWORD */}

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={
              handleChange
            }
            className="w-full mb-8 px-6 py-5 rounded-3xl bg-white/50 border border-white/50 outline-none text-slate-800 placeholder:text-slate-500 backdrop-blur-xl focus:ring-2 focus:ring-violet-300 transition"
            required
          />

          {/* SUBMIT BUTTON */}

          <button
            type="submit"
            className="w-full py-5 rounded-3xl bg-gradient-to-r from-violet-500 to-pink-400 text-white text-xl font-semibold shadow-[0_15px_50px_rgba(180,140,255,0.35)] hover:scale-[1.02] transition duration-300"
          >

            {
              isRegister
                ? "Create Account"
                : "Login"
            }

          </button>

          {/* TOGGLE BUTTON */}

          <button
            type="button"
            onClick={() =>
              setIsRegister(
                !isRegister
              )
            }
            className="w-full mt-6 text-slate-600 hover:text-violet-500 transition font-medium"
          >

            {
              isRegister
                ? "Already have an account? Login"
                : "Don't have an account? Register"
            }

          </button>

        </form>

      </motion.div>

    </div>

  );

}