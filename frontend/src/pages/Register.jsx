import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import {
  User,
  Mail,
  Lock,
  GraduationCap,
  Hash,
  Phone,
} from "lucide-react";

import API from "../services/api";

import toast from "react-hot-toast";

export default function Register() {

  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
      branch: "",
      year: "",
      rollNo: "",
      phone: "",
    });

  const handleChange =
    (e) => {

      setForm({
        ...form,
        [e.target.name]:
          e.target.value,
      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await API.post(
          "/register",
          form
        );

        toast.success("Registration Successful");

        navigate("/");

      } catch (error) {

      toast.error(
  error.response?.data?.message ||
  "Registration Failed"
)

      }

    };

  return (

    <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center px-6 py-12 overflow-hidden relative font-['Outfit']">

      {/* BACKGROUND */}

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">

        <div className="absolute top-[-120px] right-[-120px] w-[320px] h-[320px] bg-[#dbeafe] rounded-full blur-3xl opacity-60" />

        <div className="absolute bottom-[-120px] left-[-120px] w-[320px] h-[320px] bg-[#ede9fe] rounded-full blur-3xl opacity-40" />

      </div>

      {/* CARD */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="relative z-10 w-full max-w-3xl bg-white/80 backdrop-blur-2xl border border-white rounded-[38px] shadow-[0_20px_80px_rgba(0,0,0,0.08)] p-10 md:p-14"
      >

        {/* TOP */}

        <div className="text-center mb-12">

          <div className="inline-flex items-center gap-3 bg-[#f4f7fb] border border-[#ececec] px-5 py-3 rounded-full mb-6">

            <GraduationCap
              size={20}
              className="text-slate-700"
            />

            <span className="text-slate-700 font-medium">

              CampusConnect

            </span>

          </div>

          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-[#111111] mb-4">

            Create Account

          </h1>

          <p className="text-[#666666] text-lg">

            Join your smart campus ecosystem.

          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >

          {/* NAME */}

          <div className="relative">

            <User
              size={18}
              className="absolute left-5 top-5 text-[#888]"
            />

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full bg-[#f7f7f7] border border-[#e8e8e8] rounded-2xl pl-14 pr-5 py-4 outline-none focus:border-slate-400 transition"
              required
            />

          </div>

          {/* EMAIL */}

          <div className="relative">

            <Mail
              size={18}
              className="absolute left-5 top-5 text-[#888]"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full bg-[#f7f7f7] border border-[#e8e8e8] rounded-2xl pl-14 pr-5 py-4 outline-none focus:border-slate-400 transition"
              required
            />

          </div>

          {/* PASSWORD */}

          <div className="relative">

            <Lock
              size={18}
              className="absolute left-5 top-5 text-[#888]"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full bg-[#f7f7f7] border border-[#e8e8e8] rounded-2xl pl-14 pr-5 py-4 outline-none focus:border-slate-400 transition"
              required
            />

          </div>

          {/* BRANCH */}

          <div className="relative">

            <GraduationCap
              size={18}
              className="absolute left-5 top-5 text-[#888]"
            />

            <input
              type="text"
              name="branch"
              placeholder="Branch"
              onChange={handleChange}
              className="w-full bg-[#f7f7f7] border border-[#e8e8e8] rounded-2xl pl-14 pr-5 py-4 outline-none focus:border-slate-400 transition"
              required
            />

          </div>

          {/* YEAR */}

          <div className="relative">

            <Hash
              size={18}
              className="absolute left-5 top-5 text-[#888]"
            />

            <input
              type="text"
              name="year"
              placeholder="Year"
              onChange={handleChange}
              className="w-full bg-[#f7f7f7] border border-[#e8e8e8] rounded-2xl pl-14 pr-5 py-4 outline-none focus:border-slate-400 transition"
              required
            />

          </div>

          {/* ROLL */}

          <div className="relative">

            <Hash
              size={18}
              className="absolute left-5 top-5 text-[#888]"
            />

            <input
              type="text"
              name="rollNo"
              placeholder="Roll Number"
              onChange={handleChange}
              className="w-full bg-[#f7f7f7] border border-[#e8e8e8] rounded-2xl pl-14 pr-5 py-4 outline-none focus:border-slate-400 transition"
              required
            />

          </div>

          {/* PHONE */}

          <div className="relative md:col-span-2">

            <Phone
              size={18}
              className="absolute left-5 top-5 text-[#888]"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="w-full bg-[#f7f7f7] border border-[#e8e8e8] rounded-2xl pl-14 pr-5 py-4 outline-none focus:border-slate-400 transition"
              required
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="md:col-span-2 mt-3 bg-[#111111] text-white py-5 rounded-2xl font-semibold text-lg hover:scale-[1.01] transition duration-300 shadow-lg"
          >

            Create Account

          </button>

        </form>

        {/* LOGIN */}

        <button
          onClick={() =>
            navigate("/")
          }
          className="mt-8 w-full text-[#666666] hover:text-black transition font-medium"
        >

          Already have an account? Login

        </button>

      </motion.div>

    </div>

  );

}