import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import {
  IndianRupee,
  ShoppingBag,
  Clock3,
  UtensilsCrossed,
  Package,
  Bus,
  Library,
  Pencil,
  Printer,
  Trash2,
  Plus,
  Minus,
} from "lucide-react";

import API from "../services/api";

export default function Admin() {

  const navigate =
    useNavigate();

  const [orders, setOrders] =
    useState([]);

  const [foods, setFoods] =
    useState([]);

  const [newFood, setNewFood] =
    useState({
      name: "",
      price: "",
      category: "",
      image: "",
      stock: "",
    });

  // FETCH ORDERS
  const fetchOrders =
    async () => {

      try {

        const res =
          await API.get(
            "/orders",
            {
              headers: {
                role: "admin",
              },
            }
          );

        setOrders(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  // FETCH FOODS
  const fetchFoods =
    async () => {

      try {

        const res =
          await API.get(
            "/foods"
          );

        setFoods(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchOrders();

    fetchFoods();

    const interval =
      setInterval(() => {

        fetchOrders();

        fetchFoods();

      }, 5000);

    return () =>
      clearInterval(
        interval
      );

  }, []);

  // STATS

  const totalRevenue =
    orders.reduce(
      (
        total,
        order
      ) =>
        total +
        (
          order.total || 0
        ),
      0
    );

  const completedOrders =
    orders.filter(
      (
        order
      ) =>
        order.status ===
        "Completed"
    ).length;

  const pendingOrders =
    orders.filter(
      (
        order
      ) =>
        order.status !==
        "Completed"
    ).length;

  const topSellingItem =
    useMemo(() => {

      const count = {};

      orders.forEach(
        (
          order
        ) => {

          order.items?.forEach(
            (
              item
            ) => {

              count[
                item.name
              ] =
                (
                  count[
                    item.name
                  ] || 0
                ) +
                item.quantity;

            }
          );

        }
      );

      let topItem =
        "No Orders";

      let max = 0;

      for (
        let item in count
      ) {

        if (
          count[item] >
          max
        ) {

          max =
            count[item];

          topItem =
            item;

        }

      }

      return topItem;

    }, [orders]);

  // UPDATE STATUS

  const updateStatus =
    async (
      id,
      status
    ) => {

      try {

        await API.put(
          `/orders/${id}`,
          {
            status,
          }
        );

        fetchOrders();

      } catch (error) {

        console.log(error);

      }

    };

  // ADD FOOD

  const addFood =
    async () => {

      try {

        await API.post(
          "/foods",
          {
            ...newFood,
            price:
              Number(
                newFood.price
              ),
            stock:
              Number(
                newFood.stock
              ),
          }
        );

        setNewFood({
          name: "",
          price: "",
          category: "",
          image: "",
          stock: "",
        });

        fetchFoods();

      } catch (error) {

        console.log(error);

      }

    };

  // DELETE FOOD

  const deleteFood =
    async (id) => {

      try {

        await API.delete(
          `/foods/${id}`
        );

        fetchFoods();

      } catch (error) {

        console.log(error);

      }

    };

  // STOCK

  const changeStock =
    async (
      id,
      currentStock,
      amount
    ) => {

      try {

        const updatedStock =
          Math.max(
            0,
            currentStock + amount
          );

        await API.put(
          `/foods/${id}`,
          {
            stock:
              updatedStock,
          }
        );

        fetchFoods();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="min-h-screen bg-[#f6f7fb] font-['Outfit'] text-[#111111] px-8 py-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-8 mb-12">

          <div>

            <p className="text-[#8b8b8b] mb-3 font-medium">

              CampusConnect Operations

            </p>

            <h1 className="text-6xl font-black tracking-tight mb-4">

              Admin Dashboard

            </h1>

            <p className="text-[#6f6f6f] text-lg">

              Manage campus services, inventory and orders.

            </p>

          </div>

          {/* MODULE BUTTONS */}

          <div className="flex flex-wrap gap-4">

            <button
              onClick={() =>
                navigate(
                  "/library-admin"
                )
              }
              className="bg-white border border-[#e8e8e8] px-5 py-3 rounded-2xl font-semibold hover:shadow-lg transition"
            >

              <div className="flex items-center gap-2">

                <Library size={18} />

                Library

              </div>

            </button>

            <button
              onClick={() =>
                navigate(
                  "/bus-admin"
                )
              }
              className="bg-white border border-[#e8e8e8] px-5 py-3 rounded-2xl font-semibold hover:shadow-lg transition"
            >

              <div className="flex items-center gap-2">

                <Bus size={18} />

                Bus

              </div>

            </button>

            <button
              onClick={() =>
                navigate(
                  "/stationery-admin"
                )
              }
              className="bg-white border border-[#e8e8e8] px-5 py-3 rounded-2xl font-semibold hover:shadow-lg transition"
            >

              <div className="flex items-center gap-2">

                <Pencil size={18} />

                Stationery

              </div>

            </button>

            <button
              onClick={() =>
                navigate(
                  "/print-admin"
                )
              }
              className="bg-[#111111] text-white px-5 py-3 rounded-2xl font-semibold hover:opacity-90 transition"
            >

              <div className="flex items-center gap-2">

                <Printer size={18} />

                Print

              </div>

            </button>

          </div>

        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">

          <div className="bg-white border border-[#ececec] rounded-[32px] p-7 shadow-sm">

            <div className="w-14 h-14 rounded-2xl bg-[#f3f4f6] flex items-center justify-center mb-5">

              <IndianRupee size={24} />

            </div>

            <p className="text-[#7b7b7b] mb-3">

              Total Revenue

            </p>

            <h2 className="text-5xl font-black tracking-tight">

              ₹{totalRevenue}

            </h2>

          </div>

          <div className="bg-white border border-[#ececec] rounded-[32px] p-7 shadow-sm">

            <div className="w-14 h-14 rounded-2xl bg-[#eefbf1] flex items-center justify-center mb-5">

              <ShoppingBag
                size={24}
                className="text-green-600"
              />

            </div>

            <p className="text-[#7b7b7b] mb-3">

              Completed Orders

            </p>

            <h2 className="text-5xl font-black tracking-tight">

              {completedOrders}

            </h2>

          </div>

          <div className="bg-white border border-[#ececec] rounded-[32px] p-7 shadow-sm">

            <div className="w-14 h-14 rounded-2xl bg-[#fff7eb] flex items-center justify-center mb-5">

              <Clock3
                size={24}
                className="text-orange-500"
              />

            </div>

            <p className="text-[#7b7b7b] mb-3">

              Pending Orders

            </p>

            <h2 className="text-5xl font-black tracking-tight">

              {pendingOrders}

            </h2>

          </div>

          <div className="bg-white border border-[#ececec] rounded-[32px] p-7 shadow-sm">

            <div className="w-14 h-14 rounded-2xl bg-[#f5f3ff] flex items-center justify-center mb-5">

              <UtensilsCrossed
                size={24}
                className="text-violet-600"
              />

            </div>

            <p className="text-[#7b7b7b] mb-3">

              Most Ordered

            </p>

            <h2 className="text-3xl font-black tracking-tight">

              {topSellingItem}

            </h2>

          </div>

        </div>

        {/* MAIN GRID */}

        <div className="grid xl:grid-cols-3 gap-8 mb-12">

          {/* ADD FOOD */}

          <div className="bg-white border border-[#ececec] rounded-[36px] p-8 shadow-sm h-fit">

            <h2 className="text-3xl font-black tracking-tight mb-8">

              Add Food Item

            </h2>

            <div className="space-y-5">

              <input
                type="text"
                placeholder="Food Name"
                value={newFood.name}
                onChange={(e) =>
                  setNewFood({
                    ...newFood,
                    name:
                      e.target.value,
                  })
                }
                className="w-full bg-[#f8f8f8] border border-[#ececec] rounded-2xl px-5 py-4 outline-none"
              />

              <input
                type="number"
                placeholder="Price"
                value={newFood.price}
                onChange={(e) =>
                  setNewFood({
                    ...newFood,
                    price:
                      e.target.value,
                  })
                }
                className="w-full bg-[#f8f8f8] border border-[#ececec] rounded-2xl px-5 py-4 outline-none"
              />

              <input
                type="text"
                placeholder="Category"
                value={newFood.category}
                onChange={(e) =>
                  setNewFood({
                    ...newFood,
                    category:
                      e.target.value,
                  })
                }
                className="w-full bg-[#f8f8f8] border border-[#ececec] rounded-2xl px-5 py-4 outline-none"
              />

              <input
                type="text"
                placeholder="Image URL"
                value={newFood.image}
                onChange={(e) =>
                  setNewFood({
                    ...newFood,
                    image:
                      e.target.value,
                  })
                }
                className="w-full bg-[#f8f8f8] border border-[#ececec] rounded-2xl px-5 py-4 outline-none"
              />

              <input
                type="number"
                placeholder="Stock"
                value={newFood.stock}
                onChange={(e) =>
                  setNewFood({
                    ...newFood,
                    stock:
                      e.target.value,
                  })
                }
                className="w-full bg-[#f8f8f8] border border-[#ececec] rounded-2xl px-5 py-4 outline-none"
              />

              <button
                onClick={addFood}
                className="w-full bg-[#111111] text-white py-4 rounded-2xl font-semibold hover:opacity-90 transition"
              >

                Add Item

              </button>

            </div>

          </div>

          {/* INVENTORY */}

          <div className="xl:col-span-2 bg-white border border-[#ececec] rounded-[36px] p-8 shadow-sm">

            <div className="flex justify-between items-center mb-8">

              <div>

                <h2 className="text-3xl font-black tracking-tight mb-2">

                  Inventory

                </h2>

                <p className="text-[#7b7b7b]">

                  {foods.length} Items

                </p>

              </div>

            </div>

            <div className="space-y-5 max-h-[700px] overflow-y-auto pr-2">

              {foods.map(
                (food) => (

                  <motion.div
                    key={food._id}
                    whileHover={{
                      y: -2,
                    }}
                    className="bg-[#fafafa] border border-[#ececec] rounded-3xl p-5 flex flex-col lg:flex-row gap-5 lg:items-center"
                  >

                    <div className="w-28 h-28 rounded-3xl overflow-hidden bg-gray-200 shrink-0">

                      <img
                        src={
                          food.image &&
                          food.image.startsWith("http")
                            ? food.image
                            : `/food/${food.image}`
                        }
                        alt={food.name}
                        className="w-full h-full object-cover"
                      />

                    </div>

                    <div className="flex-1">

                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">

                        <div>

                          <h3 className="text-2xl font-black tracking-tight mb-2">

                            {food.name}

                          </h3>

                          <p className="text-[#7b7b7b] mb-1">

                            {food.category}

                          </p>

                          <p className="font-semibold">

                            ₹{food.price}

                          </p>

                        </div>

                        <div className="flex items-center gap-4">

                          <button
                            onClick={() =>
                              changeStock(
                                food._id,
                                food.stock,
                                -1
                              )
                            }
                            className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center"
                          >

                            <Minus size={16} />

                          </button>

                          <div className="bg-white border border-[#ececec] px-5 py-2 rounded-2xl font-bold">

                            {food.stock}

                          </div>

                          <button
                            onClick={() =>
                              changeStock(
                                food._id,
                                food.stock,
                                1
                              )
                            }
                            className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center"
                          >

                            <Plus size={16} />

                          </button>

                        </div>

                      </div>

                    </div>

                    <button
                      onClick={() =>
                        deleteFood(
                          food._id
                        )
                      }
                      className="bg-red-50 border border-red-200 text-red-600 px-5 py-3 rounded-2xl font-semibold hover:bg-red-100 transition"
                    >

                      <div className="flex items-center gap-2">

                        <Trash2 size={16} />

                        Delete

                      </div>

                    </button>

                  </motion.div>

                )
              )}

            </div>

          </div>

        </div>

        {/* ORDERS */}

        <div className="bg-white border border-[#ececec] rounded-[36px] p-8 shadow-sm">

          <div className="flex justify-between items-center mb-10">

            <div>

              <h2 className="text-4xl font-black tracking-tight mb-2">

                Orders

              </h2>

              <p className="text-[#7b7b7b]">

                {orders.length} Active Orders

              </p>

            </div>

          </div>

          <div className="space-y-6">

            {orders.map(
              (order) => (

                <div
                  key={order._id}
                  className="bg-[#fafafa] border border-[#ececec] rounded-3xl p-6"
                >

                  <div className="flex flex-col xl:flex-row xl:justify-between gap-8">

                    <div className="flex-1">

                      <div className="flex flex-wrap items-center gap-4 mb-4">

                        <h3 className="text-2xl font-black tracking-tight">

                          {order.userName || "Student"}

                        </h3>

                        <div className="bg-white border border-[#ececec] px-4 py-2 rounded-full text-sm font-semibold">

                          {order.status}

                        </div>

                      </div>

                      <p className="text-4xl font-black tracking-tight mb-4">

                        ₹{order.total}

                      </p>

                      <div className="space-y-2">

                        {order.items?.map(
                          (
                            item,
                            index
                          ) => (

                            <div
                              key={index}
                              className="text-[#6f6f6f]"
                            >

                              {item.name}
                              {" "}
                              ×
                              {" "}
                              {item.quantity}

                            </div>

                          )
                        )}

                      </div>

                    </div>

                    <div className="flex flex-wrap gap-3 h-fit">

                      <button
                        onClick={() =>
                          updateStatus(
                            order._id,
                            "Preparing"
                          )
                        }
                        className="bg-yellow-100 text-yellow-700 px-5 py-3 rounded-2xl font-semibold"
                      >

                        Preparing

                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            order._id,
                            "Ready"
                          )
                        }
                        className="bg-blue-100 text-blue-700 px-5 py-3 rounded-2xl font-semibold"
                      >

                        Ready

                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            order._id,
                            "Completed"
                          )
                        }
                        className="bg-green-100 text-green-700 px-5 py-3 rounded-2xl font-semibold"
                      >

                        Delivered

                      </button>

                    </div>

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