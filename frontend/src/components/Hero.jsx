
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-5xl font-bold text-black mb-4">
        Preserve Your Memories
      </h1>
      <h2 className="text-lg text-gray-700 mb-8">
        for the Future
      </h2>
      <p className="text-md text-gray-600 text-center mb-8">
        Create digital time capsules to store your thoughts, photos, and memories. Share them with your future self or loved ones.
      </p>
      <Link
        to="/timecapsule" 
        className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition duration-300"
      >
        Create Your Time Capsule
      </Link>
    </div>
  );
};

export default Hero;
