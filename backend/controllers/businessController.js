const Business = require("../models/Business");
const cloudinary = require("cloudinary").v2; // Ensure Cloudinary is set up
const dotenv = require("dotenv");
dotenv.config();

// Upload image to Cloudinary
const uploadImage = async (imagePath) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath, { folder: "business_images" });
        return result.secure_url; // Get uploaded image URL
    } catch (error) {
        console.error("Image upload error:", error);
        throw new Error("Image upload failed");
    }
};

// Create a new business
exports.createBusiness = async (req, res) => {
    try {
        const { name, category, location, services, pricing, description } = req.body;
        const owner = req.user.id; // Extract user ID from token

        let imageUrl = null;
        if (req.file) {
            imageUrl = await uploadImage(req.file.path); // Upload image and get URL
        }

        const newBusiness = new Business({
            owner,
            name,
            category,
            location,
            services,
            pricing,
            description,
            image: imageUrl
        });

        await newBusiness.save();
        res.status(201).json({ success: true, business: newBusiness });
    } catch (error) {
        console.error("Business creation error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get business details by owner
exports.getBusinessByOwner = async (req, res) => {
    try {
        const businesses = await Business.find({ owner: req.user.id }).populate("bookings");
        res.status(200).json({ success: true, businesses });
    } catch (error) {
        console.error("Error fetching business:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get single business by ID
exports.getBusinessById = async (req, res) => {
    try {
        const business = await Business.findById(req.params.id).populate("bookings");
        if (!business) {
            return res.status(404).json({ success: false, message: "Business not found" });
        }
        res.status(200).json({ success: true, business });
    } catch (error) {
        console.error("Error fetching business by ID:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
