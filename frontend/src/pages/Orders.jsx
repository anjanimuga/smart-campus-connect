import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

export default function Orders() {

  const [orders, setOrders] =
    useState([]);

  // FETCH USER ORDERS
  const fetchOrders =
    async () => {

      try {

        const user =
          JSON.parse(
            localStorage.getItem(
              "user"
            )
          );

        const res =
          await API.get(
            "/orders",
            {
              headers: {
                userid:
                  user?._id,
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

  useEffect(() => {

    fetchOrders();

    const interval =
      setInterval(() => {

        fetchOrders();

      }, 5000);

    return () =>
      clearInterval(
        interval
      );

  }, []);

  // NOTIFICATIONS
  useEffect(() => {

    if (
      Notification.permission !==
      "granted"
    ) {

      Notification.requestPermission();

    }

  }, []);

  return (

    <div className="min-h-screen bg-[#151312] text-white px-6 py-10">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-5xl font-semibold mb-3">
            My Orders
          </h1>

          <p className="text-gray-400">
            Track your live canteen orders
          </p>

        </div>

        {/* EMPTY */}
        {orders.length === 0 ? (

          <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center">

            <h2 className="text-2xl font-semibold mb-3">
              No Orders Yet
            </h2>

            <p className="text-gray-400">
              Place your first order from the canteen.
            </p>

          </div>

        ) : (

          <div className="space-y-8">

            {orders.map(
              (
                order,
                index
              ) => (

                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-3xl p-8"
                >

                  {/* TOP */}
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 mb-8">

                    <div>

                      <h2 className="text-3xl font-semibold mb-3">

                        {
                          order.orderNumber
                        }

                      </h2>

                      <p className="text-gray-400 mb-2">

                        Token:
                        {" "}
                        {
                          order.tokenNumber
                        }

                      </p>

                      <p className="text-gray-400">

                        Pickup:
                        {" "}
                        {
                          order.pickupTime
                        }

                      </p>

                    </div>

                    <div className="lg:text-right">

                      <div className="inline-block bg-white/10 px-5 py-2 rounded-full text-sm mb-3">

                        {
                          order.status
                        }

                      </div>

                      <p className="text-gray-400">

                        Ordered By:
                        {" "}
                        {
                          order.customerName
                        }

                      </p>

                    </div>

                  </div>

                  {/* ITEMS */}
                  <div className="space-y-4 mb-8">

                    {order.items?.map(
                      (
                        item,
                        itemIndex
                      ) => (

                        <div
                          key={itemIndex}
                          className="flex justify-between items-center border-b border-white/10 pb-4"
                        >

                          <div>

                            <p className="text-xl font-medium">

                              {item.name}

                            </p>

                            {item.flavour && (

                              <p className="text-gray-400 text-sm mt-1">

                                Flavour:
                                {" "}
                                {
                                  item.flavour
                                }

                              </p>

                            )}

                          </div>

                          <div className="text-right">

                            <p className="text-lg">

                              Qty:
                              {" "}
                              {
                                item.quantity
                              }

                            </p>

                            <p className="text-gray-300">

                              ₹
                              {
                                item.price *
                                item.quantity
                              }

                            </p>

                          </div>

                        </div>

                      )
                    )}

                  </div>

                  {/* TOTAL */}
                  <div className="flex justify-between items-center">

                    <h2 className="text-2xl font-semibold">
                      Total
                    </h2>

                    <h2 className="text-3xl font-semibold">
                      ₹{order.total}
                    </h2>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>

  );

}