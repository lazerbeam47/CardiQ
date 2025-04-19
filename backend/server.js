const express = require('express');
const connectDB = require('./config/db');
const flashcardRouter = require('./routes/flashcardRoutes');
const aiRouter=require('./routes/aiRoutes')
const cors=require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const allowedOrigins = [
  'http://localhost:5173',         // For local frontend
  'https://cardiq-sooty.vercel.app'  // Your deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
// Connect to MongoDB
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Use flashcard routes
app.use('/', flashcardRouter);
app.use('/',aiRouter)
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
