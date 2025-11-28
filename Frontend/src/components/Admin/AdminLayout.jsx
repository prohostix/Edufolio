import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AdminLayout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [adminUser, setAdminUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        const user = localStorage.getItem('adminUser');
        
        if (!token) {
            navigate('/admin/login');
            return;
        }
        
        if (user) {
            try {
                setAdminUser(JSON.parse(user));
            } catch (e) {
                setAdminUser({ name: 'Admin' });
            }
        }
    }, [navigate]);

    const menuItems = [
        { title: 'Dashboard', path: '/admin/dashboard', icon: 'fa-gauge-high' },
        { title: 'Universities', path: '/admin/universities', icon: 'fa-building-columns' },
        { title: 'Programs', path: '/admin/programs', icon: 'fa-graduation-cap' },
        { title: 'Enquiries', path: '/admin/enquiries', icon: 'fa-envelope' }
    ];

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            navigate('/admin/login');
        }
    };

    const isActive = (path) => {
        if (path === '/admin/dashboard') {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    return (
        <div style={styles.layout}>
            {/* Sidebar */}
            <aside style={{
                ...styles.sidebar,
                width: sidebarOpen ? '260px' : '80px'
            }}>
                {/* Logo */}
                <div style={styles.logoContainer}>
                    <Link to="/admin/dashboard" style={styles.logoLink}>
                        <div style={styles.logoIcon}>
                            <i className="fa-solid fa-graduation-cap"></i>
                        </div>
                        {sidebarOpen && (
                            <div style={styles.logoTextContainer}>
                                <span style={styles.logoEdu}>edu</span>
                                <span style={styles.logoFolio}>folio</span>
                            </div>
                        )}
                    </Link>
                </div>

                {/* Navigation Menu */}
                <nav style={styles.nav}>
                    <div style={styles.navLabel}>
                        {sidebarOpen && 'MAIN MENU'}
                    </div>
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={{
                                ...styles.navItem,
                                ...(isActive(item.path) ? styles.navItemActive : {})
                            }}
                            title={item.title}
                        >
                            <i className={`fa-solid ${item.icon}`} style={styles.navIcon}></i>
                            {sidebarOpen && (
                                <span style={styles.navText}>{item.title}</span>
                            )}
                            {isActive(item.path) && sidebarOpen && (
                                <div style={styles.activeIndicator}></div>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Sidebar Footer */}
                <div style={styles.sidebarFooter}>
                    <Link 
                        to="/" 
                        target="_blank" 
                        style={styles.viewSiteBtn}
                        title="View Website"
                    >
                        <i className="fa-solid fa-external-link-alt"></i>
                        {sidebarOpen && <span>View Website</span>}
                    </Link>
                    
                    <button 
                        onClick={handleLogout} 
                        style={styles.logoutBtn}
                        title="Logout"
                    >
                        <i className="fa-solid fa-sign-out-alt"></i>
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div style={{
                ...styles.mainArea,
                marginLeft: sidebarOpen ? '260px' : '80px'
            }}>
                {/* Top Header */}
                <header style={styles.header}>
                    <div style={styles.headerLeft}>
                        <button 
                            style={styles.toggleBtn}
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            title={sidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
                        >
                            <i className={`fa-solid ${sidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
                        </button>
                        
                        <div style={styles.breadcrumb}>
                            <Link to="/admin/dashboard" style={styles.breadcrumbLink}>
                                <i className="fa-solid fa-home"></i>
                            </Link>
                            <span style={styles.breadcrumbSeparator}>/</span>
                            <span style={styles.breadcrumbCurrent}>
                                {location.pathname.split('/').pop().charAt(0).toUpperCase() + 
                                 location.pathname.split('/').pop().slice(1) || 'Dashboard'}
                            </span>
                        </div>
                    </div>

                    <div style={styles.headerRight}>
                        <div style={styles.adminProfile}>
                            <div style={styles.adminAvatar}>
                                <i className="fa-solid fa-user"></i>
                            </div>
                            <div style={styles.adminInfo}>
                                <span style={styles.adminName}>
                                    {adminUser?.name || 'Admin'}
                                </span>
                                <span style={styles.adminRole}>Administrator</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main style={styles.content}>
                    {children}
                </main>
            </div>
        </div>
    );
};

// Edufolio Brand Colors
const colors = {
    primaryDark: '#1E3A5F',
    primaryMaroon: '#8B2346',
    accentBlue: '#4A90A4',
    accentPink: '#C4567A',
    textLight: '#A8C5E2',
    sidebarBg: '#1E3A5F'
};

const styles = {
    layout: {
        minHeight: '100vh',
        background: '#F5F7FA'
    },
    
    // Sidebar Styles
    sidebar: {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        background: `linear-gradient(180deg, ${colors.primaryDark} 0%, #152A45 100%)`,
        transition: 'width 0.3s ease',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '4px 0 15px rgba(0, 0, 0, 0.15)'
    },
    logoContainer: {
        padding: '20px 15px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    },
    logoLink: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        textDecoration: 'none'
    },
    logoIcon: {
        width: '45px',
        height: '45px',
        borderRadius: '12px',
        background: `linear-gradient(135deg, ${colors.primaryMaroon} 0%, ${colors.accentPink} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '1.3rem',
        flexShrink: 0
    },
    logoTextContainer: {
        display: 'flex',
        fontSize: '1.4rem',
        fontWeight: '700'
    },
    logoEdu: {
        color: '#fff'
    },
    logoFolio: {
        color: colors.accentPink
    },
    
    // Navigation
    nav: {
        flex: 1,
        padding: '20px 12px',
        overflowY: 'auto'
    },
    navLabel: {
        color: colors.accentBlue,
        fontSize: '0.7rem',
        fontWeight: '600',
        letterSpacing: '1px',
        padding: '0 15px 15px',
        whiteSpace: 'nowrap'
    },
    navItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '14px 16px',
        borderRadius: '12px',
        color: colors.textLight,
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        fontSize: '0.95rem',
        marginBottom: '6px',
        position: 'relative',
        whiteSpace: 'nowrap'
    },
    navItemActive: {
        background: `linear-gradient(135deg, ${colors.primaryMaroon} 0%, ${colors.accentPink} 100%)`,
        color: '#fff',
        boxShadow: '0 4px 15px rgba(139, 35, 70, 0.4)'
    },
    navIcon: {
        width: '22px',
        textAlign: 'center',
        fontSize: '1.1rem',
        flexShrink: 0
    },
    navText: {
        fontWeight: '500'
    },
    activeIndicator: {
        position: 'absolute',
        right: '15px',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: '#fff'
    },
    
    // Sidebar Footer
    sidebarFooter: {
        padding: '15px 12px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    viewSiteBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        borderRadius: '10px',
        color: colors.textLight,
        textDecoration: 'none',
        fontSize: '0.9rem',
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap'
    },
    logoutBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        borderRadius: '10px',
        color: '#F87171',
        background: 'rgba(248, 113, 113, 0.1)',
        border: 'none',
        cursor: 'pointer',
        fontSize: '0.9rem',
        transition: 'all 0.2s ease',
        width: '100%',
        whiteSpace: 'nowrap'
    },
    
    // Main Area
    mainArea: {
        transition: 'margin-left 0.3s ease',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    
    // Header
    header: {
        background: '#fff',
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 100
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
    },
    toggleBtn: {
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        border: 'none',
        background: '#F5F7FA',
        color: colors.primaryDark,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.9rem',
        transition: 'all 0.2s ease'
    },
    breadcrumb: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    breadcrumbLink: {
        color: colors.accentBlue,
        textDecoration: 'none',
        fontSize: '0.9rem'
    },
    breadcrumbSeparator: {
        color: '#CBD5E1'
    },
    breadcrumbCurrent: {
        color: colors.primaryDark,
        fontWeight: '600',
        fontSize: '0.9rem'
    },
    headerRight: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
    },
    adminProfile: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    adminAvatar: {
        width: '42px',
        height: '42px',
        borderRadius: '12px',
        background: `linear-gradient(135deg, ${colors.primaryMaroon} 0%, ${colors.accentPink} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '1rem'
    },
    adminInfo: {
        display: 'flex',
        flexDirection: 'column'
    },
    adminName: {
        color: colors.primaryDark,
        fontWeight: '600',
        fontSize: '0.95rem'
    },
    adminRole: {
        color: colors.accentBlue,
        fontSize: '0.8rem'
    },
    
    // Content
    content: {
        flex: 1,
        padding: '0'
    }
};

export default AdminLayout;