import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';

function App() {
  const [user, setUser] = useState(null);

  // Check for token in localStorage when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Optionally, you could verify the token with an API here to set user details
      setUser({ token }); // Set user state based on token
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <LoginForm setUser={setUser} />}
          />
          <Route
            path="/"
            element={user ? <HomePage user={user} /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
