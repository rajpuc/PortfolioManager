import UserModel from "../models/userModel.js";
import { verifyToken } from "../utility/tokenUtility.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    // Get token from headers
    const authHeader = req.cookies.token;
   
    if (!authHeader) {
      return res.status(401).json({ status: "failed", message: "Unauthorized: No token provided" });
    }
    
    const token = authHeader;

    // Verify the token
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ status: "failed", message: "Unauthorized: Invalid token" });
    }

    // Find the user in the database
    const user = await UserModel.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ status: "failed", message: "Unauthorized: User not found" });
    }

    // Attach user to the request object for further use in other routes
    req.user_id = user._id;
    
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(500).json({ status: "failed", message: "Internal Server Error" });
  }
};