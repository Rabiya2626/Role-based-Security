import React from 'react';

const Home = () => {
  const type = localStorage.getItem('type');

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h1>Welcome to My Web Page</h1>
      {type ? (
        <p>You are logged in as: <b>{type}</b></p>
      ) : (
        <p>Please login or signup to access the page</p>
      )}
    </div>
  );
};

export default Home;
