"use client" 
import { useState } from "react";
import { motion } from "framer-motion";

export default function SharePopup({ score, player, levelTitle }) {
  const [isOpen, setIsOpen] = useState(false);
  const shareText = `I just scored ${score} in ${levelTitle}! Can you beat me? #Gaming`;
  const shareUrl = encodeURIComponent("https://yourgame.com");
  const shareMessage = encodeURIComponent(shareText);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="border border-black text-black px-4 py-2 rounded-lg"
      >
        Share Score
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="bg-white text-black rounded-2xl p-6 w-80 relative"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-black text-lg"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold text-center mb-4">Share Your Score</h2>
            <p className="text-center mb-4">{shareText}</p>
            <motion.div className="flex flex-col gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <a href={`https://twitter.com/intent/tweet?text=${shareMessage}&url=${shareUrl}`} target="_blank" rel="noopener noreferrer">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full border border-black text-black py-2 rounded-lg">
                  Share on Twitter
                </motion.button>
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full border border-black text-black py-2 rounded-lg">
                  Share on Facebook
                </motion.button>
              </a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noopener noreferrer">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full border border-black text-black py-2 rounded-lg">
                  Share on LinkedIn
                </motion.button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
