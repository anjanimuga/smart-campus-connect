import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

export default function Stationery() {

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

  return (

    <div className="min-h-screen bg-[#151312] text-white px-8 py-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-12">

          <h1 className="text-5xl font-semibold mb-3">
            Stationery Store
          </h1>

          <p className="text-gray-400">
            Buy stationery items inside campus.
          </p>

        </div>

        {/* ITEMS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {items.map(
            (item) => (

              <div
                key={item._id}
                className="bg-white/5 border border-white/10 rounded-3xl p-6"
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-52 object-cover rounded-2xl mb-5"
                />

                <h2 className="text-2xl font-semibold mb-2">
                  {item.name}
                </h2>

                <p className="text-gray-400 mb-2">
                  {item.category}
                </p>

                <p className="text-3xl font-bold mb-4">
                  ₹{item.price}
                </p>

                <p className="text-sm text-gray-500 mb-5">
                  Stock:
                  {" "}
                  {item.stock}
                </p>

                <button
                  className="w-full bg-white text-black py-3 rounded-2xl font-semibold hover:bg-gray-200 transition"
                >

                  Add to Cart

                </button>

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );

}