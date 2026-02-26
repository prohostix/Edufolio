"use client";
import React from 'react';
import Link from 'next/link';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <style>{`
                /* ==================== FOOTER STYLES ==================== */
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

                /* ==================== CSS VARIABLES ==================== */
                .footer {
                    --footer-light-blue: #0099D6;
                    --footer-dark-blue: #00529D;
                    --footer-maroon: #8B2346;
                    --footer-dark-maroon: #6B1D3A;
                    --footer-pink: #C4567A;
                    --footer-white: #FFFFFF;
                    --footer-light-gray: #F5F7FA;
                    --footer-text-light: rgba(255, 255, 255, 0.8);
                    --footer-text-muted: rgba(255, 255, 255, 0.6);
                    --footer-transition: 0.3s ease;
                    --footer-radius: 10px;
                    --footer-radius-lg: 12px;
                    --footer-radius-xl: 14px;
                }

                /* ==================== BASE FOOTER ==================== */
                .footer {
                    background: linear-gradient(180deg, var(--footer-dark-blue) 0%, #003366 100%);
                    color: var(--footer-text-light);
                    padding-top: 70px;
                    position: relative;
                    overflow: hidden;
                    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }

                .footer-pattern {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M40 10L50 30H30L40 10zM40 70L30 50H50L40 70zM10 40L30 30V50L10 40zM70 40L50 50V30L70 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
                    opacity: 0.5;
                    pointer-events: none;
                }

                .footer-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 20px;
                    position: relative;
                    z-index: 1;
                }

                /* ==================== GRID LAYOUT ==================== */
                .footer-grid {
                    display: grid;
                    grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
                    gap: 50px;
                    margin-bottom: 50px;
                }

                /* ==================== BRAND SECTION ==================== */
                .footer-brand {
                    display: flex;
                    flex-direction: column;
                }

                .footer-logo {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    text-decoration: none;
                    margin-bottom: 10px;
                }

                .footer-logo:hover {
                    transform: none !important;
                }

                .footer-logo-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: var(--footer-radius-xl);
                    background: linear-gradient(135deg, var(--footer-maroon) 0%, var(--footer-pink) 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 15px rgba(139, 35, 70, 0.5);
                    flex-shrink: 0;
                }

                .footer-logo-text {
                    display: flex;
                    font-size: 1.7rem;
                    font-weight: 700;
                    letter-spacing: -0.5px;
                }

                .footer-logo-edu {
                    color: var(--footer-white);
                    font-weight: 800;
                }

                .footer-logo-folio {
                    color: var(--footer-light-blue);
                    font-weight: 400;
                }

                .footer-tagline {
                    color: var(--footer-light-blue);
                    font-size: 0.95rem;
                    font-style: italic;
                    font-weight: 600;
                    margin-bottom: 18px;
                }

                .footer-brand-desc {
                    font-size: 0.95rem;
                    line-height: 1.8;
                    margin-bottom: 25px;
                    color: var(--footer-text-light);
                }

                /* ==================== SOCIAL LINKS ==================== */
                .footer-social {
                    display: flex;
                    gap: 10px;
                }

                .footer-social-link {
                    width: 40px;
                    height: 40px;
                    border-radius: var(--footer-radius);
                    color: var(--footer-white);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;
                    font-size: 1rem;
                    transition: all var(--footer-transition);
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                }

                .footer-social-link:hover {
                    transform: translateY(-4px) !important;
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
                    color: var(--footer-white) !important;
                }

                .footer-social-link.facebook { background: #1877F2; }
                .footer-social-link.twitter { background: #1DA1F2; }
                .footer-social-link.linkedin { background: #0A66C2; }
                .footer-social-link.instagram { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); }
                .footer-social-link.youtube { background: #FF0000; }

                /* ==================== COLUMNS ==================== */
                .footer-column {
                    display: flex;
                    flex-direction: column;
                }

                .footer-column-title {
                    color: var(--footer-white);
                    font-size: 1.15rem;
                    font-weight: 700;
                    margin-bottom: 25px;
                    position: relative;
                    padding-bottom: 12px;
                }

                .footer-column-title::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 40px;
                    height: 3px;
                    background: linear-gradient(135deg, var(--footer-maroon) 0%, var(--footer-pink) 100%);
                    border-radius: 2px;
                }

                /* ==================== LINKS LIST ==================== */
                .footer-links-list {
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                }

                .footer-link {
                    color: var(--footer-text-light);
                    text-decoration: none;
                    font-size: 0.95rem;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    transition: all var(--footer-transition);
                }

                .footer-link:hover {
                    color: var(--footer-light-blue) !important;
                    transform: translateX(5px);
                }

                .footer-link-icon {
                    font-size: 0.7rem;
                    transition: transform var(--footer-transition);
                }

                .footer-link-icon.maroon { color: var(--footer-pink); }
                .footer-link-icon.blue { color: var(--footer-light-blue); }

                /* ==================== CONTACT LIST ==================== */
                .footer-contact-list {
                    display: flex;
                    flex-direction: column;
                    gap: 18px;
                }

                .footer-contact-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 14px;
                    font-size: 0.95rem;
                }

                .footer-contact-icon {
                    width: 38px;
                    height: 38px;
                    border-radius: var(--footer-radius);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .footer-contact-icon.maroon {
                    background: rgba(139, 35, 70, 0.3);
                    color: var(--footer-pink);
                }

                .footer-contact-icon.blue {
                    background: rgba(0, 153, 214, 0.2);
                    color: var(--footer-light-blue);
                }

                .footer-contact-text {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                    padding-top: 6px;
                }

                .footer-contact-link {
                    color: var(--footer-text-light);
                    text-decoration: none;
                    transition: color var(--footer-transition);
                }

                .footer-contact-link:hover {
                    color: var(--footer-light-blue) !important;
                    transform: none !important;
                }

                /* ==================== NEWSLETTER ==================== */
                .footer-newsletter {
                    background: linear-gradient(135deg, var(--footer-maroon) 0%, var(--footer-dark-maroon) 100%);
                    border-radius: 20px;
                    padding: 35px 40px;
                    margin-bottom: 40px;
                    position: relative;
                    overflow: hidden;
                }

                .footer-newsletter::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    right: -20%;
                    width: 300px;
                    height: 300px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 50%;
                    pointer-events: none;
                }

                .footer-newsletter-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 40px;
                    flex-wrap: wrap;
                    position: relative;
                    z-index: 1;
                }

                .footer-newsletter-text {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }

                .footer-newsletter-icon {
                    width: 60px;
                    height: 60px;
                    border-radius: 16px;
                    background: rgba(255, 255, 255, 0.15);
                    color: var(--footer-white);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    flex-shrink: 0;
                }

                .footer-newsletter-title {
                    color: var(--footer-white);
                    font-size: 1.3rem;
                    font-weight: 700;
                    margin-bottom: 5px;
                }

                .footer-newsletter-desc {
                    color: rgba(255, 255, 255, 0.85);
                    font-size: 0.95rem;
                }

                .footer-newsletter-form {
                    display: flex;
                    gap: 12px;
                    flex: 1;
                    max-width: 480px;
                }

                .footer-newsletter-input {
                    flex: 1;
                    padding: 16px 20px;
                    border-radius: var(--footer-radius-lg);
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    background: rgba(255, 255, 255, 0.1);
                    color: var(--footer-white);
                    font-size: 0.95rem;
                    font-family: inherit;
                    outline: none;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    transition: all var(--footer-transition);
                }

                .footer-newsletter-input::placeholder {
                    color: rgba(255, 255, 255, 0.5);
                }

                .footer-newsletter-input:focus {
                    border-color: rgba(255, 255, 255, 0.5);
                    background: rgba(255, 255, 255, 0.15);
                }

                .footer-newsletter-btn {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 16px 28px;
                    background: var(--footer-light-blue);
                    color: var(--footer-white);
                    border: none;
                    border-radius: var(--footer-radius-lg);
                    font-size: 0.95rem;
                    font-weight: 600;
                    font-family: inherit;
                    cursor: pointer;
                    transition: all var(--footer-transition);
                    box-shadow: 0 4px 15px rgba(0, 153, 214, 0.4);
                    white-space: nowrap;
                }

                .footer-newsletter-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(0, 153, 214, 0.5);
                }

                /* ==================== ACCREDITATION ==================== */
                .footer-accreditation {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 25px;
                    flex-wrap: wrap;
                    padding: 25px 0;
                    margin-bottom: 20px;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }

                .footer-accreditation-text {
                    color: var(--footer-text-muted);
                    font-size: 0.9rem;
                }

                .footer-accreditation-badges {
                    display: flex;
                    gap: 15px;
                    flex-wrap: wrap;
                }

                .footer-accreditation-badge {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    background: rgba(255, 255, 255, 0.08);
                    border-radius: 8px;
                    color: var(--footer-white);
                    font-size: 0.85rem;
                    font-weight: 500;
                    transition: background var(--footer-transition);
                }

                .footer-accreditation-badge:hover {
                    background: rgba(255, 255, 255, 0.12);
                }

                /* ==================== BOTTOM BAR ==================== */
                .footer-bottom {
                    padding-top: 25px;
                    padding-bottom: 30px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 15px;
                }

                .footer-copyright {
                    font-size: 0.9rem;
                    color: var(--footer-text-muted);
                }

                .footer-copyright-brand {
                    color: var(--footer-light-blue);
                    font-weight: 600;
                }

                .footer-copyright-heart {
                    color: var(--footer-maroon);
                }

                .footer-bottom-links {
                    display: flex;
                    align-items: center;
                    gap: 18px;
                }

                .footer-bottom-link {
                    color: var(--footer-text-muted);
                    text-decoration: none;
                    font-size: 0.9rem;
                    transition: color var(--footer-transition);
                }

                .footer-bottom-link:hover {
                    color: var(--footer-light-blue) !important;
                    transform: none !important;
                }

                .footer-bottom-divider {
                    color: rgba(255, 255, 255, 0.3);
                }

                /* ==================== RESPONSIVE ==================== */
                @media screen and (max-width: 1024px) {
                    .footer-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 40px;
                    }
                }

                @media screen and (max-width: 768px) {
                    .footer {
                        padding-top: 50px;
                    }

                    .footer-grid {
                        grid-template-columns: 1fr;
                        gap: 35px;
                    }

                    .footer-brand {
                        text-align: center;
                        align-items: center;
                    }

                    .footer-social {
                        justify-content: center;
                    }

                    .footer-column {
                        align-items: center;
                        text-align: center;
                    }

                    .footer-column-title::after {
                        left: 50%;
                        transform: translateX(-50%);
                    }

                    .footer-links-list {
                        align-items: center;
                    }

                    .footer-contact-list {
                        align-items: center;
                    }

                    .footer-contact-item {
                        flex-direction: column;
                        align-items: center;
                        text-align: center;
                    }

                    .footer-contact-text {
                        padding-top: 0;
                        align-items: center;
                    }

                    .footer-newsletter {
                        padding: 25px 20px;
                    }

                    .footer-newsletter-content {
                        flex-direction: column;
                        text-align: center;
                        gap: 25px;
                    }

                    .footer-newsletter-text {
                        flex-direction: column;
                        text-align: center;
                    }

                    .footer-newsletter-form {
                        flex-direction: column;
                        width: 100%;
                        max-width: 100%;
                    }

                    .footer-newsletter-btn {
                        justify-content: center;
                    }

                    .footer-accreditation {
                        flex-direction: column;
                        gap: 15px;
                    }

                    .footer-accreditation-badges {
                        justify-content: center;
                    }

                    .footer-bottom {
                        flex-direction: column;
                        text-align: center;
                    }

                    .footer-bottom-links {
                        flex-wrap: wrap;
                        justify-content: center;
                    }
                }

                @media screen and (max-width: 480px) {
                    .footer-container {
                        padding: 0 15px;
                    }

                    .footer-logo-text {
                        font-size: 1.5rem;
                    }

                    .footer-logo-icon {
                        width: 42px;
                        height: 42px;
                    }

                    .footer-newsletter-input,
                    .footer-newsletter-btn {
                        padding: 14px 18px;
                    }

                    .footer-accreditation-badges {
                        gap: 10px;
                    }

                    .footer-accreditation-badge {
                        padding: 6px 12px;
                        font-size: 0.8rem;
                    }
                }

                /* ==================== TOUCH DEVICES ==================== */
                @media (hover: none) and (pointer: coarse) {
                    .footer-social-link:hover,
                    .footer-newsletter-btn:hover {
                        transform: none;
                    }

                    .footer-social-link:active {
                        transform: scale(0.95);
                    }

                    .footer-newsletter-btn:active {
                        transform: scale(0.98);
                        opacity: 0.9;
                    }

                    .footer-link:active {
                        color: var(--footer-light-blue);
                    }
                }

                /* ==================== REDUCED MOTION ==================== */
                @media (prefers-reduced-motion: reduce) {
                    .footer,
                    .footer-link,
                    .footer-social-link,
                    .footer-newsletter-btn,
                    .footer-newsletter-input {
                        transition-duration: 0.01ms !important;
                    }
                }

                /* ==================== FOCUS STATES ==================== */
                .footer-logo:focus,
                .footer-link:focus,
                .footer-social-link:focus,
                .footer-contact-link:focus,
                .footer-newsletter-input:focus,
                .footer-newsletter-btn:focus,
                .footer-bottom-link:focus {
                    outline: 3px solid var(--footer-light-blue);
                    outline-offset: 2px;
                }

                .footer-newsletter-input:focus {
                    outline-offset: 0;
                }

                /* ==================== PRINT STYLES ==================== */
                @media print {
                    .footer {
                        background: none !important;
                        color: #000 !important;
                        padding: 20px 0;
                    }

                    .footer-pattern,
                    .footer-newsletter,
                    .footer-social {
                        display: none !important;
                    }

                    .footer-link,
                    .footer-contact-link,
                    .footer-bottom-link {
                        color: #000 !important;
                    }
                }
            `}</style>

            {/* Footer Pattern */}
            <div className="footer-pattern"></div>

            <div className="footer-container">
                {/* Main Footer Content */}
                <div className="footer-grid">
                    {/* Brand Section */}
                    <div className="footer-brand">
                        <Link href="/" className="footer-logo">
                            <div className="footer-logo-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 3L20 7.5V9H4V7.5L12 3Z" fill="white" />
                                    <path d="M6 10H18V11L12 14L6 11V10Z" fill="#0099D6" />
                                    <path d="M8 12V16L12 18L16 16V12" stroke="white" strokeWidth="1.5" fill="none" />
                                    <circle cx="12" cy="6" r="1.5" fill="#0099D6" />
                                    <line x1="12" y1="18" x2="12" y2="21" stroke="white" strokeWidth="1.5" />
                                    <circle cx="12" cy="21" r="1" fill="white" />
                                </svg>
                            </div>
                            <div className="footer-logo-text">
                                <span className="footer-logo-edu">edu</span>
                                <span className="footer-logo-folio">folio</span>
                            </div>
                        </Link>
                        <p className="footer-tagline">learn. grow. succeed.</p>
                        <p className="footer-brand-desc">
                            Your gateway to quality online education. Explore programs from top universities and advance your career with us.
                        </p>
                        <div className="footer-social">
                            <a href="#" className="footer-social-link facebook" title="Facebook" aria-label="Follow us on Facebook">
                                <i className="fa-brands fa-facebook-f"></i>
                            </a>
                            <a href="#" className="footer-social-link twitter" title="Twitter" aria-label="Follow us on Twitter">
                                <i className="fa-brands fa-twitter"></i>
                            </a>
                            <a href="#" className="footer-social-link linkedin" title="LinkedIn" aria-label="Follow us on LinkedIn">
                                <i className="fa-brands fa-linkedin-in"></i>
                            </a>
                            <a href="#" className="footer-social-link instagram" title="Instagram" aria-label="Follow us on Instagram">
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                            <a href="#" className="footer-social-link youtube" title="YouTube" aria-label="Subscribe to our YouTube channel">
                                <i className="fa-brands fa-youtube"></i>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-column">
                        <h4 className="footer-column-title">Quick Links</h4>
                        <div className="footer-links-list">
                            <Link href="/" className="footer-link">
                                <i className="fa-solid fa-chevron-right footer-link-icon maroon"></i>
                                Home
                            </Link>
                            <Link href="/programs" className="footer-link">
                                <i className="fa-solid fa-chevron-right footer-link-icon blue"></i>
                                Programs
                            </Link>
                            <Link href="/universities" className="footer-link">
                                <i className="fa-solid fa-chevron-right footer-link-icon maroon"></i>
                                Universities
                            </Link>
                            <Link href="/about" className="footer-link">
                                <i className="fa-solid fa-chevron-right footer-link-icon blue"></i>
                                About Us
                            </Link>
                            <Link href="/contact" className="footer-link">
                                <i className="fa-solid fa-chevron-right footer-link-icon maroon"></i>
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* Popular Programs */}
                    <div className="footer-column">
                        <h4 className="footer-column-title">Popular Programs</h4>
                        <div className="footer-links-list">
                            <Link href="/programs?category=MBA" className="footer-link">
                                <i className="fa-solid fa-chevron-right footer-link-icon blue"></i>
                                MBA Programs
                            </Link>
                            <Link href="/programs?category=MCA" className="footer-link">
                                <i className="fa-solid fa-chevron-right footer-link-icon maroon"></i>
                                MCA Programs
                            </Link>
                            <Link href="/programs?category=BBA" className="footer-link">
                                <i className="fa-solid fa-chevron-right footer-link-icon blue"></i>
                                BBA Programs
                            </Link>
                            <Link href="/programs?category=BCA" className="footer-link">
                                <i className="fa-solid fa-chevron-right footer-link-icon maroon"></i>
                                BCA Programs
                            </Link>
                            <Link href="/programs?category=B.Com" className="footer-link">
                                <i className="fa-solid fa-chevron-right footer-link-icon blue"></i>
                                B.Com Programs
                            </Link>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-column">
                        <h4 className="footer-column-title">Contact Us</h4>
                        <div className="footer-contact-list">
                            <div className="footer-contact-item">
                                <div className="footer-contact-icon maroon">
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <div className="footer-contact-text">
                                    <span>Jigsaw Co-working, 6th Floor, Kandamkulathy Towers,</span>
                                    <span>MG Road, KPCC Jn, Kochi - 682011</span>
                                </div>
                            </div>
                            <div className="footer-contact-item">
                                <div className="footer-contact-icon blue">
                                    <i className="fa-solid fa-phone"></i>
                                </div>
                                <div className="footer-contact-text">
                                    <a href="tel:+917356004410" className="footer-contact-link">+91 73560 04410</a>
                                </div>
                            </div>
                            <div className="footer-contact-item">
                                <div className="footer-contact-icon maroon">
                                    <i className="fa-solid fa-envelope"></i>
                                </div>
                                <div className="footer-contact-text">
                                    <a href="mailto:info@edufolio.org" className="footer-contact-link">info@edufolio.org</a>
                                </div>
                            </div>
                            <div className="footer-contact-item">
                                <div className="footer-contact-icon blue">
                                    <i className="fa-solid fa-clock"></i>
                                </div>
                                <div className="footer-contact-text">
                                    <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="footer-newsletter">
                    <div className="footer-newsletter-content">
                        <div className="footer-newsletter-text">
                            <div className="footer-newsletter-icon">
                                <i className="fa-solid fa-envelope-open-text"></i>
                            </div>
                            <div>
                                <h4 className="footer-newsletter-title">Subscribe to Our Newsletter</h4>
                                <p className="footer-newsletter-desc">Stay updated with latest programs and educational news</p>
                            </div>
                        </div>
                        <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="footer-newsletter-input"
                                aria-label="Email address for newsletter"
                            />
                            <button type="submit" className="footer-newsletter-btn">
                                <i className="fa-solid fa-paper-plane"></i>
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Accreditation Badges */}
                <div className="footer-accreditation">
                    <span className="footer-accreditation-text">Our programs are recognized by:</span>
                    <div className="footer-accreditation-badges">
                        <span className="footer-accreditation-badge">
                            <i className="fa-solid fa-award"></i> UGC-DEB
                        </span>
                        <span className="footer-accreditation-badge">
                            <i className="fa-solid fa-certificate"></i> NAAC
                        </span>
                        <span className="footer-accreditation-badge">
                            <i className="fa-solid fa-shield-halved"></i> AICTE
                        </span>
                        <span className="footer-accreditation-badge">
                            <i className="fa-solid fa-building-columns"></i> AIU
                        </span>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © {currentYear} <span className="footer-copyright-brand">Edufolio</span>. All rights reserved. Made with <i className="fa-solid fa-heart footer-copyright-heart"></i> in India
                    </p>
                    <div className="footer-bottom-links">
                        <Link href="/privacy-policy" className="footer-bottom-link">Privacy Policy</Link>
                        <span className="footer-bottom-divider">•</span>
                        <Link href="/terms" className="footer-bottom-link">Terms of Service</Link>
                        <span className="footer-bottom-divider">•</span>
                        <Link href="/refund-policy" className="footer-bottom-link">Refund Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
