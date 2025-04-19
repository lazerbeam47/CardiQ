import { useState, useEffect } from "react";
import { Cards } from "./Cards";
import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6"; 

export const Flashcard = () => {
    const [file, setFile] = useState(null);
    const [numCards, setNumCards] = useState(1);
    const [flashcards, setFlashcards] = useState([]);
    const [fileName, setFileName] = useState("Drop or Select File(pdf or txt)");
    const [loading, setLoading] = useState(false); // 👈 loading state

    useEffect(() => {
        const stored = localStorage.getItem("flashcards");
        if (stored) {
            setFlashcards(JSON.parse(stored));
        }
    }, []);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const allowedTypes = ["application/pdf", "text/plain"];
            if (!allowedTypes.includes(selectedFile.type)) {
                alert("Only PDF or text files are allowed!");
                setFile(null);
                setFileName("Drop or Select File");
                return;
            }
    
            setFile(selectedFile);
            setFileName(selectedFile.name);
        }
    };
    

    const handleChange = (e) => {
        const value = parseInt(e.target.value);
        if (value <= 30 && value > 0) {
            setNumCards(value);
        } else {
            alert("Enter values from 1-30");
        }
    };

    const onSubmit = async () => {
        if (numCards < 1 || numCards > 30 || !file) {
            alert("Please upload a file and enter a number between 1-30");
            return;
        }

        const uploadId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        setLoading(true); // 👈 start loading

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("uploadId", uploadId);

            const generateResponse = await fetch(`http://localhost:3000/api/generate/${numCards}`, {
                method: "POST",
                body: formData,
            });

            if (!generateResponse.ok) throw new Error("Error generating flashcards");

            const fetchResponse = await fetch(`http://localhost:3000/api/bulk/${uploadId}`);
            if (!fetchResponse.ok) throw new Error("Error fetching flashcards");

            const generatedflashcards = await fetchResponse.json();
            setFlashcards(generatedflashcards);
            localStorage.setItem("flashcards", JSON.stringify(generatedflashcards));
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false); // 👈 stop loading
        }
    };

    const handleReset = () => {
        localStorage.clear();
        setFlashcards([]);
        setNumCards(0);
        setFile(null);
        setFileName("Drop or Select File");
    };

    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-black 
                bg-[linear-gradient(to_right,#dd61ee_1px,transparent_1px),linear-gradient(to_bottom,#dd61ee_1px,transparent_1px)] 
                bg-[size:50px_40px] 
                [mask-image:radial-gradient(ellipse_90%_90%_at_50%_0%,#000_70%,transparent_110%)] 
                pointer-events-none z-0">
            </div>

            {/* Flashcard UI */}
            <div className="relative z-10 mt-5 mx-auto max-w-4xl p-4 border rounded-lg shadow-md bg-black text-white flex items-center justify-between gap-6">
                {/* Flashcard Count Input */}
                <div className="flex items-center gap-3">
                    <label className="text-lg font-semibold whitespace-nowrap">
                        No. of Flashcards:
                    </label>
                    <input
                        type="number"
                        className="border border-gray-400 bg-black text-white rounded px-3 py-2 focus:outline-none focus:border-purple-500 w-24 text-center"
                        placeholder="0-30"
                        value={numCards}
                        onChange={handleChange}
                    />
                </div>

                {/* File Input Box */}
                <label
                    className="border border-dashed border-gray-400 rounded-lg px-4 py-2 text-center cursor-pointer w-60 text-gray-300 font-medium overflow-hidden whitespace-nowrap text-ellipsis"
                    htmlFor="file-upload"
                >
                    {fileName}
                    <input
                        id="file-upload"
                        type="file"
                        accept=".pdf,.txt"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>

                {/* Buttons on the right */}
                <div className="flex gap-3">
                    <button
                        onClick={handleReset}
                        className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
                    >
                        Reset
                    </button>
                    <button
                        className="bg-green-500 text-white px-4 py-2 w-40 rounded-lg hover:bg-green-600 transition"
                        onClick={onSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>

            {/* Cards or Loader */}
            <div className="flex justify-evenly mt-8">
                {loading ? (
                    <div className="text-center text-white">
                        <svg
                            className="animate-spin h-10 w-10 mx-auto text-green-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                        </svg>
                        <p className="mt-2">Generating flashcards...</p>
                    </div>
                ) : (
                    <Cards flashcards={flashcards} />
                )}
            </div>

            <footer className="text-gray-400 w-full absolute bottom-0">
    <div className="flex justify-center gap-6 mb-2">
        <a href="https://www.linkedin.com/in/dabbu-mothsera-8b62b7235/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition">
            <FaLinkedin size={24} />
        </a>
        <a href="https://github.com/lazerbeam47" target="_blank" rel="noopener noreferrer" className="hover:text-black transition">
            <FaGithub size={24} />
        </a>
        <a href="https://x.com/DabbuMothsera" target="_blank" rel="noopener noreferrer" className="hover:text-black transition">
            <FaXTwitter size={24} />
        </a>
    </div>

    <div className="text-center pb-2">
        © {new Date().getFullYear()} CardiQ — Built with ❤️ for better learning
    </div>
</footer>

        </div>
    );
};
