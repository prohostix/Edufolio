"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logoBlack from '@/assets/images/edufolio-logo-black.png';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const pathname = usePathname();

    const menuItems = [
        { id: 'overview', icon: 'fa-chart-pie', label: 'Overview' },
        { id: 'unis', icon: 'fa-building-columns', label: 'Universities' },
        { id: 'programs', icon: 'fa-graduation-cap', label: 'Programs' },
        { id: 'enquiries', icon: 'fa-envelope', label: 'Enquiries' },
        { id: 'coursefinder', icon: 'fa-wand-magic-sparkles', label: 'Course Finder' }
    ];

    return (
        <div style={styles.sidebar}>
            {/* Logo */}
            <div style={styles.logo}>
                <Link href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img 
                        src={logoBlack.src} 
                        alt="EduFolio" 
                        style={{ height: '40px', width: 'auto', marginBottom: '5px' }} 
                    />
                    <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: '500', letterSpacing: '1px', textTransform: 'uppercase' }}>
                        Admin Panel
                    </span>
                </Link>
            </div>

            {/* Menu */}
            <nav style={styles.nav}>
                {menuItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        style={activeTab === item.id ? styles.menuItemActive : styles.menuItem}
                    >
                        <i className={`fa-solid ${item.icon}`} style={styles.menuIcon}></i>
                        {item.label}
                    </button>
                ))}
            </nav>

            {/* Footer */}
            <div style={styles.footer}>
                <Link href="/" style={styles.footerLink}>
                    <i className="fa-solid fa-arrow-left" style={{ marginRight: '8px' }}></i>
                    Back to Website
                </Link>
            </div>
        </div>
    );
};

const styles = {
    sidebar: {
        width: '250px',
        background: '#0F172A',
        minHeight: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100
    },
    logo: {
        padding: '25px 20px',
        borderBottom: '1px solid #1E293B'
    },
    nav: {
        flex: 1,
        padding: '20px 15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '14px 18px',
        color: '#94A3B8',
        textDecoration: 'none',
        borderRadius: '10px',
        transition: 'all 0.2s ease',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        fontSize: '0.95rem',
        textAlign: 'left',
        width: '100%'
    },
    menuItemActive: {
        display: 'flex',
        alignItems: 'center',
        padding: '14px 18px',
        color: '#fff',
        background: 'linear-gradient(135deg, #FF6B35 0%, #FF8B5C 100%)',
        borderRadius: '10px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '0.95rem',
        fontWeight: '600',
        boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)',
        textAlign: 'left',
        width: '100%'
    },
    menuIcon: {
        width: '20px',
        marginRight: '12px'
    },
    footer: {
        padding: '20px',
        borderTop: '1px solid #1E293B'
    },
    footerLink: {
        display: 'flex',
        alignItems: 'center',
        color: '#64748B',
        textDecoration: 'none',
        fontSize: '0.9rem',
        transition: 'color 0.2s ease'
    }
};

export default Sidebar;