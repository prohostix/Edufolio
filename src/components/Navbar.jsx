"use client";
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

// Import logo images with correct file names
import logoWhite from '../assets/images/edufolio-logo-white.png';
import logoBlack from '../assets/images/edufolio-logo-black.png';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        // Check initial scroll position
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const navLinks = [
        { name: 'Home', path: '/', icon: 'fa-home' },
        { name: 'Programs', path: '/programs', icon: 'fa-graduation-cap' },
        { name: 'Universities', path: '/universities', icon: 'fa-building-columns' },
        { name: 'Course Finder', path: '/find-my-course', icon: 'fa-wand-magic-sparkles' },
        { name: 'About', path: '/about', icon: 'fa-info-circle' },
        { name: 'Contact', path: '/contact', icon: 'fa-envelope' }
    ];

    const isActive = (path) => pathname === path;

    const handleNavClick = (e, path) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'instant' });
        router.push(path);
        setIsMobileMenuOpen(false);
    };

    // Determine which logo to show based on state
    const showBlackLogo = isScrolled || isMobileMenuOpen;

    const navbarClass = `navbar ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'menu-open' : ''}`;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

                /* ==================== NAVBAR RESET & BASE ==================== */
                .navbar,
                .navbar *,
                .navbar *::before,
                .navbar *::after,
                .mobile-menu,
                .mobile-menu *,
                .mobile-menu *::before,
                .mobile-menu *::after {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                .navbar {
                    --nav-height: 70px;
                    --nav-light-blue: #0099D6;
                    --nav-dark-blue: #00529D;
                    --nav-maroon: #8B2346;
                    --nav-dark-maroon: #6B1D3A;
                    --nav-pink: #C4567A;
                    --nav-white: #FFFFFF;
                    --nav-light-gray: #F5F7FA;
                    --nav-gray: #64748B;
                    --nav-orange: #FF6B35;
                    --nav-text-dark: #2D1B4E;
                    --nav-transition: 0.3s ease;
                    --nav-radius: 10px;
                    --nav-radius-lg: 12px;

                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important;
                    right: 0 !important;
                    z-index: 9999 !important;
                    height: var(--nav-height) !important;
                    display: flex !important;
                    align-items: center !important;
                    transition: background 0.3s ease, box-shadow 0.3s ease !important;
                    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
                    background: transparent !important;
                    width: 100% !important;
                }

                .navbar.scrolled,
                .navbar.menu-open {
                    background: var(--nav-white) !important;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
                }

                .navbar-container {
                    width: 100% !important;
                    max-width: 1200px !important;
                    margin: 0 auto !important;
                    padding: 0 20px !important;
                    display: flex !important;
                    justify-content: space-between !important;
                    align-items: center !important;
                    height: var(--nav-height) !important;
                    position: relative !important;
                }

                /* ==================== LOGO STYLES - SIMPLIFIED ==================== */
                .navbar-logo {
                    display: flex !important;
                    align-items: center !important;
                    text-decoration: none !important;
                    flex-shrink: 0 !important;
                    height: var(--nav-height) !important;
                    position: relative !important;
                    z-index: 10 !important;
                }

                .navbar-logo-img {
                    height: 180px !important;
                    width: auto !important;
                    max-width: 180px !important;
                    object-fit: contain !important;
                    display: block !important;
                    transition: transform 0.3s ease !important;
                }

                .navbar-logo:hover .navbar-logo-img {
                    transform: scale(1.02) !important;
                }

                /* ==================== NAV LINKS ==================== */
                .nav-links {
                    display: flex !important;
                    gap: 12px !important;
                    align-items: center !important;
                    flex: 1 !important;
                    justify-content: center !important;
                    margin: 0 40px !important;
                }

                .nav-link {
                    text-decoration: none !important;
                    font-size: 0.9rem !important;
                    font-weight: 600 !important;
                    position: relative !important;
                    transition: all 0.3s ease !important;
                    padding: 10px 16px !important;
                    color: var(--nav-white) !important;
                    border-radius: var(--nav-radius) !important;
                    display: flex !important;
                    align-items: center !important;
                    gap: 8px !important;
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;
                    white-space: nowrap !important;
                    background: transparent !important;
                }

                .nav-link .nav-icon {
                    font-size: 0.85rem !important;
                    opacity: 0.85 !important;
                }

                .new-badge {
                    font-size: 0.6rem !important;
                    background: #FF6B35 !important;
                    color: #fff !important;
                    padding: 1px 4px !important;
                    border-radius: 4px !important;
                    font-weight: 800 !important;
                    margin-left: -2px !important;
                    margin-top: -12px !important;
                }

                .navbar.scrolled .nav-link {
                    color: var(--nav-text-dark) !important;
                    text-shadow: none !important;
                }

                .nav-link:hover {
                    background: rgba(255, 255, 255, 0.15) !important;
                }

                .navbar.scrolled .nav-link:hover {
                    background: var(--nav-light-gray) !important;
                }

                .nav-link.active {
                    color: var(--nav-white) !important;
                    background: linear-gradient(135deg, var(--nav-maroon) 0%, var(--nav-pink) 100%) !important;
                    box-shadow: 0 4px 15px rgba(139, 35, 70, 0.3) !important;
                    text-shadow: none !important;
                }

                .nav-link.active .nav-icon {
                    opacity: 1 !important;
                }

                /* Highlight for Course Finder */
                .nav-link.highlight {
                    background: rgba(255, 107, 53, 0.1) !important;
                    color: #FF6B35 !important;
                    border: 1px solid rgba(255, 107, 53, 0.2) !important;
                }
                .navbar.scrolled .nav-link.highlight {
                    background: rgba(255, 107, 53, 0.08) !important;
                    border: 1px solid rgba(255, 107, 53, 0.1) !important;
                }
                .nav-link.highlight:hover {
                    background: rgba(255, 107, 53, 0.15) !important;
                    transform: translateY(-1px) !important;
                }
                .nav-link.highlight.active {
                    background: linear-gradient(135deg, #FF6B35 0%, #FF8B5C 100%) !important;
                    color: #fff !important;
                    border: none !important;
                }

                /* ==================== CTA CONTAINER ==================== */
                .cta-container {
                    display: flex !important;
                    align-items: center !important;
                    gap: 12px !important;
                    flex-shrink: 0 !important;
                    position: relative !important;
                    z-index: 10 !important;
                }

                .login-btn {
                    display: flex !important;
                    align-items: center !important;
                    gap: 8px !important;
                    padding: 10px 18px !important;
                    border: 2px solid rgba(255, 255, 255, 0.5) !important;
                    border-radius: var(--nav-radius) !important;
                    text-decoration: none !important;
                    font-weight: 600 !important;
                    font-size: 0.9rem !important;
                    transition: all 0.3s ease !important;
                    backdrop-filter: blur(10px) !important;
                    -webkit-backdrop-filter: blur(10px) !important;
                    color: var(--nav-white) !important;
                    background: rgba(255, 255, 255, 0.1) !important;
                    white-space: nowrap !important;
                }

                .navbar.scrolled .login-btn {
                    color: var(--nav-dark-blue) !important;
                    border-color: var(--nav-dark-blue) !important;
                    background: rgba(0, 82, 157, 0.1) !important;
                }

                .login-btn:hover {
                    background: var(--nav-dark-blue) !important;
                    color: var(--nav-white) !important;
                    border-color: var(--nav-dark-blue) !important;
                    transform: translateY(-2px) !important;
                    box-shadow: 0 4px 15px rgba(0, 82, 157, 0.3) !important;
                }

                .cta-btn {
                    display: flex !important;
                    align-items: center !important;
                    gap: 8px !important;
                    padding: 12px 22px !important;
                    background: linear-gradient(135deg, var(--nav-maroon) 0%, var(--nav-pink) 100%) !important;
                    color: var(--nav-white) !important;
                    border-radius: var(--nav-radius) !important;
                    text-decoration: none !important;
                    font-weight: 600 !important;
                    font-size: 0.9rem !important;
                    box-shadow: 0 4px 15px rgba(139, 35, 70, 0.4) !important;
                    transition: all 0.3s ease !important;
                    position: relative !important;
                    overflow: hidden !important;
                    white-space: nowrap !important;
                    border: none !important;
                }

                .cta-btn::before {
                    content: '' !important;
                    position: absolute !important;
                    top: 0 !important;
                    left: -100% !important;
                    width: 100% !important;
                    height: 100% !important;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255, 255, 255, 0.2),
                        transparent
                    ) !important;
                    transition: left 0.5s ease !important;
                }

                .cta-btn:hover::before {
                    left: 100% !important;
                }

                .cta-btn:hover {
                    transform: translateY(-2px) !important;
                    box-shadow: 0 6px 25px rgba(139, 35, 70, 0.45) !important;
                }

                /* ==================== MOBILE MENU BUTTON ==================== */
                .mobile-menu-btn {
                    display: none !important;
                    background: transparent !important;
                    border: none !important;
                    cursor: pointer !important;
                    padding: 10px !important;
                    width: 44px !important;
                    height: 44px !important;
                    border-radius: var(--nav-radius) !important;
                    transition: all 0.2s ease !important;
                    align-items: center !important;
                    justify-content: center !important;
                    flex-shrink: 0 !important;
                }

                .mobile-menu-btn.menu-open {
                    background: var(--nav-light-gray) !important;
                }

                .mobile-menu-btn i {
                    font-size: 1.3rem !important;
                    color: var(--nav-white) !important;
                    transition: color 0.3s ease !important;
                }

                .navbar.scrolled .mobile-menu-btn i,
                .navbar.menu-open .mobile-menu-btn i {
                    color: var(--nav-maroon) !important;
                }

                /* ==================== MOBILE MENU ==================== */
                .mobile-menu {
                    position: fixed !important;
                    top: 70px !important;
                    left: 0 !important;
                    right: 0 !important;
                    bottom: 0 !important;
                    background: var(--nav-white) !important;
                    padding: 10px 20px 25px !important;
                    display: flex !important;
                    flex-direction: column !important;
                    gap: 5px !important;
                    border-top: 3px solid #8B2346 !important;
                    animation: navSlideDown 0.3s ease !important;
                    overflow-y: auto !important;
                    -webkit-overflow-scrolling: touch !important;
                    z-index: 9998 !important;
                    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
                }

                @keyframes navSlideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .mobile-menu-header {
                    padding: 10px 0 15px !important;
                    border-bottom: 1px solid #F5F7FA !important;
                    margin-bottom: 10px !important;
                    display: flex !important;
                    align-items: center !important;
                    gap: 10px !important;
                    flex-shrink: 0 !important;
                }

                .mobile-menu-logo {
                    height: 30px !important;
                    width: auto !important;
                    object-fit: contain !important;
                }

                .mobile-menu-tagline {
                    color: #0099D6 !important;
                    font-size: 0.9rem !important;
                    font-weight: 600 !important;
                    font-style: italic !important;
                }

                .mobile-nav-link {
                    text-decoration: none !important;
                    font-size: 1rem !important;
                    font-weight: 500 !important;
                    padding: 14px 16px !important;
                    border-radius: 10px !important;
                    display: flex !important;
                    justify-content: space-between !important;
                    align-items: center !important;
                    transition: all 0.2s ease !important;
                    color: #2D1B4E !important;
                    background: transparent !important;
                    border-left: 3px solid transparent !important;
                    flex-shrink: 0 !important;
                }

                .mobile-nav-link:hover {
                    background: #F5F7FA !important;
                }

                .mobile-nav-link.active {
                    color: #FFFFFF !important;
                    background: linear-gradient(135deg, #8B2346 0%, #C4567A 100%) !important;
                    border-left-color: transparent !important;
                    border-radius: 10px !important;
                }

                .mobile-nav-link-content {
                    display: flex !important;
                    align-items: center !important;
                    gap: 12px !important;
                }

                .mobile-nav-icon {
                    width: 32px !important;
                    height: 32px !important;
                    border-radius: 8px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    background: rgba(0, 82, 157, 0.1) !important;
                    color: #00529D !important;
                    font-size: 0.85rem !important;
                    flex-shrink: 0 !important;
                }

                .mobile-nav-link.active .mobile-nav-icon {
                    background: rgba(255, 255, 255, 0.2) !important;
                    color: #FFFFFF !important;
                }

                .mobile-nav-link .chevron {
                    font-size: 0.75rem !important;
                    color: #8B2346 !important;
                }

                .mobile-nav-link.active .chevron {
                    color: #FFFFFF !important;
                }

                /* ==================== MOBILE BUTTONS ==================== */
                .mobile-buttons {
                    display: flex !important;
                    flex-direction: column !important;
                    gap: 10px !important;
                    margin-top: 15px !important;
                    padding-top: 15px !important;
                    border-top: 1px solid #F5F7FA !important;
                    flex-shrink: 0 !important;
                }

                .mobile-login-btn {
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    gap: 10px !important;
                    padding: 14px 24px !important;
                    background: rgba(0, 82, 157, 0.1) !important;
                    color: #00529D !important;
                    border: 2px solid #00529D !important;
                    border-radius: 12px !important;
                    text-decoration: none !important;
                    font-weight: 600 !important;
                    font-size: 0.95rem !important;
                    transition: all 0.3s ease !important;
                }

                .mobile-login-btn:hover {
                    background: #00529D !important;
                    color: #FFFFFF !important;
                }

                .mobile-cta-btn {
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    gap: 10px !important;
                    padding: 16px 24px !important;
                    background: linear-gradient(135deg, #8B2346 0%, #C4567A 100%) !important;
                    color: #FFFFFF !important;
                    border-radius: 12px !important;
                    text-decoration: none !important;
                    font-weight: 600 !important;
                    font-size: 0.95rem !important;
                    box-shadow: 0 4px 15px rgba(139, 35, 70, 0.3) !important;
                    transition: all 0.3s ease !important;
                    border: none !important;
                }

                .mobile-cta-btn:hover {
                    transform: translateY(-2px) !important;
                    box-shadow: 0 6px 25px rgba(139, 35, 70, 0.4) !important;
                }

                /* ==================== MOBILE CONTACT ==================== */
                .mobile-contact {
                    display: flex !important;
                    flex-direction: column !important;
                    gap: 10px !important;
                    margin-top: 15px !important;
                    padding-top: 15px !important;
                    border-top: 1px solid #F5F7FA !important;
                    flex-shrink: 0 !important;
                }

                .mobile-contact-link {
                    display: flex !important;
                    align-items: center !important;
                    gap: 10px !important;
                    color: #64748B !important;
                    text-decoration: none !important;
                    font-size: 0.9rem !important;
                    padding: 8px 0 !important;
                    transition: color 0.3s ease !important;
                }

                .mobile-contact-link:hover {
                    color: #8B2346 !important;
                }

                .mobile-contact-link i {
                    width: 20px !important;
                    text-align: center !important;
                }

                /* ==================== RESPONSIVE ==================== */
                @media screen and (max-width: 1100px) {
                    .nav-links {
                        gap: 4px !important;
                    }

                    .nav-link {
                        padding: 8px 12px !important;
                        font-size: 0.85rem !important;
                    }

                    .nav-link .nav-icon {
                        display: none !important;
                    }

                    .cta-container {
                        gap: 8px !important;
                    }

                    .login-btn {
                        padding: 8px 14px !important;
                        font-size: 0.85rem !important;
                    }

                    .cta-btn {
                        padding: 10px 16px !important;
                        font-size: 0.85rem !important;
                    }
                }

                @media screen and (max-width: 900px) {
                    .login-btn .btn-text,
                    .cta-btn .btn-text {
                        display: none !important;
                    }

                    .login-btn,
                    .cta-btn {
                        padding: 10px 12px !important;
                        gap: 0 !important;
                    }
                }

                @media screen and (max-width: 1024px) {
                    .navbar {
                        --nav-height: 65px !important;
                    }
                
                    .nav-links,
                    .cta-container {
                        display: none !important;
                    }
                
                    .mobile-menu-btn {
                        display: flex !important;
                    }
                
                    .navbar-logo-img {
                        height: 38px !important;
                    }
                
                    .mobile-menu {
                        top: 65px !important;
                    }
                }

                @media screen and (max-width: 480px) {
                    .navbar {
                        --nav-height: 60px !important;
                    }

                    .navbar-container {
                        padding: 0 15px !important;
                    }

                    .navbar-logo-img {
                        height: 32px !important;
                    }

                    .mobile-menu {
                        padding: 10px 15px 20px !important;
                        top: 60px !important;
                    }

                    .mobile-menu-logo {
                        height: 25px !important;
                    }

                    .mobile-nav-link {
                        padding: 12px 14px !important;
                    }

                    .mobile-login-btn,
                    .mobile-cta-btn {
                        padding: 14px 20px !important;
                    }
                }

                /* ==================== TOUCH & ACCESSIBILITY ==================== */
                @media (hover: none) and (pointer: coarse) {
                    .login-btn:hover,
                    .cta-btn:hover,
                    .mobile-login-btn:hover,
                    .mobile-cta-btn:hover {
                        transform: none !important;
                    }

                    .login-btn:active,
                    .cta-btn:active,
                    .mobile-login-btn:active,
                    .mobile-cta-btn:active {
                        transform: scale(0.98) !important;
                        opacity: 0.9 !important;
                    }

                    .mobile-menu-btn,
                    .mobile-nav-link,
                    .mobile-login-btn,
                    .mobile-cta-btn {
                        min-height: 48px !important;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .navbar,
                    .nav-link,
                    .login-btn,
                    .cta-btn,
                    .mobile-menu,
                    .cta-btn::before {
                        animation: none !important;
                        transition-duration: 0.01ms !important;
                    }
                }

                .nav-link:focus,
                .login-btn:focus,
                .cta-btn:focus,
                .mobile-nav-link:focus,
                .mobile-login-btn:focus,
                .mobile-cta-btn:focus,
                .mobile-menu-btn:focus,
                .navbar-logo:focus {
                    outline: 3px solid #0099D6 !important;
                    outline-offset: 2px !important;
                }
            `}</style>

            <nav className={navbarClass}>
                <div className="navbar-container">
                    {/* Logo - Single image that swaps based on state */}
                    <a
                        href="/"
                        className="navbar-logo"
                        onClick={(e) => handleNavClick(e, '/')}
                    >
                        <img
                            src={showBlackLogo ? logoBlack.src : logoWhite.src}
                            alt="EduFolio"
                            className="navbar-logo-img"
                        />
                    </a>

                    {/* Desktop Nav Links - Centered */}
                    <div className="nav-links">
                        {navLinks.map((link) => (
                            <a
                                key={link.path}
                                href={link.path}
                                className={`nav-link ${isActive(link.path) ? 'active' : ''} ${link.path === '/find-my-course' ? 'highlight' : ''}`}
                                onClick={(e) => handleNavClick(e, link.path)}
                            >
                                <i className={`fa-solid ${link.icon} nav-icon`}></i>
                                <span className="nav-text">{link.name}</span>
                                {link.path === '/find-my-course' && <span className="new-badge">NEW</span>}
                            </a>
                        ))}
                    </div>

                    {/* CTA Buttons - Desktop */}
                    <div className="cta-container">
                        <a
                            href="/admin/login"
                            className="login-btn"
                            onClick={(e) => handleNavClick(e, '/admin/login')}
                        >
                            <i className="fa-solid fa-user"></i>
                            <span className="btn-text">Login</span>
                        </a>
                        <a
                            href="/contact"
                            className="cta-btn"
                            onClick={(e) => handleNavClick(e, '/contact')}
                        >
                            <i className="fa-solid fa-paper-plane"></i>
                            <span className="btn-text">Get Started</span>
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={`mobile-menu-btn ${isMobileMenuOpen ? 'menu-open' : ''}`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <i className={`fa-solid ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu - Outside navbar for proper positioning */}
            {isMobileMenuOpen && (
                <div className="mobile-menu">
                    <div className="mobile-menu-header">
                        <img
                            src={logoBlack.src}
                            alt="EduFolio"
                            className="mobile-menu-logo"
                        />
                        <span className="mobile-menu-tagline">learn. grow. succeed.</span>
                    </div>

                    {navLinks.map((link) => (
                        <a
                            key={link.path}
                            href={link.path}
                            className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                            onClick={(e) => handleNavClick(e, link.path)}
                        >
                            <div className="mobile-nav-link-content">
                                <div className="mobile-nav-icon">
                                    <i className={`fa-solid ${link.icon}`}></i>
                                </div>
                                <span>{link.name}</span>
                            </div>
                            <i className="fa-solid fa-chevron-right chevron"></i>
                        </a>
                    ))}

                    <div className="mobile-buttons">
                        <a
                            href="/admin/login"
                            className="mobile-login-btn"
                            onClick={(e) => handleNavClick(e, '/admin/login')}
                        >
                            <i className="fa-solid fa-user"></i>
                            Login to Dashboard
                        </a>
                        <a
                            href="/contact"
                            className="mobile-cta-btn"
                            onClick={(e) => handleNavClick(e, '/contact')}
                        >
                            <i className="fa-solid fa-paper-plane"></i>
                            Get Started Free
                        </a>
                    </div>

                    <div className="mobile-contact">
                        <a href="tel:+917356004410" className="mobile-contact-link">
                            <i className="fa-solid fa-phone"></i>
                            +91 73560 04410
                        </a>
                        <a href="mailto:info@edufolio.org" className="mobile-contact-link">
                            <i className="fa-solid fa-envelope"></i>
                            info@edufolio.org
                        </a>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;