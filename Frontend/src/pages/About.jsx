import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
    const team = [
        {
            name: 'Rahul Sharma',
            role: 'Founder & CEO',
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
            description: 'Education industry veteran with 15+ years of experience'
        },
        {
            name: 'Priya Patel',
            role: 'Head of Operations',
            image: 'https://randomuser.me/api/portraits/women/44.jpg',
            description: 'Expert in student success and educational operations'
        },
        {
            name: 'Amit Kumar',
            role: 'Academic Director',
            image: 'https://randomuser.me/api/portraits/men/67.jpg',
            description: 'PhD in Education with focus on online learning'
        },
        {
            name: 'Neha Singh',
            role: 'Student Success Lead',
            image: 'https://randomuser.me/api/portraits/women/68.jpg',
            description: 'Dedicated to helping students achieve their goals'
        }
    ];

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <section style={styles.hero}>
                <div style={styles.heroOverlay}></div>
                <div style={styles.heroContent}>
                    <span style={styles.heroBadge}>
                        <i className="fa-solid fa-info-circle"></i> About Us
                    </span>
                    <h1 style={styles.heroTitle}>About Edufolio</h1>
                    <p style={styles.heroSubtitle}>
                        Empowering learners with quality online education from India's top universities. 
                        Your success is our mission.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section style={styles.section}>
                <div style={styles.container}>
                    <div style={styles.missionGrid}>
                        <div style={styles.missionContent}>
                            <span style={styles.sectionBadge}>
                                <i className="fa-solid fa-bullseye"></i> Our Mission
                            </span>
                            <h2 style={styles.sectionTitle}>Making Quality Education Accessible</h2>
                            <p style={styles.sectionText}>
                                At Edufolio, we believe that quality education should be accessible to everyone, 
                                regardless of their location or circumstances. Our platform connects aspiring 
                                learners with India's top universities offering online and distance education programs.
                            </p>
                            <p style={styles.sectionText}>
                                We are committed to providing comprehensive information about various programs, 
                                helping students make informed decisions about their educational journey. Our team 
                                of expert counselors is always ready to guide you towards the right path.
                            </p>
                            <div style={styles.missionStats}>
                                <div style={styles.missionStat}>
                                    <span style={styles.missionStatNumber}>5+</span>
                                    <span style={styles.missionStatLabel}>Years of Experience</span>
                                </div>
                                <div style={styles.missionStat}>
                                    <span style={styles.missionStatNumber}>10K+</span>
                                    <span style={styles.missionStatLabel}>Students Guided</span>
                                </div>
                            </div>
                        </div>
                        <div style={styles.missionImage}>
                            <img 
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600" 
                                alt="Students learning"
                                style={styles.image}
                            />
                            <div style={styles.imageAccent}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section style={styles.visionSection}>
                <div style={styles.container}>
                    <div style={styles.visionGrid}>
                        <div style={styles.visionImage}>
                            <img 
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600" 
                                alt="Team collaboration"
                                style={styles.image}
                            />
                        </div>
                        <div style={styles.visionContent}>
                            <span style={styles.sectionBadge}>
                                <i className="fa-solid fa-eye"></i> Our Vision
                            </span>
                            <h2 style={styles.sectionTitle}>Transforming Education Landscape</h2>
                            <p style={styles.sectionText}>
                                We envision a future where every individual has the opportunity to pursue 
                                higher education without barriers. Through technology and partnerships with 
                                prestigious institutions, we aim to democratize learning.
                            </p>
                            <div style={styles.visionPoints}>
                                <div style={styles.visionPoint}>
                                    <div style={styles.visionPointIcon}>
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                    <span>Bridge the gap between aspirations and opportunities</span>
                                </div>
                                <div style={styles.visionPoint}>
                                    <div style={styles.visionPointIcon}>
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                    <span>Make quality education affordable and accessible</span>
                                </div>
                                <div style={styles.visionPoint}>
                                    <div style={styles.visionPointIcon}>
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                    <span>Support students throughout their learning journey</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section style={styles.valuesSection}>
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                        <span style={styles.sectionBadgeLight}>
                            <i className="fa-solid fa-heart"></i> Our Values
                        </span>
                        <h2 style={styles.sectionTitleLight}>What We Stand For</h2>
                        <p style={styles.sectionSubtitleLight}>
                            Our core values guide everything we do at Edufolio
                        </p>
                    </div>

                    <div style={styles.valuesGrid}>
                        <div style={styles.valueCard}>
                            <div style={styles.valueIcon}>
                                <i className="fa-solid fa-graduation-cap"></i>
                            </div>
                            <h3 style={styles.valueTitle}>Quality Education</h3>
                            <p style={styles.valueText}>
                                We partner only with accredited universities that maintain high educational standards and deliver real value.
                            </p>
                        </div>
                        <div style={styles.valueCard}>
                            <div style={styles.valueIcon}>
                                <i className="fa-solid fa-handshake"></i>
                            </div>
                            <h3 style={styles.valueTitle}>Trust & Transparency</h3>
                            <p style={styles.valueText}>
                                Complete transparency in fees, curriculum, and university information. No hidden charges, ever.
                            </p>
                        </div>
                        <div style={styles.valueCard}>
                            <div style={styles.valueIcon}>
                                <i className="fa-solid fa-users"></i>
                            </div>
                            <h3 style={styles.valueTitle}>Student First</h3>
                            <p style={styles.valueText}>
                                Every decision we make is guided by what's best for our students and their career aspirations.
                            </p>
                        </div>
                        <div style={styles.valueCard}>
                            <div style={styles.valueIcon}>
                                <i className="fa-solid fa-headset"></i>
                            </div>
                            <h3 style={styles.valueTitle}>Continuous Support</h3>
                            <p style={styles.valueText}>
                                From enrollment to graduation, we're here to support your journey with 24/7 assistance.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section style={styles.statsSection}>
                <div style={styles.container}>
                    <div style={styles.statsGrid}>
                        <div style={styles.statCard}>
                            <div style={styles.statIcon}>
                                <i className="fa-solid fa-building-columns"></i>
                            </div>
                            <span style={styles.statNumber}>50+</span>
                            <span style={styles.statLabel}>Partner Universities</span>
                        </div>
                        <div style={styles.statCard}>
                            <div style={styles.statIcon}>
                                <i className="fa-solid fa-graduation-cap"></i>
                            </div>
                            <span style={styles.statNumber}>500+</span>
                            <span style={styles.statLabel}>Programs Available</span>
                        </div>
                        <div style={styles.statCard}>
                            <div style={styles.statIcon}>
                                <i className="fa-solid fa-users"></i>
                            </div>
                            <span style={styles.statNumber}>10,000+</span>
                            <span style={styles.statLabel}>Students Enrolled</span>
                        </div>
                        <div style={styles.statCard}>
                            <div style={styles.statIcon}>
                                <i className="fa-solid fa-star"></i>
                            </div>
                            <span style={styles.statNumber}>95%</span>
                            <span style={styles.statLabel}>Student Satisfaction</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section style={styles.section}>
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                        <span style={styles.sectionBadge}>
                            <i className="fa-solid fa-trophy"></i> Why Choose Us
                        </span>
                        <h2 style={styles.sectionTitleCenter}>The Edufolio Advantage</h2>
                        <p style={styles.sectionSubtitle}>
                            What makes us the preferred choice for thousands of students
                        </p>
                    </div>

                    <div style={styles.advantagesGrid}>
                        <div style={styles.advantageItem}>
                            <div style={styles.advantageNumber}>01</div>
                            <div style={styles.advantageContent}>
                                <h3 style={styles.advantageTitle}>Verified Universities</h3>
                                <p style={styles.advantageText}>
                                    All partner universities are UGC-DEB approved and NAAC accredited, ensuring your degree is recognized nationwide.
                                </p>
                            </div>
                        </div>
                        <div style={styles.advantageItem}>
                            <div style={styles.advantageNumber}>02</div>
                            <div style={styles.advantageContent}>
                                <h3 style={styles.advantageTitle}>Expert Counseling</h3>
                                <p style={styles.advantageText}>
                                    Free career counseling from experienced education consultants who understand your needs and aspirations.
                                </p>
                            </div>
                        </div>
                        <div style={styles.advantageItem}>
                            <div style={styles.advantageNumber}>03</div>
                            <div style={styles.advantageContent}>
                                <h3 style={styles.advantageTitle}>Best Price Guarantee</h3>
                                <p style={styles.advantageText}>
                                    We ensure you get the best possible fees with available scholarships and flexible EMI options.
                                </p>
                            </div>
                        </div>
                        <div style={styles.advantageItem}>
                            <div style={styles.advantageNumber}>04</div>
                            <div style={styles.advantageContent}>
                                <h3 style={styles.advantageTitle}>End-to-End Support</h3>
                                <p style={styles.advantageText}>
                                    From application to graduation, we support you at every step with dedicated student success managers.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section style={styles.teamSection}>
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                        <span style={styles.sectionBadge}>
                            <i className="fa-solid fa-user-group"></i> Our Team
                        </span>
                        <h2 style={styles.sectionTitleCenter}>Meet the People Behind Edufolio</h2>
                        <p style={styles.sectionSubtitle}>
                            Dedicated professionals committed to your educational success
                        </p>
                    </div>

                    <div style={styles.teamGrid}>
                        {team.map((member, index) => (
                            <div key={index} style={styles.teamCard}>
                                <div style={styles.teamImageWrapper}>
                                    <img 
                                        src={member.image} 
                                        alt={member.name}
                                        style={styles.teamImage}
                                    />
                                </div>
                                <h3 style={styles.teamName}>{member.name}</h3>
                                <p style={styles.teamRole}>{member.role}</p>
                                <p style={styles.teamDesc}>{member.description}</p>
                                <div style={styles.teamSocial}>
                                    <a href="#" style={styles.teamSocialLink}>
                                        <i className="fa-brands fa-linkedin-in"></i>
                                    </a>
                                    <a href="#" style={styles.teamSocialLink}>
                                        <i className="fa-brands fa-twitter"></i>
                                    </a>
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
                        <div style={styles.ctaIcon}>
                            <i className="fa-solid fa-rocket"></i>
                        </div>
                        <h2 style={styles.ctaTitle}>Ready to Start Your Journey?</h2>
                        <p style={styles.ctaText}>
                            Take the first step towards your dream career. Our expert counselors are here to help you 
                            choose the right program and university.
                        </p>
                        <div style={styles.ctaBtns}>
                            <Link to="/programs" style={styles.primaryBtn}>
                                <i className="fa-solid fa-graduation-cap"></i>
                                Explore Programs
                            </Link>
                            <Link to="/contact" style={styles.secondaryBtn}>
                                <i className="fa-solid fa-phone"></i>
                                Talk to Counselor
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

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
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
    },
    heroOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    },
    heroContent: {
        maxWidth: '800px',
        margin: '0 auto',
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
        marginBottom: '20px'
    },
    heroTitle: {
        color: '#fff',
        fontSize: '3rem',
        fontWeight: '800',
        marginBottom: '20px'
    },
    heroSubtitle: {
        color: colors.textLight,
        fontSize: '1.2rem',
        lineHeight: 1.6,
        maxWidth: '600px',
        margin: '0 auto'
    },

    // Section Styles
    section: {
        padding: '100px 20px',
        background: '#fff'
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto'
    },

    // Mission Section
    missionGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'center'
    },
    missionContent: {},
    missionImage: {
        position: 'relative'
    },
    image: {
        width: '100%',
        borderRadius: '20px',
        boxShadow: '0 20px 50px rgba(30, 58, 95, 0.2)'
    },
    imageAccent: {
        position: 'absolute',
        bottom: '-20px',
        right: '-20px',
        width: '200px',
        height: '200px',
        background: `linear-gradient(135deg, ${colors.primaryMaroon}20, ${colors.accentPink}20)`,
        borderRadius: '20px',
        zIndex: -1
    },
    sectionBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: `${colors.primaryMaroon}15`,
        color: colors.primaryMaroon,
        padding: '10px 20px',
        borderRadius: '30px',
        fontSize: '0.9rem',
        fontWeight: '600',
        marginBottom: '15px'
    },
    sectionBadgeLight: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(255, 255, 255, 0.15)',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '30px',
        fontSize: '0.9rem',
        fontWeight: '600',
        marginBottom: '15px'
    },
    sectionTitle: {
        color: colors.primaryDark,
        fontSize: '2.2rem',
        fontWeight: '800',
        marginBottom: '20px',
        lineHeight: 1.3
    },
    sectionTitleLight: {
        color: '#fff',
        fontSize: '2.2rem',
        fontWeight: '800',
        marginBottom: '15px',
        lineHeight: 1.3
    },
    sectionTitleCenter: {
        color: colors.primaryDark,
        fontSize: '2.2rem',
        fontWeight: '800',
        marginBottom: '15px',
        textAlign: 'center',
        lineHeight: 1.3
    },
    sectionText: {
        color: '#475569',
        fontSize: '1.05rem',
        lineHeight: 1.8,
        marginBottom: '20px'
    },
    sectionSubtitle: {
        color: '#64748B',
        fontSize: '1.05rem',
        textAlign: 'center',
        marginBottom: '50px'
    },
    sectionSubtitleLight: {
        color: colors.textLight,
        fontSize: '1.05rem',
        textAlign: 'center',
        marginBottom: '50px'
    },
    sectionHeader: {
        textAlign: 'center'
    },
    missionStats: {
        display: 'flex',
        gap: '40px',
        marginTop: '30px'
    },
    missionStat: {
        display: 'flex',
        flexDirection: 'column'
    },
    missionStatNumber: {
        fontSize: '2.5rem',
        fontWeight: '800',
        color: colors.primaryMaroon
    },
    missionStatLabel: {
        color: '#64748B',
        fontSize: '0.95rem'
    },

    // Vision Section
    visionSection: {
        padding: '100px 20px',
        background: colors.bgLight
    },
    visionGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'center'
    },
    visionImage: {},
    visionContent: {},
    visionPoints: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        marginTop: '25px'
    },
    visionPoint: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        color: '#475569',
        fontSize: '1rem'
    },
    visionPointIcon: {
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        background: '#DCFCE7',
        color: '#15803D',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.8rem',
        flexShrink: 0
    },

    // Values Section
    valuesSection: {
        padding: '100px 20px',
        background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.bgDark} 100%)`
    },
    valuesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '25px'
    },
    valueCard: {
        background: 'rgba(255, 255, 255, 0.05)',
        padding: '35px 25px',
        borderRadius: '20px',
        textAlign: 'center',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease'
    },
    valueIcon: {
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${colors.primaryMaroon} 0%, ${colors.accentPink} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        color: '#fff',
        margin: '0 auto 20px'
    },
    valueTitle: {
        color: '#fff',
        fontSize: '1.15rem',
        fontWeight: '700',
        marginBottom: '12px'
    },
    valueText: {
        color: colors.textLight,
        fontSize: '0.9rem',
        lineHeight: 1.6
    },

    // Stats Section
    statsSection: {
        padding: '80px 20px',
        background: `linear-gradient(135deg, ${colors.primaryMaroon} 0%, ${colors.accentPink} 100%)`
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '30px'
    },
    statCard: {
        textAlign: 'center',
        padding: '20px'
    },
    statIcon: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        color: '#fff',
        margin: '0 auto 15px'
    },
    statNumber: {
        display: 'block',
        color: '#fff',
        fontSize: '3rem',
        fontWeight: '800',
        marginBottom: '5px'
    },
    statLabel: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: '1rem'
    },

    // Advantages Section
    advantagesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '30px'
    },
    advantageItem: {
        display: 'flex',
        gap: '25px',
        padding: '30px',
        background: colors.bgLight,
        borderRadius: '20px',
        transition: 'all 0.3s ease',
        border: '1px solid #E2E8F0'
    },
    advantageNumber: {
        fontSize: '2.5rem',
        fontWeight: '800',
        color: colors.primaryMaroon,
        lineHeight: 1,
        flexShrink: 0
    },
    advantageContent: {},
    advantageTitle: {
        color: colors.primaryDark,
        fontSize: '1.2rem',
        fontWeight: '700',
        marginBottom: '10px'
    },
    advantageText: {
        color: '#64748B',
        fontSize: '0.95rem',
        lineHeight: 1.7
    },

    // Team Section
    teamSection: {
        padding: '100px 20px',
        background: colors.bgLight
    },
    teamGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '30px'
    },
    teamCard: {
        background: '#fff',
        borderRadius: '20px',
        padding: '30px',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease',
        border: '1px solid #E2E8F0'
    },
    teamImageWrapper: {
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        overflow: 'hidden',
        margin: '0 auto 20px',
        border: `4px solid ${colors.primaryMaroon}20`
    },
    teamImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    teamName: {
        color: colors.primaryDark,
        fontSize: '1.15rem',
        fontWeight: '700',
        marginBottom: '5px'
    },
    teamRole: {
        color: colors.primaryMaroon,
        fontSize: '0.9rem',
        fontWeight: '600',
        marginBottom: '10px'
    },
    teamDesc: {
        color: '#64748B',
        fontSize: '0.85rem',
        lineHeight: 1.5,
        marginBottom: '15px'
    },
    teamSocial: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px'
    },
    teamSocialLink: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: colors.bgLight,
        color: colors.primaryDark,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        transition: 'all 0.3s ease'
    },

    // CTA Section
    ctaSection: {
        padding: '100px 20px',
        background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.bgDark} 100%)`,
        textAlign: 'center'
    },
    ctaContent: {
        maxWidth: '700px',
        margin: '0 auto'
    },
    ctaIcon: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: `rgba(139, 35, 70, 0.2)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 25px',
        fontSize: '2rem',
        color: colors.accentPink
    },
    ctaTitle: {
        color: '#fff',
        fontSize: '2.5rem',
        fontWeight: '800',
        marginBottom: '15px'
    },
    ctaText: {
        color: colors.textLight,
        fontSize: '1.15rem',
        marginBottom: '35px',
        lineHeight: 1.6
    },
    ctaBtns: {
        display: 'flex',
        gap: '15px',
        justifyContent: 'center',
        flexWrap: 'wrap'
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
        boxShadow: '0 4px 20px rgba(139, 35, 70, 0.4)'
    },
    secondaryBtn: {
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
        border: '2px solid rgba(255,255,255,0.3)'
    }
};

// Add responsive styles
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .team-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.1);
        }
        
        .team-social-link:hover {
            background: linear-gradient(135deg, #8B2346 0%, #C4567A 100%);
            color: #fff;
        }
        
        .advantage-item:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }
        
        .value-card:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-5px);
        }
        
        @media (max-width: 1024px) {
            .mission-grid, .vision-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
            .values-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .advantages-grid { grid-template-columns: 1fr !important; }
            .team-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        
        @media (max-width: 600px) {
            .values-grid { grid-template-columns: 1fr !important; }
            .stats-grid { grid-template-columns: 1fr !important; }
            .team-grid { grid-template-columns: 1fr !important; }
            .hero-title { font-size: 2rem !important; }
            .cta-title { font-size: 1.8rem !important; }
        }
    `;
    document.head.appendChild(styleSheet);
}

export default About;