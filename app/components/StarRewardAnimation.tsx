// components/StarRewardAnimation.tsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StarRewardAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);
  const [stars, setStars] = useState([false, false, false]);
  const [messages, setMessages] = useState<string[]>([]);

  // Steps: 
  // 0: Initial delay
  // 1: Time star
  // 2: Accuracy star
  // 3: Level completion star
  // 4: Final display

  useEffect(() => {
    const sequence = [
      // Initial delay
      () => new Promise(resolve => setTimeout(resolve, 500)),
      
      // Time star
      () => {
        setMessages(["Time Bonus!"]);
        return new Promise(resolve => setTimeout(resolve, 1000));
      },
      () => {
        setStars([true, false, false]);
        return new Promise(resolve => setTimeout(resolve, 800));
      },
      
      // Accuracy star
      () => {
        setMessages(prev => [...prev, "Accuracy Bonus!"]);
        return new Promise(resolve => setTimeout(resolve, 1000));
      },
      () => {
        setStars([true, true, false]);
        return new Promise(resolve => setTimeout(resolve, 800));
      },
      
      // Level completion star
      () => {
        setMessages(prev => [...prev, "Level Complete!"]);
        return new Promise(resolve => setTimeout(resolve, 1000));
      },
      () => {
        setStars([true, true, true]);
        return new Promise(resolve => setTimeout(resolve, 1200));
      },
      
      // Final display
      () => {
        setMessages(["Quiz Completed!", "Great Job!"]);
        return new Promise(resolve => setTimeout(resolve, 1500));
      },
      
      // Complete
      () => {
        onComplete();
      }
    ];

    if (step < sequence.length) {
      sequence[step]().then(() => {
        setStep(prev => prev + 1);
      });
    }
  }, [step, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 text-white p-4">
      <div className="max-w-md w-full text-center">
        {/* Title */}
        <motion.h1 
          className="text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Congratulations!
        </motion.h1>
        
        {/* Stars Display */}
        <div className="flex justify-center space-x-8 my-8">
          {stars.map((filled, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ 
                scale: filled ? 1.2 : 0.8,
                rotate: 0
              }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                delay: filled ? 0.1 * index : 0
              }}
              className={`text-6xl ${filled ? 'text-yellow-400' : 'text-gray-600'}`}
            >
              {filled ? '★' : '☆'}
            </motion.div>
          ))}
        </div>
        
        {/* Messages */}
        <div className="min-h-[80px] mt-6">
          <AnimatePresence mode="wait">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-semibold my-2"
              >
                {msg}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Progress Bar */}
        <motion.div 
          className="mt-12 h-2 bg-gray-700 rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 5, ease: 'linear' }}
        >
          <div className="h-full bg-yellow-500"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default StarRewardAnimation;