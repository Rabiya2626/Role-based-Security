import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
  const navigate=useNavigate();
  

  useEffect(() => {
    if (localStorage.getItem('token')===null) {
      navigate('/login');
    }
  }, [localStorage.getItem('token')===null]);

  const handleOnClickAdmin = async (e) => {
    e.preventDefault();
    if(localStorage.getItem('token')===null){
      navigate('/login');
      return alert("To access these endpoint please login");
    }
    const res = await fetch(`${props.host}/api/routes/admin`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const response = await res.json();
    if (response.type) {
      return alert("Succesfully accessed endpoint");
    }
    else {
      return alert("The current user is not autherized to access this endpoint");
    }
  };

  const handleOnClickUser = async (e) => {
    e.preventDefault();
    const res = await fetch(`${props.host}/api/routes/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const response = await res.json();
    if (response.type) {
      return alert("Succesfully accessed endpoint");
    }
    else {
      return alert("The current user is not autherized to access this endpoint");
    }
  };

  const handleOnClickModerator = async (e) => {
    e.preventDefault();
    const res = await fetch(`${props.host}/api/routes/moderator`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const response = await res.json();
    if (response.type) {
      return alert("Succesfully accessed endpoint");
    }
    else {
      return alert("The current user is not autherized to access this endpoint");
    }
  };


  return (
    <>
      <button type="button" onClick={handleOnClickAdmin} name="admin" className="btn btn-secondary btn-lg">Admin endpoint</button>
      <button type="button" onClick={handleOnClickUser} name="user" className="btn btn-secondary btn-lg">User endpoint</button>
      <button type="button" onClick={handleOnClickModerator} name="moderator" className="btn btn-secondary btn-lg">Moderator endpoint</button>
    </>
  )
}

export default Home;