import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6"; 
export const Content = () => {
    const navigate = useNavigate();

    function Helper() {
        navigate("/flashcards");
    }

    return (
        <div className="min-h-screen flex flex-col justify-between px-4 md:px-12 py-30 ">
            <div className="flex flex-col items-center">
                <motion.div 
                    className="relative bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-6xl hover:shadow-2xl transition-all duration-300"
                    whileHover={{ rotateX: 10, rotateY: 10 }}
                >
                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
                        {/* Left side text */}
                        <div className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight text-gray-900 relative text-center md:text-left max-w-md">
                            <span className="absolute top-1 left-1 text-orange-400 blur-sm">Read Less, Retain More — Let AI Do the Heavy Lifting</span>
                            <span className="absolute top-0.5 left-0.5 text-gray-200">Read Less, Retain More — Let AI Do the Heavy Lifting</span>
                            <span className="relative text-black">Read Less, Retain More — Let AI Do the Heavy Lifting</span>
                        </div>

                        {/* Right side text */}
                        <div className="text-base sm:text-lg max-w-lg text-gray-700 leading-relaxed text-center md:text-left">
                            CardiQ is an AI-powered flashcard app that transforms your PDFs and text files into interactive flashcards. 
                            Simply upload your study material, and AI will generate questions and answers to help you learn and retain 
                            information faster. Perfect for students, professionals, and lifelong learners!
                        </div>
                    </div>
                </motion.div>

                <button
                    onClick={Helper}
                    className="mt-20 relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
                >
                    <span className="font-semibold relative px-12 py-4 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                        Get Started
                    </span>
                </button>
            </div>

            {/* Footer */}
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
