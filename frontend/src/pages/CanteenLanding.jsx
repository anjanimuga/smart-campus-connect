import { useNavigate } from "react-router-dom";

import canteenVideo from "../assets/canteen.mp4";

export default function CanteenLanding() {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen relative overflow-hidden bg-[#f8f5f2]">

      {/* VIDEO */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >

        <source
          src={canteenVideo}
          type="video/mp4"
        />

      </video>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#f8f5f2]/90 via-[#f8f5f2]/60 to-transparent z-10" />

      {/* CONTENT */}
      <div className="relative z-20 min-h-screen flex items-center px-10 lg:px-20">

        <div className="max-w-xl">

          <p className="text-[#8b5cf6] text-lg font-medium mb-6">

            Smart Campus Dining

          </p>

          <h1 className="text-[70px] lg:text-[95px] leading-[0.95] font-black text-[#111827] mb-8">

            Campus
            <br />

            <span className="bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">

              Canteen

            </span>

          </h1>

          <p className="text-xl text-gray-600 leading-relaxed mb-10">

            Faster ordering.
            Smarter pickup.
            Premium student dining experience.

          </p>

          <button
            onClick={() =>
              navigate("/canteen-menu")
            }
            className="bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] text-white px-10 py-5 rounded-full text-xl font-semibold shadow-xl hover:scale-105 transition duration-300"
          >

            Explore Menu →

          </button>

        </div>

      </div>

    </div>

  );

}