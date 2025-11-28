import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EnquiryForm from '../components/EnquiryForm';

const Contact = () => {
    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <section style={styles.hero}>
                <div style={styles.heroOverlay}></div>
                <div style={styles.heroContent}>
                    <span style={styles.heroBadge}>
                        <i className="fa-solid fa-headset"></i> Get in Touch
                    </span>
                    <h1 style={styles.heroTitle}>Contact Us</h1>
                    <p style={styles.heroSubtitle}>
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section style={styles.mainSection}>
                <div style={styles.container}>
                    <div style={styles.contentGrid}>
                        {/* Left Column - Contact Info */}
                        <div style={styles.leftColumn}>
                            <h2 style={styles.sectionTitle}>Get in Touch</h2>
                            <p style={styles.sectionText}>
                                Our team is here to help you choose the right program for your career goals. 
                                Reach out to us through any of the following channels.
                            </p>

                            <div style={styles.contactCards}>
                                <div style={styles.contactCard}>
                                    <div style={styles.contactIconPhone}>
                                        <i className="fa-solid fa-phone"></i>
                                    </div>
                                    <div>
                                        <h3 style={styles.contactLabel}>Call Us</h3>
                                        <p style={styles.contactValue}>+91 98765 43210</p>
                                        <p style={styles.contactNote}>Mon-Sat, 9am to 7pm</p>
                                    </div>
                                </div>

                                <div style={styles.contactCard}>
                                    <div style={styles.contactIconEmail}>
                                        <i className="fa-solid fa-envelope"></i>
                                    </div>
                                    <div>
                                        <h3 style={styles.contactLabel}>Email Us</h3>
                                        <p style={styles.contactValue}>info@edufolio.com</p>
                                        <p style={styles.contactNote}>We reply within 24 hours</p>
                                    </div>
                                </div>

                                <div style={styles.contactCard}>
                                    <div style={styles.contactIconLocation}>
                                        <i className="fa-solid fa-location-dot"></i>
                                    </div>
                                    <div>
                                        <h3 style={styles.contactLabel}>Visit Us</h3>
                                        <p style={styles.contactValue}>123 Education Street</p>
                                        <p style={styles.contactNote}>Mumbai, Maharashtra 400001</p>
                                    </div>
                                </div>

                                <div style={styles.contactCard}>
                                    <div style={styles.contactIconWhatsapp}>
                                        <i className="fa-brands fa-whatsapp"></i>
                                    </div>
                                    <div>
                                        <h3 style={styles.contactLabel}>WhatsApp</h3>
                                        <p style={styles.contactValue}>+91 98765 43210</p>
                                        <p style={styles.contactNote}>Quick responses</p>
                                    </div>
                                </div>
                            </div>

                            {/* Working Hours */}
                            <div style={styles.workingHours}>
                                <h3 style={styles.workingTitle}>
                                    <i className="fa-solid fa-clock"></i>
                                    Working Hours
                                </h3>
                                <div style={styles.hoursList}>
                                    <div style={styles.hoursItem}>
                                        <span style={styles.hoursDay}>Monday - Friday</span>
                                        <span style={styles.hoursTime}>9:00 AM - 7:00 PM</span>
                                    </div>
                                    <div style={styles.hoursItem}>
                                        <span style={styles.hoursDay}>Saturday</span>
                                        <span style={styles.hoursTime}>10:00 AM - 5:00 PM</span>
                                    </div>
                                    <div style={styles.hoursItem}>
                                        <span style={styles.hoursDay}>Sunday</span>
                                        <span style={styles.hoursTime}>Closed</span>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div style={styles.socialSection}>
                                <h3 style={styles.socialTitle}>Follow Us</h3>
                                <div style={styles.socialLinks}>
                                    <a href="#" style={styles.socialLink} title="Facebook">
                                        <i className="fa-brands fa-facebook-f"></i>
                                    </a>
                                    <a href="#" style={styles.socialLink} title="Twitter">
                                        <i className="fa-brands fa-twitter"></i>
                                    </a>
                                    <a href="#" style={styles.socialLink} title="LinkedIn">
                                        <i className="fa-brands fa-linkedin-in"></i>
                                    </a>
                                    <a href="#" style={styles.socialLink} title="Instagram">
                                        <i className="fa-brands fa-instagram"></i>
                                    </a>
                                    <a href="#" style={styles.socialLink} title="YouTube">
                                        <i className="fa-brands fa-youtube"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Form */}
                        <div style={styles.rightColumn}>
                            <div style={styles.formCard}>
                                <div style={styles.formHeader}>
                                    <h3 style={styles.formTitle}>Send us a Message</h3>
                                    <p style={styles.formSubtitle}>Fill out the form and our team will get back to you within 24 hours</p>
                                </div>
                                <EnquiryForm source="Contact Page" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section style={styles.mapSection}>
                <div style={styles.mapContainer}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1635000000000!5m2!1sen!2sin"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Edufolio Location"
                    ></iframe>
                </div>
            </section>

            {/* FAQ Section */}
            <section style={styles.faqSection}>
                <div style={styles.container}>
                    <div style={styles.faqHeader}>
                        <span style={styles.faqBadge}>
                            <i className="fa-solid fa-circle-question"></i> FAQs
                        </span>
                        <h2 style={styles.faqTitle}>Frequently Asked Questions</h2>
                        <p style={styles.faqSubtitle}>Find answers to common questions about our services</p>
                    </div>
                    
                    <div style={styles.faqGrid}>
                        <div style={styles.faqItem}>
                            <div style={styles.faqIcon}>
                                <i className="fa-solid fa-graduation-cap"></i>
                            </div>
                            <h3 style={styles.faqQuestion}>How do I apply for a program?</h3>
                            <p style={styles.faqAnswer}>
                                Simply fill out the enquiry form with your details, and our counselor will 
                                guide you through the complete application process.
                            </p>
                        </div>

                        <div style={styles.faqItem}>
                            <div style={styles.faqIcon}>
                                <i className="fa-solid fa-certificate"></i>
                            </div>
                            <h3 style={styles.faqQuestion}>Are the degrees valid for government jobs?</h3>
                            <p style={styles.faqAnswer}>
                                Yes, all our partner universities are UGC-DEB approved, and their degrees 
                                are recognized for government jobs and higher studies.
                            </p>
                        </div>

                        <div style={styles.faqItem}>
                            <div style={styles.faqIcon}>
                                <i className="fa-solid fa-credit-card"></i>
                            </div>
                            <h3 style={styles.faqQuestion}>What are the payment options?</h3>
                            <p style={styles.faqAnswer}>
                                Most universities offer flexible payment options including semester-wise 
                                payments and EMI facilities through various banks.
                            </p>
                        </div>

                        <div style={styles.faqItem}>
                            <div style={styles.faqIcon}>
                                <i className="fa-solid fa-file-pen"></i>
                            </div>
                            <h3 style={styles.faqQuestion}>Is there any entrance exam?</h3>
                            <p style={styles.faqAnswer}>
                                Entry requirements vary by program. Some programs have entrance exams while 
                                others accept based on qualifying examination marks.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={styles.ctaSection}>
                <div style={styles.container}>
                    <div style={styles.ctaContent}>
                        <div style={styles.ctaIcon}>
                            <i className="fa-solid fa-phone-volume"></i>
                        </div>
                        <h2 style={styles.ctaTitle}>Need Immediate Assistance?</h2>
                        <p style={styles.ctaText}>
                            Our counselors are available to help you with any questions. Call us now for instant support.
                        </p>
                        <a href="tel:+919876543210" style={styles.ctaBtn}>
                            <i className="fa-solid fa-phone"></i>
                            Call Now: +91 98765 43210
                        </a>
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
        fontSize: '2.8rem',
        fontWeight: '800',
        marginBottom: '15px'
    },
    heroSubtitle: {
        color: colors.textLight,
        fontSize: '1.15rem',
        lineHeight: 1.6,
        maxWidth: '600px',
        margin: '0 auto'
    },

    // Main Section
    mainSection: {
        padding: '80px 20px',
        background: colors.bgLight
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto'
    },
    contentGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 450px',
        gap: '60px',
        alignItems: 'start'
    },
    leftColumn: {},
    rightColumn: {},

    // Section Title
    sectionTitle: {
        color: colors.primaryDark,
        fontSize: '2rem',
        fontWeight: '800',
        marginBottom: '15px'
    },
    sectionText: {
        color: '#64748B',
        fontSize: '1.05rem',
        lineHeight: 1.7,
        marginBottom: '35px'
    },

    // Contact Cards
    contactCards: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        marginBottom: '35px'
    },
    contactCard: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '15px',
        padding: '22px',
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        border: '1px solid #E2E8F0',
        transition: 'all 0.3s ease'
    },
    contactIconPhone: {
        width: '55px',
        height: '55px',
        borderRadius: '14px',
        background: `${colors.primaryMaroon}15`,
        color: colors.primaryMaroon,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.3rem',
        flexShrink: 0
    },
    contactIconEmail: {
        width: '55px',
        height: '55px',
        borderRadius: '14px',
        background: `${colors.accentBlue}15`,
        color: colors.accentBlue,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.3rem',
        flexShrink: 0
    },
    contactIconLocation: {
        width: '55px',
        height: '55px',
        borderRadius: '14px',
        background: `${colors.accentPink}15`,
        color: colors.accentPink,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.3rem',
        flexShrink: 0
    },
    contactIconWhatsapp: {
        width: '55px',
        height: '55px',
        borderRadius: '14px',
        background: '#DCFCE7',
        color: '#16A34A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.3rem',
        flexShrink: 0
    },
    contactLabel: {
        color: colors.primaryDark,
        fontSize: '1rem',
        fontWeight: '700',
        marginBottom: '5px'
    },
    contactValue: {
        color: colors.primaryDark,
        fontSize: '0.95rem',
        fontWeight: '500',
        marginBottom: '3px'
    },
    contactNote: {
        color: '#94A3B8',
        fontSize: '0.85rem'
    },

    // Working Hours
    workingHours: {
        background: '#fff',
        borderRadius: '16px',
        padding: '25px',
        marginBottom: '35px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        border: '1px solid #E2E8F0'
    },
    workingTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: colors.primaryDark,
        fontSize: '1.1rem',
        fontWeight: '700',
        marginBottom: '20px'
    },
    hoursList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    hoursItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 15px',
        background: colors.bgLight,
        borderRadius: '10px'
    },
    hoursDay: {
        color: colors.primaryDark,
        fontWeight: '500',
        fontSize: '0.95rem'
    },
    hoursTime: {
        color: colors.primaryMaroon,
        fontWeight: '600',
        fontSize: '0.95rem'
    },

    // Social Section
    socialSection: {
        paddingTop: '25px',
        borderTop: '1px solid #E2E8F0'
    },
    socialTitle: {
        color: colors.primaryDark,
        fontSize: '1.1rem',
        fontWeight: '700',
        marginBottom: '15px'
    },
    socialLinks: {
        display: 'flex',
        gap: '12px'
    },
    socialLink: {
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        background: colors.primaryDark,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        fontSize: '1.1rem',
        transition: 'all 0.3s ease'
    },

    // Form Card
    formCard: {
        background: '#fff',
        borderRadius: '24px',
        padding: '35px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
        border: '1px solid #E2E8F0'
    },
    formHeader: {
        marginBottom: '25px',
        textAlign: 'center'
    },
    formTitle: {
        color: colors.primaryDark,
        fontSize: '1.5rem',
        fontWeight: '800',
        marginBottom: '8px'
    },
    formSubtitle: {
        color: '#64748B',
        fontSize: '0.95rem'
    },

    // Map Section
    mapSection: {
        background: '#fff'
    },
    mapContainer: {
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        borderRadius: '0',
        overflow: 'hidden'
    },

    // FAQ Section
    faqSection: {
        padding: '80px 20px',
        background: colors.bgLight
    },
    faqHeader: {
        textAlign: 'center',
        marginBottom: '50px'
    },
    faqBadge: {
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
    faqTitle: {
        color: colors.primaryDark,
        fontSize: '2rem',
        fontWeight: '800',
        marginBottom: '10px'
    },
    faqSubtitle: {
        color: '#64748B',
        fontSize: '1.05rem'
    },
    faqGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '25px'
    },
    faqItem: {
        padding: '30px',
        background: '#fff',
        borderRadius: '20px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        border: '1px solid #E2E8F0',
        transition: 'all 0.3s ease'
    },
    faqIcon: {
        width: '50px',
        height: '50px',
        borderRadius: '12px',
        background: `linear-gradient(135deg, ${colors.primaryMaroon}15, ${colors.accentPink}15)`,
        color: colors.primaryMaroon,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem',
        marginBottom: '20px'
    },
    faqQuestion: {
        color: colors.primaryDark,
        fontSize: '1.1rem',
        fontWeight: '700',
        marginBottom: '12px',
        lineHeight: 1.4
    },
    faqAnswer: {
        color: '#64748B',
        fontSize: '0.95rem',
        lineHeight: 1.7
    },

    // CTA Section
    ctaSection: {
        padding: '80px 20px',
        background: `linear-gradient(135deg, ${colors.primaryMaroon} 0%, ${colors.accentPink} 100%)`,
        textAlign: 'center'
    },
    ctaContent: {
        maxWidth: '600px',
        margin: '0 auto'
    },
    ctaIcon: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 25px',
        fontSize: '2rem',
        color: '#fff'
    },
    ctaTitle: {
        color: '#fff',
        fontSize: '2rem',
        fontWeight: '800',
        marginBottom: '15px'
    },
    ctaText: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '1.1rem',
        marginBottom: '30px',
        lineHeight: 1.6
    },
    ctaBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '18px 36px',
        background: '#fff',
        color: colors.primaryMaroon,
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: '700',
        fontSize: '1.1rem',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.2s ease'
    }
};

// Add responsive styles and hover effects
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .contact-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }
        
        .social-link:hover {
            background: linear-gradient(135deg, #8B2346 0%, #C4567A 100%) !important;
            transform: translateY(-3px);
        }
        
        .faq-item:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }
        
        .cta-btn:hover {
            transform: translateY(-3px);
        }
        
        @media (max-width: 1024px) {
            .content-grid {
                grid-template-columns: 1fr !important;
            }
        }
        
        @media (max-width: 768px) {
            .contact-cards {
                grid-template-columns: 1fr !important;
            }
            .faq-grid {
                grid-template-columns: 1fr !important;
            }
            .hero-title {
                font-size: 2rem !important;
            }
        }
    `;
    document.head.appendChild(styleSheet);
}

export default Contact;