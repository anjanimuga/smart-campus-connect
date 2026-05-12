import {
  useContext,
} from "react";

import { useNavigate } from "react-router-dom";

import { CartContext } from "../context/CartContext";

import API from "../services/api";

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

    <div className="min-h-screen bg-[#151312] text-white px-8 py-10">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-12">

          <div>

            <h1 className="text-5xl font-semibold mb-3">
              Your Cart
            </h1>

            <p className="text-gray-400">
              Review your items before placing order.
            </p>

          </div>

          <button
            onClick={() =>
              navigate("/orders")
            }
            className="bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition"
          >
            View Orders
          </button>

        </div>

        {/* STUDENT DETAILS */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">

          <h2 className="text-2xl font-semibold mb-6">
            Student Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>

              <p className="text-gray-400 mb-1">
                Name
              </p>

              <p className="text-xl">
                {user.name ||
                  "Not Added"}
              </p>

            </div>

            <div>

              <p className="text-gray-400 mb-1">
                Branch
              </p>

              <p className="text-xl">
                {user.branch ||
                  "Not Added"}
              </p>

            </div>

            <div>

              <p className="text-gray-400 mb-1">
                Year
              </p>

              <p className="text-xl">
                {user.year ||
                  "Not Added"}
              </p>

            </div>

            <div>

              <p className="text-gray-400 mb-1">
                Roll No
              </p>

              <p className="text-xl">
                {user.rollNo ||
                  "Not Added"}
              </p>

            </div>

            <div>

              <p className="text-gray-400 mb-1">
                Phone
              </p>

              <p className="text-xl">
                {user.phone ||
                  "Not Added"}
              </p>

            </div>

          </div>

        </div>

        {/* EMPTY CART */}
        {cart.length === 0 ? (

          <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center">

            <h2 className="text-2xl font-semibold">
              Cart is Empty
            </h2>

          </div>

        ) : (

          <div className="space-y-8">

            {/* ITEMS */}
            {cart.map(
              (item, index) => (

                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-3xl p-8"
                >

                  <div className="flex justify-between items-center">

                    <div>

                      <h2 className="text-2xl font-semibold">
                        {item.name}
                      </h2>

                      {item.flavour && (

                        <p className="text-gray-400 mt-2">
                          Flavour:
                          {" "}
                          {
                            item.flavour
                          }
                        </p>

                      )}

                      <p className="text-xl mt-4">
                        ₹{item.price}
                      </p>

                    </div>

                    {/* QUANTITY */}
                    <div className="flex items-center gap-4">

                      <button
                        onClick={() =>
                          decreaseQuantity(
                            index
                          )
                        }
                        className="bg-white text-black w-10 h-10 rounded-full text-xl font-semibold"
                      >
                        -
                      </button>

                      <p className="text-2xl">
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
                        className="bg-white text-black w-10 h-10 rounded-full text-xl font-semibold"
                      >
                        +
                      </button>

                    </div>

                    {/* REMOVE */}
                    <button
                      onClick={() =>
                        removeFromCart(
                          index
                        )
                      }
                      className="bg-red-500 text-white px-5 py-3 rounded-full"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              )
            )}

            {/* TOTAL */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex justify-between items-center">

              <h2 className="text-3xl font-semibold">
                Total
              </h2>

              <h2 className="text-4xl font-semibold">
                ₹{total}
              </h2>

            </div>

            {/* PLACE ORDER */}
            <button
              onClick={placeOrder}
              className="w-full bg-white text-black py-5 rounded-3xl text-2xl font-semibold hover:bg-gray-200 transition"
            >
              Place Order
            </button>

          </div>

        )}

      </div>

    </div>

  );

}