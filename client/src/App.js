import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  const host = process.env.REACT_APP_API_URL;

  const isLoggedIn = !!localStorage.getItem('authToken'); // true if token exists

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup host={host} />} />
        <Route path="/login" element={<Login host={host} />} />
        {/* Protected Home route */}
        <Route
          path="/"
          element={isLoggedIn ? <Home host={host} /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
