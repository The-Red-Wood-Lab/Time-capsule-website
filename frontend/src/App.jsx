
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar"; 
import TimeCapsule from "./components/TimeCapsule";
import SignInComponent from "./components/SignIn";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound ";

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
        <Route path="/sign-in" element={<SignInComponent />} /> 
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </Router>
  );
}
