import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import API from "../services/api";

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

        alert(
          "Seat booked successfully"
        );

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data?.message ||
          "Booking failed"
        );

      }

    };

  return (

    <div className="min-h-screen bg-[#151312] text-white px-8 py-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-12">

          <div>

            <h1 className="text-5xl font-semibold mb-3">
              Library Seats
            </h1>

            <p className="text-gray-400">
              Reserve your study space in real time.
            </p>

          </div>

          <div className="flex gap-4">

            <button
              onClick={() =>
                navigate(
                  "/book-search"
                )
              }
              className="bg-white/10 border border-white/10 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition"
            >
              Search Books
            </button>

            <button
              onClick={() =>
                navigate(
                  "/my-library-bookings"
                )
              }
              className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
            >
              My Library Bookings
            </button>

          </div>

        </div>

        {/* SEAT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {seats.map(
            (seat) => (

              <div
                key={seat._id}
                className="bg-white/5 border border-white/10 rounded-3xl p-6"
              >

                {/* TOP */}
                <div className="flex justify-between items-start mb-6">

                  <div>

                    <h2 className="text-3xl font-semibold mb-2">

                      Seat
                      {" "}
                      {
                        seat.seatNumber
                      }

                    </h2>

                    <p className="text-gray-400">

                      Floor:
                      {" "}
                      {
                        seat.floor
                      }

                    </p>

                    <p className="text-gray-400 mt-1">

                      {
                        seat.section
                      }

                    </p>

                  </div>

                  {/* STATUS */}
                  {

                    seat.isBooked ? (

                      <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm">

                        Occupied

                      </div>

                    ) : (

                      <div className="bg-green-500 text-black px-4 py-2 rounded-full text-sm font-semibold">

                        Available

                      </div>

                    )

                  }

                </div>

                {/* BOOKED BY */}
                {

                  seat.isBooked && (

                    <div className="mb-6">

                      <p className="text-gray-400 text-sm">
                        Booked By
                      </p>

                      <p className="text-lg mt-1">
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
                      className="w-full bg-gray-700 text-gray-400 py-4 rounded-2xl cursor-not-allowed"
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
                      className="w-full bg-white text-black py-4 rounded-2xl font-semibold hover:bg-gray-200 transition"
                    >

                      Book Seat

                    </button>

                  )

                }

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );

}