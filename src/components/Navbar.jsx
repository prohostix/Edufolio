"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import './Navbar.css';

// Import logo images with correct file names
import logoWhite from '../assets/images/edufolio-logo-white.png';
import logoBlack from '../assets/images/edufolio-logo-black.png';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        const handleResize = () => {
            if (window.innerWidth >= 1150) {
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

    // Determine which logo to show based on state
    const showBlackLogo = isScrolled || isMobileMenuOpen;

    const navbarClass = `navbar ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'menu-open' : ''}`;

    return (
        <>
            <nav className={navbarClass}>
                <div className="navbar-container">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="navbar-logo"
                    >
                        <img
                            src={showBlackLogo ? logoBlack.src : logoWhite.src}
                            alt="EduFolio"
                            className="navbar-logo-img"
                        />
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="nav-links">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`nav-link ${isActive(link.path) ? 'active' : ''} ${link.path === '/find-my-course' ? 'highlight' : ''}`}
                            >
                                <i className={`fa-solid ${link.icon} nav-icon`}></i>
                                <span className="nav-text">{link.name}</span>
                                {link.path === '/find-my-course' && <span className="new-badge">NEW</span>}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Buttons - Desktop */}
                    <div className="cta-container">
                        <Link
                            href="/admin/login"
                            className="login-btn"
                        >
                            <i className="fa-solid fa-user"></i>
                            <span className="btn-text">Login</span>
                        </Link>
                        <Link
                            href="/contact"
                            className="cta-btn"
                        >
                            <i className="fa-solid fa-paper-plane"></i>
                            <span className="btn-text">Get Started</span>
                        </Link>
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

            {/* Mobile Menu */}
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
                        <Link
                            key={link.path}
                            href={link.path}
                            className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                        >
                            <div className="mobile-nav-link-content">
                                <div className="mobile-nav-icon">
                                    <i className={`fa-solid ${link.icon}`}></i>
                                </div>
                                <span>{link.name}</span>
                            </div>
                            <i className="fa-solid fa-chevron-right chevron"></i>
                        </Link>
                    ))}

                    <div className="mobile-buttons">
                        <Link
                            href="/admin/login"
                            className="mobile-login-btn"
                        >
                            <i className="fa-solid fa-user"></i>
                            Login to Dashboard
                        </Link>
                        <Link
                            href="/contact"
                            className="mobile-cta-btn"
                        >
                            <i className="fa-solid fa-paper-plane"></i>
                            Get Started Free
                        </Link>
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