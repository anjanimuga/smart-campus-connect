import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

export default function StationeryOrders() {

  const [orders, setOrders] =
    useState([]);

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  const fetchOrders =
    async () => {

      try {

        const res =
          await API.get(
            `/stationery-orders/my/${user._id}`
          );

        setOrders(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchOrders();

  }, []);

  return (

    <div className="min-h-screen bg-[#151312] text-white px-8 py-10">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-14">

          <h1 className="text-5xl font-semibold mb-3">
            My Stationery Orders
          </h1>

          <p className="text-gray-400">
            View your current and past stationery orders.
          </p>

        </div>

        {

          orders.length === 0 ? (

            <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center">

              <h2 className="text-3xl font-semibold mb-4">

                No Orders Yet

              </h2>

              <p className="text-gray-400">

                Your stationery orders will appear here.

              </p>

            </div>

          ) : (

            <div className="space-y-10">

              {orders.map(
                (
                  order,
                  index
                ) => (

                  <div
                    key={order._id}
                    className={`rounded-3xl p-8 border ${
                      index === 0
                        ? "bg-white/10 border-white/20"
                        : "bg-white/5 border-white/10"
                    }`}
                  >

                    {/* TOP */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8">

                      <div>

                        <h2 className="text-3xl font-semibold mb-2">

                          Order Invoice

                        </h2>

                        <p className="text-gray-400">

                          Order ID:
                          {" "}
                          {order._id}

                        </p>

                        <p className="text-gray-400 mt-2">

                          {new Date(
                            order.createdAt
                          ).toLocaleString()}

                        </p>

                      </div>

                      <div className="flex flex-col items-start md:items-end gap-3">

                        <div className="bg-white text-black px-5 py-2 rounded-full font-semibold">

                          {order.status}

                        </div>

                        {

                          index === 0 && (

                            <div className="bg-green-500 text-black px-4 py-2 rounded-full text-sm font-semibold">

                              Latest Order

                            </div>

                          )

                        }

                      </div>

                    </div>

                    {/* ITEMS */}
                    <div className="space-y-4 mb-8">

                      {order.items.map(
                        (
                          item,
                          itemIndex
                        ) => (

                          <div
                            key={itemIndex}
                            className="flex justify-between items-center border-b border-white/10 pb-4"
                          >

                            <div>

                              <h3 className="text-xl font-medium">

                                {item.name}

                              </h3>

                              <p className="text-gray-400 mt-1">

                                Quantity:
                                {" "}
                                {item.quantity}

                              </p>

                            </div>

                            <p className="text-xl font-semibold">

                              ₹
                              {item.price *
                                item.quantity}

                            </p>

                          </div>

                        )
                      )}

                    </div>

                    {/* TOTAL */}
                    <div className="flex justify-between items-center">

                      <h3 className="text-2xl font-semibold">

                        Total Amount

                      </h3>

                      <p className="text-4xl font-bold">

                        ₹
                        {order.totalPrice}

                      </p>

                    </div>

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