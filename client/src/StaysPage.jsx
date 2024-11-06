import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './StaysPage.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function getLoggedInUser() {
  const user = localStorage.getItem('loggedInUser');
  return user ? JSON.parse(user) : null;
}

function StaysPage() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [data, setData] = useState(null);
  const location = useLocation();
  const [error, setError] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [Name, setName] = useState('');
  const [Cin, setCin] = useState('');
  const [Cout, setCout] = useState('');
  const [Guest, setGuest] = useState(1);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = () => {
      const loggedInUser = getLoggedInUser();
      setUser(loggedInUser);
      console.log('Logged-in user:', loggedInUser);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let url = '';

      if (location.pathname.includes('/Hotels')) {
        url = `http://localhost:5601/Hotels/${_id}`;
      } else if (location.pathname.includes('/Appartments')) {
        url = `http://localhost:5601/Appartments/${_id}`;
      }

      if (url) {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const responseData = await response.json();
          setData(responseData);
        } catch (error) {
          console.error('Error fetching data:', error);
          setError('Failed to load data. Please try again later.');
        }
      }
    };

    fetchData();
  }, [_id, location.pathname]);
  const currentYear = new Date().getFullYear();
  const handlename = (event) => setName(event.target.value);
  const handleCin = (event) => setCin(event.target.value);
  const handleGuest = (event) => setGuest(event.target.value);
  const handleCout = (event) => setCout(event.target.value);

  const handleCheckout = async (event) => {
    event.preventDefault(); 

    // Date validation
    if (new Date(Cin) >= new Date(Cout)) {
      setError('Check-out date must be after check-in date.');
      return;
    }

    const newData = {
      Name: Name,
      Checkin: Cin,
      Checkout: Cout,
      Guest: Guest,
      Franchiseid: data.HID,
      Hotelid: _id,
      Img: data.IMG1,
      Guestid: user._id,
      Order: [
        {
          email: data.Contact,
          Name: data.Name,
          Room: selectedRoom
        }
      ]
    };

    const dataToSend = [newData];
    console.log(dataToSend);

    try {
      const response = await fetch(`http://localhost:5601/HotelOrders`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        throw new Error(`Failed to add item: ${response.statusText}`);
      }
      
      // Clear form fields after successful booking
      setCin('');
      setCout('');
      setName('');
      setGuest(1);
      setSelectedRoom('');
      setError(''); // Clear error on successful booking

    } catch (error) {
      setError(error.message);
      console.error("Error during checkout:", error);
    }
  };

  const handleProfileClick = () => {
    if (user) {
      navigate(`/UserPanel/${user._id}`); 
    } else {
      navigate('/Register'); 
    }
  };

  if (!data) {
    return <div className="loading-message">Loading...</div>;
  }
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
      <div className="container">
        <div className="content">
          <div className="image-description">
            <div className="imagez-grid">
              <img src={data.IMG1} alt={`${data.Name} Main Image`} />
              <img src={data.IMG2} alt={`${data.Name} Secondary Image`} />
              <img src={data.IMG3} alt={`${data.Name} Third Image`} />
              <img src={data.IMG4} alt={`${data.Name} Fourth Image`} />
            </div>
            <div className="hotel-description">
              <h1 className="Head3">{data.Name}</h1>
              <p className='Head3'><strong>Location:</strong> {data.City}</p>
              <p className='Head3'><strong>Contact:</strong> {data.Contact}</p>
              <p className='Head3'><strong>Ratings:</strong> {data.Ratings} ⭐</p>
              <h2>About Us</h2>
              <p>{data.Descrip}</p>
            </div>
          </div>

          <div className="hotel-details">
            <div className="rooms-section">
              <h3>Available Rooms</h3>
              {data.Rooms.map((room, index) => (
                <div key={index} className="room-card">
                  <img src={room.IMG} alt={`${room.Name}`} />
                  <div className="room-info">
                    <h4>{room.Name}</h4>
                    <p>Beds: {room.Bed}</p>
                    <p>Fooding: {room.Fooding}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="booking-form">
              <h2>Book Your Stay</h2>
              <form onSubmit={handleCheckout}>
           
                
                <label htmlFor="checkin">Check-in Date:</label>
                <input type="date" id="checkin" value={Cin} onChange={handleCin} required />
                
                <label htmlFor="checkout">Check-out Date:</label>
                <input type="date" id="checkout" value={Cout} onChange={handleCout} required />

                <label htmlFor="guests">Number of Guests:</label>
                <input type="number" value={Guest} onChange={handleGuest} id="guests" min="1" placeholder='No. of People' required />

                <label htmlFor="name">Name:</label>
                <input type="text" value={Name} onChange={handlename} id="name" placeholder='Enter your Name' required />

                <label htmlFor="room">Choose Room:</label>
                <select id="room" value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)} required>
                  <option value="">Select a Room</option>
                  {data.Rooms.map((room, index) => (
                    <option key={index} value={room.Name}>
                      {room.Name}
                    </option>
                  ))}
                </select>
                {error && <div className="error-message-custom">{error}</div>}
                <button type="submit">Book Now</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="footer1">
      <div className="footer">
        <div className="fLists">
           
            <ul className="fList">
                <li className="fListItem"><strong>Terms & Settings</strong></li>
                <li className="fListItem">Privacy & cookies</li>
                <li className="fListItem">Terms and conditions</li>
                <li className="fListItem">Grievance officer</li>
                <li className="fListItem">Modern Slavery Statement</li>
                <li className="fListItem">Human Rights Statement</li>
              
            </ul>
          
            <ul className="fList">
            <li className="fListItem"><strong>Discover</strong></li>
             <Link to='/' className="fListItem" > <li className="fListItem">Home</li></Link> 
              <Link to="/Activities" className="fListItem" ><li className="fListItem">Activities</li></Link>
              <Link to="/Hotels" className="fListItem" ><li className="fListItem">Stays</li></Link>
              <Link to="/Restaurants"  className="fListItem"  ><li className="fListItem">Restaurants</li></Link>
              <Link to ="/Guides"  className="fListItem"> <li className="fListItem">Guides</li></Link>
              <Link to="/AdminUser"  className="fListItem" ><li className="fListItem">Business</li></Link> 
              <Link to="/Register"  className="fListItem"  ><li className="fListItem">Register User</li></Link>

            </ul>
            <ul className="fList">
            <li className="fListItem"><strong>Reach out to us</strong></li>
               
                <li className="fListItem"><a href="mailto:dhruvnkejriwal@gmail.com" className="fListItem">Email</a></li>
                <li className="fListItem"> <a href="https://www.instagram.com/makemytrip" target="_blank" rel="noopener noreferrer" className="fListItem">Instagram</a></li>
                <li className="fListItem">  <a href="https://twitter.com/makemytrip" target="_blank" rel="noopener noreferrer" className="fListItem">Twitter</a></li>
                <li className="fListItem"> <a href="https://wikipedia.com/makemytrip" target="_blank" rel="noopener noreferrer" className="fListItem">About Us</a></li>
                <li className="fListItem">
          Toll Free: <span style={{ color: "blue" }}>+(areal code) 111-333-444</span>
        </li>
            </ul>
        </div>
        <div className="fText">Copyright @ {currentYear} TravelBooking</div>
    </div> </div>
    </>
  );
}

export default StaysPage;






