import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  PackageCheck,
  ClipboardList,
  Receipt,
  ShoppingBag,
} from "lucide-react";

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

    <div className="min-h-screen bg-[#f8f5ef] px-8 py-10 font-['Outfit'] overflow-hidden relative">

      {/* BACKGROUND */}

      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-orange-100/40 blur-3xl" />

      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-yellow-100/40 blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="mb-16">

          <div className="inline-flex items-center gap-3 bg-white border border-[#ece7df] px-5 py-3 rounded-full shadow-sm mb-6">

            <ClipboardList
              size={18}
              className="text-[#c27c2c]"
            />

            <p className="text-[#7a6d5b] font-medium text-sm">

              Campus Stationery Purchases

            </p>

          </div>

          <h1 className="text-[65px] lg:text-[85px] leading-[0.95] font-black tracking-tight text-[#1f1f1f] mb-6">

            My
            <br />

            <span className="text-[#c27c2c]">

              Orders

            </span>

          </h1>

          <p className="text-xl text-[#6f6659] leading-relaxed max-w-2xl">

            View and manage your stationery purchases and campus orders.

          </p>

        </div>

        {

          orders.length === 0 ? (

            <div className="bg-white border border-[#ece7df] rounded-[36px] p-14 text-center shadow-[0_20px_60px_rgba(0,0,0,0.05)]">

              <div className="w-24 h-24 rounded-3xl bg-[#f8f5ef] border border-[#ece7df] flex items-center justify-center mx-auto mb-8">

                <ShoppingBag
                  size={40}
                  className="text-[#c27c2c]"
                />

              </div>

              <h2 className="text-4xl font-black tracking-tight text-[#1f1f1f] mb-5">

                No Orders Yet

              </h2>

              <p className="text-[#6f6659] text-lg">

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

                  <motion.div
                    key={order._id}
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
                      delay:
                        index * 0.05,
                    }}
                    className="bg-white border border-[#ece7df] rounded-[36px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.05)]"
                  >

                    {/* TOP */}

                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8 mb-10">

                      <div className="flex items-start gap-5">

                        <div className="w-20 h-20 rounded-3xl bg-[#f8f5ef] border border-[#ece7df] flex items-center justify-center shrink-0">

                          <Receipt
                            size={34}
                            className="text-[#c27c2c]"
                          />

                        </div>

                        <div>

                          <h2 className="text-4xl font-black tracking-tight text-[#1f1f1f] mb-3">

                            Order Invoice

                          </h2>

                          <p className="text-[#7a6d5b]">

                            Order ID:
                            {" "}
                            {order._id}

                          </p>

                          <p className="text-[#9a8e7b] mt-2">

                            {new Date(
                              order.createdAt
                            ).toLocaleString()}

                          </p>

                        </div>

                      </div>

                      <div className="flex flex-col lg:items-end gap-4">

                        <div className="bg-[#1f1f1f] text-white px-6 py-3 rounded-full font-semibold">

                          {order.status}

                        </div>

                        {

                          index === 0 && (

                            <div className="bg-[#fff3dc] border border-[#f5dfb5] text-[#b7791f] px-5 py-2 rounded-full text-sm font-semibold">

                              Latest Order

                            </div>

                          )

                        }

                      </div>

                    </div>

                    {/* ITEMS */}

                    <div className="space-y-5 mb-10">

                      {order.items.map(
                        (
                          item,
                          itemIndex
                        ) => (

                          <div
                            key={itemIndex}
                            className="bg-[#fcfaf6] border border-[#f0e8dc] rounded-3xl p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-6"
                          >

                            <div>

                              <h3 className="text-2xl font-black tracking-tight text-[#1f1f1f] mb-3">

                                {item.name}

                              </h3>

                              <p className="text-[#7a6d5b]">

                                Quantity:
                                {" "}
                                {item.quantity}

                              </p>

                            </div>

                            <p className="text-3xl font-black text-[#1f1f1f]">

                              ₹
                              {item.price *
                                item.quantity}

                            </p>

                          </div>

                        )
                      )}

                    </div>

                    {/* TOTAL */}

                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 pt-8 border-t border-[#ece7df]">

                      <div className="flex items-center gap-4">

                        <PackageCheck
                          size={24}
                          className="text-[#c27c2c]"
                        />

                        <h3 className="text-2xl font-bold text-[#1f1f1f]">

                          Total Amount

                        </h3>

                      </div>

                      <p className="text-5xl font-black tracking-tight text-[#1f1f1f]">

                        ₹
                        {order.totalPrice}

                      </p>

                    </div>

                  </motion.div>

                )
              )}

            </div>

          )

        }

      </div>

    </div>

  );

}