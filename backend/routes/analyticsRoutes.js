const express = require("express");
const router = express.Router();

const {
  getOverallAnalytics,
  getMonthlyAnalytics,
  getAnalytics
} = require("../controllers/analyticsController");



const {protect} = require("../middleware/authMiddleware");
const {roleMiddleware} = require("../middleware/roleMiddleware");

// Admin Dashboard Analytics
router.get(
  "/overall",
  protect,
  roleMiddleware("admin"),
  getOverallAnalytics
);

router.get(
  "/monthly",
  protect,
  roleMiddleware("admin"),
  getMonthlyAnalytics
);


module.exports = router;