const express =
  require("express");

const router =
  express.Router();

const {
  getSeats,
  addSeat,
  bookSeat,
  releaseSeat,
  deleteSeat,
} = require(
  "../controllers/library.controller"
);

// GET ALL SEATS
router.get(
  "/",
  getSeats
);

// ADD SEAT
router.post(
  "/",
  addSeat
);

// BOOK SEAT
router.put(
  "/book/:id",
  bookSeat
);

// RELEASE SEAT
router.put(
  "/release/:id",
  releaseSeat
);

// DELETE SEAT
router.delete(
  "/:id",
  deleteSeat
);

module.exports =
  router;