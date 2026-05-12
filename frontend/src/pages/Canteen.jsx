import {
  useEffect,
  useState,
  useContext,
} from "react";

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

    // AUTO REFRESH STOCK
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

      // BLOCK OUT OF STOCK
      if (
        food.stock <= 0
      ) {

        return;

      }

      const item = {
        ...food,
        quantity: 1,
      };

      // THICKSHAKE FLAVOURS
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

    <div className="min-h-screen bg-[#151312] text-white px-8 py-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-12">

          <div>

            <h1 className="text-5xl font-semibold mb-3">
              Campus Canteen
            </h1>

            <p className="text-gray-400">
              Fresh meals and snacks for students.
            </p>

          </div>

          {/* BUTTONS */}
          <div className="flex gap-4">

            <button
              onClick={() =>
                navigate("/orders")
              }
              className="bg-white/10 border border-white/10 text-white px-6 py-3 rounded-full hover:bg-white/20 transition"
            >
              View Orders
            </button>

            <button
              onClick={() =>
                navigate("/cart")
              }
              className="bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition"
            >
              View Cart
            </button>

          </div>

        </div>

        {/* SEARCH */}
        <div className="mb-12">

          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

        </div>

        {/* FOOD GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredFoods.map(
            (food) => (

              <div
                key={food._id}
                className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden"
              >

                {/* IMAGE */}
                <img
                  src={`/food/${food.image}`}
                  alt={food.name}
                  className="w-full h-56 object-cover"
                />

                <div className="p-6">

                  {/* TOP */}
                  <div className="flex justify-between items-start gap-4">

                    <div>

                      <h2 className="text-2xl font-semibold">
                        {food.name}
                      </h2>

                      <p className="text-gray-400 mt-2">
                        {
                          food.category
                        }
                      </p>

                    </div>

                    {/* OUT OF STOCK BADGE */}
                    {food.stock <= 0 && (

                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm whitespace-nowrap">

                        Out Of Stock

                      </span>

                    )}

                  </div>

                  {/* PRICE + STOCK */}
                  <div className="mt-5 flex justify-between items-center">

                    <p className="text-2xl font-semibold">
                      ₹{food.price}
                    </p>

                    <p className="text-gray-400">
                      Stock:
                      {" "}
                      {food.stock}
                    </p>

                  </div>

                  {/* THICKSHAKE FLAVOURS */}
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
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 mt-5 outline-none"
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
                        className="w-full mt-6 bg-red-500 text-white py-4 rounded-2xl cursor-not-allowed font-semibold"
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
                        className="w-full mt-6 bg-white text-black py-4 rounded-2xl font-semibold hover:bg-gray-200 transition"
                      >

                        Add To Cart

                      </button>

                    )

                  }

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );

}