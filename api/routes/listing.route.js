import express from 'express';
import { createListing, deleteListing } from '../controllers/listing.controller.js';
import {verifyToken} from '../utils/verifyUser.js';

const router = express.Router();

// Define your listing routes here
router.post('/create', verifyToken, createListing);
// Delete a listing
router.delete('/delete/:id', verifyToken, deleteListing);

export default router;
