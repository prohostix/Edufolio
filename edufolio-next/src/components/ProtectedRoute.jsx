"use client";
import React, { useContext } from 'react';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useContext(AuthContext);
    const pathname = usePathname();

    // Show loading spinner while checking auth
    if (loading) {
        return (
            <div style={styles.loading}>
                <div style={styles.spinner}>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                </div>
                <p style={{ color: '#64748B', marginTop: '15px' }}>Verifying access...</p>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        // use router push instead of Navigate component
        const router = useRouter();
        React.useEffect(() => {
            router.push('/admin/login');
        }, [isAuthenticated, router]);
        return null;
    }

    return children;
};

const styles = {
    loading: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#F8FAFC'
    },
    spinner: {
        fontSize: '3rem',
        color: '#FF6B35'
    }
};

export default ProtectedRoute;