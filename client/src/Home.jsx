import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faBed, faPerson, faBowlFood, faCableCar } from '@fortawesome/free-solid-svg-icons'; 
import "./home.css"; 

function getLoggedInUser() {
  const user = localStorage.getItem('loggedInUser');
  return user ? JSON.parse(user) : null;
}

function Home() {
  const currentYear = new Date().getFullYear();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = getLoggedInUser();
    setUser(loggedInUser);
    console.log('Logged-in user:', loggedInUser);
  }, []); 

  const handleProfileClick = () => {
    if (user) {
      navigate(`/UserPanel/${user._id}`); 
    } else {
      navigate('/Register'); 
    }
  };
  const profileImage = user?.Img || "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png";
  return (
    <>
      <div className="navbar">
        <div className="navContainer">
          <span className="logo">VOYAGE</span>
          <div className="navItems">
            <Link to='/AdminUser' className="navButton">
              <button className="navButton">Business</button>
            </Link> 
            <button className="navButton" onClick={handleProfileClick}>
              {user ? "View Profile" : "Sign in/Register"} {/* Conditional button text */}
            </button> 
            <img 
              src={profileImage} // User's profile image or default
              alt="Profile"
              className="profileImage" // Class for styling
            />
          </div>
        </div>
      </div>
      
      <div className="C1">
        <div className="h1">
          <div className="headerList">
            <Link to="Hotels" className="headerListItem">
              <div className="headerListItem">
                <FontAwesomeIcon icon={faBed} />
                <span>Stays</span>
              </div>
            </Link>
            <Link to="Guides" className="headerListItem">
              <div className="headerListItem">
                <FontAwesomeIcon icon={faPerson} />
                <span>Guide</span>
              </div>
            </Link>
            <Link to="Activities" className="headerListItem">
              <div className="headerListItem">
                <FontAwesomeIcon icon={faCableCar} />
                <span>Activities</span>
              </div>
            </Link>
            <Link to="Restaurants" className="headerListItem">
              <div className="headerListItem">
                <FontAwesomeIcon icon={faBowlFood} />
                <span>Restaurants</span>
              </div>
            </Link>
          </div>
        </div>
        
        <div className="Content">
          <div className="Title">
            <h1>Troubles during Tours? Go Ahead with us</h1>
          </div>
          <div className="lower">
            <p className="headerDesc">
              Get rewarded for your travels - unlock instant savings of 10% or more with a free TravelBooking account.
            </p>
            <button className="headerBtn" onClick={handleProfileClick}>
              {user ? "Go to Profile" : "Sign in/Register"} {/* Conditional button text */}
            </button>
          </div>
        </div>
      </div>
      
      <div className="Explore">
        <h2>Sections you might want to Explore</h2>
      </div>
      
      <div className="pList">
        <Link to='/Hotels' className="pListItem">
          <img 
            src="https://r-xx.bstatic.com/xdata/images/xphoto/263x210/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&o=" 
            className="pListImg" 
            alt="Hotels"
          />
          <div className="pListTitles">
            <h1>Hotels</h1>
            <h2>233 HOTELS</h2>
          </div>
        </Link>
        
       
        
        <Link to='/Activities' className="pListItem">
          <img 
            src="https://i0.wp.com/mattsnextsteps.com/wp-content/uploads/2023/04/IMG_20230323_172833_513-min.webp?fit=1440%2C1800&ssl=1" 
            className="pListImg" 
            alt="Activities"
          />
          <div className="pListTitles">
            <h1>Activities</h1>
            <h2>Numerous</h2>
          </div>
        </Link>
        
        <Link to='/Restaurants' className="pListItem">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf7CHc5N3QgO2TQelR0hM9UzfcqgySM_Y0pA&s" 
            className="pListImg" 
            alt="Restaurants"
          />
          <div className="pListTitles">
            <h1>Restaurants</h1>
            <h2>200 Restaurants</h2>
          </div>
        </Link>
        
        <Link to='/Guides' className="pListItem">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsYf6Gm01uvAGV7ARxAObqhYtndvo8U96lXE8dppTX9I1fjejMaZKS6KTEiVj_FgDm8tw&usqp=CAU" 
            className="pListImg" 
            alt="Guides"
          />
          <div className="pListTitles">
            <h1>Guides</h1>
            <h2>100+ Guides</h2>
          </div>
        </Link>
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

export default Home;


