"use client";
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import axios from 'axios';
import API_BASE from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        program: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const formRef = useRef(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await axios.post(`${API_BASE}/enquiry`, formData);
            setSuccess(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                program: '',
                message: ''
            });
            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            setError('Failed to submit. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const contactMethods = [
        {
            icon: 'fa-phone',
            title: 'Call Us',
            primary: '+91 73560 04410',
            secondary: '+91 73560 04410',
            action: 'tel:+917356004410',
            actionText: 'Call Now',
            colorType: 'maroon'
        },
        {
            icon: 'fa-envelope',
            title: 'Email Us',
            primary: 'info@edufolio.org',
            secondary: 'support@edufolio.org',
            action: 'mailto:info@edufolio.org',
            actionText: 'Send Email',
            colorType: 'blue'
        },
        {
            icon: 'fa-location-dot',
            title: 'Visit Us',
            primary: 'Jigsaw Co-working, 6th Floor',
            secondary: 'Kandamkulathy Towers, Kochi - 682011',
            action: 'https://maps.google.com',
            actionText: 'Get Directions',
            colorType: 'maroon'
        },
        {
            icon: 'fa-clock',
            title: 'Working Hours',
            primary: 'Mon - Sat: 9:00 AM - 7:00 PM',
            secondary: 'Sunday: Closed',
            action: null,
            actionText: null,
            colorType: 'blue'
        }
    ];

    const faqs = [
        {
            question: 'How do I enroll in a program?',
            answer: "You can enroll by filling out the inquiry form or calling our counselors. We'll guide you through the entire process."
        },
        {
            question: 'Are the degrees UGC recognized?',
            answer: 'Yes, all our partner universities are UGC-DEB approved and NAAC accredited. Degrees are valid for government jobs and higher studies.'
        },
        {
            question: 'What payment options are available?',
            answer: 'We offer multiple payment options including one-time payment, semester-wise, and easy EMI options with 0% interest.'
        },
        {
            question: 'Can I transfer credits from another university?',
            answer: 'Credit transfer policies vary by university. Our counselors can help you understand the specific requirements for your case.'
        }
    ];

    const programOptions = [
        { value: '', label: 'Select a program' },
        { value: 'MBA', label: 'MBA' },
        { value: 'MCA', label: 'MCA' },
        { value: 'BBA', label: 'BBA' },
        { value: 'BCA', label: 'BCA' },
        { value: 'B.Com', label: 'B.Com' },
        { value: 'M.Com', label: 'M.Com' },
        { value: 'BA', label: 'BA' },
        { value: 'MA', label: 'MA' },
        { value: 'Other', label: 'Other' }
    ];

    return (
        <>
            <style>{styles}</style>
            <Navbar />

            {/* Hero Section */}
            <section className="ct-hero">
                <div className="ct-hero-pattern" aria-hidden="true"></div>

                <div className="ct-hero-container">
                    {/* Left Content */}
                    <div className="ct-hero-content">
                        <span className="ct-hero-badge">
                            <i className="fa-solid fa-headset" aria-hidden="true"></i>
                            Get in Touch
                        </span>
                        <h1 className="ct-hero-title">
                            Let's Start Your <span className="ct-highlight">Journey</span>
                        </h1>
                        <p className="ct-hero-subtitle">
                            Have questions about our programs? Our expert counselors are here to help
                            you find the perfect program and guide you through every step of your educational journey.
                        </p>
                        <div className="ct-tagline" aria-label="Our motto">
                            <span>learn.</span>
                            <span>grow.</span>
                            <span>succeed.</span>
                        </div>

                        {/* Quick Contact Info */}
                        <div className="ct-hero-quick-contact">
                            <a href="tel:+917356004410" className="ct-hero-quick-item">
                                <div className="ct-hero-quick-icon ct-hero-quick-icon-primary">
                                    <i className="fa-solid fa-phone" aria-hidden="true"></i>
                                </div>
                                <div className="ct-hero-quick-text">
                                    <span className="ct-hero-quick-label">Call Us</span>
                                    <span className="ct-hero-quick-value">+91 73560 04410</span>
                                </div>
                            </a>
                            <a href="mailto:info@edufolio.org" className="ct-hero-quick-item">
                                <div className="ct-hero-quick-icon ct-hero-quick-icon-secondary">
                                    <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                                </div>
                                <div className="ct-hero-quick-text">
                                    <span className="ct-hero-quick-label">Email Us</span>
                                    <span className="ct-hero-quick-value">info@edufolio.org</span>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Right Images Section */}
                    <div className="ct-hero-images" aria-hidden="true">
                        <div className="ct-main-image-container">
                            <img
                                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=380&h=420&fit=crop&auto=format&q=80"
                                alt=""
                                className="ct-main-image"
                                loading="lazy"
                            />
                            <div className="ct-main-image-overlay"></div>
                        </div>

                        <div className="ct-floating-image ct-floating-image-1">
                            <img
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=150&h=110&fit=crop&auto=format&q=80"
                                alt=""
                                className="ct-floating-img"
                                loading="lazy"
                            />
                        </div>

                        <div className="ct-floating-image ct-floating-image-2">
                            <img
                                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=140&h=100&fit=crop&auto=format&q=80"
                                alt=""
                                className="ct-floating-img"
                                loading="lazy"
                            />
                        </div>

                        <div className="ct-floating-image ct-floating-image-3">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=120&h=85&fit=crop&auto=format&q=80"
                                alt=""
                                className="ct-floating-img"
                                loading="lazy"
                            />
                        </div>

                        {/* Floating Cards */}
                        <div className="ct-floating-card ct-response-card">
                            <div className="ct-floating-card-icon ct-response-icon">
                                <i className="fa-solid fa-bolt"></i>
                            </div>
                            <div className="ct-floating-card-content">
                                <span className="ct-floating-card-number">&lt; 24 hrs</span>
                                <span className="ct-floating-card-label">Response Time</span>
                            </div>
                        </div>

                        <div className="ct-floating-card ct-happy-card">
                            <div className="ct-floating-card-icon ct-happy-icon">
                                <i className="fa-solid fa-heart"></i>
                            </div>
                            <div className="ct-floating-card-content">
                                <span className="ct-floating-card-number">15K+</span>
                                <span className="ct-floating-card-label">Happy Students</span>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="ct-decor-circle ct-decor-circle-1"></div>
                        <div className="ct-decor-circle ct-decor-circle-2"></div>
                        <div className="ct-decor-dots"></div>
                    </div>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="ct-methods-section" aria-labelledby="contact-methods-title">
                <h2 id="contact-methods-title" className="ct-sr-only">Contact Methods</h2>
                <div className="ct-container">
                    <div className="ct-methods-grid">
                        {contactMethods.map((method, index) => (
                            <article key={index} className="ct-method-card">
                                <div className={`ct-method-icon ct-method-icon-${method.colorType}`}>
                                    <i className={`fa-solid ${method.icon}`} aria-hidden="true"></i>
                                </div>
                                <h3 className="ct-method-title">{method.title}</h3>
                                <p className="ct-method-primary">{method.primary}</p>
                                <p className="ct-method-secondary">{method.secondary}</p>
                                {method.action && (
                                    <a
                                        href={method.action}
                                        className={`ct-method-btn ct-method-btn-${method.colorType}`}
                                        target={method.action.startsWith('http') ? '_blank' : undefined}
                                        rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    >
                                        {method.actionText}
                                        <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                                    </a>
                                )}
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Contact Section */}
            <section className="ct-main-section" aria-labelledby="contact-form-title">
                <div className="ct-container">
                    <div className="ct-contact-grid">
                        {/* Contact Form */}
                        <div className="ct-form-wrapper">
                            <div className="ct-form-header">
                                <span className="ct-form-badge">
                                    <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>
                                    Send a Message
                                </span>
                                <h2 id="contact-form-title" className="ct-form-title">Get Free Counseling</h2>
                                <p className="ct-form-subtitle">
                                    Fill in your details and our expert counselors will contact you within 24 hours.
                                </p>
                            </div>

                            {success && (
                                <div className="ct-success-message" role="alert">
                                    <i className="fa-solid fa-check-circle" aria-hidden="true"></i>
                                    <div>
                                        <strong>Thank you!</strong>
                                        <p>Your inquiry has been submitted. We'll contact you soon.</p>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="ct-error-message" role="alert">
                                    <i className="fa-solid fa-exclamation-circle" aria-hidden="true"></i>
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="ct-form" ref={formRef}>
                                <div className="ct-form-row">
                                    <div className="ct-form-group">
                                        <label htmlFor="name" className="ct-label">
                                            <i className="fa-solid fa-user" aria-hidden="true"></i>
                                            Full Name <span className="ct-required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your full name"
                                            className="ct-input"
                                            autoComplete="name"
                                        />
                                    </div>
                                    <div className="ct-form-group">
                                        <label htmlFor="phone" className="ct-label">
                                            <i className="fa-solid fa-phone" aria-hidden="true"></i>
                                            Phone Number <span className="ct-required">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your phone number"
                                            className="ct-input"
                                            autoComplete="tel"
                                        />
                                    </div>
                                </div>

                                <div className="ct-form-row">
                                    <div className="ct-form-group">
                                        <label htmlFor="email" className="ct-label">
                                            <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                                            Email Address <span className="ct-required">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your email address"
                                            className="ct-input"
                                            autoComplete="email"
                                        />
                                    </div>
                                    <div className="ct-form-group">
                                        <label htmlFor="program" className="ct-label">
                                            <i className="fa-solid fa-graduation-cap" aria-hidden="true"></i>
                                            Program Interest
                                        </label>
                                        <select
                                            id="program"
                                            name="program"
                                            value={formData.program}
                                            onChange={handleChange}
                                            className="ct-select"
                                        >
                                            {programOptions.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="ct-form-group">
                                    <label htmlFor="subject" className="ct-label">
                                        <i className="fa-solid fa-tag" aria-hidden="true"></i>
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="What can we help you with?"
                                        className="ct-input"
                                    />
                                </div>

                                <div className="ct-form-group">
                                    <label htmlFor="message" className="ct-label">
                                        <i className="fa-solid fa-message" aria-hidden="true"></i>
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us more about your requirements..."
                                        rows={5}
                                        className="ct-textarea"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="ct-submit-btn"
                                    disabled={loading}
                                    aria-busy={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="ct-btn-spinner" aria-hidden="true"></span>
                                            <span>Submitting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>
                                            <span>Submit Inquiry</span>
                                        </>
                                    )}
                                </button>

                                <p className="ct-form-note">
                                    <i className="fa-solid fa-shield-check" aria-hidden="true"></i>
                                    Your information is secure and will never be shared.
                                </p>
                            </form>
                        </div>

                        {/* Sidebar */}
                        <aside className="ct-sidebar">
                            {/* WhatsApp Card */}
                            <div className="ct-whatsapp-card">
                                <div className="ct-whatsapp-icon">
                                    <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                                </div>
                                <h3 className="ct-whatsapp-title">Chat on WhatsApp</h3>
                                <p className="ct-whatsapp-text">
                                    Get instant responses to your queries via WhatsApp
                                </p>
                                <a
                                    href="https://wa.me/917356004410"
                                    className="ct-whatsapp-btn"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                                    Start Chat
                                </a>
                            </div>

                            {/* Callback Card */}
                            <div className="ct-callback-card">
                                <div className="ct-callback-icon">
                                    <i className="fa-solid fa-phone-volume" aria-hidden="true"></i>
                                </div>
                                <h3 className="ct-callback-title">Request a Callback</h3>
                                <p className="ct-callback-text">
                                    Our counselor will call you at your preferred time
                                </p>
                                <a href="tel:+917356004410" className="ct-callback-btn">
                                    <i className="fa-solid fa-phone" aria-hidden="true"></i>
                                    Call Now
                                </a>
                            </div>

                            {/* Social Media */}
                            <div className="ct-social-card">
                                <h3 className="ct-social-title">Follow Us</h3>
                                <p className="ct-social-text">Stay updated with latest programs and news</p>
                                <div className="ct-social-links">
                                    <a href="#" className="ct-social-link ct-social-facebook" aria-label="Follow us on Facebook">
                                        <i className="fa-brands fa-facebook-f" aria-hidden="true"></i>
                                    </a>
                                    <a href="#" className="ct-social-link ct-social-twitter" aria-label="Follow us on Twitter">
                                        <i className="fa-brands fa-twitter" aria-hidden="true"></i>
                                    </a>
                                    <a href="#" className="ct-social-link ct-social-linkedin" aria-label="Follow us on LinkedIn">
                                        <i className="fa-brands fa-linkedin-in" aria-hidden="true"></i>
                                    </a>
                                    <a href="#" className="ct-social-link ct-social-instagram" aria-label="Follow us on Instagram">
                                        <i className="fa-brands fa-instagram" aria-hidden="true"></i>
                                    </a>
                                    <a href="#" className="ct-social-link ct-social-youtube" aria-label="Subscribe on YouTube">
                                        <i className="fa-brands fa-youtube" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="ct-map-section" aria-labelledby="location-title">
                <div className="ct-container">
                    <div className="ct-section-header">
                        <span className="ct-section-badge ct-section-badge-blue">
                            <i className="fa-solid fa-map-marker-alt" aria-hidden="true"></i>
                            Our Location
                        </span>
                        <h2 id="location-title" className="ct-section-title">Find Us Here</h2>
                        <p className="ct-section-subtitle">Visit our office for in-person consultation</p>
                    </div>

                    <div className="ct-map-container">
                        <div className="ct-map-placeholder">
                            <iframe
                                src="https://maps.google.com/maps?q=Jigsaw%20Co-working%2C%206th%20Floor%2C%20Kandamkulathy%20Towers%2C%20MG%20Road%2C%20KPCC%20Jn%2C%20Kochi%20-%20682011&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="400"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                title="Edufolio Office Location"
                            ></iframe>
                        </div>

                        <div className="ct-map-info-card">
                            <div className="ct-map-info-icon">
                                <i className="fa-solid fa-building" aria-hidden="true"></i>
                            </div>
                            <div className="ct-map-info-content">
                                <h4 className="ct-map-info-title">Edufolio Head Office</h4>
                                <address className="ct-map-info-address">
                                    Jigsaw Co-working, 6th Floor, Kandamkulathy Towers,<br />
                                    MG Road, KPCC Jn, Kochi - 682011
                                </address>
                                <a
                                    href="https://maps.google.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ct-map-info-btn"
                                >
                                    <i className="fa-solid fa-directions" aria-hidden="true"></i>
                                    Get Directions
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="ct-faq-section" aria-labelledby="faq-title">
                <div className="ct-faq-pattern" aria-hidden="true"></div>
                <div className="ct-container">
                    <div className="ct-section-header">
                        <span className="ct-section-badge ct-section-badge-light">
                            <i className="fa-solid fa-question-circle" aria-hidden="true"></i>
                            FAQs
                        </span>
                        <h2 id="faq-title" className="ct-section-title ct-section-title-light">
                            Frequently Asked Questions
                        </h2>
                        <p className="ct-section-subtitle ct-section-subtitle-light">
                            Find quick answers to common questions
                        </p>
                    </div>

                    <div className="ct-faq-grid">
                        {faqs.map((faq, index) => (
                            <article key={index} className="ct-faq-card">
                                <span className="ct-faq-number">{String(index + 1).padStart(2, '0')}</span>
                                <h4 className="ct-faq-question">{faq.question}</h4>
                                <p className="ct-faq-answer">{faq.answer}</p>
                            </article>
                        ))}
                    </div>

                    <div className="ct-faq-cta">
                        <p className="ct-faq-cta-text">
                            Still have questions? We're here to help!
                        </p>
                        <a href="tel:+917356004410" className="ct-faq-cta-btn">
                            <i className="fa-solid fa-phone" aria-hidden="true"></i>
                            Talk to an Expert
                        </a>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="ct-cta-section" aria-labelledby="cta-title">
                <div className="ct-cta-pattern" aria-hidden="true"></div>
                <div className="ct-container">
                    <div className="ct-cta-content">
                        <div className="ct-cta-icon">
                            <i className="fa-solid fa-rocket" aria-hidden="true"></i>
                        </div>
                        <h2 id="cta-title" className="ct-cta-title">Ready to Transform Your Career?</h2>
                        <p className="ct-cta-text">
                            Take the first step towards your dream career. Our expert counselors are
                            here to guide you every step of the way.
                        </p>
                        <div className="ct-cta-tagline" aria-hidden="true">
                            <span>learn.</span>
                            <span>grow.</span>
                            <span>succeed.</span>
                        </div>
                        <div className="ct-cta-btns">
                            <Link href="/programs" className="ct-cta-btn ct-cta-btn-primary">
                                <i className="fa-solid fa-graduation-cap" aria-hidden="true"></i>
                                Explore Programs
                            </Link>
                            <Link href="/universities" className="ct-cta-btn ct-cta-btn-secondary">
                                <i className="fa-solid fa-building-columns" aria-hidden="true"></i>
                                View Universities
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

const styles = `
    /* ==================== CONTACT PAGE STYLES ==================== */

    /* ==================== CSS VARIABLES ==================== */
    .ct-hero,
    .ct-methods-section,
    .ct-main-section,
    .ct-map-section,
    .ct-faq-section,
    .ct-cta-section {
        --ct-light-blue: #0099D6;
        --ct-dark-blue: #00529D;
        --ct-maroon: #8B2346;
        --ct-dark-maroon: #6B1D3A;
        --ct-pink: #C4567A;
        --ct-light-pink: #E8B4C4;
        --ct-white: #FFFFFF;
        --ct-light-gray: #F5F7FA;
        --ct-gray: #64748B;
        --ct-dark-gray: #1E293B;
        --ct-text-dark: #2D1B4E;
        --ct-text-muted: #94A3B8;
        --ct-whatsapp: #25D366;
        --ct-whatsapp-dark: #128C7E;
        --ct-success: #10B981;
        --ct-error: #EF4444;
        --ct-amber: #D97706;
        --ct-amber-light: #FEF3C7;
        --ct-radius: 12px;
        --ct-radius-lg: 20px;
        --ct-radius-xl: 24px;
        --ct-radius-full: 9999px;
        --ct-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
        --ct-shadow-lg: 0 10px 40px rgba(0, 0, 0, 0.1);
        --ct-shadow-xl: 0 15px 40px rgba(0, 0, 0, 0.2);
        --ct-transition: 0.3s ease;
        --ct-transition-fast: 0.2s ease;
    }

    /* ==================== UTILITY CLASSES ==================== */
    .ct-sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }

    .ct-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
        position: relative;
        z-index: 1;
    }

    /* ==================== ANIMATIONS ==================== */
    @keyframes ct-spin {
        to { transform: rotate(360deg); }
    }

    @keyframes ct-float-1 {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
    }

    @keyframes ct-float-2 {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }

    @keyframes ct-pulse {
        0%, 100% { transform: scale(1); opacity: 0.5; }
        50% { transform: scale(1.1); opacity: 0.8; }
    }

    @keyframes ct-fade-in {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* ==================== HERO SECTION ==================== */
    .ct-hero {
        background: linear-gradient(135deg, var(--ct-dark-maroon) 0%, var(--ct-maroon) 100%);
        padding: 100px 0 60px;
        position: relative;
        overflow: hidden;
    }

    .ct-hero-pattern {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M40 10L50 30H30L40 10zM40 70L30 50H50L40 70zM10 40L30 30V50L10 40zM70 40L50 50V30L70 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        opacity: 0.5;
        pointer-events: none;
    }

    .ct-hero-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 60px;
        align-items: center;
        position: relative;
        z-index: 2;
    }

    .ct-hero-content {
        max-width: 550px;
        animation: ct-fade-in 0.6s ease;
    }

    .ct-hero-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: rgba(255, 255, 255, 0.15);
        color: var(--ct-white);
        padding: 10px 20px;
        border-radius: var(--ct-radius-full);
        font-size: 0.9rem;
        font-weight: 600;
        margin-bottom: 20px;
        backdrop-filter: blur(10px);
    }

    .ct-hero-title {
        color: var(--ct-white);
        font-size: 2.8rem;
        font-weight: 800;
        line-height: 1.2;
        margin: 0 0 20px;
    }

    .ct-highlight {
        color: var(--ct-light-blue);
    }

    .ct-hero-subtitle {
        color: rgba(255, 255, 255, 0.85);
        font-size: 1.1rem;
        line-height: 1.7;
        margin: 0 0 20px;
    }

    .ct-tagline {
        display: flex;
        gap: 15px;
        margin-bottom: 30px;
        color: var(--ct-light-blue);
        font-size: 1.1rem;
        font-weight: 600;
        font-style: italic;
    }

    .ct-hero-quick-contact {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
    }

    .ct-hero-quick-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 15px 20px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 14px;
        text-decoration: none;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.15);
        transition: all var(--ct-transition);
    }

    .ct-hero-quick-item:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
    }

    .ct-hero-quick-item:focus {
        outline: 3px solid var(--ct-light-blue);
        outline-offset: 2px;
    }

    .ct-hero-quick-icon {
        width: 45px;
        height: 45px;
        border-radius: var(--ct-radius);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
        flex-shrink: 0;
    }

    .ct-hero-quick-icon-primary {
        background: var(--ct-light-blue);
        color: var(--ct-white);
    }

    .ct-hero-quick-icon-secondary {
        background: rgba(255, 255, 255, 0.2);
        color: var(--ct-white);
    }

    .ct-hero-quick-text {
        display: flex;
        flex-direction: column;
    }

    .ct-hero-quick-label {
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.8rem;
        margin-bottom: 2px;
    }

    .ct-hero-quick-value {
        color: var(--ct-white);
        font-weight: 600;
        font-size: 0.95rem;
    }

    /* Hero Images */
    .ct-hero-images {
        position: relative;
        height: 500px;
    }

    .ct-main-image-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 320px;
        height: 380px;
        border-radius: var(--ct-radius-xl);
        overflow: hidden;
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
        border: 5px solid rgba(255, 255, 255, 0.2);
    }

    .ct-main-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .ct-main-image-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100px;
        background: linear-gradient(to top, rgba(107, 29, 58, 0.7), transparent);
        pointer-events: none;
    }

    .ct-floating-image {
        position: absolute;
        border-radius: 14px;
        overflow: hidden;
        box-shadow: var(--ct-shadow-xl);
        border: 4px solid rgba(255, 255, 255, 0.3);
    }

    .ct-floating-image-1 {
        top: 10px;
        right: 20px;
        width: 145px;
        height: 100px;
        animation: ct-float-1 6s ease-in-out infinite;
    }

    .ct-floating-image-2 {
        bottom: 40px;
        left: 0;
        width: 135px;
        height: 95px;
        animation: ct-float-2 6s ease-in-out infinite;
    }

    .ct-floating-image-3 {
        top: 40%;
        right: 0;
        width: 115px;
        height: 80px;
        border-width: 3px;
        animation: ct-float-1 5s ease-in-out infinite;
    }

    .ct-floating-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .ct-floating-card {
        position: absolute;
        background: var(--ct-white);
        padding: 14px 18px;
        border-radius: 14px;
        box-shadow: var(--ct-shadow-xl);
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .ct-response-card {
        top: 25px;
        left: 10px;
        animation: ct-float-1 5s ease-in-out infinite;
    }

    .ct-happy-card {
        bottom: 50px;
        right: 10px;
        animation: ct-float-2 5s ease-in-out infinite;
    }

    .ct-floating-card-icon {
        width: 42px;
        height: 42px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
    }

    .ct-response-icon {
        background: var(--ct-amber-light);
        color: var(--ct-amber);
    }

    .ct-happy-icon {
        background: rgba(139, 35, 70, 0.15);
        color: var(--ct-maroon);
    }

    .ct-floating-card-content {
        display: flex;
        flex-direction: column;
    }

    .ct-floating-card-number {
        color: var(--ct-text-dark);
        font-size: 1rem;
        font-weight: 800;
    }

    .ct-floating-card-label {
        color: var(--ct-gray);
        font-size: 0.7rem;
    }

    .ct-decor-circle {
        position: absolute;
        border-radius: 50%;
    }

    .ct-decor-circle-1 {
        top: 15%;
        right: 10%;
        width: 65px;
        height: 65px;
        border: 3px solid rgba(0, 153, 214, 0.4);
        animation: ct-pulse 3s ease-in-out infinite;
    }

    .ct-decor-circle-2 {
        bottom: 20%;
        left: 8%;
        width: 50px;
        height: 50px;
        background: rgba(0, 153, 214, 0.2);
        animation: ct-pulse 4s ease-in-out infinite;
    }

    .ct-decor-dots {
        position: absolute;
        top: 55%;
        right: 5%;
        width: 50px;
        height: 50px;
        background-image: radial-gradient(circle, rgba(255, 255, 255, 0.3) 2px, transparent 2px);
        background-size: 10px 10px;
    }

    /* ==================== CONTACT METHODS ==================== */
    .ct-methods-section {
        padding: 60px 20px;
        background: var(--ct-white);
        margin-top: -30px;
        position: relative;
        z-index: 10;
    }

    .ct-methods-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 25px;
    }

    .ct-method-card {
        background: var(--ct-light-gray);
        padding: 30px 25px;
        border-radius: var(--ct-radius-lg);
        text-align: center;
        transition: all var(--ct-transition);
        border: 1px solid var(--ct-light-gray);
    }

    .ct-method-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--ct-shadow-lg);
        background: var(--ct-white);
    }

    .ct-method-icon {
        width: 65px;
        height: 65px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        margin: 0 auto 20px;
    }

    .ct-method-icon-maroon {
        background: rgba(139, 35, 70, 0.15);
        color: var(--ct-maroon);
    }

    .ct-method-icon-blue {
        background: rgba(0, 82, 157, 0.15);
        color: var(--ct-dark-blue);
    }

    .ct-method-title {
        color: var(--ct-text-dark);
        font-size: 1.15rem;
        font-weight: 700;
        margin: 0 0 10px;
    }

    .ct-method-primary {
        color: var(--ct-text-dark);
        font-size: 0.95rem;
        font-weight: 600;
        margin: 0 0 5px;
    }

    .ct-method-secondary {
        color: var(--ct-gray);
        font-size: 0.9rem;
        margin: 0 0 15px;
    }

    .ct-method-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        border-radius: 10px;
        text-decoration: none;
        font-size: 0.85rem;
        font-weight: 600;
        transition: all var(--ct-transition);
    }

    .ct-method-btn:focus {
        outline: 3px solid currentColor;
        outline-offset: 2px;
    }

    .ct-method-btn-maroon {
        background: var(--ct-maroon);
        color: var(--ct-white);
    }

    .ct-method-btn-maroon:hover {
        background: var(--ct-dark-maroon);
        transform: translateY(-2px);
    }

    .ct-method-btn-blue {
        background: var(--ct-dark-blue);
        color: var(--ct-white);
    }

    .ct-method-btn-blue:hover {
        background: #003D7A;
        transform: translateY(-2px);
    }

    /* ==================== MAIN CONTACT SECTION ==================== */
    .ct-main-section {
        padding: 80px 20px;
        background: var(--ct-light-gray);
    }

    .ct-contact-grid {
        display: grid;
        grid-template-columns: 1fr 380px;
        gap: 40px;
        align-items: start;
    }

    /* Form Wrapper */
    .ct-form-wrapper {
        background: var(--ct-white);
        border-radius: var(--ct-radius-xl);
        padding: 40px;
        box-shadow: var(--ct-shadow);
        border: 1px solid var(--ct-light-gray);
    }

    .ct-form-header {
        margin-bottom: 30px;
    }

    .ct-form-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: rgba(139, 35, 70, 0.15);
        color: var(--ct-maroon);
        padding: 8px 16px;
        border-radius: var(--ct-radius-lg);
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 15px;
    }

    .ct-form-title {
        color: var(--ct-text-dark);
        font-size: 1.8rem;
        font-weight: 800;
        margin: 0 0 10px;
    }

    .ct-form-subtitle {
        color: var(--ct-gray);
        font-size: 1rem;
        line-height: 1.6;
        margin: 0;
    }

    .ct-success-message {
        display: flex;
        align-items: flex-start;
        gap: 15px;
        padding: 20px;
        background: rgba(16, 185, 129, 0.15);
        border-radius: 14px;
        margin-bottom: 25px;
        color: var(--ct-success);
        border: 1px solid rgba(16, 185, 129, 0.3);
        animation: ct-fade-in 0.3s ease;
    }

    .ct-success-message i {
        font-size: 1.5rem;
        flex-shrink: 0;
        margin-top: 2px;
    }

    .ct-success-message strong {
        display: block;
        margin-bottom: 5px;
    }

    .ct-success-message p {
        margin: 0;
        font-size: 0.9rem;
    }

    .ct-error-message {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 15px 20px;
        background: rgba(239, 68, 68, 0.15);
        border-radius: 14px;
        margin-bottom: 25px;
        color: var(--ct-error);
        border: 1px solid rgba(239, 68, 68, 0.3);
        animation: ct-fade-in 0.3s ease;
    }

    .ct-form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }

    .ct-form-group {
        margin-bottom: 20px;
    }

    .ct-label {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 10px;
        color: var(--ct-text-dark);
        font-size: 0.9rem;
        font-weight: 600;
    }

    .ct-label i {
        color: var(--ct-gray);
    }

    .ct-required {
        color: var(--ct-error);
    }

    .ct-input,
    .ct-select,
    .ct-textarea {
        width: 100%;
        padding: 16px 20px;
        border-radius: var(--ct-radius);
        border: 2px solid var(--ct-light-gray);
        font-size: 1rem;
        font-family: inherit;
        outline: none;
        box-sizing: border-box;
        transition: all var(--ct-transition);
        background: var(--ct-light-gray);
        color: var(--ct-text-dark);
    }

    .ct-input::placeholder,
    .ct-textarea::placeholder {
        color: var(--ct-text-muted);
    }

    .ct-input:focus,
    .ct-select:focus,
    .ct-textarea:focus {
        border-color: var(--ct-maroon);
        box-shadow: 0 0 0 3px rgba(139, 35, 70, 0.2);
        background: var(--ct-white);
    }

    .ct-select {
        cursor: pointer;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748B' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 16px center;
        padding-right: 40px;
    }

    .ct-textarea {
        resize: vertical;
        min-height: 120px;
    }

    .ct-submit-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        width: 100%;
        padding: 18px;
        background: linear-gradient(135deg, var(--ct-maroon) 0%, var(--ct-pink) 100%);
        color: var(--ct-white);
        border: none;
        border-radius: 14px;
        font-size: 1.1rem;
        font-weight: 700;
        font-family: inherit;
        cursor: pointer;
        box-shadow: 0 8px 25px rgba(139, 35, 70, 0.3);
        transition: all var(--ct-transition);
    }

    .ct-submit-btn:hover:not(:disabled) {
        transform: translateY(-3px);
        box-shadow: 0 12px 35px rgba(139, 35, 70, 0.4);
    }

    .ct-submit-btn:focus {
        outline: 3px solid var(--ct-maroon);
        outline-offset: 3px;
    }

    .ct-submit-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .ct-btn-spinner {
        width: 20px;
        height: 20px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top-color: var(--ct-white);
        border-radius: 50%;
        animation: ct-spin 1s linear infinite;
    }

    .ct-form-note {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 20px;
        color: var(--ct-gray);
        font-size: 0.85rem;
        justify-content: center;
    }

    .ct-form-note i {
        color: var(--ct-success);
    }

    /* ==================== SIDEBAR ==================== */
    .ct-sidebar {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .ct-whatsapp-card {
        background: linear-gradient(135deg, var(--ct-whatsapp) 0%, var(--ct-whatsapp-dark) 100%);
        padding: 30px;
        border-radius: var(--ct-radius-lg);
        text-align: center;
    }

    .ct-whatsapp-icon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.8rem;
        color: var(--ct-white);
        margin: 0 auto 15px;
    }

    .ct-whatsapp-title {
        color: var(--ct-white);
        font-size: 1.2rem;
        font-weight: 700;
        margin: 0 0 8px;
    }

    .ct-whatsapp-text {
        color: rgba(255, 255, 255, 0.9);
        font-size: 0.9rem;
        margin: 0 0 20px;
        line-height: 1.5;
    }

    .ct-whatsapp-btn {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 14px 28px;
        background: var(--ct-white);
        color: var(--ct-whatsapp);
        border-radius: var(--ct-radius);
        text-decoration: none;
        font-weight: 700;
        font-size: 1rem;
        transition: all var(--ct-transition);
    }

    .ct-whatsapp-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }

    .ct-whatsapp-btn:focus {
        outline: 3px solid var(--ct-white);
        outline-offset: 3px;
    }

    .ct-callback-card {
        background: linear-gradient(135deg, var(--ct-dark-blue) 0%, #003D7A 100%);
        padding: 30px;
        border-radius: var(--ct-radius-lg);
        text-align: center;
    }

    .ct-callback-icon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: rgba(0, 153, 214, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        color: var(--ct-light-blue);
        margin: 0 auto 15px;
    }

    .ct-callback-title {
        color: var(--ct-white);
        font-size: 1.2rem;
        font-weight: 700;
        margin: 0 0 8px;
    }

    .ct-callback-text {
        color: rgba(255, 255, 255, 0.85);
        font-size: 0.9rem;
        margin: 0 0 20px;
        line-height: 1.5;
    }

    .ct-callback-btn {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 14px 28px;
        background: var(--ct-light-blue);
        color: var(--ct-white);
        border-radius: var(--ct-radius);
        text-decoration: none;
        font-weight: 700;
        font-size: 1rem;
        box-shadow: 0 4px 15px rgba(0, 153, 214, 0.4);
        transition: all var(--ct-transition);
    }

    .ct-callback-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 25px rgba(0, 153, 214, 0.5);
    }

    .ct-callback-btn:focus {
        outline: 3px solid var(--ct-light-blue);
        outline-offset: 3px;
    }

    .ct-social-card {
        background: var(--ct-white);
        padding: 25px;
        border-radius: var(--ct-radius-lg);
        text-align: center;
        box-shadow: var(--ct-shadow);
        border: 1px solid var(--ct-light-gray);
    }

    .ct-social-title {
        color: var(--ct-text-dark);
        font-size: 1.1rem;
        font-weight: 700;
        margin: 0 0 5px;
    }

    .ct-social-text {
        color: var(--ct-gray);
        font-size: 0.85rem;
        margin: 0 0 15px;
    }

    .ct-social-links {
        display: flex;
        justify-content: center;
        gap: 10px;
    }

    .ct-social-link {
        width: 42px;
        height: 42px;
        border-radius: var(--ct-radius);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--ct-white);
        text-decoration: none;
        font-size: 1rem;
        transition: all var(--ct-transition);
    }

    .ct-social-link:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    }

    .ct-social-link:focus {
        outline: 3px solid currentColor;
        outline-offset: 2px;
    }

    .ct-social-facebook { background: #1877F2; }
    .ct-social-twitter { background: #1DA1F2; }
    .ct-social-linkedin { background: #0A66C2; }
    .ct-social-instagram { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); }
    .ct-social-youtube { background: #FF0000; }

    /* ==================== MAP SECTION ==================== */
    .ct-map-section {
        padding: 80px 20px;
        background: var(--ct-white);
    }

    .ct-section-header {
        text-align: center;
        margin-bottom: 40px;
    }

    .ct-section-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        border-radius: var(--ct-radius-full);
        font-size: 0.9rem;
        font-weight: 600;
        margin-bottom: 15px;
    }

    .ct-section-badge-blue {
        background: rgba(0, 82, 157, 0.15);
        color: var(--ct-dark-blue);
    }

    .ct-section-badge-light {
        background: rgba(255, 255, 255, 0.15);
        color: var(--ct-white);
    }

    .ct-section-title {
        color: var(--ct-text-dark);
        font-size: 2rem;
        font-weight: 800;
        margin: 0 0 10px;
    }

    .ct-section-title-light {
        color: var(--ct-white);
    }

    .ct-section-subtitle {
        color: var(--ct-gray);
        font-size: 1.05rem;
        margin: 0;
    }

    .ct-section-subtitle-light {
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 40px;
    }

    .ct-map-container {
        position: relative;
    }

    .ct-map-placeholder {
        border-radius: var(--ct-radius-lg);
        overflow: hidden;
        box-shadow: var(--ct-shadow-lg);
    }

    .ct-map-placeholder iframe {
        display: block;
    }

    .ct-map-info-card {
        position: absolute;
        bottom: 30px;
        left: 30px;
        background: var(--ct-white);
        padding: 25px;
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        display: flex;
        gap: 15px;
        max-width: 350px;
    }

    .ct-map-info-icon {
        width: 50px;
        height: 50px;
        border-radius: var(--ct-radius);
        background: rgba(139, 35, 70, 0.15);
        color: var(--ct-maroon);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.3rem;
        flex-shrink: 0;
    }

    .ct-map-info-content {
        flex: 1;
    }

    .ct-map-info-title {
        color: var(--ct-text-dark);
        font-size: 1.1rem;
        font-weight: 700;
        margin: 0 0 5px;
    }

    .ct-map-info-address {
        color: var(--ct-gray);
        font-size: 0.9rem;
        font-style: normal;
        line-height: 1.5;
        margin: 0 0 12px;
    }

    .ct-map-info-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: var(--ct-dark-blue);
        font-weight: 600;
        font-size: 0.9rem;
        text-decoration: none;
        transition: gap var(--ct-transition-fast);
    }

    .ct-map-info-btn:hover {
        gap: 12px;
    }

    .ct-map-info-btn:focus {
        outline: 2px solid var(--ct-dark-blue);
        outline-offset: 2px;
        border-radius: 4px;
    }

    /* ==================== FAQ SECTION ==================== */
    .ct-faq-section {
        padding: 100px 20px;
        background: linear-gradient(135deg, var(--ct-dark-blue) 0%, #003D7A 100%);
        position: relative;
        overflow: hidden;
    }

    .ct-faq-pattern {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M40 10L50 30H30L40 10zM40 70L30 50H50L40 70zM10 40L30 30V50L10 40zM70 40L50 50V30L70 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        opacity: 0.5;
        pointer-events: none;
    }

    .ct-faq-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 25px;
    }

    .ct-faq-card {
        background: rgba(255, 255, 255, 0.08);
        padding: 30px;
        border-radius: var(--ct-radius-lg);
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        transition: all var(--ct-transition);
    }

    .ct-faq-card:hover {
        background: rgba(255, 255, 255, 0.12);
        transform: translateY(-3px);
    }

    .ct-faq-number {
        display: inline-block;
        background: var(--ct-light-blue);
        color: var(--ct-white);
        padding: 6px 14px;
        border-radius: 10px;
        font-size: 0.85rem;
        font-weight: 700;
        margin-bottom: 15px;
    }

    .ct-faq-question {
        color: var(--ct-white);
        font-size: 1.1rem;
        font-weight: 700;
        margin: 0 0 12px;
        line-height: 1.4;
    }

    .ct-faq-answer {
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.95rem;
        line-height: 1.7;
        margin: 0;
    }

    .ct-faq-cta {
        text-align: center;
        margin-top: 50px;
    }

    .ct-faq-cta-text {
        color: rgba(255, 255, 255, 0.8);
        font-size: 1.1rem;
        margin: 0 0 20px;
    }

    .ct-faq-cta-btn {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 16px 32px;
        background: var(--ct-white);
        color: var(--ct-dark-blue);
        border-radius: var(--ct-radius);
        text-decoration: none;
        font-weight: 700;
        font-size: 1rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        transition: all var(--ct-transition);
    }

    .ct-faq-cta-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
    }

    .ct-faq-cta-btn:focus {
        outline: 3px solid var(--ct-white);
        outline-offset: 3px;
    }

    /* ==================== CTA SECTION ==================== */
    .ct-cta-section {
        padding: 100px 20px;
        background: linear-gradient(135deg, var(--ct-dark-maroon) 0%, var(--ct-maroon) 100%);
        text-align: center;
        position: relative;
        overflow: hidden;
    }

    .ct-cta-pattern {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M40 10L50 30H30L40 10zM40 70L30 50H50L40 70zM10 40L30 30V50L10 40zM70 40L50 50V30L70 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        opacity: 0.5;
        pointer-events: none;
    }

    .ct-cta-content {
        max-width: 700px;
        margin: 0 auto;
        position: relative;
        z-index: 1;
    }

    .ct-cta-icon {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: rgba(0, 153, 214, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 25px;
        font-size: 2rem;
        color: var(--ct-light-blue);
    }

    .ct-cta-title {
        color: var(--ct-white);
        font-size: 2.5rem;
        font-weight: 800;
        margin: 0 0 15px;
    }

    .ct-cta-text {
        color: rgba(255, 255, 255, 0.85);
        font-size: 1.15rem;
        margin: 0 0 20px;
        line-height: 1.6;
    }

    .ct-cta-tagline {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin-bottom: 35px;
        color: var(--ct-light-blue);
        font-size: 1.1rem;
        font-weight: 600;
        font-style: italic;
    }

    .ct-cta-btns {
        display: flex;
        gap: 15px;
        justify-content: center;
        flex-wrap: wrap;
    }

    .ct-cta-btn {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 16px 32px;
        border-radius: var(--ct-radius);
        text-decoration: none;
        font-weight: 600;
        font-size: 1rem;
        transition: all var(--ct-transition);
    }

    .ct-cta-btn:focus {
        outline: 3px solid currentColor;
        outline-offset: 3px;
    }

    .ct-cta-btn-primary {
        background: var(--ct-light-blue);
        color: var(--ct-white);
        box-shadow: 0 4px 20px rgba(0, 153, 214, 0.4);
    }

    .ct-cta-btn-primary:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 30px rgba(0, 153, 214, 0.5);
    }

    .ct-cta-btn-secondary {
        background: transparent;
        color: var(--ct-white);
        border: 2px solid rgba(255, 255, 255, 0.3);
    }

    .ct-cta-btn-secondary:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.5);
        transform: translateY(-3px);
    }

    /* ==================== RESPONSIVE STYLES ==================== */
    @media screen and (max-width: 1024px) {
        .ct-hero-container {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 40px;
        }

        .ct-hero-content {
            max-width: 100%;
        }

        .ct-hero-images {
            display: none;
        }

        .ct-hero-quick-contact {
            justify-content: center;
        }

        .ct-tagline,
        .ct-cta-tagline {
            justify-content: center;
        }

        .ct-methods-grid {
            grid-template-columns: repeat(2, 1fr);
        }

        .ct-contact-grid {
            grid-template-columns: 1fr;
        }

        .ct-sidebar {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
        }

        .ct-social-card {
            grid-column: span 2;
        }

        .ct-faq-grid {
            grid-template-columns: 1fr;
        }
    }

    @media screen and (max-width: 768px) {
        .ct-hero {
            padding: 80px 0 50px;
        }

        .ct-hero-title {
            font-size: 2rem;
        }

        .ct-hero-subtitle {
            font-size: 1rem;
        }

        .ct-hero-quick-contact {
            flex-direction: column;
            align-items: center;
        }

        .ct-hero-quick-item {
            width: 100%;
            max-width: 300px;
            justify-content: center;
        }

        .ct-methods-grid {
            grid-template-columns: 1fr;
        }

        .ct-form-row {
            grid-template-columns: 1fr;
        }

        .ct-form-wrapper {
            padding: 30px 20px;
        }

        .ct-form-title {
            font-size: 1.5rem;
        }

        .ct-sidebar {
            grid-template-columns: 1fr;
        }

        .ct-social-card {
            grid-column: span 1;
        }

        .ct-map-info-card {
            position: static;
            max-width: 100%;
            margin-top: 20px;
        }

        .ct-section-title,
        .ct-cta-title {
            font-size: 1.8rem;
        }

        .ct-faq-card {
            padding: 25px 20px;
        }

        .ct-cta-btns {
            flex-direction: column;
            width: 100%;
        }

        .ct-cta-btn {
            width: 100%;
            justify-content: center;
        }
    }

    @media screen and (max-width: 480px) {
        .ct-hero-title {
            font-size: 1.7rem;
        }

        .ct-tagline,
        .ct-cta-tagline {
            font-size: 0.95rem;
            gap: 10px;
        }

        .ct-hero-badge,
        .ct-form-badge,
        .ct-section-badge {
            font-size: 0.8rem;
            padding: 8px 14px;
        }

        .ct-method-card {
            padding: 25px 20px;
        }

        .ct-method-icon {
            width: 55px;
            height: 55px;
            font-size: 1.3rem;
        }

        .ct-submit-btn {
            padding: 16px;
            font-size: 1rem;
        }

        .ct-whatsapp-card,
        .ct-callback-card {
            padding: 25px 20px;
        }

        .ct-faq-section,
        .ct-cta-section {
            padding: 70px 20px;
        }

        .ct-cta-icon {
            width: 60px;
            height: 60px;
            font-size: 1.5rem;
        }
    }

    /* ==================== REDUCED MOTION ==================== */
    @media (prefers-reduced-motion: reduce) {
        .ct-floating-image,
        .ct-floating-card,
        .ct-decor-circle,
        .ct-btn-spinner {
            animation: none !important;
        }

        .ct-hero-content,
        .ct-success-message,
        .ct-error-message {
            animation: none !important;
        }

        .ct-hero-quick-item,
        .ct-method-card,
        .ct-method-btn,
        .ct-submit-btn,
        .ct-whatsapp-btn,
        .ct-callback-btn,
        .ct-social-link,
        .ct-faq-card,
        .ct-faq-cta-btn,
        .ct-cta-btn,
        .ct-map-info-btn {
            transition: none !important;
        }

        .ct-btn-spinner {
            border-top-color: transparent;
        }
    }

    /* ==================== TOUCH DEVICES ==================== */
    @media (hover: none) and (pointer: coarse) {
        .ct-hero-quick-item:hover,
        .ct-method-card:hover,
        .ct-method-btn:hover,
        .ct-submit-btn:hover,
        .ct-whatsapp-btn:hover,
        .ct-callback-btn:hover,
        .ct-social-link:hover,
        .ct-faq-card:hover,
        .ct-faq-cta-btn:hover,
        .ct-cta-btn:hover {
            transform: none;
        }
    }

    /* ==================== HIGH CONTRAST ==================== */
    @media (prefers-contrast: high) {
        .ct-input:focus,
        .ct-select:focus,
        .ct-textarea:focus {
            border-width: 3px;
        }

        .ct-submit-btn:focus,
        .ct-method-btn:focus,
        .ct-whatsapp-btn:focus,
        .ct-callback-btn:focus,
        .ct-social-link:focus,
        .ct-faq-cta-btn:focus,
        .ct-cta-btn:focus {
            outline-width: 4px;
        }

        .ct-faq-card,
        .ct-method-card {
            border-width: 2px;
        }
    }

    /* ==================== PRINT STYLES ==================== */
    @media print {
        .ct-hero {
            background: var(--ct-white) !important;
            padding: 30px 0;
        }

        .ct-hero-pattern,
        .ct-hero-images,
        .ct-faq-pattern,
        .ct-cta-pattern {
            display: none;
        }

        .ct-hero-title,
        .ct-hero-subtitle,
        .ct-highlight {
            color: var(--ct-text-dark) !important;
        }

        .ct-hero-quick-contact,
        .ct-sidebar,
        .ct-map-placeholder,
        .ct-faq-section,
        .ct-cta-section {
            display: none;
        }

        .ct-methods-section,
        .ct-main-section,
        .ct-map-section {
            background: var(--ct-white);
        }

        .ct-contact-grid {
            grid-template-columns: 1fr;
        }

        .ct-form-wrapper,
        .ct-method-card,
        .ct-map-info-card {
            box-shadow: none;
            border: 1px solid var(--ct-gray);
            break-inside: avoid;
        }

        .ct-submit-btn {
            display: none;
        }
    }
`;

export default Contact;
