import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

interface Photo {
  url: string;
  caption: string;
}

const photos: Photo[] = [
  {
    url: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?auto=format&fit=crop&w=800&q=80",
    caption: "Remember our first picnic? 🌸"
  },
  {
    url: "https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=800&q=80",
    caption: "That sunset was magical ✨"
  },
  {
    url: "https://images.unsplash.com/photo-1543269664-7eef42226a21?auto=format&fit=crop&w=800&q=80",
    caption: "Coffee dates with you ☕️"
  }
];

const letter = `Dear Love,

Words can't express how grateful I am to have you in my life. Every moment we spend together fills my heart with joy and makes me fall in love with you all over again.

You make my world brighter just by being in it.

Forever yours,
Me 💕`;

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    if (currentIndex < photos.length) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-rose-50 flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            className="cursor-pointer"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-[400px] h-[280px] bg-white rounded-lg shadow-xl relative transform hover:rotate-2 transition-transform overflow-hidden">
              {/* Envelope flap (top) */}
              <div className="absolute top-0 left-0 w-full h-[140px] bg-white">
                <div 
                  className="absolute bottom-0 left-0 w-full h-full bg-white"
                  style={{
                    clipPath: 'polygon(0 100%, 50% 40%, 100% 100%)',
                    borderBottom: '1px solid #e5e7eb'
                  }}
                />
              </div>
              
              {/* Left fold */}
              <div 
                className="absolute bottom-0 left-0 w-[140px] h-[140px] bg-white"
                style={{
                  clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
                  borderRight: '1px solid #e5e7eb'
                }}
              />
              
              {/* Right fold */}
              <div 
                className="absolute bottom-0 right-0 w-[140px] h-[140px] bg-white"
                style={{
                  clipPath: 'polygon(100% 0, 0 50%, 100% 100%)',
                  borderLeft: '1px solid #e5e7eb'
                }}
              />
              
              {/* Bottom fold */}
              <div 
                className="absolute bottom-0 left-0 w-full h-[140px] bg-white"
                style={{
                  clipPath: 'polygon(0 0, 50% 60%, 100% 0)',
                  borderTop: '1px solid #e5e7eb'
                }}
              />

              {/* Seal */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-rose-500 bg-opacity-90 flex items-center justify-center shadow-lg">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-rose-200 rounded-full -z-10 blur-sm opacity-50" />
                </div>
              </div>

              {/* Subtle texture overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative"
          >
            {currentIndex < photos.length ? (
              <div className="relative">
                <motion.div
                  className="w-80 bg-white p-4 rounded-lg shadow-lg"
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <img
                    src={photos[currentIndex].url}
                    alt="Polaroid"
                    className="w-full h-64 object-cover rounded mb-4"
                  />
                  <p className="text-center font-handwriting text-gray-700">
                    {photos[currentIndex].caption}
                  </p>
                </motion.div>
                <div className="absolute top-1/2 -left-12 transform -translate-y-1/2">
                  <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="p-2 bg-white rounded-full shadow-lg disabled:opacity-50"
                  >
                    <ChevronLeft className="w-6 h-6 text-rose-500" />
                  </button>
                </div>
                <div className="absolute top-1/2 -right-12 transform -translate-y-1/2">
                  <button
                    onClick={handleNext}
                    className="p-2 bg-white rounded-full shadow-lg"
                  >
                    <ChevronRight className="w-6 h-6 text-rose-500" />
                  </button>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-80 bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="whitespace-pre-wrap font-handwriting text-gray-700 leading-relaxed">
                  {letter}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;