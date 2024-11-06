import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './GuidesProfile.css';

function getLoggedInUser() {
    const user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
}

function GuidesProfile() {
    const [user, setUser] = useState(null);
    const [guideData, setGuideData] = useState({
        Category: "Guides",
        name: '',
        age: '',
        About: '',
        Cities: [],
        Achievements: [],
        Skills: [],
        contact: '',
        Img: '',
        HID: '',
    });
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

    useEffect(() => {
        const fetchGuideData = async () => {
            if (user) {
                const url = `http://localhost:5601/Guides/Profile/${user.user}`;
                try {
                    const response = await fetch(url);
                    if (!response.ok) throw new Error('Network response was not ok');
                    const responseData = await response.json();
                    setGuideData(responseData);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setError('Failed to load data. Please try again later.');
                }
            }
        };
        fetchGuideData();
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGuideData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 
        try {
            const response = await fetch(`http://localhost:5601/Guides/Profile/${guideData.contact}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(guideData),
            });

            if (!response.ok) throw new Error('Failed to update user data');

            alert('Guide profile updated successfully!');
        } catch (error) {
            setError(error.message);
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
                        <Link to='/' className="navButton">
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
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={guideData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="number"
                            name="age"
                            placeholder="Age"
                            value={guideData.age}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="contact"
                            placeholder="Contact"
                            value={guideData.contact}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="Img"
                            placeholder="Img URL"
                            value={guideData.Img}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="Achievements"
                            placeholder="Achievements (comma separated)"
                            value={guideData.Achievements.join(', ')}
                            onChange={(e) => handleChange({ target: { name: 'Achievements', value: e.target.value.split(', ') } })}
                            required
                        />
                        <input
                            type="text"
                            name="Skills"
                            placeholder="Skills (comma separated)"
                            value={guideData.Skills.join(', ')}
                            onChange={(e) => handleChange({ target: { name: 'Skills', value: e.target.value.split(', ') } })}
                            required
                        />
                        <textarea
                            name="About"
                            placeholder="About"
                            value={guideData.About}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit">Update Profile</button>
                    </form>
                </div>

                <div className="profile-details">
                    <h1>Guide Profile</h1>
                    <p><strong>Name:</strong> {guideData.name}</p>
                    <p><strong>Age:</strong> {guideData.age}</p>
                    <p><strong>About:</strong> {guideData.About}</p>
                    <p><strong>Contact:</strong> {guideData.contact}</p>
                    <p><strong>Achievements:</strong> {guideData.Achievements.join(', ')}</p>
                    <p><strong>Skills:</strong> {guideData.Skills.join(', ')}</p>
                    <div className="profile-image">
                        {guideData.Img && <img src={guideData.Img} alt={`${guideData.name}`} />}
                    </div>
                </div>
            </div>
        </>
    );
}

export default GuidesProfile;
