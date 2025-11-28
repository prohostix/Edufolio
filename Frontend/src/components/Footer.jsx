import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                {/* Main Footer Content */}
                <div style={styles.grid}>
                    {/* Brand Section */}
                    <div style={styles.brand}>
                        <Link to="/" style={styles.logo}>
                            <div style={styles.logoIcon}>
                                <i className="fa-solid fa-graduation-cap"></i>
                            </div>
                            <div style={styles.logoText}>
                                <span style={styles.logoEdu}>edu</span>
                                <span style={styles.logoFolio}>folio</span>
                            </div>
                        </Link>
                        <p style={styles.tagline}>learn. grow. succeed.</p>
                        <p style={styles.brandDesc}>
                            Your gateway to quality online education. Explore programs from top universities and advance your career with us.
                        </p>
                        <div style={styles.social}>
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

                    {/* Quick Links */}
                    <div style={styles.column}>
                        <h4 style={styles.columnTitle}>Quick Links</h4>
                        <div style={styles.linksList}>
                            <Link to="/" style={styles.footerLink}>
                                <i className="fa-solid fa-chevron-right" style={styles.linkIcon}></i>
                                Home
                            </Link>
                            <Link to="/programs" style={styles.footerLink}>
                                <i className="fa-solid fa-chevron-right" style={styles.linkIcon}></i>
                                Programs
                            </Link>
                            <Link to="/universities" style={styles.footerLink}>
                                <i className="fa-solid fa-chevron-right" style={styles.linkIcon}></i>
                                Universities
                            </Link>
                            <Link to="/about" style={styles.footerLink}>
                                <i className="fa-solid fa-chevron-right" style={styles.linkIcon}></i>
                                About Us
                            </Link>
                            <Link to="/contact" style={styles.footerLink}>
                                <i className="fa-solid fa-chevron-right" style={styles.linkIcon}></i>
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* Popular Programs */}
                    <div style={styles.column}>
                        <h4 style={styles.columnTitle}>Popular Programs</h4>
                        <div style={styles.linksList}>
                            <Link to="/programs?category=MBA" style={styles.footerLink}>
                                <i className="fa-solid fa-chevron-right" style={styles.linkIcon}></i>
                                MBA Programs
                            </Link>
                            <Link to="/programs?category=MCA" style={styles.footerLink}>
                                <i className="fa-solid fa-chevron-right" style={styles.linkIcon}></i>
                                MCA Programs
                            </Link>
                            <Link to="/programs?category=BBA" style={styles.footerLink}>
                                <i className="fa-solid fa-chevron-right" style={styles.linkIcon}></i>
                                BBA Programs
                            </Link>
                            <Link to="/programs?category=BCA" style={styles.footerLink}>
                                <i className="fa-solid fa-chevron-right" style={styles.linkIcon}></i>
                                BCA Programs
                            </Link>
                            <Link to="/programs?category=B.Com" style={styles.footerLink}>
                                <i className="fa-solid fa-chevron-right" style={styles.linkIcon}></i>
                                B.Com Programs
                            </Link>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div style={styles.column}>
                        <h4 style={styles.columnTitle}>Contact Us</h4>
                        <div style={styles.contactList}>
                            <div style={styles.contactItem}>
                                <div style={styles.contactIcon}>
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <div>
                                    <span>123 Education Street,</span>
                                    <span>Mumbai, Maharashtra 400001</span>
                                </div>
                            </div>
                            <div style={styles.contactItem}>
                                <div style={styles.contactIcon}>
                                    <i className="fa-solid fa-phone"></i>
                                </div>
                                <div>
                                    <a href="tel:+919876543210" style={styles.contactLink}>+91 98765 43210</a>
                                </div>
                            </div>
                            <div style={styles.contactItem}>
                                <div style={styles.contactIcon}>
                                    <i className="fa-solid fa-envelope"></i>
                                </div>
                                <div>
                                    <a href="mailto:info@edufolio.com" style={styles.contactLink}>info@edufolio.com</a>
                                </div>
                            </div>
                            <div style={styles.contactItem}>
                                <div style={styles.contactIcon}>
                                    <i className="fa-solid fa-clock"></i>
                                </div>
                                <div>
                                    <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div style={styles.newsletter}>
                    <div style={styles.newsletterContent}>
                        <div style={styles.newsletterText}>
                            <h4 style={styles.newsletterTitle}>Subscribe to Our Newsletter</h4>
                            <p style={styles.newsletterDesc}>Stay updated with latest programs and educational news</p>
                        </div>
                        <div style={styles.newsletterForm}>
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                style={styles.newsletterInput}
                            />
                            <button style={styles.newsletterBtn}>
                                <i className="fa-solid fa-paper-plane"></i>
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={styles.bottom}>
                    <p style={styles.copyright}>
                        © {currentYear} <span style={styles.copyrightBrand}>Edufolio</span>. All rights reserved.
                    </p>
                    <div style={styles.bottomLinks}>
                        <Link to="/privacy" style={styles.bottomLink}>Privacy Policy</Link>
                        <span style={styles.bottomDivider}>|</span>
                        <Link to="/terms" style={styles.bottomLink}>Terms of Service</Link>
                        <span style={styles.bottomDivider}>|</span>
                        <Link to="/refund" style={styles.bottomLink}>Refund Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Edufolio Brand Colors
