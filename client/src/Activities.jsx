import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./Guides.css";

function Activities() {
  const [data, setData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      let url = '';

      if (location.pathname.includes('/Activities')) {
        url = "http://localhost:5601/Activities";
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
        <h1>Activities</h1>
        <div className="underline"></div>
      </div>
      <div className="guide-cards">
        {data.map((data, index) => (
          <Link to={`/Activities/${data._id}`} key={index} className="guide-link">
            <div className="guide-card">
              <div className="image-container">
                <img src={data.Img} alt={`Guide Image ${index + 1}`} />
              </div>
              <div className="guide-details">
                <p className="guide-name">{data.Name}</p>
                <p className="guide-city">{data.Cities.join(', ')}</p>

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

export default Activities;