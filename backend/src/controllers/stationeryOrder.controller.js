const StationeryOrder =
  require(
    "../models/stationeryOrder.model"
  );

// PLACE ORDER
exports.placeStationeryOrder =
  async (
    req,
    res
  ) => {

    try {

      const order =
        await StationeryOrder.create(
          req.body
        );

      res.status(201).json(
        order
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// GET USER ORDERS
exports.getMyStationeryOrders =
  async (
    req,
    res
  ) => {

    try {

      const orders =
        await StationeryOrder.find({
          userId:
            req.params.userId,
        }).sort({
          createdAt: -1,
        });

      res.json(
        orders
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// GET ALL ORDERS
exports.getAllStationeryOrders =
  async (
    req,
    res
  ) => {

    try {

      const orders =
        await StationeryOrder.find().sort({
          createdAt: -1,
        });

      res.json(
        orders
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// UPDATE STATUS
exports.updateStationeryOrderStatus =
  async (
    req,
    res
  ) => {

    try {

      const updatedOrder =
        await StationeryOrder.findByIdAndUpdate(
          req.params.id,
          {
            status:
              req.body.status,
          },
          {
            new: true,
          }
        );

      res.json(
        updatedOrder
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });

    }

  };