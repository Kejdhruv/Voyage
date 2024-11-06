import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import './GuidesPage.css';

function getLoggedInUser() {
  const user = localStorage.getItem('loggedInUser');
  return user ? JSON.parse(user) : null;
}

function GuidesPage() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [data, setData] = useState(null);
  const location = useLocation();
  const [error, setError] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [guestCount, setGuestCount] = useState(0);
  const [Name, setName] = useState('');
  const [user, setUser] = useState(null);
  const currentYear = new Date().getFullYear();
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

      if (location.pathname.includes('/Guides')) {
        url = `http://localhost:5601/Guides/${_id}`;
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

  const handleCityChange = (event) => setSelectedCity(event.target.value);
  const handleStartDateChange = (event) => {
    const start = event.target.value;
    setStartDate(start);
    
    // Reset the end date if it is before the new start date
    if (endDate && new Date(start) > new Date(endDate)) {
      setError('End date must be after the start date.');
    } else {
      setError('');
    }
  };

  const handleEndDateChange = (event) => {
    const end = event.target.value;
    setEndDate(end);
    
    // Validate if the end date is before the start date
    if (startDate && new Date(end) < new Date(startDate)) {
      setError('End date must be after the start date.');
    } else {
      setError('');
    }
  };

  const handleGuestCountChange = (event) => setGuestCount(event.target.value);
  const handlename = (event) => setName(event.target.value);
  
  const handleBooking = async (event) => {
    event.preventDefault();

    if (error) return; // Prevent booking if there is an error

    const newData = {
      GuideName: data.name,
      CustomerName: Name,
      GuideId: data.HID,
      City: selectedCity,
      StartDate: startDate,
      EndDate: endDate,
      Guests: guestCount,
      Guestid: user ? user._id : null,
    };
    const dataToSend = [newData];
    console.log(dataToSend);

    try {
      const response = await fetch(`http://localhost:5601/GuideOrders`, {
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
      setEndDate('');
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
  const profileImage = user?.Img || "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png";
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
              src={profileImage}
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
              <img src={data.Img} alt={`${data.name}`} className="guide-image-custom" />
              <div className="guide-details-custom">
                <p><strong>About Me:</strong></p>
                <p>{data.About}</p>
              </div>
            </div>
            <div className="details-section-custom">
              <h1>{data.name}</h1>
              <p className="guide-age-custom">{data.age} years old</p>
              <p className="guide-contact-custom"><strong>Contact:</strong> {data.contact}</p>
              <h3>Achievements:</h3>
              <ul>
                {data.Achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>

              <h3>Skills:</h3>
              <ul>
                {data.Skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>

              <h3>Book Your Guide</h3>
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

                <label htmlFor="end-date">End Date:</label>
                <input type="date" id="end-date" value={endDate} onChange={handleEndDateChange} required />

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

export default GuidesPage;

