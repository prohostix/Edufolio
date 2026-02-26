"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import API_BASE from '../../api';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = React.useContext(AuthContext);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
        const token = localStorage.getItem('adminToken');
        if (token) {
            router.push('/admin/dashboard');
        }
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            router.push('/admin/dashboard');
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            {/* Animated Background */}
            <div style={styles.bgGradient}></div>
            <div style={styles.orb1}></div>
            <div style={styles.orb2}></div>
            <div style={styles.orb3}></div>

            {/* Floating particles */}
            {mounted && (
                <div style={styles.particles}>
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            style={{
                                ...styles.particle,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${15 + Math.random() * 10}s`
                            }}
                        />
                    ))}
                </div>
            )}

            <div style={styles.card}>
                {/* Glow effect */}
                <div style={styles.cardGlow}></div>

                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.logoContainer}>
                        <div style={styles.logoRing}></div>
                        <div style={styles.iconWrapper}>
                            <i className="fa-solid fa-graduation-cap" style={styles.icon}></i>
                        </div>
                    </div>
                    <h1 style={styles.title}>Welcome Back</h1>
                    <p style={styles.subtitle}>Sign in to EduFolio Admin Panel</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} style={styles.form}>
                    {error && (
                        <div style={styles.error}>
                            <div style={styles.errorIcon}>
                                <i className="fa-solid fa-exclamation"></i>
                            </div>
                            <span>{error}</span>
                        </div>
                    )}

                    <div style={styles.field}>
                        <div style={{
                            ...styles.inputWrapper,
                            ...(focusedField === 'email' ? styles.inputWrapperFocused : {}),
                            ...(email ? styles.inputWrapperFilled : {})
                        }}>
                            <div style={{
                                ...styles.inputIcon,
                                ...(focusedField === 'email' ? styles.inputIconActive : {})
                            }}>
                                <i className="fa-solid fa-envelope"></i>
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                                placeholder="Email Address"
                                style={styles.input}
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div style={styles.field}>
                        <div style={{
                            ...styles.inputWrapper,
                            ...(focusedField === 'password' ? styles.inputWrapperFocused : {}),
                            ...(password ? styles.inputWrapperFilled : {})
                        }}>
                            <div style={{
                                ...styles.inputIcon,
                                ...(focusedField === 'password' ? styles.inputIconActive : {})
                            }}>
                                <i className="fa-solid fa-lock"></i>
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setFocusedField('password')}
                                onBlur={() => setFocusedField(null)}
                                placeholder="Password"
                                style={styles.input}
                                required
                                disabled={loading}
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
                            ...styles.button,
                            ...(loading ? styles.buttonLoading : {})
                        }}
                        disabled={loading}
                    >
                        <span style={styles.buttonContent}>
                            {loading ? (
                                <>
                                    <div style={styles.spinner}></div>
                                    <span>Authenticating...</span>
                                </>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <i className="fa-solid fa-arrow-right" style={styles.buttonArrow}></i>
                                </>
                            )}
                        </span>
                        <div style={styles.buttonShine}></div>
                    </button>
                </form>

                {/* Back to site */}
                <a href="/" style={styles.backLink}>
                    <i className="fa-solid fa-arrow-left"></i>
                    <span>Back to Website</span>
                </a>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(1.1); opacity: 0.8; }
                }
                @keyframes rise {
                    0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
                }
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes ringPulse {
                    0%, 100% { transform: scale(1); opacity: 0.3; }
                    50% { transform: scale(1.2); opacity: 0.1; }
                }
                @keyframes glow {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 0.8; }
                }
            `}</style>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0f',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden'
    },
    bgGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(ellipse at 50% 50%, #1a1a2e 0%, #0a0a0f 70%)',
    },
    orb1: {
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 107, 53, 0.15) 0%, transparent 70%)',
        top: '-200px',
        right: '-200px',
        animation: 'pulse 8s ease-in-out infinite',
    },
    orb2: {
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
        bottom: '-150px',
        left: '-150px',
        animation: 'pulse 10s ease-in-out infinite',
        animationDelay: '2s',
    },
    orb3: {
        position: 'absolute',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
        top: '50%',
        left: '10%',
        animation: 'float 12s ease-in-out infinite',
    },
    particles: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
    },
    particle: {
        position: 'absolute',
        width: '4px',
        height: '4px',
        background: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '50%',
        bottom: '-10px',
        animation: 'rise 20s linear infinite',
    },
    card: {
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '50px 40px',
        width: '100%',
        maxWidth: '420px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
    },
    cardGlow: {
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'conic-gradient(from 0deg, transparent, rgba(255, 107, 53, 0.1), transparent 30%)',
        animation: 'spin 10s linear infinite',
        pointerEvents: 'none',
    },
    header: {
        textAlign: 'center',
        marginBottom: '40px',
        position: 'relative',
        zIndex: 1,
    },
    logoContainer: {
        position: 'relative',
        width: '90px',
        height: '90px',
        margin: '0 auto 25px',
    },
    logoRing: {
        position: 'absolute',
        top: '-10px',
        left: '-10px',
        right: '-10px',
        bottom: '-10px',
        border: '2px solid rgba(255, 107, 53, 0.3)',
        borderRadius: '50%',
        animation: 'ringPulse 3s ease-in-out infinite',
    },
    iconWrapper: {
        width: '90px',
        height: '90px',
        background: 'linear-gradient(135deg, #FF6B35 0%, #FF8B5C 50%, #FF6B35 100%)',
        backgroundSize: '200% 200%',
        borderRadius: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 20px 40px rgba(255, 107, 53, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        animation: 'float 6s ease-in-out infinite',
    },
    icon: {
        fontSize: '2.5rem',
        color: '#fff',
    },
    title: {
        margin: '0 0 8px',
        color: '#fff',
        fontSize: '2rem',
        fontWeight: '700',
        letterSpacing: '-0.5px',
    },
    subtitle: {
        margin: 0,
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: '0.95rem',
        fontWeight: '400',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        position: 'relative',
        zIndex: 1,
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
    },
    inputWrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '14px',
        border: '2px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
    },
    inputWrapperFocused: {
        border: '2px solid rgba(255, 107, 53, 0.5)',
        background: 'rgba(255, 255, 255, 0.08)',
        boxShadow: '0 0 30px rgba(255, 107, 53, 0.15)',
    },
    inputWrapperFilled: {
        border: '2px solid rgba(255, 255, 255, 0.2)',
    },
    inputIcon: {
        padding: '0 0 0 18px',
        color: 'rgba(255, 255, 255, 0.3)',
        fontSize: '1rem',
        transition: 'all 0.3s ease',
    },
    inputIconActive: {
        color: '#FF6B35',
    },
    input: {
        flex: 1,
        padding: '18px 18px',
        background: 'transparent',
        border: 'none',
        fontSize: '1rem',
        color: '#fff',
        outline: 'none',
        width: '100%',
    },
    togglePassword: {
        background: 'transparent',
        border: 'none',
        color: 'rgba(255, 255, 255, 0.3)',
        padding: '0 18px',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'color 0.3s ease',
    },
    button: {
        position: 'relative',
        padding: '18px 24px',
        background: 'linear-gradient(135deg, #FF6B35 0%, #FF8B5C 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: '14px',
        fontSize: '1rem',
        fontWeight: '600',
        marginTop: '10px',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: '0 10px 40px rgba(255, 107, 53, 0.3)',
    },
    buttonLoading: {
        opacity: 0.8,
        cursor: 'not-allowed',
    },
    buttonContent: {
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
    },
    buttonArrow: {
        transition: 'transform 0.3s ease',
    },
    buttonShine: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
        animation: 'shimmer 3s infinite',
    },
    spinner: {
        width: '20px',
        height: '20px',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderTopColor: '#fff',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
    },
    error: {
        background: 'rgba(220, 38, 38, 0.1)',
        color: '#ff6b6b',
        padding: '16px 18px',
        borderRadius: '12px',
        fontSize: '0.9rem',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        border: '1px solid rgba(220, 38, 38, 0.2)',
        backdropFilter: 'blur(10px)',
    },
    errorIcon: {
        width: '24px',
        height: '24px',
        background: 'rgba(220, 38, 38, 0.2)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.75rem',
    },
    backLink: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '35px',
        color: 'rgba(255, 255, 255, 0.4)',
        textDecoration: 'none',
        fontSize: '0.9rem',
        transition: 'all 0.3s ease',
        position: 'relative',
        zIndex: 1,
    },
};

export default Login;
