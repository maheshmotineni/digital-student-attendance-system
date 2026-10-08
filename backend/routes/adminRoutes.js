const express = require("express");
const router = express.Router();

const {
  createClass,
  createSubject,
  assignSubjectToTeacher,
  getAllUsers,getAdminStats
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");
const {roleMiddleware} = require("../middleware/roleMiddleware");

// Admin Only Routes
router.post("/class", protect, roleMiddleware("admin"), createClass);

router.post("/subject", protect, roleMiddleware("admin"), createSubject);

router.post("/stats",getAdminStats);

router.post(
  "/assign-subject",
  protect,
  roleMiddleware("admin"),
  assignSubjectToTeacher
);



router.get(
  "/users",
  protect,
  roleMiddleware("admin"),
  getAllUsers
);

module.exports = router;

