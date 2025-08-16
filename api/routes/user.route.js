import express from 'express';
import { test, updateUser } from '../controllers/user.controllers.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Test route
router.get('/test', test);

// Update user route (requires token verification)
router.post('/update/:id', verifyToken, updateUser);

export default router;

