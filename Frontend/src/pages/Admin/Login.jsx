import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const API_BASE = "http://localhost:5000/api";

    useEffect(() => {
        // Check if already logged in
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/admin/dashboard');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await axios.post(`${API_BASE}/admin/login`, {
                email,
                password
            });

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            navigate('/admin/dashboard');
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            {/* Background Pattern */}
            <div style={styles.bgPattern}></div>

            <div style={styles.card}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.iconWrapper}>
                        <i className="fa-solid fa-graduation-cap" style={styles.icon}></i>
                    </div>
                    <h1 style={styles.title}>EduFolio Admin</h1>
                    <p style={styles.subtitle}>Sign in to manage your platform</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} style={styles.form}>
                    {error && (
                        <div style={styles.error}>
                            <i className="fa-solid fa-exclamation-circle"></i>
                            <span>{error}</span>
                        </div>
                    )}

                    <div style={styles.field}>
                        <label style={styles.label}>
                            <i className="fa-solid fa-envelope" style={styles.labelIcon}></i>
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@edufolio.com"
                            style={styles.input}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>
                            <i className="fa-solid fa-lock" style={styles.labelIcon}></i>
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            style={styles.input}
                            required
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            ...styles.button,
                            opacity: loading ? 0.7 : 1,
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <i className="fa-solid fa-spinner fa-spin"></i>
                                <span>Signing in...</span>
                            </>
                        ) : (
                            <>
                                <i className="fa-solid fa-right-to-bracket"></i>
                                <span>Sign In</span>
                            </>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div style={styles.footer}>
                    <div style={styles.divider}>
                        <span style={styles.dividerText}>Default Credentials</span>
                    </div>
                    <div style={styles.credentials}>
                        <p style={styles.credentialItem}>
                            <i className="fa-solid fa-user"></i>
                            <span>admin@edufolio.com</span>
                        </p>
                        <p style={styles.credentialItem}>
                            <i className="fa-solid fa-key"></i>
                            <span>admin123</span>
                        </p>
                    </div>
                </div>

                {/* Back to site */}
                <a href="/" style={styles.backLink}>
                    <i className="fa-solid fa-arrow-left"></i>
                    Back to Website
                </a>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden'
    },
    bgPattern: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        opacity: 0.5
    },
    card: {
        background: '#fff',
        borderRadius: '24px',
        padding: '40px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 25px 80px rgba(0,0,0,0.4)',
        position: 'relative',
        zIndex: 1
    },
    header: {
        textAlign: 'center',
        marginBottom: '35px'
    },
    iconWrapper: {
        width: '80px',
        height: '80px',
        background: 'linear-gradient(135deg, #FF6B35 0%, #FF8B5C 100%)',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
        boxShadow: '0 10px 30px rgba(255, 107, 53, 0.3)'
    },
    icon: {
        fontSize: '2.2rem',
        color: '#fff'
    },
    title: {
        margin: '0 0 8px',
        color: '#0F172A',
        fontSize: '1.8rem',
        fontWeight: '700'
    },
    subtitle: {
        margin: 0,
        color: '#64748B',
        fontSize: '0.95rem'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    label: {
        color: '#334155',
        fontWeight: '600',
        fontSize: '0.9rem',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    labelIcon: {
        color: '#FF6B35',
        fontSize: '0.85rem'
    },
    input: {
        padding: '14px 18px',
        borderRadius: '12px',
        border: '2px solid #E2E8F0',
        fontSize: '1rem',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        width: '100%',
        boxSizing: 'border-box'
    },
    button: {
        padding: '16px',
        background: 'linear-gradient(135deg, #FF6B35 0%, #FF8B5C 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: '12px',
        fontSize: '1rem',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '10px',
        boxShadow: '0 4px 20px rgba(255, 107, 53, 0.35)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'pointer'
    },
    error: {
        background: '#FEF2F2',
        color: '#DC2626',
        padding: '14px 18px',
        borderRadius: '12px',
        fontSize: '0.9rem',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        border: '1px solid #FECACA'
    },
    footer: {
        marginTop: '30px'
    },
    divider: {
        textAlign: 'center',
        position: 'relative',
        marginBottom: '15px'
    },
    dividerText: {
        background: '#fff',
        padding: '0 15px',
        color: '#94A3B8',
        fontSize: '0.8rem',
        position: 'relative',
        zIndex: 1
    },
    credentials: {
        background: '#F8FAFC',
        padding: '15px 20px',
        borderRadius: '12px',
        border: '1px dashed #CBD5E1'
    },
    credentialItem: {
        margin: '8px 0',
        color: '#64748B',
        fontSize: '0.85rem',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    backLink: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '25px',
        color: '#64748B',
        textDecoration: 'none',
        fontSize: '0.9rem',
        transition: 'color 0.2s ease'
    }
};

export default Login;