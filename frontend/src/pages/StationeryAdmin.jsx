import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

export default function StationeryAdmin() {

  const [items, setItems] =
    useState([]);

  const [newItem, setNewItem] =
    useState({
      name: "",
      price: "",
      category: "",
      image: "",
      stock: "",
    });

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

  // ADD ITEM
  const addItem =
    async () => {

      try {

        await API.post(
          "/stationery",
          {
            ...newItem,
            price:
              Number(
                newItem.price
              ),
            stock:
              Number(
                newItem.stock
              ),
          }
        );

        setNewItem({
          name: "",
          price: "",
          category: "",
          image: "",
          stock: "",
        });

        fetchItems();

      } catch (error) {

        console.log(error);

      }

    };

  // DELETE ITEM
  const deleteItem =
    async (id) => {

      try {

        await API.delete(
          `/stationery/${id}`
        );

        fetchItems();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="min-h-screen bg-[#151312] text-white px-8 py-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-12">

          <h1 className="text-5xl font-semibold mb-3">
            Stationery Admin
          </h1>

          <p className="text-gray-400">
            Manage stationery inventory.
          </p>

        </div>

        {/* ADD ITEM */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-12">

          <h2 className="text-3xl font-semibold mb-8">
            Add Stationery Item
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            <input
              type="text"
              placeholder="Item Name"
              value={newItem.name}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  name:
                    e.target.value,
                })
              }
              className="bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="number"
              placeholder="Price"
              value={newItem.price}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  price:
                    e.target.value,
                })
              }
              className="bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Category"
              value={newItem.category}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  category:
                    e.target.value,
                })
              }
              className="bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={newItem.image}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  image:
                    e.target.value,
                })
              }
              className="bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="number"
              placeholder="Stock"
              value={newItem.stock}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  stock:
                    e.target.value,
                })
              }
              className="bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

          </div>

          <button
            onClick={addItem}
            className="mt-8 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition"
          >

            Add Item

          </button>

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

                <p className="text-3xl font-bold mb-3">
                  ₹{item.price}
                </p>

                <p className="text-sm text-gray-500 mb-5">
                  Stock:
                  {" "}
                  {item.stock}
                </p>

                <button
                  onClick={() =>
                    deleteItem(
                      item._id
                    )
                  }
                  className="w-full bg-red-500 text-white py-3 rounded-2xl font-semibold hover:bg-red-600 transition"
                >

                  Delete

                </button>

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );

}