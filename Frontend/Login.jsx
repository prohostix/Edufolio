import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();
    const { login, isAuthenticated } = useContext(AuthContext);

    const from = location.state?.from?.pathname || '/admin/dashboard';

    // Redirect if already logged in
    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(email, password);
            navigate(from, { replace: true });
        } catch (err) {
            console.error("Login error:", err);
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else if (err.response) {
                setError('Authentication failed. Please check your credentials.');
            } else {
                setError('Network error. Please ensure the server is running.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {/* Logo */}
                <div style={styles.logoSection}>
                    <div style={styles.logoIcon}>
                        <i className="fa-solid fa-graduation-cap"></i>
                    </div>
                    <h2 style={styles.title}>EduFolio Admin</h2>
                    <p style={styles.subtitle}>Sign in to access your dashboard</p>
                </div>
                
                {/* Error Message */}
                {error && (
                    <div style={styles.errorBox}>
                        <i className="fa-solid fa-exclamation-circle" style={{ marginRight: '8px' }}></i>
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleLogin}>
                    <div style={styles.field}>
                        <label style={styles.label}>
                            <i className="fa-solid fa-envelope" style={styles.labelIcon}></i>
                            Email Address
                        </label>
                        <input 
                            type="email" 
                            style={styles.input} 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@edufolio.com"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>
                            <i className="fa-solid fa-lock" style={styles.labelIcon}></i>
                            Password
                        </label>
                        <div style={styles.passwordWrapper}>
                            <input 
                                type={showPassword ? 'text' : 'password'}
                                style={{ ...styles.input, paddingRight: '45px' }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                disabled={isLoading}
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={styles.togglePassword}
                            >
                                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        style={{
                            ...styles.submitBtn,
                            opacity: isLoading ? 0.7 : 1,
                            cursor: isLoading ? 'not-allowed' : 'pointer'
                        }}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                                Signing in...
                            </>
                        ) : (
                            <>
                                <i className="fa-solid fa-right-to-bracket" style={{ marginRight: '8px' }}></i>
                                Sign In
                            </>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div style={styles.footer}>
                    <a href="/" style={styles.backLink}>
                        <i className="fa-solid fa-arrow-left" style={{ marginRight: '6px' }}></i>
                        Back to Website
                    </a>
                </div>
            </div>

            {/* Background decoration */}
            <div style={styles.bgDecoration}></div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        position: 'relative',
        overflow: 'hidden'
    },
    card: {
        background: 'white',
        padding: '40px',
        borderRadius: '24px',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
        width: '100%',
        maxWidth: '420px',
        position: 'relative',
        zIndex: 10
    },
    logoSection: {
        textAlign: 'center',
        marginBottom: '30px'
    },
    logoIcon: {
        width: '70px',
        height: '70px',
        background: 'linear-gradient(135deg, #FF6B35 0%, #FF8B5C 100%)',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 15px',
        fontSize: '2rem',
        color: '#fff',
        boxShadow: '0 10px 30px rgba(255, 107, 53, 0.3)'
    },
    title: {
        margin: '0 0 5px',
        color: '#0F172A',
        fontSize: '1.5rem'
    },
    subtitle: {
        margin: 0,
        color: '#64748B',
        fontSize: '0.95rem'
    },
    field: {
        marginBottom: '20px',
        textAlign: 'left'
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        color: '#334155',
        fontWeight: '600',
        fontSize: '0.9rem'
    },
    labelIcon: {
        marginRight: '8px',
        color: '#FF6B35',
        width: '16px'
    },
    input: {
        width: '100%',
        padding: '14px 16px',
        borderRadius: '12px',
        border: '2px solid #E2E8F0',
        outline: 'none',
        fontSize: '1rem',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        boxSizing: 'border-box'
    },
    passwordWrapper: {
        position: 'relative'
    },
    togglePassword: {
        position: 'absolute',
        right: '14px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        color: '#94A3B8',
        cursor: 'pointer',
        padding: '5px'
    },
    errorBox: {
        background: '#FEF2F2',
        color: '#DC2626',
        padding: '12px 16px',
        borderRadius: '10px',
        marginBottom: '20px',
        fontSize: '0.9rem',
        border: '1px solid #FECACA',
        textAlign: 'left'
    },
    submitBtn: {
        width: '100%',
        padding: '16px',
        background: 'linear-gradient(135deg, #FF6B35 0%, #FF8B5C 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: '12px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)'
    },
    footer: {
        textAlign: 'center',
        marginTop: '25px',
        paddingTop: '20px',
        borderTop: '1px solid #E2E8F0'
    },
    backLink: {
        color: '#64748B',
        textDecoration: 'none',
        fontSize: '0.9rem',
        transition: 'color 0.2s ease'
    },
    bgDecoration: {
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,53,0.1) 0%, transparent 70%)',
        top: '-200px',
        right: '-200px'
    }
};

export default Login;