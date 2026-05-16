import { useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import {
  CheckCircle2,
  Receipt,
  Clock3,
  Printer,
  ClipboardList,
} from "lucide-react";

export default function OrderSuccess() {

  const location = useLocation();

  const navigate = useNavigate();

  const order = location.state;

  // SAFETY
  if (!order) {

    return (

      <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center px-6 font-['Outfit']">

        <div className="bg-white border border-[#ece7df] rounded-[34px] p-14 shadow-sm text-center max-w-xl w-full">

          <div className="w-24 h-24 rounded-full bg-[#f7f2eb] flex items-center justify-center mx-auto mb-8">

            <Receipt
              size={42}
              className="text-[#1f1b16]"
            />

          </div>

          <h1 className="text-5xl font-black text-[#1f1b16] mb-5">

            No Order Found

          </h1>

          <p className="text-[#8c8378] text-lg mb-10">

            We couldn’t locate any active order information.

          </p>

          <button
            onClick={() =>
              navigate("/canteen")
            }
            className="bg-[#1f1b16] text-white px-8 py-4 rounded-2xl font-semibold hover:opacity-90 transition"
          >

            Back to Canteen

          </button>

        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-[#faf7f2] px-6 py-10 font-['Outfit']">

      <div className="max-w-4xl mx-auto">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="bg-white border border-[#ece7df] rounded-[38px] p-10 shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
        >

          {/* SUCCESS HEADER */}

          <div className="text-center mb-14">

            <div className="w-28 h-28 rounded-full bg-[#f7f2eb] flex items-center justify-center mx-auto mb-8">

              <CheckCircle2
                size={54}
                className="text-green-500"
              />

            </div>

            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#f7f2eb] text-[#8a7864] text-sm font-medium mb-6">

              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />

              Order Successfully Placed

            </div>

            <h1 className="text-6xl font-black text-[#1f1b16] tracking-tight mb-5">

              Order Confirmed

            </h1>

            <p className="text-[#6b6258] text-xl leading-relaxed max-w-2xl mx-auto">

              Your order has been received successfully and is now being prepared by the campus canteen.

            </p>

          </div>

          {/* ORDER DETAILS */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

            <div className="bg-[#faf7f2] border border-[#ece7df] rounded-[28px] p-7">

              <p className="text-[#8c8378] mb-3">
                Customer Name
              </p>

              <h2 className="text-2xl font-black text-[#1f1b16]">

                {
                  order.customerName
                }

              </h2>

            </div>

            <div className="bg-[#faf7f2] border border-[#ece7df] rounded-[28px] p-7">

              <p className="text-[#8c8378] mb-3">
                Contact Number
              </p>

              <h2 className="text-2xl font-black text-[#1f1b16]">

                {
                  order.phoneNumber
                }

              </h2>

            </div>

            <div className="bg-[#faf7f2] border border-[#ece7df] rounded-[28px] p-7">

              <p className="text-[#8c8378] mb-3">
                Order Number
              </p>

              <h2 className="text-2xl font-black text-[#1f1b16]">

                {
                  order.orderNumber
                }

              </h2>

            </div>

            <div className="bg-[#faf7f2] border border-[#ece7df] rounded-[28px] p-7">

              <p className="text-[#8c8378] mb-3">
                Token Number
              </p>

              <h2 className="text-2xl font-black text-[#1f1b16]">

                #
                {
                  order.tokenNumber
                }

              </h2>

            </div>

          </div>

          {/* PICKUP + STATUS */}

          <div className="flex flex-col lg:flex-row gap-8 mb-12">

            <div className="flex-1 bg-[#faf7f2] border border-[#ece7df] rounded-[28px] p-7">

              <div className="flex items-center gap-3 mb-5">

                <Clock3
                  size={22}
                  className="text-[#1f1b16]"
                />

                <p className="text-[#8c8378]">
                  Pickup Time
                </p>

              </div>

              <h2 className="text-4xl font-black text-[#1f1b16]">

                {
                  order.pickupTime
                }

              </h2>

            </div>

            <div className="flex-1 bg-[#faf7f2] border border-[#ece7df] rounded-[28px] p-7">

              <div className="flex items-center gap-3 mb-5">

                <Receipt
                  size={22}
                  className="text-[#1f1b16]"
                />

                <p className="text-[#8c8378]">
                  Current Status
                </p>

              </div>

              <div className="inline-flex bg-yellow-100 text-yellow-700 px-5 py-3 rounded-full font-semibold">

                {
                  order.status
                }

              </div>

            </div>

          </div>

          {/* ITEMS */}

          <div className="border-t border-[#ece7df] pt-10">

            <div className="flex items-center gap-3 mb-8">

              <ClipboardList
                size={24}
                className="text-[#1f1b16]"
              />

              <h2 className="text-3xl font-black text-[#1f1b16]">

                Ordered Items

              </h2>

            </div>

            <div className="space-y-5">

              {order.items.map(
                (
                  item,
                  index
                ) => (

                  <div
                    key={index}
                    className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border border-[#ece7df] rounded-[24px] p-6 bg-[#faf7f2]"
                  >

                    <div>

                      <h3 className="text-2xl font-bold text-[#1f1b16] mb-2">

                        {
                          item.name
                        }

                      </h3>

                      <p className="text-[#8c8378]">

                        Quantity:
                        {" "}
                        <span className="font-semibold text-[#1f1b16]">

                          {
                            item.quantity
                          }

                        </span>

                      </p>

                      {item.flavour && (

                        <p className="text-[#8c8378] mt-2">

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

                    <h2 className="text-3xl font-black text-[#1f1b16]">

                      ₹
                      {item.price *
                        item.quantity}

                    </h2>

                  </div>

                )
              )}

            </div>

          </div>

          {/* TOTAL */}

          <div className="border-t border-[#ece7df] mt-12 pt-10 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

            <div>

              <p className="text-[#8c8378] text-lg mb-2">

                Total Amount

              </p>

              <h2 className="text-6xl font-black text-[#1f1b16]">

                ₹{order.total}

              </h2>

            </div>

            <div className="bg-[#f7f2eb] px-6 py-4 rounded-2xl">

              <p className="text-[#6b6258] font-medium">

                Estimated preparation time: 15 mins

              </p>

            </div>

          </div>

          {/* BUTTONS */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">

            <button
              onClick={() =>
                navigate("/orders")
              }
              className="flex items-center justify-center gap-3 bg-[#1f1b16] text-white py-5 rounded-2xl font-semibold hover:opacity-90 transition"
            >

              <ClipboardList size={20} />

              View Orders

            </button>

            <button
              onClick={() =>
                window.print()
              }
              className="flex items-center justify-center gap-3 bg-[#f7f2eb] border border-[#ece7df] text-[#1f1b16] py-5 rounded-2xl font-semibold hover:bg-[#efe8de] transition"
            >

              <Printer size={20} />

              Print Receipt

            </button>

          </div>

        </motion.div>

      </div>

    </div>

  );

}