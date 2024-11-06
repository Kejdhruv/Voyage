import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ActivitiesForm.css';
import { Link } from 'react-router-dom';

function getLoggedInUser() {
  const user = localStorage.getItem('loggedInUser');
  return user ? JSON.parse(user) : null;
}

function ActivitiesForm() {
  const [user, setUser] = useState(null);
  const [ActivitiesData, setActivitiesData] = useState({
    Category: "Activities",
    Name: "",
    About: "",
    Requirements: [],
    Cities: [],
    Contact: "",
    Img1: "",
    IMG2: "",
    Img3: "",
    Img4: "",
    HID: "",
  });
  const [newRequirement, setNewRequirement] = useState("");
  const [newCity, setNewCity] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = getLoggedInUser();
    if (!loggedInUser) {
      navigate('/login');
    } else {
      setUser(loggedInUser);
      setActivitiesData((prev) => ({
        ...prev,
        Contact: loggedInUser.user,
        HID: loggedInUser._id,
      }));
    }
  }, [navigate]);

  const handleActivityChange = (e) => {
    const { name, value } = e.target;
    setActivitiesData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRequirementChange = (e) => {
    setNewRequirement(e.target.value);
  };

  const handleCityChange = (e) => {
    setNewCity(e.target.value);
  };

  const addRequirements = () => {
    if (newRequirement.trim()) {
      setActivitiesData((prev) => ({
        ...prev,
        Requirements: [...prev.Requirements, newRequirement],
      }));
      setNewRequirement("");
    } else {
      setError('Please provide a valid requirement.');
    }
  };

  const addCity = () => {
    if (newCity.trim()) {
      setActivitiesData((prev) => ({
        ...prev,
        Cities: [...prev.Cities, newCity],
      }));
      setNewCity("");
    } else {
      setError('Please provide a valid city.');
    }
  };

  const handleActivitySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5601/Activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ActivitiesData),  // Use ActivitiesData, not hotelData
      });

      if (!response.ok) {
        throw new Error('Failed to add activity');
      }
      alert('Activity added successfully!');
      setActivitiesData({
        Category: "Activities",
        Name: "",
        About: "",
        Requirements: [],
        Cities: [],
        Contact: "",
        Img: "",
        IMG2: "",
        Img3: "",
        Img4: "",
        HID: "",
      });
    } catch (error) {
      setError(error.message);
    }
  };
  const handleProfileClick = () => {
    if (user) {
      navigate(`/AdminPanel/${user._id}`);
    } else {
      navigate('/AdminUser');
    }
  };
  if (!user) return <p>Loading user data...</p>;
  const profileImage = user?.Img || "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png";
  return (
    <>
   <div className="navbar">
        <div className="navContainer">
          <span className="logo">VOYAGE</span>
          <div className="navItems">
            <Link to='/' className="navButton">
              <button className="navButton">Home</button>
            </Link>
            <button className="navButton" onClick={handleProfileClick}>
              {user ? "View Profile" : "Sign in/Register"}
            </button>
            <img
              src={profileImage}
              alt="Profile"
              className="profileImage"
            />
          </div>
        </div>
      </div>

      <div className="hotel-form-container">
        <div className="hotel-form">
          <h1>Add Activity</h1>
          <form onSubmit={handleActivitySubmit}>
            {error && <p className="error-message">{error}</p>}
            <input
              type="text"
              name="Name"
              placeholder="Activity Name"
              value={ActivitiesData.Name}
              onChange={handleActivityChange}
              required
            />
            <textarea
              name="About"
              placeholder="About"
              value={ActivitiesData.About}
              onChange={handleActivityChange}
              required
            />
            <input
              type="text"
              name="Img1"
              placeholder="Image URL 1"
              value={ActivitiesData.Img1}
              onChange={handleActivityChange}
              required
            />
            <input
              type="text"
              name="IMG2"
              placeholder="Image URL 2"
              value={ActivitiesData.IMG2}
              onChange={handleActivityChange}
              required
            />
            <input
              type="text"
              name="Img3"
              placeholder="Image URL 3"
              value={ActivitiesData.Img3}
              onChange={handleActivityChange}
              required
            />
            <input
              type="text"
              name="Img4"
              placeholder="Image URL 4"
              value={ActivitiesData.Img4}
              onChange={handleActivityChange}
              required
            />
            <h3>Add City</h3>
            <input
              type="text"
              name="Cities"
              placeholder="City"
              value={newCity}
              onChange={handleCityChange}
              required
            />
            <button type="button" onClick={addCity}>Add City</button>

            <h3>Add Requirement</h3>
            <input
              type="text"
              name="Requirements"
              placeholder="Requirement"
              value={newRequirement}
              onChange={handleRequirementChange}
              required
            />
            <button type="button" onClick={addRequirements}>Add Requirement</button>

            <button type="submit">Add Activity</button>
          </form>
        </div>

        {/* Product Showcase Section */}
        <div className="side-section">
          <h2>Activity Showcase</h2>
          {ActivitiesData.Name && (
            <div className="activity-showcase">
              <p><strong>Name:</strong> {ActivitiesData.Name}</p>
              <p><strong>About:</strong> {ActivitiesData.About}</p>
              <p><strong>Cities:</strong> {ActivitiesData.Cities.join(', ')}</p>
              <p><strong>Contact:</strong> {ActivitiesData.Contact}</p>
              <div className="image-gallery">
                {ActivitiesData.Img1 && <img src={ActivitiesData.Img1} alt="Activity Image 1" className="activity-image" />}
                {ActivitiesData.Img2 && <img src={ActivitiesData.Img2} alt="Activity Image 2" className="activity-image" />}
                {ActivitiesData.Img3 && <img src={ActivitiesData.Img3} alt="Activity Image 3" className="activity-image" />}
                {ActivitiesData.Img4 && <img src={ActivitiesData.Img4} alt="Activity Image 4" className="activity-image" />}
              </div>
              <h4>Requirements:</h4>
              <ul className="requirements-list">
                {ActivitiesData.Requirements.map((Requirement, index) => (
                  <li key={index} className="requirements-list-item">{Requirement}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ActivitiesForm;
