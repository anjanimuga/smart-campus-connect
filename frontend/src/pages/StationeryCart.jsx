import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import API from "../services/api";

export default function StationeryCart() {

  const navigate =
    useNavigate();

  const [cart, setCart] =
    useState([]);

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  useEffect(() => {

    const storedCart =
      JSON.parse(
        localStorage.getItem(
          "stationeryCart"
        )
      ) || [];

    setCart(
      storedCart
    );

  }, []);

  const totalPrice =
    cart.reduce(
      (
        total,
        item
      ) =>
        total +
        item.price *
          item.quantity,
      0
    );

  // PLACE ORDER
  const placeOrder =
    async () => {

      try {

        await API.post(
          "/stationery-orders",
          {
            userId:
              user._id,

            userName:
              user.name,

            items: cart,

            totalPrice,
          }
        );

        localStorage.removeItem(
          "stationeryCart"
        );

        navigate(
          "/stationery-orders"
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="min-h-screen bg-[#151312] text-white px-8 py-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-semibold mb-10">
          Stationery Cart
        </h1>

        <div className="space-y-6">

          {cart.map(
            (
              item,
              index
            ) => (

              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 flex justify-between items-center"
              >

                <div>

                  <h2 className="text-2xl font-semibold">
                    {item.name}
                  </h2>

                  <p className="text-gray-400 mt-2">
                    Quantity:
                    {" "}
                    {item.quantity}
                  </p>

                </div>

                <p className="text-2xl font-bold">
                  ₹
                  {item.price *
                    item.quantity}
                </p>

              </div>

            )
          )}

        </div>

        <div className="mt-12 flex justify-between items-center">

          <h2 className="text-4xl font-bold">
            Total:
            {" "}
            ₹{totalPrice}
          </h2>

          <button
            onClick={placeOrder}
            className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition"
          >

            Place Order

          </button>

        </div>

      </div>

    </div>

  );

}