import {
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  Bus as BusIcon,
  Clock3,
  MapPinned,
} from "lucide-react";

import API from "../services/api";

export default function Bus() {

  const [buses, setBuses] =
    useState([]);

  // FETCH BUSES
  const fetchBuses =
    async () => {

      try {

        const res =
          await API.get(
            "/buses"
          );

        setBuses(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchBuses();

    const interval =
      setInterval(() => {

        fetchBuses();

      }, 5000);

    return () =>
      clearInterval(
        interval
      );

  }, []);

  return (

    <div className="min-h-screen bg-[#f5f8fc] px-8 py-10 font-['Outfit']">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-16">

          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-[#dbe6f3] shadow-sm mb-6">

            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />

            <p className="text-[#52606d] font-medium text-sm">
              Smart Transit System
            </p>

          </div>

          <h1 className="text-6xl font-black text-[#101820] tracking-tight mb-5">

            Campus Buses

          </h1>

          <p className="text-[#5f6c78] text-xl leading-relaxed max-w-2xl">

            Track campus bus schedules, routes and live status updates with a clean real-time transit experience.

          </p>

        </div>

        {/* BUS GRID */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {buses.map(
            (
              bus,
              index
            ) => (

              <motion.div
                key={bus._id}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
                whileHover={{
                  y: -6,
                }}
                className="bg-white border border-[#dbe6f3] rounded-[36px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition duration-500"
              >

                {/* TOP */}

                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 mb-10">

                  {/* LEFT */}

                  <div>

                    <div className="w-20 h-20 rounded-[28px] bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center mb-6 shadow-sm">

                      <BusIcon
                        size={36}
                        className="text-[#101820]"
                      />

                    </div>

                    <h2 className="text-5xl font-black text-[#101820] tracking-tight mb-4">

                      Bus
                      {" "}
                      {
                        bus.busNumber
                      }

                    </h2>

                    <div className="flex items-center gap-3 text-[#5f6c78] text-lg">

                      <MapPinned
                        size={18}
                      />

                      <p>

                        {
                          bus.route
                        }

                      </p>

                    </div>

                  </div>

                  {/* STATUS */}

                  <div
                    className={`inline-flex items-center px-5 py-3 rounded-full text-sm font-semibold ${
                      bus.status ===
                      "On Time"
                        ? "bg-green-100 text-green-700"
                        : bus.status ===
                          "Delayed"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >

                    {
                      bus.status
                    }

                  </div>

                </div>

                {/* TIMINGS */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                  {/* DEPARTURE */}

                  <div className="bg-[#f8fbff] border border-[#dbe6f3] rounded-[28px] p-6">

                    <div className="flex items-center gap-3 mb-5">

                      <Clock3
                        size={18}
                        className="text-[#101820]"
                      />

                      <p className="text-[#6b7a88] text-sm font-medium">

                        Departure

                      </p>

                    </div>

                    <h3 className="text-4xl font-black text-[#101820]">

                      {
                        bus.departureTime
                      }

                    </h3>

                  </div>

                  {/* ARRIVAL */}

                  <div className="bg-[#f8fbff] border border-[#dbe6f3] rounded-[28px] p-6">

                    <div className="flex items-center gap-3 mb-5">

                      <Clock3
                        size={18}
                        className="text-[#101820]"
                      />

                      <p className="text-[#6b7a88] text-sm font-medium">

                        Arrival

                      </p>

                    </div>

                    <h3 className="text-4xl font-black text-[#101820]">

                      {
                        bus.arrivalTime
                      }

                    </h3>

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