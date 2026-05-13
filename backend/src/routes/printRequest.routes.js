const express =
  require("express");

const router =
  express.Router();

const multer =
  require("multer");

const path =
  require("path");

const {
  createPrintRequest,
  getAllPrintRequests,
  getMyPrintRequests,
  updatePrintStatus,
} = require(
  "../controllers/printRequest.controller"
);

// MULTER STORAGE
const storage =
  multer.diskStorage({
    destination:
      function (
        req,
        file,
        cb
      ) {

        cb(
          null,
          "uploads/"
        );

      },

    filename:
      function (
        req,
        file,
        cb
      ) {

        cb(
          null,
          Date.now() +
            path.extname(
              file.originalname
            )
        );

      },
  });

const upload =
  multer({
    storage,
  });

// CREATE REQUEST
router.post(
  "/",
  upload.single("file"),
  createPrintRequest
);

// ADMIN ALL REQUESTS
router.get(
  "/",
  getAllPrintRequests
);

// USER REQUESTS
router.get(
  "/my/:userId",
  getMyPrintRequests
);

// UPDATE STATUS
router.put(
  "/:id",
  updatePrintStatus
);

module.exports =
  router;