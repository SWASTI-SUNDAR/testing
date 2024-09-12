import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./auth/Login";
import Profile from "./components/Profile";
import RideBooking from "./map/RideBooking";
import RideHistory from "./map/RideHistory";


const App = () => {
  const user = localStorage.getItem("user");

  return (
    <Router>
      <Routes>
        {/* Redirect to home if user tries to access login page while logged in */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />

        {/* Home Route */}
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />

        {/* Profile, Ride Booking, and Ride History only accessible to logged-in users */}
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/ride-booking"
          element={user ? <RideBooking /> : <Navigate to="/login" />}
        />
        <Route
          path="/ride-history"
          element={user ? <RideHistory /> : <Navigate to="/login" />}
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
