import React from 'react';
import './AboutPage.css';
import dlsulabsLogo from '../../../assets/dlsulabs.png';

const AboutUs: React.FC = () => {
    const developers = [
        { name: "Aquino, Jan", role: "Backend Developer" },
        { name: "Fajardo, Michealangelo", role: "Frontend Developer" },
        { name: "Maravilla, Sofia", role: "Frontend Developer" },
        { name: "Ramos, Richmond", role: "Backend Developer" },
    ];

    const frontendPackages = [
        "react 19.2.0 - Frontend Library",
        "react-dom 19.2.0 - DOM",
        "react-router-dom 7.13.0 - Frontend Routes Creation",
        "vite 7.2.4 - Dev Server",
    ];

    const backendPackages = [
        "bcrypt 6.0.0 - Password Hashing",
        "cookie-parser 1.4.7 - cookie parsing and retrieval",
        "cors 2.8.6 - HTTP restriction",
        "dotenv 17.3.1 - .env Configuration",
        "express 1.5.0 - endpoint creation",
        "jsonwebtoken 9.0.3 - Authentication",
        "mongoose 9.1.5 - object data modelling",
        "tsx 4.20.6 - Dev Server",
    ];

    return (
        <div className="about-container">
            <div className="about-hero">
                <div className="hero-content">
                    <img src={dlsulabsLogo} alt="DLSULABS Logo" className="main-logo" />
                    <h1 className="about-title">About Us</h1>
                </div>
            </div>

            <div className="info-grid">
                <div className="info-column centered-column">
                    <h2 className="section-header">Developers</h2><br /><br />
                    {developers.map((dev, index) => (
                        <div key={index} className="dev-entry">
                            <h3 className="dev-name">{dev.name}</h3>
                            <p className="dev-role">-- {dev.role} --</p>
                        </div>
                    ))}
                </div>

                <div className="vertical-divider"></div>

                <div className="info-column centered-column">
                    <h2 className="section-header">Packages</h2>

                    <div className="package-group">
                        <h3 className="package-type-centered">Frontend Packages</h3>
                        {frontendPackages.map((pkg, idx) => (
                            <p key={idx} className="package-item">{pkg}</p>
                        ))}
                    </div>

                    <div className="package-group">
                        <h3 className="package-type-centered">Backend Packages</h3>
                        {backendPackages.map((pkg, idx) => (
                            <p key={idx} className="package-item">{pkg}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;