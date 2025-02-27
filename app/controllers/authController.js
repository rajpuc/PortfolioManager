import UserModel from "../models/userModel.js";
import { hashPassword, passComparison } from "../utility/passUtility.js";
import { generateToken } from "../utility/tokenUtility.js";

//user registration controller
export const registration = async function (req, res) {
  try {

    const { email, username, password } = req.body;

    // Hash password before saving
    const hashedPassword = await hashPassword(password);
    
    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      // Check if user is already verified
      if (existingUser.email) {
        return res.status(400).json({ status:"failed", message: "Email is already registered and verified. Please log in." });
      }

    }
    
    
    // Create new user
    let createdUser = await UserModel.create({
      username,
      email,
      password: hashedPassword
    });
    
    
    res.status(201).json({
        status: 'success',
        message: "Registration successful.",
        data: {
            id: createdUser._id,
            username: createdUser.username,
            email: createdUser.email,
        },
    })
  } catch (error) {
    console.log("Registration : "+ error.message);
    return res.status(500).json({ status: "failed", message: "Internal Server Error" });
  }
};

//user login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: "failed",
        message: "User not found",
      });
    }

    // Compare passwords
    const isPasswordValid = await passComparison(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid email or password",
      });
    }
  
    // Generate JWT token
    const token = generateToken(user.email, user._id);
    
    // res.cookie("token", token);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,  // Set to false in development, true in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    

    return res.status(200).json({ status: "success", message: "Login successfull"});
    
  } catch (error) {
    console.error("Login error:", error.message);
    return res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
  }
};



