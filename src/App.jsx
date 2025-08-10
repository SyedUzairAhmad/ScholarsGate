import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase.js"; // make sure firebase.js exports `auth`
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer";
import Home from "./Pages/Home.jsx";
import ProviderDashboard from "./Pages/ProviderDashboard.jsx";
import ProviderSignUp from "./Pages/ProviderSignUp.jsx";
import Scholarships from "./Pages/scholarships.jsx";
import SignIn from "./Pages/SignIn.jsx";
import { ScholarshipProvider } from "./context/ScholarshipContext";

// Simple protected route component
function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/signin" />;

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScholarshipProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/signup" element={<ProviderSignUp />} />
          <Route
            path="/provider-dashboard"
            element={
              <ProtectedRoute>
                <ProviderDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
        <Footer />
      </ScholarshipProvider>
    </BrowserRouter>
  );
}
