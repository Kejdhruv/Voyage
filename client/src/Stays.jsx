import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./Stays.css";

function Stays() {
  const [data, setData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      let url = '';

      if (location.pathname.includes('/Hotels')) {
        url = "http://localhost:5601/Hotels";
      } else if (location.pathname.includes('/Appartments')) {
        url = "http://localhost:5601/Appartments";
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
      <div className="Title2">
        <h1>{cleanedPathname}</h1>
        <div className="title-underline"></div>
      </div>
      <div className="Cards">
        {data.map((product, index) => (
          <Link to={`/${cleanedPathname}/${product._id}`} key={index} className="product-link">
            <div className="product-card">
              <div className="pimage">
                <img src={product.IMG1} alt={`Product Image ${index + 1}`} />
              </div>
              <div className="product-details">
                <p className="product-name">{product.Name}
                  <span className="rating-box">
                    <span className="star-icon">⭐</span>{product.Ratings}
                  </span>
                </p>
                <p className="product-city">{product.City}</p>
              </div>
              <div className="product-actions">
                <button className="btn-view">View Details</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Stays;

