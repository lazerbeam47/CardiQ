const express = require('express');
const router = express.Router();
const { generateFlashcards } = require('../controllers/aiController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' }); // temp folder for uploaded files
router.post('/api/generate/:numCards',upload.single('file'),generateFlashcards);


module.exports = router;
