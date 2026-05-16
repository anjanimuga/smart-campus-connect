import {
  useContext,
} from "react";

import { motion } from "framer-motion";

import {
  ShoppingBag,
  ClipboardList,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { CartContext } from "../context/CartContext";

import API from "../services/api";

import toast from "react-hot-toast";

export default function Cart() {

  const navigate = useNavigate();

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);

  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};

  // TOTAL
  const total =
    cart.reduce(
      (sum, item) =>
        sum +
        item.price *
          item.quantity,
      0
    );

  // PLACE ORDER
  const placeOrder =
    async () => {

      try {

        const orderData = {

          userId:
            user._id,

          customerName:
            user.name ||
            "Student",

          phoneNumber:
            user.phone ||
            "Not Provided",

          items: cart,

          total,

          orderNumber:
            "CC-" +
            Math.floor(
              1000 +
                Math.random() *
                  9000
            ),

          tokenNumber:
            Math.floor(
              1 +
                Math.random() *
                  99
            ),

          pickupTime:
            new Date(
              Date.now() +
                15 * 60000
            ).toLocaleTimeString(
              [],
              {
                hour: "2-digit",
                minute:
                  "2-digit",
              }
            ),

          status:
            "Preparing",

        };

        const res =
          await API.post(
            "/orders",
            orderData
          );

        clearCart();

        navigate(
          "/order-success",
          {
            state: res.data,
          }
        );

      } catch (error) {

        console.log(error);

        alert("Order failed");

      }

    };

  return (

    <div className="min-h-screen bg-[#faf7f2] px-8 py-10 font-['Outfit']">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8 mb-14">

          <div>

            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-[#ece7df] shadow-sm mb-6">

              <span className="w-2.5 h-2.5 rounded-full bg-orange-400" />

              <p className="text-[#5e5246] font-medium text-sm">
                Premium Checkout Experience
              </p>

            </div>

            <h1 className="text-6xl font-black text-[#1f1b16] tracking-tight mb-4">

              Your Cart

            </h1>

            <p className="text-[#6b6258] text-xl leading-relaxed max-w-2xl">

              Review your selected items before placing your order.

            </p>

          </div>

          <button
            onClick={() =>
              navigate("/orders")
            }
            className="flex items-center gap-3 bg-[#1f1b16] text-white px-6 py-4 rounded-2xl hover:opacity-90 transition duration-300 shadow-lg"
          >

            <ClipboardList size={20} />

            View Orders

          </button>

        </div>

        {/* STUDENT DETAILS */}

        <div className="bg-white border border-[#ece7df] rounded-[34px] p-8 mb-10 shadow-sm">

          <h2 className="text-3xl font-black text-[#1f1b16] mb-8">

            Student Details

          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div>

              <p className="text-[#8c8378] mb-2">
                Name
              </p>

              <p className="text-xl font-semibold text-[#1f1b16]">
                {user.name ||
                  "Not Added"}
              </p>

            </div>

            <div>

              <p className="text-[#8c8378] mb-2">
                Branch
              </p>

              <p className="text-xl font-semibold text-[#1f1b16]">
                {user.branch ||
                  "Not Added"}
              </p>

            </div>

            <div>

              <p className="text-[#8c8378] mb-2">
                Year
              </p>

              <p className="text-xl font-semibold text-[#1f1b16]">
                {user.year ||
                  "Not Added"}
              </p>

            </div>

            <div>

              <p className="text-[#8c8378] mb-2">
                Roll No
              </p>

              <p className="text-xl font-semibold text-[#1f1b16]">
                {user.rollNo ||
                  "Not Added"}
              </p>

            </div>

            <div>

              <p className="text-[#8c8378] mb-2">
                Phone
              </p>

              <p className="text-xl font-semibold text-[#1f1b16]">
                {user.phone ||
                  "Not Added"}
              </p>

            </div>

          </div>

        </div>

        {/* EMPTY CART */}

        {cart.length === 0 ? (

          <div className="bg-white border border-[#ece7df] rounded-[34px] p-16 text-center shadow-sm">

            <div className="w-24 h-24 rounded-full bg-[#f7f2eb] flex items-center justify-center mx-auto mb-8">

              <ShoppingBag
                size={42}
                className="text-[#1f1b16]"
              />

            </div>

            <h2 className="text-4xl font-black text-[#1f1b16] mb-4">

              Cart is Empty

            </h2>

            <p className="text-[#8c8378] text-lg">

              Add delicious meals from the canteen to continue.

            </p>

          </div>

        ) : (

          <div className="space-y-8">

            {/* ITEMS */}

            {cart.map(
              (item, index) => (

                <motion.div
                  key={index}
                  whileHover={{
                    y: -4,
                  }}
                  className="bg-white border border-[#ece7df] rounded-[34px] p-8 shadow-sm hover:shadow-lg transition duration-300"
                >

                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8">

                    {/* LEFT */}

                    <div>

                      <div className="inline-flex px-4 py-2 rounded-full bg-[#f7f2eb] text-[#8a7864] text-sm font-medium mb-5">

                        Cart Item

                      </div>

                      <h2 className="text-4xl font-black text-[#1f1b16] mb-3">

                        {item.name}

                      </h2>

                      {item.flavour && (

                        <p className="text-[#8c8378] text-lg mb-4">

                          Flavour:
                          {" "}
                          <span className="font-semibold text-[#1f1b16]">

                            {item.flavour}

                          </span>

                        </p>

                      )}

                      <p className="text-3xl font-black text-[#1f1b16]">

                        ₹{item.price}

                      </p>

                    </div>

                    {/* RIGHT */}

                    <div className="flex flex-col items-start lg:items-end gap-6">

                      {/* QUANTITY */}

                      <div className="flex items-center gap-4 bg-[#faf7f2] border border-[#ece7df] rounded-2xl px-4 py-3">

                        <button
                          onClick={() =>
                            decreaseQuantity(
                              index
                            )
                          }
                          className="w-11 h-11 rounded-full bg-white border border-[#ece7df] flex items-center justify-center hover:shadow-md transition"
                        >

                          <Minus
                            size={18}
                            className="text-[#1f1b16]"
                          />

                        </button>

                        <p className="text-2xl font-black text-[#1f1b16] min-w-[40px] text-center">

                          {
                            item.quantity
                          }

                        </p>

                        <button
                          onClick={() =>
                            increaseQuantity(
                              index
                            )
                          }
                          className="w-11 h-11 rounded-full bg-white border border-[#ece7df] flex items-center justify-center hover:shadow-md transition"
                        >

                          <Plus
                            size={18}
                            className="text-[#1f1b16]"
                          />

                        </button>

                      </div>

                      {/* REMOVE */}

                      <button
                        onClick={() =>
                          removeFromCart(
                            index
                          )
                        }
                        className="flex items-center gap-2 bg-red-50 text-red-500 px-5 py-3 rounded-2xl hover:bg-red-100 transition"
                      >

                        <Trash2 size={18} />

                        Remove

                      </button>

                    </div>

                  </div>

                </motion.div>

              )
            )}

            {/* TOTAL */}

            <div className="bg-white border border-[#ece7df] rounded-[34px] p-8 shadow-sm flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

              <div>

                <p className="text-[#8c8378] text-lg mb-2">
                  Total Amount
                </p>

                <h2 className="text-5xl font-black text-[#1f1b16]">

                  ₹{total}

                </h2>

              </div>

              <button
                onClick={placeOrder}
                className="px-10 py-5 rounded-2xl bg-[#1f1b16] text-white text-xl font-semibold hover:opacity-90 transition duration-300 shadow-lg"
              >

                Place Order

              </button>

            </div>

          </div>

        )}

      </div>

    </div>

  );

}