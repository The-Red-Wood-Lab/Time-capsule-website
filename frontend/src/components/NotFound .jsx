import { motion } from 'framer-motion';

const NotFound = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const emojiVariants = {
    bounce: {
      y: [0, -10, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-400 to-blue-500 text-white text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="text-6xl"
        variants={emojiVariants}
        animate="bounce"
      >
        🚫
      </motion.div>
      <h1 className="text-4xl font-bold mt-4">Oops! Page Not Found</h1>
      <p className="mt-2 text-lg">
        It seems you are trying to access a page that doesn't exist or is protected.
      </p>
      <p className="mt-4 text-lg">Please sign in to access the desired page.</p>
      <a href="/" className="mt-6 bg-white text-blue-500 rounded-lg py-2 px-4 hover:bg-blue-200 transition duration-300">
        Go to Home
      </a>
    </motion.div>
  );
};

export default NotFound;
