import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      const error = new Error('All fields are required.');
      error.status = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    next(error); // Pass error to middleware
  }
};



const JWT_SECRET = process.env.JWT_SECRET || '4f8d9e72a17b4c1db6e9f3a2847e2c5f9d8a4b1c0e6f7a2d9b4c8e1f0a3d5b7c';
const JWT_EXPIRES_IN = '7d';

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw errorHandler(400, 'Email and password are required.');
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw errorHandler(401, 'Invalid email or password.');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw errorHandler(401, 'Invalid email or password.');
    }

    // ✅ Create token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // ✅ Set HttpOnly cookie
    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // true if in production with HTTPS
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({
        message: 'Signin successful',
        user: userData,
      });
  } catch (error) {
    next(error);
  }
};