const colors = {
    primaryDark: '#1E3A5F',
    primaryMaroon: '#8B2346',
    accentBlue: '#4A90A4',
    accentPink: '#C4567A',
    textLight: '#A8C5E2',
    bgDark: '#152A45'
};

const styles = {
    footer: {
        background: `linear-gradient(180deg, ${colors.primaryDark} 0%, ${colors.bgDark} 100%)`,
        color: colors.textLight,
        paddingTop: '60px'
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '40px',
        marginBottom: '50px'
    },
    brand: {},
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        textDecoration: 'none',
        marginBottom: '8px'
    },
    logoIcon: {
        width: '45px',
        height: '45px',
        borderRadius: '12px',
        background: `linear-gradient(135deg, ${colors.primaryMaroon} 0%, ${colors.accentPink} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '1.3rem',
        boxShadow: '0 4px 15px rgba(139, 35, 70, 0.3)'
    },
    logoText: {
        display: 'flex',
        fontSize: '1.5rem',
        fontWeight: '700'
    },
    logoEdu: {
        color: '#fff'
    },
    logoFolio: {
        color: colors.accentPink
    },
    tagline: {
        color: colors.accentBlue,
        fontSize: '0.85rem',
        fontStyle: 'italic',
        marginBottom: '15px'
    },
    brandDesc: {
        fontSize: '0.9rem',
        lineHeight: '1.7',
        marginBottom: '20px',
        color: colors.textLight
    },
    social: {
        display: 'flex',
        gap: '10px'
    },
    socialLink: {
        width: '38px',
        height: '38px',
        borderRadius: '10px',
        background: 'rgba(255, 255, 255, 0.1)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        fontSize: '0.95rem',
        transition: 'all 0.3s ease'
    },
    column: {},
    columnTitle: {
        color: '#fff',
        fontSize: '1.1rem',
        fontWeight: '600',
        marginBottom: '20px',
        position: 'relative',
        paddingBottom: '10px'
    },
    linksList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    footerLink: {
        color: colors.textLight,
        textDecoration: 'none',
        fontSize: '0.9rem',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.2s ease'
    },
    linkIcon: {
        fontSize: '0.7rem',
        color: colors.accentPink
    },
    contactList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    contactItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        fontSize: '0.9rem'
    },
    contactIcon: {
        width: '35px',
        height: '35px',
        borderRadius: '8px',
        background: 'rgba(139, 35, 70, 0.2)',
        color: colors.accentPink,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
    },
    contactLink: {
        color: colors.textLight,
        textDecoration: 'none',
        transition: 'color 0.2s ease'
    },
    newsletter: {
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '30px',
        marginBottom: '40px'
    },
    newsletterContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '30px',
        flexWrap: 'wrap'
    },
    newsletterText: {},
    newsletterTitle: {
        color: '#fff',
        fontSize: '1.2rem',
        fontWeight: '600',
        marginBottom: '5px'
    },
    newsletterDesc: {
        color: colors.textLight,
        fontSize: '0.9rem'
    },
    newsletterForm: {
        display: 'flex',
        gap: '10px',
        flex: 1,
        maxWidth: '450px'
    },
    newsletterInput: {
        flex: 1,
        padding: '14px 18px',
        borderRadius: '10px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(255, 255, 255, 0.05)',
        color: '#fff',
        fontSize: '0.95rem',
        outline: 'none'
    },
    newsletterBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '14px 24px',
        background: `linear-gradient(135deg, ${colors.primaryMaroon} 0%, ${colors.accentPink} 100%)`,
        color: '#fff',
        border: 'none',
        borderRadius: '10px',
        fontSize: '0.95rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(139, 35, 70, 0.3)'
    },
    bottom: {
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        paddingTop: '25px',
        paddingBottom: '25px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px'
    },
    copyright: {
        fontSize: '0.85rem',
        color: colors.textLight
    },
    copyrightBrand: {
        color: colors.accentPink,
        fontWeight: '600'
    },
    bottomLinks: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
    },
    bottomLink: {
        color: colors.textLight,
        textDecoration: 'none',
        fontSize: '0.85rem',
        transition: 'color 0.2s ease'
    },
    bottomDivider: {
        color: 'rgba(255, 255, 255, 0.3)'
    }
};

// Add hover styles
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        footer a:hover {
            color: #C4567A !important;
        }
        footer .social-link:hover {
            background: linear-gradient(135deg, #8B2346 0%, #C4567A 100%) !important;
            transform: translateY(-3px);
        }
        footer input::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }
        footer button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(139, 35, 70, 0.4);
        }
        
        @media (max-width: 992px) {
            footer > div > div:first-child {
                grid-template-columns: repeat(2, 1fr) !important;
            }
        }
        
        @media (max-width: 600px) {
            footer > div > div:first-child {
                grid-template-columns: 1fr !important;
            }
            footer .newsletter-content {
                flex-direction: column;
                text-align: center;
            }
            footer .newsletter-form {
                flex-direction: column;
                width: 100%;
            }
        }
    `;
    document.head.appendChild(styleSheet);
}

export default Footer;