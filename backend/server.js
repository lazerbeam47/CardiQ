const express = require('express');
const connectDB = require('./config/db');
const flashcardRouter = require('./routes/flashcardRoutes');
const aiRouter=require('./routes/aiRoutes')
const cors=require('cors');
require('dotenv').config();

const app = express();
const port = 3000;
app.use(cors({
  origin: "http://localhost:5173"
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
