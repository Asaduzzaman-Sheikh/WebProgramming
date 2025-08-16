import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from '../utils/error.js';

export const test = (req, res) => {
  res.status(200).json({
    message: 'API is working',
  });
};

// --- Password validation helper function (updated to match frontend) ---
const validatePassword = (password) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }
  if (!/\d/.test(password)) { // Corrected the regex here
    return "Password must contain at least one number.";
  }
  if (!/[@$!%*?&]/.test(password)) {
    return "Password must contain at least one special character (@$!%*?&).";
  }
  return null; // No errors
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can only update your own account!'));
  }
  try {
    const { password } = req.body;
    
    // If a new password is provided, validate and hash it
    if (password) {
      const passwordError = validatePassword(password);
      if (passwordError) {
        return next(errorHandler(400, passwordError));
      }
      req.body.password = bcryptjs.hashSync(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password: pass, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
