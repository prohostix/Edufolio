"use client";
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../api';

const EnquiryForm = ({ programId, universityId, source = 'Website' }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [focusedField, setFocusedField] = useState(null);
    const formRef = useRef(null);
    const firstInputRef = useRef(null);

    // Focus first input on mount
    useEffect(() => {
        if (firstInputRef.current && !success) {
            firstInputRef.current.focus();
        }
    }, [success]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
        await axios.post(`${API_BASE}/enquiry`, {
                ...formData,
                programId,
                universityId,
                source
            });

            setSuccess(true);
            setFormData({ name: '', email: '', phone: '' });

            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
            // Scroll to error
            if (formRef.current) {
                formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setSuccess(false);
        setFormData({ name: '', email: '', phone: '' });
    };

    return (
        <>
            <style>{`
                /* ==================== ENQUIRY FORM STYLES ==================== */
                
                /* ==================== CSS VARIABLES ==================== */
                .ef-form-card,
                .ef-success-card {
                    --ef-primary: #FF6B35;
                    --ef-primary-light: #FF8B5C;
                    --ef-primary-shadow: rgba(255, 107, 53, 0.3);
                    --ef-dark: #0F172A;
                    --ef-gray-100: #F1F5F9;
                    --ef-gray-200: #E2E8F0;
                    --ef-gray-400: #94A3B8;
                    --ef-gray-500: #64748B;
                    --ef-white: #FFFFFF;
                    --ef-success: #10B981;
                    --ef-success-bg: #ECFDF5;
                    --ef-error: #DC2626;
                    --ef-error-bg: #FEF2F2;
                    --ef-radius: 10px;
                    --ef-radius-lg: 20px;
                    --ef-transition: 0.3s ease;
                    --ef-transition-fast: 0.2s ease;
                }

                /* ==================== FORM CARD ==================== */
                .ef-form-card {
                    background: var(--ef-white);
                    border-radius: var(--ef-radius-lg);
                    padding: 30px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
                    animation: ef-fade-in 0.4s ease;
                }

                @keyframes ef-fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .ef-form-title {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: var(--ef-dark);
                    font-size: 1.3rem;
                    font-weight: 700;
                    margin: 0 0 8px 0;
                }

                .ef-form-title i {
                    color: var(--ef-primary);
                }

                .ef-form-subtitle {
                    color: var(--ef-gray-500);
                    font-size: 0.9rem;
                    margin: 0 0 25px 0;
                }

                /* ==================== FORM ==================== */
                .ef-form {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                /* ==================== ERROR MESSAGE ==================== */
                .ef-error {
                    background: var(--ef-error-bg);
                    color: var(--ef-error);
                    padding: 12px 15px;
                    border-radius: var(--ef-radius);
                    font-size: 0.9rem;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    animation: ef-shake 0.5s ease;
                    border-left: 4px solid var(--ef-error);
                }

                @keyframes ef-shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }

                .ef-error i {
                    font-size: 1rem;
                    flex-shrink: 0;
                }

                /* ==================== INPUT FIELDS ==================== */
                .ef-field {
                    position: relative;
                }

                .ef-input,
                .ef-textarea {
                    width: 100%;
                    padding: 14px 16px;
                    padding-left: 45px;
                    border-radius: var(--ef-radius);
                    border: 2px solid var(--ef-gray-200);
                    font-size: 1rem;
                    font-family: inherit;
                    box-sizing: border-box;
                    transition: border-color var(--ef-transition-fast), box-shadow var(--ef-transition-fast);
                    background: var(--ef-white);
                    color: var(--ef-dark);
                }

                .ef-textarea {
                    padding-left: 16px;
                    resize: vertical;
                    min-height: 80px;
                }

                .ef-input:hover,
                .ef-textarea:hover {
                    border-color: var(--ef-gray-400);
                }

                .ef-input:focus,
                .ef-textarea:focus {
                    outline: none;
                    border-color: var(--ef-primary);
                    box-shadow: 0 0 0 4px var(--ef-primary-shadow);
                }

                .ef-input::placeholder,
                .ef-textarea::placeholder {
                    color: var(--ef-gray-400);
                }

                .ef-field-icon {
                    position: absolute;
                    left: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--ef-gray-400);
                    font-size: 1rem;
                    transition: color var(--ef-transition-fast);
                    pointer-events: none;
                }

                .ef-field.focused .ef-field-icon {
                    color: var(--ef-primary);
                }

                /* ==================== SUBMIT BUTTON ==================== */
                .ef-submit-btn {
                    width: 100%;
                    padding: 15px 20px;
                    background: linear-gradient(135deg, var(--ef-primary) 0%, var(--ef-primary-light) 100%);
                    color: var(--ef-white);
                    border: none;
                    border-radius: var(--ef-radius);
                    font-size: 1rem;
                    font-weight: 600;
                    font-family: inherit;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    margin-top: 10px;
                    transition: transform var(--ef-transition-fast), box-shadow var(--ef-transition-fast), opacity var(--ef-transition-fast);
                    box-shadow: 0 4px 15px var(--ef-primary-shadow);
                    position: relative;
                    overflow: hidden;
                }

                .ef-submit-btn::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255, 255, 255, 0.2),
                        transparent
                    );
                    transition: left 0.5s ease;
                }

                .ef-submit-btn:hover:not(:disabled)::before {
                    left: 100%;
                }

                .ef-submit-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px var(--ef-primary-shadow);
                }

                .ef-submit-btn:active:not(:disabled) {
                    transform: translateY(0);
                }

                .ef-submit-btn:focus {
                    outline: 3px solid var(--ef-primary);
                    outline-offset: 3px;
                }

                .ef-submit-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .ef-submit-btn i {
                    font-size: 0.95rem;
                }

                /* ==================== PRIVACY TEXT ==================== */
                .ef-privacy {
                    text-align: center;
                    color: var(--ef-gray-400);
                    font-size: 0.8rem;
                    margin: 15px 0 0 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                }

                .ef-privacy i {
                    color: var(--ef-success);
                }

                /* ==================== SUCCESS CARD ==================== */
                .ef-success-card {
                    background: var(--ef-white);
                    border-radius: var(--ef-radius-lg);
                    padding: 40px 30px;
                    text-align: center;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
                    animation: ef-success-appear 0.5s ease;
                }

                @keyframes ef-success-appear {
                    0% {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    50% {
                        transform: scale(1.02);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .ef-success-icon-wrapper {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background: var(--ef-success-bg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                    animation: ef-icon-bounce 0.6s ease 0.2s both;
                }

                @keyframes ef-icon-bounce {
                    0% {
                        transform: scale(0);
                    }
                    50% {
                        transform: scale(1.2);
                    }
                    100% {
                        transform: scale(1);
                    }
                }

                .ef-success-icon {
                    font-size: 2.5rem;
                    color: var(--ef-success);
                }

                .ef-success-title {
                    color: var(--ef-dark);
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin: 0 0 10px 0;
                }

                .ef-success-text {
                    color: var(--ef-gray-500);
                    font-size: 0.95rem;
                    margin: 0 0 20px 0;
                    line-height: 1.5;
                }

                .ef-success-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 24px;
                    background: var(--ef-gray-100);
                    color: var(--ef-gray-500);
                    border: none;
                    border-radius: var(--ef-radius);
                    font-size: 0.9rem;
                    font-weight: 600;
                    font-family: inherit;
                    cursor: pointer;
                    transition: all var(--ef-transition-fast);
                }

                .ef-success-btn:hover {
                    background: var(--ef-gray-200);
                    color: var(--ef-dark);
                }

                .ef-success-btn:focus {
                    outline: 3px solid var(--ef-gray-400);
                    outline-offset: 2px;
                }

                /* ==================== RESPONSIVE ==================== */
                @media screen and (max-width: 768px) {
                    .ef-form-card,
                    .ef-success-card {
                        padding: 25px 20px;
                        border-radius: 16px;
                    }

                    .ef-form-title {
                        font-size: 1.2rem;
                    }

                    .ef-form-subtitle {
                        font-size: 0.85rem;
                        margin-bottom: 20px;
                    }

                    .ef-input,
                    .ef-textarea {
                        padding: 12px 14px;
                        padding-left: 42px;
                        font-size: 16px; /* Prevents zoom on iOS */
                    }

                    .ef-textarea {
                        padding-left: 14px;
                    }

                    .ef-field-icon {
                        left: 14px;
                    }

                    .ef-submit-btn {
                        padding: 14px 18px;
                        font-size: 0.95rem;
                    }

                    .ef-success-icon-wrapper {
                        width: 70px;
                        height: 70px;
                    }

                    .ef-success-icon {
                        font-size: 2rem;
                    }

                    .ef-success-title {
                        font-size: 1.3rem;
                    }

                    .ef-success-text {
                        font-size: 0.9rem;
                    }
                }

                @media screen and (max-width: 400px) {
                    .ef-form-card,
                    .ef-success-card {
                        padding: 20px 15px;
                    }

                    .ef-form-title {
                        font-size: 1.1rem;
                    }

                    .ef-input,
                    .ef-textarea {
                        padding: 12px;
                        padding-left: 38px;
                    }

                    .ef-textarea {
                        padding-left: 12px;
                    }

                    .ef-field-icon {
                        left: 12px;
                        font-size: 0.9rem;
                    }
                }

                /* ==================== REDUCED MOTION ==================== */
                @media (prefers-reduced-motion: reduce) {
                    .ef-form-card,
                    .ef-success-card,
                    .ef-error,
                    .ef-success-icon-wrapper,
                    .ef-submit-btn,
                    .ef-input,
                    .ef-textarea {
                        animation: none !important;
                        transition-duration: 0.01ms !important;
                    }

                    .ef-submit-btn::before {
                        display: none;
                    }
                }

                /* ==================== TOUCH DEVICES ==================== */
                @media (hover: none) and (pointer: coarse) {
                    .ef-submit-btn:hover:not(:disabled) {
                        transform: none;
                    }

                    .ef-submit-btn:active:not(:disabled) {
                        transform: scale(0.98);
                    }

                    .ef-input:hover,
                    .ef-textarea:hover {
                        border-color: var(--ef-gray-200);
                    }
                }

                /* ==================== HIGH CONTRAST ==================== */
                @media (prefers-contrast: high) {
                    .ef-input,
                    .ef-textarea {
                        border-width: 3px;
                    }

                    .ef-error {
                        border-left-width: 6px;
                    }
                }

                /* ==================== DARK MODE SUPPORT ==================== */
                @media (prefers-color-scheme: dark) {
                    .ef-form-card,
                    .ef-success-card {
                        /* Uncomment below for dark mode support */
                        /* background: #1E293B;
                        --ef-dark: #F8FAFC;
                        --ef-gray-200: #334155;
                        --ef-gray-400: #64748B;
                        --ef-gray-500: #94A3B8; */
                    }
                }
            `}</style>

            {success ? (
                <div className="ef-success-card" role="alert" aria-live="polite">
                    <div className="ef-success-icon-wrapper">
                        <i className="fa-solid fa-check-circle ef-success-icon" aria-hidden="true"></i>
                    </div>
                    <h3 className="ef-success-title">Thank You!</h3>
                    <p className="ef-success-text">
                        Your enquiry has been submitted successfully. Our team will contact you within 24 hours.
                    </p>
                    <button 
                        className="ef-success-btn" 
                        onClick={handleReset}
                        type="button"
                    >
                        <i className="fa-solid fa-plus" aria-hidden="true"></i>
                        Submit Another Enquiry
                    </button>
                </div>
            ) : (
                <div className="ef-form-card" ref={formRef}>
                    <h3 className="ef-form-title">
                        <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>
                        Get More Information
                    </h3>
                    <p className="ef-form-subtitle">Fill the form and our counselor will contact you</p>

                    <form onSubmit={handleSubmit} className="ef-form" noValidate>
                        {error && (
                            <div className="ef-error" role="alert" aria-live="assertive">
                                <i className="fa-solid fa-exclamation-circle" aria-hidden="true"></i>
                                <span>{error}</span>
                            </div>
                        )}

                        <div className={`ef-field ${focusedField === 'name' ? 'focused' : ''}`}>
                            <i className="fa-solid fa-user ef-field-icon" aria-hidden="true"></i>
                            <input
                                ref={firstInputRef}
                                type="text"
                                name="name"
                                id="ef-name"
                                value={formData.name}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('name')}
                                onBlur={() => setFocusedField(null)}
                                placeholder="Your Full Name"
                                className="ef-input"
                                required
                                autoComplete="name"
                                aria-label="Full Name"
                            />
                        </div>

                        <div className={`ef-field ${focusedField === 'email' ? 'focused' : ''}`}>
                            <i className="fa-solid fa-envelope ef-field-icon" aria-hidden="true"></i>
                            <input
                                type="email"
                                name="email"
                                id="ef-email"
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                                placeholder="Email Address"
                                className="ef-input"
                                required
                                autoComplete="email"
                                aria-label="Email Address"
                            />
                        </div>

                        <div className={`ef-field ${focusedField === 'phone' ? 'focused' : ''}`}>
                            <i className="fa-solid fa-phone ef-field-icon" aria-hidden="true"></i>
                            <input
                                type="tel"
                                name="phone"
                                id="ef-phone"
                                value={formData.phone}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('phone')}
                                onBlur={() => setFocusedField(null)}
                                placeholder="Phone Number"
                                className="ef-input"
                                required
                                autoComplete="tel"
                                aria-label="Phone Number"
                                pattern="[0-9]{10}"
                                title="Please enter a 10-digit phone number"
                            />
                        </div>

                        <button
                            type="submit"
                            className="ef-submit-btn"
                            disabled={loading}
                            aria-busy={loading}
                        >
                            {loading ? (
                                <>
                                    <i className="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>
                                    <span>Submitting...</span>
                                </>
                            ) : (
                                <>
                                    <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>
                                    <span>Submit Enquiry</span>
                                </>
                            )}
                        </button>
                    </form>

                    <p className="ef-privacy">
                        <i className="fa-solid fa-lock" aria-hidden="true"></i>
                        <span>Your information is secure with us</span>
                    </p>
                </div>
            )}
        </>
    );
};

export default EnquiryForm;
