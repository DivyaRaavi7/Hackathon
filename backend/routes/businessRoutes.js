const express = require("express");
const router = express.Router();
const { createBusiness, getBusinessByOwner, getBusinessById } = require("../controllers/businessController");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");

const upload = multer({ dest: "uploads/" }); // Store temp files before Cloudinary upload

// Route to create a business (Protected)
router.post("/", protect, upload.single("image"), createBusiness);

// Route to get all businesses of the logged-in user
router.get("/mybusiness", protect, getBusinessByOwner);

// Route to get a business by ID
router.get("/:id", getBusinessById);

module.exports = router;
