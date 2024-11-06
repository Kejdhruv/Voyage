import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterAdmin.css";

function RegisterAdmin() {
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
      Category : category,
    };
    const dataToSend = [newData]; // Maintain your original data format

    try {
      const response = await fetch(`http://localhost:5601/Register`, {
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
      navigate("/AdminUser"); // Update to your actual login route

    } catch (error) {
      setError(error.message);
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="Overall">
      <div className="Login-Info">
        <div className="login-header">Admin Registration</div>
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
            <label htmlFor="category" className="custom-label">Category</label>
            <select id="category" value={category} onChange={handleCategoryChange} required>
              <option value="">Select a Category</option>
              <option value="Restaurants">Restaurants</option>
              <option value="Hotels">Hotels</option>
              <option value="Guides">Guides</option>
              <option value="Activities">Activities</option>
            </select>
          </div>

          <button type="submit" className="btxxnnnnn">Register</button>
        </form>
      </div>
      <div id="ad">Future Admin</div>
    </div>
  );
}

export default RegisterAdmin;

