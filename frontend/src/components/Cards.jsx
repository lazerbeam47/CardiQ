"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const Cards = ({ flashcards }) => {
    const [flipped, setFlipped] = useState([]);

    // Load from localStorage on first render
    useEffect(() => {
        const stored = localStorage.getItem("flippedCards");
        if (stored) {
            const parsed = JSON.parse(stored);
            // Ensure it matches the length of current flashcards
            if (parsed.length === flashcards.length) {
                setFlipped(parsed);
            } else {
                setFlipped(Array(flashcards.length).fill(false));
            }
        } else {
            setFlipped(Array(flashcards.length).fill(false));
        }
    }, [flashcards]);

    // Save to localStorage whenever flipped changes
    useEffect(() => {
        localStorage.setItem("flippedCards", JSON.stringify(flipped));
    }, [flipped]);

    const handleFlip = (index) => {
        setFlipped((prev) => {
            const updated = [...prev];
            updated[index] = !updated[index];
            return updated;
        });
    };

    return (
        <div className="grid grid-cols-3 gap-20 justify-items-center p-6">
            {flashcards.map((card, index) => (
                <div
                    key={index}
                    className="relative w-[300px] h-[240px] cursor-pointer"
                    onClick={() => handleFlip(index)}
                    style={{ perspective: "1000px" }} // Add 3D perspective
                >
                    <motion.div
                        className="relative w-full h-full"
                        animate={{ rotateY: flipped[index] ? 180 : 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {/* Front Side */}
                        {/* Front Side */}
                        <div
                            className="absolute inset-0 flex items-center justify-center bg-blue-500 text-white rounded-lg shadow-xl text-xl font-semibold px-6 text-center"
                            style={{ backfaceVisibility: "hidden" }}
>
                            <p className="whitespace-pre-wrap break-words">{card.question}</p>
                        </div>

                        {/* Back Side */}
                        <div
                            className="absolute inset-0 flex items-center justify-center bg-green-500 text-white rounded-lg shadow-xl text-xl font-semibold px-6 text-center"
                            style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
>
                            <p className="whitespace-pre-wrap break-words">{card.answer}</p>
                        </div>

                    </motion.div>
                </div>
            ))}
        </div>
    );
};
