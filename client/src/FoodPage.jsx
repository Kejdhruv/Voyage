import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './FoodPage.css';
import { useNavigate, Link } from 'react-router-dom';

function getLoggedInUser() {
  const user = localStorage.getItem('loggedInUser');
  return user ? JSON.parse(user) : null;
}

function FoodPage() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const { _id } = useParams();
  const [data, setData] = useState(null);
  const location = useLocation();
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = () => {
      const loggedInUser = getLoggedInUser();
      setUser(loggedInUser);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let url = '';
      if (location.pathname.includes('/Restaurants')) {
        url = `http://localhost:5601/Restaurants/${_id}`;
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
          setError('Failed to load data. Please try again later.');
        }
      }
    };
    fetchData();
  }, [_id, location.pathname]);

  const handlename = (event) => setName(event.target.value);
  const handleGuest = (event) => setGuests(event.target.value);
  const handleTime = (event) => {
    const timeValue = event.target.value;
    const [hours] = timeValue.split(':').map(Number);
    if (hours < 7 || hours > 23) {
      setError('Please select a time between 7 AM and midnight.');
    } else {
      setError(''); // Clear error if time is valid
      setSelectedTime(timeValue);
    }
  };
  const handleDate = (event) => setSelectedDate(event.target.value);

  const handleCheckout = async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page
    if (!selectedTime) {
      setError('Please select a valid time.');
      return;
    }

    const newData = {
      Resid: data.HID,
      Name: name,
      Guest: guests,
      Img: data.IMG1,
      City: data.City,
      Guestid: user._id,
      Order: [
        {
          Resid2: data._id,
          email: data.Contact,
          Name: data.Name,
          Time: selectedTime,
          Date: selectedDate
        }
      ]
    };

    try {
      const response = await fetch(`http://localhost:5601/RestaurantsOrders`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([newData])
      });

      if (!response.ok) {
        throw new Error(`Failed to add item: ${response.statusText}`);
      }

      // Clear form fields
      setSelectedTime('');
      setSelectedDate('');
      setName('');
      setGuests(1);
      setError(''); // Clear error on successful submission
    } catch (error) {
      setError(error.message);
    }
  };

  const handleProfileClick = () => {
    if (user) {
      navigate(`/UserPanel/${user._id}`);
    } else {
      navigate('/Register');
    }
  };
  const profileImage = user?.Img || "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png";
  if (!data) {
    return <div className="loading-message">Loading...</div>;
  }

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
      <div className="c9">
        <div className="image-grid">
          <img src={data.IMG1} className="grid-item" alt={`${data.Name} Image 1`} />
          <img src={data.IMG2} className="grid-item" alt={`${data.Name} Image 2`} />
          <img src={data.IMG3} className="grid-item" alt={`${data.Name} Image 3`} />
          <img src={data.IMG4} className="grid-item" alt={`${data.Name} Image 4`} />
        </div>
        <div className="details-and-form">
          <div className="restaurant-details">
            <h1>{data.Name}</h1>
            <p><strong>Location:</strong> {data.Address}, {data.City}</p>
            <p><strong>Contact:</strong> {data.Contact}</p>
            <p><strong>Cuisines:</strong> {data.Cusine.join(', ')}</p>
            <p><strong>About Us:</strong> {data.AboutUs}</p>
          </div>
          <div className="booking-form">
            <h2>Book a Table</h2>
            {error && <div className="error-message-custom">{error}</div>} {/* Error message displayed here */}
            <form onSubmit={handleCheckout}>
              <label htmlFor="date">Date:</label>
              <input type="date" id="date" value={selectedDate} onChange={handleDate} required />
              
              <label htmlFor="time">Time:</label>
              <input type="time" id="time" value={selectedTime} onChange={handleTime} required />

              <label htmlFor="guests">Number of Guests:</label>
              <input type="number" id="guests" min="1" value={guests} onChange={handleGuest} required />

              <label htmlFor="name">Your Name:</label>
              <input type="text" id="name" value={name} onChange={handlename} placeholder='Enter your Name' required />

              <button type="submit" id="Submit">Book Now</button>
            </form>
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

export default FoodPage;



