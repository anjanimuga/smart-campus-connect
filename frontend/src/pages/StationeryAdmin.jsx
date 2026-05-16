import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  PencilRuler,
  Package,
  Plus,
  Trash2,
  ClipboardList,
  BadgeCheck,
  Clock3,
  IndianRupee,
} from "lucide-react";

import API from "../services/api";

export default function StationeryAdmin() {

  const [items, setItems] =
    useState([]);

  const [orders, setOrders] =
    useState([]);

  const [newItem, setNewItem] =
    useState({
      name: "",
      price: "",
      category: "",
      image: "",
      stock: "",
    });

  // FETCH ITEMS

  const fetchItems =
    async () => {

      try {

        const res =
          await API.get(
            "/stationery"
          );

        setItems(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  // FETCH ORDERS

  const fetchOrders =
    async () => {

      try {

        const res =
          await API.get(
            "/stationery-orders"
          );

        setOrders(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchItems();

    fetchOrders();

  }, []);

  // ADD ITEM

  const addItem =
    async () => {

      try {

        await API.post(
          "/stationery",
          {
            ...newItem,
            price:
              Number(
                newItem.price
              ),
            stock:
              Number(
                newItem.stock
              ),
          }
        );

        setNewItem({
          name: "",
          price: "",
          category: "",
          image: "",
          stock: "",
        });

        fetchItems();

      } catch (error) {

        console.log(error);

      }

    };

  // DELETE ITEM

  const deleteItem =
    async (id) => {

      try {

        await API.delete(
          `/stationery/${id}`
        );

        fetchItems();

      } catch (error) {

        console.log(error);

      }

    };

  // UPDATE STATUS

  const updateOrderStatus =
    async (
      id,
      status
    ) => {

      try {

        await API.put(
          `/stationery-orders/${id}`,
          {
            status,
          }
        );

        fetchOrders();

      } catch (error) {

        console.log(error);

      }

    };

  // STATS

  const totalRevenue =
    orders.reduce(
      (
        total,
        order
      ) =>
        total +
        (
          order.totalPrice || 0
        ),
      0
    );

  return (

    <div className="min-h-screen bg-[#f6f7fb] px-8 py-8 font-['Outfit'] text-[#111111]">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-14">

          <p className="text-[#7a7a7a] mb-3 font-medium">

            Campus Stationery Management

          </p>

          <h1 className="text-6xl font-black tracking-tight mb-4">

            Stationery Admin

          </h1>

          <p className="text-[#6d6d6d] text-lg">

            Manage inventory, orders and supplies.

          </p>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">

          <div className="bg-white border border-[#ececec] rounded-[32px] p-8 shadow-sm">

            <div className="w-16 h-16 rounded-3xl bg-[#eef2ff] flex items-center justify-center mb-6">

              <Package
                size={28}
                className="text-blue-600"
              />

            </div>

            <p className="text-[#7a7a7a] mb-3">

              Total Products

            </p>

            <h2 className="text-5xl font-black tracking-tight">

              {items.length}

            </h2>

          </div>

          <div className="bg-white border border-[#ececec] rounded-[32px] p-8 shadow-sm">

            <div className="w-16 h-16 rounded-3xl bg-[#fff4e8] flex items-center justify-center mb-6">

              <ClipboardList
                size={28}
                className="text-orange-500"
              />

            </div>

            <p className="text-[#7a7a7a] mb-3">

              Total Orders

            </p>

            <h2 className="text-5xl font-black tracking-tight">

              {orders.length}

            </h2>

          </div>

          <div className="bg-white border border-[#ececec] rounded-[32px] p-8 shadow-sm">

            <div className="w-16 h-16 rounded-3xl bg-[#ecfdf3] flex items-center justify-center mb-6">

              <IndianRupee
                size={28}
                className="text-green-600"
              />

            </div>

            <p className="text-[#7a7a7a] mb-3">

              Revenue

            </p>

            <h2 className="text-5xl font-black tracking-tight">

              ₹{totalRevenue}

            </h2>

          </div>

        </div>

        {/* ADD ITEM */}

        <div className="bg-white border border-[#ececec] rounded-[36px] p-8 shadow-sm mb-16">

          <div className="flex items-center gap-4 mb-8">

            <div className="w-16 h-16 rounded-3xl bg-[#eef2ff] flex items-center justify-center">

              <Plus
                size={28}
                className="text-blue-600"
              />

            </div>

            <div>

              <h2 className="text-3xl font-black tracking-tight">

                Add Stationery Item

              </h2>

              <p className="text-[#7a7a7a]">

                Create new store inventory items

              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

            <input
              type="text"
              placeholder="Item Name"
              value={newItem.name}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  name:
                    e.target.value,
                })
              }
              className="bg-[#f8f8f8] border border-[#ececec] rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="number"
              placeholder="Price"
              value={newItem.price}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  price:
                    e.target.value,
                })
              }
              className="bg-[#f8f8f8] border border-[#ececec] rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Category"
              value={newItem.category}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  category:
                    e.target.value,
                })
              }
              className="bg-[#f8f8f8] border border-[#ececec] rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={newItem.image}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  image:
                    e.target.value,
                })
              }
              className="bg-[#f8f8f8] border border-[#ececec] rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="number"
              placeholder="Stock"
              value={newItem.stock}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  stock:
                    e.target.value,
                })
              }
              className="bg-[#f8f8f8] border border-[#ececec] rounded-2xl px-5 py-4 outline-none"
            />

          </div>

          <button
            onClick={addItem}
            className="mt-8 bg-[#111111] text-white px-8 py-4 rounded-2xl font-semibold hover:opacity-90 transition"
          >

            Add Item

          </button>

        </div>

        {/* INVENTORY */}

        <div className="mb-20">

          <div className="flex items-center gap-4 mb-10">

            <div className="w-16 h-16 rounded-3xl bg-[#eef2ff] flex items-center justify-center">

              <PencilRuler
                size={28}
                className="text-blue-600"
              />

            </div>

            <div>

              <h2 className="text-5xl font-black tracking-tight">

                Inventory

              </h2>

              <p className="text-[#7a7a7a]">

                Current stationery products

              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {items.map(
              (item) => (

                <motion.div
                  key={item._id}
                  whileHover={{
                    y: -4,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="bg-white border border-[#ececec] rounded-[32px] p-6 shadow-sm"
                >

                  <div className="w-full h-56 overflow-hidden rounded-3xl bg-[#f4f4f4] mb-6">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />

                  </div>

                  <div className="flex justify-between items-start mb-4">

                    <div>

                      <h2 className="text-2xl font-black tracking-tight mb-2">

                        {item.name}

                      </h2>

                      <p className="text-[#7a7a7a]">

                        {item.category}

                      </p>

                    </div>

                    <div className="bg-[#f6f7fb] px-4 py-2 rounded-2xl font-bold">

                      ₹{item.price}

                    </div>

                  </div>

                  <div className="bg-[#fafafa] border border-[#ececec] rounded-2xl p-4 mb-6">

                    <p className="text-[#8a8a8a] text-sm mb-2">

                      Available Stock

                    </p>

                    <h3 className="text-3xl font-black tracking-tight">

                      {item.stock}

                    </h3>

                  </div>

                  <button
                    onClick={() =>
                      deleteItem(
                        item._id
                      )
                    }
                    className="w-full bg-red-50 text-red-600 py-4 rounded-2xl font-semibold hover:bg-red-100 transition flex items-center justify-center gap-2"
                  >

                    <Trash2 size={18} />

                    Delete Item

                  </button>

                </motion.div>

              )
            )}

          </div>

        </div>

        {/* ORDERS */}

        <div>

          <div className="flex items-center gap-4 mb-10">

            <div className="w-16 h-16 rounded-3xl bg-[#eef2ff] flex items-center justify-center">

              <ClipboardList
                size={28}
                className="text-blue-600"
              />

            </div>

            <div>

              <h2 className="text-5xl font-black tracking-tight">

                Orders

              </h2>

              <p className="text-[#7a7a7a]">

                Manage student stationery purchases

              </p>

            </div>

          </div>

          <div className="space-y-8">

            {orders.map(
              (order) => (

                <div
                  key={order._id}
                  className="bg-white border border-[#ececec] rounded-[32px] p-8 shadow-sm"
                >

                  {/* TOP */}

                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 mb-8">

                    <div>

                      <h3 className="text-3xl font-black tracking-tight mb-3">

                        {order.userName}

                      </h3>

                      <p className="text-[#7a7a7a]">

                        {new Date(
                          order.createdAt
                        ).toLocaleString()}

                      </p>

                    </div>

                    <div className="bg-[#111111] text-white px-5 py-3 rounded-2xl font-semibold w-fit">

                      {order.status}

                    </div>

                  </div>

                  {/* ITEMS */}

                  <div className="space-y-4 mb-8">

                    {order.items.map(
                      (
                        item,
                        index
                      ) => (

                        <div
                          key={index}
                          className="flex justify-between items-center border-b border-[#ececec] pb-4"
                        >

                          <div>

                            <h3 className="text-xl font-semibold">

                              {item.name}

                            </h3>

                            <p className="text-[#7a7a7a] mt-1">

                              Quantity:
                              {" "}
                              {item.quantity}

                            </p>

                          </div>

                          <p className="text-xl font-bold">

                            ₹
                            {item.price *
                              item.quantity}

                          </p>

                        </div>

                      )
                    )}

                  </div>

                  {/* BOTTOM */}

                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

                    <h3 className="text-3xl font-black tracking-tight">

                      ₹{order.totalPrice}

                    </h3>

                    <div className="flex flex-wrap gap-3">

                      <button
                        onClick={() =>
                          updateOrderStatus(
                            order._id,
                            "Preparing"
                          )
                        }
                        className="bg-amber-100 text-amber-700 px-5 py-3 rounded-2xl font-semibold flex items-center gap-2"
                      >

                        <Clock3 size={18} />

                        Preparing

                      </button>

                      <button
                        onClick={() =>
                          updateOrderStatus(
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
                          updateOrderStatus(
                            order._id,
                            "Delivered"
                          )
                        }
                        className="bg-green-100 text-green-700 px-5 py-3 rounded-2xl font-semibold flex items-center gap-2"
                      >

                        <BadgeCheck size={18} />

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