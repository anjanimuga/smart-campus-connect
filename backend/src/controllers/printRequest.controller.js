const PrintRequest =
  require(
    "../models/printRequest.model"
  );

// CREATE REQUEST
exports.createPrintRequest =
  async (
    req,
    res
  ) => {

    try {

      const request =
        await PrintRequest.create({
          userId:
            req.body.userId,

          userName:
            req.body.userName,

          fileUrl:
            `/uploads/${req.file.filename}`,

          fileName:
            req.file.originalname,

          copies:
            req.body.copies,

          printType:
            req.body.printType,

          sideType:
            req.body.sideType,
        });

      res.status(201).json(
        request
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// GET ALL REQUESTS
exports.getAllPrintRequests =
  async (
    req,
    res
  ) => {

    try {

      const requests =
        await PrintRequest.find().sort({
          createdAt: -1,
        });

      res.json(
        requests
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// GET USER REQUESTS
exports.getMyPrintRequests =
  async (
    req,
    res
  ) => {

    try {

      const requests =
        await PrintRequest.find({
          userId:
            req.params.userId,
        }).sort({
          createdAt: -1,
        });

      res.json(
        requests
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
exports.updatePrintStatus =
  async (
    req,
    res
  ) => {

    try {

      const updated =
        await PrintRequest.findByIdAndUpdate(
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
        updated
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });

    }

  };