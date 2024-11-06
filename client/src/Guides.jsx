import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./Guides.css";

function Guides() {
  const [data, setData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      let url = '';

      if (location.pathname.includes('/Guides')) {
        url = "http://localhost:5601/Guides";
      }

      if (url) {
        try {
          const response = await fetch(url);
          const responseData = await response.json();
          setData(responseData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [location.pathname]);

  const cleanedPathname = location.pathname.replace(/^\/+/, '');

  return (
    <>
      <div className="header">
        <h1>Guides</h1>
        <div className="underline"></div>
      </div>
      <div className="guide-cards">
        {data.map((guide, index) => (
          <Link to={`/${cleanedPathname}/${guide._id}`} key={index} className="guide-link">
            <div className="guide-card">
              <div className="image-container">
                <img src={guide.Img} alt={`Guide Image ${index + 1}`} />
              </div>
              <div className="guide-details">
                <p className="guide-name">{guide.name}</p>
                <p className="guide-city">{guide.Cities.join(', ')}</p>
                <p className="guide-age">{guide.age} years old</p>
              
              </div>
              <div className="action-buttons">
                <button className="btn-view">View Details</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Guides;

