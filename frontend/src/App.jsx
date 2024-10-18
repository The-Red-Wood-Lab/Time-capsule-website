import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TimeCapsule from "./components/TimeCapsule";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar"; 
import { SignedIn } from "@clerk/clerk-react";
import NotFound from "./components/NotFound ";

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
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </Router>
  );
}
