import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar({ handleLogout }) {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // ✅ Improved logic to determine if the user is logged in
    useEffect(() => {
        const role = localStorage.getItem("role");
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!role && !!token);  // Ensures both role and token are present
    }, []);

    const navbarStyle = {
        backgroundColor: '#1a1a2e',
        color: '#fff',
        padding: '30px 35px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '20px'
    };

    const buttonStyle = {
        backgroundColor: 'transparent',
        color: '#f1c40f',
        border: '2px solid #f1c40f',
        padding: '8px 20px',
        marginLeft: '15px',
        fontSize: '18px',
        cursor: 'pointer',
        borderRadius: '5px',
        fontWeight: '550'
    };

    return (
        <nav style={navbarStyle}>
            <div style={{ fontWeight: 'bold' }}>BusinessFinder</div>
            <div>
                {isLoggedIn ? (
                    <>
                        <button
                            onClick={() => navigate('/')}
                            style={buttonStyle}
                        >
                            Home
                        </button>
                        <button
                            onClick={() => {
                                localStorage.clear();  // ✅ Ensures clear state
                                handleLogout();
                            }}
                            style={buttonStyle}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => navigate('/login')}
                            style={buttonStyle}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate('/register')}
                            style={buttonStyle}
                        >
                            Register
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
