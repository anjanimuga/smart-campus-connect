const express =
  require("express");

const router =
  express.Router();

const {
  placeStationeryOrder,
  getMyStationeryOrders,
  getAllStationeryOrders,
  updateStationeryOrderStatus,
} = require(
  "../controllers/stationeryOrder.controller"
);

// PLACE ORDER
router.post(
  "/",
  placeStationeryOrder
);

// USER ORDERS
router.get(
  "/my/:userId",
  getMyStationeryOrders
);

// ADMIN ORDERS
router.get(
  "/",
  getAllStationeryOrders
);

// UPDATE STATUS
router.put(
  "/:id",
  updateStationeryOrderStatus
);

module.exports =
  router;