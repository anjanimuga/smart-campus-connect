import {
  useEffect,
  useState,
} from "react";

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

    <div className="min-h-screen bg-[#151312] text-white px-8 py-10">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-12">

          <h1 className="text-5xl font-semibold mb-3">
            My Library Bookings
          </h1>

          <p className="text-gray-400">
            View and manage your reserved seats.
          </p>

        </div>

        {

          mySeats.length === 0 ? (

            <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center">

              <h2 className="text-3xl font-semibold mb-4">

                No Active Bookings

              </h2>

              <p className="text-gray-400">

                You have not booked any library seats yet.

              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {mySeats.map(
                (seat) => (

                  <div
                    key={seat._id}
                    className="bg-white/5 border border-white/10 rounded-3xl p-8"
                  >

                    <div className="flex justify-between items-start mb-8">

                      <div>

                        <h2 className="text-4xl font-semibold mb-3">

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

                        <p className="text-gray-400 mt-2">

                          {
                            seat.section
                          }

                        </p>

                      </div>

                      <div className="bg-green-500 text-black px-4 py-2 rounded-full font-semibold">

                        Active

                      </div>

                    </div>

                    <div className="space-y-4 mb-8">

                      <div>

                        <p className="text-gray-500 text-sm">
                          Booked At
                        </p>

                        <p className="mt-1">
                          {
                            new Date(
                              seat.bookedAt
                            ).toLocaleString()
                          }
                        </p>

                      </div>

                      <div>

                        <p className="text-gray-500 text-sm">
                          Expires At
                        </p>

                        <p className="mt-1">
                          {
                            new Date(
                              seat.expiryTime
                            ).toLocaleString()
                          }
                        </p>

                      </div>

                    </div>

                    <button
                      onClick={() =>
                        releaseSeat(
                          seat._id
                        )
                      }
                      className="w-full bg-red-500 text-white py-4 rounded-2xl font-semibold hover:bg-red-600 transition"
                    >

                      Release Seat

                    </button>

                  </div>

                )
              )}

            </div>

          )

        }

      </div>

    </div>

  );

}