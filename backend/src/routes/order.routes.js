const express = require("express");

const router = express.Router();

const {
  createOrder,
  getOrders,
  updateOrderStatus,
} = require(
  "../controllers/order.controller"
);

// CREATE
router.post(
  "/orders",
  createOrder
);

// GET
router.get(
  "/orders",
  getOrders
);

// UPDATE STATUS
router.put(
  "/orders/:id",
  updateOrderStatus
);

module.exports = router;