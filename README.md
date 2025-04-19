# 🧠 CardIQ

CardIQ is a Flashcard Generator powered by Google’s Gemini AI. Upload a `.pdf` or `.txt` file, and CardIQ will intelligently extract content and return AI-generated flashcards in seconds — perfect for students, teachers, and self-learners.

---

## 🚀 Features

- ✨ Upload `.pdf` or `.txt` documents.
- 🧠 AI-generated flashcards using Google Gemini Pro model.
- 💾 Stores flashcards in MongoDB.
- 📁 Organized backend (Node.js + Express) and frontend (React).
- 🔒 .env support to keep API keys safe.

---

## 🗂️ Project Structure

cardiq/ │ ├── backend/ │ ├── controllers/ │ ├── models/ │ ├── routes/ │ ├── uploads/ # Temporarily stores uploaded files │ ├── .env # Contains API keys (not pushed) │ ├── .gitignore # Ignores node_modules and .env │ └── index.js # Entry point │ ├── frontend/ │ ├── public/ │ ├── src/ │ └── .env # Frontend environment variables (optional) │ └── README.md

markdown
Copy
Edit

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **AI**: Google Gemini Pro via `@google/generative-ai`
- **Frontend**: React.js, Tailwind CSS
- **Database**: MongoDB
- **File Parsing**: `pdf-parse`, `fs`, `multer`
- **Security**: Environment Variables via `.env`

---

## 📦 Installation & Setup

1. **Clone the repo**

git clone https://github.com/lazerbeam47/CardiQ.git
cd CardiQ

2.** Backend Setup

cd backend
npm install

**Create a .env file in backend/:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key

**Run the server:
node server.js

3.**Frontend Setup

cd ../frontend
npm install
npm run dev
