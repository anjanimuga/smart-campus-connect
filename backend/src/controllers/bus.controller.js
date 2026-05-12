const Bus =
  require(
    "../models/bus.model"
  );

// GET ALL BUSES
exports.getBuses =
  async (
    req,
    res
  ) => {

    try {

      const buses =
        await Bus.find();

      res.json(
        buses
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// ADD BUS
exports.addBus =
  async (
    req,
    res
  ) => {

    try {

      const bus =
        await Bus.create(
          req.body
        );

      res.status(201).json(
        bus
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// UPDATE BUS
exports.updateBus =
  async (
    req,
    res
  ) => {

    try {

      const updatedBus =
        await Bus.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.json(
        updatedBus
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// DELETE BUS
exports.deleteBus =
  async (
    req,
    res
  ) => {

    try {

      await Bus.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Bus deleted",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };