import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  BookmarkCheck,
  Clock3,
  Armchair,
} from "lucide-react";

import API from "../services/api";

export default function MyLibraryBookings() {

  const [mySeats, setMySeats] =
    useState([]);

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  // FETCH MY BOOKINGS
  const fetchMyBookings =
    async () => {

      try {

        const res =
          await API.get(
            "/library"
          );

        const filteredSeats =
          res.data.filter(
            (seat) =>
              seat.bookedById ===
              user?._id
          );

        setMySeats(
          filteredSeats
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchMyBookings();

    const interval =
      setInterval(() => {

        fetchMyBookings();

      }, 3000);

    return () =>
      clearInterval(
        interval
      );

  }, []);

  // RELEASE SEAT
  const releaseSeat =
    async (id) => {

      try {

        await API.put(
          `/library/release/${id}`
        );

        fetchMyBookings();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="min-h-screen bg-[#f6f7fb] px-8 py-10 font-['Outfit'] overflow-hidden relative">

      {/* LIGHT EFFECTS */}

      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-3xl" />

      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-violet-100/40 blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="mb-16">

          <div className="inline-flex items-center gap-3 bg-white border border-[#e5e7eb] px-5 py-3 rounded-full shadow-sm mb-6">

            <BookmarkCheck
              size={18}
              className="text-[#4f46e5]"
            />

            <p className="text-[#6b7280] font-medium text-sm">

              Active Seat Reservations

            </p>

          </div>

          <h1 className="text-[65px] lg:text-[85px] leading-[0.95] font-black tracking-tight text-[#111827] mb-6">

            My
            <br />

            <span className="bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] bg-clip-text text-transparent">

              Bookings

            </span>

          </h1>

          <p className="text-xl text-[#6b7280] leading-relaxed max-w-2xl">

            View, track and manage your active library study space reservations.

          </p>

        </div>

        {

          mySeats.length === 0 ? (

            <div className="bg-white/80 backdrop-blur-2xl border border-white rounded-[36px] p-14 text-center shadow-[0_15px_50px_rgba(0,0,0,0.05)]">

              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#eef2ff] to-[#ede9fe] flex items-center justify-center mx-auto mb-8">

                <Armchair
                  size={40}
                  className="text-[#4f46e5]"
                />

              </div>

              <h2 className="text-4xl font-black tracking-tight text-[#111827] mb-5">

                No Active Bookings

              </h2>

              <p className="text-[#6b7280] text-lg">

                You currently have no reserved library seats.

              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {mySeats.map(
                (
                  seat,
                  index
                ) => (

                  <motion.div
                    key={seat._id}
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
                      delay:
                        index * 0.05,
                    }}
                    whileHover={{
                      y: -8,
                    }}
                    className="bg-white/80 backdrop-blur-2xl border border-white rounded-[34px] p-8 shadow-[0_15px_50px_rgba(0,0,0,0.05)] transition duration-500"
                  >

                    {/* TOP */}

                    <div className="flex justify-between items-start mb-8">

                      <div>

                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#eef2ff] to-[#ede9fe] flex items-center justify-center mb-5">

                          <Armchair
                            size={28}
                            className="text-[#4f46e5]"
                          />

                        </div>

                        <h2 className="text-4xl font-black tracking-tight text-[#111827] mb-3">

                          Seat
                          {" "}
                          {
                            seat.seatNumber
                          }

                        </h2>

                        <p className="text-[#6b7280] font-medium">

                          Floor:
                          {" "}
                          {
                            seat.floor
                          }

                        </p>

                        <p className="text-[#9ca3af] mt-2">

                          {
                            seat.section
                          }

                        </p>

                      </div>

                      <div className="bg-green-100 text-green-700 px-5 py-2 rounded-full text-sm font-semibold">

                        Active

                      </div>

                    </div>

                    {/* TIMINGS */}

                    <div className="space-y-5 mb-8">

                      <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-2xl p-5">

                        <div className="flex items-center gap-3 mb-3">

                          <Clock3
                            size={18}
                            className="text-[#4f46e5]"
                          />

                          <p className="text-[#9ca3af] text-sm font-medium">

                            Booked At

                          </p>

                        </div>

                        <p className="text-[#111827] font-semibold">

                          {
                            new Date(
                              seat.bookedAt
                            ).toLocaleString()
                          }

                        </p>

                      </div>

                      <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-2xl p-5">

                        <div className="flex items-center gap-3 mb-3">

                          <Clock3
                            size={18}
                            className="text-[#7c3aed]"
                          />

                          <p className="text-[#9ca3af] text-sm font-medium">

                            Expires At

                          </p>

                        </div>

                        <p className="text-[#111827] font-semibold">

                          {
                            new Date(
                              seat.expiryTime
                            ).toLocaleString()
                          }

                        </p>

                      </div>

                    </div>

                    {/* BUTTON */}

                    <button
                      onClick={() =>
                        releaseSeat(
                          seat._id
                        )
                      }
                      className="w-full bg-gradient-to-r from-red-500 to-rose-500 text-white py-4 rounded-2xl font-semibold shadow-[0_10px_30px_rgba(239,68,68,0.25)] hover:scale-[1.02] transition duration-300"
                    >

                      Release Seat

                    </button>

                  </motion.div>

                )
              )}

            </div>

          )

        }

      </div>

    </div>

  );

}