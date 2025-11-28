import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EnrollModal from '../components/EnrollModal';

const ProgramDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [program, setProgram] = useState(null);
    const [relatedPrograms, setRelatedPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showEnrollModal, setShowEnrollModal] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    const API_BASE = "http://localhost:5000/api";

    useEffect(() => {
        if (slug) {
            fetchProgramDetails();
        }
    }, [slug]);

    const fetchProgramDetails = async () => {
        try {
            setLoading(true);
            setError('');
            
            const res = await axios.get(`${API_BASE}/public/programs/${slug}`);
            setProgram(res.data);

            // Fetch related programs from same university or category
            if (res.data.universityId?._id) {
                try {
                    const relatedRes = await axios.get(`${API_BASE}/public/programs`, {
                        params: { 
                            category: res.data.category,
                            limit: 4
                        }
                    });
                    // Filter out current program
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

    const tabs = [
        { id: 'overview', label: 'Overview', icon: 'fa-info-circle' },
        { id: 'syllabus', label: 'Syllabus', icon: 'fa-book' },
        { id: 'career', label: 'Career Options', icon: 'fa-briefcase' },
        { id: 'eligibility', label: 'Eligibility', icon: 'fa-user-check' }
    ];

    if (loading) {
        return (
            <>
                <Navbar />
                <div style={styles.loadingContainer}>
                    <div style={styles.spinner}></div>
                    <p>Loading program details...</p>
                </div>
                <Footer />
            </>
        );
    }

    if (error || !program) {
        return (
            <>
                <Navbar />
                <div style={styles.errorContainer}>
                    <i className="fa-solid fa-exclamation-circle" style={styles.errorIcon}></i>
                    <h2>Program Not Found</h2>
                    <p>The program you're looking for doesn't exist or has been removed.</p>
                    <Link to="/programs" style={styles.backButton}>
                        <i className="fa-solid fa-arrow-left"></i> Back to Programs
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
            <Navbar />

            {/* Hero Section */}
            <section style={styles.hero}>
                <div style={styles.heroOverlay}></div>
                <div style={styles.heroContent}>
                    <div style={styles.breadcrumb}>
                        <Link to="/" style={styles.breadcrumbLink}>Home</Link>
                        <span style={styles.breadcrumbSeparator}>/</span>
                        <Link to="/programs" style={styles.breadcrumbLink}>Programs</Link>
                        <span style={styles.breadcrumbSeparator}>/</span>
                        <span style={styles.breadcrumbCurrent}>{program.name}</span>
                    </div>

                    <div style={styles.heroMain}>
                        <div style={styles.heroLeft}>
                            <div style={styles.programBadges}>
                                <span style={styles.categoryBadge}>{program.category}</span>
                                <span style={styles.modeBadge}>{program.mode}</span>
                                {program.featured && (
                                    <span style={styles.featuredBadge}>
                                        <i className="fa-solid fa-star"></i> Featured
                                    </span>
                                )}
                            </div>

                            <h1 style={styles.programTitle}>{program.name}</h1>

                            {university.name && (
                                <Link 
                                    to={university.slug ? `/universities/${university.slug}` : '#'} 
                                    style={styles.universityLink}
                                >
                                    {university.logo && (
                                        <img
                                            src={university.logo}
                                            alt={university.name}
                                            style={styles.universityLogo}
                                            onError={(e) => e.target.style.display = 'none'}
                                        />
                                    )}
                                    <span>{university.name}</span>
                                    {university.rating && (
                                        <span style={styles.ratingBadge}>
                                            <i className="fa-solid fa-star"></i> NAAC {university.rating}
                                        </span>
                                    )}
                                </Link>
                            )}

                            <div style={styles.programMeta}>
                                <div style={styles.metaItem}>
                                    <i className="fa-solid fa-clock"></i>
                                    <span>{program.duration}</span>
                                </div>
                                <div style={styles.metaItem}>
                                    <i className="fa-solid fa-layer-group"></i>
                                    <span>{program.level}</span>
                                </div>
                                <div style={styles.metaItem}>
                                    <i className="fa-solid fa-laptop"></i>
                                    <span>{program.mode}</span>
                                </div>
                            </div>
                        </div>

                        <div style={styles.heroRight}>
                            <div style={styles.feeCard}>
                                <div style={styles.feeHeader}>
                                    <span style={styles.feeLabel}>Program Fee</span>
                                    <span style={styles.feeAmount}>
                                        ₹{Number(program.fee).toLocaleString('en-IN')}
                                    </span>
                                    <span style={styles.feePeriod}>{program.feePeriod}</span>
                                </div>

                                <div style={styles.feeFeatures}>
                                    <div style={styles.feeFeature}>
                                        <i className="fa-solid fa-check"></i>
                                        <span>EMI Options Available</span>
                                    </div>
                                    <div style={styles.feeFeature}>
                                        <i className="fa-solid fa-check"></i>
                                        <span>Scholarships Available</span>
                                    </div>
                                    <div style={styles.feeFeature}>
                                        <i className="fa-solid fa-check"></i>
                                        <span>No Cost EMI</span>
                                    </div>
                                </div>

                                <button
                                    style={styles.enrollButton}
                                    onClick={() => setShowEnrollModal(true)}
                                >
                                    <i className="fa-solid fa-paper-plane"></i>
                                    Enroll Now
                                </button>

                                {program.brochureUrl && (
                                    <a
                                        href={program.brochureUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={styles.brochureButton}
                                    >
                                        <i className="fa-solid fa-download"></i>
                                        Download Brochure
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section style={styles.mainSection}>
                <div style={styles.container}>
                    <div style={styles.contentGrid}>
                        {/* Left Content */}
                        <div style={styles.leftContent}>
                            {/* YouTube Video */}
                            {videoId && (
                                <div style={styles.videoSection}>
                                    <h2 style={styles.sectionTitle}>
                                        <i className="fa-brands fa-youtube" style={{ color: '#FF0000' }}></i>
                                        Program Overview Video
                                    </h2>
                                    <div style={styles.videoContainer}>
                                        <iframe
                                            src={`https://www.youtube.com/embed/${videoId}`}
                                            title="Program Video"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            style={styles.videoIframe}
                                        ></iframe>
                                    </div>
                                </div>
                            )}

                            {/* Tabs */}
                            <div style={styles.tabsContainer}>
                                <div style={styles.tabs}>
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            style={{
                                                ...styles.tab,
                                                ...(activeTab === tab.id ? styles.tabActive : {})
                                            }}
                                            onClick={() => setActiveTab(tab.id)}
                                        >
                                            <i className={`fa-solid ${tab.icon}`}></i>
                                            <span>{tab.label}</span>
                                        </button>
                                    ))}
                                </div>

                                <div style={styles.tabContent}>
                                    {/* Overview Tab */}
                                    {activeTab === 'overview' && (
                                        <div>
                                            <h3 style={styles.tabTitle}>About This Program</h3>
                                            <p style={styles.description}>{program.description}</p>

                                            {program.highlights && program.highlights.length > 0 && (
                                                <div style={styles.highlightsSection}>
                                                    <h4 style={styles.subTitle}>Program Highlights</h4>
                                                    <div style={styles.highlightsGrid}>
                                                        {program.highlights.map((highlight, index) => (
                                                            <div key={index} style={styles.highlightItem}>
                                                                <i className="fa-solid fa-check-circle" style={styles.highlightIcon}></i>
                                                                <span>{highlight}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {program.specializations && program.specializations.length > 0 && (
                                                <div style={styles.specializationsSection}>
                                                    <h4 style={styles.subTitle}>Available Specializations</h4>
                                                    <div style={styles.tagsContainer}>
                                                        {program.specializations.map((spec, index) => (
                                                            <span key={index} style={styles.tag}>{spec}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Syllabus Tab */}
                                    {activeTab === 'syllabus' && (
                                        <div>
                                            <h3 style={styles.tabTitle}>Course Syllabus</h3>
                                            {program.syllabus && program.syllabus.length > 0 ? (
                                                <div style={styles.syllabusGrid}>
                                                    {program.syllabus.map((subject, index) => (
                                                        <div key={index} style={styles.syllabusItem}>
                                                            <span style={styles.syllabusNumber}>{index + 1}</span>
                                                            <span style={styles.syllabusText}>{subject}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p style={styles.noData}>Syllabus details will be provided upon enquiry.</p>
                                            )}
                                        </div>
                                    )}

                                    {/* Career Tab */}
                                    {activeTab === 'career' && (
                                        <div>
                                            <h3 style={styles.tabTitle}>Career Opportunities</h3>
                                            {program.careerOptions && program.careerOptions.length > 0 ? (
                                                <div style={styles.careerGrid}>
                                                    {program.careerOptions.map((career, index) => (
                                                        <div key={index} style={styles.careerItem}>
                                                            <i className="fa-solid fa-briefcase" style={styles.careerIcon}></i>
                                                            <span>{career}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p style={styles.noData}>Career information will be provided upon enquiry.</p>
                                            )}
                                        </div>
                                    )}

                                    {/* Eligibility Tab */}
                                    {activeTab === 'eligibility' && (
                                        <div>
                                            <h3 style={styles.tabTitle}>Eligibility Criteria</h3>
                                            <div style={styles.eligibilityBox}>
                                                <i className="fa-solid fa-user-graduate" style={styles.eligibilityIcon}></i>
                                                <p style={styles.eligibilityText}>
                                                    {program.eligibility || 'Please contact us for eligibility details.'}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div style={styles.rightSidebar}>
                            {/* University Card */}
                            {university.name && (
                                <div style={styles.sidebarCard}>
                                    <h3 style={styles.sidebarTitle}>
                                        <i className="fa-solid fa-building-columns"></i>
                                        University
                                    </h3>
                                    <div style={styles.universityCard}>
                                        {university.logo && (
                                            <img
                                                src={university.logo}
                                                alt={university.name}
                                                style={styles.uniCardLogo}
                                                onError={(e) => e.target.style.display = 'none'}
                                            />
                                        )}
                                        <h4 style={styles.uniCardName}>{university.name}</h4>
                                        {university.location && (
                                            <p style={styles.uniCardLocation}>
                                                <i className="fa-solid fa-location-dot"></i>
                                                {university.location}
                                            </p>
                                        )}
                                        {university.slug && (
                                            <Link to={`/universities/${university.slug}`} style={styles.viewUniBtn}>
                                                View University <i className="fa-solid fa-arrow-right"></i>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Quick Info */}
                            <div style={styles.sidebarCard}>
                                <h3 style={styles.sidebarTitle}>
                                    <i className="fa-solid fa-info-circle"></i>
                                    Quick Info
                                </h3>
                                <div style={styles.quickInfo}>
                                    <div style={styles.quickInfoItem}>
                                        <span style={styles.quickInfoLabel}>Duration</span>
                                        <span style={styles.quickInfoValue}>{program.duration}</span>
                                    </div>
                                    <div style={styles.quickInfoItem}>
                                        <span style={styles.quickInfoLabel}>Level</span>
                                        <span style={styles.quickInfoValue}>{program.level}</span>
                                    </div>
                                    <div style={styles.quickInfoItem}>
                                        <span style={styles.quickInfoLabel}>Mode</span>
                                        <span style={styles.quickInfoValue}>{program.mode}</span>
                                    </div>
                                    <div style={styles.quickInfoItem}>
                                        <span style={styles.quickInfoLabel}>Category</span>
                                        <span style={styles.quickInfoValue}>{program.category}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Need Help */}
                            <div style={styles.helpCard}>
                                <div style={styles.helpIcon}>
                                    <i className="fa-solid fa-headset"></i>
                                </div>
                                <h3 style={styles.helpTitle}>Need Help?</h3>
                                <p style={styles.helpText}>Our counselors are here to help you</p>
                                <a href="tel:+919999999999" style={styles.helpButton}>
                                    <i className="fa-solid fa-phone"></i>
                                    Call Now
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Related Programs */}
                    {relatedPrograms.length > 0 && (
                        <div style={styles.relatedSection}>
                            <h2 style={styles.relatedTitle}>Similar Programs</h2>
                            <div style={styles.relatedGrid}>
                                {relatedPrograms.map((prog) => (
                                    <Link
                                        key={prog._id}
                                        to={`/programs/${prog.slug}`}
                                        style={styles.relatedCard}
                                    >
                                        <div style={styles.relatedBadges}>
                                            <span style={styles.relatedCategory}>{prog.category}</span>
                                        </div>
                                        <h3 style={styles.relatedName}>{prog.name}</h3>
                                        <p style={styles.relatedUni}>
                                            {prog.universityId?.name || 'University'}
                                        </p>
                                        <div style={styles.relatedMeta}>
                                            <span>{prog.duration}</span>
                                            <span>₹{Number(prog.fee).toLocaleString('en-IN')}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
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

const styles = {
    // Loading & Error
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        color: '#64748B'
    },
    spinner: {
        width: '50px',
        height: '50px',
        border: '4px solid #E2E8F0',
        borderTopColor: '#FF6B35',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '20px'
    },
    errorContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        padding: '20px'
    },
    errorIcon: {
        fontSize: '4rem',
        color: '#EF4444',
        marginBottom: '20px'
    },
    backButton: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 24px',
        background: '#FF6B35',
        color: '#fff',
        borderRadius: '10px',
        textDecoration: 'none',
        marginTop: '20px'
    },

    // Hero
    hero: {
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        padding: '100px 20px 60px',
        position: 'relative'
    },
    heroOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
    },
    heroContent: {
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
    },
    breadcrumb: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '30px',
        flexWrap: 'wrap'
    },
    breadcrumbLink: {
        color: '#94A3B8',
        textDecoration: 'none',
        fontSize: '0.9rem'
    },
    breadcrumbSeparator: {
        color: '#475569'
    },
    breadcrumbCurrent: {
        color: '#fff',
        fontSize: '0.9rem'
    },
    heroMain: {
        display: 'grid',
        gridTemplateColumns: '1fr 380px',
        gap: '40px',
        alignItems: 'start'
    },
    heroLeft: {},
    programBadges: {
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        flexWrap: 'wrap'
    },
    categoryBadge: {
        background: '#3B82F6',
        color: '#fff',
        padding: '6px 16px',
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: '600'
    },
    modeBadge: {
        background: '#10B981',
        color: '#fff',
        padding: '6px 16px',
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: '600'
    },
    featuredBadge: {
        background: 'linear-gradient(135deg, #F59E0B, #D97706)',
        color: '#fff',
        padding: '6px 16px',
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
    },
    programTitle: {
        color: '#fff',
        fontSize: '2.2rem',
        fontWeight: '800',
        marginBottom: '20px',
        lineHeight: 1.3
    },
    universityLink: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        color: '#94A3B8',
        textDecoration: 'none',
        marginBottom: '25px',
        padding: '10px 15px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '10px'
    },
    universityLogo: {
        width: '40px',
        height: '40px',
        borderRadius: '8px',
        objectFit: 'contain',
        background: '#fff'
    },
    ratingBadge: {
        background: '#FEF3C7',
        color: '#D97706',
        padding: '4px 10px',
        borderRadius: '6px',
        fontSize: '0.75rem',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
    },
    programMeta: {
        display: 'flex',
        gap: '25px',
        flexWrap: 'wrap'
    },
    metaItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#CBD5E1',
        fontSize: '0.95rem'
    },
    heroRight: {},
    feeCard: {
        background: '#fff',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
    },
    feeHeader: {
        textAlign: 'center',
        marginBottom: '25px',
        paddingBottom: '20px',
        borderBottom: '1px solid #E2E8F0'
    },
    feeLabel: {
        display: 'block',
        color: '#64748B',
        fontSize: '0.9rem',
        marginBottom: '5px'
    },
    feeAmount: {
        display: 'block',
        color: '#059669',
        fontSize: '2.5rem',
        fontWeight: '800'
    },
    feePeriod: {
        color: '#64748B',
        fontSize: '0.85rem'
    },
    feeFeatures: {
        marginBottom: '25px'
    },
    feeFeature: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: '#334155',
        fontSize: '0.9rem',
        marginBottom: '12px'
    },
    enrollButton: {
        width: '100%',
        padding: '16px',
        background: 'linear-gradient(135deg, #FF6B35 0%, #FF8B5C 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: '12px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '12px'
    },
    brochureButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        width: '100%',
        padding: '14px',
        background: '#F1F5F9',
        color: '#334155',
        borderRadius: '12px',
        textDecoration: 'none',
        fontSize: '0.95rem',
        fontWeight: '600'
    },

    // Main Section
    mainSection: {
        padding: '60px 20px',
        background: '#F8FAFC'
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto'
    },
    contentGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 350px',
        gap: '40px'
    },
    leftContent: {},

    // Video Section
    videoSection: {
        marginBottom: '40px'
    },
    sectionTitle: {
        color: '#0F172A',
        fontSize: '1.3rem',
        fontWeight: '700',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    videoContainer: {
        position: 'relative',
        paddingBottom: '56.25%',
        height: 0,
        overflow: 'hidden',
        borderRadius: '16px',
        background: '#000'
    },
    videoIframe: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },

    // Tabs
    tabsContainer: {
        background: '#fff',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
    },
    tabs: {
        display: 'flex',
        borderBottom: '1px solid #E2E8F0',
        overflowX: 'auto'
    },
    tab: {
        flex: 1,
        padding: '18px 20px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        color: '#64748B',
        fontSize: '0.95rem',
        fontWeight: '500',
        whiteSpace: 'nowrap',
        transition: 'all 0.2s ease'
    },
    tabActive: {
        color: '#FF6B35',
        background: '#FFF7ED',
        borderBottom: '3px solid #FF6B35'
    },
    tabContent: {
        padding: '30px'
    },
    tabTitle: {
        color: '#0F172A',
        fontSize: '1.2rem',
        fontWeight: '700',
        marginBottom: '20px'
    },
    description: {
        color: '#475569',
        fontSize: '1rem',
        lineHeight: 1.8,
        marginBottom: '30px'
    },
    subTitle: {
        color: '#0F172A',
        fontSize: '1rem',
        fontWeight: '600',
        marginBottom: '15px'
    },
    highlightsSection: {
        marginBottom: '30px'
    },
    highlightsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px'
    },
    highlightItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
        color: '#334155',
        fontSize: '0.95rem'
    },
    highlightIcon: {
        color: '#10B981',
        marginTop: '3px'
    },
    specializationsSection: {},
    tagsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px'
    },
    tag: {
        background: '#E0E7FF',
        color: '#4338CA',
        padding: '8px 16px',
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: '500'
    },
    syllabusGrid: {
        display: 'grid',
        gap: '12px'
    },
    syllabusItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        padding: '15px',
        background: '#F8FAFC',
        borderRadius: '10px'
    },
    syllabusNumber: {
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        background: '#FF6B35',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.85rem',
        fontWeight: '600',
        flexShrink: 0
    },
    syllabusText: {
        color: '#334155',
        fontSize: '0.95rem'
    },
    careerGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '15px'
    },
    careerItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '15px',
        background: '#F8FAFC',
        borderRadius: '10px',
        color: '#334155',
        fontSize: '0.95rem'
    },
    careerIcon: {
        color: '#FF6B35'
    },
    eligibilityBox: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '20px',
        padding: '25px',
        background: '#F0FDF4',
        borderRadius: '12px',
        border: '1px solid #BBF7D0'
    },
    eligibilityIcon: {
        fontSize: '2rem',
        color: '#10B981'
    },
    eligibilityText: {
        color: '#166534',
        fontSize: '1rem',
        lineHeight: 1.7,
        margin: 0
    },
    noData: {
        color: '#64748B',
        fontStyle: 'italic'
    },

    // Sidebar
    rightSidebar: {},
    sidebarCard: {
        background: '#fff',
        borderRadius: '16px',
        padding: '25px',
        marginBottom: '25px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
    },
    sidebarTitle: {
        color: '#0F172A',
        fontSize: '1rem',
        fontWeight: '700',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    universityCard: {
        textAlign: 'center'
    },
    uniCardLogo: {
        width: '80px',
        height: '80px',
        borderRadius: '12px',
        objectFit: 'contain',
        marginBottom: '15px',
        background: '#F8FAFC',
        padding: '10px'
    },
    uniCardName: {
        color: '#0F172A',
        fontSize: '1rem',
        fontWeight: '600',
        marginBottom: '8px'
    },
    uniCardLocation: {
        color: '#64748B',
        fontSize: '0.85rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        marginBottom: '15px'
    },
    viewUniBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        color: '#FF6B35',
        fontSize: '0.9rem',
        fontWeight: '600',
        textDecoration: 'none'
    },
    quickInfo: {},
    quickInfoItem: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '12px 0',
        borderBottom: '1px solid #E2E8F0'
    },
    quickInfoLabel: {
        color: '#64748B',
        fontSize: '0.9rem'
    },
    quickInfoValue: {
        color: '#0F172A',
        fontSize: '0.9rem',
        fontWeight: '600'
    },
    helpCard: {
        background: 'linear-gradient(135deg, #FF6B35 0%, #FF8B5C 100%)',
        borderRadius: '16px',
        padding: '30px',
        textAlign: 'center'
    },
    helpIcon: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 15px',
        fontSize: '1.5rem',
        color: '#fff'
    },
    helpTitle: {
        color: '#fff',
        fontSize: '1.1rem',
        fontWeight: '700',
        marginBottom: '8px'
    },
    helpText: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: '0.9rem',
        marginBottom: '20px'
    },
    helpButton: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 25px',
        background: '#fff',
        color: '#FF6B35',
        borderRadius: '10px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '0.95rem'
    },

    // Related Programs
    relatedSection: {
        marginTop: '60px'
    },
    relatedTitle: {
        color: '#0F172A',
        fontSize: '1.5rem',
        fontWeight: '700',
        marginBottom: '25px'
    },
    relatedGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '25px'
    },
    relatedCard: {
        background: '#fff',
        borderRadius: '16px',
        padding: '25px',
        textDecoration: 'none',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        transition: 'transform 0.2s ease'
    },
    relatedBadges: {
        marginBottom: '15px'
    },
    relatedCategory: {
        background: '#DBEAFE',
        color: '#1D4ED8',
        padding: '5px 12px',
        borderRadius: '6px',
        fontSize: '0.8rem',
        fontWeight: '600'
    },
    relatedName: {
        color: '#0F172A',
        fontSize: '1rem',
        fontWeight: '600',
        marginBottom: '8px'
    },
    relatedUni: {
        color: '#64748B',
        fontSize: '0.85rem',
        marginBottom: '15px'
    },
    relatedMeta: {
        display: 'flex',
        justifyContent: 'space-between',
        color: '#64748B',
        fontSize: '0.85rem'
    }
};

// Add CSS animation for spinner
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(styleSheet);

export default ProgramDetail;