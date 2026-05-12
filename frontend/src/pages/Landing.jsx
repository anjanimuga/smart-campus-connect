import { useNavigate } from "react-router-dom";

export default function Landing() {

  const navigate = useNavigate();

  const features = [
    {
      title: "Canteen Preordering",
      desc: "Skip queues and order meals instantly.",
    },
    {
      title: "Library Availability",
      desc: "Find seats in real time without confusion.",
    },
    {
      title: "Bus Tracking",
      desc: "Track schedules and campus transport easily.",
    },
    {
      title: "Stationery Access",
      desc: "Order campus essentials from one platform.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#151312] text-white overflow-hidden relative">

      {/* Background Glow */}
      <div className="absolute top-[-200px] right-[-100px] w-[500px] h-[500px] bg-orange-400 opacity-20 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-[-250px] left-[-100px] w-[500px] h-[500px] bg-pink-400 opacity-20 blur-[160px] rounded-full"></div>

      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center px-8 lg:px-20 py-8">

        <h1 className="text-3xl font-semibold tracking-tight">
          CampusConnect
        </h1>

        <div className="flex items-center gap-4">

          <button
            onClick={() => navigate("/login")}
            className="text-sm text-gray-300 hover:text-white transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-white text-black px-5 py-2.5 rounded-full text-sm hover:bg-gray-200 transition"
          >
            Register
          </button>

        </div>

      </nav>

      {/* Hero */}
      <section className="relative z-10 px-8 lg:px-20 pt-10 pb-24 grid lg:grid-cols-2 gap-20 items-center">

        {/* Left Side */}
        <div>

          <p className="uppercase tracking-[0.35em] text-xs text-orange-200 mb-6">
            Smart Campus Utility Platform
          </p>

          <h1 className="text-6xl lg:text-7xl font-semibold leading-[1.02] tracking-tight max-w-4xl">

            One Portal.
            <br />
            Every Service.
            <br />
            Zero Hassle.

          </h1>

          <p className="text-lg text-gray-300 mt-8 max-w-xl leading-relaxed">

            Pre-order meals, reserve library seats,
            track buses and manage campus utilities —
            all from one seamless digital experience.

          </p>

          <div className="flex flex-wrap gap-4 mt-10">

            <button
              onClick={() => navigate("/register")}
              className="bg-white text-black px-8 py-4 rounded-full hover:bg-gray-200 transition"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/login")}
              className="border border-gray-700 px-8 py-4 rounded-full hover:border-white transition"
            >
              Login
            </button>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">

            <div>
              <h2 className="text-3xl font-semibold">
                10K+
              </h2>

              <p className="text-gray-400 mt-1">
                Students
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold">
                50K+
              </h2>

              <p className="text-gray-400 mt-1">
                Orders
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold">
                20+
              </h2>

              <p className="text-gray-400 mt-1">
                Services
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold">
                99%
              </h2>

              <p className="text-gray-400 mt-1">
                Satisfaction
              </p>
            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="relative">

          {/* Main Glass Card */}
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 shadow-2xl">

            <div className="flex justify-between items-center mb-10">

              <div>
                <p className="text-sm text-gray-400">
                  Campus Overview
                </p>

                <h2 className="text-2xl font-semibold mt-1">
                  Utilities Dashboard
                </h2>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                ✨
              </div>

            </div>

            <div className="space-y-5">

              {features.map((item, index) => (

                <div
                  key={index}
                  className="bg-white/5 border border-white/5 rounded-3xl p-6 hover:bg-white/10 transition"
                >

                  <h3 className="text-lg font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-gray-300 mt-2 leading-relaxed">
                    {item.desc}
                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* Floating Cards */}
          <div className="absolute -top-8 -right-8 bg-[#211d1b] border border-white/10 rounded-3xl px-6 py-5 shadow-2xl">

            <p className="text-sm text-gray-400">
              Active Students
            </p>

            <h2 className="text-3xl font-semibold mt-1">
              8,421
            </h2>

          </div>

          <div className="absolute -bottom-8 -left-8 bg-gradient-to-r from-orange-300 to-pink-300 text-black rounded-3xl px-6 py-5 shadow-2xl">

            <p className="text-sm opacity-70">
              Today's Orders
            </p>

            <h2 className="text-3xl font-semibold mt-1">
              1,284
            </h2>

          </div>

        </div>

      </section>

    </div>
  );
}