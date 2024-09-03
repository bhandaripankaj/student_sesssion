import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import SessionList from './SessionList';

const HomePage = ({ user }) => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists
    const token = localStorage.getItem('authToken');
    console.log("home - token",token)
    if (!token) {
      navigate('/login'); // Redirect to login if no token
      return;
    }

    // Fetch sessions
    const fetchSessions = async () => {
      try {
        const response = await api.get('/api/session'); // Note the leading slash in the URL
        console.log('Response:', response.data.data);
        setSessions(response.data.data);
      } catch (error) {
        console.error('Error fetching sessions', error);
      }
    };

    fetchSessions();
  }, [navigate]);

  return (
    <div>
      <h2>Welcome, {user?.name}</h2>
      <h3>Your Sessions</h3>
      <SessionList sessions={sessions} />
    </div>
  );
};

export default HomePage;
