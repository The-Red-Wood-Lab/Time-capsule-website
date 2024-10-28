import  { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Moon, Sun } from 'lucide-react';

const TimeCapsule = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [revealDate, setRevealDate] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track submission

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Time Capsule created:', { name, message, revealDate });
    setIsSubmitted(true); // Set submission state
    // Reset form
    setName('');
    setMessage('');
    setRevealDate('');
    setTimeout(() => setIsSubmitted(false), 3000); // Hide message after 3 seconds
  };

  const handleCancel = () => {
    setName('');
    setMessage('');
    setRevealDate('');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <motion.div
      className={`min-h-screen pt-2 flex flex-col justify-center items-center p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
      initial={{ backgroundColor: darkMode ? '#1a202c' : '#f7fafc' }} // Initial background color
      animate={{ backgroundColor: darkMode ? '#1a202c' : '#f7fafc' }} // Animate background color
      transition={{ duration: 0.5 }} // Transition duration
    >
      <button
        onClick={toggleDarkMode}
        className={`absolute top-4 right-4 p-2 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
      >
        {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
      </button>
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8"
      >
        Time Capsule
      </motion.h1>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-md rounded-lg shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Create Your Time Capsule</h2>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Store your memories for the future</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.3 }} 
              className="form-field"
            >
              <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
                required
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.3 }} 
              className="form-field"
            >
              <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message for the future"
                className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
                rows="4"
                required
              ></textarea>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.3 }} 
              className="form-field"
            >
              <label htmlFor="reveal-date" className="block text-sm font-medium mb-1">Reveal Date</label>
              <div className="flex">
                <input
                  id="reveal-date"
                  type="date"
                  value={revealDate}
                  onChange={(e) => setRevealDate(e.target.value)}
                  className={`w-full px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
                  required
                />
              </div>
            </motion.div>
          </div>
          <div className="mt-6 flex justify-between">
            <button 
              type="button" 
              onClick={handleCancel} 
              className={`px-4 py-2 rounded-md transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'}`}
            >
              Cancel
            </button>
            <motion.button 
              type="submit" 
              whileHover={{ scale: 1.05 }} // Button hover effect
              className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              <Send className="mr-2 h-4 w-4" /> Send to Future
            </motion.button>
          </div>
        </form>
        {/* Submission Confirmation Message */}
        {isSubmitted && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }} 
            transition={{ duration: 0.3 }} 
            className={`mt-4 p-2 rounded-md ${darkMode ? 'bg-green-600 text-white' : 'bg-green-200 text-gray-900'}`}
          >
            Time Capsule created successfully!
          </motion.div>
        )}
      </motion.div>
      <footer className={`mt-8 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        <p>&copy; 2023 Time Capsule. All rights reserved.</p>
        <a href="/about" className="hover:underline">About</a>
      </footer>
    </motion.div>
  );
};

export default TimeCapsule;