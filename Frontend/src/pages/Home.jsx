import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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

    const API_BASE = "http://localhost:5000/api";

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [uniRes, progRes] = await Promise.all([
                axios.get(`${API_BASE}/public/universities`),
                axios.get(`${API_BASE}/public/programs`)
            ]);
            setUniversities(uniRes.data.filter(u => u.featured).slice(0, 4));
            setPrograms(progRes.data.filter(p => p.featured).slice(0, 6));
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

    const testimonials = [
        {
            name: 'Rahul Sharma',
            program: 'MBA - Finance',
            university: 'Amity University',
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
            text: 'The online MBA program helped me advance my career while working full-time. The flexibility and quality of education exceeded my expectations.'
        },
        {
            name: 'Priya Patel',
            program: 'MCA',
            university: 'LPU Online',
            image: 'https://randomuser.me/api/portraits/women/44.jpg',
            text: 'Excellent curriculum and supportive faculty. I landed my dream job at a top tech company right after completing my degree.'
        },
        {
            name: 'Amit Kumar',
            program: 'BBA',
            university: 'Manipal University',
            image: 'https://randomuser.me/api/portraits/men/67.jpg',
            text: 'The practical approach to learning and industry-relevant projects made all the difference. Highly recommend Edufolio!'
        }
    ];

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <section style={styles.hero}>
                <div style={styles.heroBackground}></div>
                <div style={styles.heroContent}>
                    <span style={styles.heroBadge}>
                        <i className="fa-solid fa-star"></i> India's #1 Online Education Platform
                    </span>
                    <h1 style={styles.heroTitle}>
                        Transform Your Career with{' '}
                        <span style={styles.highlight}>Online Degrees</span>
                    </h1>
                    <p style={styles.heroSubtitle}>
                        Get UGC-approved degrees from India's top universities. 
                        Study at your own pace, from anywhere in the world.
                    </p>
                    <div style={styles.heroButtons}>
                        <Link to="/programs" style={styles.primaryBtn}>
                            <i className="fa-solid fa-graduation-cap"></i>
                            Explore Programs
                        </Link>
                        <Link to="/universities" style={styles.secondaryBtn}>
                            <i className="fa-solid fa-building-columns"></i>
                            View Universities
                        </Link>
                    </div>
                    
                    {/* Stats */}
                    <div style={styles.statsContainer}>
                        {stats.map((stat, index) => (
                            <div key={index} style={styles.statItem}>
                                <i className={`fa-solid ${stat.icon}`} style={styles.statIcon}></i>
                                <span style={styles.statNumber}>{stat.number}</span>
                                <span style={styles.statLabel}>{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section style={styles.featuresSection}>
                <div style={styles.container}>
                    <div style={styles.featuresGrid}>
                        {features.map((feature, index) => (
                            <div key={index} style={styles.featureCard}>
                                <div style={styles.featureIcon}>
                                    <i className={`fa-solid ${feature.icon}`}></i>
                                </div>
                                <h3 style={styles.featureTitle}>{feature.title}</h3>
                                <p style={styles.featureDesc}>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Programs Section */}
            <section style={styles.programsSection}>
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                        <span style={styles.sectionBadge}>
                            <i className="fa-solid fa-fire"></i> Trending
                        </span>
                        <h2 style={styles.sectionTitle}>Featured Programs</h2>
                        <p style={styles.sectionSubtitle}>
                            Most popular programs chosen by our students
                        </p>
                    </div>

                    {loading ? (
                        <div style={styles.loading}>
                            <div style={styles.spinner}></div>
                            <span>Loading programs...</span>
                        </div>
                    ) : programs.length > 0 ? (
                        <div style={styles.programsGrid}>
                            {programs.map((program) => (
                                <div key={program._id} style={styles.programCard}>
                                    {program.featured && (
                                        <span style={styles.featuredBadge}>
                                            <i className="fa-solid fa-star"></i> Featured
                                        </span>
                                    )}
                                    
                                    <div style={styles.programHeader}>
                                        <span style={styles.categoryBadge}>{program.category}</span>
                                        <span style={styles.modeBadge}>{program.mode}</span>
                                    </div>
                                    
                                    <h3 style={styles.programTitle}>{program.name}</h3>
                                    
                                    <p style={styles.programUniversity}>
                                        <i className="fa-solid fa-building-columns"></i>
                                        {program.universityId?.name || 'University'}
                                    </p>
                                    
                                    <div style={styles.programMeta}>
                                        <span style={styles.metaItem}>
                                            <i className="fa-solid fa-clock"></i> {program.duration}
                                        </span>
                                        <span style={styles.metaItem}>
                                            <i className="fa-solid fa-layer-group"></i> {program.level}
                                        </span>
                                    </div>
                                    
                                    <div style={styles.programFee}>
                                        <div>
                                            <span style={styles.feeLabel}>Total Fee</span>
                                            <span style={styles.feeAmount}>
                                                ₹{Number(program.fee).toLocaleString('en-IN')}
                                            </span>
                                        </div>
                                        <span style={styles.emiText}>EMI Available</span>
                                    </div>
                                    
                                    <div style={styles.programActions}>
                                        <Link 
                                            to={`/programs/${program.slug}`} 
                                            style={styles.viewDetailsBtn}
                                        >
                                            View Details
                                        </Link>
                                        <button 
                                            style={styles.enrollNowBtn}
                                            onClick={() => handleEnrollClick(program)}
                                        >
                                            <i className="fa-solid fa-paper-plane"></i> Enroll Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={styles.noData}>
                            <i className="fa-solid fa-graduation-cap" style={styles.noDataIcon}></i>
                            <p>No programs available</p>
                        </div>
                    )}

                    <div style={styles.viewAllContainer}>
                        <Link to="/programs" style={styles.viewAllBtn}>
                            View All Programs <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Universities Section */}
            <section style={styles.universitiesSection}>
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                        <span style={styles.sectionBadge}>
                            <i className="fa-solid fa-award"></i> Top Rated
                        </span>
                        <h2 style={styles.sectionTitle}>Partner Universities</h2>
                        <p style={styles.sectionSubtitle}>
                            Learn from India's most prestigious institutions
                        </p>
                    </div>

                    {loading ? (
                        <div style={styles.loading}>
                            <div style={styles.spinner}></div>
                            <span>Loading universities...</span>
                        </div>
                    ) : universities.length > 0 ? (
                        <div style={styles.universitiesGrid}>
                            {universities.map((university) => (
                                <Link
                                    key={university._id}
                                    to={`/universities/${university.slug}`}
                                    style={styles.universityCard}
                                >
                                    {university.featured && (
                                        <span style={styles.universityFeaturedBadge}>Featured</span>
                                    )}
                                    <div style={styles.universityLogo}>
                                        <img
                                            src={university.logo || 'https://placehold.co/100x100?text=Logo'}
                                            alt={university.name}
                                            style={styles.logoImg}
                                            onError={(e) => {
                                                e.target.src = 'https://placehold.co/100x100?text=Logo';
                                            }}
                                        />
                                    </div>
                                    <h3 style={styles.universityName}>{university.name}</h3>
                                    <p style={styles.universityLocation}>
                                        <i className="fa-solid fa-location-dot"></i>
                                        {university.location}
                                    </p>
                                    <div style={styles.universityMeta}>
                                        {university.rating && (
                                            <span style={styles.ratingBadge}>
                                                <i className="fa-solid fa-star"></i> NAAC {university.rating}
                                            </span>
                                        )}
                                    </div>
                                    <div style={styles.universityPrograms}>
                                        <span>10+ Programs</span>
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div style={styles.noData}>
                            <i className="fa-solid fa-building-columns" style={styles.noDataIcon}></i>
                            <p>No universities available</p>
                        </div>
                    )}

                    <div style={styles.viewAllContainer}>
                        <Link to="/universities" style={styles.viewAllBtn}>
                            View All Universities <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section style={styles.whySection}>
                <div style={styles.container}>
                    <div style={styles.whyContent}>
                        <div style={styles.whyLeft}>
                            <span style={styles.sectionBadgeAlt}>
                                <i className="fa-solid fa-question"></i> Why Edufolio
                            </span>
                            <h2 style={styles.whyTitle}>
                                Why Students Choose Us?
                            </h2>
                            <p style={styles.whyDesc}>
                                We partner with India's top universities to bring you 
                                quality education at your doorstep. Our platform makes 
                                it easy to find, compare, and enroll in the perfect program.
                            </p>
                            
                            <div style={styles.whyFeatures}>
                                <div style={styles.whyFeature}>
                                    <div style={styles.whyFeatureIcon}>
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                    <div>
                                        <h4 style={styles.whyFeatureTitle}>Expert Counseling</h4>
                                        <p style={styles.whyFeatureDesc}>
                                            Free guidance from education experts
                                        </p>
                                    </div>
                                </div>
                                <div style={styles.whyFeature}>
                                    <div style={styles.whyFeatureIcon}>
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                    <div>
                                        <h4 style={styles.whyFeatureTitle}>Easy Application</h4>
                                        <p style={styles.whyFeatureDesc}>
                                            Simple enrollment process with full support
                                        </p>
                                    </div>
                                </div>
                                <div style={styles.whyFeature}>
                                    <div style={styles.whyFeatureIcon}>
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                    <div>
                                        <h4 style={styles.whyFeatureTitle}>Scholarship Support</h4>
                                        <p style={styles.whyFeatureDesc}>
                                            Help with scholarships and financial aid
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div style={styles.whyRight}>
                            <div style={styles.whyCard}>
                                <div style={styles.whyCardIcon}>
                                    <i className="fa-solid fa-phone"></i>
                                </div>
                                <h3 style={styles.whyCardTitle}>Need Help Choosing?</h3>
                                <p style={styles.whyCardDesc}>
                                    Talk to our expert counselors for free guidance
                                </p>
                                <a href="tel:+919999999999" style={styles.whyCardBtn}>
                                    <i className="fa-solid fa-phone"></i>
                                    Call Now: +91 99999 99999
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section style={styles.testimonialsSection}>
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                        <span style={styles.sectionBadge}>
                            <i className="fa-solid fa-quote-left"></i> Testimonials
                        </span>
                        <h2 style={styles.sectionTitle}>What Our Students Say</h2>
                        <p style={styles.sectionSubtitle}>
                            Success stories from our alumni
                        </p>
                    </div>

                    <div style={styles.testimonialsGrid}>
                        {testimonials.map((testimonial, index) => (
                            <div key={index} style={styles.testimonialCard}>
                                <div style={styles.testimonialQuote}>
                                    <i className="fa-solid fa-quote-left"></i>
                                </div>
                                <p style={styles.testimonialText}>{testimonial.text}</p>
                                <div style={styles.testimonialAuthor}>
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        style={styles.testimonialImage}
                                    />
                                    <div>
                                        <h4 style={styles.testimonialName}>{testimonial.name}</h4>
                                        <p style={styles.testimonialProgram}>{testimonial.program}</p>
                                        <p style={styles.testimonialUniversity}>{testimonial.university}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={styles.ctaSection}>
                <div style={styles.container}>
                    <div style={styles.ctaContent}>
                        <h2 style={styles.ctaTitle}>Ready to Start Your Journey?</h2>
                        <p style={styles.ctaDesc}>
                            Take the first step towards your dream career. 
                            Our counselors are here to help you choose the right path.
                        </p>
                        <div style={styles.ctaButtons}>
                            <Link to="/programs" style={styles.ctaPrimaryBtn}>
                                <i className="fa-solid fa-graduation-cap"></i>
                                Browse Programs
                            </Link>
                            <Link to="/contact" style={styles.ctaSecondaryBtn}>
                                <i className="fa-solid fa-phone"></i>
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Finder Floating Button */}
            <CourseFinder />

            {/* Enroll Modal */}
            <EnrollModal
                isOpen={showEnrollModal}
                onClose={() => setShowEnrollModal(false)}
                program={selectedProgram}
                university={selectedProgram?.universityId}
            />

            <Footer />
        </>
    );
};

// Edufolio Brand Colors
const colors = {
    primaryDark: '#1E3A5F',
    primaryMaroon: '#8B2346',
    accentBlue: '#4A90A4',
    accentPink: '#C4567A',
    textLight: '#A8C5E2',
    bgLight: '#F5F7FA',
    bgDark: '#152A45'
};

const styles = {
    // Hero Section
    hero: {
        background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.bgDark} 100%)`,
        padding: '120px 20px 80px',
        position: 'relative',
        overflow: 'hidden'
    },
    heroBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    },
    heroContent: {
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
    },
    heroBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: `rgba(139, 35, 70, 0.3)`,
        color: colors.accentPink,
        padding: '10px 20px',
        borderRadius: '30px',
        fontSize: '0.9rem',
        fontWeight: '600',
        marginBottom: '25px'
    },
    heroTitle: {
        color: '#fff',
        fontSize: '3.2rem',
        fontWeight: '800',
        lineHeight: 1.2,
        marginBottom: '20px',
        maxWidth: '900px',
        margin: '0 auto 20px'
    },
    highlight: {
        background: `linear-gradient(135deg, ${colors.accentPink}, ${colors.accentBlue})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
    },
    heroSubtitle: {
        color: colors.textLight,
        fontSize: '1.2rem',
        lineHeight: 1.7,
        maxWidth: '700px',
        margin: '0 auto 35px'
    },
    heroButtons: {
        display: 'flex',
        gap: '15px',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: '60px'
    },
    primaryBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '16px 32px',
        background: `linear-gradient(135deg, ${colors.primaryMaroon} 0%, ${colors.accentPink} 100%)`,
        color: '#fff',
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '1rem',
        boxShadow: '0 4px 20px rgba(139, 35, 70, 0.4)',
        transition: 'transform 0.2s ease'
    },
    secondaryBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '16px 32px',
        background: 'rgba(255, 255, 255, 0.1)',
        color: '#fff',
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '1rem',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        transition: 'all 0.2s ease'
    },
    statsContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '50px',
        flexWrap: 'wrap'
    },
    statItem: {
        textAlign: 'center'
    },
    statIcon: {
        fontSize: '1.5rem',
        color: colors.accentPink,
        marginBottom: '10px',
        display: 'block'
    },
    statNumber: {
        display: 'block',
        color: '#fff',
        fontSize: '2rem',
        fontWeight: '800',
        marginBottom: '5px'
    },
    statLabel: {
        color: colors.textLight,
        fontSize: '0.9rem'
    },

    // Features Section
    featuresSection: {
        padding: '80px 20px',
        background: '#fff'
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto'
    },
    featuresGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '30px'
    },
    featureCard: {
        textAlign: 'center',
        padding: '30px 20px',
        borderRadius: '16px',
        transition: 'all 0.3s ease',
        border: '1px solid transparent'
    },
    featureIcon: {
        width: '70px',
        height: '70px',
        borderRadius: '20px',
        background: `linear-gradient(135deg, ${colors.primaryMaroon}15, ${colors.accentPink}15)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
        fontSize: '1.5rem',
        color: colors.primaryMaroon
    },
    featureTitle: {
        color: colors.primaryDark,
        fontSize: '1.1rem',
        fontWeight: '700',
        marginBottom: '10px'
    },
    featureDesc: {
        color: '#64748B',
        fontSize: '0.95rem',
        lineHeight: 1.6,
        margin: 0
    },

    // Programs Section
    programsSection: {
        padding: '80px 20px',
        background: colors.bgLight
    },
    sectionHeader: {
        textAlign: 'center',
        marginBottom: '50px'
    },
    sectionBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: `${colors.primaryMaroon}15`,
        color: colors.primaryMaroon,
        padding: '8px 16px',
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: '600',
        marginBottom: '15px'
    },
    sectionBadgeAlt: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: `${colors.accentBlue}15`,
        color: colors.accentBlue,
        padding: '8px 16px',
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: '600',
        marginBottom: '15px'
    },
    sectionTitle: {
        color: colors.primaryDark,
        fontSize: '2.2rem',
        fontWeight: '800',
        marginBottom: '10px'
    },
    sectionSubtitle: {
        color: '#64748B',
        fontSize: '1.05rem',
        margin: 0
    },
    loading: {
        textAlign: 'center',
        padding: '60px 20px',
        color: '#64748B',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px'
    },
    spinner: {
        width: '50px',
        height: '50px',
        border: '4px solid #E2E8F0',
        borderTopColor: colors.primaryMaroon,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    },
    noData: {
        textAlign: 'center',
        padding: '60px 20px',
        color: '#94A3B8'
    },
    noDataIcon: {
        fontSize: '3rem',
        marginBottom: '15px',
        display: 'block'
    },
    programsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '25px'
    },
    programCard: {
        background: '#fff',
        borderRadius: '20px',
        padding: '25px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
        position: 'relative',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        border: '1px solid #E2E8F0'
    },
    featuredBadge: {
        position: 'absolute',
        top: '15px',
        right: '15px',
        background: `linear-gradient(135deg, ${colors.primaryMaroon} 0%, ${colors.accentPink} 100%)`,
        color: '#fff',
        padding: '5px 12px',
        borderRadius: '15px',
        fontSize: '0.75rem',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
    },
    programHeader: {
        display: 'flex',
        gap: '10px',
        marginBottom: '15px'
    },
    categoryBadge: {
        background: `${colors.primaryMaroon}15`,
        color: colors.primaryMaroon,
        padding: '5px 12px',
        borderRadius: '8px',
        fontSize: '0.8rem',
        fontWeight: '600'
    },
    modeBadge: {
        background: `${colors.accentBlue}15`,
        color: colors.accentBlue,
        padding: '5px 12px',
        borderRadius: '8px',
        fontSize: '0.8rem',
        fontWeight: '500'
    },
    programTitle: {
        color: colors.primaryDark,
        fontSize: '1.15rem',
        fontWeight: '700',
        marginBottom: '10px',
        lineHeight: 1.3
    },
    programUniversity: {
        color: '#64748B',
        fontSize: '0.9rem',
        marginBottom: '15px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    programMeta: {
        display: 'flex',
        gap: '15px',
        marginBottom: '15px'
    },
    metaItem: {
        color: '#64748B',
        fontSize: '0.85rem',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
    },
    programFee: {
        background: colors.bgLight,
        padding: '15px',
        borderRadius: '12px',
        marginBottom: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    feeLabel: {
        display: 'block',
        color: '#64748B',
        fontSize: '0.8rem',
        marginBottom: '3px'
    },
    feeAmount: {
        color: colors.primaryMaroon,
        fontSize: '1.3rem',
        fontWeight: '700'
    },
    emiText: {
        background: '#DCFCE7',
        color: '#15803D',
        padding: '5px 10px',
        borderRadius: '6px',
        fontSize: '0.75rem',
        fontWeight: '600'
    },
    programActions: {
        display: 'flex',
        gap: '10px'
    },
    viewDetailsBtn: {
        flex: 1,
        padding: '12px',
        background: colors.bgLight,
        color: colors.primaryDark,
        borderRadius: '10px',
        textDecoration: 'none',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: '0.9rem',
        transition: 'background 0.2s ease'
    },
    enrollNowBtn: {
        flex: 1,
        padding: '12px',
        background: `linear-gradient(135deg, ${colors.primaryMaroon} 0%, ${colors.accentPink} 100%)`,
        color: '#fff',
        border: 'none',
        borderRadius: '10px',
        fontWeight: '600',
        fontSize: '0.9rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        transition: 'transform 0.2s ease'
    },
    viewAllContainer: {
        textAlign: 'center',
        marginTop: '50px'
    },
    viewAllBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '16px 32px',
        background: colors.primaryDark,
        color: '#fff',
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '1rem',
        transition: 'background 0.2s ease'
    },

    // Universities Section
    universitiesSection: {
        padding: '80px 20px',
        background: '#fff'
    },
    universitiesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '25px'
    },
    universityCard: {
        background: colors.bgLight,
        borderRadius: '20px',
        padding: '30px 20px',
        textAlign: 'center',
        textDecoration: 'none',
        position: 'relative',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        border: '1px solid #E2E8F0'
    },
    universityFeaturedBadge: {
        position: 'absolute',
        top: '15px',
        right: '15px',
        background: `${colors.primaryMaroon}15`,
        color: colors.primaryMaroon,
        padding: '4px 10px',
        borderRadius: '10px',
        fontSize: '0.7rem',
        fontWeight: '600'
    },
    universityLogo: {
        width: '90px',
        height: '90px',
        borderRadius: '20px',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)'
    },
    logoImg: {
        width: '70px',
        height: '70px',
        objectFit: 'contain'
    },
    universityName: {
        color: colors.primaryDark,
        fontSize: '1.05rem',
        fontWeight: '700',
        marginBottom: '8px'
    },
    universityLocation: {
        color: '#64748B',
        fontSize: '0.85rem',
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px'
    },
    universityMeta: {
        marginBottom: '15px'
    },
    ratingBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        background: '#FEF3C7',
        color: '#D97706',
        padding: '5px 12px',
        borderRadius: '8px',
        fontSize: '0.8rem',
        fontWeight: '600'
    },
    universityPrograms: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        color: colors.primaryMaroon,
        fontSize: '0.9rem',
        fontWeight: '600'
    },

    // Why Section
    whySection: {
        padding: '80px 20px',
        background: colors.bgLight
    },
    whyContent: {
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: '60px',
        alignItems: 'center'
    },
    whyLeft: {},
    whyTitle: {
        color: colors.primaryDark,
        fontSize: '2rem',
        fontWeight: '800',
        marginBottom: '20px'
    },
    whyDesc: {
        color: '#64748B',
        fontSize: '1.05rem',
        lineHeight: 1.7,
        marginBottom: '35px'
    },
    whyFeatures: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    whyFeature: {
        display: 'flex',
        gap: '15px'
    },
    whyFeatureIcon: {
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        background: '#DCFCE7',
        color: '#15803D',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
    },
    whyFeatureTitle: {
        color: colors.primaryDark,
        fontSize: '1rem',
        fontWeight: '600',
        marginBottom: '5px'
    },
    whyFeatureDesc: {
        color: '#64748B',
        fontSize: '0.9rem',
        margin: 0
    },
    whyRight: {},
    whyCard: {
        background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.bgDark} 100%)`,
        borderRadius: '24px',
        padding: '40px 30px',
        textAlign: 'center'
    },
    whyCardIcon: {
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        background: `rgba(139, 35, 70, 0.2)`,
        color: colors.accentPink,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
        fontSize: '1.5rem'
    },
    whyCardTitle: {
        color: '#fff',
        fontSize: '1.3rem',
        fontWeight: '700',
        marginBottom: '10px'
    },
    whyCardDesc: {
        color: colors.textLight,
        fontSize: '0.95rem',
        marginBottom: '25px'
    },
    whyCardBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '14px 25px',
        background: `linear-gradient(135deg, ${colors.primaryMaroon} 0%, ${colors.accentPink} 100%)`,
        color: '#fff',
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '0.95rem'
    },

    // Testimonials Section
    testimonialsSection: {
        padding: '80px 20px',
        background: '#fff'
    },
    testimonialsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '25px'
    },
    testimonialCard: {
        background: colors.bgLight,
        borderRadius: '20px',
        padding: '30px',
        border: '1px solid #E2E8F0'
    },
    testimonialQuote: {
        color: colors.primaryMaroon,
        fontSize: '1.5rem',
        marginBottom: '15px'
    },
    testimonialText: {
        color: '#475569',
        fontSize: '0.95rem',
        lineHeight: 1.7,
        marginBottom: '20px'
    },
    testimonialAuthor: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
    },
    testimonialImage: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: `3px solid ${colors.primaryMaroon}20`
    },
    testimonialName: {
        color: colors.primaryDark,
        fontSize: '1rem',
        fontWeight: '600',
        marginBottom: '3px'
    },
    testimonialProgram: {
        color: colors.primaryMaroon,
        fontSize: '0.85rem',
        margin: '0 0 2px'
    },
    testimonialUniversity: {
        color: '#64748B',
        fontSize: '0.8rem',
        margin: 0
    },

    // CTA Section
    ctaSection: {
        padding: '80px 20px',
        background: `linear-gradient(135deg, ${colors.primaryMaroon} 0%, ${colors.accentPink} 100%)`
    },
    ctaContent: {
        textAlign: 'center',
        maxWidth: '700px',
        margin: '0 auto'
    },
    ctaTitle: {
        color: '#fff',
        fontSize: '2.2rem',
        fontWeight: '800',
        marginBottom: '15px'
    },
    ctaDesc: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '1.1rem',
        marginBottom: '30px',
        lineHeight: 1.6
    },
    ctaButtons: {
        display: 'flex',
        gap: '15px',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    ctaPrimaryBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '16px 32px',
        background: '#fff',
        color: colors.primaryMaroon,
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '1rem',
        transition: 'transform 0.2s ease'
    },
    ctaSecondaryBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '16px 32px',
        background: 'transparent',
        color: '#fff',
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '1rem',
        border: '2px solid rgba(255, 255, 255, 0.5)'
    }
};

// Add responsive styles and keyframes
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        @media (max-width: 1024px) {
            .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .programs-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .universities-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .testimonials-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .why-content { grid-template-columns: 1fr !important; }
        }
        
        @media (max-width: 768px) {
            .hero-title { font-size: 2.2rem !important; }
            .features-grid { grid-template-columns: 1fr !important; }
            .programs-grid { grid-template-columns: 1fr !important; }
            .universities-grid { grid-template-columns: 1fr !important; }
            .testimonials-grid { grid-template-columns: 1fr !important; }
            .stats-container { gap: 25px !important; }
        }
    `;
    document.head.appendChild(styleSheet);
}

export default Home;