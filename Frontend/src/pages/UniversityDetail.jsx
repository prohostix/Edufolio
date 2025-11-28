import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EnquiryForm from '../components/EnquiryForm';

const UniversityDetail = () => {
    const { slug } = useParams();
    const [university, setUniversity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('overview');

    const API_BASE = "http://localhost:5000/api";

    useEffect(() => {
        fetchUniversity();
    }, [slug]);

    const fetchUniversity = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_BASE}/public/universities/${slug}`);
            setUniversity(res.data);
        } catch (err) {
            console.error('Error:', err);
            setError('University not found');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div style={styles.loading}>
                    <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2rem', color: '#FF6B35' }}></i>
                    <p>Loading university details...</p>
                </div>
                <Footer />
            </>
        );
    }

    if (error || !university) {
        return (
            <>
                <Navbar />
                <div style={styles.error}>
                    <i className="fa-solid fa-exclamation-circle" style={{ fontSize: '3rem', color: '#DC2626' }}></i>
                    <h2>University Not Found</h2>
                    <p>The university you're looking for doesn't exist.</p>
                    <Link to="/universities" style={styles.backBtn}>
                        <i className="fa-solid fa-arrow-left"></i> Back to Universities
                    </Link>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            {/* Hero Section with Banner */}
            <section style={styles.hero}>
                <div style={styles.heroBanner}>
                    <img
                        src={university.banner || 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200'}
                        alt={university.name}
                        style={styles.heroBannerImg}
                    />
                    <div style={styles.heroOverlay}></div>
                </div>

                <div style={styles.heroContent}>
                    <div style={styles.container}>
                        <div style={styles.heroInfo}>
                            <div style={styles.logoWrapper}>
                                <img
                                    src={university.logo || 'https://via.placeholder.com/100'}
                                    alt={university.name}
                                    style={styles.heroLogo}
                                />
                            </div>
                            <div style={styles.heroText}>
                                <div style={styles.heroBadges}>
                                    {university.featured && (
                                        <span style={styles.featuredBadge}>
                                            <i className="fa-solid fa-star"></i> Featured
                                        </span>
                                    )}
                                    {university.rating && (
                                        <span style={styles.ratingBadge}>
                                            <i className="fa-solid fa-award"></i> NAAC {university.rating}
                                        </span>
                                    )}
                                </div>
                                <h1 style={styles.heroTitle}>{university.name}</h1>
                                {university.shortName && (
                                    <p style={styles.heroShortName}>({university.shortName})</p>
                                )}
                                <p style={styles.heroLocation}>
                                    <i className="fa-solid fa-location-dot"></i>
                                    {university.location}
                                </p>
                                <div style={styles.heroStats}>
                                    <div style={styles.heroStat}>
                                        <span style={styles.statValue}>{university.programs?.length || 0}</span>
                                        <span style={styles.statLabel}>Programs</span>
                                    </div>
                                    {university.establishedYear && (
                                        <div style={styles.heroStat}>
                                            <span style={styles.statValue}>{university.establishedYear}</span>
                                            <span style={styles.statLabel}>Established</span>
                                        </div>
                                    )}
                                    <div style={styles.heroStat}>
                                        <span style={styles.statValue}>
                                            ₹{Number(university.minFee || 0).toLocaleString('en-IN')}
                                        </span>
                                        <span style={styles.statLabel}>Starting Fee</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tabs Navigation */}
            <section style={styles.tabsSection}>
                <div style={styles.container}>
                    <div style={styles.tabs}>
                        <button
                            style={activeTab === 'overview' ? styles.tabActive : styles.tab}
                            onClick={() => setActiveTab('overview')}
                        >
                            <i className="fa-solid fa-info-circle"></i> Overview
                        </button>
                        <button
                            style={activeTab === 'programs' ? styles.tabActive : styles.tab}
                            onClick={() => setActiveTab('programs')}
                        >
                            <i className="fa-solid fa-graduation-cap"></i> Programs ({university.programs?.length || 0})
                        </button>
                        <button
                            style={activeTab === 'facilities' ? styles.tabActive : styles.tab}
                            onClick={() => setActiveTab('facilities')}
                        >
                            <i className="fa-solid fa-building"></i> Facilities
                        </button>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section style={styles.mainSection}>
                <div style={styles.container}>
                    <div style={styles.contentGrid}>
                        {/* Left Column */}
                        <div style={styles.leftColumn}>
                            {/* Overview Tab */}
                            {activeTab === 'overview' && (
                                <>
                                    {/* About */}
                                    <div style={styles.card}>
                                        <h2 style={styles.cardTitle}>
                                            <i className="fa-solid fa-university"></i> About {university.name}
                                        </h2>
                                        <p style={styles.description}>{university.description}</p>
                                    </div>

                                    {/* Highlights */}
                                    {university.highlights && university.highlights.length > 0 && (
                                        <div style={styles.card}>
                                            <h2 style={styles.cardTitle}>
                                                <i className="fa-solid fa-star"></i> University Highlights
                                            </h2>
                                            <ul style={styles.highlightsList}>
                                                {university.highlights.map((item, i) => (
                                                    <li key={i} style={styles.highlightItem}>
                                                        <i className="fa-solid fa-check-circle" style={{ color: '#10B981' }}></i>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Accreditations & Approvals */}
                                    <div style={styles.card}>
                                        <h2 style={styles.cardTitle}>
                                            <i className="fa-solid fa-certificate"></i> Accreditations & Approvals
                                        </h2>
                                        <div style={styles.badgesGrid}>
                                            {university.accreditations?.map((item, i) => (
                                                <div key={i} style={styles.accreditationBadge}>
                                                    <i className="fa-solid fa-award" style={{ color: '#F59E0B' }}></i>
                                                    {item}
                                                </div>
                                            ))}
                                            {university.approvals?.map((item, i) => (
                                                <div key={i} style={styles.approvalBadge}>
                                                    <i className="fa-solid fa-check-circle" style={{ color: '#10B981' }}></i>
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Contact Info */}
                                    <div style={styles.card}>
                                        <h2 style={styles.cardTitle}>
                                            <i className="fa-solid fa-address-book"></i> Contact Information
                                        </h2>
                                        <div style={styles.contactGrid}>
                                            {university.address && (
                                                <div style={styles.contactItem}>
                                                    <i className="fa-solid fa-location-dot"></i>
                                                    <div>
                                                        <span style={styles.contactLabel}>Address</span>
                                                        <span style={styles.contactValue}>{university.address}</span>
                                                    </div>
                                                </div>
                                            )}
                                            {university.email && (
                                                <div style={styles.contactItem}>
                                                    <i className="fa-solid fa-envelope"></i>
                                                    <div>
                                                        <span style={styles.contactLabel}>Email</span>
                                                        <span style={styles.contactValue}>{university.email}</span>
                                                    </div>
                                                </div>
                                            )}
                                            {university.phone && (
                                                <div style={styles.contactItem}>
                                                    <i className="fa-solid fa-phone"></i>
                                                    <div>
                                                        <span style={styles.contactLabel}>Phone</span>
                                                        <span style={styles.contactValue}>{university.phone}</span>
                                                    </div>
                                                </div>
                                            )}
                                            {university.website && (
                                                <div style={styles.contactItem}>
                                                    <i className="fa-solid fa-globe"></i>
                                                    <div>
                                                        <span style={styles.contactLabel}>Website</span>
                                                        <a href={university.website} target="_blank" rel="noopener noreferrer" style={styles.contactLink}>
                                                            {university.website}
                                                        </a>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Programs Tab */}
                            {activeTab === 'programs' && (
                                <div style={styles.card}>
                                    <h2 style={styles.cardTitle}>
                                        <i className="fa-solid fa-graduation-cap"></i> Available Programs
                                    </h2>
                                    {university.programs && university.programs.length > 0 ? (
                                        <div style={styles.programsGrid}>
                                            {university.programs.map(program => (
                                                <Link
                                                    key={program._id}
                                                    to={`/programs/${program.slug}`}
                                                    style={styles.programCard}
                                                >
                                                    <div style={styles.programHeader}>
                                                        <span style={styles.programCategory}>{program.category}</span>
                                                        <span style={styles.programLevel}>{program.level}</span>
                                                    </div>
                                                    <h3 style={styles.programName}>{program.name}</h3>
                                                    <div style={styles.programMeta}>
                                                        <span>
                                                            <i className="fa-regular fa-clock"></i> {program.duration}
                                                        </span>
                                                        <span>
                                                            <i className="fa-solid fa-laptop"></i> {program.mode || 'Online'}
                                                        </span>
                                                    </div>
                                                    <div style={styles.programFooter}>
                                                        <span style={styles.programFee}>
                                                            ₹{Number(program.fee).toLocaleString('en-IN')}
                                                        </span>
                                                        <span style={styles.programLink}>
                                                            View <i className="fa-solid fa-arrow-right"></i>
                                                        </span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <p style={styles.noData}>No programs available yet.</p>
                                    )}
                                </div>
                            )}

                            {/* Facilities Tab */}
                            {activeTab === 'facilities' && (
                                <div style={styles.card}>
                                    <h2 style={styles.cardTitle}>
                                        <i className="fa-solid fa-building"></i> Facilities & Infrastructure
                                    </h2>
                                    {university.facilities && university.facilities.length > 0 ? (
                                        <div style={styles.facilitiesGrid}>
                                            {university.facilities.map((facility, i) => (
                                                <div key={i} style={styles.facilityItem}>
                                                    <i className="fa-solid fa-check" style={{ color: '#FF6B35' }}></i>
                                                    {facility}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p style={styles.noData}>Facility information coming soon.</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Right Column - Sticky Form */}
                        <div style={styles.rightColumn}>
                            <div style={styles.stickyForm}>
                                <EnquiryForm
                                    universityId={university._id}
                                    source="University Page"
                                />

                                {/* Quick Info Card */}
                                <div style={styles.quickInfoCard}>
                                    <h4 style={styles.quickInfoTitle}>Quick Info</h4>
                                    <div style={styles.quickInfoList}>
                                        <div style={styles.quickInfoItem}>
                                            <span style={styles.quickInfoLabel}>Type</span>
                                            <span style={styles.quickInfoValue}>Private University</span>
                                        </div>
                                        {university.establishedYear && (
                                            <div style={styles.quickInfoItem}>
                                                <span style={styles.quickInfoLabel}>Established</span>
                                                <span style={styles.quickInfoValue}>{university.establishedYear}</span>
                                            </div>
                                        )}
                                        <div style={styles.quickInfoItem}>
                                            <span style={styles.quickInfoLabel}>Location</span>
                                            <span style={styles.quickInfoValue}>{university.location}</span>
                                        </div>
                                        <div style={styles.quickInfoItem}>
                                            <span style={styles.quickInfoLabel}>Fee Range</span>
                                            <span style={styles.quickInfoValue}>
                                                ₹{Number(university.minFee || 0).toLocaleString('en-IN')} - ₹{Number(university.maxFee || 0).toLocaleString('en-IN')}
                                            </span>
                                        </div>
                                        {university.rating && (
                                            <div style={styles.quickInfoItem}>
                                                <span style={styles.quickInfoLabel}>NAAC Rating</span>
                                                <span style={{ ...styles.quickInfoValue, color: '#F59E0B', fontWeight: '700' }}>
                                                    {university.rating}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

const styles = {
    loading: {
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '15px',
        color: '#64748B'
    },
    error: {
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '15px',
        textAlign: 'center',
        padding: '20px'
    },
    backBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 24px',
        background: '#FF6B35',
        color: '#fff',
        borderRadius: '8px',
        textDecoration: 'none',
        fontWeight: '600',
        marginTop: '10px'
    },
    hero: {
        position: 'relative',
        background: '#0F172A'
    },
    heroBanner: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden'
    },
    heroBannerImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: 0.3
    },
    heroOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to bottom, rgba(15,23,42,0.7), rgba(15,23,42,0.95))'
    },
    heroContent: {
        position: 'relative',
        zIndex: 1,
        padding: '60px 20px 80px'
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto'
    },
    heroInfo: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '30px'
    },
    logoWrapper: {
        flexShrink: 0
    },
    heroLogo: {
        width: '120px',
        height: '120px',
        borderRadius: '16px',
        objectFit: 'contain',
        background: '#fff',
        padding: '10px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
    },
    heroText: {
        flex: 1
    },
    heroBadges: {
        display: 'flex',
        gap: '10px',
        marginBottom: '15px',
        flexWrap: 'wrap'
    },
    featuredBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        background: '#FEF3C7',
        color: '#D97706',
        padding: '6px 14px',
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: '600'
    },
    ratingBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        background: '#DCFCE7',
        color: '#16A34A',
        padding: '6px 14px',
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: '600'
    },
    heroTitle: {
        color: '#fff',
        fontSize: '2.2rem',
        fontWeight: '700',
        marginBottom: '5px',
        lineHeight: 1.3
    },
    heroShortName: {
        color: '#94A3B8',
        fontSize: '1rem',
        marginBottom: '10px'
    },
    heroLocation: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#CBD5E1',
        fontSize: '1rem',
        marginBottom: '25px'
    },
    heroStats: {
        display: 'flex',
        gap: '40px'
    },
    heroStat: {
        display: 'flex',
        flexDirection: 'column'
    },
    statValue: {
        color: '#FF6B35',
        fontSize: '1.5rem',
        fontWeight: '700'
    },
    statLabel: {
        color: '#94A3B8',
        fontSize: '0.85rem'
    },
    tabsSection: {
        background: '#fff',
        borderBottom: '1px solid #E2E8F0',
        position: 'sticky',
        top: '70px',
        zIndex: 100
    },
    tabs: {
        display: 'flex',
        gap: '5px',
        overflowX: 'auto',
        padding: '10px 0'
    },
    tab: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 24px',
        background: 'transparent',
        border: 'none',
        color: '#64748B',
        fontSize: '0.95rem',
        fontWeight: '500',
        cursor: 'pointer',
        borderRadius: '8px',
        whiteSpace: 'nowrap'
    },
    tabActive: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 24px',
        background: '#FFF7ED',
        border: 'none',
        color: '#FF6B35',
        fontSize: '0.95rem',
        fontWeight: '600',
        cursor: 'pointer',
        borderRadius: '8px',
        whiteSpace: 'nowrap'
    },
    mainSection: {
        padding: '40px 20px',
        background: '#F8FAFC'
    },
    contentGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 380px',
        gap: '40px',
        alignItems: 'start'
    },
    leftColumn: {
        display: 'flex',
        flexDirection: 'column',
        gap: '25px'
    },
    rightColumn: {},
    stickyForm: {
        position: 'sticky',
        top: '130px'
    },
    card: {
        background: '#fff',
        padding: '30px',
        borderRadius: '16px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
    },
    cardTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: '#0F172A',
        fontSize: '1.3rem',
        fontWeight: '600',
        marginBottom: '20px'
    },
    description: {
        color: '#475569',
        lineHeight: 1.8,
        fontSize: '1rem'
    },
    highlightsList: {
        listStyle: 'none',
        padding: 0,
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px'
    },
    highlightItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
        color: '#475569',
        fontSize: '0.95rem',
        lineHeight: 1.5
    },
    badgesGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px'
    },
    accreditationBadge: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: '#FEF3C7',
        color: '#92400E',
        padding: '10px 16px',
        borderRadius: '10px',
        fontSize: '0.9rem',
        fontWeight: '500'
    },
    approvalBadge: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: '#DCFCE7',
        color: '#166534',
        padding: '10px 16px',
        borderRadius: '10px',
        fontSize: '0.9rem',
        fontWeight: '500'
    },
    contactGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px'
    },
    contactItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        color: '#475569'
    },
    contactLabel: {
        display: 'block',
        color: '#94A3B8',
        fontSize: '0.8rem',
        marginBottom: '4px'
    },
    contactValue: {
        display: 'block',
        color: '#0F172A',
        fontSize: '0.95rem'
    },
    contactLink: {
        display: 'block',
        color: '#3B82F6',
        fontSize: '0.95rem',
        textDecoration: 'none'
    },
    programsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px'
    },
    programCard: {
        background: '#F8FAFC',
        padding: '20px',
        borderRadius: '12px',
        textDecoration: 'none',
        border: '1px solid #E2E8F0',
        transition: 'all 0.2s ease'
    },
    programHeader: {
        display: 'flex',
        gap: '8px',
        marginBottom: '12px'
    },
    programCategory: {
        background: '#DBEAFE',
        color: '#1D4ED8',
        padding: '4px 10px',
        borderRadius: '6px',
        fontSize: '0.75rem',
        fontWeight: '600'
    },
    programLevel: {
        background: '#F3E8FF',
        color: '#7C3AED',
        padding: '4px 10px',
        borderRadius: '6px',
        fontSize: '0.75rem'
    },
    programName: {
        color: '#0F172A',
        fontSize: '1rem',
        fontWeight: '600',
        marginBottom: '10px'
    },
    programMeta: {
        display: 'flex',
        gap: '15px',
        color: '#64748B',
        fontSize: '0.85rem',
        marginBottom: '15px'
    },
    programFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '12px',
        borderTop: '1px solid #E2E8F0'
    },
    programFee: {
        color: '#059669',
        fontSize: '1rem',
        fontWeight: '700'
    },
    programLink: {
        color: '#FF6B35',
        fontSize: '0.85rem',
        fontWeight: '600'
    },
    facilitiesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '15px'
    },
    facilityItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: '#F8FAFC',
        padding: '12px 16px',
        borderRadius: '10px',
        color: '#475569',
        fontSize: '0.9rem'
    },
    noData: {
        color: '#94A3B8',
        textAlign: 'center',
        padding: '40px'
    },
    quickInfoCard: {
        background: '#fff',
        padding: '25px',
        borderRadius: '16px',
        marginTop: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
    },
    quickInfoTitle: {
        color: '#0F172A',
        fontSize: '1.1rem',
        fontWeight: '600',
        marginBottom: '20px'
    },
    quickInfoList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    quickInfoItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '12px',
        borderBottom: '1px solid #F1F5F9'
    },
    quickInfoLabel: {
        color: '#64748B',
        fontSize: '0.9rem'
    },
    quickInfoValue: {
        color: '#0F172A',
        fontSize: '0.9rem',
        fontWeight: '500'
    }
};

// Responsive adjustments
if (window.innerWidth < 900) {
    styles.heroInfo.flexDirection = 'column';
    styles.heroInfo.alignItems = 'center';
    styles.heroInfo.textAlign = 'center';
    styles.contentGrid.gridTemplateColumns = '1fr';
    styles.highlightsList.gridTemplateColumns = '1fr';
    styles.contactGrid.gridTemplateColumns = '1fr';
    styles.programsGrid.gridTemplateColumns = '1fr';
    styles.facilitiesGrid.gridTemplateColumns = 'repeat(2, 1fr)';
}

export default UniversityDetail;