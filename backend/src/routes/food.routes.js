const express = require("express");

const router = express.Router();

const {
  getFoods,
  addFood,
  deleteFood,
  updateFood,
} = require(
  "../controllers/food.controller"
);

// GET
router.get(
  "/foods",
  getFoods
);

// ADD
router.post(
  "/foods",
  addFood
);

// DELETE
router.delete(
  "/foods/:id",
  deleteFood
);

// UPDATE
router.put(
  "/foods/:id",
  updateFood
);

module.exports = router;