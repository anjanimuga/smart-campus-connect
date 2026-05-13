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

        <h1 className="text-5xl font-semibold mb-12">
          My Stationery Orders
        </h1>

        <div className="space-y-8">

          {orders.map(
            (order) => (

              <div
                key={order._id}
                className="bg-white/5 border border-white/10 rounded-3xl p-8"
              >

                <div className="flex justify-between mb-6">

                  <div>

                    <h2 className="text-2xl font-semibold">
                      Order
                    </h2>

                    <p className="text-gray-400 mt-2">
                      {new Date(
                        order.createdAt
                      ).toLocaleString()}
                    </p>

                  </div>

                  <div className="bg-white text-black px-5 py-2 rounded-full font-semibold h-fit">

                    {order.status}

                  </div>

                </div>

                <div className="space-y-3">

                  {order.items.map(
                    (
                      item,
                      index
                    ) => (

                      <div
                        key={index}
                        className="flex justify-between"
                      >

                        <p>
                          {item.name}
                          {" "}
                          ×
                          {" "}
                          {item.quantity}
                        </p>

                        <p>
                          ₹
                          {item.price *
                            item.quantity}
                        </p>

                      </div>

                    )
                  )}

                </div>

                <div className="mt-6 text-right text-2xl font-bold">

                  Total:
                  {" "}
                  ₹
                  {order.totalPrice}

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );

}