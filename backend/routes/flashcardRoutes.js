const express = require('express');
const router = express.Router();

const {
  getFlashcardsByUploadId,
  createFlashcard,
  deleteFlashcard,
} = require('../controllers/flashcardController');

// GET all flashcards w.r.t UploadId
router.get('/api/bulk/:uploadId', getFlashcardsByUploadId);

// POST a new flashcard
router.post('/api/create', createFlashcard);

// DELETE a flashcard by ID
router.delete('/api/delete/:id', deleteFlashcard);

module.exports = router;


