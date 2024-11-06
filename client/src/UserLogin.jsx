import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserLogin.css";

function UserLogin() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5601/Register/User");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error("Fetch error:", error);
        setError('Error fetching data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation
    if (!id || !password) {
      setError('Please fill in both fields.');
      return;
    }

    const user = data.find(
      (user) => user.user === id && user.password === password
    );

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      navigate(`/UserPanel/${user._id}`);
    } else {
      setError('Invalid ID or Password');
    }
  };

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  return (
    <div className="Overall1">
      <div className="Login-Info">
        <div className="login-header">User Credentials</div>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group loginbox">
            <input
              type="text"
              id="id"
              name="id"
              required
              value={id}
              className="custom-email input-field"
              onChange={handleIdChange}
              placeholder=" "
            />
            <label htmlFor="id" className="custom-label">ID</label>
          </div>
          <div className="input-group loginbox">
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              className="custom-password input-field"
              onChange={handlePasswordChange}
              placeholder=" "
            />
            <label htmlFor="password" className="custom-label">Password</label>
          </div>
          <button type="submit" className="btxxnnnnn">Login</button>
        </form>
        <div className="register-link">
          <p>Don't have an account? <a href="/Register/User">Register here</a></p>
        </div>
      </div>
      <div id="ad">Welcome User</div>
    </div>
  );
}

export default UserLogin;
