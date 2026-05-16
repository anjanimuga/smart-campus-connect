import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import {
  LibraryBig,
  Search,
  BookmarkCheck,
  Armchair,
} from "lucide-react";

import API from "../services/api";

import toast from "react-hot-toast";

export default function Library() {

  const navigate =
    useNavigate();

  const [seats, setSeats] =
    useState([]);

  // FETCH SEATS
  const fetchSeats =
    async () => {

      try {

        const res =
          await API.get(
            "/library"
          );

        setSeats(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchSeats();

    // LIVE REFRESH
    const interval =
      setInterval(() => {

        fetchSeats();

      }, 3000);

    return () =>
      clearInterval(
        interval
      );

  }, []);

  // BOOK SEAT
  const bookSeat =
    async (id) => {

      try {

        const user =
          JSON.parse(
            localStorage.getItem(
              "user"
            )
          );

        await API.put(
          `/library/book/${id}`,
          {
            bookedBy:
              user.name,
            bookedById:
              user._id,
          }
        );

        fetchSeats();

       toast.success("Seat booked successfully")

      } catch (error) {

        console.log(error);
toast.error(
  error.response?.data?.message ||
  "Booking failed"
)
      }

    };

  return (

    <div className="min-h-screen bg-[#f6f7fb] px-8 py-10 font-['Outfit'] overflow-hidden relative">

      {/* BACKGROUND LIGHTS */}

      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-3xl" />

      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-violet-100/40 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8 mb-16">

          <div>

            <div className="inline-flex items-center gap-3 bg-white border border-[#e5e7eb] px-5 py-3 rounded-full shadow-sm mb-6">

              <LibraryBig
                size={18}
                className="text-[#4f46e5]"
              />

              <p className="text-[#6b7280] font-medium text-sm">

                Smart Study Spaces

              </p>

            </div>

            <h1 className="text-[70px] lg:text-[90px] leading-[0.95] font-black tracking-tight text-[#111827] mb-6">

              Campus
              <br />

              <span className="bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] bg-clip-text text-transparent">

                Library

              </span>

            </h1>

            <p className="text-xl text-[#6b7280] leading-relaxed max-w-2xl">

              Reserve premium study spaces, explore books and manage your library experience in real time.

            </p>

          </div>

          {/* BUTTONS */}

          <div className="flex flex-wrap gap-5">

            <button
              onClick={() =>
                navigate(
                  "/book-search"
                )
              }
              className="flex items-center gap-3 bg-white border border-[#e5e7eb] text-[#111827] px-7 py-4 rounded-full font-semibold shadow-sm hover:scale-105 transition duration-300"
            >

              <Search size={18} />

              Search Books

            </button>

            <button
              onClick={() =>
                navigate(
                  "/my-library-bookings"
                )
              }
              className="flex items-center gap-3 bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] text-white px-7 py-4 rounded-full font-semibold shadow-[0_10px_40px_rgba(124,58,237,0.25)] hover:scale-105 transition duration-300"
            >

              <BookmarkCheck size={18} />

              My Bookings

            </button>

          </div>

        </div>

        {/* SEATS GRID */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {seats.map(
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
                className="bg-white/80 backdrop-blur-2xl border border-white rounded-[34px] p-7 shadow-[0_15px_50px_rgba(0,0,0,0.05)] transition duration-500"
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

                  {/* STATUS */}

                  {

                    seat.isBooked ? (

                      <div className="bg-red-100 text-red-600 px-5 py-2 rounded-full text-sm font-semibold">

                        Occupied

                      </div>

                    ) : (

                      <div className="bg-green-100 text-green-700 px-5 py-2 rounded-full text-sm font-semibold">

                        Available

                      </div>

                    )

                  }

                </div>

                {/* BOOKED BY */}

                {

                  seat.isBooked && (

                    <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-2xl p-5 mb-7">

                      <p className="text-[#9ca3af] text-sm mb-2">

                        Booked By

                      </p>

                      <p className="text-lg font-semibold text-[#111827]">

                        {
                          seat.bookedBy
                        }

                      </p>

                    </div>

                  )

                }

                {/* BUTTON */}

                {

                  seat.isBooked ? (

                    <button
                      disabled
                      className="w-full bg-[#eef2f7] text-[#9ca3af] py-4 rounded-2xl font-semibold cursor-not-allowed"
                    >

                      Unavailable

                    </button>

                  ) : (

                    <button
                      onClick={() =>
                        bookSeat(
                          seat._id
                        )
                      }
                      className="w-full bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] text-white py-4 rounded-2xl font-semibold shadow-[0_10px_30px_rgba(124,58,237,0.25)] hover:scale-[1.02] transition duration-300"
                    >

                      Book Seat

                    </button>

                  )

                }

              </motion.div>

            )
          )}

        </div>

      </div>

    </div>

  );

}