import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Business from "../models/Business.js"; // ✅ Import Business model

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // ✅ BusinessOwner-specific check (doesn't interfere with other roles)
      if (user.role === "businessOwner") {
        const business = await Business.findOne({ owner: user._id });

        if (business) {
          // If BusinessOwner already has details → Show Dashboard
          return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token,
            message: "Login successful - Redirecting to Dashboard",
            businessDetails: business, // Send business details if exists
          });
        } else {
          // If BusinessOwner is new → Show Add Business Form
          return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token,
            message: "Login successful - Please Add Business Details",
          });
        }
      }

      // ✅ Default login flow for non-BusinessOwner users (unchanged)
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
        message: "Login successful",
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
