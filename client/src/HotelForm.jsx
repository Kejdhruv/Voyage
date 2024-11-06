import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HotelForm.css';
import { Link } from 'react-router-dom';
function getLoggedInUser() {
  const user = localStorage.getItem('loggedInUser');
  return user ? JSON.parse(user) : null;
}

function HotelForm() {
  const [user, setUser] = useState(null);
  const [hotelData, setHotelData] = useState({
    Category: "Hotels",
    Name: "",
    Ratings: 0,
    Descrip: "",
    Rooms: [],
    City: "",
    Contact: "",
    IMG1: "",
    IMG2: "",
    IMG3: "",
    IMG4: "",
    HID: "",
  });
  const [newRoom, setNewRoom] = useState({ Bed: 0, Name: "", Fooding: "", IMG: "" });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = getLoggedInUser();
    if (!loggedInUser) {
      navigate('/login');
    } else {
      setUser(loggedInUser);
      setHotelData((prev) => ({ ...prev, Contact: loggedInUser.user, HID: loggedInUser._id }));
    }
  }, [navigate]);

  const handleHotelChange = (e) => {
    const { name, value } = e.target;
    setHotelData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoomChange = (e) => {
    const { name, value } = e.target;
    setNewRoom((prev) => ({ ...prev, [name]: value }));
  };

  const addRoom = () => {
    if (newRoom.Name && newRoom.Bed > 0) {
      setHotelData((prev) => ({
        ...prev,
        Rooms: [...prev.Rooms, newRoom],
      }));
      setNewRoom({ Bed: 0, Name: "", Fooding: "", IMG: "" });
    } else {
      setError('Please fill in the room details correctly.');
    }
  };

  const handleHotelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5601/hotels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hotelData),
      });

      if (!response.ok) {
        throw new Error('Failed to add hotel');
      }
      alert('Hotel added successfully!');
      setHotelData({
        Category: "Hotels",
        Name: "",
        Ratings: 0,
        Descrip: "",
        Rooms: [],
        City: "",
        Contact: "",
        IMG1: "",
        IMG2: "",
        IMG3: "",
        IMG4: "",
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
  const profileImage = user?.Img || "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png";
  if (!user) return <p>Loading user data...</p>;

  return (<>
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
        <h1>Add Franchise</h1>
        <form onSubmit={handleHotelSubmit}>
          {error && <p className="error-message">{error}</p>}
          <input type="text" name="Name" placeholder="Hotel Name" onChange={handleHotelChange} required />
          <input type="number" name="Ratings" placeholder="Ratings (1-5)" onChange={handleHotelChange} required />
          <textarea name="Descrip" placeholder="Description" onChange={handleHotelChange} required />
          <input type="text" name="City" placeholder="City" onChange={handleHotelChange} required />
          <input type="text" name="IMG1" placeholder="Image URL 1" onChange={handleHotelChange} required />
          <input type="text" name="IMG2" placeholder="Image URL 2" onChange={handleHotelChange} required />
          <input type="text" name="IMG3" placeholder="Image URL 3" onChange={handleHotelChange} required />
          <input type="text" name="IMG4" placeholder="Image URL 4" onChange={handleHotelChange} required />

          <h3>Add Room</h3>
          <input type="number" name="Bed" placeholder="Number of Beds" value={newRoom.Bed} onChange={handleRoomChange} required />
          <input type="text" name="Name" placeholder="Room Name" value={newRoom.Name} onChange={handleRoomChange} required />
          <input type="text" name="Fooding" placeholder="Fooding (Yes/No)" value={newRoom.Fooding} onChange={handleRoomChange} required />
          <input type="text" name="IMG" placeholder="Room Image URL" value={newRoom.IMG} onChange={handleRoomChange} required />
          <button type="button" onClick={addRoom}>Add Room</button>

          <button type="submit">Add Hotel</button>
        </form>
      </div>

      {/* Product Showcase Section */}
      <div className="side-section">
        <h2>Hotel Showcase</h2>
        {hotelData.Name && (
          <div className="hotel-showcase">
            <p><strong>Name:</strong> {hotelData.Name}</p>
            <p><strong>Ratings:</strong> {hotelData.Ratings}</p>
            <p><strong>Description:</strong> {hotelData.Descrip}</p>
            <p><strong>City:</strong> {hotelData.City}</p>
            <p><strong>Contact:</strong> {hotelData.Contact}</p>
            <div className="image-gallery">
              {hotelData.IMG1 && <img src={hotelData.IMG1} alt="Hotel Image 1" className="hotel-image" />}
              {hotelData.IMG2 && <img src={hotelData.IMG2} alt="Hotel Image 2" className="hotel-image" />}
              {hotelData.IMG3 && <img src={hotelData.IMG3} alt="Hotel Image 3" className="hotel-image" />}
              {hotelData.IMG4 && <img src={hotelData.IMG4} alt="Hotel Image 4" className="hotel-image" />}
            </div>
            <h4>Rooms:</h4>
            <ul className="rooms-list">
    {hotelData.Rooms.map((room, index) => (
        <li key={index} className="rooms-list-item">
            {room.Name} - {room.Bed} beds - {room.Fooding}
            <img src={room.IMG} alt={room.Name} />
        </li>
    ))}
</ul>
          </div>
        )}
      </div>
    </div> </>
  );
}

export default HotelForm;




