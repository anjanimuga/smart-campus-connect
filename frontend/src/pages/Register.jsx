import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    branch: "",
    year: "",
    rollNo: "",
    phone: "",
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/register",
        form
      );

      alert(
        "Registration Successful"
      );

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#151312] text-white px-6 py-10">

      <div className="bg-white/5 border border-white/10 p-10 rounded-3xl w-full max-w-2xl">

        <h1 className="text-5xl font-semibold mb-3 text-center">
          CampusConnect
        </h1>

        <p className="text-center text-gray-400 mb-10">
          Create your student account
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
            required
          />

          <input
            type="text"
            name="branch"
            placeholder="Branch"
            onChange={handleChange}
            className="bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
            required
          />

          <input
            type="text"
            name="year"
            placeholder="Year"
            onChange={handleChange}
            className="bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
            required
          />

          <input
            type="text"
            name="rollNo"
            placeholder="Roll Number"
            onChange={handleChange}
            className="bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none md:col-span-2"
            required
          />

          <button
            type="submit"
            className="md:col-span-2 bg-white text-black py-4 rounded-2xl font-semibold hover:bg-gray-200 transition mt-3"
          >
            Register
          </button>

        </form>

        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full text-gray-300 hover:text-white"
        >
          Already have an account? Login
        </button>

      </div>

    </div>
  );
}