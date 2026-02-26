"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import axios from 'axios';
import API_BASE from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EnrollModal from '../components/EnrollModal';

const ProgramDetail = () => {
    const { slug } = useParams();
    const [program, setProgram] = useState(null);
    const [relatedPrograms, setRelatedPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showEnrollModal, setShowEnrollModal] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const tabContentRef = useRef(null);

    useEffect(() => {
        if (slug) {
            fetchProgramDetails();
        }
    }, [slug]);

    useEffect(() => {
        // Scroll to top when program changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [slug]);

    const fetchProgramDetails = async () => {
        try {
            setLoading(true);
            setError('');

            const res = await axios.get(`${API_BASE}/programs/${slug}`);
            setProgram(res.data);

            if (res.data.universityId?._id) {
                try {
                    const relatedRes = await axios.get(`${API_BASE}/programs`, {
                        params: {
                            category: res.data.category,
                            limit: 4
                        }
                    });
                    const filtered = relatedRes.data.filter(p => p._id !== res.data._id).slice(0, 3);
                    setRelatedPrograms(filtered);
                } catch (err) {
                    console.log('Could not fetch related programs');
                }
            }
        } catch (err) {
            console.error('Error fetching program:', err);
            setError('Program not found');
        } finally {
            setLoading(false);
        }
    };

    const getYouTubeVideoId = (url) => {
        if (!url) return null;
        const match = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/);
        return match ? match[1] : null;
    };

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        // Smooth scroll to tab content on mobile
        if (window.innerWidth < 768 && tabContentRef.current) {
            tabContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const tabs = [
        { id: 'overview', label: 'Overview', icon: 'fa-info-circle' },
        { id: 'syllabus', label: 'Syllabus', icon: 'fa-book' },
        { id: 'career', label: 'Career Options', icon: 'fa-briefcase' },
        { id: 'eligibility', label: 'Eligibility', icon: 'fa-user-check' }
    ];

    if (loading) {
        return (
            <>
                <style>{styles}</style>
                <Navbar />
                <div className="pd-loading-container" role="status" aria-live="polite">
                    <div className="pd-spinner" aria-hidden="true"></div>
                    <p className="pd-loading-text">Loading program details...</p>
                </div>
                <Footer />
            </>
        );
    }

    if (error || !program) {
        return (
            <>
                <style>{styles}</style>
                <Navbar />
                <div className="pd-error-container" role="alert">
                    <div className="pd-error-icon-wrapper">
                        <i className="fa-solid fa-exclamation-circle pd-error-icon" aria-hidden="true"></i>
                    </div>
                    <h2 className="pd-error-title">Program Not Found</h2>
                    <p className="pd-error-text">The program you're looking for doesn't exist or has been removed.</p>
                    <Link href="/programs" className="pd-back-button">
                        <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
                        Back to Programs
                    </Link>
                </div>
                <Footer />
            </>
        );
    }

    const university = program.universityId || {};
    const videoId = getYouTubeVideoId(program.youtubeUrl);

    return (
        <>
            <style>{styles}</style>
            <Navbar />

            {/* Hero Section */}
            <section className="pd-hero">
                <div className="pd-hero-overlay" aria-hidden="true"></div>
                <div className="pd-hero-content">
                    {/* Breadcrumb */}
                    <nav className="pd-breadcrumb" aria-label="Breadcrumb">
                        <ol className="pd-breadcrumb-list">
                            <li className="pd-breadcrumb-item">
                                <Link href="/" className="pd-breadcrumb-link">Home</Link>
                            </li>
                            <li className="pd-breadcrumb-separator" aria-hidden="true">/</li>
                            <li className="pd-breadcrumb-item">
                                <Link href="/programs" className="pd-breadcrumb-link">Programs</Link>
                            </li>
                            <li className="pd-breadcrumb-separator" aria-hidden="true">/</li>
                            <li className="pd-breadcrumb-item pd-breadcrumb-current" aria-current="page">
                                {program.name}
                            </li>
                        </ol>
                    </nav>

                    <div className="pd-hero-main">
                        {/* Left Content */}
                        <div className="pd-hero-left">
                            <div className="pd-program-badges">
                                <span className="pd-badge pd-badge-category">{program.category}</span>
                                <span className="pd-badge pd-badge-mode">{program.mode}</span>
                                {program.featured && (
                                    <span className="pd-badge pd-badge-featured">
                                        <i className="fa-solid fa-star" aria-hidden="true"></i>
                                        Featured
                                    </span>
                                )}
                            </div>

                            <h1 className="pd-program-title">{program.name}</h1>

                            {university.name && (
                                <Link href={university.slug ? `/universities/${university.slug}` : '#'}
                                    className="pd-university-link"
                                >
                                    {university.logo && (
                                        <img
                                            src={university.logo}
                                            alt=""
                                            className="pd-university-logo"
                                            onError={(e) => e.target.style.display = 'none'}
                                        />
                                    )}
                                    <span className="pd-university-name">{university.name}</span>
                                    {university.rating && (
                                        <span className="pd-rating-badge">
                                            <i className="fa-solid fa-star" aria-hidden="true"></i>
                                            NAAC {university.rating}
                                        </span>
                                    )}
                                </Link>
                            )}

                            <div className="pd-program-meta">
                                <div className="pd-meta-item">
                                    <i className="fa-solid fa-clock" aria-hidden="true"></i>
                                    <span>{program.duration}</span>
                                </div>
                                <div className="pd-meta-item">
                                    <i className="fa-solid fa-layer-group" aria-hidden="true"></i>
                                    <span>{program.level}</span>
                                </div>
                                <div className="pd-meta-item">
                                    <i className="fa-solid fa-laptop" aria-hidden="true"></i>
                                    <span>{program.mode}</span>
                                </div>
                            </div>
                        </div>

                        {/* Fee Card */}
                        <div className="pd-hero-right">
                            <div className="pd-fee-card">
                                <div className="pd-fee-header">
                                    <span className="pd-fee-label">Program Fee</span>
                                    <span className="pd-fee-amount">
                                        ₹{Number(program.fee).toLocaleString('en-IN')}
                                    </span>
                                    <span className="pd-fee-period">{program.feePeriod}</span>
                                </div>

                                <ul className="pd-fee-features">
                                    <li className="pd-fee-feature">
                                        <i className="fa-solid fa-check" aria-hidden="true"></i>
                                        <span>EMI Options Available</span>
                                    </li>
                                    <li className="pd-fee-feature">
                                        <i className="fa-solid fa-check" aria-hidden="true"></i>
                                        <span>Scholarships Available</span>
                                    </li>
                                    <li className="pd-fee-feature">
                                        <i className="fa-solid fa-check" aria-hidden="true"></i>
                                        <span>No Cost EMI</span>
                                    </li>
                                </ul>

                                <button
                                    className="pd-enroll-button"
                                    onClick={() => setShowEnrollModal(true)}
                                    aria-label={`Enroll in ${program.name}`}
                                >
                                    <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>
                                    Enroll Now
                                </button>

                                {program.brochureUrl && (
                                    <a
                                        href={program.brochureUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="pd-brochure-button"
                                        aria-label={`Download brochure for ${program.name}`}
                                    >
                                        <i className="fa-solid fa-download" aria-hidden="true"></i>
                                        Download Brochure
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="pd-main-section">
                <div className="pd-container">
                    <div className="pd-content-grid">
                        {/* Left Content */}
                        <div className="pd-left-content">
                            {/* YouTube Video */}
                            {videoId && (
                                <div className="pd-video-section">
                                    <h2 className="pd-section-title">
                                        <i className="fa-brands fa-youtube pd-youtube-icon" aria-hidden="true"></i>
                                        Program Overview Video
                                    </h2>
                                    <div className="pd-video-container">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${videoId}`}
                                            title={`${program.name} Overview Video`}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="pd-video-iframe"
                                            loading="lazy"
                                        ></iframe>
                                    </div>
                                </div>
                            )}

                            {/* Tabs */}
                            <div className="pd-tabs-container">
                                <div className="pd-tabs" role="tablist" aria-label="Program Information">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            role="tab"
                                            id={`tab-${tab.id}`}
                                            aria-selected={activeTab === tab.id}
                                            aria-controls={`panel-${tab.id}`}
                                            className={`pd-tab ${activeTab === tab.id ? 'pd-tab-active' : ''}`}
                                            onClick={() => handleTabChange(tab.id)}
                                        >
                                            <i className={`fa-solid ${tab.icon}`} aria-hidden="true"></i>
                                            <span>{tab.label}</span>
                                        </button>
                                    ))}
                                </div>

                                <div
                                    className="pd-tab-content"
                                    ref={tabContentRef}
                                    role="tabpanel"
                                    id={`panel-${activeTab}`}
                                    aria-labelledby={`tab-${activeTab}`}
                                >
                                    {/* Overview Tab */}
                                    {activeTab === 'overview' && (
                                        <div className="pd-tab-panel pd-fade-in">
                                            <h3 className="pd-tab-title">About This Program</h3>
                                            <p className="pd-description">{program.description}</p>

                                            {program.highlights && program.highlights.length > 0 && (
                                                <div className="pd-highlights-section">
                                                    <h4 className="pd-sub-title">Program Highlights</h4>
                                                    <ul className="pd-highlights-grid">
                                                        {program.highlights.map((highlight, index) => (
                                                            <li key={index} className="pd-highlight-item">
                                                                <i className="fa-solid fa-check-circle pd-highlight-icon" aria-hidden="true"></i>
                                                                <span>{highlight}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {program.specializations && program.specializations.length > 0 && (
                                                <div className="pd-specializations-section">
                                                    <h4 className="pd-sub-title">Available Specializations</h4>
                                                    <div className="pd-tags-container">
                                                        {program.specializations.map((spec, index) => (
                                                            <span key={index} className="pd-tag">{spec}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Syllabus Tab */}
                                    {activeTab === 'syllabus' && (
                                        <div className="pd-tab-panel pd-fade-in">
                                            <h3 className="pd-tab-title">Course Syllabus</h3>
                                            {program.syllabus && program.syllabus.length > 0 ? (
                                                <ol className="pd-syllabus-grid">
                                                    {program.syllabus.map((subject, index) => (
                                                        <li key={index} className="pd-syllabus-item">
                                                            <span className="pd-syllabus-number" aria-hidden="true">{index + 1}</span>
                                                            <span className="pd-syllabus-text">{subject}</span>
                                                        </li>
                                                    ))}
                                                </ol>
                                            ) : (
                                                <p className="pd-no-data">Syllabus details will be provided upon enquiry.</p>
                                            )}
                                        </div>
                                    )}

                                    {/* Career Tab */}
                                    {activeTab === 'career' && (
                                        <div className="pd-tab-panel pd-fade-in">
                                            <h3 className="pd-tab-title">Career Opportunities</h3>
                                            {program.careerOptions && program.careerOptions.length > 0 ? (
                                                <ul className="pd-career-grid">
                                                    {program.careerOptions.map((career, index) => (
                                                        <li key={index} className="pd-career-item">
                                                            <i className="fa-solid fa-briefcase pd-career-icon" aria-hidden="true"></i>
                                                            <span>{career}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="pd-no-data">Career information will be provided upon enquiry.</p>
                                            )}
                                        </div>
                                    )}

                                    {/* Eligibility Tab */}
                                    {activeTab === 'eligibility' && (
                                        <div className="pd-tab-panel pd-fade-in">
                                            <h3 className="pd-tab-title">Eligibility Criteria</h3>
                                            <div className="pd-eligibility-box">
                                                <i className="fa-solid fa-user-graduate pd-eligibility-icon" aria-hidden="true"></i>
                                                <p className="pd-eligibility-text">
                                                    {program.eligibility || 'Please contact us for eligibility details.'}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <aside className="pd-right-sidebar">
                            {/* University Card */}
                            {university.name && (
                                <div className="pd-sidebar-card">
                                    <h3 className="pd-sidebar-title">
                                        <i className="fa-solid fa-building-columns" aria-hidden="true"></i>
                                        University
                                    </h3>
                                    <div className="pd-university-card">
                                        {university.logo && (
                                            <img
                                                src={university.logo}
                                                alt={`${university.name} logo`}
                                                className="pd-uni-card-logo"
                                                onError={(e) => e.target.style.display = 'none'}
                                            />
                                        )}
                                        <h4 className="pd-uni-card-name">{university.name}</h4>
                                        {university.location && (
                                            <p className="pd-uni-card-location">
                                                <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                                                {university.location}
                                            </p>
                                        )}
                                        {university.slug && (
                                            <Link href={`/universities/${university.slug}`} className="pd-view-uni-btn">
                                                View University
                                                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Quick Info */}
                            <div className="pd-sidebar-card">
                                <h3 className="pd-sidebar-title">
                                    <i className="fa-solid fa-info-circle" aria-hidden="true"></i>
                                    Quick Info
                                </h3>
                                <dl className="pd-quick-info">
                                    <div className="pd-quick-info-item">
                                        <dt className="pd-quick-info-label">Duration</dt>
                                        <dd className="pd-quick-info-value">{program.duration}</dd>
                                    </div>
                                    <div className="pd-quick-info-item">
                                        <dt className="pd-quick-info-label">Level</dt>
                                        <dd className="pd-quick-info-value">{program.level}</dd>
                                    </div>
                                    <div className="pd-quick-info-item">
                                        <dt className="pd-quick-info-label">Mode</dt>
                                        <dd className="pd-quick-info-value">{program.mode}</dd>
                                    </div>
                                    <div className="pd-quick-info-item">
                                        <dt className="pd-quick-info-label">Category</dt>
                                        <dd className="pd-quick-info-value">{program.category}</dd>
                                    </div>
                                </dl>
                            </div>

                            {/* Need Help Card */}
                            <div className="pd-help-card">
                                <div className="pd-help-icon-wrapper">
                                    <i className="fa-solid fa-headset" aria-hidden="true"></i>
                                </div>
                                <h3 className="pd-help-title">Need Help?</h3>
                                <p className="pd-help-text">Our counselors are here to help you</p>
                                <a href="tel:+917356004410" className="pd-help-button">
                                    <i className="fa-solid fa-phone" aria-hidden="true"></i>
                                    Call Now
                                </a>
                            </div>
                        </aside>
                    </div>

                    {/* Related Programs */}
                    {relatedPrograms.length > 0 && (
                        <section className="pd-related-section" aria-labelledby="related-programs-title">
                            <h2 id="related-programs-title" className="pd-related-title">Similar Programs</h2>
                            <div className="pd-related-grid">
                                {relatedPrograms.map((prog) => (
                                    <Link
                                        key={prog._id}
                                        href={`/programs/${prog.slug}`}
                                        className="pd-related-card"
                                    >
                                        <div className="pd-related-badges">
                                            <span className="pd-related-category">{prog.category}</span>
                                        </div>
                                        <h3 className="pd-related-name">{prog.name}</h3>
                                        <p className="pd-related-uni">
                                            {prog.universityId?.name || 'University'}
                                        </p>
                                        <div className="pd-related-meta">
                                            <span>{prog.duration}</span>
                                            <span className="pd-related-fee">₹{Number(prog.fee).toLocaleString('en-IN')}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </section>

            {/* Enroll Modal */}
            <EnrollModal
                isOpen={showEnrollModal}
                onClose={() => setShowEnrollModal(false)}
                program={program}
                university={university}
            />

            <Footer />
        </>
    );
};

const styles = `
    /* ==================== PROGRAM DETAIL STYLES ==================== */
    
    /* ==================== CSS VARIABLES ==================== */
    .pd-hero,
    .pd-main-section,
    .pd-loading-container,
    .pd-error-container {
        --pd-primary: #FF6B35;
        --pd-primary-light: #FF8B5C;
        --pd-primary-shadow: rgba(255, 107, 53, 0.3);
        --pd-dark: #0F172A;
        --pd-dark-light: #1E293B;
        --pd-gray-50: #F8FAFC;
        --pd-gray-100: #F1F5F9;
        --pd-gray-200: #E2E8F0;
        --pd-gray-300: #CBD5E1;
        --pd-gray-400: #94A3B8;
        --pd-gray-500: #64748B;
        --pd-gray-600: #475569;
        --pd-gray-700: #334155;
        --pd-white: #FFFFFF;
        --pd-success: #10B981;
        --pd-success-light: #ECFDF5;
        --pd-success-dark: #166534;
        --pd-error: #EF4444;
        --pd-blue: #3B82F6;
        --pd-blue-dark: #1D4ED8;
        --pd-blue-light: #DBEAFE;
        --pd-indigo: #4338CA;
        --pd-indigo-light: #E0E7FF;
        --pd-amber: #D97706;
        --pd-amber-light: #FEF3C7;
        --pd-youtube: #FF0000;
        --pd-radius: 10px;
        --pd-radius-lg: 16px;
        --pd-radius-xl: 20px;
        --pd-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        --pd-shadow-lg: 0 10px 40px rgba(0, 0, 0, 0.1);
        --pd-shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.2);
        --pd-transition: 0.3s ease;
        --pd-transition-fast: 0.2s ease;
    }

    /* ==================== ANIMATIONS ==================== */
    @keyframes pd-spin {
        to { transform: rotate(360deg); }
    }

    @keyframes pd-fade-in {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes pd-slide-up {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes pd-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }

    .pd-fade-in {
        animation: pd-fade-in 0.4s ease;
    }

    /* ==================== LOADING STATE ==================== */
    .pd-loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 60vh;
        color: var(--pd-gray-500);
        padding: 20px;
    }

    .pd-spinner {
        width: 50px;
        height: 50px;
        border: 4px solid var(--pd-gray-200);
        border-top-color: var(--pd-primary);
        border-radius: 50%;
        animation: pd-spin 1s linear infinite;
        margin-bottom: 20px;
    }

    .pd-loading-text {
        font-size: 1rem;
        margin: 0;
    }

    /* ==================== ERROR STATE ==================== */
    .pd-error-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 60vh;
        text-align: center;
        padding: 40px 20px;
        animation: pd-fade-in 0.5s ease;
    }

    .pd-error-icon-wrapper {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: #FEF2F2;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 25px;
    }

    .pd-error-icon {
        font-size: 3rem;
        color: var(--pd-error);
    }

    .pd-error-title {
        color: var(--pd-dark);
        font-size: 1.8rem;
        font-weight: 700;
        margin: 0 0 10px 0;
    }

    .pd-error-text {
        color: var(--pd-gray-500);
        font-size: 1rem;
        margin: 0 0 25px 0;
        max-width: 400px;
    }

    .pd-back-button {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 14px 28px;
        background: linear-gradient(135deg, var(--pd-primary), var(--pd-primary-light));
        color: var(--pd-white);
        border-radius: var(--pd-radius);
        text-decoration: none;
        font-weight: 600;
        font-size: 1rem;
        transition: transform var(--pd-transition-fast), box-shadow var(--pd-transition-fast);
        box-shadow: 0 4px 15px var(--pd-primary-shadow);
    }

    .pd-back-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px var(--pd-primary-shadow);
    }

    /* ==================== HERO SECTION ==================== */
    .pd-hero {
        background: linear-gradient(135deg, var(--pd-dark) 0%, var(--pd-dark-light) 100%);
        padding: 100px 20px 60px;
        position: relative;
        overflow: hidden;
    }

    .pd-hero-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0.1;
        background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        pointer-events: none;
    }

    .pd-hero-content {
        max-width: 1200px;
        margin: 0 auto;
        position: relative;
        z-index: 1;
    }

    /* Breadcrumb */
    .pd-breadcrumb {
        margin-bottom: 30px;
    }

    .pd-breadcrumb-list {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .pd-breadcrumb-link {
        color: var(--pd-gray-400);
        text-decoration: none;
        font-size: 0.9rem;
        transition: color var(--pd-transition-fast);
    }

    .pd-breadcrumb-link:hover {
        color: var(--pd-white);
    }

    .pd-breadcrumb-separator {
        color: var(--pd-gray-600);
    }

    .pd-breadcrumb-current {
        color: var(--pd-white);
        font-size: 0.9rem;
    }

    /* Hero Main Grid */
    .pd-hero-main {
        display: grid;
        grid-template-columns: 1fr 380px;
        gap: 40px;
        align-items: start;
    }

    .pd-hero-left {
        animation: pd-slide-up 0.6s ease;
    }

    /* Program Badges */
    .pd-program-badges {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
        flex-wrap: wrap;
    }

    .pd-badge {
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 600;
        display: inline-flex;
        align-items: center;
        gap: 6px;
    }

    .pd-badge-category {
        background: var(--pd-blue);
        color: var(--pd-white);
    }

    .pd-badge-mode {
        background: var(--pd-success);
        color: var(--pd-white);
    }

    .pd-badge-featured {
        background: linear-gradient(135deg, #F59E0B, var(--pd-amber));
        color: var(--pd-white);
    }

    /* Program Title */
    .pd-program-title {
        color: var(--pd-white);
        font-size: 2.2rem;
        font-weight: 800;
        margin: 0 0 20px 0;
        line-height: 1.3;
    }

    /* University Link */
    .pd-university-link {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        color: var(--pd-gray-400);
        text-decoration: none;
        margin-bottom: 25px;
        padding: 12px 18px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: var(--pd-radius);
        transition: background var(--pd-transition-fast), color var(--pd-transition-fast);
        border: 1px solid transparent;
    }

    .pd-university-link:hover {
        background: rgba(255, 255, 255, 0.1);
        color: var(--pd-white);
        border-color: rgba(255, 255, 255, 0.1);
    }

    .pd-university-logo {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        object-fit: contain;
        background: var(--pd-white);
        padding: 4px;
    }

    .pd-university-name {
        font-weight: 500;
    }

    .pd-rating-badge {
        background: var(--pd-amber-light);
        color: var(--pd-amber);
        padding: 4px 10px;
        border-radius: 6px;
        font-size: 0.75rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 4px;
    }

    /* Program Meta */
    .pd-program-meta {
        display: flex;
        gap: 25px;
        flex-wrap: wrap;
    }

    .pd-meta-item {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--pd-gray-300);
        font-size: 0.95rem;
    }

    .pd-meta-item i {
        color: var(--pd-primary);
    }

    /* Fee Card */
    .pd-hero-right {
        animation: pd-slide-up 0.6s ease 0.1s both;
    }

    .pd-fee-card {
        background: var(--pd-white);
        border-radius: var(--pd-radius-xl);
        padding: 30px;
        box-shadow: var(--pd-shadow-xl);
    }

    .pd-fee-header {
        text-align: center;
        margin-bottom: 25px;
        padding-bottom: 20px;
        border-bottom: 1px solid var(--pd-gray-200);
    }

    .pd-fee-label {
        display: block;
        color: var(--pd-gray-500);
        font-size: 0.9rem;
        margin-bottom: 5px;
    }

    .pd-fee-amount {
        display: block;
        color: var(--pd-success);
        font-size: 2.5rem;
        font-weight: 800;
        line-height: 1.2;
    }

    .pd-fee-period {
        color: var(--pd-gray-500);
        font-size: 0.85rem;
    }

    .pd-fee-features {
        list-style: none;
        margin: 0 0 25px 0;
        padding: 0;
    }

    .pd-fee-feature {
        display: flex;
        align-items: center;
        gap: 10px;
        color: var(--pd-gray-700);
        font-size: 0.9rem;
        margin-bottom: 12px;
    }

    .pd-fee-feature:last-child {
        margin-bottom: 0;
    }

    .pd-fee-feature i {
        color: var(--pd-success);
        font-size: 0.85rem;
    }

    .pd-enroll-button {
        width: 100%;
        padding: 16px;
        background: linear-gradient(135deg, var(--pd-primary), var(--pd-primary-light));
        color: var(--pd-white);
        border: none;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 600;
        font-family: inherit;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin-bottom: 12px;
        transition: transform var(--pd-transition-fast), box-shadow var(--pd-transition-fast);
        box-shadow: 0 4px 15px var(--pd-primary-shadow);
        position: relative;
        overflow: hidden;
    }

    .pd-enroll-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s ease;
    }

    .pd-enroll-button:hover::before {
        left: 100%;
    }

    .pd-enroll-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px var(--pd-primary-shadow);
    }

    .pd-enroll-button:focus {
        outline: 3px solid var(--pd-primary);
        outline-offset: 3px;
    }

    .pd-brochure-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        width: 100%;
        padding: 14px;
        background: var(--pd-gray-100);
        color: var(--pd-gray-700);
        border-radius: 12px;
        text-decoration: none;
        font-size: 0.95rem;
        font-weight: 600;
        transition: background var(--pd-transition-fast), color var(--pd-transition-fast);
    }

    .pd-brochure-button:hover {
        background: var(--pd-gray-200);
        color: var(--pd-dark);
    }

    .pd-brochure-button:focus {
        outline: 3px solid var(--pd-gray-400);
        outline-offset: 2px;
    }

    /* ==================== MAIN SECTION ==================== */
    .pd-main-section {
        padding: 60px 20px;
        background: var(--pd-gray-50);
    }

    .pd-container {
        max-width: 1200px;
        margin: 0 auto;
    }

    .pd-content-grid {
        display: grid;
        grid-template-columns: 1fr 350px;
        gap: 40px;
    }

    /* ==================== VIDEO SECTION ==================== */
    .pd-video-section {
        margin-bottom: 40px;
        animation: pd-fade-in 0.5s ease;
    }

    .pd-section-title {
        color: var(--pd-dark);
        font-size: 1.3rem;
        font-weight: 700;
        margin: 0 0 20px 0;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .pd-youtube-icon {
        color: var(--pd-youtube);
    }

    .pd-video-container {
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
        overflow: hidden;
        border-radius: var(--pd-radius-lg);
        background: #000;
        box-shadow: var(--pd-shadow-lg);
    }

    .pd-video-iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
    }

    /* ==================== TABS ==================== */
    .pd-tabs-container {
        background: var(--pd-white);
        border-radius: var(--pd-radius-xl);
        overflow: hidden;
        box-shadow: var(--pd-shadow);
        animation: pd-fade-in 0.5s ease 0.1s both;
    }

    .pd-tabs {
        display: flex;
        border-bottom: 1px solid var(--pd-gray-200);
        overflow-x: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    .pd-tabs::-webkit-scrollbar {
        display: none;
    }

    .pd-tab {
        flex: 1;
        min-width: max-content;
        padding: 18px 20px;
        background: none;
        border: none;
        border-bottom: 3px solid transparent;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        color: var(--pd-gray-500);
        font-size: 0.95rem;
        font-weight: 500;
        font-family: inherit;
        white-space: nowrap;
        transition: all var(--pd-transition-fast);
    }

    .pd-tab:hover {
        color: var(--pd-primary);
        background: var(--pd-gray-50);
    }

    .pd-tab:focus {
        outline: none;
        background: var(--pd-gray-50);
    }

    .pd-tab:focus-visible {
        outline: 2px solid var(--pd-primary);
        outline-offset: -2px;
    }

    .pd-tab-active {
        color: var(--pd-primary);
        background: #FFF7ED;
        border-bottom-color: var(--pd-primary);
    }

    .pd-tab-content {
        padding: 30px;
    }

    .pd-tab-panel {
        /* Handled by animation class */
    }

    .pd-tab-title {
        color: var(--pd-dark);
        font-size: 1.2rem;
        font-weight: 700;
        margin: 0 0 20px 0;
    }

    .pd-description {
        color: var(--pd-gray-600);
        font-size: 1rem;
        line-height: 1.8;
        margin: 0 0 30px 0;
    }

    .pd-sub-title {
        color: var(--pd-dark);
        font-size: 1rem;
        font-weight: 600;
        margin: 0 0 15px 0;
    }

    /* Highlights */
    .pd-highlights-section {
        margin-bottom: 30px;
    }

    .pd-highlights-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .pd-highlight-item {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        color: var(--pd-gray-700);
        font-size: 0.95rem;
    }

    .pd-highlight-icon {
        color: var(--pd-success);
        margin-top: 3px;
        flex-shrink: 0;
    }

    /* Specializations */
    .pd-specializations-section {
        /* No additional styles needed */
    }

    .pd-tags-container {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .pd-tag {
        background: var(--pd-indigo-light);
        color: var(--pd-indigo);
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 500;
    }

    /* Syllabus */
    .pd-syllabus-grid {
        display: grid;
        gap: 12px;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .pd-syllabus-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px;
        background: var(--pd-gray-50);
        border-radius: var(--pd-radius);
        transition: background var(--pd-transition-fast);
    }

    .pd-syllabus-item:hover {
        background: var(--pd-gray-100);
    }

    .pd-syllabus-number {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: var(--pd-primary);
        color: var(--pd-white);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.85rem;
        font-weight: 600;
        flex-shrink: 0;
    }

    .pd-syllabus-text {
        color: var(--pd-gray-700);
        font-size: 0.95rem;
    }

    /* Career */
    .pd-career-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .pd-career-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 15px;
        background: var(--pd-gray-50);
        border-radius: var(--pd-radius);
        color: var(--pd-gray-700);
        font-size: 0.95rem;
        transition: background var(--pd-transition-fast), transform var(--pd-transition-fast);
    }

    .pd-career-item:hover {
        background: var(--pd-gray-100);
        transform: translateX(5px);
    }

    .pd-career-icon {
        color: var(--pd-primary);
        flex-shrink: 0;
    }

    /* Eligibility */
    .pd-eligibility-box {
        display: flex;
        align-items: flex-start;
        gap: 20px;
        padding: 25px;
        background: var(--pd-success-light);
        border-radius: 12px;
        border: 1px solid #BBF7D0;
    }

    .pd-eligibility-icon {
        font-size: 2rem;
        color: var(--pd-success);
        flex-shrink: 0;
    }

    .pd-eligibility-text {
        color: var(--pd-success-dark);
        font-size: 1rem;
        line-height: 1.7;
        margin: 0;
    }

    .pd-no-data {
        color: var(--pd-gray-500);
        font-style: italic;
        margin: 0;
    }

    /* ==================== SIDEBAR ==================== */
    .pd-right-sidebar {
        /* Container only */
    }

    .pd-sidebar-card {
        background: var(--pd-white);
        border-radius: var(--pd-radius-lg);
        padding: 25px;
        margin-bottom: 25px;
        box-shadow: var(--pd-shadow);
        animation: pd-fade-in 0.5s ease 0.2s both;
    }

    .pd-sidebar-title {
        color: var(--pd-dark);
        font-size: 1rem;
        font-weight: 700;
        margin: 0 0 20px 0;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .pd-sidebar-title i {
        color: var(--pd-primary);
    }

    /* University Card */
    .pd-university-card {
        text-align: center;
    }

    .pd-uni-card-logo {
        width: 80px;
        height: 80px;
        border-radius: 12px;
        object-fit: contain;
        margin-bottom: 15px;
        background: var(--pd-gray-50);
        padding: 10px;
    }

    .pd-uni-card-name {
        color: var(--pd-dark);
        font-size: 1rem;
        font-weight: 600;
        margin: 0 0 8px 0;
    }

    .pd-uni-card-location {
        color: var(--pd-gray-500);
        font-size: 0.85rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        margin: 0 0 15px 0;
    }

    .pd-view-uni-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: var(--pd-primary);
        font-size: 0.9rem;
        font-weight: 600;
        text-decoration: none;
        transition: gap var(--pd-transition-fast);
    }

    .pd-view-uni-btn:hover {
        gap: 12px;
    }

    .pd-view-uni-btn:focus {
        outline: 2px solid var(--pd-primary);
        outline-offset: 4px;
        border-radius: 4px;
    }

    /* Quick Info */
    .pd-quick-info {
        margin: 0;
    }

    .pd-quick-info-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid var(--pd-gray-200);
    }

    .pd-quick-info-item:last-child {
        border-bottom: none;
        padding-bottom: 0;
    }

    .pd-quick-info-label {
        color: var(--pd-gray-500);
        font-size: 0.9rem;
        font-weight: 400;
    }

    .pd-quick-info-value {
        color: var(--pd-dark);
        font-size: 0.9rem;
        font-weight: 600;
        margin: 0;
    }

    /* Help Card */
    .pd-help-card {
        background: linear-gradient(135deg, var(--pd-primary), var(--pd-primary-light));
        border-radius: var(--pd-radius-lg);
        padding: 30px;
        text-align: center;
        animation: pd-fade-in 0.5s ease 0.3s both;
    }

    .pd-help-icon-wrapper {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 15px;
        font-size: 1.5rem;
        color: var(--pd-white);
    }

    .pd-help-title {
        color: var(--pd-white);
        font-size: 1.1rem;
        font-weight: 700;
        margin: 0 0 8px 0;
    }

    .pd-help-text {
        color: rgba(255, 255, 255, 0.9);
        font-size: 0.9rem;
        margin: 0 0 20px 0;
    }

    .pd-help-button {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 25px;
        background: var(--pd-white);
        color: var(--pd-primary);
        border-radius: var(--pd-radius);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.95rem;
        transition: transform var(--pd-transition-fast), box-shadow var(--pd-transition-fast);
    }

    .pd-help-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    .pd-help-button:focus {
        outline: 3px solid var(--pd-white);
        outline-offset: 3px;
    }

    /* ==================== RELATED PROGRAMS ==================== */
    .pd-related-section {
        margin-top: 60px;
        animation: pd-fade-in 0.5s ease 0.4s both;
    }

    .pd-related-title {
        color: var(--pd-dark);
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0 0 25px 0;
    }

    .pd-related-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 25px;
    }

    .pd-related-card {
        background: var(--pd-white);
        border-radius: var(--pd-radius-lg);
        padding: 25px;
        text-decoration: none;
        box-shadow: var(--pd-shadow);
        transition: transform var(--pd-transition-fast), box-shadow var(--pd-transition-fast);
        display: block;
    }

    .pd-related-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--pd-shadow-lg);
    }

    .pd-related-card:focus {
        outline: 3px solid var(--pd-primary);
        outline-offset: 2px;
    }

    .pd-related-badges {
        margin-bottom: 15px;
    }

    .pd-related-category {
        background: var(--pd-blue-light);
        color: var(--pd-blue-dark);
        padding: 5px 12px;
        border-radius: 6px;
        font-size: 0.8rem;
        font-weight: 600;
    }

    .pd-related-name {
        color: var(--pd-dark);
        font-size: 1rem;
        font-weight: 600;
        margin: 0 0 8px 0;
        line-height: 1.4;
    }

    .pd-related-uni {
        color: var(--pd-gray-500);
        font-size: 0.85rem;
        margin: 0 0 15px 0;
    }

    .pd-related-meta {
        display: flex;
        justify-content: space-between;
        color: var(--pd-gray-500);
        font-size: 0.85rem;
    }

    .pd-related-fee {
        color: var(--pd-success);
        font-weight: 600;
    }

    /* ==================== RESPONSIVE STYLES ==================== */
    @media screen and (max-width: 1024px) {
        .pd-hero-main {
            grid-template-columns: 1fr;
            gap: 30px;
        }

        .pd-hero-right {
            max-width: 450px;
        }

        .pd-content-grid {
            grid-template-columns: 1fr;
            gap: 30px;
        }

        .pd-right-sidebar {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
        }

        .pd-help-card {
            grid-column: span 2;
        }

        .pd-related-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media screen and (max-width: 768px) {
        .pd-hero {
            padding: 90px 15px 40px;
        }

        .pd-program-title {
            font-size: 1.6rem;
        }

        .pd-university-link {
            flex-wrap: wrap;
            gap: 10px;
        }

        .pd-program-meta {
            gap: 15px;
        }

        .pd-meta-item {
            font-size: 0.85rem;
        }

        .pd-fee-card {
            padding: 25px 20px;
        }

        .pd-fee-amount {
            font-size: 2rem;
        }

        .pd-main-section {
            padding: 40px 15px;
        }

        .pd-right-sidebar {
            grid-template-columns: 1fr;
        }

        .pd-help-card {
            grid-column: span 1;
        }

        .pd-tabs {
            /* Horizontal scroll indicator */
            position: relative;
        }

        .pd-tab {
            padding: 15px;
            font-size: 0.85rem;
        }

        .pd-tab-content {
            padding: 20px;
        }

        .pd-highlights-grid {
            grid-template-columns: 1fr;
        }

        .pd-career-grid {
            grid-template-columns: 1fr;
        }

        .pd-related-grid {
            grid-template-columns: 1fr;
            gap: 20px;
        }

        .pd-related-title {
            font-size: 1.3rem;
        }
    }

    @media screen and (max-width: 480px) {
        .pd-hero {
            padding: 80px 15px 30px;
        }

        .pd-program-badges {
            gap: 8px;
        }

        .pd-badge {
            padding: 5px 12px;
            font-size: 0.8rem;
        }

        .pd-program-title {
            font-size: 1.4rem;
        }

        .pd-university-link {
            padding: 10px 12px;
        }

        .pd-rating-badge {
            display: none;
        }

        .pd-fee-card {
            padding: 20px 15px;
            border-radius: var(--pd-radius-lg);
        }

        .pd-fee-amount {
            font-size: 1.8rem;
        }

        .pd-enroll-button,
        .pd-brochure-button {
            padding: 14px;
            font-size: 0.9rem;
        }

        .pd-sidebar-card {
            padding: 20px;
        }

        .pd-eligibility-box {
            flex-direction: column;
            text-align: center;
            gap: 15px;
        }

        .pd-related-card {
            padding: 20px;
        }
    }

    /* ==================== REDUCED MOTION ==================== */
    @media (prefers-reduced-motion: reduce) {
        .pd-spinner {
            animation: none;
            border-top-color: transparent;
        }

        .pd-fade-in,
        .pd-hero-left,
        .pd-hero-right,
        .pd-video-section,
        .pd-tabs-container,
        .pd-sidebar-card,
        .pd-help-card,
        .pd-related-section {
            animation: none !important;
        }

        .pd-back-button,
        .pd-enroll-button,
        .pd-brochure-button,
        .pd-help-button,
        .pd-related-card,
        .pd-career-item,
        .pd-view-uni-btn {
            transition: none !important;
        }

        .pd-enroll-button::before {
            display: none;
        }
    }

    /* ==================== TOUCH DEVICES ==================== */
    @media (hover: none) and (pointer: coarse) {
        .pd-back-button:hover,
        .pd-enroll-button:hover,
        .pd-help-button:hover,
        .pd-related-card:hover {
            transform: none;
        }

        .pd-career-item:hover {
            transform: none;
        }

        .pd-view-uni-btn:hover {
            gap: 8px;
        }
    }

    /* ==================== HIGH CONTRAST ==================== */
    @media (prefers-contrast: high) {
        .pd-tab:focus-visible {
            outline-width: 3px;
        }

        .pd-badge {
            border: 2px solid currentColor;
        }

        .pd-eligibility-box {
            border-width: 2px;
        }
    }

    /* ==================== PRINT STYLES ==================== */
    @media print {
        .pd-hero {
            background: var(--pd-white) !important;
            color: var(--pd-dark) !important;
            padding: 20px;
        }

        .pd-hero-overlay {
            display: none;
        }

        .pd-program-title,
        .pd-breadcrumb-current {
            color: var(--pd-dark) !important;
        }

        .pd-fee-card,
        .pd-help-card {
            box-shadow: none;
            border: 1px solid var(--pd-gray-200);
        }

        .pd-enroll-button,
        .pd-brochure-button,
        .pd-help-button {
            display: none;
        }

        .pd-video-section {
            display: none;
        }
    }
`;

export default ProgramDetail;
