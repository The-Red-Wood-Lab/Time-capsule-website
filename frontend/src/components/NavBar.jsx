import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Clock } from "lucide-react";

const NavBar = () => {
  return (
    <header className="py-4 px-6 bg-background border-b">
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Clock className="h-6 w-6" />
        <span className="text-xl font-bold">TimeCapsule</span>
      </div>
      <nav className="hidden md:flex space-x-4">
        <a href="#features" className="text-sm hover:underline">Features</a>
        <a href="#how-it-works" className="text-sm hover:underline">How It Works</a>
        <a href="#" className="text-sm hover:underline">About</a>
        <a href="#" className="text-sm hover:underline">Contact</a>
      </nav>
      <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition duration-300"
            >
              Sign In
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
    </div>
  </header>
  );
};

export default NavBar;
