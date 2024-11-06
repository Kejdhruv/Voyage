import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GuidePanel.css'; 

function getLoggedInUser() {
    const user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
}

function GuidePanel() {
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
            const redirectPath = `/GuidesProfile/${user.user}`;
            navigate(redirectPath);
        }
    };
    const handleOrderFacilityClick = () => {
        if (user) {
            const redirectPath =  `/GuideOrders/${user._id}` ;
            navigate(redirectPath);
        }
    };

    return (
        <div className="admin-panel">
            <div className="welcome-message">
                Welcome  {user ? user.name : 'Guest'} 
            </div>
            <div className="cards-container">
                <div className="Card" onClick={handleAddFacilityClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleAddFacilityClick()}>
                    View Profile 
                </div>
                <div className="Card" onClick={handleOrderFacilityClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleOrderFacilityClick()}>
                    View Orders
                </div>
            </div>
        </div>
    );
}

export default GuidePanel;