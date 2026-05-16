import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import {
  ShoppingBag,
  Printer,
  ClipboardList,
  ShoppingCart,
  PencilRuler,
} from "lucide-react";

import API from "../services/api";

import toast from "react-hot-toast";

export default function Stationery() {

  const navigate =
    useNavigate();

  const [items, setItems] =
    useState([]);

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

  useEffect(() => {

    fetchItems();

  }, []);

  // ADD TO CART
  const addToCart =
    (item) => {

      const existingCart =
        JSON.parse(
          localStorage.getItem(
            "stationeryCart"
          )
        ) || [];

      const existingItem =
        existingCart.find(
          (cartItem) =>
            cartItem._id ===
            item._id
        );

      if (existingItem) {

        existingItem.quantity += 1;

      } else {

        existingCart.push({
          ...item,
          quantity: 1,
        });

      }

      localStorage.setItem(
        "stationeryCart",
        JSON.stringify(
          existingCart
        )
      );

      toast.success("Added to cart")

    };

  return (

    <div className="min-h-screen bg-[#f8f5ef] px-8 py-10 font-['Outfit'] overflow-hidden relative">

      {/* BACKGROUND */}

      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-orange-100/40 blur-3xl" />

      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-yellow-100/40 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-10 mb-16">

          <div>

            <div className="inline-flex items-center gap-3 bg-white border border-[#ece7df] px-5 py-3 rounded-full shadow-sm mb-6">

              <PencilRuler
                size={18}
                className="text-[#c27c2c]"
              />

              <p className="text-[#7a6d5b] font-medium text-sm">

                Creative Campus Essentials

              </p>

            </div>

            <h1 className="text-[65px] lg:text-[90px] leading-[0.95] font-black tracking-tight text-[#1f1f1f] mb-6">

              Stationery
              <br />

              <span className="text-[#c27c2c]">

                Store

              </span>

            </h1>

            <p className="text-xl text-[#6f6659] leading-relaxed max-w-2xl">

              Explore premium stationery, study essentials, print services and creative campus supplies.

            </p>

          </div>

          {/* BUTTONS */}

          <div className="flex flex-wrap gap-4">

            <button
              onClick={() =>
                navigate(
                  "/print-orders"
                )
              }
              className="flex items-center gap-3 bg-white border border-[#ece7df] text-[#1f1f1f] px-6 py-4 rounded-full font-semibold shadow-sm hover:scale-105 transition duration-300"
            >

              <ClipboardList size={18} />

              My Print Requests

            </button>

            <button
              onClick={() =>
                navigate(
                  "/print-upload"
                )
              }
              className="flex items-center gap-3 bg-white border border-[#ece7df] text-[#1f1f1f] px-6 py-4 rounded-full font-semibold shadow-sm hover:scale-105 transition duration-300"
            >

              <Printer size={18} />

              Print / Xerox

            </button>

            <button
              onClick={() =>
                navigate(
                  "/stationery-orders"
                )
              }
              className="flex items-center gap-3 bg-white border border-[#ece7df] text-[#1f1f1f] px-6 py-4 rounded-full font-semibold shadow-sm hover:scale-105 transition duration-300"
            >

              <ShoppingBag size={18} />

              My Orders

            </button>

            <button
              onClick={() =>
                navigate(
                  "/stationery-cart"
                )
              }
              className="flex items-center gap-3 bg-[#1f1f1f] text-white px-7 py-4 rounded-full font-semibold shadow-xl hover:scale-105 transition duration-300"
            >

              <ShoppingCart size={18} />

              Cart

            </button>

          </div>

        </div>

        {/* ITEMS GRID */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {items.map(
            (
              item,
              index
            ) => (

              <motion.div
                key={item._id}
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
                whileHover={{
                  y: -8,
                }}
                className="bg-white border border-[#ece7df] rounded-[36px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.05)] transition duration-500"
              >

                {/* IMAGE */}

                <div className="relative overflow-hidden bg-[#f3efe8]">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-72 object-cover hover:scale-105 transition duration-700"
                  />

                </div>

                {/* CONTENT */}

                <div className="p-7">

                  <div className="mb-6">

                    <div className="inline-flex bg-[#f8f5ef] border border-[#ece7df] px-4 py-2 rounded-full mb-5">

                      <p className="text-sm font-medium text-[#8a7c67]">

                        {item.category}

                      </p>

                    </div>

                    <h2 className="text-3xl font-black tracking-tight text-[#1f1f1f] mb-4">

                      {item.name}

                    </h2>

                    <div className="flex items-center justify-between">

                      <p className="text-4xl font-black text-[#1f1f1f]">

                        ₹{item.price}

                      </p>

                      <div className="bg-[#f8f5ef] border border-[#ece7df] px-4 py-2 rounded-full">

                        <p className="text-sm font-medium text-[#7a6d5b]">

                          Stock:
                          {" "}
                          {item.stock}

                        </p>

                      </div>

                    </div>

                  </div>

                  {/* BUTTON */}

                  <button
                    onClick={() =>
                      addToCart(item)
                    }
                    className="w-full bg-[#1f1f1f] text-white py-4 rounded-2xl font-semibold hover:bg-[#2f2f2f] transition duration-300"
                  >

                    Add to Cart

                  </button>

                </div>

              </motion.div>

            )
          )}

        </div>

      </div>

    </div>

  );

}