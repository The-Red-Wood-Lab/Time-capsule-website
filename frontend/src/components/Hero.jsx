
const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-500 h-screen flex items-center justify-center text-center text-white">
  <div>
    <h1 className="text-5xl font-bold mb-4">Time Capsule</h1>
    <p className="text-xl mb-6">
      Preserve your memories and messages for the future.
    </p>
    <a
      href="/timecapsule"
      className="bg-white text-blue-600 rounded-lg py-2 px-4 font-semibold shadow hover:bg-gray-200 transition duration-300"
    >
      Get Started
    </a>
  </div>
</div>

  )
}

export default Hero
