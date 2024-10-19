import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const NavBar = () => {
  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Time Capsule</h1>
        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton className="bg-blue-600 text-black rounded-lg py-2 px-4 hover:bg-blue-700 transition duration-300">
              Sign In
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
