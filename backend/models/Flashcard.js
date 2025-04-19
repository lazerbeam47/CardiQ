const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  uploadId:{type: String, required:true},
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Flashcard', flashcardSchema);
