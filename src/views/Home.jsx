"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import API_BASE from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CourseFinder from '../components/CourseFinder';
import EnrollModal from '../components/EnrollModal';

const Home = () => {
    const [universities, setUniversities] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showEnrollModal, setShowEnrollModal] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [googleReviews, setGoogleReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [uniRes, progRes, reviewsRes] = await Promise.all([
                axios.get(`${API_BASE}/universities?featured=true`),
                axios.get(`${API_BASE}/programs?featured=true`),
                axios.get(`${API_BASE}/google-reviews`)
            ]);
            setUniversities(uniRes.data.slice(0, 4));
            setPrograms(progRes.data.slice(0, 6));

            if (reviewsRes.data.success && reviewsRes.data.reviews.length > 0) {
                setGoogleReviews(reviewsRes.data.reviews.slice(0, 3)); // Show top 3
            }
            setLoadingReviews(false);
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleEnrollClick = (program) => {
        setSelectedProgram(program);
        setShowEnrollModal(true);
    };

    const stats = [
        { number: '50+', label: 'Partner Universities', icon: 'fa-building-columns' },
        { number: '200+', label: 'Programs', icon: 'fa-graduation-cap' },
        { number: '15000+', label: 'Students Enrolled', icon: 'fa-users' },
        { number: '95%', label: 'Placement Rate', icon: 'fa-briefcase' }
    ];

    const features = [
        {
            icon: 'fa-certificate',
            title: 'UGC Approved',
            description: 'All programs are approved by UGC-DEB and recognized nationwide'
        },
        {
            icon: 'fa-laptop',
            title: '100% Online',
            description: 'Study from anywhere with flexible online learning'
        },
        {
            icon: 'fa-wallet',
            title: 'Affordable Fees',
            description: 'Quality education at competitive prices with EMI options'
        },
        {
            icon: 'fa-headset',
            title: '24/7 Support',
            description: 'Dedicated student support throughout your journey'
        }
    ];

    const testimonials = googleReviews.length > 0 ? googleReviews.map(review => ({
        name: review.author_name,
        program: 'Student', // Google reviews don't have program info
        university: 'Edufolio',
        image: review.profile_photo_url,
        text: review.text,
        rating: review.rating,
        time: review.relative_time_description
    })) : [
        {
            name: 'Rahul Sharma',
            program: 'MBA - Finance',
            university: 'Amity University',
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
            text: 'The online MBA program helped me advance my career while working full-time. The flexibility and quality of education exceeded my expectations.',
            rating: 5
        },
        {
            name: 'Priya Patel',
            program: 'MCA',
            university: 'LPU Online',
            image: 'https://randomuser.me/api/portraits/women/44.jpg',
            text: 'Excellent curriculum and supportive faculty. I landed my dream job at a top tech company right after completing my degree.',
            rating: 5
        },
        {
            name: 'Amit Kumar',
            program: 'BBA',
            university: 'Manipal University',
            image: 'https://randomuser.me/api/portraits/men/67.jpg',
            text: 'The practical approach to learning and industry-relevant projects made all the difference. Highly recommend Edufolio!',
            rating: 5
        }
    ];

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <i key={i} className={`fa-solid fa-star ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} style={{ color: i < rating ? '#F59E0B' : '#D1D5DB' }}></i>
        ));
    };

    const whyFeatures = [
        {
            title: 'Expert Counseling',
            description: 'Free guidance from education experts'
        },
        {
            title: 'Easy Application',
            description: 'Simple enrollment process with full support'
        },
        {
            title: 'Scholarship Support',
            description: 'Help with scholarships and financial aid'
        }
    ];

    return (
        <>
            <style>{`
                /* ==================== HOME PAGE STYLES ==================== */
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
                    --shadow-xl: 0 25px 60px rgba(0, 0, 0, 0.2);
                    --radius-sm: 8px;
                    --radius-md: 12px;
                    --radius-lg: 16px;
                    --radius-xl: 20px;
                    --radius-2xl: 24px;
                    --radius-full: 50%;
                    --transition-fast: 0.2s ease;
                    --transition-normal: 0.3s ease;
                    --transition-slow: 0.5s ease;
                    --container-max: 1200px;
                    --container-padding: 20px;
                }

                /* ==================== BASE STYLES ==================== */
                .home-page {
                    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    overflow-x: hidden;
                    color: var(--text-dark);
                    line-height: 1.6;
                }

                .container {
                    max-width: var(--container-max);
                    margin: 0 auto;
                    padding: 0 var(--container-padding);
                    position: relative;
                    z-index: 1;
                }

                /* ==================== HERO SECTION ==================== */
                .hero {
                    background: linear-gradient(135deg, var(--dark-maroon) 0%, var(--maroon) 100%);
                    min-height: 100vh;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }

                .hero-pattern,
                .section-pattern {
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
                    padding: 140px var(--container-padding) 60px;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 60px;
                    align-items: center;
                    position: relative;
                    z-index: 2;
                    flex: 1;
                }

                .hero-content {
                    max-width: 600px;
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
                    -webkit-backdrop-filter: blur(10px);
                }

                .hero-title {
                    color: var(--white);
                    font-size: clamp(2rem, 5vw, 3.2rem);
                    font-weight: 800;
                    line-height: 1.2;
                    margin-bottom: 20px;
                }

                .hero-title .highlight {
                    color: var(--light-blue);
                }

                .hero-subtitle {
                    color: rgba(255, 255, 255, 0.85);
                    font-size: clamp(1rem, 2vw, 1.15rem);
                    line-height: 1.7;
                    margin-bottom: 20px;
                }

                .tagline {
                    display: flex;
                    gap: 15px;
                    margin-bottom: 30px;
                    flex-wrap: wrap;
                }

                .tagline-item {
                    color: var(--light-blue);
                    font-size: 1.1rem;
                    font-weight: 600;
                    font-style: italic;
                }

                .hero-buttons {
                    display: flex;
                    gap: 15px;
                    margin-bottom: 35px;
                    flex-wrap: wrap;
                }

                .primary-btn,
                .secondary-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    padding: 16px 32px;
                    border-radius: var(--radius-md);
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 1rem;
                    transition: all var(--transition-normal);
                    cursor: pointer;
                    border: none;
                }

                .primary-btn {
                    background: var(--light-blue);
                    color: var(--white);
                    box-shadow: 0 4px 20px rgba(0, 153, 214, 0.4);
                }

                .primary-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 6px 25px rgba(0, 153, 214, 0.5);
                }

                .secondary-btn {
                    background: rgba(255, 255, 255, 0.1);
                    color: var(--white);
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                }

                .secondary-btn:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: translateY(-3px);
                }

                .trust-badges {
                    display: flex;
                    gap: 20px;
                    flex-wrap: wrap;
                }

                .trust-badge {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: rgba(255, 255, 255, 0.8);
                    font-size: 0.85rem;
                    font-weight: 500;
                }

                .trust-badge i {
                    color: var(--light-blue);
                }

                /* ==================== HERO IMAGES ==================== */
                .hero-images {
                    position: relative;
                    height: 550px;
                }

                .main-image-container {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 380px;
                    height: 480px;
                    border-radius: 30px;
                    overflow: hidden;
                    box-shadow: var(--shadow-xl);
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
                    height: 150px;
                    background: linear-gradient(to top, rgba(107, 29, 58, 0.8), transparent);
                }

                .floating-image {
                    position: absolute;
                    border-radius: var(--radius-lg);
                    overflow: hidden;
                    box-shadow: var(--shadow-lg);
                    border: 4px solid rgba(255, 255, 255, 0.3);
                }

                .floating-image-1 {
                    top: 0;
                    right: 0;
                    width: 180px;
                    height: 120px;
                    animation: float1 6s ease-in-out infinite;
                }

                .floating-image-2 {
                    bottom: 30px;
                    left: 0;
                    width: 160px;
                    height: 110px;
                    animation: float2 6s ease-in-out infinite;
                }

                .floating-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .floating-stats-card,
                .floating-success-card {
                    position: absolute;
                    background: var(--white);
                    padding: 18px 22px;
                    border-radius: var(--radius-lg);
                    box-shadow: var(--shadow-lg);
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }

                .floating-stats-card {
                    top: 60px;
                    left: -20px;
                    animation: float1 5s ease-in-out infinite;
                }

                .floating-success-card {
                    bottom: 80px;
                    right: -10px;
                    animation: float2 5s ease-in-out infinite;
                }

                .floating-card-icon {
                    width: 50px;
                    height: 50px;
                    border-radius: var(--radius-md);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.3rem;
                }

                .floating-card-icon.blue {
                    background: rgba(0, 153, 214, 0.2);
                    color: var(--dark-blue);
                }

                .floating-card-icon.maroon {
                    background: rgba(139, 35, 70, 0.2);
                    color: var(--maroon);
                }

                .floating-card-content {
                    display: flex;
                    flex-direction: column;
                }

                .floating-card-number {
                    font-size: 1.4rem;
                    font-weight: 800;
                }

                .floating-card-number.blue {
                    color: var(--dark-blue);
                }

                .floating-card-number.maroon {
                    color: var(--maroon);
                }

                .floating-card-label {
                    color: var(--gray);
                    font-size: 0.8rem;
                }

                .decor-circle {
                    position: absolute;
                    border-radius: var(--radius-full);
                }

                .decor-circle-1 {
                    top: 20%;
                    right: 15%;
                    width: 80px;
                    height: 80px;
                    border: 3px solid rgba(0, 153, 214, 0.3);
                    animation: pulse 3s ease-in-out infinite;
                }

                .decor-circle-2 {
                    bottom: 25%;
                    left: 10%;
                    width: 60px;
                    height: 60px;
                    background: rgba(0, 153, 214, 0.1);
                    animation: pulse 4s ease-in-out infinite;
                }

                .decor-dots {
                    position: absolute;
                    top: 40%;
                    right: 5%;
                    width: 60px;
                    height: 60px;
                    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.3) 2px, transparent 2px);
                    background-size: 12px 12px;
                }

                /* ==================== HERO STATS ==================== */
                .hero-stats {
                    background: rgba(0, 0, 0, 0.2);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    padding: 30px 0;
                    position: relative;
                    z-index: 2;
                }

                .stats-container {
                    max-width: var(--container-max);
                    margin: 0 auto;
                    padding: 0 var(--container-padding);
                    display: flex;
                    justify-content: space-around;
                    flex-wrap: wrap;
                    gap: 30px;
                }

                .stat-item {
                    text-align: center;
                    flex: 1;
                    min-width: 120px;
                }

                .stat-icon-wrapper {
                    width: 50px;
                    height: 50px;
                    border-radius: var(--radius-md);
                    background: rgba(0, 153, 214, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 10px;
                    color: var(--light-blue);
                    font-size: 1.3rem;
                }

                .stat-number {
                    display: block;
                    color: var(--white);
                    font-size: clamp(1.5rem, 3vw, 2rem);
                    font-weight: 800;
                    margin-bottom: 5px;
                }

                .stat-label {
                    color: rgba(255, 255, 255, 0.7);
                    font-size: clamp(0.75rem, 1.5vw, 0.9rem);
                }

                /* ==================== FEATURES SECTION ==================== */
                .features-section {
                    padding: 80px var(--container-padding);
                    background: var(--white);
                }

                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 30px;
                    max-width: var(--container-max);
                    margin: 0 auto;
                }

                .feature-card {
                    text-align: center;
                    padding: 30px 20px;
                    border-radius: var(--radius-lg);
                    transition: all var(--transition-normal);
                    border: 1px solid var(--light-gray);
                    background: var(--white);
                }

                .feature-card:hover {
                    transform: translateY(-5px);
                    box-shadow: var(--shadow-md);
                }

                .feature-icon {
                    width: 70px;
                    height: 70px;
                    border-radius: var(--radius-xl);
                    background: linear-gradient(135deg, rgba(139, 35, 70, 0.15), rgba(196, 86, 122, 0.15));
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                    font-size: 1.5rem;
                    color: var(--maroon);
                }

                .feature-title {
                    color: var(--text-dark);
                    font-size: 1.1rem;
                    font-weight: 700;
                    margin-bottom: 10px;
                }

                .feature-desc {
                    color: var(--gray);
                    font-size: 0.95rem;
                    line-height: 1.6;
                    margin: 0;
                }

                /* ==================== SECTION HEADER ==================== */
                .section-header {
                    text-align: center;
                    margin-bottom: 50px;
                }

                .section-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(139, 35, 70, 0.15);
                    color: var(--maroon);
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    margin-bottom: 15px;
                }

                .section-badge.light {
                    background: rgba(0, 153, 214, 0.2);
                    color: var(--light-blue);
                }

                .section-badge.blue {
                    background: rgba(0, 82, 157, 0.15);
                    color: var(--dark-blue);
                }

                .section-title {
                    color: var(--text-dark);
                    font-size: clamp(1.5rem, 4vw, 2.2rem);
                    font-weight: 800;
                    margin-bottom: 10px;
                }

                .section-header.light .section-title,
                .section-title.light {
                    color: var(--white);
                }

                .section-subtitle {
                    color: var(--gray);
                    font-size: clamp(0.9rem, 2vw, 1.05rem);
                    margin: 0;
                }

                .section-header.light .section-subtitle,
                .section-subtitle.light {
                    color: rgba(255, 255, 255, 0.7);
                }

                /* ==================== PROGRAMS SECTION ==================== */
                .programs-section {
                    padding: 80px var(--container-padding);
                    background: var(--light-gray);
                }

                .programs-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 25px;
                }

                .program-card {
                    background: var(--white);
                    border-radius: var(--radius-xl);
                    padding: 25px;
                    box-shadow: var(--shadow-sm);
                    position: relative;
                    transition: all var(--transition-normal);
                    border: 1px solid var(--light-gray);
                }

                .program-card:hover {
                    transform: translateY(-5px);
                    box-shadow: var(--shadow-lg);
                }

                .featured-badge {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: linear-gradient(135deg, var(--maroon) 0%, var(--pink) 100%);
                    color: var(--white);
                    padding: 5px 12px;
                    border-radius: 15px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .program-header {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 15px;
                    flex-wrap: wrap;
                }

                .category-badge,
                .mode-badge {
                    padding: 5px 12px;
                    border-radius: var(--radius-sm);
                    font-size: 0.8rem;
                    font-weight: 600;
                }

                .category-badge {
                    background: rgba(139, 35, 70, 0.15);
                    color: var(--maroon);
                }

                .mode-badge {
                    background: rgba(0, 82, 157, 0.15);
                    color: var(--dark-blue);
                    font-weight: 500;
                }

                .program-title {
                    color: var(--text-dark);
                    font-size: 1.15rem;
                    font-weight: 700;
                    margin-bottom: 10px;
                    line-height: 1.3;
                }

                .program-university {
                    color: var(--gray);
                    font-size: 0.9rem;
                    margin-bottom: 15px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .program-meta {
                    display: flex;
                    gap: 15px;
                    margin-bottom: 15px;
                    flex-wrap: wrap;
                }

                .meta-item {
                    color: var(--gray);
                    font-size: 0.85rem;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .program-fee {
                    background: var(--light-gray);
                    padding: 15px;
                    border-radius: var(--radius-md);
                    margin-bottom: 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 10px;
                }

                .fee-label {
                    display: block;
                    color: var(--gray);
                    font-size: 0.8rem;
                    margin-bottom: 3px;
                }

                .fee-amount {
                    color: var(--maroon);
                    font-size: 1.3rem;
                    font-weight: 700;
                }

                .emi-badge {
                    background: #DCFCE7;
                    color: #15803D;
                    padding: 6px 12px;
                    border-radius: var(--radius-sm);
                    font-size: 0.75rem;
                    font-weight: 600;
                }

                .program-actions {
                    display: flex;
                    gap: 10px;
                }

                .view-details-btn,
                .enroll-now-btn {
                    flex: 1;
                    padding: 12px;
                    border-radius: var(--radius-sm);
                    font-weight: 600;
                    font-size: 0.9rem;
                    text-align: center;
                    transition: all var(--transition-normal);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    cursor: pointer;
                }

                .view-details-btn {
                    background: var(--light-gray);
                    color: var(--text-dark);
                    text-decoration: none;
                    border: none;
                }

                .view-details-btn:hover {
                    background: #e2e8f0;
                }

                .enroll-now-btn {
                    background: linear-gradient(135deg, var(--maroon) 0%, var(--pink) 100%);
                    color: var(--white);
                    border: none;
                    box-shadow: 0 4px 15px rgba(139, 35, 70, 0.3);
                }

                .enroll-now-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(139, 35, 70, 0.4);
                }

                /* ==================== VIEW ALL BUTTON ==================== */
                .view-all-container {
                    text-align: center;
                    margin-top: 50px;
                }

                .view-all-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 16px 32px;
                    background: var(--dark-blue);
                    color: var(--white);
                    border-radius: var(--radius-md);
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 1rem;
                    transition: all var(--transition-normal);
                }

                .view-all-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 6px 20px rgba(0, 82, 157, 0.4);
                }

                .view-all-btn.light {
                    background: var(--white);
                    color: var(--dark-blue);
                }

                .view-all-btn.light:hover {
                    box-shadow: 0 6px 20px rgba(255, 255, 255, 0.3);
                }

                /* ==================== LOADING & NO DATA ==================== */
                .loading {
                    text-align: center;
                    padding: 60px 20px;
                    color: var(--gray);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 15px;
                }

                .loading.light {
                    color: rgba(255, 255, 255, 0.7);
                }

                .spinner {
                    width: 50px;
                    height: 50px;
                    border: 4px solid var(--light-gray);
                    border-top-color: var(--maroon);
                    border-radius: var(--radius-full);
                    animation: spin 1s linear infinite;
                }

                .spinner.light {
                    border-color: rgba(255, 255, 255, 0.2);
                    border-top-color: var(--light-blue);
                }

                .no-data {
                    text-align: center;
                    padding: 60px 20px;
                    color: var(--gray);
                }

                .no-data.light {
                    color: rgba(255, 255, 255, 0.6);
                }

                .no-data i {
                    font-size: 3rem;
                    margin-bottom: 15px;
                    display: block;
                }

                /* ==================== UNIVERSITIES SECTION ==================== */
                .universities-section {
                    padding: 80px var(--container-padding);
                    background: linear-gradient(135deg, var(--dark-blue) 0%, #003D7A 100%);
                    position: relative;
                    overflow: hidden;
                }

                .universities-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 25px;
                }

                .university-card {
                    background: var(--white);
                    border-radius: var(--radius-xl);
                    padding: 30px 20px;
                    text-align: center;
                    text-decoration: none;
                    position: relative;
                    transition: all var(--transition-normal);
                    display: block;
                }

                .university-card:hover {
                    transform: translateY(-5px);
                    box-shadow: var(--shadow-lg);
                }

                .university-badge {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: rgba(0, 153, 214, 0.2);
                    color: var(--dark-blue);
                    padding: 4px 10px;
                    border-radius: 10px;
                    font-size: 0.7rem;
                    font-weight: 600;
                }

                .university-logo {
                    width: 90px;
                    height: 90px;
                    border-radius: var(--radius-xl);
                    background: var(--light-gray);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                    box-shadow: var(--shadow-sm);
                }

                .logo-img {
                    width: 70px;
                    height: 70px;
                    object-fit: contain;
                }

                .university-name {
                    color: var(--text-dark);
                    font-size: 1.05rem;
                    font-weight: 700;
                    margin-bottom: 8px;
                }

                .university-location {
                    color: var(--gray);
                    font-size: 0.85rem;
                    margin-bottom: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                }

                .university-rating {
                    margin-bottom: 15px;
                }

                .rating-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    background: #FEF3C7;
                    color: #D97706;
                    padding: 5px 12px;
                    border-radius: var(--radius-sm);
                    font-size: 0.8rem;
                    font-weight: 600;
                }

                .university-cta {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    color: var(--dark-blue);
                    font-size: 0.9rem;
                    font-weight: 600;
                }

                /* ==================== WHY SECTION ==================== */
                .why-section {
                    padding: 80px var(--container-padding);
                    background: var(--light-gray);
                }

                .why-content {
                    display: grid;
                    grid-template-columns: 1fr 400px;
                    gap: 60px;
                    align-items: center;
                    max-width: var(--container-max);
                    margin: 0 auto;
                }

                .why-title {
                    color: var(--text-dark);
                    font-size: clamp(1.5rem, 4vw, 2rem);
                    font-weight: 800;
                    margin-bottom: 20px;
                }

                .why-desc {
                    color: var(--gray);
                    font-size: 1.05rem;
                    line-height: 1.7;
                    margin-bottom: 35px;
                }

                .why-features {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .why-feature {
                    display: flex;
                    gap: 15px;
                }

                .why-feature-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: var(--radius-sm);
                    background: rgba(0, 153, 214, 0.2);
                    color: var(--dark-blue);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .why-feature-title {
                    color: var(--text-dark);
                    font-size: 1rem;
                    font-weight: 600;
                    margin-bottom: 5px;
                }

                .why-feature-desc {
                    color: var(--gray);
                    font-size: 0.9rem;
                    margin: 0;
                }

                .why-card {
                    background: linear-gradient(135deg, var(--dark-blue) 0%, #003D7A 100%);
                    border-radius: var(--radius-2xl);
                    padding: 40px 30px;
                    text-align: center;
                }

                .why-card-icon {
                    width: 70px;
                    height: 70px;
                    border-radius: var(--radius-full);
                    background: rgba(0, 153, 214, 0.2);
                    color: var(--light-blue);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                    font-size: 1.5rem;
                }

                .why-card-title {
                    color: var(--white);
                    font-size: 1.3rem;
                    font-weight: 700;
                    margin-bottom: 10px;
                }

                .why-card-desc {
                    color: rgba(255, 255, 255, 0.8);
                    font-size: 0.95rem;
                    margin-bottom: 25px;
                }

                .why-card-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 14px 25px;
                    background: var(--light-blue);
                    color: var(--white);
                    border-radius: var(--radius-md);
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 0.95rem;
                    transition: all var(--transition-normal);
                }

                .why-card-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(0, 153, 214, 0.4);
                }

                /* ==================== TESTIMONIALS SECTION ==================== */
                .testimonials-section {
                    padding: 80px var(--container-padding);
                    background: var(--white);
                }

                .testimonials-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 25px;
                }

                .testimonial-card {
                    background: var(--light-gray);
                    border-radius: var(--radius-xl);
                    padding: 30px;
                    border: 1px solid var(--light-gray);
                    transition: all var(--transition-normal);
                }

                .testimonial-card:hover {
                    transform: translateY(-5px);
                    box-shadow: var(--shadow-md);
                }

                .testimonial-quote {
                    color: var(--maroon);
                    font-size: 1.5rem;
                    margin-bottom: 15px;
                }

                .testimonial-text {
                    color: var(--gray);
                    font-size: 0.95rem;
                    line-height: 1.7;
                    margin-bottom: 20px;
                }

                .testimonial-author {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }

                .testimonial-image {
                    width: 50px;
                    height: 50px;
                    border-radius: var(--radius-full);
                    object-fit: cover;
                    border: 3px solid rgba(139, 35, 70, 0.2);
                }

                .testimonial-name {
                    color: var(--text-dark);
                    font-size: 1rem;
                    font-weight: 600;
                    margin-bottom: 3px;
                }

                .testimonial-program {
                    color: var(--maroon);
                    font-size: 0.85rem;
                    margin: 0 0 2px;
                }

                .testimonial-university {
                    color: var(--gray);
                    font-size: 0.8rem;
                    margin: 0;
                }

                /* ==================== CTA SECTION ==================== */
                .cta-section {
                    padding: 80px var(--container-padding);
                    background: linear-gradient(135deg, var(--dark-maroon) 0%, var(--maroon) 100%);
                    position: relative;
                    overflow: hidden;
                }

                .cta-content {
                    text-align: center;
                    max-width: 700px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 1;
                }

                .cta-title {
                    color: var(--white);
                    font-size: clamp(1.5rem, 4vw, 2.2rem);
                    font-weight: 800;
                    margin-bottom: 15px;
                }

                .cta-desc {
                    color: rgba(255, 255, 255, 0.9);
                    font-size: clamp(1rem, 2vw, 1.1rem);
                    margin-bottom: 20px;
                    line-height: 1.6;
                }

                .cta-tagline {
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    margin-bottom: 30px;
                    color: var(--light-blue);
                    font-size: 1.1rem;
                    font-weight: 600;
                    font-style: italic;
                }

                .cta-buttons {
                    display: flex;
                    gap: 15px;
                    justify-content: center;
                    flex-wrap: wrap;
                }

                .cta-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    padding: 16px 32px;
                    border-radius: var(--radius-md);
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 1rem;
                    transition: all var(--transition-normal);
                }

                .cta-btn.primary {
                    background: var(--white);
                    color: var(--maroon);
                }

                .cta-btn.primary:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 6px 20px rgba(255, 255, 255, 0.3);
                }

                .cta-btn.secondary {
                    background: transparent;
                    color: var(--white);
                    border: 2px solid rgba(255, 255, 255, 0.5);
                }

                .cta-btn.secondary:hover {
                    background: rgba(255, 255, 255, 0.1);
                    transform: translateY(-3px);
                }

                /* ==================== ANIMATIONS ==================== */
                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }

                @keyframes float1 {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-15px);
                    }
                }

                @keyframes float2 {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }

                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 0.5;
                    }
                    50% {
                        transform: scale(1.1);
                        opacity: 0.8;
                    }
                }

                /* ==================== TABLET STYLES ==================== */
                @media screen and (max-width: 1024px) {
                    .hero-container {
                        grid-template-columns: 1fr;
                        text-align: center;
                        padding-top: 120px;
                        gap: 40px;
                    }
                    
                    .hero-content {
                        max-width: 100%;
                        order: 1;
                    }
                    
                    .hero-images {
                        display: none;
                    }
                    
                    .hero-buttons {
                        justify-content: center;
                    }
                    
                    .trust-badges {
                        justify-content: center;
                    }
                    
                    .tagline {
                        justify-content: center;
                    }
                    
                    .features-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    
                    .programs-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    
                    .universities-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    
                    .testimonials-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    
                    .why-content {
                        grid-template-columns: 1fr;
                        gap: 40px;
                    }
                    
                    .why-right {
                        order: -1;
                    }
                    
                    .why-card {
                        max-width: 450px;
                        margin: 0 auto;
                    }
                    
                    .why-left {
                        text-align: center;
                    }
                    
                    .why-features {
                        max-width: 500px;
                        margin: 0 auto;
                    }
                    
                    .why-feature {
                        text-align: left;
                    }
                }

                /* ==================== MOBILE STYLES ==================== */
                @media screen and (max-width: 768px) {
                    .hero {
                        min-height: auto;
                    }
                    
                    .hero-container {
                        padding: 100px 16px 40px;
                    }
                    
                    .hero-badge {
                        font-size: 0.8rem;
                        padding: 8px 14px;
                    }
                    
                    .hero-title {
                        font-size: 1.75rem;
                        margin-bottom: 15px;
                    }
                    
                    .hero-subtitle {
                        font-size: 0.95rem;
                    }
                    
                    .tagline {
                        gap: 10px;
                        margin-bottom: 25px;
                    }
                    
                    .tagline-item {
                        font-size: 0.95rem;
                    }
                    
                    .hero-buttons {
                        flex-direction: column;
                        gap: 12px;
                    }
                    
                    .primary-btn,
                    .secondary-btn {
                        width: 100%;
                        padding: 14px 24px;
                    }
                    
                    .trust-badges {
                        flex-direction: column;
                        align-items: center;
                        gap: 12px;
                    }
                    
                    .hero-stats {
                        padding: 25px 0;
                    }
                    
                    .stats-container {
                        gap: 20px;
                        justify-content: center;
                    }
                    
                    .stat-item {
                        flex: 0 0 calc(50% - 10px);
                        max-width: 150px;
                    }
                    
                    .stat-icon-wrapper {
                        width: 40px;
                        height: 40px;
                        font-size: 1rem;
                    }
                    
                    .stat-number {
                        font-size: 1.5rem;
                    }
                    
                    .stat-label {
                        font-size: 0.75rem;
                    }
                    
                    .features-section,
                    .programs-section,
                    .universities-section,
                    .why-section,
                    .testimonials-section,
                    .cta-section {
                        padding: 50px 16px;
                    }
                    
                    .section-header {
                        margin-bottom: 35px;
                    }
                    
                    .section-badge {
                        font-size: 0.8rem;
                        padding: 6px 12px;
                    }
                    
                    .features-grid {
                        grid-template-columns: 1fr;
                        gap: 20px;
                    }
                    
                    .feature-card {
                        padding: 25px 20px;
                    }
                    
                    .feature-icon {
                        width: 60px;
                        height: 60px;
                        font-size: 1.3rem;
                    }
                    
                    .programs-grid {
                        grid-template-columns: 1fr;
                        gap: 20px;
                    }
                    
                    .program-card {
                        padding: 20px;
                    }
                    
                    .program-title {
                        font-size: 1.05rem;
                    }
                    
                    .program-fee {
                        flex-direction: column;
                        text-align: center;
                        gap: 12px;
                    }
                    
                    .fee-info {
                        text-align: center;
                    }
                    
                    .program-actions {
                        flex-direction: column;
                    }
                    
                    .view-details-btn,
                    .enroll-now-btn {
                        width: 100%;
                    }
                    
                    .universities-grid {
                        grid-template-columns: 1fr;
                        gap: 20px;
                    }
                    
                    .university-card {
                        padding: 25px 20px;
                    }
                    
                    .university-logo {
                        width: 80px;
                        height: 80px;
                    }
                    
                    .logo-img {
                        width: 60px;
                        height: 60px;
                    }
                    
                    .why-card {
                        padding: 30px 20px;
                        max-width: 100%;
                    }
                    
                    .why-card-btn {
                        flex-direction: column;
                        gap: 5px;
                        padding: 12px 20px;
                        font-size: 0.9rem;
                    }
                    
                    .why-card-btn span {
                        font-size: 0.85rem;
                    }
                    
                    .testimonials-grid {
                        grid-template-columns: 1fr;
                        gap: 20px;
                    }
                    
                    .testimonial-card {
                        padding: 25px 20px;
                    }
                    
                    .testimonial-author {
                        flex-direction: column;
                        text-align: center;
                    }
                    
                    .cta-tagline {
                        font-size: 1rem;
                        gap: 10px;
                    }
                    
                    .cta-buttons {
                        flex-direction: column;
                    }
                    
                    .cta-btn {
                        width: 100%;
                        padding: 14px 24px;
                    }
                    
                    .view-all-container {
                        margin-top: 35px;
                    }
                    
                    .view-all-btn {
                        width: 100%;
                        justify-content: center;
                        padding: 14px 24px;
                    }
                }

                /* ==================== SMALL MOBILE ==================== */
                @media screen and (max-width: 480px) {
                    .hero-title {
                        font-size: 1.5rem;
                    }
                    
                    .hero-subtitle {
                        font-size: 0.9rem;
                    }
                    
                    .tagline-item {
                        font-size: 0.85rem;
                    }
                    
                    .stat-item {
                        flex: 0 0 100%;
                        max-width: 100%;
                    }
                    
                    .program-header {
                        flex-direction: column;
                        gap: 8px;
                    }
                    
                    .category-badge,
                    .mode-badge {
                        align-self: flex-start;
                    }
                    
                    .meta-item span {
                        font-size: 0.8rem;
                    }
                    
                    .feature-title {
                        font-size: 1rem;
                    }
                    
                    .feature-desc {
                        font-size: 0.9rem;
                    }
                    
                    .university-name {
                        font-size: 1rem;
                    }
                    
                    .why-feature {
                        flex-direction: column;
                        text-align: center;
                    }
                    
                    .why-feature-icon {
                        margin: 0 auto;
                    }
                }

                /* ==================== TOUCH DEVICE ==================== */
                @media (hover: none) and (pointer: coarse) {
                    .primary-btn:hover,
                    .secondary-btn:hover,
                    .program-card:hover,
                    .university-card:hover,
                    .feature-card:hover,
                    .testimonial-card:hover,
                    .view-all-btn:hover,
                    .enroll-now-btn:hover,
                    .cta-btn:hover,
                    .why-card-btn:hover {
                        transform: none;
                        box-shadow: none;
                    }
                    
                    .primary-btn:active,
                    .secondary-btn:active,
                    .enroll-now-btn:active,
                    .cta-btn:active,
                    .view-all-btn:active {
                        transform: scale(0.98);
                        opacity: 0.9;
                    }
                    
                    .primary-btn,
                    .secondary-btn,
                    .enroll-now-btn,
                    .view-details-btn,
                    .cta-btn,
                    .view-all-btn {
                        min-height: 48px;
                    }
                }

                /* ==================== REDUCED MOTION ==================== */
                @media (prefers-reduced-motion: reduce) {
                    *,
                    *::before,
                    *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                    
                    .floating-stats-card,
                    .floating-success-card,
                    .floating-image-1,
                    .floating-image-2,
                    .decor-circle-1,
                    .decor-circle-2 {
                        animation: none;
                    }
                }

                /* ==================== FOCUS STATES ==================== */
                .primary-btn:focus,
                .secondary-btn:focus,
                .enroll-now-btn:focus,
                .view-details-btn:focus,
                .cta-btn:focus,
                .view-all-btn:focus,
                .university-card:focus,
                .why-card-btn:focus {
                    outline: 3px solid var(--light-blue);
                    outline-offset: 2px;
                }
            `}</style>

            <div className="home-page">
                <Navbar />

                {/* Hero Section */}
                <section className="hero">
                    <div className="hero-pattern"></div>

                    <div className="hero-container">
                        <div className="hero-content">
                            <span className="hero-badge">
                                <i className="fa-solid fa-star"></i>
                                <span className="hero-badge-text">India's #1 Online Education Platform</span>
                            </span>
                            <h1 className="hero-title">
                                Transform Your Career with{' '}
                                <span className="highlight">Online Degrees</span>
                            </h1>
                            <p className="hero-subtitle">
                                Get UGC-approved degrees from India's top universities.
                                Study at your own pace, from anywhere in the world.
                            </p>
                            <div className="tagline">
                                <span className="tagline-item">learn.</span>
                                <span className="tagline-item">grow.</span>
                                <span className="tagline-item">succeed.</span>
                            </div>
                            <div className="hero-buttons">
                                <Link href="/programs" className="primary-btn">
                                    <i className="fa-solid fa-graduation-cap"></i>
                                    <span>Explore Programs</span>
                                </Link>
                                <Link href="/universities" className="secondary-btn">
                                    <i className="fa-solid fa-building-columns"></i>
                                    <span>View Universities</span>
                                </Link>
                            </div>

                            <div className="trust-badges">
                                <div className="trust-badge">
                                    <i className="fa-solid fa-shield-check"></i>
                                    <span>UGC-DEB Approved</span>
                                </div>
                                <div className="trust-badge">
                                    <i className="fa-solid fa-award"></i>
                                    <span>NAAC Accredited</span>
                                </div>
                                <div className="trust-badge">
                                    <i className="fa-solid fa-medal"></i>
                                    <span>AICTE Recognized</span>
                                </div>
                            </div>
                        </div>

                        <div className="hero-images">
                            <div className="main-image-container">
                                <img
                                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=700&fit=crop&auto=format&q=80"
                                    alt="Students studying online"
                                    className="main-image"
                                />
                                <div className="main-image-overlay"></div>
                            </div>

                            <div className="floating-image floating-image-1">
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop&auto=format&q=80"
                                    alt="Team collaboration"
                                    className="floating-img"
                                />
                            </div>

                            <div className="floating-image floating-image-2">
                                <img
                                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&h=200&fit=crop&auto=format&q=80"
                                    alt="Online learning"
                                    className="floating-img"
                                />
                            </div>

                            <div className="floating-stats-card">
                                <div className="floating-card-icon blue">
                                    <i className="fa-solid fa-users"></i>
                                </div>
                                <div className="floating-card-content">
                                    <span className="floating-card-number blue">15,000+</span>
                                    <span className="floating-card-label">Active Students</span>
                                </div>
                            </div>

                            <div className="floating-success-card">
                                <div className="floating-card-icon maroon">
                                    <i className="fa-solid fa-trophy"></i>
                                </div>
                                <div className="floating-card-content">
                                    <span className="floating-card-number maroon">95%</span>
                                    <span className="floating-card-label">Placement Rate</span>
                                </div>
                            </div>

                            <div className="decor-circle decor-circle-1"></div>
                            <div className="decor-circle decor-circle-2"></div>
                            <div className="decor-dots"></div>
                        </div>
                    </div>

                    <div className="hero-stats">
                        <div className="stats-container">
                            {stats.map((stat, index) => (
                                <div key={index} className="stat-item">
                                    <div className="stat-icon-wrapper">
                                        <i className={`fa-solid ${stat.icon}`}></i>
                                    </div>
                                    <span className="stat-number">{stat.number}</span>
                                    <span className="stat-label">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="features-section">
                    <div className="container">
                        <div className="features-grid">
                            {features.map((feature, index) => (
                                <div key={index} className="feature-card">
                                    <div className="feature-icon">
                                        <i className={`fa-solid ${feature.icon}`}></i>
                                    </div>
                                    <h3 className="feature-title">{feature.title}</h3>
                                    <p className="feature-desc">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Programs Section */}
                <section className="programs-section">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-badge">
                                <i className="fa-solid fa-fire"></i>
                                <span>Trending</span>
                            </span>
                            <h2 className="section-title">Featured Programs</h2>
                            <p className="section-subtitle">
                                Most popular programs chosen by our students
                            </p>
                        </div>

                        {loading ? (
                            <div className="loading">
                                <div className="spinner"></div>
                                <span>Loading programs...</span>
                            </div>
                        ) : programs.length > 0 ? (
                            <div className="programs-grid">
                                {programs.map((program) => (
                                    <div key={program._id} className="program-card">
                                        {program.featured && (
                                            <span className="featured-badge">
                                                <i className="fa-solid fa-star"></i>
                                                <span>Featured</span>
                                            </span>
                                        )}

                                        <div className="program-header">
                                            <span className="category-badge">{program.category}</span>
                                            <span className="mode-badge">{program.mode}</span>
                                        </div>

                                        <h3 className="program-title">{program.name}</h3>

                                        <p className="program-university">
                                            <i className="fa-solid fa-building-columns"></i>
                                            <span>{program.universityId?.name || 'University'}</span>
                                        </p>

                                        <div className="program-meta">
                                            <span className="meta-item">
                                                <i className="fa-solid fa-clock"></i>
                                                <span>{program.duration}</span>
                                            </span>
                                            <span className="meta-item">
                                                <i className="fa-solid fa-layer-group"></i>
                                                <span>{program.level}</span>
                                            </span>
                                        </div>

                                        <div className="program-fee">
                                            <div className="fee-info">
                                                <span className="fee-label">Total Fee</span>
                                                <span className="fee-amount">
                                                    ₹{Number(program.fee).toLocaleString('en-IN')}
                                                </span>
                                            </div>
                                            <span className="emi-badge">EMI Available</span>
                                        </div>

                                        <div className="program-actions">
                                            <Link href={`/programs/${program.slug}`}
                                                className="view-details-btn"
                                            >
                                                View Details
                                            </Link>
                                            <button
                                                className="enroll-now-btn"
                                                onClick={() => handleEnrollClick(program)}
                                            >
                                                <i className="fa-solid fa-paper-plane"></i>
                                                <span>Enroll Now</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-data">
                                <i className="fa-solid fa-graduation-cap"></i>
                                <p>No programs available</p>
                            </div>
                        )}

                        <div className="view-all-container">
                            <Link href="/programs" className="view-all-btn">
                                <span>View All Programs</span>
                                <i className="fa-solid fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Featured Universities Section */}
                <section className="universities-section">
                    <div className="section-pattern"></div>
                    <div className="container">
                        <div className="section-header light">
                            <span className="section-badge light">
                                <i className="fa-solid fa-award"></i>
                                <span>Top Rated</span>
                            </span>
                            <h2 className="section-title light">Partner Universities</h2>
                            <p className="section-subtitle light">
                                Learn from India's most prestigious institutions
                            </p>
                        </div>

                        {loading ? (
                            <div className="loading light">
                                <div className="spinner light"></div>
                                <span>Loading universities...</span>
                            </div>
                        ) : universities.length > 0 ? (
                            <div className="universities-grid">
                                {universities.map((university) => (
                                    <Link
                                        key={university._id}
                                        href={`/universities/${university.slug}`}
                                        className="university-card"
                                    >
                                        {university.featured && (
                                            <span className="university-badge">Featured</span>
                                        )}
                                        <div className="university-logo">
                                            <img
                                                src={university.logo || 'https://placehold.co/100x100?text=Logo'}
                                                alt={university.name}
                                                className="logo-img"
                                                onError={(e) => {
                                                    e.target.src = 'https://placehold.co/100x100?text=Logo';
                                                }}
                                            />
                                        </div>
                                        <h3 className="university-name">{university.name}</h3>
                                        <p className="university-location">
                                            <i className="fa-solid fa-location-dot"></i>
                                            <span>{university.location}</span>
                                        </p>
                                        {university.rating && (
                                            <div className="university-rating">
                                                <span className="rating-badge">
                                                    <i className="fa-solid fa-star"></i>
                                                    <span>NAAC {university.rating}</span>
                                                </span>
                                            </div>
                                        )}
                                        <div className="university-cta">
                                            <span>10+ Programs</span>
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="no-data light">
                                <i className="fa-solid fa-building-columns"></i>
                                <p>No universities available</p>
                            </div>
                        )}

                        <div className="view-all-container">
                            <Link href="/universities" className="view-all-btn light">
                                <span>View All Universities</span>
                                <i className="fa-solid fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className="why-section">
                    <div className="container">
                        <div className="why-content">
                            <div className="why-left">
                                <span className="section-badge blue">
                                    <i className="fa-solid fa-question"></i>
                                    <span>Why Edufolio</span>
                                </span>
                                <h2 className="why-title">Why Students Choose Us?</h2>
                                <p className="why-desc">
                                    We partner with India's top universities to bring you
                                    quality education at your doorstep. Our platform makes
                                    it easy to find, compare, and enroll in the perfect program.
                                </p>

                                <div className="why-features">
                                    {whyFeatures.map((feature, index) => (
                                        <div key={index} className="why-feature">
                                            <div className="why-feature-icon">
                                                <i className="fa-solid fa-check"></i>
                                            </div>
                                            <div className="why-feature-content">
                                                <h4 className="why-feature-title">{feature.title}</h4>
                                                <p className="why-feature-desc">{feature.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="why-right">
                                <div className="why-card">
                                    <div className="why-card-icon">
                                        <i className="fa-solid fa-phone"></i>
                                    </div>
                                    <h3 className="why-card-title">Need Help Choosing?</h3>
                                    <p className="why-card-desc">
                                        Talk to our expert counselors for free guidance
                                    </p>
                                    <a href="tel:+917356004410" className="why-card-btn">
                                        <i className="fa-solid fa-phone"></i>
                                        <span>Call Now: +91 73560 04410</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="testimonials-section">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-badge">
                                <i className="fa-solid fa-quote-left"></i>
                                <span>Testimonials</span>
                            </span>
                            <h2 className="section-title">What Our Students Say</h2>
                            <p className="section-subtitle">
                                Success stories from our alumni
                            </p>
                        </div>

                        <div className="testimonials-grid">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="testimonial-card">
                                    <div className="testimonial-quote">
                                        <i className="fa-solid fa-quote-left"></i>
                                    </div>
                                    <div className="testimonial-rating" style={{ marginBottom: '10px' }}>
                                        {testimonial.rating && renderStars(testimonial.rating)}
                                    </div>
                                    <p className="testimonial-text">{testimonial.text}</p>
                                    <div className="testimonial-author">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="testimonial-image"
                                        />
                                        <div className="testimonial-info">
                                            <h4 className="testimonial-name">{testimonial.name}</h4>
                                            <p className="testimonial-program">{testimonial.program}</p>
                                            <p className="testimonial-university">{testimonial.university}</p>
                                            {testimonial.time && (
                                                <p style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '4px' }}>
                                                    {testimonial.time}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="cta-section">
                    <div className="section-pattern"></div>
                    <div className="container">
                        <div className="cta-content">
                            <h2 className="cta-title">Ready to Start Your Journey?</h2>
                            <p className="cta-desc">
                                Take the first step towards your dream career.
                                Our counselors are here to help you choose the right path.
                            </p>
                            <div className="cta-tagline">
                                <span>learn.</span>
                                <span>grow.</span>
                                <span>succeed.</span>
                            </div>
                            <div className="cta-buttons">
                                <Link href="/programs" className="cta-btn primary">
                                    <i className="fa-solid fa-graduation-cap"></i>
                                    <span>Browse Programs</span>
                                </Link>
                                <Link href="/contact" className="cta-btn secondary">
                                    <i className="fa-solid fa-phone"></i>
                                    <span>Contact Us</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <CourseFinder />

                <EnrollModal
                    isOpen={showEnrollModal}
                    onClose={() => setShowEnrollModal(false)}
                    program={selectedProgram}
                    university={selectedProgram?.universityId}
                />

                <Footer />
            </div>
        </>
    );
};

export default Home;
