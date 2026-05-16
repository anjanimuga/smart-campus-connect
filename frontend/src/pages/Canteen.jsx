import {
  useEffect,
  useState,
  useContext,
} from "react";

import { motion } from "framer-motion";

import {
  ShoppingBag,
  ClipboardList,
  Search,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

import { CartContext } from "../context/CartContext";

export default function Canteen() {

  const navigate = useNavigate();

  const { addToCart } =
    useContext(CartContext);

  const [foods, setFoods] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [selectedFlavours,
    setSelectedFlavours] =
    useState({});

  // FETCH FOODS
  useEffect(() => {

    fetchFoods();

    const interval =
      setInterval(() => {

        fetchFoods();

      }, 3000);

    return () =>
      clearInterval(
        interval
      );

  }, []);

  const fetchFoods =
    async () => {

      try {

        const res =
          await API.get(
            "/foods"
          );

        setFoods(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  // FILTER SEARCH
  const filteredFoods =
    foods.filter((food) =>
      food.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  // ADD TO CART
  const handleAddToCart =
    (food) => {

      if (
        food.stock <= 0
      ) {

        return;

      }

      const item = {
        ...food,
        quantity: 1,
      };

      if (
        food.category
          .toLowerCase()
          .includes(
            "thickshake"
          )
      ) {

        item.flavour =
          selectedFlavours[
            food._id
          ] || "Cold Coffee";

      }

      addToCart(item);

    };

  // CHANGE FLAVOUR
  const handleFlavourChange =
    (id, flavour) => {

      setSelectedFlavours({
        ...selectedFlavours,
        [id]: flavour,
      });

    };

  return (

    <div className="min-h-screen bg-[#faf7f2] px-8 py-10 font-['Outfit']">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8 mb-14">

          <div>

            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-[#ece7df] shadow-sm mb-6">

              <span className="w-2.5 h-2.5 rounded-full bg-orange-400" />

              <p className="text-[#5e5246] font-medium text-sm">
                Premium Campus Café
              </p>

            </div>

            <h1 className="text-6xl font-black text-[#1f1b16] tracking-tight mb-4">

              Campus Canteen

            </h1>

            <p className="text-[#6b6258] text-xl leading-relaxed max-w-2xl">

              Fresh meals, premium beverages and student favourites —
              beautifully curated for your campus experience.

            </p>

          </div>

          {/* BUTTONS */}

          <div className="flex gap-4">

            <button
              onClick={() =>
                navigate("/orders")
              }
              className="flex items-center gap-3 bg-white border border-[#ece7df] text-[#1f1b16] px-6 py-4 rounded-2xl hover:shadow-lg transition duration-300"
            >

              <ClipboardList size={20} />

              View Orders

            </button>

            <button
              onClick={() =>
                navigate("/cart")
              }
              className="flex items-center gap-3 bg-[#1f1b16] text-white px-6 py-4 rounded-2xl hover:opacity-90 transition duration-300 shadow-lg"
            >

              <ShoppingBag size={20} />

              View Cart

            </button>

          </div>

        </div>

        {/* SEARCH */}

        <div className="relative mb-14">

          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8c8378]"
            size={20}
          />

          <input
            type="text"
            placeholder="Search food, beverages, snacks..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full bg-white border border-[#ece7df] rounded-[24px] pl-14 pr-6 py-5 outline-none text-[#1f1b16] placeholder:text-[#8c8378] shadow-sm focus:ring-2 focus:ring-orange-200 transition"
          />

        </div>

        {/* FOOD GRID */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {filteredFoods.map(
            (food, index) => (

              <motion.div
                key={food._id}
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
                  y: -8,
                }}
               className="group bg-white border border-[#ececec] rounded-[32px] overflow-hidden transition duration-300 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.10)]"
              >

                {/* IMAGE */}

                <div className="relative w-full h-[260px] overflow-hidden bg-[#f2ede6]">

                  <img
                    src={
                      food.image &&
                      food.image.startsWith("http")
                        ? food.image
                        : `/food/${food.image}`
                    }
                    alt={food.name}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* STOCK BADGE */}

                  {food.stock <= 0 && (

                    <div className="absolute top-5 right-5 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">

                      Out Of Stock

                    </div>

                  )}

                </div>

                {/* CONTENT */}

                <div className="p-7">

                  {/* CATEGORY */}

                  <div className="inline-flex px-4 py-2 rounded-full bg-[#f7f2eb] text-[#8a7864] text-sm font-medium mb-5">

                    {food.category}

                  </div>

                  {/* TITLE */}

                  <div className="flex justify-between items-start gap-4 mb-4">

                    <h2 className="text-[30px] font-black text-[#1f1b16] leading-tight">

                      {food.name}

                    </h2>

                    <p className="text-[26px] font-black text-[#1f1b16] whitespace-nowrap">

                      ₹{food.price}

                    </p>

                  </div>

                  {/* STOCK */}

                  <p className="text-[#8c8378] mb-6">

                    Available Stock:
                    {" "}
                    <span className="font-semibold text-[#1f1b16]">
                      {food.stock}
                    </span>

                  </p>

                  {/* FLAVOURS */}

                  {food.category
                    .toLowerCase()
                    .includes(
                      "thickshake"
                    ) && (

                    <select
                      onChange={(e) =>
                        handleFlavourChange(
                          food._id,
                          e.target.value
                        )
                      }
                      className="w-full bg-[#faf7f2] border border-[#ece7df] rounded-2xl px-5 py-4 mb-6 outline-none text-[#1f1b16]"
                    >

                      <option>
                        Cold Coffee
                      </option>

                      <option>
                        Matcha
                      </option>

                      <option>
                        Strawberry
                      </option>

                      <option>
                        Caramel
                      </option>

                    </select>

                  )}

                  {/* BUTTON */}

                  {

                    food.stock <= 0 ? (

                      <button
                        disabled
                        className="w-full bg-red-500 text-white py-4 rounded-2xl cursor-not-allowed font-semibold"
                      >

                        Out Of Stock

                      </button>

                    ) : (

                      <button
                        onClick={() =>
                          handleAddToCart(
                            food
                          )
                        }
                        className="w-full bg-[#111111] text-white py-4 rounded-2xl font-semibold transition duration-300 hover:scale-[1.02] active:scale-[0.98] hover:bg-black"
                      >

                        Add To Cart

                      </button>

                    )

                  }

                </div>

              </motion.div>

            )
          )}

        </div>

      </div>

    </div>

  );

}