const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();


const allowedOrigin = 'https://moodboard-lite-37mv.vercel.app';
app.use(cors({
  origin: ["http://localhost:3000", "https://moodboard-lite-37mv.vercel.app"],
  credentials: true
}));

app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));


const authRoutes = require('./routes/auth');
const moodboardRoutes = require('./routes/moodboard');


app.use('/api/auth', authRoutes);
app.use('/api/moodboards', moodboardRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: err.message
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
