import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  UtensilsCrossed,
  LibraryBig,
  Bus,
  PencilRuler,
} from "lucide-react";

export default function Dashboard() {

  const navigate = useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "role"
    );

    navigate("/");

  };

  const modules = [
    {
      title: "Canteen",
      desc:
        "Order food and track live status.",
      icon: UtensilsCrossed,
      route: "/canteen",
      available: true,
      gradient:
        "from-orange-200 via-pink-200 to-rose-100",
    },

    {
      title: "Library",
      desc:
        "Check seat availability and books.",
      icon: LibraryBig,
      route: "/library",
      available: true,
      gradient:
        "from-violet-200 via-fuchsia-200 to-pink-100",
    },

    {
      title: "Bus Timetable",
      desc:
        "View campus bus schedules.",
      icon: Bus,
      route: "/bus",
      available: true,
      gradient:
        "from-blue-200 via-cyan-200 to-sky-100",
    },

    {
      title: "Stationery",
      desc:
        "Order stationery essentials.",
      icon: PencilRuler,
      route: "/stationery",
      available: true,
      gradient:
        "from-yellow-100 via-amber-200 to-orange-100",
    },
  ];

  return (

    <div className="relative min-h-screen overflow-hidden bg-[#f8f4ff] font-['Outfit'] px-8 py-10">

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

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* TOP BAR */}

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
            duration: 1,
          }}
          className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8 mb-16"
        >

          <div>

            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/50 border border-white/50 mb-6 backdrop-blur-xl shadow-lg">

              <span className="w-3 h-3 rounded-full bg-violet-500" />

              <p className="text-slate-700 font-semibold text-sm">
                Smart Campus Dashboard
              </p>

            </div>

            <h1 className="text-6xl font-black text-slate-900 tracking-tight mb-4">

              Welcome,
              {" "}
              {user?.name || "Student"}

            </h1>

            <p className="text-slate-600 text-xl leading-relaxed max-w-2xl">

              Access all your campus services from one beautiful ecosystem.

            </p>

          </div>

          {/* LOGOUT */}

          <button
            onClick={logout}
            className="px-8 py-4 rounded-3xl bg-gradient-to-r from-violet-500 to-pink-400 text-white text-lg font-semibold shadow-[0_15px_50px_rgba(180,140,255,0.35)] hover:scale-105 transition duration-300"
          >

            Logout →

          </button>

        </motion.div>

        {/* QUICK STATS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">

          <motion.div
            whileHover={{
              y: -8,
            }}
            className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-[32px] p-8 shadow-xl"
          >

            <h2 className="text-5xl font-black text-slate-900">
              24/7
            </h2>

            <p className="text-slate-600 mt-4 text-lg">
              Smart Campus Access
            </p>

          </motion.div>

          <motion.div
            whileHover={{
              y: -8,
            }}
            className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-[32px] p-8 shadow-xl"
          >

            <h2 className="text-5xl font-black text-slate-900">
              5+
            </h2>

            <p className="text-slate-600 mt-4 text-lg">
              Campus Services
            </p>

          </motion.div>

          <motion.div
            whileHover={{
              y: -8,
            }}
            className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-[32px] p-8 shadow-xl"
          >

            <h2 className="text-5xl font-black text-slate-900">
              Fast
            </h2>

            <p className="text-slate-600 mt-4 text-lg">
              Real-Time Experience
            </p>

          </motion.div>

        </div>

        {/* MODULES */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {modules.map(
            (
              item,
              index
            ) => (

              <motion.div
                key={index}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                transition={{
                  duration: 0.3,
                }}
                onClick={() => {

                  if (
                    item.available &&
                    item.route
                  ) {

                    navigate(
                      item.route
                    );

                  }

                }}
                className={`group relative overflow-hidden rounded-[40px] p-8 border backdrop-blur-3xl transition duration-500 shadow-[0_20px_60px_rgba(180,140,255,0.12)] ${
                  item.available
                    ? "bg-white/40 border-white/50 hover:bg-white/60 cursor-pointer"
                    : "bg-white/[0.03] border-white/5 opacity-60 cursor-not-allowed"
                }`}
              >

                {/* BACKGROUND GLOW */}

                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br ${item.gradient}`} />

                <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl" />

                {/* CONTENT */}

                <div className="relative z-10">

                  {/* ICON */}

                  <div className={`relative w-24 h-24 rounded-[28px] bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-8 shadow-[0_20px_40px_rgba(255,255,255,0.25)] overflow-hidden`}>

                    {/* GLOW */}

                    <div className="absolute inset-0 bg-white/30 backdrop-blur-xl" />

                    {/* ICON */}

                    <item.icon
                      size={42}
                      strokeWidth={2.2}
                      className="relative z-10 text-slate-800"
                    />

                  </div>

                  {/* TITLE */}

                  <div className="flex items-center justify-between mb-4">

                    <h2 className="text-[32px] font-black text-slate-900 tracking-tight leading-tight">

                      {item.title}

                    </h2>

                  </div>

                  {/* DESC */}

                  <p className="text-slate-600 leading-relaxed text-lg">

                    {item.desc}

                  </p>

                  {/* BUTTON */}

                  <div className="mt-8">

                    <button className="px-6 py-3 rounded-2xl bg-white/60 border border-white/50 text-slate-800 font-semibold hover:bg-white transition">

                      Open →

                    </button>

                  </div>

                </div>

              </motion.div>

            )
          )}

        </div>

      </div>

    </div>

  );

}