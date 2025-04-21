
const Flashcard = require("../models/Flashcard");

require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Confirm API key is loaded (for debug)
console.log("Gemini API Key loaded:", process.env.GEMINI_API_KEY); // remove after debugging

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });


const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');

const generateFlashcards = async (req, res) => {
    const numberofFlashcards = parseInt(req.params.numCards);
    const file = req.file;
    const uploadId = req.body.uploadId;

    console.log('params:', req.params);
    console.log('numCards:', req.params.numCards);

    if (!file) return res.status(400).json({ message: "No file provided" });

    let text = '';
    const ext = path.extname(file.originalname).toLowerCase();

    try {
        if (ext === '.pdf') {
            const dataBuffer = fs.readFileSync(file.path);
            const data = await pdfParse(dataBuffer);
            text = data.text;
        } else if (ext === '.txt') {
            text = fs.readFileSync(file.path, 'utf-8');
        } else {
            fs.unlinkSync(file.path);
            return res.status(400).json({ error: "Unsupported file type. Upload a PDF or TXT file." });
        }

        fs.unlinkSync(file.path); // Clean up uploaded file

        if (!text) return res.status(400).json({ message: "Text could not be extracted from file" });

        const prompt = `Generate ${numberofFlashcards} flashcards based on this text: "${text}". 
        Format output as a JSON array without any extra formatting: 
        [{"question": "...", "answer": "..."}]`;

        const result = await model.generateContent(prompt);
        const response = await result.response;

        let jsonString = response.candidates[0].content.parts[0].text;

        // ✅ Clean up markdown code block formatting
        jsonString = jsonString.replace(/```json|```/g, "").trim();

        const flashcards = JSON.parse(jsonString);

        const flashcardsWithUploadId = flashcards.map(card => ({
            ...card,
            uploadId,
        }));

        // Save to MongoDB
        const savedFlashcards = await Flashcard.insertMany(flashcardsWithUploadId);

        res.json(savedFlashcards);
    } catch (error) {
        console.error("❌ Error generating flashcards:", error);
        res.status(500).json({
            message: "AI generation failed",
            error: error.message
        });
    }
};

module.exports = { generateFlashcards };




