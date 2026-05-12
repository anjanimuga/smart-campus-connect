const Food = require("../models/food.model");

// GET ALL FOODS
exports.getFoods = async (
  req,
  res
) => {

  try {

    const foods =
      await Food.find();

    res.json(foods);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// ADD FOOD
exports.addFood = async (
  req,
  res
) => {

  try {

    const food =
      await Food.create(req.body);

    res.status(201).json(food);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// DELETE FOOD
exports.deleteFood =
  async (req, res) => {

    try {

      await Food.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Food deleted",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  };

// UPDATE FOOD
exports.updateFood =
  async (req, res) => {

    try {

      const updateData =
        req.body;

      // AUTO HANDLE AVAILABILITY
      if (
        updateData.stock !==
        undefined
      ) {

        updateData.available =
          updateData.stock > 0;

      }

      const updatedFood =
        await Food.findByIdAndUpdate(
          req.params.id,
          updateData,
          {
            new: true,
          }
        );

      res.json(
        updatedFood
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });

    }

  };