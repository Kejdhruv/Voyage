import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css'; 

function getLoggedInUser() {
    const user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
}

function AdminPanel() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = getLoggedInUser();
        if (!loggedInUser) {
            navigate('/login'); 
        } else {
            setUser(loggedInUser);
            console.log('Logged-in user:', loggedInUser);
        }
    }, [navigate]);

    const handleAddFacilityClick = () => {
        if (user) {
            let redirectPath;
            switch (user.Category) {
                case 'Hotels':
                    redirectPath = `/Hotel-form/${user._id}`;
                    break;
                case 'Restaurants':
                    redirectPath = `/Restaurant-form/${user._id}`;
                    break;
                case 'Activities':
                    redirectPath = `/Activities-form/${user._id}`;
                    break;
                default:
                    return; // or handle an unsupported category
            }
            navigate(redirectPath);
        }
    };

    const handleOrderFacilityClick = () => {
        if (user) {
            let redirectPath;
            switch (user.Category) {
                case 'Hotels':
                    redirectPath = `/HotelOrders/${user._id}`;
                    break;
                case 'Restaurants':
                    redirectPath = `/RestaurantOrders/${user._id}`;
                    break;
                case 'Activities':
                    redirectPath = `/ActivitiesOrders/${user._id}`;
                    break;
                default:
                    return; // or handle an unsupported category
            }
            navigate(redirectPath);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser'); // Clear the logged-in user
        setUser(null); // Update state
        navigate('/'); // Navigate to the login page
    };

    return (
        <div className="admin-panel">
            <div className="welcome-message">
                Welcome {user ? user.name : 'Guest'} 
            </div>
            <div className="cards-container">
                <div className="Card" onClick={handleAddFacilityClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleAddFacilityClick()}>
                    Add Facility
                </div>
                {user && (
                    <div className="Card" onClick={() => navigate(`/Facilities/${user._id}`)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && navigate(`/Facilities/${user._id}`)}>
                        Facilities
                    </div>
                )}
                <div className="Card" onClick={handleOrderFacilityClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleOrderFacilityClick()}>
                    View Orders
                </div>
            </div>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default AdminPanel;



