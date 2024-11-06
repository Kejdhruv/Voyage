import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserPanel.css'; 

function getLoggedInUser() {
    const user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
}

function UserPanel() {
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
            const redirectPath = `/UsersProfile/${user._id}`;
            navigate(redirectPath);
        }
    };

    const handleOrderFacilityClick = () => {
        if (user) {
            const redirectPath = `/UserOrders/${user._id}`;
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
                    View Profile 
                </div>
                <div className="Card" onClick={handleOrderFacilityClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleOrderFacilityClick()}>
                    View Orders
                </div>
            </div>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default UserPanel;
