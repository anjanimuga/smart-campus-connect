import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import API from "../services/api";

export default function LibraryAdmin() {

  const navigate =
    useNavigate();

  const [seats, setSeats] =
    useState([]);

  const [newSeat, setNewSeat] =
    useState({
      seatNumber: "",
      floor: "",
      section: "",
    });

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

    const interval =
      setInterval(() => {

        fetchSeats();

      }, 3000);

    return () =>
      clearInterval(
        interval
      );

  }, []);

  // ADD SEAT
  const addSeat =
    async () => {

      try {

        await API.post(
          "/library",
          newSeat
        );

        setNewSeat({
          seatNumber: "",
          floor: "",
          section: "",
        });

        fetchSeats();

      } catch (error) {

        console.log(error);

      }

    };

  // DELETE SEAT
  const deleteSeat =
    async (id) => {

      try {

        await API.delete(
          `/library/${id}`
        );

        fetchSeats();

      } catch (error) {

        console.log(error);

      }

    };

  // RELEASE SEAT
  const releaseSeat =
    async (id) => {

      try {

        await API.put(
          `/library/release/${id}`
        );

        fetchSeats();

      } catch (error) {

        console.log(error);

      }

    };

  // ANALYTICS
  const totalSeats =
    seats.length;

  const occupiedSeats =
    seats.filter(
      (seat) =>
        seat.isBooked
    ).length;

  const availableSeats =
    totalSeats -
    occupiedSeats;

  return (

    <div className="min-h-screen bg-[#151312] text-white px-8 py-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-14">

          <div>

            <h1 className="text-5xl font-semibold mb-3">
              Library Admin
            </h1>

            <p className="text-gray-400 text-lg">
              Manage library seating and bookings.
            </p>

          </div>

         <button
  onClick={() =>
    navigate(
      "/book-admin"
    )
  }
  className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
>
  Book Inventory
</button>

        </div>

        {/* ANALYTICS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <p className="text-gray-400 mb-3">
              Total Seats
            </p>

            <h2 className="text-5xl font-semibold">
              {totalSeats}
            </h2>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <p className="text-gray-400 mb-3">
              Occupied Seats
            </p>

            <h2 className="text-5xl font-semibold text-red-400">
              {occupiedSeats}
            </h2>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <p className="text-gray-400 mb-3">
              Available Seats
            </p>

            <h2 className="text-5xl font-semibold text-green-400">
              {availableSeats}
            </h2>

          </div>

        </div>

        {/* ADD SEAT */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-14">

          <h2 className="text-3xl font-semibold mb-8">
            Add Library Seat
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <input
              type="text"
              placeholder="Seat Number"
              value={
                newSeat.seatNumber
              }
              onChange={(e) =>
                setNewSeat({
                  ...newSeat,
                  seatNumber:
                    e.target.value,
                })
              }
              className="bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Floor"
              value={
                newSeat.floor
              }
              onChange={(e) =>
                setNewSeat({
                  ...newSeat,
                  floor:
                    e.target.value,
                })
              }
              className="bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Section"
              value={
                newSeat.section
              }
              onChange={(e) =>
                setNewSeat({
                  ...newSeat,
                  section:
                    e.target.value,
                })
              }
              className="bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

          </div>

          <button
            onClick={addSeat}
            className="mt-8 bg-white text-black px-7 py-4 rounded-full font-semibold hover:bg-gray-200 transition"
          >
            Add Seat
          </button>

        </div>

        {/* SEATS */}
        <div>

          <h2 className="text-4xl font-semibold mb-8">
            Library Seats
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {seats.map(
              (seat) => (

                <div
                  key={seat._id}
                  className="bg-white/5 border border-white/10 rounded-3xl p-7"
                >

                  <div className="flex justify-between items-start mb-6">

                    <div>

                      <h2 className="text-3xl font-semibold mb-2">

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

                  <div className="flex gap-4">

                    {

                      seat.isBooked && (

                        <button
                          onClick={() =>
                            releaseSeat(
                              seat._id
                            )
                          }
                          className="flex-1 bg-yellow-500 text-black py-3 rounded-2xl font-semibold"
                        >

                          Release

                        </button>

                      )

                    }

                    <button
                      onClick={() =>
                        deleteSeat(
                          seat._id
                        )
                      }
                      className="flex-1 bg-red-500 text-white py-3 rounded-2xl font-semibold"
                    >

                      Delete

                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      </div>

    </div>

  );

}