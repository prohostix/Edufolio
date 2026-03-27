"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import axios from 'axios';
import API_BASE from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EnquiryForm from '../components/EnquiryForm';

const UniversityDetail = () => {
    const { slug } = useParams();
    const [university, setUniversity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('overview');
    const tabContentRef = useRef(null);

    useEffect(() => {
        fetchUniversity();
    }, [slug]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [slug]);

    const fetchUniversity = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_BASE}/universities/${slug}`);
            setUniversity(res.data);
        } catch (err) {
            console.error('Error:', err);
            setError('University not found');
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        if (window.innerWidth < 768 && tabContentRef.current) {
            setTimeout(() => {
                tabContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    };

    const tabs = [
        { id: 'overview', label: 'Overview', icon: 'fa-info-circle' },
        { id: 'programs', label: `Programs (${university?.programs?.length || 0})`, icon: 'fa-graduation-cap' },
        { id: 'facilities', label: 'Facilities', icon: 'fa-building' }
    ];

    if (loading) {
        return (
            <>
                <style>{styles}</style>
                <Navbar />
                <div className="ud-loading" role="status" aria-live="polite">
                    <div className="ud-spinner" aria-hidden="true"></div>
                    <p className="ud-loading-text">Loading university details...</p>
                </div>
                <Footer />
            </>
        );
    }

    if (error || !university) {
        return (
            <>
                <style>{styles}</style>
                <Navbar />
                <div className="ud-error" role="alert">
                    <div className="ud-error-icon-wrapper">
                        <i className="fa-solid fa-exclamation-circle" aria-hidden="true"></i>
                    </div>
                    <h2 className="ud-error-title">University Not Found</h2>
                    <p className="ud-error-text">The university you're looking for doesn't exist.</p>
                    <Link href="/universities" className="ud-back-btn">
                        <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
                        Back to Universities
                    </Link>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <style>{styles}</style>
            <Navbar />

            {/* Hero Section with Banner */}
            <section className="ud-hero">
                <div className="ud-hero-banner">
                    <img
                        src={university.banner || 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&auto=format&q=80'}
                        alt=""
                        className="ud-hero-banner-img"
                    />
                    <div className="ud-hero-overlay" aria-hidden="true"></div>
                </div>

                <div className="ud-hero-content">
                    <div className="ud-container">
                        <div className="ud-hero-info">
                            <div className="ud-logo-wrapper">
                                <img
                                    src={university.logo || 'https://placehold.co/100'}
                                    alt={`${university.name} logo`}
                                    className="ud-hero-logo"
                                />
                            </div>
                            <div className="ud-hero-text">
                                <div className="ud-hero-badges">
                                    {university.featured && (
                                        <span className="ud-badge ud-badge-featured">
                                            <i className="fa-solid fa-star" aria-hidden="true"></i>
                                            Featured
                                        </span>
                                    )}
                                    {university.rating && (
                                        <span className="ud-badge ud-badge-rating">
                                            <i className="fa-solid fa-award" aria-hidden="true"></i>
                                            NAAC {university.rating}
                                        </span>
                                    )}
                                </div>
                                <h1 className="ud-hero-title">{university.name}</h1>
                                {university.shortName && (
                                    <p className="ud-hero-short-name">({university.shortName})</p>
                                )}
                                <p className="ud-hero-location">
                                    <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                                    {university.location}
                                </p>
                                <div className="ud-hero-stats">
                                    <div className="ud-hero-stat">
                                        <span className="ud-stat-value">{university.programs?.length || 0}</span>
                                        <span className="ud-stat-label">Programs</span>
                                    </div>
                                    {university.establishedYear && (
                                        <div className="ud-hero-stat">
                                            <span className="ud-stat-value">{university.establishedYear}</span>
                                            <span className="ud-stat-label">Established</span>
                                        </div>
                                    )}
                                    <div className="ud-hero-stat">
                                        <span className="ud-stat-value">
                                            ₹{Number(university.minFee || 0).toLocaleString('en-IN')}
                                        </span>
                                        <span className="ud-stat-label">Starting Fee</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tabs Navigation */}
            <nav className="ud-tabs-section" aria-label="University information tabs">
                <div className="ud-container">
                    <div className="ud-tabs" role="tablist">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                role="tab"
                                id={`tab-${tab.id}`}
                                aria-selected={activeTab === tab.id}
                                aria-controls={`panel-${tab.id}`}
                                className={`ud-tab ${activeTab === tab.id ? 'ud-tab-active' : ''}`}
                                onClick={() => handleTabChange(tab.id)}
                            >
                                <i className={`fa-solid ${tab.icon}`} aria-hidden="true"></i>
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <section className="ud-main-section">
                <div className="ud-container">
                    <div className="ud-content-grid">
                        {/* Left Column */}
                        <div
                            className="ud-left-column"
                            ref={tabContentRef}
                            role="tabpanel"
                            id={`panel-${activeTab}`}
                            aria-labelledby={`tab-${activeTab}`}
                        >
                            {/* Overview Tab */}
                            {activeTab === 'overview' && (
                                <div className="ud-tab-content ud-fade-in">
                                    {/* About */}
                                    <article className="ud-card">
                                        <h2 className="ud-card-title">
                                            <i className="fa-solid fa-university" aria-hidden="true"></i>
                                            About {university.name}
                                        </h2>
                                        <p className="ud-description">{university.description}</p>
                                    </article>

                                    {/* Highlights */}
                                    {university.highlights && university.highlights.length > 0 && (
                                        <article className="ud-card">
                                            <h2 className="ud-card-title">
                                                <i className="fa-solid fa-star" aria-hidden="true"></i>
                                                University Highlights
                                            </h2>
                                            <ul className="ud-highlights-list">
                                                {university.highlights.map((item, i) => (
                                                    <li key={i} className="ud-highlight-item">
                                                        <i className="fa-solid fa-check-circle ud-check-icon" aria-hidden="true"></i>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </article>
                                    )}

                                    {/* Accreditations & Approvals */}
                                    {(university.accreditations?.length > 0 || university.approvals?.length > 0) && (
                                        <article className="ud-card">
                                            <h2 className="ud-card-title">
                                                <i className="fa-solid fa-certificate" aria-hidden="true"></i>
                                                Accreditations & Approvals
                                            </h2>
                                            <div className="ud-badges-grid">
                                                {university.accreditations?.map((item, i) => (
                                                    <div key={`acc-${i}`} className="ud-accreditation-badge">
                                                        <i className="fa-solid fa-award" aria-hidden="true"></i>
                                                        <span>{item}</span>
                                                    </div>
                                                ))}
                                                {university.approvals?.map((item, i) => (
                                                    <div key={`app-${i}`} className="ud-approval-badge">
                                                        <i className="fa-solid fa-check-circle" aria-hidden="true"></i>
                                                        <span>{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </article>
                                    )}

                                    {/* Contact Info */}
                                    <article className="ud-card">
                                        <h2 className="ud-card-title">
                                            <i className="fa-solid fa-address-book" aria-hidden="true"></i>
                                            Contact Information
                                        </h2>
                                        <div className="ud-contact-grid">
                                            {university.address && (
                                                <div className="ud-contact-item">
                                                    <div className="ud-contact-icon">
                                                        <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                                                    </div>
                                                    <div className="ud-contact-content">
                                                        <span className="ud-contact-label">Address</span>
                                                        <span className="ud-contact-value">{university.address}</span>
                                                    </div>
                                                </div>
                                            )}
                                            {university.email && (
                                                <div className="ud-contact-item">
                                                    <div className="ud-contact-icon">
                                                        <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                                                    </div>
                                                    <div className="ud-contact-content">
                                                        <span className="ud-contact-label">Email</span>
                                                        <a href={`mailto:${university.email}`} className="ud-contact-link">
                                                            {university.email}
                                                        </a>
                                                    </div>
                                                </div>
                                            )}
                                            {university.phone && (
                                                <div className="ud-contact-item">
                                                    <div className="ud-contact-icon">
                                                        <i className="fa-solid fa-phone" aria-hidden="true"></i>
                                                    </div>
                                                    <div className="ud-contact-content">
                                                        <span className="ud-contact-label">Phone</span>
                                                        <a href={`tel:${university.phone}`} className="ud-contact-link">
                                                            {university.phone}
                                                        </a>
                                                    </div>
                                                </div>
                                            )}
                                            {university.website && (
                                                <div className="ud-contact-item">
                                                    <div className="ud-contact-icon">
                                                        <i className="fa-solid fa-globe" aria-hidden="true"></i>
                                                    </div>
                                                    <div className="ud-contact-content">
                                                        <span className="ud-contact-label">Website</span>
                                                        <a
                                                            href={university.website}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="ud-contact-link"
                                                        >
                                                            {university.website}
                                                        </a>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </article>
                                </div>
                            )}

                            {/* Programs Tab */}
                            {activeTab === 'programs' && (
                                <div className="ud-tab-content ud-fade-in">
                                    <article className="ud-card">
                                        <h2 className="ud-card-title">
                                            <i className="fa-solid fa-graduation-cap" aria-hidden="true"></i>
                                            Available Programs
                                        </h2>
                                        {university.programs && university.programs.length > 0 ? (
                                            <div className="ud-programs-grid">
                                                {university.programs.map(program => (
                                                    <Link
                                                        key={program._id}
                                                        href={`/programs/${program.slug}`}
                                                        className="ud-program-card"
                                                    >
                                                        <div className="ud-program-header">
                                                            <span className="ud-program-category">{program.category}</span>
                                                            <span className="ud-program-level">{program.level}</span>
                                                        </div>
                                                        <h3 className="ud-program-name">{program.name}</h3>
                                                        <div className="ud-program-meta">
                                                            <span className="ud-program-meta-item">
                                                                <i className="fa-regular fa-clock" aria-hidden="true"></i>
                                                                {program.duration}
                                                            </span>
                                                            <span className="ud-program-meta-item">
                                                                <i className="fa-solid fa-laptop" aria-hidden="true"></i>
                                                                {program.mode || 'Online'}
                                                            </span>
                                                        </div>
                                                        <div className="ud-program-footer">
                                                            <span className="ud-program-fee">
                                                                ₹{Number(program.fee).toLocaleString('en-IN')}
                                                            </span>
                                                            <span className="ud-program-link">
                                                                View Details
                                                                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                                                            </span>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="ud-no-data">
                                                <i className="fa-solid fa-folder-open" aria-hidden="true"></i>
                                                <p>No programs available yet.</p>
                                            </div>
                                        )}
                                    </article>
                                </div>
                            )}

                            {/* Facilities Tab */}
                            {activeTab === 'facilities' && (
                                <div className="ud-tab-content ud-fade-in">
                                    <article className="ud-card">
                                        <h2 className="ud-card-title">
                                            <i className="fa-solid fa-building" aria-hidden="true"></i>
                                            Facilities & Infrastructure
                                        </h2>
                                        {university.facilities && university.facilities.length > 0 ? (
                                            <ul className="ud-facilities-grid">
                                                {university.facilities.map((facility, i) => (
                                                    <li key={i} className="ud-facility-item">
                                                        <i className="fa-solid fa-check" aria-hidden="true"></i>
                                                        <span>{facility}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className="ud-no-data">
                                                <i className="fa-solid fa-tools" aria-hidden="true"></i>
                                                <p>Facility information coming soon.</p>
                                            </div>
                                        )}
                                    </article>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Sticky Form */}
                        <aside className="ud-right-column">
                            <div className="ud-sticky-form">
                                <EnquiryForm
                                    universityId={university._id}
                                    source="University Page"
                                />

                                {/* Quick Info Card */}
                                <div className="ud-quick-info-card">
                                    <h3 className="ud-quick-info-title">
                                        <i className="fa-solid fa-info-circle" aria-hidden="true"></i>
                                        Quick Info
                                    </h3>
                                    <dl className="ud-quick-info-list">
                                        <div className="ud-quick-info-item">
                                            <dt className="ud-quick-info-label">Type</dt>
                                            <dd className="ud-quick-info-value">Private University</dd>
                                        </div>
                                        {university.establishedYear && (
                                            <div className="ud-quick-info-item">
                                                <dt className="ud-quick-info-label">Established</dt>
                                                <dd className="ud-quick-info-value">{university.establishedYear}</dd>
                                            </div>
                                        )}
                                        <div className="ud-quick-info-item">
                                            <dt className="ud-quick-info-label">Location</dt>
                                            <dd className="ud-quick-info-value">{university.location}</dd>
                                        </div>
                                        <div className="ud-quick-info-item">
                                            <dt className="ud-quick-info-label">Fee Range</dt>
                                            <dd className="ud-quick-info-value">
                                                ₹{Number(university.minFee || 0).toLocaleString('en-IN')} - ₹{Number(university.maxFee || 0).toLocaleString('en-IN')}
                                            </dd>
                                        </div>
                                        {university.rating && (
                                            <div className="ud-quick-info-item">
                                                <dt className="ud-quick-info-label">NAAC Rating</dt>
                                                <dd className="ud-quick-info-value ud-rating-value">
                                                    <i className="fa-solid fa-star" aria-hidden="true"></i>
                                                    {university.rating}
                                                </dd>
                                            </div>
                                        )}
                                    </dl>
                                </div>

                                {/* Call to Action Card */}
                                <div className="ud-cta-card">
                                    <div className="ud-cta-icon">
                                        <i className="fa-solid fa-headset" aria-hidden="true"></i>
                                    </div>
                                    <h4 className="ud-cta-title">Need Assistance?</h4>
                                    <p className="ud-cta-text">Our counselors are ready to help you choose the right program.</p>
                                    <a href="tel:+917356004410" className="ud-cta-button">
                                        <i className="fa-solid fa-phone" aria-hidden="true"></i>
                                        Call Now
                                    </a>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

const styles = `
    /* ==================== UNIVERSITY DETAIL STYLES ==================== */
    
    /* ==================== CSS VARIABLES ==================== */
    .ud-hero,
    .ud-tabs-section,
    .ud-main-section,
    .ud-loading,
    .ud-error {
        --ud-primary: #FF6B35;
        --ud-primary-light: #FF8B5C;
        --ud-primary-shadow: rgba(255, 107, 53, 0.3);
        --ud-dark: #0F172A;
        --ud-dark-light: #1E293B;
        --ud-gray-50: #F8FAFC;
        --ud-gray-100: #F1F5F9;
        --ud-gray-200: #E2E8F0;
        --ud-gray-300: #CBD5E1;
        --ud-gray-400: #94A3B8;
        --ud-gray-500: #64748B;
        --ud-gray-600: #475569;
        --ud-gray-700: #334155;
        --ud-white: #FFFFFF;
        --ud-success: #10B981;
        --ud-success-light: #DCFCE7;
        --ud-success-dark: #166534;
        --ud-error: #DC2626;
        --ud-error-light: #FEF2F2;
        --ud-blue: #3B82F6;
        --ud-blue-dark: #1D4ED8;
        --ud-blue-light: #DBEAFE;
        --ud-purple: #7C3AED;
        --ud-purple-light: #F3E8FF;
        --ud-amber: #F59E0B;
        --ud-amber-dark: #D97706;
        --ud-amber-light: #FEF3C7;
        --ud-amber-darker: #92400E;
        --ud-radius: 10px;
        --ud-radius-lg: 16px;
        --ud-radius-xl: 20px;
        --ud-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        --ud-shadow-md: 0 4px 15px rgba(0, 0, 0, 0.08);
        --ud-shadow-lg: 0 10px 30px rgba(0, 0, 0, 0.15);
        --ud-shadow-xl: 0 10px 30px rgba(0, 0, 0, 0.3);
        --ud-transition: 0.3s ease;
        --ud-transition-fast: 0.2s ease;
    }

    /* ==================== ANIMATIONS ==================== */
    @keyframes ud-spin {
        to { transform: rotate(360deg); }
    }

    @keyframes ud-fade-in {
        from {
            opacity: 0;
            transform: translateY(15px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes ud-slide-up {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes ud-scale-in {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    .ud-fade-in {
        animation: ud-fade-in 0.4s ease;
    }

    /* ==================== LOADING STATE ==================== */
    .ud-loading {
        min-height: 60vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
        color: var(--ud-gray-500);
        padding: 20px;
    }

    .ud-spinner {
        width: 50px;
        height: 50px;
        border: 4px solid var(--ud-gray-200);
        border-top-color: var(--ud-primary);
        border-radius: 50%;
        animation: ud-spin 1s linear infinite;
    }

    .ud-loading-text {
        font-size: 1rem;
        margin: 0;
    }

    /* ==================== ERROR STATE ==================== */
    .ud-error {
        min-height: 60vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 15px;
        text-align: center;
        padding: 40px 20px;
        animation: ud-fade-in 0.5s ease;
    }

    .ud-error-icon-wrapper {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: var(--ud-error-light);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
    }

    .ud-error-icon-wrapper i {
        font-size: 3rem;
        color: var(--ud-error);
    }

    .ud-error-title {
        color: var(--ud-dark);
        font-size: 1.8rem;
        font-weight: 700;
        margin: 0;
    }

    .ud-error-text {
        color: var(--ud-gray-500);
        font-size: 1rem;
        margin: 0;
        max-width: 400px;
    }

    .ud-back-btn {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 14px 28px;
        background: linear-gradient(135deg, var(--ud-primary), var(--ud-primary-light));
        color: var(--ud-white);
        border-radius: var(--ud-radius);
        text-decoration: none;
        font-weight: 600;
        font-size: 1rem;
        margin-top: 10px;
        transition: transform var(--ud-transition-fast), box-shadow var(--ud-transition-fast);
        box-shadow: 0 4px 15px var(--ud-primary-shadow);
    }

    .ud-back-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px var(--ud-primary-shadow);
    }

    .ud-back-btn:focus {
        outline: 3px solid var(--ud-primary);
        outline-offset: 3px;
    }

    /* ==================== HERO SECTION ==================== */
    .ud-hero {
        position: relative;
        background: var(--ud-dark);
        overflow: hidden;
    }

    .ud-hero-banner {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
    }

    .ud-hero-banner-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.3;
        transition: transform 10s ease;
    }

    .ud-hero:hover .ud-hero-banner-img {
        transform: scale(1.05);
    }

    .ud-hero-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(to bottom, rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.95));
        pointer-events: none;
    }

    .ud-hero-content {
        position: relative;
        z-index: 1;
        padding: 80px 20px 100px;
    }

    .ud-container {
        max-width: 1200px;
        margin: 0 auto;
    }

    .ud-hero-info {
        display: flex;
        align-items: flex-start;
        gap: 30px;
        animation: ud-slide-up 0.6s ease;
    }

    .ud-logo-wrapper {
        flex-shrink: 0;
    }

    .ud-hero-logo {
        width: 120px;
        height: 120px;
        border-radius: var(--ud-radius-lg);
        object-fit: contain;
        background: var(--ud-white);
        padding: 10px;
        box-shadow: var(--ud-shadow-xl);
        transition: transform var(--ud-transition-fast);
    }

    .ud-hero-logo:hover {
        transform: scale(1.05);
    }

    .ud-hero-text {
        flex: 1;
        min-width: 0;
    }

    .ud-hero-badges {
        display: flex;
        gap: 10px;
        margin-bottom: 15px;
        flex-wrap: wrap;
    }

    .ud-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 600;
    }

    .ud-badge-featured {
        background: var(--ud-amber-light);
        color: var(--ud-amber-dark);
    }

    .ud-badge-rating {
        background: var(--ud-success-light);
        color: #16A34A;
    }

    .ud-hero-title {
        color: var(--ud-white);
        font-size: 2.2rem;
        font-weight: 700;
        margin: 0 0 5px 0;
        line-height: 1.3;
    }

    .ud-hero-short-name {
        color: var(--ud-gray-400);
        font-size: 1rem;
        margin: 0 0 10px 0;
    }

    .ud-hero-location {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--ud-gray-300);
        font-size: 1rem;
        margin: 0 0 25px 0;
    }

    .ud-hero-location i {
        color: var(--ud-primary);
    }

    .ud-hero-stats {
        display: flex;
        gap: 40px;
        flex-wrap: wrap;
    }

    .ud-hero-stat {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .ud-stat-value {
        color: var(--ud-primary);
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1.2;
    }

    .ud-stat-label {
        color: var(--ud-gray-400);
        font-size: 0.85rem;
    }

    /* ==================== TABS SECTION ==================== */
    .ud-tabs-section {
        background: var(--ud-white);
        border-bottom: 1px solid var(--ud-gray-200);
        position: sticky;
        top: 70px;
        z-index: 100;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    .ud-tabs {
        display: flex;
        gap: 5px;
        overflow-x: auto;
        padding: 10px 0;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    .ud-tabs::-webkit-scrollbar {
        display: none;
    }

    .ud-tab {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 24px;
        background: transparent;
        border: none;
        color: var(--ud-gray-500);
        font-size: 0.95rem;
        font-weight: 500;
        font-family: inherit;
        cursor: pointer;
        border-radius: var(--ud-radius);
        white-space: nowrap;
        transition: all var(--ud-transition-fast);
    }

    .ud-tab:hover {
        background: var(--ud-gray-50);
        color: var(--ud-gray-700);
    }

    .ud-tab:focus {
        outline: none;
    }

    .ud-tab:focus-visible {
        outline: 2px solid var(--ud-primary);
        outline-offset: 2px;
    }

    .ud-tab-active {
        background: #FFF7ED;
        color: var(--ud-primary);
        font-weight: 600;
    }

    .ud-tab-active:hover {
        background: #FFF7ED;
        color: var(--ud-primary);
    }

    /* ==================== MAIN SECTION ==================== */
    .ud-main-section {
        padding: 40px 20px;
        background: var(--ud-gray-50);
        min-height: 60vh;
    }

    .ud-content-grid {
        display: grid;
        grid-template-columns: 1fr 380px;
        gap: 40px;
        align-items: start;
    }

    .ud-left-column {
        display: flex;
        flex-direction: column;
        gap: 25px;
    }

    .ud-tab-content {
        display: flex;
        flex-direction: column;
        gap: 25px;
    }

    .ud-right-column {
        /* Container only */
    }

    .ud-sticky-form {
        position: sticky;
        top: 140px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    /* ==================== CARDS ==================== */
    .ud-card {
        background: var(--ud-white);
        padding: 30px;
        border-radius: var(--ud-radius-lg);
        box-shadow: var(--ud-shadow);
        transition: box-shadow var(--ud-transition);
    }

    .ud-card:hover {
        box-shadow: var(--ud-shadow-md);
    }

    .ud-card-title {
        display: flex;
        align-items: center;
        gap: 12px;
        color: var(--ud-dark);
        font-size: 1.3rem;
        font-weight: 600;
        margin: 0 0 20px 0;
    }

    .ud-card-title i {
        color: var(--ud-primary);
        font-size: 1.1rem;
    }

    .ud-description {
        color: var(--ud-gray-600);
        line-height: 1.8;
        font-size: 1rem;
        margin: 0;
    }

    /* ==================== HIGHLIGHTS ==================== */
    .ud-highlights-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
    }

    .ud-highlight-item {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        color: var(--ud-gray-600);
        font-size: 0.95rem;
        line-height: 1.5;
    }

    .ud-check-icon {
        color: var(--ud-success);
        margin-top: 3px;
        flex-shrink: 0;
    }

    /* ==================== BADGES GRID ==================== */
    .ud-badges-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
    }

    .ud-accreditation-badge,
    .ud-approval-badge {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 16px;
        border-radius: var(--ud-radius);
        font-size: 0.9rem;
        font-weight: 500;
        transition: transform var(--ud-transition-fast);
    }

    .ud-accreditation-badge:hover,
    .ud-approval-badge:hover {
        transform: translateY(-2px);
    }

    .ud-accreditation-badge {
        background: var(--ud-amber-light);
        color: var(--ud-amber-darker);
    }

    .ud-accreditation-badge i {
        color: var(--ud-amber);
    }

    .ud-approval-badge {
        background: var(--ud-success-light);
        color: var(--ud-success-dark);
    }

    .ud-approval-badge i {
        color: var(--ud-success);
    }

    /* ==================== CONTACT GRID ==================== */
    .ud-contact-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }

    .ud-contact-item {
        display: flex;
        align-items: flex-start;
        gap: 12px;
    }

    .ud-contact-icon {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        background: var(--ud-gray-50);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        color: var(--ud-primary);
    }

    .ud-contact-content {
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 0;
    }

    .ud-contact-label {
        color: var(--ud-gray-400);
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .ud-contact-value {
        color: var(--ud-dark);
        font-size: 0.95rem;
        word-break: break-word;
    }

    .ud-contact-link {
        color: var(--ud-blue);
        font-size: 0.95rem;
        text-decoration: none;
        word-break: break-all;
        transition: color var(--ud-transition-fast);
    }

    .ud-contact-link:hover {
        color: var(--ud-blue-dark);
        text-decoration: underline;
    }

    .ud-contact-link:focus {
        outline: 2px solid var(--ud-blue);
        outline-offset: 2px;
        border-radius: 2px;
    }

    /* ==================== PROGRAMS GRID ==================== */
    .ud-programs-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }

    .ud-program-card {
        background: var(--ud-gray-50);
        padding: 20px;
        border-radius: 12px;
        text-decoration: none;
        border: 1px solid var(--ud-gray-200);
        transition: all var(--ud-transition-fast);
        display: block;
    }

    .ud-program-card:hover {
        border-color: var(--ud-primary);
        box-shadow: var(--ud-shadow-md);
        transform: translateY(-3px);
    }

    .ud-program-card:focus {
        outline: 3px solid var(--ud-primary);
        outline-offset: 2px;
    }

    .ud-program-header {
        display: flex;
        gap: 8px;
        margin-bottom: 12px;
        flex-wrap: wrap;
    }

    .ud-program-category {
        background: var(--ud-blue-light);
        color: var(--ud-blue-dark);
        padding: 4px 10px;
        border-radius: 6px;
        font-size: 0.75rem;
        font-weight: 600;
    }

    .ud-program-level {
        background: var(--ud-purple-light);
        color: var(--ud-purple);
        padding: 4px 10px;
        border-radius: 6px;
        font-size: 0.75rem;
        font-weight: 500;
    }

    .ud-program-name {
        color: var(--ud-dark);
        font-size: 1rem;
        font-weight: 600;
        margin: 0 0 10px 0;
        line-height: 1.4;
    }

    .ud-program-meta {
        display: flex;
        gap: 15px;
        color: var(--ud-gray-500);
        font-size: 0.85rem;
        margin-bottom: 15px;
        flex-wrap: wrap;
    }

    .ud-program-meta-item {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .ud-program-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 12px;
        border-top: 1px solid var(--ud-gray-200);
    }

    .ud-program-fee {
        color: #059669;
        font-size: 1rem;
        font-weight: 700;
    }

    .ud-program-link {
        display: flex;
        align-items: center;
        gap: 6px;
        color: var(--ud-primary);
        font-size: 0.85rem;
        font-weight: 600;
        transition: gap var(--ud-transition-fast);
    }

    .ud-program-card:hover .ud-program-link {
        gap: 10px;
    }

    /* ==================== FACILITIES GRID ==================== */
    .ud-facilities-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .ud-facility-item {
        display: flex;
        align-items: center;
        gap: 10px;
        background: var(--ud-gray-50);
        padding: 12px 16px;
        border-radius: var(--ud-radius);
        color: var(--ud-gray-600);
        font-size: 0.9rem;
        transition: all var(--ud-transition-fast);
    }

    .ud-facility-item:hover {
        background: var(--ud-gray-100);
        transform: translateX(5px);
    }

    .ud-facility-item i {
        color: var(--ud-primary);
        flex-shrink: 0;
    }

    /* ==================== NO DATA STATE ==================== */
    .ud-no-data {
        text-align: center;
        padding: 50px 20px;
        color: var(--ud-gray-400);
    }

    .ud-no-data i {
        font-size: 3rem;
        margin-bottom: 15px;
        display: block;
    }

    .ud-no-data p {
        margin: 0;
        font-size: 1rem;
    }

    /* ==================== QUICK INFO CARD ==================== */
    .ud-quick-info-card {
        background: var(--ud-white);
        padding: 25px;
        border-radius: var(--ud-radius-lg);
        box-shadow: var(--ud-shadow);
    }

    .ud-quick-info-title {
        display: flex;
        align-items: center;
        gap: 10px;
        color: var(--ud-dark);
        font-size: 1.1rem;
        font-weight: 600;
        margin: 0 0 20px 0;
    }

    .ud-quick-info-title i {
        color: var(--ud-primary);
    }

    .ud-quick-info-list {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin: 0;
    }

    .ud-quick-info-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--ud-gray-100);
    }

    .ud-quick-info-item:last-child {
        border-bottom: none;
        padding-bottom: 0;
    }

    .ud-quick-info-label {
        color: var(--ud-gray-500);
        font-size: 0.9rem;
        font-weight: 400;
    }

    .ud-quick-info-value {
        color: var(--ud-dark);
        font-size: 0.9rem;
        font-weight: 500;
        margin: 0;
        text-align: right;
    }

    .ud-rating-value {
        display: flex;
        align-items: center;
        gap: 6px;
        color: var(--ud-amber) !important;
        font-weight: 700 !important;
    }

    /* ==================== CTA CARD ==================== */
    .ud-cta-card {
        background: linear-gradient(135deg, var(--ud-primary), var(--ud-primary-light));
        padding: 30px;
        border-radius: var(--ud-radius-lg);
        text-align: center;
    }

    .ud-cta-icon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 15px;
        font-size: 1.5rem;
        color: var(--ud-white);
    }

    .ud-cta-title {
        color: var(--ud-white);
        font-size: 1.1rem;
        font-weight: 700;
        margin: 0 0 8px 0;
    }

    .ud-cta-text {
        color: rgba(255, 255, 255, 0.9);
        font-size: 0.9rem;
        margin: 0 0 20px 0;
        line-height: 1.5;
    }

    .ud-cta-button {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 25px;
        background: var(--ud-white);
        color: var(--ud-primary);
        border-radius: var(--ud-radius);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.95rem;
        transition: transform var(--ud-transition-fast), box-shadow var(--ud-transition-fast);
    }

    .ud-cta-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    }

    .ud-cta-button:focus {
        outline: 3px solid var(--ud-white);
        outline-offset: 3px;
    }

    /* ==================== RESPONSIVE STYLES ==================== */
    @media screen and (max-width: 1024px) {
        .ud-content-grid {
            grid-template-columns: 1fr;
            gap: 30px;
        }

        .ud-sticky-form {
            position: static;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }

        .ud-sticky-form > *:first-child {
            grid-column: span 2;
        }

        .ud-facilities-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media screen and (max-width: 768px) {
        .ud-hero-content {
            padding: 60px 20px 80px;
        }

        .ud-hero-info {
            flex-direction: column;
            align-items: center;
            text-align: center;
        }

        .ud-hero-badges {
            justify-content: center;
        }

        .ud-hero-location {
            justify-content: center;
        }

        .ud-hero-stats {
            justify-content: center;
            gap: 30px;
        }

        .ud-hero-title {
            font-size: 1.8rem;
        }

        .ud-hero-logo {
            width: 100px;
            height: 100px;
        }

        .ud-tabs-section {
            top: 60px;
        }

        .ud-tab {
            padding: 10px 16px;
            font-size: 0.9rem;
        }

        .ud-main-section {
            padding: 30px 15px;
        }

        .ud-sticky-form {
            grid-template-columns: 1fr;
        }

        .ud-sticky-form > *:first-child {
            grid-column: span 1;
        }

        .ud-card {
            padding: 25px 20px;
        }

        .ud-card-title {
            font-size: 1.1rem;
        }

        .ud-highlights-list {
            grid-template-columns: 1fr;
        }

        .ud-contact-grid {
            grid-template-columns: 1fr;
        }

        .ud-programs-grid {
            grid-template-columns: 1fr;
        }

        .ud-facilities-grid {
            grid-template-columns: 1fr;
        }
    }

    @media screen and (max-width: 480px) {
        .ud-hero-content {
            padding: 50px 15px 70px;
        }

        .ud-hero-title {
            font-size: 1.5rem;
        }

        .ud-hero-logo {
            width: 80px;
            height: 80px;
        }

        .ud-hero-stats {
            gap: 20px;
        }

        .ud-stat-value {
            font-size: 1.2rem;
        }

        .ud-badge {
            font-size: 0.8rem;
            padding: 5px 12px;
        }

        .ud-card {
            padding: 20px 15px;
        }

        .ud-program-card {
            padding: 15px;
        }

        .ud-facility-item {
            padding: 10px 12px;
            font-size: 0.85rem;
        }

        .ud-cta-card {
            padding: 25px 20px;
        }
    }

    /* ==================== REDUCED MOTION ==================== */
    @media (prefers-reduced-motion: reduce) {
        .ud-spinner {
            animation: none;
            border-top-color: transparent;
        }

        .ud-fade-in,
        .ud-hero-info {
            animation: none !important;
        }

        .ud-back-btn,
        .ud-hero-logo,
        .ud-tab,
        .ud-card,
        .ud-program-card,
        .ud-facility-item,
        .ud-accreditation-badge,
        .ud-approval-badge,
        .ud-cta-button {
            transition: none !important;
        }

        .ud-hero:hover .ud-hero-banner-img {
            transform: none;
        }

        .ud-program-card:hover .ud-program-link {
            gap: 6px;
        }
    }

    /* ==================== TOUCH DEVICES ==================== */
    @media (hover: none) and (pointer: coarse) {
        .ud-back-btn:hover,
        .ud-program-card:hover,
        .ud-facility-item:hover,
        .ud-cta-button:hover {
            transform: none;
        }

        .ud-hero:hover .ud-hero-banner-img {
            transform: none;
        }
    }

    /* ==================== HIGH CONTRAST ==================== */
    @media (prefers-contrast: high) {
        .ud-tab:focus-visible,
        .ud-program-card:focus,
        .ud-back-btn:focus,
        .ud-cta-button:focus {
            outline-width: 3px;
        }

        .ud-badge,
        .ud-accreditation-badge,
        .ud-approval-badge {
            border: 2px solid currentColor;
        }

        .ud-program-card {
            border-width: 2px;
        }
    }

    /* ==================== PRINT STYLES ==================== */
    @media print {
        .ud-hero {
            background: var(--ud-white) !important;
            padding: 20px;
        }

        .ud-hero-banner,
        .ud-hero-overlay {
            display: none;
        }

        .ud-hero-title,
        .ud-hero-short-name,
        .ud-hero-location {
            color: var(--ud-dark) !important;
        }

        .ud-stat-value,
        .ud-stat-label {
            color: var(--ud-dark) !important;
        }

        .ud-tabs-section {
            position: static;
            display: none;
        }

        .ud-card,
        .ud-quick-info-card {
            box-shadow: none;
            border: 1px solid var(--ud-gray-200);
            break-inside: avoid;
        }

        .ud-cta-card,
        .ud-sticky-form > *:first-child {
            display: none;
        }

        .ud-content-grid {
            grid-template-columns: 1fr;
        }
    }
`;

export default UniversityDetail;
