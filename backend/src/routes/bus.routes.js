const express =
  require("express");

const router =
  express.Router();

const {
  getBuses,
  addBus,
  updateBus,
  deleteBus,
} = require(
  "../controllers/bus.controller"
);

router.get(
  "/",
  getBuses
);

router.post(
  "/",
  addBus
);

router.put(
  "/:id",
  updateBus
);

router.delete(
  "/:id",
  deleteBus
);

module.exports =
  router;