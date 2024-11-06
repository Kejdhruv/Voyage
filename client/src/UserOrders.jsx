import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./UserOrder.css"; // Create this CSS file for specific styling

function getLoggedInUser() {
  const user = localStorage.getItem('loggedInUser');
  return user ? JSON.parse(user) : null;
}

function UserOrders() {
  const [data1, setData1] = useState([]); // Hotel Orders
  const [data2, setData2] = useState([]); // Restaurant Orders
  const [data3, setData3] = useState([]);
  const [data4, setData4]  = useState([])// Guide Orders
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
    const fetchData1 = async () => {
      if (!user) return;
      const endpoint1 = `http://localhost:5601/UserOrders/HotelOrders/${user._id}`;
      const response = await fetch(endpoint1);
      if (response.ok) {
        const result1 = await response.json();
        setData1(result1);
      }
    };
  
    fetchData1();
  }, [user]);

  useEffect(() => {
    const fetchData2 = async () => {
      if (!user) return;
      const endpoint2 = `http://localhost:5601/UserOrders/RestaurantsOrders/${user._id}`;
      const response = await fetch(endpoint2);
      if (response.ok) {
        const result2 = await response.json();
        setData2(result2);
      }
    };
  
    fetchData2();
  }, [user]);

  useEffect(() => {
    const fetchData3 = async () => {
      if (!user) return;
      const endpoint3 = `http://localhost:5601/UserOrders/GuideOrders/${user._id}`;
      const response = await fetch(endpoint3);
      if (response.ok) {
        const result3 = await response.json();
        setData3(result3);
      }
    };
  
    fetchData3();
  }, [user]);
  
  useEffect(() => {
    const fetchData4 = async () => {
      if (!user) return;
      const endpoint4 = `http://localhost:5601/UserOrders/ActivitiesOrders/${user._id}`;
      const response = await fetch(endpoint4);
      if (response.ok) {
        const result4 = await response.json();
        setData4(result4);
      }
    };
  
    fetchData4();
  }, [user]);

  return (
    <div className="admin-order-container">
      <h1 className="admin-order-heading">Your Orders</h1>

      {/* Hotel Orders Section */}
      <section className="order-section">
        <h2 className="section-title">Hotel Orders</h2>
        {data1.length > 0 ? (
          data1.map((item) => (
            <div key={item._id} className="order-item">
              <img src={item.Img} alt={item.Name} className="order-image" />
              <div className="order-info">
                <div className="order-name">{item.Name}</div>
                <div className="order-details">
                  <span className="order-detail">Order ID: {item._id}</span>
                  <span className="order-detail">Check-in: {item.Checkin}</span>
                  <span className="order-detail">Check-out: {item.Checkout}</span>
                  <span className="order-detail">Guests: {item.Guest}</span>
                  <span className="order-detail">Room: {item.Order[0].Room}</span>
                  <span className="order-detail">Hotel Name: {item.Order[0].Name}</span>
                
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hotel orders found.</p>
        )}
      </section>

      {/* Restaurant Orders Section */}
      <section className="order-section">
        <h2 className="section-title">Restaurant Orders</h2>
        {data2.length > 0 ? (
          data2.map((item) => (
            <div key={item._id} className="order-item">
              <img src={item.Img} alt={item.Name} className="order-image" />
              <div className="order-info">
                <div className="order-name">{item.Name}</div>
                <div className="order-details">
                  <span className="order-detail">Order ID: {item._id}</span>
                  <span className="order-detail">Restaurant Name: {item.Order[0].Name}</span>
                  <span className="order-detail">Date: {item.Order[0].Date}</span>
                  <span className="order-detail">Date: {item.Order[0].Time}</span>
                  <span className="order-detail">Guests: {item.Guest}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No restaurant orders found.</p>
        )}
      </section>

      {/* Guide Orders Section */}
      <section className="order-section">
        <h2 className="section-title">Guide Orders</h2>
        {data3.length > 0 ? (
          data3.map((item) => (
            <div key={item._id} className="order-item">
          
              <div className="order-info">
                <div className="order-name">{item.CustomerName}</div>
                <div className="order-details">
                  <span className="order-detail">Order ID: {item._id}</span>
                  <span className="order-detail">Guide Name :  {item.GuideName}</span>
                  <span className="order-detail">From: {item.StartDate}</span>
                  <span className="order-detail">To: {item.EndDate}</span>
                  <span className="order-detail">Guests: {item.Guests}</span>
                  <span className="order-detail">City: {item.City}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No guide orders found.</p>
        )}
      </section>

      <section className="order-section">
        <h2 className="section-title">Activities Bookings</h2>
        {data4.length > 0 ? (
          data4.map((item) => (
            <div key={item._id} className="order-item">
              <img src={item.Img} alt={item.CustomerName} className="order-image" />
              <div className="order-info">
                <div className="order-name">{item.CustomerName}</div>
                <div className="order-details">
                  <span className="order-detail">Order ID: {item._id}</span>
                  <span className="order-detail">Activity Name: {item.ActivityName}</span>
                  <span className="order-detail">Date: {item.StartDate}</span>
                  <span className="order-detail">Date: {item.Time}</span>
                  <span className="order-detail">Guests: {item.Guests}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No Activities found.</p>
        )}
      </section>

    </div>
  );
}

export default UserOrders;


