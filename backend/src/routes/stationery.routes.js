const express =
  require("express");

const router =
  express.Router();

const {
  getStationery,
  addStationery,
  updateStationery,
  deleteStationery,
} = require(
  "../controllers/stationery.controller"
);

// GET ALL
router.get(
  "/",
  getStationery
);

// ADD ITEM
router.post(
  "/",
  addStationery
);

// UPDATE ITEM
router.put(
  "/:id",
  updateStationery
);

// DELETE ITEM
router.delete(
  "/:id",
  deleteStationery
);

module.exports =
  router;