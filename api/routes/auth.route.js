import express from 'express';
import { signup } from '../controllers/auth.controller.js';
import { signin } from '../controllers/auth.controller.js';

const router = express.Router();

// Handle user registration logic here
router.post('/signup', signup);
// Handle user sign logic here
router.post('/signin', signin);

export default router;