import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import './ActivitiesPage.css';

function getLoggedInUser() {
  const user = localStorage.getItem('loggedInUser');
  return user ? JSON.parse(user) : null;
}

function ActivitiesPage() {

  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const { _id } = useParams();
  const [data, setData] = useState(null);
  const location = useLocation();
  const [error, setError] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [Time, setTime] = useState('');
  const [guestCount, setGuestCount] = useState(0);
  const [Name, setName] = useState('');
  const [user, setUser] = useState(null);

  // Carousel state to manage the active image
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

      if (location.pathname.includes('/Activities')) {
        url = `http://localhost:5601/Activities/${_id}`;
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

  useEffect(() => {
    // Automatically change image every 3 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 4); // Loop through 3 images
    }, 3000); // 3 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  const handleCityChange = (event) => setSelectedCity(event.target.value);
  const handleStartDateChange = (event) => {
    const start = event.target.value;
    setStartDate(start);
    
  };

  const handleTime = (event) => {
    const timeValue = event.target.value;
    const [hours] = timeValue.split(':').map(Number);
    if (hours < 5|| hours > 16 ) {
      setError('Please select a time between 7 AM and midnight.');
    } else {
      setError(''); // Clear error if time is valid
      setTime(timeValue);
    }
  };

  const handleGuestCountChange = (event) => setGuestCount(event.target.value);
  const handlename = (event) => setName(event.target.value);
  
  const handleBooking = async (event) => {
    event.preventDefault();

    if (error) return; // Prevent booking if there is an error

    const newData = {
      ActivityName: data.Name,
      CustomerName: Name,
      ActHID: data.HID,
      City: selectedCity,
      StartDate: startDate,
      Time : Time , 
      Guests: guestCount,
      Guestid: user ? user._id : null,
      Img : data.Img
    };
    const dataToSend = [newData];
    console.log(dataToSend);

    try {
      const response = await fetch(`http://localhost:5601/ActivitiesOrders`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        throw new Error(`Failed to book: ${response.statusText}`);
      }
      // Clear form fields after successful booking
      setName('');
      setSelectedCity('');
      setStartDate('');
      setTime('');
      setGuestCount(0);
      setError(''); // Clear any previous errors
    } catch (error) {
      setError(error.message);
      console.error("Error during booking:", error);
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
    return <div className="loading-message-custom">Loading...</div>;
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
              src={user ? user.Img : "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png"}
              alt="Profile"
              className="profileImage"
            />
          </div>
        </div>
      </div>

      <div className="container-custom">
        <div className="content-custom">
          <div className="guide-info-custom">
            <div className="image-section-custom">
              {/* Automatic Image Carousel */}
              <div className="carousel-container">
                <img
                  src={currentImageIndex === 0 ? data.Img : currentImageIndex === 1 ? data.IMG2 : currentImageIndex === 2 ?  data.Img3 : data.Img4}
                  alt="Guide"
                  className="carousel-image"
                />
              </div>
              <div className="guide-details-custom">
                <p><strong>About : </strong></p>
                <p>{data.About}</p>
              </div>
            </div>
            <div className="details-section-custom1">
  <h1>{data.Name}</h1>
  <p className="guide-contact-custom"><strong>Contact:</strong> {data.Contact}</p>

  {/* Updated Requirements Section */}
  <div className="requirements-section">
    <h3>Requirements:</h3>
    <ul>
      {data.Requirements.map((Requirement, index) => (
        <li key={index}>{Requirement}</li>
      ))}
    </ul>
  </div>

  <h3>Book Your Session</h3>
  <form className="form-custom" onSubmit={handleBooking}>
    <label htmlFor="city">Select City:</label>
    <select id="city" value={selectedCity} onChange={handleCityChange} required>
      <option value="">Choose a City</option>
      {data.Cities.map((city, index) => (
        <option key={index} value={city}>{city}</option>
      ))}
    </select>

    <label htmlFor="name">Name:</label>
    <input type="text" value={Name} onChange={handlename} id="name" placeholder='Enter your Name' required />

    <label htmlFor="start-date">Start Date:</label>
    <input type="date" id="start-date" value={startDate} onChange={handleStartDateChange} required />

    <label htmlFor="time">Time:</label>
              <input type="time" id="time" value={Time} onChange={handleTime} required />


    <label htmlFor="guests">Number of Guests:</label>
    <input type="number" id="guests" value={guestCount} onChange={handleGuestCountChange} min="1" required />

    {/* Display error message here */}
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

export default ActivitiesPage;
