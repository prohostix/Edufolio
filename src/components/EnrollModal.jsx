"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../api';

const EnrollModal = ({ isOpen, onClose, program, university }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        countryCode: '+91',
        education: '',
        experience: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Handle escape key to close modal
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const fullPhone = `${formData.countryCode}${formData.phone.replace(/\D/g, '')}`;
            await axios.post(`${API_BASE}/enquiry`, {
                ...formData,
                phone: fullPhone,
                programId: program?._id,
                universityId: university?._id || program?.universityId?._id,
                source: 'Enrollment Form',
                message: `
Education: ${formData.education}
Experience: ${formData.experience}
Program Interest: ${program?.name || 'General Inquiry'}
University: ${university?.name || program?.universityId?.name || 'Not specified'}
Additional Message: ${formData.message}
                `.trim()
            });

            setSuccess(true);
            setTimeout(() => {
                onClose();
                setSuccess(false);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    countryCode: '+91',
                    education: '',
                    experience: '',
                    message: ''
                });
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="enroll-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="enroll-modal-title">
            <style>{`
                /* ==================== ENROLL MODAL STYLES ==================== */
                
                /* ==================== CSS VARIABLES ==================== */
                .enroll-modal-overlay {
                    --enroll-primary: #FF6B35;
                    --enroll-primary-light: #FF8B5C;
                    --enroll-primary-shadow: rgba(255, 107, 53, 0.3);
                    --enroll-dark: #0F172A;
                    --enroll-dark-light: #1E293B;
                    --enroll-gray-100: #F1F5F9;
                    --enroll-gray-200: #E2E8F0;
                    --enroll-gray-400: #94A3B8;
                    --enroll-gray-500: #64748B;
                    --enroll-gray-700: #334155;
                    --enroll-white: #FFFFFF;
                    --enroll-success: #10B981;
                    --enroll-error: #DC2626;
                    --enroll-error-bg: #FEE2E2;
                    --enroll-radius: 10px;
                    --enroll-radius-lg: 12px;
                    --enroll-radius-xl: 24px;
                    --enroll-transition: 0.2s ease;
                }

                /* ==================== OVERLAY ==================== */
                .enroll-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.7);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    padding: 20px;
                    backdrop-filter: blur(5px);
                    -webkit-backdrop-filter: blur(5px);
                    animation: enroll-overlay-fade-in 0.2s ease;
                }

                @keyframes enroll-overlay-fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                /* ==================== MODAL ==================== */
                .enroll-modal {
                    background: var(--enroll-white);
                    border-radius: var(--enroll-radius-xl);
                    max-width: 550px;
                    width: 100%;
                    max-height: 90vh;
                    overflow: auto;
                    position: relative;
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
                    animation: enroll-modal-slide-up 0.3s ease;
                }

                @keyframes enroll-modal-slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px) scale(0.98);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                /* Custom scrollbar for modal */
                .enroll-modal::-webkit-scrollbar {
                    width: 6px;
                }

                .enroll-modal::-webkit-scrollbar-track {
                    background: var(--enroll-gray-100);
                    border-radius: 3px;
                }

                .enroll-modal::-webkit-scrollbar-thumb {
                    background: var(--enroll-gray-400);
                    border-radius: 3px;
                }

                .enroll-modal::-webkit-scrollbar-thumb:hover {
                    background: var(--enroll-gray-500);
                }

                /* ==================== CLOSE BUTTON ==================== */
                .enroll-modal-close {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: rgba(255, 255, 255, 0.15);
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.1rem;
                    color: var(--enroll-white);
                    transition: all var(--enroll-transition);
                    z-index: 1;
                }

                .enroll-modal-close:hover {
                    background: rgba(255, 255, 255, 0.25);
                    transform: rotate(90deg);
                }

                .enroll-modal-close:focus {
                    outline: 3px solid var(--enroll-primary);
                    outline-offset: 2px;
                }

                /* ==================== HEADER ==================== */
                .enroll-modal-header {
                    text-align: center;
                    padding: 30px 30px 20px;
                    background: linear-gradient(135deg, var(--enroll-dark) 0%, var(--enroll-dark-light) 100%);
                    border-radius: var(--enroll-radius-xl) var(--enroll-radius-xl) 0 0;
                    position: relative;
                    overflow: hidden;
                }

                .enroll-modal-header::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    right: -30%;
                    width: 200px;
                    height: 200px;
                    background: rgba(255, 107, 53, 0.1);
                    border-radius: 50%;
                    pointer-events: none;
                }

                .enroll-modal-header-icon {
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, var(--enroll-primary) 0%, var(--enroll-primary-light) 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 15px;
                    font-size: 1.8rem;
                    color: var(--enroll-white);
                    box-shadow: 0 10px 30px rgba(255, 107, 53, 0.4);
                    position: relative;
                }

                .enroll-modal-title {
                    color: var(--enroll-white);
                    font-size: 1.6rem;
                    font-weight: 700;
                    margin: 0 0 10px;
                    position: relative;
                }

                .enroll-modal-program {
                    color: var(--enroll-primary);
                    font-size: 1.1rem;
                    font-weight: 600;
                    margin: 0 0 8px;
                    position: relative;
                }

                .enroll-modal-university {
                    color: var(--enroll-gray-400);
                    font-size: 0.95rem;
                    margin: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    position: relative;
                }

                /* ==================== FORM ==================== */
                .enroll-modal-form {
                    padding: 25px 30px 30px;
                }

                .enroll-modal-error {
                    background: var(--enroll-error-bg);
                    color: var(--enroll-error);
                    padding: 12px 15px;
                    border-radius: var(--enroll-radius);
                    margin-bottom: 20px;
                    font-size: 0.9rem;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    animation: enroll-shake 0.4s ease;
                }

                @keyframes enroll-shake {
                    0%, 100% { transform: translateX(0); }
                    20%, 60% { transform: translateX(-5px); }
                    40%, 80% { transform: translateX(5px); }
                }

                .enroll-modal-row {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 15px;
                    margin-bottom: 15px;
                }

                .enroll-modal-input-group {
                    margin-bottom: 5px;
                }

                .enroll-modal-label {
                    display: block;
                    margin-bottom: 6px;
                    color: var(--enroll-gray-700);
                    font-size: 0.9rem;
                    font-weight: 600;
                }

                .enroll-modal-input,
                .enroll-modal-select,
                .enroll-modal-textarea {
                    width: 100%;
                    padding: 12px 15px;
                    border: 2px solid var(--enroll-gray-200);
                    border-radius: var(--enroll-radius);
                    font-size: 1rem;
                    font-family: inherit;
                    box-sizing: border-box;
                    transition: border-color var(--enroll-transition), box-shadow var(--enroll-transition);
                    background: var(--enroll-white);
                }

                .enroll-modal-input:focus,
                .enroll-modal-select:focus,
                .enroll-modal-textarea:focus {
                    outline: none;
                    border-color: var(--enroll-primary);
                    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
                    z-index: 2;
                }

                .enroll-phone-wrapper {
                    display: flex;
                    gap: 0;
                    position: relative;
                }

                .enroll-cc-select {
                    width: 90px;
                    padding: 12px 10px 12px 15px;
                    border: 2px solid var(--enroll-gray-200);
                    border-radius: var(--enroll-radius) 0 0 var(--enroll-radius);
                    background: var(--enroll-white);
                    color: var(--enroll-dark);
                    font-size: 0.95rem;
                    font-family: inherit;
                    cursor: pointer;
                    border-right: none;
                    transition: border-color var(--enroll-transition);
                    -webkit-appearance: none;
                    appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748B' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 10px center;
                }

                .enroll-input-phone {
                    border-radius: 0 var(--enroll-radius) var(--enroll-radius) 0 !important;
                }

                .enroll-modal-input::placeholder,
                .enroll-modal-textarea::placeholder {
                    color: var(--enroll-gray-400);
                }

                .enroll-modal-select {
                    cursor: pointer;
                    appearance: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748B' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 15px center;
                    padding-right: 40px;
                }

                .enroll-modal-textarea {
                    resize: vertical;
                    min-height: 80px;
                }

                /* ==================== SUBMIT BUTTON ==================== */
                .enroll-modal-submit {
                    width: 100%;
                    padding: 16px;
                    background: linear-gradient(135deg, var(--enroll-primary) 0%, var(--enroll-primary-light) 100%);
                    color: var(--enroll-white);
                    border: none;
                    border-radius: var(--enroll-radius-lg);
                    font-size: 1.05rem;
                    font-weight: 600;
                    font-family: inherit;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    margin-top: 20px;
                    box-shadow: 0 4px 15px var(--enroll-primary-shadow);
                    transition: transform var(--enroll-transition), box-shadow var(--enroll-transition);
                }

                .enroll-modal-submit:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px var(--enroll-primary-shadow);
                }

                .enroll-modal-submit:active:not(:disabled) {
                    transform: translateY(0);
                }

                .enroll-modal-submit:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .enroll-modal-submit:focus {
                    outline: 3px solid var(--enroll-primary);
                    outline-offset: 2px;
                }

                /* ==================== DISCLAIMER ==================== */
                .enroll-modal-disclaimer {
                    text-align: center;
                    color: var(--enroll-gray-500);
                    font-size: 0.8rem;
                    margin-top: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                }

                .enroll-modal-disclaimer i {
                    color: var(--enroll-success);
                }

                /* ==================== SUCCESS STATE ==================== */
                .enroll-modal-success {
                    padding: 60px 30px;
                    text-align: center;
                    animation: enroll-success-fade-in 0.4s ease;
                }

                @keyframes enroll-success-fade-in {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .enroll-modal-success-icon {
                    font-size: 4rem;
                    color: var(--enroll-success);
                    margin-bottom: 20px;
                    animation: enroll-success-bounce 0.6s ease;
                }

                @keyframes enroll-success-bounce {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                }

                .enroll-modal-success-title {
                    color: var(--enroll-dark);
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: 10px;
                }

                .enroll-modal-success-text {
                    color: var(--enroll-gray-500);
                    font-size: 1rem;
                    line-height: 1.6;
                    max-width: 350px;
                    margin: 0 auto;
                }

                /* ==================== RESPONSIVE ==================== */
                @media screen and (max-width: 600px) {
                    .enroll-modal-overlay {
                        padding: 15px;
                        align-items: flex-end;
                    }

                    .enroll-modal {
                        max-height: 85vh;
                        border-radius: var(--enroll-radius-xl) var(--enroll-radius-xl) 0 0;
                        animation: enroll-modal-slide-up-mobile 0.3s ease;
                    }

                    @keyframes enroll-modal-slide-up-mobile {
                        from {
                            opacity: 0;
                            transform: translateY(100%);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    .enroll-modal-header {
                        padding: 25px 20px 20px;
                    }

                    .enroll-modal-header-icon {
                        width: 60px;
                        height: 60px;
                        font-size: 1.5rem;
                    }

                    .enroll-modal-title {
                        font-size: 1.4rem;
                    }

                    .enroll-modal-form {
                        padding: 20px;
                    }

                    .enroll-modal-row {
                        grid-template-columns: 1fr;
                        gap: 10px;
                    }

                    .enroll-modal-submit {
                        padding: 14px;
                        font-size: 1rem;
                    }

                    .enroll-modal-success {
                        padding: 40px 20px;
                    }

                    .enroll-modal-success-icon {
                        font-size: 3rem;
                    }

                    .enroll-modal-success-title {
                        font-size: 1.3rem;
                    }
                }

                @media screen and (max-width: 400px) {
                    .enroll-modal-input,
                    .enroll-modal-select,
                    .enroll-modal-textarea {
                        padding: 10px 12px;
                        font-size: 0.95rem;
                    }

                    .enroll-modal-label {
                        font-size: 0.85rem;
                    }
                }

                /* ==================== REDUCED MOTION ==================== */
                @media (prefers-reduced-motion: reduce) {
                    .enroll-modal-overlay,
                    .enroll-modal,
                    .enroll-modal-close,
                    .enroll-modal-submit,
                    .enroll-modal-input,
                    .enroll-modal-select,
                    .enroll-modal-textarea,
                    .enroll-modal-success,
                    .enroll-modal-success-icon,
                    .enroll-modal-error {
                        animation: none !important;
                        transition-duration: 0.01ms !important;
                    }
                }

                /* ==================== TOUCH DEVICES ==================== */
                @media (hover: none) and (pointer: coarse) {
                    .enroll-modal-submit:hover:not(:disabled) {
                        transform: none;
                    }

                    .enroll-modal-submit:active:not(:disabled) {
                        transform: scale(0.98);
                        opacity: 0.9;
                    }

                    .enroll-modal-close:hover {
                        transform: none;
                    }

                    .enroll-modal-close:active {
                        background: rgba(255, 255, 255, 0.3);
                    }
                }

                /* ==================== HIGH CONTRAST ==================== */
                @media (prefers-contrast: high) {
                    .enroll-modal-input,
                    .enroll-modal-select,
                    .enroll-modal-textarea {
                        border-width: 3px;
                    }

                    .enroll-modal-input:focus,
                    .enroll-modal-select:focus,
                    .enroll-modal-textarea:focus {
                        outline: 3px solid var(--enroll-dark);
                    }
                }
            `}</style>

            <div 
                className="enroll-modal" 
                onClick={(e) => e.stopPropagation()}
                role="document"
            >
                {/* Close Button */}
                <button 
                    className="enroll-modal-close" 
                    onClick={onClose}
                    aria-label="Close enrollment form"
                    type="button"
                >
                    <i className="fa-solid fa-times"></i>
                </button>

                {success ? (
                    <div className="enroll-modal-success">
                        <div className="enroll-modal-success-icon">
                            <i className="fa-solid fa-check-circle"></i>
                        </div>
                        <h2 className="enroll-modal-success-title">Enrollment Request Submitted!</h2>
                        <p className="enroll-modal-success-text">
                            Thank you for your interest. Our counselor will contact you within 24 hours.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="enroll-modal-header">
                            <div className="enroll-modal-header-icon">
                                <i className="fa-solid fa-graduation-cap"></i>
                            </div>
                            <h2 id="enroll-modal-title" className="enroll-modal-title">Enroll Now</h2>
                            {program && (
                                <p className="enroll-modal-program">{program.name}</p>
                            )}
                            {(university || program?.universityId) && (
                                <p className="enroll-modal-university">
                                    <i className="fa-solid fa-building-columns"></i>
                                    {university?.name || program?.universityId?.name}
                                </p>
                            )}
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="enroll-modal-form">
                            {error && (
                                <div className="enroll-modal-error" role="alert">
                                    <i className="fa-solid fa-exclamation-circle"></i> {error}
                                </div>
                            )}

                            <div className="enroll-modal-row">
                                <div className="enroll-modal-input-group">
                                    <label htmlFor="enroll-name" className="enroll-modal-label">
                                        Full Name <span aria-hidden="true">*</span>
                                    </label>
                                    <input
                                        id="enroll-name"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        className="enroll-modal-input"
                                        required
                                        aria-required="true"
                                    />
                                </div>
                            </div>

                            <div className="enroll-modal-row">
                                <div className="enroll-modal-input-group">
                                    <label htmlFor="enroll-email" className="enroll-modal-label">
                                        Email Address <span aria-hidden="true">*</span>
                                    </label>
                                    <input
                                        id="enroll-email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className="enroll-modal-input"
                                        required
                                        aria-required="true"
                                    />
                                </div>
                                <div className="enroll-modal-input-group">
                                    <label htmlFor="enroll-phone" className="enroll-modal-label">
                                        Phone Number <span aria-hidden="true">*</span>
                                    </label>
                                    <div className="enroll-phone-wrapper">
                                        <select 
                                            className="enroll-modal-select enroll-cc-select"
                                            name="countryCode"
                                            value={formData.countryCode}
                                            onChange={handleChange}
                                            aria-label="Country Code"
                                        >
                                            <option value="+91">+91 (IN)</option>
                                            <option value="+1">+1 (US/CA)</option>
                                            <option value="+44">+44 (UK)</option>
                                            <option value="+61">+61 (AU)</option>
                                            <option value="+971">+971 (UAE)</option>
                                            <option value="+65">+65 (SG)</option>
                                            <option value="+49">+49 (DE)</option>
                                            <option value="+33">+33 (FR)</option>
                                            <option value="+81">+81 (JP)</option>
                                            <option value="+966">+966 (SA)</option>
                                            <option value="+974">+974 (QA)</option>
                                            <option value="+965">+965 (KW)</option>
                                            <option value="+234">+234 (NG)</option>
                                            <option value="+254">+254 (KE)</option>
                                        </select>
                                        <input
                                            id="enroll-phone"
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Phone Number"
                                            className="enroll-modal-input enroll-input-phone"
                                            required
                                            aria-required="true"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="enroll-modal-row">
                                <div className="enroll-modal-input-group">
                                    <label htmlFor="enroll-education" className="enroll-modal-label">
                                        Highest Education <span aria-hidden="true">*</span>
                                    </label>
                                    <select
                                        id="enroll-education"
                                        name="education"
                                        value={formData.education}
                                        onChange={handleChange}
                                        className="enroll-modal-select"
                                        required
                                        aria-required="true"
                                    >
                                        <option value="">Select your education</option>
                                        <option value="10th">10th Pass</option>
                                        <option value="12th">12th Pass</option>
                                        <option value="Diploma">Diploma</option>
                                        <option value="Graduate">Graduate</option>
                                        <option value="Post Graduate">Post Graduate</option>
                                        <option value="PhD">PhD</option>
                                    </select>
                                </div>
                                <div className="enroll-modal-input-group">
                                    <label htmlFor="enroll-experience" className="enroll-modal-label">
                                        Work Experience
                                    </label>
                                    <select
                                        id="enroll-experience"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        className="enroll-modal-select"
                                    >
                                        <option value="">Select experience</option>
                                        <option value="Fresher">Fresher</option>
                                        <option value="0-1 Years">0-1 Years</option>
                                        <option value="1-3 Years">1-3 Years</option>
                                        <option value="3-5 Years">3-5 Years</option>
                                        <option value="5-10 Years">5-10 Years</option>
                                        <option value="10+ Years">10+ Years</option>
                                    </select>
                                </div>
                            </div>

                            <div className="enroll-modal-input-group">
                                <label htmlFor="enroll-message" className="enroll-modal-label">
                                    Any Questions or Message
                                </label>
                                <textarea
                                    id="enroll-message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us about your goals or any questions you have..."
                                    className="enroll-modal-textarea"
                                    rows="3"
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                className="enroll-modal-submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <i className="fa-solid fa-spinner fa-spin"></i> Submitting...
                                    </>
                                ) : (
                                    <>
                                        <i className="fa-solid fa-paper-plane"></i> Submit Enrollment Request
                                    </>
                                )}
                            </button>

                            <p className="enroll-modal-disclaimer">
                                <i className="fa-solid fa-shield-check"></i>
                                Your information is secure and will not be shared with third parties.
                            </p>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default EnrollModal;
