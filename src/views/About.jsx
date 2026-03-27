"use client";
import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import directorImage from '../assets/team/mujeeb_t.jpg';

const About = () => {
    const team = [
        {
            name: 'Mujeeb T',
            role: 'Director & CEO',
            image: directorImage.src,
            description: 'Education industry veteran with 15+ years of experience'
        }
    ];

    const milestones = [
        { year: '2019', title: 'Founded', description: 'Edufolio was established with a vision to democratize education' },
        { year: '2020', title: '10+ Universities', description: 'Partnered with top universities across India' },
        { year: '2021', title: '5000+ Students', description: 'Crossed 5000 student enrollments milestone' },
        { year: '2022', title: '50+ Programs', description: 'Expanded to offer 50+ diverse programs' },
        { year: '2023', title: '15000+ Students', description: 'Serving over 15,000 students nationwide' },
        { year: '2024', title: 'Pan India Presence', description: 'Students from all 28 states enrolled' }
    ];

    return (
        <>
            <style>{`
                /* ==================== ABOUT PAGE STYLES ==================== */
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

                /* ==================== CSS VARIABLES ==================== */
                :root {
                    --light-blue: #0099D6;
                    --dark-blue: #00529D;
                    --maroon: #8B2346;
                    --dark-maroon: #6B1D3A;
                    --pink: #C4567A;
                    --light-pink: #E8B4C4;
                    --white: #FFFFFF;
                    --light-gray: #F5F7FA;
                    --gray: #64748B;
                    --dark-gray: #1E293B;
                    --text-dark: #2D1B4E;
                    --text-light: #FFFFFF;
                    --text-muted: #94A3B8;
                    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
                    --shadow-md: 0 4px 20px rgba(0, 0, 0, 0.1);
                    --shadow-lg: 0 15px 40px rgba(0, 0, 0, 0.15);
                    --radius-sm: 8px;
                    --radius-md: 12px;
                    --radius-lg: 16px;
                    --radius-xl: 20px;
                    --radius-2xl: 24px;
                    --radius-full: 50%;
                    --transition-fast: 0.2s ease;
                    --transition-normal: 0.3s ease;
                    --container-max: 1200px;
                }

                /* ==================== BASE ==================== */
                .about-page {
                    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    overflow-x: hidden;
                    color: var(--text-dark);
                    line-height: 1.6;
                }

                .container {
                    max-width: var(--container-max);
                    margin: 0 auto;
                    padding: 0 20px;
                    position: relative;
                    z-index: 1;
                }

                /* ==================== HERO SECTION ==================== */
                .about-hero {
                    background: linear-gradient(135deg, var(--dark-blue) 0%, #003D7A 100%);
                    padding: 100px 0 60px;
                    position: relative;
                    overflow: hidden;
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

                .hero-container {
                    max-width: var(--container-max);
                    margin: 0 auto;
                    padding: 0 20px;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 60px;
                    align-items: center;
                    position: relative;
                    z-index: 2;
                }

                .hero-content {
                    max-width: 550px;
                }

                .hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(0, 153, 214, 0.2);
                    color: var(--light-blue);
                    padding: 10px 20px;
                    border-radius: 30px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    margin-bottom: 20px;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                }

                .hero-title {
                    color: var(--white);
                    font-size: clamp(2rem, 5vw, 2.8rem);
                    font-weight: 800;
                    line-height: 1.2;
                    margin-bottom: 20px;
                }

                .hero-title .highlight {
                    color: var(--light-blue);
                }

                .hero-subtitle {
                    color: rgba(255, 255, 255, 0.85);
                    font-size: clamp(0.95rem, 2vw, 1.1rem);
                    line-height: 1.7;
                    margin-bottom: 20px;
                }

                .tagline {
                    display: flex;
                    gap: 15px;
                    margin-bottom: 30px;
                    color: var(--light-blue);
                    font-size: 1.1rem;
                    font-weight: 600;
                    font-style: italic;
                }

                .hero-stats {
                    display: flex;
                    align-items: center;
                    gap: 25px;
                    background: rgba(255, 255, 255, 0.1);
                    padding: 20px 30px;
                    border-radius: var(--radius-lg);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .hero-stat {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                }

                .hero-stat-number {
                    color: var(--white);
                    font-size: clamp(1.5rem, 3vw, 1.8rem);
                    font-weight: 800;
                }

                .hero-stat-label {
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 0.85rem;
                }

                .hero-stat-divider {
                    width: 1px;
                    height: 40px;
                    background: rgba(255, 255, 255, 0.2);
                }

                /* ==================== HERO IMAGES ==================== */
                .hero-images {
    position: relative;
    height: 500px;
}

                .main-image-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 320px;
    height: 380px;
    border-radius: var(--radius-2xl);
    overflow: hidden;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
    border: 5px solid rgba(255, 255, 255, 0.2);
}

                .main-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

                .main-image-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(to top, rgba(0, 82, 157, 0.7), transparent);
}

                .floating-image {
    position: absolute;
    border-radius: var(--radius-md);
    overflow: hidden;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
    border: 4px solid rgba(255, 255, 255, 0.3);
}

                .floating-image-1 {
    top: 10px;
    right: 20px;
    width: 150px;
    height: 105px;
    animation: float1 6s ease -in -out infinite;
}

                .floating-image-2 {
    bottom: 30px;
    left: 0;
    width: 140px;
    height: 100px;
    animation: float2 6s ease -in -out infinite;
}

                .floating-image-3 {
    top: 40%;
    right: 0;
    width: 120px;
    height: 85px;
    border-radius: var(--radius-md);
    border-width: 3px;
    animation: float1 5s ease -in -out infinite;
}

                .floating-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

                .floating-card {
    position: absolute;
    background: var(--white);
    padding: 15px 20px;
    border-radius: var(--radius-md);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    gap: 12px;
}

                .floating-exp-card {
    top: 30px;
    left: 10px;
    animation: float1 5s ease -in -out infinite;
}

                .floating-trust-card {
    bottom: 60px;
    right: 10px;
    animation: float2 5s ease -in -out infinite;
}

                .floating-card-icon {
    width: 45px;
    height: 45px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
}

                .floating-card-icon.gold {
    background: #FEF3C7;
    color: #D97706;
}

                .floating-card-icon.maroon {
    background: rgba(139, 35, 70, 0.1);
    color: var(--maroon);
}

                .floating-card-content {
    display: flex;
    flex-direction: column;
}

                .floating-card-number {
    color: var(--text-dark);
    font-size: 1.1rem;
    font-weight: 800;
}

                .floating-card-label {
    color: var(--gray);
    font-size: 0.75rem;
}

                .decor-circle {
    position: absolute;
    border-radius: var(--radius-full);
}

                .decor-circle-1 {
    top: 15%;
    right: 10%;
    width: 70px;
    height: 70px;
    border: 3px solid rgba(0, 153, 214, 0.25);
    animation: pulse 3s ease -in -out infinite;
}

                .decor-circle-2 {
    bottom: 20%;
    left: 8%;
    width: 50px;
    height: 50px;
    background: rgba(0, 153, 214, 0.15);
    animation: pulse 4s ease -in -out infinite;
}

                .decor-dots {
    position: absolute;
    top: 55%;
    right: 5%;
    width: 50px;
    height: 50px;
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.3) 2px, transparent 2px);
    background-size: 10px 10px;
}

                /* ==================== SECTIONS ==================== */
                .section {
    padding: 100px 20px;
    background: var(--white);
}

                .section-gray {
    padding: 100px 20px;
    background: var(--light-gray);
}

                .section-header-center {
    text-align: center;
    margin-bottom: 50px;
}

                .section-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 30px;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 15px;
}

                .section-badge.maroon {
    background: rgba(139, 35, 70, 0.1);
    color: var(--maroon);
}

                .section-badge.blue {
    background: rgba(0, 82, 157, 0.1);
    color: var(--dark-blue);
}

                .section-badge.light {
    background: rgba(255, 255, 255, 0.15);
    color: var(--white);
}

                .section-title {
    color: var(--text-dark);
    font-size: clamp(1.75rem, 4vw, 2.2rem);
    font-weight: 800;
    margin-bottom: 20px;
    line-height: 1.3;
}

                .section-title.light {
    color: var(--white);
}

                .section-title.center {
    text-align: center;
}

                .section-subtitle {
    color: var(--gray);
    font-size: 1.05rem;
    margin-bottom: 50px;
}

                .section-subtitle.center {
    text-align: center;
}

                .section-subtitle.light {
    color: rgba(255, 255, 255, 0.8);
}

                .section-text {
    color: var(--gray);
    font-size: 1.05rem;
    line-height: 1.8;
    margin-bottom: 20px;
}

                /* ==================== MISSION SECTION ==================== */
                .mission-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
}

                .mission-image {
    position: relative;
}

                .mission-image img {
    width: 100%;
    border-radius: var(--radius-xl);
    box-shadow: 0 20px 50px rgba(0, 82, 157, 0.15);
}

                .image-accent {
    position: absolute;
    bottom: -20px;
    right: -20px;
    width: 200px;
    height: 200px;
    background: linear-gradient(135deg, rgba(139, 35, 70, 0.1), rgba(196, 86, 122, 0.1));
    border-radius: var(--radius-xl);
    z-index: -1;
}

                .mission-stats {
    display: flex;
    gap: 40px;
    margin-top: 30px;
    flex-wrap: wrap;
}

                .mission-stat {
    display: flex;
    flex-direction: column;
}

                .mission-stat-number {
    font-size: clamp(2rem, 4vw, 2.5rem);
    font-weight: 800;
}

                .mission-stat-number.maroon {
    color: var(--maroon);
}

                .mission-stat-number.blue {
    color: var(--dark-blue);
}

                .mission-stat-label {
    color: var(--gray);
    font-size: 0.95rem;
}

                /* ==================== VISION SECTION ==================== */
                .vision-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
}

                .vision-image img {
    width: 100%;
    border-radius: var(--radius-xl);
    box-shadow: 0 20px 50px rgba(0, 82, 157, 0.15);
}

                .vision-points {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 25px;
}

                .vision-point {
    display: flex;
    align-items: center;
    gap: 15px;
    color: var(--gray);
    font-size: 1rem;
}

                .vision-point-icon {
    width: 32px;
    height: 32px;
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    flex-shrink: 0;
}

                .vision-point-icon.blue {
    background: rgba(0, 82, 157, 0.1);
    color: var(--dark-blue);
}

                .vision-point-icon.maroon {
    background: rgba(139, 35, 70, 0.1);
    color: var(--maroon);
}

                /* ==================== JOURNEY/TIMELINE SECTION ==================== */
                .journey-section {
    padding: 100px 20px;
    background: linear-gradient(135deg, var(--dark-blue) 0%, #003D7A 100%);
    position: relative;
    overflow: hidden;
}

                .journey-pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M40 10L50 30H30L40 10zM40 70L30 50H50L40 70zM10 40L30 30V50L10 40zM70 40L50 50V30L70 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.5;
    pointer-events: none;
}

                .timeline {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
}

                .timeline-item {
    background: rgba(255, 255, 255, 0.08);
    border-radius: var(--radius-lg);
    padding: 25px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    transition: all var(--transition-normal);
}

                .timeline-item:hover {
    background: rgba(255, 255, 255, 0.12);
    transform: translateY(-3px);
}

                .timeline-year {
    display: inline-block;
    background: var(--light-blue);
    color: var(--white);
    padding: 8px 20px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 700;
    margin-bottom: 15px;
}

                .timeline-title {
    color: var(--white);
    font-size: 1.15rem;
    font-weight: 700;
    margin-bottom: 10px;
}

                .timeline-desc {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    line-height: 1.6;
    margin: 0;
}

                /* ==================== VALUES SECTION ==================== */
                .values-section {
    padding: 100px 20px;
    background: linear-gradient(135deg, var(--dark-maroon) 0%, var(--maroon) 100%);
    position: relative;
    overflow: hidden;
}

                .values-pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M40 10L50 30H30L40 10zM40 70L30 50H50L40 70zM10 40L30 30V50L10 40zM70 40L50 50V30L70 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.5;
    pointer-events: none;
}

                .values-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 25px;
}

                .value-card {
    background: rgba(255, 255, 255, 0.08);
    padding: 35px 25px;
    border-radius: var(--radius-xl);
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all var(--transition-normal);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

                .value-card:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-5px);
}

                .value-icon {
    width: 70px;
    height: 70px;
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: var(--white);
    margin: 0 auto 20px;
}

                .value-icon.blue {
    background: var(--light-blue);
    box-shadow: 0 8px 20px rgba(0, 153, 214, 0.4);
}

                .value-icon.white {
    background: rgba(255, 255, 255, 0.2);
}

                .value-title {
    color: var(--white);
    font-size: 1.15rem;
    font-weight: 700;
    margin-bottom: 12px;
}

                .value-text {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
    line-height: 1.6;
    margin: 0;
}

                /* ==================== STATS SECTION ==================== */
                .stats-section {
    padding: 80px 20px;
    background: linear-gradient(135deg, var(--dark-blue) 0%, #003D7A 100%);
    position: relative;
    overflow: hidden;
}

                .stats-pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M40 10L50 30H30L40 10zM40 70L30 50H50L40 70zM10 40L30 30V50L10 40zM70 40L50 50V30L70 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.5;
    pointer-events: none;
}

                .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
}

                .stat-card {
    text-align: center;
    padding: 20px;
}

                .stat-icon {
    width: 60px;
    height: 60px;
    border-radius: var(--radius-full);
    background: rgba(0, 153, 214, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: var(--light-blue);
    margin: 0 auto 15px;
}

                .stat-number {
    display: block;
    color: var(--white);
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 800;
    margin-bottom: 5px;
}

                .stat-label {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
}

                /* ==================== ADVANTAGES SECTION ==================== */
                .advantages-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
}

                .advantage-item {
    display: flex;
    gap: 25px;
    padding: 30px;
    background: var(--light-gray);
    border-radius: var(--radius-xl);
    transition: all var(--transition-normal);
    border: 1px solid var(--light-gray);
}

                .advantage-item:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
    background: var(--white);
}

                .advantage-number {
    font-size: 2.5rem;
    font-weight: 800;
    line-height: 1;
    flex-shrink: 0;
}

                .advantage-number.maroon {
    color: var(--maroon);
}

                .advantage-number.blue {
    color: var(--dark-blue);
}

                .advantage-title {
    color: var(--text-dark);
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 10px;
}

                .advantage-text {
    color: var(--gray);
    font-size: 0.95rem;
    line-height: 1.7;
    margin: 0;
}

                /* ==================== LEADERSHIP SECTION ==================== */
                .team-section {
    padding: 100px 20px;
    background: var(--light-gray);
    position: relative;
}

                .team-grid {
    display: flex;
    justify-content: center;
    margin-top: 50px;
}

                .team-card {
    background: var(--white);
    border-radius: var(--radius-2xl);
    padding: 0;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.05);
    transition: all var(--transition-normal);
    max-width: 900px;
    width: 100%;
    display: grid;
    grid-template-columns: 350px 1fr;
    overflow: hidden;
}

                .team-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.15);
}

                .team-image-wrapper {
    height: 100%;
    position: relative;
}

                .team-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

                .team-content {
    padding: 60px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
}

                .team-role {
    color: var(--maroon);
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
}
                
                .team-role::before {
    content: '';
    display: block;
    width: 30px;
    height: 2px;
    background: var(--maroon);
}

                .team-name {
    color: var(--text-dark);
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 25px;
    line-height: 1.2;
}

                .team-desc {
    color: var(--gray);
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 35px;
}

                .team-social {
    display: flex;
    gap: 15px;
}

                .team-social-link {
    width: 45px;
    height: 45px;
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: all var(--transition-normal);
    border: 1px solid var(--light-gray);
    color: var(--gray);
    font-size: 1.1rem;
}

                .team-social-link:hover {
    background: var(--maroon);
    color: var(--white);
    border-color: var(--maroon);
    transform: translateY(-3px);
}

@media screen and (max-width: 900px) {
                    .team-card {
        grid-template-columns: 1fr;
        max-width: 500px;
    }

                    .team-image-wrapper {
        height: 300px;
    }

                    .team-content {
        padding: 40px 30px;
        text-align: center;
    }

                    .team-role {
        justify-content: center;
    }
                    
                    .team-social {
        justify-content: center;
    }
}

                /* ==================== CTA SECTION ==================== */
                .cta-section {
    padding: 100px 20px;
    background: linear-gradient(135deg, var(--dark-maroon) 0%, var(--maroon) 100%);
    text-align: center;
    position: relative;
    overflow: hidden;
}

                .cta-pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M40 10L50 30H30L40 10zM40 70L30 50H50L40 70zM10 40L30 30V50L10 40zM70 40L50 50V30L70 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.5;
    pointer-events: none;
}

                .cta-content {
    max-width: 700px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
}

                .cta-icon {
    width: 80px;
    height: 80px;
    border-radius: var(--radius-full);
    background: rgba(0, 153, 214, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 25px;
    font-size: 2rem;
    color: var(--light-blue);
}

                .cta-title {
    color: var(--white);
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 800;
    margin-bottom: 15px;
}

                .cta-text {
    color: rgba(255, 255, 255, 0.85);
    font-size: clamp(1rem, 2vw, 1.15rem);
    margin-bottom: 20px;
    line-height: 1.6;
}

                .cta-tagline {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 35px;
    color: var(--light-blue);
    font-size: 1.1rem;
    font-weight: 600;
    font-style: italic;
}

                .cta-btns {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
}

                .primary-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 32px;
    background: var(--light-blue);
    color: var(--white);
    border-radius: var(--radius-md);
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    box-shadow: 0 4px 20px rgba(0, 153, 214, 0.4);
    transition: all var(--transition-normal);
}

                .primary-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(0, 153, 214, 0.5);
}

                .secondary-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 32px;
    background: transparent;
    color: var(--white);
    border-radius: var(--radius-md);
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    transition: all var(--transition-normal);
}

                .secondary-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
}

/* ==================== ANIMATIONS ==================== */
@keyframes float1 {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
}

@keyframes float2 {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

@keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.1); opacity: 0.8; }
}

/* ==================== TABLET ==================== */
@media screen and (max-width: 1024px) {
                    .hero-container {
        grid-template-columns: 1fr;
        text-align: center;
    }

                    .hero-content {
        max-width: 100%;
    }

                    .hero-images {
        display: none;
    }

                    .tagline {
        justify-content: center;
    }

                    .mission-grid,
                    .vision-grid {
        grid-template-columns: 1fr;
        gap: 40px;
    }

                    .values-grid,
                    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }

                    .advantages-grid {
        grid-template-columns: 1fr;
    }

                    .team-grid {
        grid-template-columns: repeat(2, 1fr);
    }

                    .timeline {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* ==================== MOBILE ==================== */
@media screen and (max-width: 768px) {
                    .about-hero {
        padding: 90px 0 50px;
    }

                    .section,
                    .section-gray,
                    .journey-section,
                    .values-section,
                    .stats-section,
                    .team-section,
                    .cta-section {
        padding: 60px 15px;
    }

                    .hero-stats {
        flex-direction: column;
        gap: 15px;
        padding: 20px;
    }

                    .hero-stat-divider {
        display: none;
    }

                    .values-grid,
                    .stats-grid,
                    .team-grid,
                    .timeline {
        grid-template-columns: 1fr;
    }

                    .mission-stats {
        justify-content: center;
    }

                    .advantage-item {
        flex-direction: column;
        text-align: center;
        gap: 15px;
    }

                    .cta-btns {
        flex-direction: column;
        width: 100%;
    }

                    .primary-btn,
                    .secondary-btn {
        width: 100%;
        justify-content: center;
    }

                    .image-accent {
        display: none;
    }
}

/* ==================== SMALL MOBILE ==================== */
@media screen and (max-width: 480px) {
                    .hero-badge,
                    .section-badge {
        font-size: 0.8rem;
        padding: 8px 14px;
    }

                    .mission-stats {
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }

                    .team-card {
        padding: 25px 20px;
    }

                    .team-image-wrapper {
        width: 100px;
        height: 100px;
    }
}

/* ==================== TOUCH DEVICES ==================== */
@media(hover: none) and (pointer: coarse) {
                    .timeline-item: hover,
                    .value-card: hover,
                    .advantage-item: hover,
                    .team-card: hover,
                    .primary-btn: hover,
                    .secondary-btn:hover {
        transform: none;
    }

                    .timeline-item: active,
                    .value-card: active,
                    .advantage-item: active,
                    .team-card: active,
                    .primary-btn: active,
                    .secondary-btn:active {
        transform: scale(0.98);
        opacity: 0.9;
    }

                    .primary-btn,
                    .secondary-btn {
        min-height: 48px;
    }
}

/* ==================== REDUCED MOTION ==================== */
@media(prefers-reduced-motion: reduce) {
                    *,
                    *:: before,
                    *::after {
        animation-duration: 0.01ms!important;
        animation-iteration-count: 1!important;
        transition-duration: 0.01ms!important;
    }
}

                /* ==================== FOCUS STATES ==================== */
                .primary-btn: focus,
                .secondary-btn: focus,
                .team-social-link:focus {
    outline: 3px solid var(--light-blue);
    outline-offset: 2px;
}
`}</style>

            <div className="about-page">
                <Navbar />

                {/* Hero Section */}
                <section className="about-hero">
                    <div className="hero-pattern"></div>

                    <div className="hero-container">
                        <div className="hero-content">
                            <span className="hero-badge">
                                <i className="fa-solid fa-info-circle"></i>
                                About Us
                            </span>
                            <h1 className="hero-title">
                                Empowering <span className="highlight">Education</span> for Everyone
                            </h1>
                            <p className="hero-subtitle">
                                We're on a mission to make quality education accessible to everyone,
                                regardless of their location or circumstances. Join thousands of students who have transformed their
                                careers with Edufolio.
                            </p>
                            <div className="tagline">
                                <span>learn.</span>
                                <span>grow.</span>
                                <span>succeed.</span>
                            </div>

                            <div className="hero-stats">
                                <div className="hero-stat">
                                    <span className="hero-stat-number">5+</span>
                                    <span className="hero-stat-label">Years</span>
                                </div>
                                <div className="hero-stat-divider"></div>
                                <div className="hero-stat">
                                    <span className="hero-stat-number">15K+</span>
                                    <span className="hero-stat-label">Students</span>
                                </div>
                                <div className="hero-stat-divider"></div>
                                <div className="hero-stat">
                                    <span className="hero-stat-number">50+</span>
                                    <span className="hero-stat-label">Partners</span>
                                </div>
                            </div>
                        </div>

                        <div className="hero-images">
                            <div className="main-image-container">
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=450&fit=crop&auto=format&q=80"
                                    alt="Team collaboration"
                                    className="main-image"
                                />
                                <div className="main-image-overlay"></div>
                            </div>

                            <div className="floating-image floating-image-1">
                                <img
                                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=160&h=120&fit=crop&auto=format&q=80"
                                    alt="Students learning"
                                    className="floating-img"
                                />
                            </div>

                            <div className="floating-image floating-image-2">
                                <img
                                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=150&h=110&fit=crop&auto=format&q=80"
                                    alt="Success celebration"
                                    className="floating-img"
                                />
                            </div>

                            <div className="floating-image floating-image-3">
                                <img
                                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=130&h=95&fit=crop&auto=format&q=80"
                                    alt="Online meeting"
                                    className="floating-img"
                                />
                            </div>

                            <div className="floating-card floating-exp-card">
                                <div className="floating-card-icon gold">
                                    <i className="fa-solid fa-trophy"></i>
                                </div>
                                <div className="floating-card-content">
                                    <span className="floating-card-number">5+ Years</span>
                                    <span className="floating-card-label">Experience</span>
                                </div>
                            </div>

                            <div className="floating-card floating-trust-card">
                                <div className="floating-card-icon maroon">
                                    <i className="fa-solid fa-heart"></i>
                                </div>
                                <div className="floating-card-content">
                                    <span className="floating-card-number">95%</span>
                                    <span className="floating-card-label">Happy Students</span>
                                </div>
                            </div>

                            <div className="decor-circle decor-circle-1"></div>
                            <div className="decor-circle decor-circle-2"></div>
                            <div className="decor-dots"></div>
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="section">
                    <div className="container">
                        <div className="mission-grid">
                            <div className="mission-content">
                                <span className="section-badge maroon">
                                    <i className="fa-solid fa-bullseye"></i> Our Mission
                                </span>
                                <h2 className="section-title">Making Quality Education Accessible</h2>
                                <p className="section-text">
                                    At Edufolio, we believe that quality education should be accessible to everyone,
                                    regardless of their location or circumstances. Our platform connects aspiring
                                    learners with India's top universities offering online and distance education programs.
                                </p>
                                <p className="section-text">
                                    We are committed to providing comprehensive information about various programs,
                                    helping students make informed decisions about their educational journey. Our team
                                    of expert counselors is always ready to guide you towards the right path.
                                </p>
                                <div className="mission-stats">
                                    <div className="mission-stat">
                                        <span className="mission-stat-number maroon">5+</span>
                                        <span className="mission-stat-label">Years of Experience</span>
                                    </div>
                                    <div className="mission-stat">
                                        <span className="mission-stat-number blue">10K+</span>
                                        <span className="mission-stat-label">Students Guided</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mission-image">
                                <img
                                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&h=400&fit=crop&auto=format&q=80"
                                    alt="Students learning"
                                />
                                <div className="image-accent"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Vision Section */}
                <section className="section-gray">
                    <div className="container">
                        <div className="vision-grid">
                            <div className="vision-image">
                                <img
                                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=400&fit=crop&auto=format&q=80"
                                    alt="Team discussion"
                                />
                            </div>
                            <div className="vision-content">
                                <span className="section-badge blue">
                                    <i className="fa-solid fa-eye"></i> Our Vision
                                </span>
                                <h2 className="section-title">Transforming Education Landscape</h2>
                                <p className="section-text">
                                    We envision a future where every individual has the opportunity to pursue
                                    higher education without barriers. Through technology and partnerships with
                                    prestigious institutions, we aim to democratize learning.
                                </p>
                                <div className="vision-points">
                                    <div className="vision-point">
                                        <div className="vision-point-icon blue">
                                            <i className="fa-solid fa-check"></i>
                                        </div>
                                        <span>Bridge the gap between aspirations and opportunities</span>
                                    </div>
                                    <div className="vision-point">
                                        <div className="vision-point-icon maroon">
                                            <i className="fa-solid fa-check"></i>
                                        </div>
                                        <span>Make quality education affordable and accessible</span>
                                    </div>
                                    <div className="vision-point">
                                        <div className="vision-point-icon blue">
                                            <i className="fa-solid fa-check"></i>
                                        </div>
                                        <span>Support students throughout their learning journey</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Journey/Timeline Section */}
                <section className="journey-section">
                    <div className="journey-pattern"></div>
                    <div className="container">
                        <div className="section-header-center">
                            <span className="section-badge light">
                                <i className="fa-solid fa-road"></i> Our Journey
                            </span>
                            <h2 className="section-title light" style={{ textAlign: 'center' }}>Milestones We've Achieved</h2>
                            <p className="section-subtitle light center">
                                From a small startup to India's trusted education platform
                            </p>
                        </div>

                        <div className="timeline">
                            {milestones.map((milestone, index) => (
                                <div key={index} className="timeline-item">
                                    <div className="timeline-year">{milestone.year}</div>
                                    <h4 className="timeline-title">{milestone.title}</h4>
                                    <p className="timeline-desc">{milestone.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="values-section">
                    <div className="values-pattern"></div>
                    <div className="container">
                        <div className="section-header-center">
                            <span className="section-badge light">
                                <i className="fa-solid fa-heart"></i> Our Values
                            </span>
                            <h2 className="section-title light" style={{ textAlign: 'center' }}>What We Stand For</h2>
                            <p className="section-subtitle light center">
                                Our core values guide everything we do at Edufolio
                            </p>
                        </div>

                        <div className="values-grid">
                            <div className="value-card">
                                <div className="value-icon blue">
                                    <i className="fa-solid fa-graduation-cap"></i>
                                </div>
                                <h3 className="value-title">Quality Education</h3>
                                <p className="value-text">
                                    We partner only with accredited universities that maintain high educational standards and deliver real value.
                                </p>
                            </div>
                            <div className="value-card">
                                <div className="value-icon white">
                                    <i className="fa-solid fa-handshake"></i>
                                </div>
                                <h3 className="value-title">Trust & Transparency</h3>
                                <p className="value-text">
                                    Complete transparency in fees, curriculum, and university information. No hidden charges, ever.
                                </p>
                            </div>
                            <div className="value-card">
                                <div className="value-icon white">
                                    <i className="fa-solid fa-users"></i>
                                </div>
                                <h3 className="value-title">Student First</h3>
                                <p className="value-text">
                                    Every decision we make is guided by what's best for our students and their career aspirations.
                                </p>
                            </div>
                            <div className="value-card">
                                <div className="value-icon blue">
                                    <i className="fa-solid fa-headset"></i>
                                </div>
                                <h3 className="value-title">Continuous Support</h3>
                                <p className="value-text">
                                    From enrollment to graduation, we're here to support your journey with 24/7 assistance.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="stats-section">
                    <div className="stats-pattern"></div>
                    <div className="container">
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <i className="fa-solid fa-building-columns"></i>
                                </div>
                                <span className="stat-number">50+</span>
                                <span className="stat-label">Partner Universities</span>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <i className="fa-solid fa-graduation-cap"></i>
                                </div>
                                <span className="stat-number">200+</span>
                                <span className="stat-label">Programs Available</span>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <i className="fa-solid fa-users"></i>
                                </div>
                                <span className="stat-number">15,000+</span>
                                <span className="stat-label">Students Enrolled</span>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <i className="fa-solid fa-star"></i>
                                </div>
                                <span className="stat-number">95%</span>
                                <span className="stat-label">Student Satisfaction</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="section">
                    <div className="container">
                        <div className="section-header-center">
                            <span className="section-badge blue">
                                <i className="fa-solid fa-trophy"></i> Why Choose Us
                            </span>
                            <h2 className="section-title center">The Edufolio Advantage</h2>
                            <p className="section-subtitle center">
                                What makes us the preferred choice for thousands of students
                            </p>
                        </div>

                        <div className="advantages-grid">
                            <div className="advantage-item">
                                <div className="advantage-number maroon">01</div>
                                <div className="advantage-content">
                                    <h3 className="advantage-title">Verified Universities</h3>
                                    <p className="advantage-text">
                                        All partner universities are UGC-DEB approved and NAAC accredited, ensuring your degree is recognized nationwide.
                                    </p>
                                </div>
                            </div>
                            <div className="advantage-item">
                                <div className="advantage-number blue">02</div>
                                <div className="advantage-content">
                                    <h3 className="advantage-title">Expert Counseling</h3>
                                    <p className="advantage-text">
                                        Free career counseling from experienced education consultants who understand your needs and aspirations.
                                    </p>
                                </div>
                            </div>
                            <div className="advantage-item">
                                <div className="advantage-number blue">03</div>
                                <div className="advantage-content">
                                    <h3 className="advantage-title">Best Price Guarantee</h3>
                                    <p className="advantage-text">
                                        We ensure you get the best possible fees with available scholarships and flexible EMI options.
                                    </p>
                                </div>
                            </div>
                            <div className="advantage-item">
                                <div className="advantage-number maroon">04</div>
                                <div className="advantage-content">
                                    <h3 className="advantage-title">End-to-End Support</h3>
                                    <p className="advantage-text">
                                        From application to graduation, we support you at every step with dedicated student success managers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="team-section">
                    <div className="container">
                        <div className="section-header-center">
                            <span className="section-badge maroon">
                                <i className="fa-solid fa-user-group"></i> Leadership
                            </span>
                            <h2 className="section-title center">Meet Our Director</h2>
                            <p className="section-subtitle center">
                                Visionary leadership committed to your educational success
                            </p>
                        </div>

                        <div className="team-grid">
                            {team.map((member, index) => (
                                <div key={index} className="team-card">
                                    <div className="team-image-wrapper">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="team-image"
                                        />
                                    </div>
                                    <div className="team-content">
                                        <div className="team-role">Director & CEO</div>
                                        <h3 className="team-name">{member.name}</h3>
                                        <p className="team-desc">{member.description}</p>
                                        <div className="team-social">
                                            <a href="#" className="team-social-link">
                                                <i className="fa-brands fa-linkedin-in"></i>
                                            </a>
                                            <a href="#" className="team-social-link">
                                                <i className="fa-brands fa-twitter"></i>
                                            </a>
                                            <a href="#" className="team-social-link">
                                                <i className="fa-regular fa-envelope"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="cta-section">
                    <div className="cta-pattern"></div>
                    <div className="container">
                        <div className="cta-content">
                            <div className="cta-icon">
                                <i className="fa-solid fa-rocket"></i>
                            </div>
                            <h2 className="cta-title">Ready to Start Your Journey?</h2>
                            <p className="cta-text">
                                Take the first step towards your dream career. Our expert counselors are here to help you
                                choose the right program and university.
                            </p>
                            <div className="cta-tagline">
                                <span>learn.</span>
                                <span>grow.</span>
                                <span>succeed.</span>
                            </div>
                            <div className="cta-btns">
                                <Link href="/programs" className="primary-btn">
                                    <i className="fa-solid fa-graduation-cap"></i>
                                    Explore Programs
                                </Link>
                                <Link href="/contact" className="secondary-btn">
                                    <i className="fa-solid fa-phone"></i>
                                    Talk to Counselor
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div >
        </>
    );
};

export default About;
