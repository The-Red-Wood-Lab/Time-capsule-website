// src/components/SignIn.js
import { SignIn } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const SignInComponent = () => {
  const { isSignedIn } = useAuth(); // Check if the user is signed in
  const navigate = useNavigate(); // Navigate programmatically
  const location = useLocation(); // Access previous location state

  // If authenticated, redirect to the intended route or /timecapsule
  useEffect(() => {
    if (isSignedIn) {
      const from = location.state?.from?.pathname || "/timecapsule";
      navigate(from, { replace: true }); // Redirect after login
    }
  }, [isSignedIn, navigate, location]);

  return (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
};

export default SignInComponent;
