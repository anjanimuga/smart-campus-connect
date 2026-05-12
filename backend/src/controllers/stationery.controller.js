const Stationery =
  require(
    "../models/stationery.model"
  );

// GET ALL ITEMS
exports.getStationery =
  async (
    req,
    res
  ) => {

    try {

      const items =
        await Stationery.find();

      res.json(
        items
      );

    } catch (error) {

      console.log(
        error
      );

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// ADD ITEM
exports.addStationery =
  async (
    req,
    res
  ) => {

    try {

      const item =
        await Stationery.create(
          req.body
        );

      res.status(201).json(
        item
      );

    } catch (error) {

      console.log(
        error
      );

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// UPDATE ITEM
exports.updateStationery =
  async (
    req,
    res
  ) => {

    try {

      const updatedItem =
        await Stationery.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.json(
        updatedItem
      );

    } catch (error) {

      console.log(
        error
      );

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// DELETE ITEM
exports.deleteStationery =
  async (
    req,
    res
  ) => {

    try {

      await Stationery.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Item deleted",
      });

    } catch (error) {

      console.log(
        error
      );

      res.status(500).json({
        message:
          error.message,
      });

    }

  };