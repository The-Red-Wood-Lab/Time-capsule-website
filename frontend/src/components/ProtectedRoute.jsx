// src/components/ProtectedRoute.js
import { useAuth } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";
import TimeCapsule from "./TimeCapsule";

const ProtectedRoute = () => {
  const { isSignedIn } = useAuth(); // Check if the user is authenticated
  const location = useLocation();   // Track where the user is coming from

  // Redirect to /sign-in if not authenticated
  if (!isSignedIn) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return <TimeCapsule />; 
};

export default ProtectedRoute;
