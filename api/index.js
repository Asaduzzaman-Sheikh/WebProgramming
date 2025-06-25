import express from 'express';
import mongoose, { get } from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.route.js';
import dotenv from 'dotenv';
dotenv.config();

// console.log('MONGO_URL:', process.env.MONGO_URL);  // Add this line

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed:', error.message);
  });



const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use('/api/users', userRoutes);