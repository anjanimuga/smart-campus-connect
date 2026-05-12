import {
  useEffect,
  useState,
} from "react";

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

    <div className="min-h-screen bg-[#151312] text-white px-8 py-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-14">

          <h1 className="text-5xl font-semibold mb-3">
            Campus Buses
          </h1>

          <p className="text-gray-400 text-lg">
            View campus bus schedules and live status.
          </p>

        </div>

        {/* BUS LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {buses.map(
            (bus) => (

              <div
                key={bus._id}
                className="bg-white/5 border border-white/10 rounded-3xl p-8"
              >

                <div className="flex justify-between items-start mb-8">

                  <div>

                    <h2 className="text-4xl font-semibold mb-3">

                      Bus
                      {" "}
                      {
                        bus.busNumber
                      }

                    </h2>

                    <p className="text-gray-400 text-lg">

                      {
                        bus.route
                      }

                    </p>

                  </div>

                  <div
                    className={`px-5 py-2 rounded-full text-sm font-semibold ${
                      bus.status ===
                      "On Time"
                        ? "bg-green-500 text-black"
                        : bus.status ===
                          "Delayed"
                        ? "bg-yellow-500 text-black"
                        : "bg-red-500 text-white"
                    }`}
                  >

                    {
                      bus.status
                    }

                  </div>

                </div>

                <div className="grid grid-cols-2 gap-5">

                  <div className="bg-black border border-white/10 rounded-2xl p-5">

                    <p className="text-gray-500 text-sm mb-2">
                      Departure
                    </p>

                    <h3 className="text-2xl font-semibold">

                      {
                        bus.departureTime
                      }

                    </h3>

                  </div>

                  <div className="bg-black border border-white/10 rounded-2xl p-5">

                    <p className="text-gray-500 text-sm mb-2">
                      Arrival
                    </p>

                    <h3 className="text-2xl font-semibold">

                      {
                        bus.arrivalTime
                      }

                    </h3>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );

}