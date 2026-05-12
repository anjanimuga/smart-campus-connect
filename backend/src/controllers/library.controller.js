const LibrarySeat =
  require(
    "../models/library.model"
  );

// GET ALL SEATS
exports.getSeats =
  async (req, res) => {

    try {

      const seats =
        await LibrarySeat.find();

      res.json(seats);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// ADD SEAT
exports.addSeat =
  async (req, res) => {

    try {

      const seat =
        await LibrarySeat.create(
          req.body
        );

      res.status(201).json(
        seat
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// BOOK SEAT
exports.bookSeat =
  async (req, res) => {

    try {

      const {
        bookedBy,
        bookedById,
      } = req.body;

      const seat =
        await LibrarySeat.findById(
          req.params.id
        );

      // CHECK
      if (
        seat.isBooked
      ) {

        return res
          .status(400)
          .json({
            message:
              "Seat already booked",
          });

      }

      seat.isBooked =
        true;

      seat.bookedBy =
        bookedBy;

      seat.bookedById =
        bookedById;

      seat.bookedAt =
        new Date();

      // OPTIONAL 2 HOUR TIMER
      seat.expiryTime =
        new Date(
          Date.now() +
          2 *
          60 *
          60 *
          1000
        );

      await seat.save();

      res.json(seat);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// RELEASE SEAT
exports.releaseSeat =
  async (req, res) => {

    try {

      const seat =
        await LibrarySeat.findById(
          req.params.id
        );

      seat.isBooked =
        false;

      seat.bookedBy =
        "";

      seat.bookedById =
        "";

      seat.bookedAt =
        null;

      seat.expiryTime =
        null;

      await seat.save();

      res.json({
        message:
          "Seat released",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// DELETE SEAT
exports.deleteSeat =
  async (req, res) => {

    try {

      await LibrarySeat.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Seat deleted",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };