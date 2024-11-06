import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RestaurantForm.css'; 
import { Link } from 'react-router-dom';
function getLoggedInUser() {
  const user = localStorage.getItem('loggedInUser');
  return user ? JSON.parse(user) : null;
}

function RestaurantForm() {
  const [user, setUser] = useState(null);
  const [restaurantData, setRestaurantData] = useState({
    Category: "Restaurants",
    Name: "",
    Ratings: 0,
    Mini: "",
    City: "",
    Contact: "",
    AboutUs: "",
    Address: "",
    Cusine: [],
    IMG1: "",
    IMG2: "",
    IMG3: "",
    IMG4: "",
    HID: ""
  });
  
  const [newCusine, setNewCusine] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = getLoggedInUser();
    if (!loggedInUser) {
      navigate('/login');
    } else {
      setUser(loggedInUser);
      setRestaurantData((prev) => ({ ...prev, HID: loggedInUser._id }));
    }
  }, [navigate]);

  const handleRestaurantChange = (e) => {
    const { name, value } = e.target;
    setRestaurantData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCuisine = () => {
    if (newCusine && !restaurantData.Cusine.includes(newCusine)) {
      setRestaurantData((prev) => ({
        ...prev,
        Cusine: [...prev.Cusine, newCusine],
      }));
      setNewCusine(''); 
    }
  };

  const handleRestaurantSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5601/Restaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(restaurantData),
      });

      if (!response.ok) {
        throw new Error('Failed to add restaurant');
      }
      alert('Restaurant added successfully!');
      setRestaurantData({
        Category: "Restaurants",
        Name: "",
        Ratings: 0,
        Mini: "",
        City: "",
        Contact: "",
        AboutUs: "",
        Address: "",
        Cusine: [],
        IMG1: "",
        IMG2: "",
        IMG3: "",
        IMG4: "",
        HID: user._id,
      });
    } catch (error) {
      setError(error.message);
    }
  };
  const profileImage = user?.Img || "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png";
  const handleProfileClick = () => {
    if (user) {
      navigate(`/AdminPanel/${user._id}`);
    } else {
      navigate('/AdminUser');
    }
  };
  if (!user) return <p>Loading user data...</p>;

  return (
   <> <div className="navbar">
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
    <div className="restaurant-form">
      <div className="form-container">
        <p className="form-title">Add Restaurant</p>
        <form onSubmit={handleRestaurantSubmit}>
          <input type="text" name="Name" placeholder="Restaurant Name" className="input-field" onChange={handleRestaurantChange} required />
          <input type="number" name="Ratings" placeholder="Ratings (1-5)" className="input-field" onChange={handleRestaurantChange} required />
          <textarea name="Mini" placeholder="Mini Description" className="input-field" onChange={handleRestaurantChange} required />
          <input type="text" name="City" placeholder="City" className="input-field" onChange={handleRestaurantChange} required />
          <input type="text" name="Contact" placeholder="Contact" className="input-field" onChange={handleRestaurantChange} required />

          <p className="form-subtitle">Add Cuisine</p>
          <input type="text" value={newCusine} onChange={(e) => setNewCusine(e.target.value)} placeholder="Cuisine" className="input-field" />
          <button type="button" className="add-cuisine-button" onClick={handleAddCuisine}>Add Cuisine</button>

          
         

          <textarea name="AboutUs" placeholder="About Us" className="input-field" onChange={handleRestaurantChange} required />
          <input type="text" name="Address" placeholder="Address" className="input-field" onChange={handleRestaurantChange} required />
          <input type="text" name="IMG1" placeholder="Image URL 1" className="input-field" onChange={handleRestaurantChange} required />
          <input type="text" name="IMG2" placeholder="Image URL 2" className="input-field" onChange={handleRestaurantChange} required />
          <input type="text" name="IMG3" placeholder="Image URL 3" className="input-field" onChange={handleRestaurantChange} required />
          <input type="text" name="IMG4" placeholder="Image URL 4" className="input-field" onChange={handleRestaurantChange} required />
          
          <button type="submit" className="submit-button">Add Restaurant</button>
        </form>

        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="showcase-container">
        <p className="form-title">Restaurant Showcase</p>
        {restaurantData.Name && (
          <div className="restaurant-showcase">
            <p><strong>Name:</strong> {restaurantData.Name}</p>
            <p><strong>Ratings:</strong> {restaurantData.Ratings}</p>
            <p><strong>Mini:</strong> {restaurantData.Mini}</p>
            <p><strong>City:</strong> {restaurantData.City}</p>
            <p><strong>Contact:</strong> {restaurantData.Contact}</p>
            <p><strong>Cuisines:</strong></p>
            <div className="cuisine-list">
              {restaurantData.Cusine.map((cuisine, index) => (
                <div key={index} className="cuisine-item">{cuisine}</div>
              ))}
            </div>
            <p><strong>About Us:</strong> {restaurantData.AboutUs}</p>
            <p><strong>Address:</strong> {restaurantData.Address}</p>
            <div className="image-gallery">
              <img src={restaurantData.IMG1} alt="Image 1" className="restaurant-image" />
              <img src={restaurantData.IMG2} alt="Image 2" className="restaurant-image" />
              <img src={restaurantData.IMG3} alt="Image 3" className="restaurant-image" />
              <img src={restaurantData.IMG4} alt="Image 4" className="restaurant-image" />
            </div>
          </div>
        )}
      </div>
    </div> </>
  );
}

export default RestaurantForm;



