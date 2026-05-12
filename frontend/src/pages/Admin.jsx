import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

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

  // DASHBOARD STATS
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

  // CHANGE STOCK
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

    <div className="min-h-screen bg-black text-white px-6 py-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-10">

          <div>

            <h1 className="text-5xl font-bold mb-3">
              Admin Dashboard
            </h1>

            <p className="text-gray-400">
              CampusConnect Canteen Analytics
            </p>

          </div>

          <div className="flex gap-4 flex-wrap">

            <button
              onClick={() =>
                navigate(
                  "/library-admin"
                )
              }
              className="bg-white/10 border border-white/10 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition"
            >
              Library Admin
            </button>

            <button
              onClick={() =>
                navigate(
                  "/bus-admin"
                )
              }
              className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
            >
              Bus Admin
            </button>

          </div>

        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">

          <div className="bg-[#111111] border border-white/10 rounded-3xl p-6">

            <p className="text-gray-400 mb-3">
              Total Revenue
            </p>

            <h2 className="text-4xl font-bold">
              ₹{totalRevenue}
            </h2>

          </div>

          <div className="bg-[#111111] border border-white/10 rounded-3xl p-6">

            <p className="text-gray-400 mb-3">
              Completed Orders
            </p>

            <h2 className="text-4xl font-bold">
              {completedOrders}
            </h2>

          </div>

          <div className="bg-[#111111] border border-white/10 rounded-3xl p-6">

            <p className="text-gray-400 mb-3">
              Pending Orders
            </p>

            <h2 className="text-4xl font-bold">
              {pendingOrders}
            </h2>

          </div>

          <div className="bg-[#111111] border border-white/10 rounded-3xl p-6">

            <p className="text-gray-400 mb-3">
              Most Ordered
            </p>

            <h2 className="text-2xl font-bold">
              {topSellingItem}
            </h2>

          </div>

        </div>

        {/* TOP SECTION */}
        <div className="grid lg:grid-cols-3 gap-8 mb-14">

          {/* ADD FOOD */}
          <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 h-fit">

            <h2 className="text-2xl font-semibold mb-6">
              Add Food
            </h2>

            <div className="space-y-4">

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
                className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3 outline-none"
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
                className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3 outline-none"
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
                className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3 outline-none"
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
                className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3 outline-none"
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
                className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3 outline-none"
              />

              <button
                onClick={addFood}
                className="w-full bg-white text-black py-3 rounded-2xl font-semibold"
              >
                Add Item
              </button>

            </div>

          </div>

          {/* INVENTORY */}
          <div className="lg:col-span-2 bg-[#111111] border border-white/10 rounded-3xl p-6">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-semibold">
                Inventory
              </h2>

              <p className="text-gray-400">
                {foods.length} Items
              </p>

            </div>

            <div className="grid md:grid-cols-2 gap-4 max-h-[550px] overflow-y-auto pr-2">

              {foods.map(
                (food) => (

                  <div
                    key={food._id}
                    className="bg-black border border-white/10 rounded-2xl p-4 flex gap-4 items-center"
                  >

                    <img
  src={`/food/${food.image}`}
  alt={food.name}
  className="w-24 h-24 object-cover rounded-2xl"
/>

                    <div className="flex-1">

                      <h3 className="text-xl font-semibold mb-1">
                        {food.name}
                      </h3>

                      <p className="text-gray-400 text-sm">
                        ₹{food.price}
                      </p>

                      <p className="text-gray-500 text-sm mb-3">
                        {food.category}
                      </p>

                      <div className="flex items-center gap-3">

                        <button
                          onClick={() =>
                            changeStock(
                              food._id,
                              food.stock,
                              -1
                            )
                          }
                          className="bg-red-500 w-8 h-8 rounded-full"
                        >
                          -
                        </button>

                        <p className="font-semibold">
                          {food.stock}
                        </p>

                        <button
                          onClick={() =>
                            changeStock(
                              food._id,
                              food.stock,
                              1
                            )
                          }
                          className="bg-green-500 w-8 h-8 rounded-full"
                        >
                          +
                        </button>

                      </div>

                    </div>

                    <button
                      onClick={() =>
                        deleteFood(
                          food._id
                        )
                      }
                      className="bg-red-500 px-4 py-2 rounded-xl text-sm"
                    >
                      Delete
                    </button>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      </div>

      {/* ORDERS */}
<div className="bg-[#111111] border border-white/10 rounded-3xl p-6">

  <div className="flex justify-between items-center mb-8">

    <h2 className="text-3xl font-semibold">
      Orders
    </h2>

    <p className="text-gray-400">
      {orders.length} Orders
    </p>

  </div>

  <div className="space-y-5">

    {orders.map((order) => (

      <div
        key={order._id}
        className="bg-black border border-white/10 rounded-2xl p-5"
      >

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">

          <div>

            <h3 className="text-xl font-semibold mb-2">
              {order.userName || "Student"}
            </h3>

            <p className="text-gray-400">
              ₹{order.total}
            </p>

            <p className="text-gray-500 text-sm mt-2">

              {order.items?.map(
                (item) =>
                  `${item.name} x${item.quantity}`
              ).join(", ")}

            </p>

          </div>

          <div className="flex gap-3 flex-wrap">

            <button
              onClick={() =>
                updateStatus(
                  order._id,
                  "Preparing"
                )
              }
              className="bg-yellow-500 text-black px-5 py-2 rounded-xl font-semibold"
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
              className="bg-blue-500 text-white px-5 py-2 rounded-xl font-semibold"
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
              className="bg-green-500 text-black px-5 py-2 rounded-xl font-semibold"
            >
              Delivered
            </button>

          </div>

        </div>

        <div className="mt-4">

          <span className="text-sm text-gray-400">
            Current Status:
          </span>

          <span className="ml-2 font-semibold">
            {order.status}
          </span>

        </div>

      </div>

    ))}

  </div>

</div>

    </div>

  );

}