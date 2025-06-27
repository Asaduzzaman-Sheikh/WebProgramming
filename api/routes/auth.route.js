import express from 'express';
import { signup } from '../controllers/auth.controller.js';

const router = express.Router();

// Handle user registration logic here
router.post('/signup', signup);

export default router;