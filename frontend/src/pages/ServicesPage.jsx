import React, { useState } from 'react';

const ServicesPage = () => {
    const services = [
        { title: "Nutrition", icon: "🥗", description: "Get personalized diet plans, healthy eating tips, and nutritional guidance for a balanced lifestyle." },
        { title: "Yoga", icon: "🧘", description: "Join our yoga sessions for improved flexibility, mental calmness, and overall well-being." },
        { title: "Tutoring", icon: "📚", description: "Expert tutors available for subjects like math, science, and languages to help you excel." },
        { title: "Beauty", icon: "💄", description: "Offering skincare, makeup tutorials, and beauty consultations for a flawless look." },
        { title: "Clothing", icon: "👗", description: "Explore trendy outfits, fashion advice, and seasonal wardrobe collections." },
        { title: "Accessories", icon: "👜", description: "Find stylish accessories including bags, jewelry, and watches to enhance your look." },
        { title: "Home Made Food", icon: "🍲", description: "Delicious and freshly prepared homemade meals delivered to your doorstep." },
        { title: "Zumba", icon: "💃", description: "Join our energetic Zumba classes to burn calories and stay fit while dancing to upbeat music." }
    ];

    const [search, setSearch] = useState('');

    const filteredServices = services.filter(service =>
        service.title.toLowerCase().includes(search.toLowerCase())
    );

    const containerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px',
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#ffffff'
    };

    const cardStyle = {
        backgroundColor: '#ffffff',
        border: '2px solid #A8D5BA',  
        borderRadius: '10px',
        padding: '20px',
        textAlign: 'center',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
    };

    const cardHoverStyle = {
        transform: 'scale(1.05)',
        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.15)',
        border: '2px solid #6AB187'
    };

    const iconStyle = {
        fontSize: '40px',
        color: '#6AB187',
        marginBottom: '10px'
    };

    const titleStyle = {
        fontWeight: 'bold',
        marginBottom: '8px',
        fontSize: '18px',
        color: '#2F4858'
    };

    const textStyle = {
        color: '#5B7065',
        fontSize: '13px',
        marginBottom: '10px'
    };

    const buttonStyle = {
        backgroundColor: '#6AB187',
        color: '#ffffff',
        border: 'none',
        padding: '8px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background 0.3s ease'
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        marginBottom: '20px',
        border: '2px solid #A8D5BA',
        borderRadius: '5px',
        fontSize: '16px',
        backgroundColor: '#f9f9f9'
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#ffffff' }}>
            <h1 style={{ textAlign: 'center', color: '#2F4858', fontSize: '28px' }}>
                Our Services
            </h1>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={inputStyle}
            />

            {/* Grid Display */}
            <div 
                style={{ 
                    ...containerStyle, 
                    gridTemplateColumns: 'repeat(3, 1fr)' 
                }}
            >
                {filteredServices.map((service, index) => (
                    <div
                        key={index}
                        style={{
                            ...cardStyle,
                            ...(search && filteredServices.length === 1 ? cardHoverStyle : {})
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        onClick={() => alert(`${service.title} clicked!`)}
                    >
                        <div style={iconStyle} title={service.title}>
                            {service.icon}
                        </div>
                        <div style={titleStyle}>{service.title}</div>
                        <div style={textStyle}>{service.description}</div>

                        <button 
                            style={buttonStyle} 
                            onClick={(e) => {
                                e.stopPropagation();
                                alert(`Learn more about ${service.title}!`);
                            }}
                        >
                            See Options
                        </button>
                    </div>
                ))}

                {filteredServices.length === 0 && (
                    <p style={{ textAlign: 'center', color: '#e74c3c', gridColumn: 'span 3' }}>
                        No services found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ServicesPage;
