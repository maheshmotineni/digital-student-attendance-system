const express = require("express");
const router = express.Router();

const {
  generateQR,
  deactivateQR
} = require("../controllers/qrController");

const {protect} = require("../middleware/authMiddleware");
const {roleMiddleware} = require("../middleware/roleMiddleware");

// Teacher generates QR
router.post(
  "/generate",
  protect,
  roleMiddleware("Teacher"),
  generateQR
);

// Teacher deactivates QR
router.put(
  "/deactivate/:id",
  protect,
  roleMiddleware("Teacher"),
  deactivateQR
);

module.exports = router;