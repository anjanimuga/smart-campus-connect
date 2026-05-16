import {
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  ClipboardList,
  Clock3,
  Receipt,
} from "lucide-react";

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

    <div className="min-h-screen bg-[#faf7f2] px-6 py-10 font-['Outfit']">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="mb-14">

          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-[#ece7df] shadow-sm mb-6">

            <span className="w-2.5 h-2.5 rounded-full bg-orange-400" />

            <p className="text-[#5e5246] font-medium text-sm">
              Live Order Tracking
            </p>

          </div>

          <h1 className="text-6xl font-black text-[#1f1b16] tracking-tight mb-4">

            My Orders

          </h1>

          <p className="text-[#6b6258] text-xl leading-relaxed max-w-2xl">

            Track your active and previous canteen orders in real time.

          </p>

        </div>

        {/* EMPTY */}

        {orders.length === 0 ? (

          <div className="bg-white border border-[#ece7df] rounded-[34px] p-16 text-center shadow-sm">

            <div className="w-24 h-24 rounded-full bg-[#f7f2eb] flex items-center justify-center mx-auto mb-8">

              <ClipboardList
                size={42}
                className="text-[#1f1b16]"
              />

            </div>

            <h2 className="text-4xl font-black text-[#1f1b16] mb-4">

              No Orders Yet

            </h2>

            <p className="text-[#8c8378] text-lg">

              Place your first order from the campus canteen.

            </p>

          </div>

        ) : (

          <div className="space-y-10">

            {orders.map(
              (
                order,
                index
              ) => (

                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                  }}
                  whileHover={{
                    y: -4,
                  }}
                  className="bg-white border border-[#ece7df] rounded-[34px] p-8 shadow-sm hover:shadow-lg transition duration-300"
                >

                  {/* TOP */}

                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 mb-10">

                    {/* LEFT */}

                    <div>

                      <div className="inline-flex px-4 py-2 rounded-full bg-[#f7f2eb] text-[#8a7864] text-sm font-medium mb-5">

                        Active Order

                      </div>

                      <h2 className="text-4xl font-black text-[#1f1b16] mb-4">

                        {
                          order.orderNumber
                        }

                      </h2>

                      <div className="flex flex-col gap-3">

                        <div className="flex items-center gap-3 text-[#6b6258]">

                          <Receipt size={18} />

                          <p>

                            Token:
                            {" "}
                            <span className="font-semibold text-[#1f1b16]">

                              {
                                order.tokenNumber
                              }

                            </span>

                          </p>

                        </div>

                        <div className="flex items-center gap-3 text-[#6b6258]">

                          <Clock3 size={18} />

                          <p>

                            Pickup:
                            {" "}
                            <span className="font-semibold text-[#1f1b16]">

                              {
                                order.pickupTime
                              }

                            </span>

                          </p>

                        </div>

                      </div>

                    </div>

                    {/* RIGHT */}

                    <div className="lg:text-right">

                      <div className="inline-block bg-[#f7f2eb] text-[#1f1b16] px-5 py-3 rounded-full text-sm font-semibold mb-4">

                        {
                          order.status
                        }

                      </div>

                      <p className="text-[#8c8378]">

                        Ordered By:
                        {" "}
                        <span className="font-semibold text-[#1f1b16]">

                          {
                            order.customerName
                          }

                        </span>

                      </p>

                    </div>

                  </div>

                  {/* ITEMS */}

                  <div className="space-y-5 mb-10">

                    {order.items?.map(
                      (
                        item,
                        itemIndex
                      ) => (

                        <div
                          key={itemIndex}
                          className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 border-b border-[#ece7df] pb-5"
                        >

                          {/* ITEM INFO */}

                          <div>

                            <p className="text-2xl font-bold text-[#1f1b16] mb-2">

                              {item.name}

                            </p>

                            {item.flavour && (

                              <p className="text-[#8c8378]">

                                Flavour:
                                {" "}
                                <span className="font-semibold text-[#1f1b16]">

                                  {
                                    item.flavour
                                  }

                                </span>

                              </p>

                            )}

                          </div>

                          {/* ITEM META */}

                          <div className="text-left md:text-right">

                            <p className="text-lg text-[#6b6258] mb-2">

                              Qty:
                              {" "}
                              <span className="font-semibold text-[#1f1b16]">

                                {
                                  item.quantity
                                }

                              </span>

                            </p>

                            <p className="text-2xl font-black text-[#1f1b16]">

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

                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">

                    <div>

                      <p className="text-[#8c8378] text-lg mb-2">

                        Total Amount

                      </p>

                      <h2 className="text-5xl font-black text-[#1f1b16]">

                        ₹{order.total}

                      </h2>

                    </div>

                    <div className="bg-[#f7f2eb] px-6 py-4 rounded-2xl">

                      <p className="text-[#6b6258] font-medium">

                        Live updates enabled

                      </p>

                    </div>

                  </div>

                </motion.div>

              )
            )}

          </div>

        )}

      </div>

    </div>

  );

}