require("dotenv").config();

const mongoose =
  require("mongoose");

const Food =
  require("./models/food.model");

mongoose.connect(
  process.env.MONGO_URI
);

const foods = [

  {
    name: "Burger",
    price: 120,
    category: "Fast Food",
    stock: 10,
    image: "burger.jpg",
  },


{
    name: "Idly",
    price: 50,
    category: "South Indian",
    stock: 20,
    image: "Idly.jpg",
  },

  {
    name: "Pizza",
    price: 250,
    category: "Fast Food",
    stock: 8,
    image: "pizza.jpg",
  },

  {
    name: "French Fries",
    price: 90,
    category: "Snacks",
    stock: 15,
    image: "frenchfries.jpg",
  },

  {
    name: "Veg Biryani",
    price: 180,
    category: "Meals",
    stock: 12,
    image: "vegbiryani.jpg",
  },

  {
    name: "Veg Fried Rice",
    price: 160,
    category: "Meals",
    stock: 10,
    image: "vegfriedrice.jpg",
  },

  {
    name: "Masala Dosa",
    price: 100,
    category: "South Indian",
    stock: 14,
    image: "masaladosa.jpg",
  },

  {
    name: "Samosa",
    price: 25,
    category: "Snacks",
    stock: 30,
    image: "samosa.jpg",
  },

  {
    name: "Tea",
    price: 20,
    category: "Beverages",
    stock: 40,
    image: "tea.jpg",
  },

  {
    name: "Coffee",
    price: 30,
    category: "Beverages",
    stock: 35,
    image: "coffee.jpg",
  },

  {
    name: "Coke",
    price: 40,
    category: "Drinks",
    stock: 25,
    image: "Coke.jpg",
  },

  {
    name: "Thickshakes",
    price: 140,
    category: "Thickshakes",
    stock: 10,
    image: "thickshakes.jpg",
  },

  {
    name: "Paneer Puff",
    price: 45,
    category: "Snacks",
    stock: 20,
    image: "paneerpuff.jpg",
  },

  {
    name: "Parota Curry",
    price: 110,
    category: "Meals",
    stock: 10,
    image: "parotacurry.jpg",
  },

  {
    name: "Vada",
    price: 30,
    category: "South Indian",
    stock: 18,
    image: "vada.jpg",
  },

  {
    name: "Chicken Biryani",
    price: 220,
    category: "Meals",
    stock: 10,
    image: "chickenbiryani.jpg",
  },

  {
    name: "Chicken Shawarma",
    price: 120,
    category: "Fast Food",
    stock: 10,
    image: "ChickenShawarma.jpg",
  },

  {
    name: "Veg Meals",
    price: 150,
    category: "Meals",
    stock: 15,
    image: "vegmeals.jpg",
  },

];

const seedFoods =
  async () => {

    try {

      await Food.deleteMany();

      await Food.insertMany(
        foods
      );

      console.log(
        "Foods Seeded Successfully"
      );

      process.exit();

    } catch (error) {

      console.log(
        error
      );

      process.exit();

    }

  };

seedFoods();