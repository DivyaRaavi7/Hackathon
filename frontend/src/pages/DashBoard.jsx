import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [businessDetails, setBusinessDetails] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook for routing

    useEffect(() => {
        const fetchBusinessDetails = async () => {
            try {
                const token = localStorage.getItem("authToken");

                if (!token) {
                    // If no token is found, redirect to login page
                    navigate("/login");
                    return;
                }

                const response = await axios.get("/api/business", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                if (response.data.businessDetails) {
                    // Set business details in state
                    setBusinessDetails(response.data.businessDetails);
                } else {
                    setError("Business details not found. Please add your business.");
                    navigate("/add-business"); // Redirect to AddBusiness page if no business found
                }
            } catch (err) {
                console.error("Error fetching business details:", err);
                setError("Failed to load business details. Please try again.");
            }
        };

        fetchBusinessDetails();
    }, [navigate]); // Dependency array to ensure effect runs on mount

    if (error) {
        return <div>{error}</div>;
    }

    if (!businessDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div style={dashboardContainerStyle}>
            <h1>Welcome to Your Dashboard</h1>
            <div style={businessDetailsStyle}>
                <h2>{businessDetails.name}</h2>
                <p><strong>Category:</strong> {businessDetails.category}</p>
                <p><strong>Location:</strong> {businessDetails.location}</p>
                <p><strong>Services:</strong> {businessDetails.services}</p>
                <p><strong>Pricing:</strong> {businessDetails.pricing}</p>
                <p><strong>Description:</strong> {businessDetails.description}</p>

                {businessDetails.image && (
                    <img src={businessDetails.image} alt={businessDetails.name} style={imageStyle} />
                )}
            </div>
        </div>
    );
};

// Styles for the dashboard
const dashboardContainerStyle = {
    background: "#EAE6FB",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "20px",
    height: "100vh",
};

const businessDetailsStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "40px",
    maxWidth: "600px",
    width: "100%",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
};

const imageStyle = {
    width: "200px",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
    marginTop: "20px",
};

export default Dashboard;
