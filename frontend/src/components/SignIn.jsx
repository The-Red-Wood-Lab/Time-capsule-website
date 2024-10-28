// src/components/SignIn.js
import { SignIn } from "@clerk/clerk-react";

const SignInComponent = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <SignIn />
    </div>
  );
};

export default SignInComponent;
