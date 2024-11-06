import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './UserProfile.css';

function getLoggedInUser() {
    const user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
}

function UserProfile() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = getLoggedInUser();
        if (!loggedInUser) {
            navigate('/login');
        } else {
            setUser(loggedInUser);
        }
    }, [navigate]);

    const [userData, setUserData] = useState({
        name: '',
        email: '', // Added email field
        password: '',
        age: '',
        Img: '',
        contact: '',
    });

    useEffect(() => {
        if (user) {
            setUserData({
                name: user.name || '',
                email: user.user || '', // Initialize email
                password: user.password || '',
                age: user.age || '',
                Img: user.Img || 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg',
                contact: user.contact || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch(`http://localhost:5601/Register/User/${user._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            if (!response.ok) throw new Error('Failed to update user data');

            alert('User profile updated successfully!');
        } catch (error) {
            setError(`Error: ${error.message}`);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        navigate('/login');
    };

    if (!user) return <p>Loading user data...</p>;

    return (
        <>
            <div className="navbar">
                <div className="navContainer">
                    <span className="logo">VOYAGE</span>
                    <div className="navItems">
                        <Link to="/" className="navButton">
                            <button className="navButton">Home</button>
                        </Link>
                        <button className="navButton" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
            <div className="guide-profile-container">
                <div className="guide-edit-form">
                    <h1>Edit Profile</h1>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit}>
                    <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={userData.email}
                            readOnly // Make email field non-editable
                        /> 
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={userData.name}
                            onChange={handleChange}
                            required
                        />
                       
                        <input
                            type="number"
                            name="age"
                            placeholder="Age"
                            value={userData.age}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="contact"
                            placeholder="Contact"
                            value={userData.contact}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="Img"
                            placeholder="Img URL"
                            value={userData.Img}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={userData.password}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit">Update Profile</button>
                    </form>
                </div>

                <div className="profile-details">
                    <h1>User Profile</h1>
                    <div className="profile-image1">
                        {userData.Img && <img src={userData.Img} alt={`${userData.name}`} />}
                    </div>
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p> {/* Display email */}
                    <p><strong>Age:</strong> {userData.age}</p>
                    <p><strong>Contact:</strong> {userData.contact}</p>
                </div>
            </div>
        </>
    );
}

export default UserProfile;
