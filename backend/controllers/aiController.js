const { GoogleGenerativeAI } = require("@google/generative-ai");
const Flashcard = require("../models/Flashcard");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const path = require("path");
const generateFlashcards = async (req, res) => {
  // const { text } = req.body;
  const numberofFlashcards = parseInt(req.params.numCards);
  const file = req.file;
  const uploadId = req.body.uploadId;
  console.log("params:", req.params);
  console.log("numCards:", req.params.numCards);

  if (!file) return res.status(400).json({ message: "No file required" });
  let text = "";
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === ".pdf") {
    const dataBuffer = fs.readFileSync(file.path);
    const data = await pdfParse(dataBuffer);
    text = data.text;
  } else if (ext === ".txt") {
    text = fs.readFileSync(file.path, "utf-8");
  } else {
    return res
      .status(400)
      .json({ error: "Unsupported file type: Upload a PDF or TXT file" });
  }
  fs.unlinkSync(file.path);

  if (!text) return res.status(400).json({ message: "Text is required" });
  try {
    const prompt = `Generate ${numberofFlashcards} flashcards based on this text: "${text}". 
        Format output as a JSON array without any extra formatting: 
        [{"question": "...", "answer": "..."}]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    let jsonString = response.candidates[0].content.parts[0].text;

    // ✅ Remove Markdown code blocks (e.g., ```json ... ```)
    jsonString = jsonString.replace(/```json|```/g, "").trim();

    const flashcards = JSON.parse(jsonString);
    const flashcardsWithUploadId = flashcards.map((card) => ({
      ...card,
      uploadId,
    }));
    // Store in the database
    const savedFlashcards = await Flashcard.insertMany(flashcardsWithUploadId);

    res.json(savedFlashcards);
  } catch (error) {
    console.error("Error generating flashcards:", error);
    res
      .status(500)
      .json({ message: "AI generation failed", error: error.message });
  }
};

module.exports = { generateFlashcards };
