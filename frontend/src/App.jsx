import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TimeCapsule from "./components/TimeCapsule";
import './index.css';
import Hero from "./components/Hero";
import NavBar from "./components/NavBar"; // Import NavBar
import { SignedIn } from "@clerk/clerk-react";

function ProtectedRoute({ children }) {
  return (
    <SignedIn>
      {children}
    </SignedIn>
  );
}

export default function App() {
  return (
    <Router>
      <NavBar /> 
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route
          path="/timecapsule"
          element={
            <ProtectedRoute>
              <TimeCapsule />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
