import React, { useState } from 'react';
import axios from 'axios';

const EnrollModal = ({ isOpen, onClose, program, university }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        education: '',
        experience: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const API_BASE = "http://localhost:5000/api";

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
            await axios.post(`${API_BASE}/public/enquiry`, {
                ...formData,
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
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button style={styles.closeBtn} onClick={onClose}>
                    <i className="fa-solid fa-times"></i>
                </button>

                {success ? (
                    <div style={styles.successContainer}>
                        <div style={styles.successIcon}>
                            <i className="fa-solid fa-check-circle"></i>
                        </div>
                        <h2 style={styles.successTitle}>Enrollment Request Submitted!</h2>
                        <p style={styles.successText}>
                            Thank you for your interest. Our counselor will contact you within 24 hours.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div style={styles.header}>
                            <div style={styles.headerIcon}>
                                <i className="fa-solid fa-graduation-cap"></i>
                            </div>
                            <h2 style={styles.title}>Enroll Now</h2>
                            {program && (
                                <p style={styles.programName}>{program.name}</p>
                            )}
                            {(university || program?.universityId) && (
                                <p style={styles.universityName}>
                                    <i className="fa-solid fa-building-columns"></i>
                                    {university?.name || program?.universityId?.name}
                                </p>
                            )}
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} style={styles.form}>
                            {error && (
                                <div style={styles.error}>
                                    <i className="fa-solid fa-exclamation-circle"></i> {error}
                                </div>
                            )}

                            <div style={styles.row}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        style={styles.input}
                                        required
                                    />
                                </div>
                            </div>

                            <div style={styles.row}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        style={styles.input}
                                        required
                                    />
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Phone Number *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Enter your phone number"
                                        style={styles.input}
                                        required
                                    />
                                </div>
                            </div>

                            <div style={styles.row}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Highest Education *</label>
                                    <select
                                        name="education"
                                        value={formData.education}
                                        onChange={handleChange}
                                        style={styles.select}
                                        required
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
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Work Experience</label>
                                    <select
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        style={styles.select}
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

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Any Questions or Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us about your goals or any questions you have..."
                                    style={styles.textarea}
                                    rows="3"
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                style={styles.submitBtn}
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

                            <p style={styles.disclaimer}>
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

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '20px',
        backdropFilter: 'blur(5px)'
    },
    modal: {
        background: '#fff',
        borderRadius: '24px',
        maxWidth: '550px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
    },
    closeBtn: {
        position: 'absolute',
        top: '15px',
        right: '15px',
        background: '#F1F5F9',
        border: 'none',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.1rem',
        color: '#64748B',
        transition: 'all 0.2s ease',
        zIndex: 1
    },
    header: {
        textAlign: 'center',
        padding: '30px 30px 20px',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        borderRadius: '24px 24px 0 0'
    },
    headerIcon: {
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #FF6B35 0%, #FF8B5C 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 15px',
        fontSize: '1.8rem',
        color: '#fff',
        boxShadow: '0 10px 30px rgba(255, 107, 53, 0.4)'
    },
    title: {
        color: '#fff',
        fontSize: '1.6rem',
        fontWeight: '700',
        margin: '0 0 10px'
    },
    programName: {
        color: '#FF6B35',
        fontSize: '1.1rem',
        fontWeight: '600',
        margin: '0 0 8px'
    },
    universityName: {
        color: '#94A3B8',
        fontSize: '0.95rem',
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
    },
    form: {
        padding: '25px 30px 30px'
    },
    error: {
        background: '#FEE2E2',
        color: '#DC2626',
        padding: '12px 15px',
        borderRadius: '10px',
        marginBottom: '20px',
        fontSize: '0.9rem',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    row: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '15px'
    },
    inputGroup: {
        marginBottom: '5px'
    },
    label: {
        display: 'block',
        marginBottom: '6px',
        color: '#334155',
        fontSize: '0.9rem',
        fontWeight: '600'
    },
    input: {
        width: '100%',
        padding: '12px 15px',
        border: '2px solid #E2E8F0',
        borderRadius: '10px',
        fontSize: '1rem',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s ease'
    },
    select: {
        width: '100%',
        padding: '12px 15px',
        border: '2px solid #E2E8F0',
        borderRadius: '10px',
        fontSize: '1rem',
        boxSizing: 'border-box',
        cursor: 'pointer',
        background: '#fff'
    },
    textarea: {
        width: '100%',
        padding: '12px 15px',
        border: '2px solid #E2E8F0',
        borderRadius: '10px',
        fontSize: '1rem',
        boxSizing: 'border-box',
        resize: 'vertical',
        fontFamily: 'inherit'
    },
    submitBtn: {
        width: '100%',
        padding: '16px',
        background: 'linear-gradient(135deg, #FF6B35 0%, #FF8B5C 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: '12px',
        fontSize: '1.05rem',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '20px',
        boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    },
    disclaimer: {
        textAlign: 'center',
        color: '#64748B',
        fontSize: '0.8rem',
        marginTop: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px'
    },
    successContainer: {
        padding: '60px 30px',
        textAlign: 'center'
    },
    successIcon: {
        fontSize: '4rem',
        color: '#10B981',
        marginBottom: '20px'
    },
    successTitle: {
        color: '#0F172A',
        fontSize: '1.5rem',
        fontWeight: '700',
        marginBottom: '10px'
    },
    successText: {
        color: '#64748B',
        fontSize: '1rem',
        lineHeight: 1.6
    }
};

export default EnrollModal;