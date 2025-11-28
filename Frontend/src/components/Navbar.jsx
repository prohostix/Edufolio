import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };

        handleResize();

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Programs', path: '/programs' },
        { name: 'Universities', path: '/universities' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' }
    ];

    const isActive = (path) => location.pathname === path;

    const colors = {
        primaryDark: '#1E3A5F',
        primaryMaroon: '#8B2346',
        accentPink: '#C4567A',
        accentBlue: '#4A90A4'
    };

    return (
        <>
            <nav style={{
                ...styles.navbar,
                background: isScrolled || isMobileMenuOpen ? '#fff' : 'transparent',
                boxShadow: isScrolled || isMobileMenuOpen ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none'
            }}>
                <div style={styles.container}>
                    {/* Logo */}
                    <Link to="/" style={styles.logo}>
                        <div style={styles.logoIcon}>
                            <i className="fa-solid fa-graduation-cap"></i>
                        </div>
                        <div style={styles.logoText}>
                            <span style={{
                                ...styles.logoEdu,
                                color: isScrolled || isMobileMenuOpen ? colors.primaryDark : '#fff'
                            }}>edu</span>
                            <span style={styles.logoFolio}>folio</span>
                        </div>
                    </Link>

                    {/* Desktop Nav Links */}
                    {!isMobile && (
                        <div style={styles.navLinks}>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    style={{
                                        ...styles.navLink,
                                        color: isActive(link.path) 
                                            ? colors.primaryMaroon 
                                            : isScrolled ? colors.primaryDark : '#fff'
                                    }}
                                >
                                    {link.name}
                                    {isActive(link.path) && <span style={styles.activeIndicator}></span>}
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* CTA Buttons - Desktop */}
                    {!isMobile && (
                        <div style={styles.ctaContainer}>
                            {/* Login Button */}
                            <Link 
                                to="/admin/login" 
                                style={{
                                    ...styles.loginButton,
                                    color: isScrolled ? colors.primaryDark : '#fff',
                                    borderColor: isScrolled ? colors.primaryDark : '#fff'
                                }}
                            >
                                <i className="fa-solid fa-user"></i>
                                Login
                            </Link>
                            
                            {/* Get Started Button */}
                            <Link to="/contact" style={styles.ctaButton}>
                                <i className="fa-solid fa-paper-plane"></i>
                                Get Started
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    {isMobile && (
                        <button
                            style={styles.mobileMenuBtn}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <i 
                                className={`fa-solid ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}
                                style={{ 
                                    color: isScrolled || isMobileMenuOpen ? colors.primaryDark : '#fff',
                                    fontSize: '1.3rem'
                                }}
                            ></i>
                        </button>
                    )}
                </div>

                {/* Mobile Menu */}
                {isMobile && isMobileMenuOpen && (
                    <div style={styles.mobileMenu}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                style={{
                                    ...styles.mobileNavLink,
                                    color: isActive(link.path) ? colors.primaryMaroon : colors.primaryDark,
                                    background: isActive(link.path) ? '#FDF2F4' : 'transparent'
                                }}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                                {isActive(link.path) && (
                                    <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.8rem' }}></i>
                                )}
                            </Link>
                        ))}
                        
                        {/* Mobile Buttons */}
                        <div style={styles.mobileButtons}>
                            <Link 
                                to="/admin/login" 
                                style={styles.mobileLoginBtn}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <i className="fa-solid fa-user"></i>
                                Login
                            </Link>
                            <Link 
                                to="/contact" 
                                style={styles.mobileCta}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <i className="fa-solid fa-paper-plane"></i>
                                Get Started
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Overlay for mobile menu */}
            {isMobile && isMobileMenuOpen && (
                <div 
                    style={styles.overlay}
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}
        </>
    );
};

const styles = {
    navbar: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '12px 0',
        transition: 'all 0.3s ease'
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        gap: '10px'
    },
    logoIcon: {
        width: '42px',
        height: '42px',
        background: 'linear-gradient(135deg, #8B2346 0%, #C4567A 100%)',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '1.2rem',
        boxShadow: '0 4px 15px rgba(139, 35, 70, 0.3)'
    },
    logoText: {
        display: 'flex',
        fontSize: '1.5rem',
        fontWeight: '700'
    },
    logoEdu: {
        transition: 'color 0.3s ease'
    },
    logoFolio: {
        color: '#8B2346'
    },
    navLinks: {
        display: 'flex',
        gap: '30px',
        alignItems: 'center'
    },
    navLink: {
        textDecoration: 'none',
        fontSize: '0.95rem',
        fontWeight: '500',
        position: 'relative',
        transition: 'color 0.3s ease',
        padding: '8px 0'
    },
    activeIndicator: {
        position: 'absolute',
        bottom: '0',
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(135deg, #8B2346 0%, #C4567A 100%)',
        borderRadius: '2px'
    },
    ctaContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    loginButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 20px',
        background: 'transparent',
        border: '2px solid',
        borderRadius: '10px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '0.9rem',
        transition: 'all 0.3s ease'
    },
    ctaButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 24px',
        background: 'linear-gradient(135deg, #8B2346 0%, #C4567A 100%)',
        color: '#fff',
        borderRadius: '10px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '0.9rem',
        boxShadow: '0 4px 15px rgba(139, 35, 70, 0.3)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    },
    mobileMenuBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '44px',
        height: '44px',
        borderRadius: '10px',
        transition: 'background 0.2s ease'
    },
    mobileMenu: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        background: '#fff',
        padding: '15px 20px 20px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        borderTop: '1px solid #E2E8F0',
        animation: 'slideDown 0.3s ease'
    },
    mobileNavLink: {
        textDecoration: 'none',
        fontSize: '1rem',
        fontWeight: '500',
        padding: '14px 16px',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'all 0.2s ease'
    },
    mobileButtons: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginTop: '15px',
        paddingTop: '15px',
        borderTop: '1px solid #E2E8F0'
    },
    mobileLoginBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '14px 24px',
        background: '#F5F7FA',
        color: '#1E3A5F',
        border: '2px solid #1E3A5F',
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '1rem'
    },
    mobileCta: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '16px 24px',
        background: 'linear-gradient(135deg, #8B2346 0%, #C4567A 100%)',
        color: '#fff',
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '1rem',
        boxShadow: '0 4px 15px rgba(139, 35, 70, 0.3)'
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.3)',
        zIndex: 999
    }
};

// Add CSS animations and hover effects
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        nav a.login-btn:hover {
            background: #1E3A5F !important;
            color: #fff !important;
        }
        
        nav a.cta-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(139, 35, 70, 0.4);
        }
    `;
    document.head.appendChild(styleSheet);
}

export default Navbar;