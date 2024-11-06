import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserRegister.css";

function UserRegister() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleIdChange = (event) => setId(event.target.value);
  const handleNameChange = (event) => setName(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleCategoryChange = (event) => setCategory(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newData = {
      name,
      user: id,
      password,
      Gender : category,
      Img : "https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4215.jpg?semt=ais_hybrid"
    };
    const dataToSend = [newData]; // Maintain your original data format

    try {
      const response = await fetch(`http://localhost:5601/Register/User`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error(`Failed to Register: ${response.statusText}`);
      }

      // Navigate to the login page after successful registration
      navigate("/Register"); // Update to your actual login route

    } catch (error) {
      setError(error.message);
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="Overall1">
      <div className="Login-Info">
        <div className="login-header">User Registration</div>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group loginbox">
            <input
              type="text"
              id="id"
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
              type="text"
              id="name"
              required
              value={name}
              className="custom-email input-field"
              onChange={handleNameChange}
              placeholder=""
            />
            <label htmlFor="name" className="custom-label">Name</label>
          </div>

          <div className="input-group loginbox">
            <input
              type="password"
              id="password"
              required
              value={password}
              className="custom-password input-field"
              onChange={handlePasswordChange}
              placeholder=" "
            />
            <label htmlFor="password" className="custom-label">Password</label>
          </div>

          <div className="input-group loginbox">
            <label htmlFor="category" className="custom-label">Gender</label>
            <select id="category" value={category} onChange={handleCategoryChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Undefinded">Prefer not to say</option>
            
            </select>
          </div>

          <button type="submit" className="btxxnnnnn">Register</button>
        </form>
      </div>
      <div id="ad">Welcome Customer</div>
    </div>
  );
}

export default UserRegister ; 