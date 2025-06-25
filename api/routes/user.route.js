import express from 'express';

const router = express.Router();

router.get('/register', (req, res) => {
  // Handle user registration
    res.send('User registration endpoint');
});

// router.post('/login', (req, res) => {
//   // Handle user login
//     res.send('User login endpoint');
// });

export default router;
import User from '../models/user.model.js';