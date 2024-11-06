import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./Facilities.css";

function getLoggedInUser() {
  const user = localStorage.getItem('loggedInUser');
  return user ? JSON.parse(user) : null;
}

function Facilities() {
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
      if (!user) {
        setLoading(false);
        return;
      }

      let endpoint;

      if (user.Category === "Hotels") {
        endpoint = `http://localhost:5601/Hotels/HID/${user._id}`;
      } else if (user.Category === "Restaurants") {
        endpoint = `http://localhost:5601/Restaurants/HID/${user._id}`;
      } else if (user.Category === "Activities") {
        endpoint = `http://localhost:5601/Activities/HID/${user._id}`; // Adjust as necessary for your API
      } else {
        console.error('Unknown category:', user.Category);
        setErr('Unknown user category');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
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

  const deleteItem = async (id) => {
    let endpoint; 
    if (user.Category === "Hotels") {
      endpoint = `http://localhost:5601/Hotels/${id}`;
    } else if (user.Category === "Restaurants") {
      endpoint = `http://localhost:5601/Restaurants/${id}`;
    } else if (user.Category === "Activities") {
      endpoint = `http://localhost:5601/Activities/${id}`; // Adjust as necessary for your API
    } else {
      console.error('Unknown category for deletion:', user.Category);
      return;
    }

    try {
      const response = await fetch(endpoint, { method: "DELETE" });

      if (!response.ok) {
        throw new Error(`Failed to delete item: ${response.status} ${response.statusText}`);
      }

      setData(prevData => prevData.filter(item => item._id !== id));
    } catch (error) {
      setErr(error.message);
      console.error("Error deleting item:", error);
    }
  };

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (err) {
    return <p>Error: {err}</p>;
  }

  if (!user) {
    return <p>No user information found.</p>;
  }

  return ( 
    <div>
      <div className="navbar">
        <div className="navContainer">
          <span className="logo">VOYAGE</span>
          <div className="navItems">
            <Link to='/' className="navButton"><button className="navButton">HomePage</button></Link> 
            <button className="navButton">Logout</button>
          </div>
        </div>
      </div>
      <div className="Heading2">Branches</div>
      <div className="product-list-container4">
        <div className="product-list1">
          {data.map((item) => (
            <div key={item._id} className="product-item2">
              <img src={item.IMG2} alt={item.Name} className="product-image4" />
              <div className="product-info6">
                <span className="product-name8">{item.City}</span>
                <div className="button-group">
                  <button className="delete-button9" onClick={() => deleteItem(item._id)}>Delete</button>
                  <Link to={`/${user.Category}/${item._id}`} >
                    <button className="view-button">View</button>
                  </Link> 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Facilities;






