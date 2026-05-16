import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  Bus,
  Clock3,
  Route,
  Plus,
  Trash2,
  Pencil,
  Save,
} from "lucide-react";

import API from "../services/api";

export default function BusAdmin() {

  const [buses, setBuses] =
    useState([]);

  const [editingBus, setEditingBus] =
    useState(null);

  const [newBus, setNewBus] =
    useState({
      busNumber: "",
      route: "",
      departureTime: "",
      arrivalTime: "",
      status: "On Time",
    });

  // FETCH
  const fetchBuses =
    async () => {

      try {

        const res =
          await API.get("/buses");

        setBuses(res.data);

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchBuses();

  }, []);

  // ADD
  const addBus =
    async () => {

      try {

        await API.post(
          "/buses",
          newBus
        );

        setNewBus({
          busNumber: "",
          route: "",
          departureTime: "",
          arrivalTime: "",
          status: "On Time",
        });

        fetchBuses();

      } catch (error) {

        console.log(error);

      }

    };

  // DELETE
  const deleteBus =
    async (id) => {

      try {

        await API.delete(
          `/buses/${id}`
        );

        fetchBuses();

      } catch (error) {

        console.log(error);

      }

    };

  // STATUS
  const updateStatus =
    async (id, status) => {

      try {

        await API.put(
          `/buses/${id}`,
          { status }
        );

        fetchBuses();

      } catch (error) {

        console.log(error);

      }

    };

  // SAVE EDIT
  const saveEdit =
    async () => {

      try {

        await API.put(
          `/buses/${editingBus._id}`,
          editingBus
        );

        setEditingBus(null);

        fetchBuses();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="min-h-screen bg-[#f6f7fb] px-8 py-8 font-['Outfit'] text-[#111111]">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-12">

          <p className="text-[#7b7b7b] mb-3 font-medium">

            Campus Transportation

          </p>

          <h1 className="text-6xl font-black tracking-tight mb-4">

            Bus Admin

          </h1>

          <p className="text-[#6f6f6f] text-lg">

            Manage bus timings, live status and routes.

          </p>

        </div>

        {/* ADD BUS */}

        <div className="bg-white border border-[#ececec] rounded-[36px] p-8 shadow-sm mb-12">

          <div className="flex items-center gap-3 mb-8">

            <div className="w-14 h-14 rounded-2xl bg-[#eef3ff] flex items-center justify-center">

              <Plus
                size={24}
                className="text-blue-600"
              />

            </div>

            <div>

              <h2 className="text-3xl font-black tracking-tight">

                Add New Bus

              </h2>

              <p className="text-[#7b7b7b]">

                Create and manage campus routes

              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">

            <input
              type="text"
              placeholder="Bus Number"
              value={newBus.busNumber}
              onChange={(e) =>
                setNewBus({
                  ...newBus,
                  busNumber:
                    e.target.value,
                })
              }
              className="bg-[#f8f8f8] border border-[#ececec] rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Route"
              value={newBus.route}
              onChange={(e) =>
                setNewBus({
                  ...newBus,
                  route:
                    e.target.value,
                })
              }
              className="bg-[#f8f8f8] border border-[#ececec] rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Departure"
              value={
                newBus.departureTime
              }
              onChange={(e) =>
                setNewBus({
                  ...newBus,
                  departureTime:
                    e.target.value,
                })
              }
              className="bg-[#f8f8f8] border border-[#ececec] rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Arrival"
              value={
                newBus.arrivalTime
              }
              onChange={(e) =>
                setNewBus({
                  ...newBus,
                  arrivalTime:
                    e.target.value,
                })
              }
              className="bg-[#f8f8f8] border border-[#ececec] rounded-2xl px-5 py-4 outline-none"
            />

            <button
              onClick={addBus}
              className="bg-[#111111] text-white rounded-2xl font-semibold hover:opacity-90 transition"
            >

              Add Bus

            </button>

          </div>

        </div>

        {/* BUS LIST */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {buses.map((bus) => (

            <motion.div
              key={bus._id}
              whileHover={{
                y: -3,
              }}
              className="bg-white border border-[#ececec] rounded-[36px] p-8 shadow-sm"
            >

              {/* TOP */}

              <div className="flex justify-between items-start mb-8">

                <div>

                  <div className="flex items-center gap-3 mb-4">

                    <div className="w-14 h-14 rounded-2xl bg-[#eef3ff] flex items-center justify-center">

                      <Bus
                        size={24}
                        className="text-blue-600"
                      />

                    </div>

                    <div>

                      <h2 className="text-4xl font-black tracking-tight">

                        Bus {bus.busNumber}

                      </h2>

                    </div>

                  </div>

                  {

                    editingBus &&
                    editingBus._id ===
                    bus._id ? (

                      <input
                        type="text"
                        value={
                          editingBus.route
                        }
                        onChange={(e) =>
                          setEditingBus({
                            ...editingBus,
                            route:
                              e.target.value,
                          })
                        }
                        className="bg-[#f8f8f8] border border-[#ececec] rounded-2xl px-5 py-4 outline-none w-full"
                      />

                    ) : (

                      <div className="flex items-center gap-2 text-[#6f6f6f]">

                        <Route size={18} />

                        <p>
                          {bus.route}
                        </p>

                      </div>

                    )

                  }

                </div>

                <div
                  className={`px-5 py-2 rounded-full text-sm font-semibold ${
                    bus.status ===
                    "On Time"
                      ? "bg-green-100 text-green-700"
                      : bus.status ===
                        "Delayed"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >

                  {bus.status}

                </div>

              </div>

              {/* TIMES */}

              <div className="grid grid-cols-2 gap-5 mb-8">

                <div className="bg-[#fafafa] border border-[#ececec] rounded-3xl p-5">

                  <div className="flex items-center gap-2 mb-3 text-[#7b7b7b]">

                    <Clock3 size={16} />

                    <p className="text-sm">
                      Departure
                    </p>

                  </div>

                  {

                    editingBus &&
                    editingBus._id ===
                    bus._id ? (

                      <input
                        type="text"
                        value={
                          editingBus.departureTime
                        }
                        onChange={(e) =>
                          setEditingBus({
                            ...editingBus,
                            departureTime:
                              e.target.value,
                          })
                        }
                        className="w-full bg-white border border-[#ececec] rounded-2xl px-4 py-3 outline-none"
                      />

                    ) : (

                      <h3 className="text-2xl font-black tracking-tight">

                        {
                          bus.departureTime
                        }

                      </h3>

                    )

                  }

                </div>

                <div className="bg-[#fafafa] border border-[#ececec] rounded-3xl p-5">

                  <div className="flex items-center gap-2 mb-3 text-[#7b7b7b]">

                    <Clock3 size={16} />

                    <p className="text-sm">
                      Arrival
                    </p>

                  </div>

                  {

                    editingBus &&
                    editingBus._id ===
                    bus._id ? (

                      <input
                        type="text"
                        value={
                          editingBus.arrivalTime
                        }
                        onChange={(e) =>
                          setEditingBus({
                            ...editingBus,
                            arrivalTime:
                              e.target.value,
                          })
                        }
                        className="w-full bg-white border border-[#ececec] rounded-2xl px-4 py-3 outline-none"
                      />

                    ) : (

                      <h3 className="text-2xl font-black tracking-tight">

                        {
                          bus.arrivalTime
                        }

                      </h3>

                    )

                  }

                </div>

              </div>

              {/* ACTIONS */}

              <div className="flex flex-wrap gap-3">

                <button
                  onClick={() =>
                    updateStatus(
                      bus._id,
                      "On Time"
                    )
                  }
                  className="bg-green-100 text-green-700 px-5 py-3 rounded-2xl font-semibold"
                >

                  On Time

                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      bus._id,
                      "Delayed"
                    )
                  }
                  className="bg-yellow-100 text-yellow-700 px-5 py-3 rounded-2xl font-semibold"
                >

                  Delayed

                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      bus._id,
                      "Cancelled"
                    )
                  }
                  className="bg-red-100 text-red-700 px-5 py-3 rounded-2xl font-semibold"
                >

                  Cancel

                </button>

                {

                  editingBus &&
                  editingBus._id ===
                  bus._id ? (

                    <button
                      onClick={saveEdit}
                      className="bg-blue-100 text-blue-700 px-5 py-3 rounded-2xl font-semibold flex items-center gap-2"
                    >

                      <Save size={16} />

                      Save

                    </button>

                  ) : (

                    <button
                      onClick={() =>
                        setEditingBus(bus)
                      }
                      className="bg-[#111111] text-white px-5 py-3 rounded-2xl font-semibold flex items-center gap-2"
                    >

                      <Pencil size={16} />

                      Edit

                    </button>

                  )

                }

                <button
                  onClick={() =>
                    deleteBus(bus._id)
                  }
                  className="bg-[#f3f4f6] text-[#111111] px-5 py-3 rounded-2xl font-semibold flex items-center gap-2"
                >

                  <Trash2 size={16} />

                  Delete

                </button>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </div>

  );

}