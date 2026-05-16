import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import heroVideo from "../assets/hero.mp4";

export default function LandingNew() {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-[#f7f4ef] overflow-hidden relative font-['Outfit']">

      {/* VIDEO BACKGROUND */}

      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >

        <source
          src={heroVideo}
          type="video/mp4"
        />

      </video>

      {/* OVERLAY */}

      <div className="absolute inset-0 bg-gradient-to-r from-[#f7f4ef]/90 via-[#f7f4ef]/65 to-[#f7f4ef]/20" />

      {/* LIGHT EFFECTS */}

      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-violet-200/30 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-pink-200/20 blur-3xl"
      />

      {/* MAIN CONTENT */}

      <div className="relative z-20 min-h-screen flex flex-col">

        {/* NAVBAR */}

        <div className="flex justify-between items-center px-8 lg:px-16 py-8">

          {/* LOGO */}

          <motion.h1
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="text-3xl lg:text-4xl font-black tracking-tight text-[#111827]"
          >

            CampusConnect

          </motion.h1>

          {/* NAV ITEMS */}

          <div className="hidden md:flex gap-10 items-center bg-white/30 backdrop-blur-2xl border border-white/40 px-8 py-4 rounded-full shadow-xl">

            <button className="text-slate-700 font-semibold hover:text-violet-500 transition duration-300">

              Features

            </button>

            <button className="text-slate-700 font-semibold hover:text-violet-500 transition duration-300">

              Modules

            </button>

            <button className="text-slate-700 font-semibold hover:text-violet-500 transition duration-300">

              About

            </button>

            <button
              onClick={() =>
                navigate("/login")
              }
              className="relative z-50 px-8 py-4 rounded-full bg-gradient-to-r from-violet-500 to-pink-400 text-white font-semibold shadow-[0_10px_40px_rgba(180,140,255,0.35)] hover:scale-105 transition duration-300"
            >

              Login →

            </button>

          </div>

        </div>

        {/* HERO SECTION */}

        <div className="flex-1 flex items-center px-8 lg:px-20">

          <div className="max-w-3xl">

            <motion.p
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
              }}
              className="text-violet-500 font-semibold text-lg mb-6"
            >

              Smart Campus Ecosystem

            </motion.p>

            <motion.h1
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
              className="text-[70px] lg:text-[110px] leading-[0.92] font-black tracking-tight text-[#111827] mb-8"
            >

              Campus
              <br />

              <span className="bg-gradient-to-r from-violet-500 to-pink-400 bg-clip-text text-transparent">

                Connected.

              </span>

            </motion.h1>

            <motion.p
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
                delay: 0.2,
              }}
              className="text-xl lg:text-2xl text-slate-600 leading-relaxed max-w-2xl mb-12"
            >

              Experience smarter campus living with integrated food ordering,
              library booking, transport tracking, printing and stationery —
              all in one premium platform.

            </motion.p>

            {/* BUTTONS */}

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
                delay: 0.4,
              }}
              className="flex flex-wrap gap-6"
            >

              <button
                onClick={() =>
                  navigate("/login")
                }
                className="bg-gradient-to-r from-violet-500 to-pink-400 text-white px-10 py-5 rounded-full text-xl font-semibold shadow-[0_15px_50px_rgba(180,140,255,0.35)] hover:scale-105 transition duration-300"
              >

                Get Started →

              </button>

              <button className="bg-white/40 backdrop-blur-xl border border-white/50 text-slate-700 px-10 py-5 rounded-full text-xl font-semibold hover:bg-white/60 transition duration-300">

                Explore Features

              </button>

            </motion.div>

            {/* STATS */}

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
                delay: 0.6,
              }}
              className="flex flex-wrap gap-10 mt-16"
            >

              <div>

                <h2 className="text-4xl font-black text-[#111827]">

                  5+

                </h2>

                <p className="text-slate-600 mt-2">

                  Smart Modules

                </p>

              </div>

              <div>

                <h2 className="text-4xl font-black text-[#111827]">

                  Real-Time

                </h2>

                <p className="text-slate-600 mt-2">

                  Campus Services

                </p>

              </div>

              <div>

                <h2 className="text-4xl font-black text-[#111827]">

                  Premium

                </h2>

                <p className="text-slate-600 mt-2">

                  Student Experience

                </p>

              </div>

            </motion.div>

          </div>

        </div>

      </div>

    </div>

  );

}