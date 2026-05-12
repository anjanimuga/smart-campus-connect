import { useEffect, useState } from "react";
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

    <div className="min-h-screen bg-[#151312] text-white px-8 py-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-12">

          <h1 className="text-5xl font-semibold mb-3">
            Bus Admin
          </h1>

          <p className="text-gray-400">
            Manage buses and timings.
          </p>

        </div>

        {/* ADD BUS */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-12">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

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
              className="bg-black border border-white/10 rounded-2xl px-4 py-3 outline-none"
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
              className="bg-black border border-white/10 rounded-2xl px-4 py-3 outline-none"
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
              className="bg-black border border-white/10 rounded-2xl px-4 py-3 outline-none"
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
              className="bg-black border border-white/10 rounded-2xl px-4 py-3 outline-none"
            />

            <button
              onClick={addBus}
              className="bg-white text-black rounded-2xl font-semibold"
            >
              Add Bus
            </button>

          </div>

        </div>

        {/* BUS LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {buses.map((bus) => (

            <div
              key={bus._id}
              className="bg-white/5 border border-white/10 rounded-3xl p-8"
            >

              <div className="flex justify-between items-start mb-6">

                <div>

                  <h2 className="text-3xl font-semibold mb-2">

                    Bus {bus.busNumber}

                  </h2>

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
                        className="bg-black border border-white/10 rounded-xl px-4 py-3 outline-none"
                      />

                    ) : (

                      <p className="text-gray-400">

                        {bus.route}

                      </p>

                    )

                  }

                </div>

                <div className="bg-white/10 px-4 py-2 rounded-full text-sm">

                  {bus.status}

                </div>

              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">

                <div className="bg-black rounded-2xl p-4">

                  <p className="text-gray-500 text-sm mb-2">
                    Departure
                  </p>

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
                        className="w-full bg-[#151312] border border-white/10 rounded-xl px-4 py-3 outline-none"
                      />

                    ) : (

                      <h3 className="text-xl font-semibold">

                        {
                          bus.departureTime
                        }

                      </h3>

                    )

                  }

                </div>

                <div className="bg-black rounded-2xl p-4">

                  <p className="text-gray-500 text-sm mb-2">
                    Arrival
                  </p>

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
                        className="w-full bg-[#151312] border border-white/10 rounded-xl px-4 py-3 outline-none"
                      />

                    ) : (

                      <h3 className="text-xl font-semibold">

                        {
                          bus.arrivalTime
                        }

                      </h3>

                    )

                  }

                </div>

              </div>

              <div className="flex flex-wrap gap-3">

                <button
                  onClick={() =>
                    updateStatus(
                      bus._id,
                      "On Time"
                    )
                  }
                  className="bg-green-500 text-black px-4 py-3 rounded-2xl font-semibold"
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
                  className="bg-yellow-500 text-black px-4 py-3 rounded-2xl font-semibold"
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
                  className="bg-red-500 text-white px-4 py-3 rounded-2xl font-semibold"
                >
                  Cancel
                </button>

                {

                  editingBus &&
                  editingBus._id ===
                  bus._id ? (

                    <button
                      onClick={saveEdit}
                      className="bg-blue-500 text-white px-4 py-3 rounded-2xl font-semibold"
                    >
                      Save
                    </button>

                  ) : (

                    <button
                      onClick={() =>
                        setEditingBus(bus)
                      }
                      className="bg-white text-black px-4 py-3 rounded-2xl font-semibold"
                    >
                      Edit
                    </button>

                  )

                }

                <button
                  onClick={() =>
                    deleteBus(bus._id)
                  }
                  className="bg-gray-700 text-white px-4 py-3 rounded-2xl font-semibold"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}