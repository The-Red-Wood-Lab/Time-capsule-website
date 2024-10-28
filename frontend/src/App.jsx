// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar"; 
import ProtectedRoute from "./components/ProtectedRoute";
import TimeCapsule from "./components/TimeCapsule";
import SignInComponent from "./components/SignIn";
import NotFound from "./components/NotFound ";

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/sign-in" element={<SignInComponent />} />
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
