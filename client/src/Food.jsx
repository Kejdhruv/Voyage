import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./Food.css";

function Food() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      let url = '';

      if (location.pathname.includes('/Restaurants')) {
        url = "http://localhost:5601/Restaurants";
      }

      if (url) {
        try {
          const response = await fetch(url);
          const responseData = await response.json();
          setData(responseData);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      }
    };

    fetchData();
  }, [location.pathname]);

  const cleanedPathname = location.pathname.replace(/^\/+/, '');

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      <div className="restaurant-title">
        <h1>{cleanedPathname}</h1>
        <div className="title-underline"></div>
      </div>
      <div className="restaurant-grid">
        {data.map((restaurant, index) => (
          <Link to={`/${cleanedPathname}/${restaurant._id}`} key={index} className="restaurant-link">
            <div className="restaurant-card">
              <div className="restaurant-image">
                <img src={restaurant.IMG1} alt={`Restaurant Image ${index + 1}`} />
              </div>
              <div className="restaurant-details">
                <h2 className="restaurant-name">{restaurant.Name}</h2>
                <div className="rating-box">
                  <span className="star-icon">⭐</span>{restaurant.Ratings || 'N/A'}
                </div>
                <p className="restaurant-city">{restaurant.City || 'Unknown City'}</p>
                <p className="restaurant-cuisine">
                  {restaurant.Cusine?.map((cuisine, idx) => (
                    <span key={idx}>
                      {cuisine}{idx < restaurant.Cusine.length - 1 ? ', ' : ''}
                    </span>
                  )) || 'No cuisine available'}
                </p>
              </div>
              <div className="restaurant-actions">
                <button className="btn-view">View Details</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Food;

