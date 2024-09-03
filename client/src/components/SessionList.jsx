import React from 'react';
import api from '../api/axiosConfig';

const SessionList = ({ sessions }) => {
  const handleBook = async (sessionId) => {
    try {
      const response = await api.post(`api/booking`,{sessionId});
      console.log("response",response.data)
      // alert('Session booked successfully!');
    } catch (error) {
      console.error('Error booking session', error);
    }
  };
  return (
    <ul>
      {sessions.map((session) => (
        <li key={session.id}>
          <p>session: {session.name}</p>
          <p>grade: {session.grade?.name}</p>
          <button onClick={() => handleBook(session._id)}>Book</button>
        </li>
      ))}
    </ul>
  );
};

export default SessionList;
