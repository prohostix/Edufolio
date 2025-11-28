import React, { useState } from 'react';
import axios from 'axios';

const EnquiryForm = ({ programId, universityId, source = 'Website' }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const API_BASE = "http://localhost:5000/api";

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await axios.post(`${API_BASE}/public/enquiry`, {
                ...formData,
                programId,
                universityId,
                source
            });

            setSuccess(true);
            setFormData({ name: '', email: '', phone: '', message: '' });

            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div style={styles.successCard}>
                <i className="fa-solid fa-check-circle" style={styles.successIcon}></i>
                <h3 style={styles.successTitle}>Thank You!</h3>
                <p style={styles.successText}>
                    Your enquiry has been submitted successfully. Our team will contact you soon.
                </p>
            </div>
        );
    }

    return (
        <div style={styles.formCard}>
            <h3 style={styles.formTitle}>
                <i className="fa-solid fa-paper-plane"></i> Get More Information
            </h3>
            <p style={styles.formSubtitle}>Fill the form and our counselor will contact you</p>

            <form onSubmit={handleSubmit} style={styles.form}>
                {error && (
                    <div style={styles.error}>
                        <i className="fa-solid fa-exclamation-circle"></i> {error}
                    </div>
                )}

                <div style={styles.field}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Full Name"
                        style={styles.input}
                        required
                    />
                </div>

                <div style={styles.field}>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        style={styles.input}
                        required
                    />
                </div>

                <div style={styles.field}>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        style={styles.input}
                        required
                    />
                </div>

                <div style={styles.field}>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message (Optional)"
                        style={styles.textarea}
                        rows="3"
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        ...styles.submitBtn,
                        opacity: loading ? 0.7 : 1
                    }}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <i className="fa-solid fa-spinner fa-spin"></i> Submitting...
                        </>
                    ) : (
                        <>
                            <i className="fa-solid fa-paper-plane"></i> Submit Enquiry
                        </>
                    )}
                </button>
            </form>

            <p style={styles.privacy}>
                <i className="fa-solid fa-lock"></i> Your information is secure with us
            </p>
        </div>
    );
};

const styles = {
    formCard: {
        background: '#fff',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
    },
    formTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: '#0F172A',
        fontSize: '1.3rem',
        marginBottom: '8px'
    },
    formSubtitle: {
        color: '#64748B',
        fontSize: '0.9rem',
        marginBottom: '25px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    field: {},
    input: {
        width: '100%',
        padding: '14px 16px',
        borderRadius: '10px',
        border: '2px solid #E2E8F0',
        fontSize: '1rem',
        boxSizing: 'border-box'
    },
    textarea: {
        width: '100%',
        padding: '14px 16px',
        borderRadius: '10px',
        border: '2px solid #E2E8F0',
        fontSize: '1rem',
        resize: 'vertical',
        boxSizing: 'border-box'
    },
    submitBtn: {
        width: '100%',
        padding: '15px',
        background: 'linear-gradient(135deg, #FF6B35 0%, #FF8B5C 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: '10px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '10px'
    },
    error: {
        background: '#FEF2F2',
        color: '#DC2626',
        padding: '12px',
        borderRadius: '10px',
        fontSize: '0.9rem',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    privacy: {
        textAlign: 'center',
        color: '#94A3B8',
        fontSize: '0.8rem',
        marginTop: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px'
    },
    successCard: {
        background: '#fff',
        borderRadius: '20px',
        padding: '40px 30px',
        textAlign: 'center',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
    },
    successIcon: {
        fontSize: '4rem',
        color: '#10B981',
        marginBottom: '20px'
    },
    successTitle: {
        color: '#0F172A',
        fontSize: '1.5rem',
        marginBottom: '10px'
    },
    successText: {
        color: '#64748B',
        fontSize: '0.95rem'
    }
};

export default EnquiryForm;