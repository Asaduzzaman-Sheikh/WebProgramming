import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from '../utils/error.js';

// The 'test' function and other exports remain the same
export const test = (req, res) => {
  res.status(200).json({
    message: 'API is working',
  });
};


// --- Password validation helper function (from your signup logic) ---
const validatePassword = (password) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  if (!/[A-Za-z]/.test(password)) {
    return "Password must contain at least one letter.";
  }
  if (!/\d]/.test(password)) {
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
    const { email, password, currentPassword } = req.body;

    if (email || password) {
      if (!currentPassword) {
        return next(errorHandler(400, 'Current password is required to make these changes.'));
      }
      const user = await User.findById(req.params.id);
      const isMatch = bcrypt.compareSync(currentPassword, user.password);
      if (!isMatch) {
        return next(errorHandler(401, 'Invalid current password.'));
      }

      if (password) {
        // --- UPDATED: Use the new validation function ---
        const passwordError = validatePassword(password);
        if (passwordError) {
          return next(errorHandler(400, passwordError));
        }
        req.body.password = bcrypt.hashSync(password, 10);
      }
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