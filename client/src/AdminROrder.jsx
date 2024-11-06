import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./AdminOrder.css"; 

function getLoggedInUser() {
  const user = localStorage.getItem('loggedInUser');
  return user ? JSON.parse(user) : null;
}

function AdminROrder() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);
  const location = useLocation();

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
      console.log('Fetching data for user:', user);
      
      if (!user) {
        setLoading(false);
        return;
      }
  
      let endpoint;
  
      if (user.Category === "Restaurants") {
        endpoint = `http://localhost:5601/RestaurantsOrders/${user._id}`;
      } else {
        console.error('Unknown category:', user.Category);
        setErr('Unknown user category');
        setLoading(false);
        return;
      }
  
      try {
        console.log('Fetching from endpoint:', endpoint);
        const response = await fetch(endpoint);
  
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
  
        const result = await response.json();
        console.log('Fetched data:', result);
        setData(result);
      } catch (error) {
        setErr(error.message);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [user]);

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (err) {
    return   <>  <h1 className="admin-order-heading">Admin Orders</h1>
    <p style={{ fontWeight: 'bold'  , margin: "auto " , padding: 'auto'}} >No orders found.</p>
    ;</>
  }

  if (!user) {
    return <p>No user information found.

    </p>;
  }

  return (
    <div className="admin-order-container">
      <h1 className="admin-order-heading">Admin Orders</h1>
      <div className="order-list">
        {data.length > 0 ? (
          data.map((item) => (
            <div key={item._id} className="order-item">
              <img src={item.Img} alt={item.Name} className="order-image" />
              <div className="order-info">
                <div className="order-name">{item.Name}</div>
                <div className="order-details">
                  <span className="order-detail">Order ID: {item._id}</span>
                  <span className="order-detail">Date: {item.Order[0].Date}</span>
                  <span className="order-detail">Time: {item.Order[0].Time}</span>
                  <span className="order-detail">Guests: {item.Guest}</span>
                  <span className="order-detail">Branch Name: {item.Order[0].Name}</span>
                  <span className="order-detail">Restaurant ID: {item.Order[0].Resid2}</span>
                  <span className="order-city">City: {item.City}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={{ fontWeight: 'bold' }}>No orders found.</p>
        )}
      </div>
    </div>
  );
}

export default AdminROrder;
