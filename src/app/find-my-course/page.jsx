"use client";
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CourseFinder from '../../components/CourseFinder';

export default function FindMyCoursePage() {
    React.useEffect(() => {
        // Force body to be scrollable when this page mounts
        document.body.style.overflow = 'auto';
        document.body.style.height = 'auto';
        document.documentElement.style.overflow = 'auto';
        document.documentElement.style.height = 'auto';
        
        // Remove platform scroll lock if present
        document.body.classList.remove('antigravity-scroll-lock');
        
        return () => {
            document.body.style.overflow = '';
            document.body.style.height = '';
            document.documentElement.style.overflow = '';
            document.documentElement.style.height = '';
        };
    }, []);

    return (
        <div className="course-finder-page">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

                :root {
                    --light-blue: #0099D6;
                    --dark-blue: #00529D;
                    --maroon: #8B2346;
                    --dark-maroon: #6B1D3A;
                    --pink: #C4567A;
                    --white: #FFFFFF;
                    --gray: #64748B;
                    --text-dark: #2D1B4E;
                }

                .course-finder-page {
                    font-family: 'Poppins', sans-serif;
                    background: linear-gradient(135deg, var(--dark-maroon) 0%, var(--maroon) 100%);
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                }

                .hero-pattern {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M40 10L50 30H30L40 10zM40 70L30 50H50L40 70zM10 40L30 30V50L10 40zM70 40L50 50V30L70 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
                    opacity: 0.5;
                    pointer-events: none;
                }

                .decor-circle {
                    position: absolute;
                    border-radius: 50%;
                }

                .decor-circle-1 {
                    top: 10%;
                    right: 10%;
                    width: 300px;
                    height: 300px;
                    background: radial-gradient(circle, rgba(0, 153, 214, 0.1) 0%, transparent 70%);
                    animation: pulse 8s ease-in-out infinite;
                }

                .decor-circle-2 {
                    bottom: 10%;
                    left: -5%;
                    width: 400px;
                    height: 400px;
                    background: radial-gradient(circle, rgba(196, 86, 122, 0.1) 0%, transparent 70%);
                    animation: pulse 10s ease-in-out infinite alternate;
                }

                @keyframes pulse {
                    0% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(1.2); opacity: 0.8; }
                    100% { transform: scale(1); opacity: 0.5; }
                }

                .content-container {
                    flex: 1;
                    padding: 140px 20px 80px;
                    position: relative;
                    z-index: 2;
                    max-width: 1200px;
                    margin: 0 auto;
                    width: 100%;
                }

                .page-header {
                    text-align: center;
                    margin-bottom: 50px;
                }

                .hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(255, 255, 255, 0.15);
                    color: var(--white);
                    padding: 10px 20px;
                    border-radius: 30px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    margin-bottom: 25px;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .hero-title {
                    color: var(--white);
                    font-size: clamp(2.2rem, 5vw, 3.5rem);
                    font-weight: 800;
                    line-height: 1.2;
                    margin-bottom: 20px;
                }

                .hero-title .highlight {
                    color: var(--light-blue);
                }

                .hero-subtitle {
                    color: rgba(255, 255, 255, 0.85);
                    font-size: 1.1rem;
                    max-width: 600px;
                    margin: 0 auto;
                    line-height: 1.6;
                }
            `}</style>

            <Navbar />
            <div className="hero-pattern"></div>
            <div className="decor-circle decor-circle-1"></div>
            <div className="decor-circle decor-circle-2"></div>
            
            <main className="content-container">
                <header className="page-header">
                    <span className="hero-badge">
                        <i className="fa-solid fa-wand-magic-sparkles"></i>
                        <span>Personalized Guidance</span>
                    </span>
                    <h1 className="hero-title">
                        Find Your <span className="highlight">Perfect Course</span>
                    </h1>
                    <p className="hero-subtitle">
                        Tell us about your background and interests, and we'll recommend the best UGC-approved programs from India's top universities.
                    </p>
                </header>

                <CourseFinder standalone={true} />
            </main>

            <Footer />
        </div>
    );
}
