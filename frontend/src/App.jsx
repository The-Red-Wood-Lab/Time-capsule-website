import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import TimeCapsule from "./components/TimeCapsule";
import './index.css'

export default function App() {
  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      
    </header>
  );
}