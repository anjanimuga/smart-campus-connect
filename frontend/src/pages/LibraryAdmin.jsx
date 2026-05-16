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
  Armchair,
  Plus,
  Trash2,
  Unlock,
  Users,
  CheckCircle2,
  XCircle,
} from "lucide-react";

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

    <div className="min-h-screen bg-[#f6f7fb] px-8 py-8 font-['Outfit'] text-[#111111]">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-8 mb-14">

          <div>

            <p className="text-[#7b7b7b] mb-3 font-medium">

              Campus Library Management

            </p>

            <h1 className="text-6xl font-black tracking-tight mb-4">

              Library Admin

            </h1>

            <p className="text-[#6d6d6d] text-lg">

              Manage seat availability and student bookings.

            </p>

          </div>

          <button
            onClick={() =>
              navigate(
                "/book-admin"
              )
            }
            className="bg-[#111111] text-white px-7 py-4 rounded-2xl font-semibold hover:opacity-90 transition flex items-center gap-3 w-fit"
          >

            <LibraryBig size={20} />

            Book Inventory

          </button>

        </div>

        {/* ANALYTICS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">

          <div className="bg-white border border-[#ececec] rounded-[32px] p-8 shadow-sm">

            <div className="w-16 h-16 rounded-3xl bg-[#f4f4f4] flex items-center justify-center mb-6">

              <Armchair size={28} />

            </div>

            <p className="text-[#7a7a7a] mb-3">

              Total Seats

            </p>

            <h2 className="text-5xl font-black tracking-tight">

              {totalSeats}

            </h2>

          </div>

          <div className="bg-white border border-[#ececec] rounded-[32px] p-8 shadow-sm">

            <div className="w-16 h-16 rounded-3xl bg-red-50 flex items-center justify-center mb-6">

              <Users
                size={28}
                className="text-red-500"
              />

            </div>

            <p className="text-[#7a7a7a] mb-3">

              Occupied Seats

            </p>

            <h2 className="text-5xl font-black tracking-tight text-red-500">

              {occupiedSeats}

            </h2>

          </div>

          <div className="bg-white border border-[#ececec] rounded-[32px] p-8 shadow-sm">

            <div className="w-16 h-16 rounded-3xl bg-green-50 flex items-center justify-center mb-6">

              <CheckCircle2
                size={28}
                className="text-green-600"
              />

            </div>

            <p className="text-[#7a7a7a] mb-3">

              Available Seats

            </p>

            <h2 className="text-5xl font-black tracking-tight text-green-600">

              {availableSeats}

            </h2>

          </div>

        </div>

        {/* ADD SEAT */}

        <div className="bg-white border border-[#ececec] rounded-[36px] p-8 shadow-sm mb-14">

          <div className="flex items-center gap-4 mb-8">

            <div className="w-16 h-16 rounded-3xl bg-[#eef2ff] flex items-center justify-center">

              <Plus
                size={28}
                className="text-blue-600"
              />

            </div>

            <div>

              <h2 className="text-3xl font-black tracking-tight">

                Add Library Seat

              </h2>

              <p className="text-[#7a7a7a]">

                Create new study seating areas

              </p>

            </div>

          </div>

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
              className="bg-[#f8f8f8] border border-[#ececec] rounded-2xl px-5 py-4 outline-none"
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
              className="bg-[#f8f8f8] border border-[#ececec] rounded-2xl px-5 py-4 outline-none"
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
              className="bg-[#f8f8f8] border border-[#ececec] rounded-2xl px-5 py-4 outline-none"
            />

          </div>

          <button
            onClick={addSeat}
            className="mt-8 bg-[#111111] text-white px-8 py-4 rounded-2xl font-semibold hover:opacity-90 transition"
          >

            Add Seat

          </button>

        </div>

        {/* SEAT GRID */}

        <div>

          <div className="flex items-center gap-4 mb-10">

            <div className="w-16 h-16 rounded-3xl bg-[#eef2ff] flex items-center justify-center">

              <LibraryBig
                size={28}
                className="text-blue-600"
              />

            </div>

            <div>

              <h2 className="text-5xl font-black tracking-tight">

                Library Seats

              </h2>

              <p className="text-[#7a7a7a] mt-1">

                Live seat booking management

              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {seats.map(
              (seat) => (

                <motion.div
                  key={seat._id}
                  whileHover={{
                    y: -4,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="bg-white border border-[#ececec] rounded-[32px] p-7 shadow-sm"
                >

                  {/* TOP */}

                  <div className="flex justify-between items-start mb-8">

                    <div>

                      <h2 className="text-4xl font-black tracking-tight mb-3">

                        {
                          seat.seatNumber
                        }

                      </h2>

                      <p className="text-[#6d6d6d]">

                        Floor:
                        {" "}
                        {
                          seat.floor
                        }

                      </p>

                      <p className="text-[#6d6d6d] mt-1">

                        {
                          seat.section
                        }

                      </p>

                    </div>

                    {

                      seat.isBooked ? (

                        <div className="bg-red-50 text-red-600 px-4 py-2 rounded-2xl text-sm font-semibold flex items-center gap-2">

                          <XCircle size={16} />

                          Occupied

                        </div>

                      ) : (

                        <div className="bg-green-50 text-green-600 px-4 py-2 rounded-2xl text-sm font-semibold flex items-center gap-2">

                          <CheckCircle2 size={16} />

                          Available

                        </div>

                      )

                    }

                  </div>

                  {/* BOOKED BY */}

                  {

                    seat.isBooked && (

                      <div className="bg-[#fafafa] border border-[#ececec] rounded-3xl p-5 mb-6">

                        <p className="text-[#8a8a8a] text-sm mb-2">

                          Booked By

                        </p>

                        <p className="text-xl font-semibold">

                          {
                            seat.bookedBy
                          }

                        </p>

                      </div>

                    )

                  }

                  {/* BUTTONS */}

                  <div className="flex gap-4">

                    {

                      seat.isBooked && (

                        <button
                          onClick={() =>
                            releaseSeat(
                              seat._id
                            )
                          }
                          className="flex-1 bg-amber-100 text-amber-700 py-4 rounded-2xl font-semibold hover:bg-amber-200 transition flex items-center justify-center gap-2"
                        >

                          <Unlock size={18} />

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
                      className="flex-1 bg-red-50 text-red-600 py-4 rounded-2xl font-semibold hover:bg-red-100 transition flex items-center justify-center gap-2"
                    >

                      <Trash2 size={18} />

                      Delete

                    </button>

                  </div>

                </motion.div>

              )
            )}

          </div>

        </div>

      </div>

    </div>

  );

}