import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const [stats, setStats] = useState({
        universities: 0,
        programs: 0,
        enquiries: 0,
        newEnquiries: 0
    });
    const [universities, setUniversities] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const API_BASE = "http://localhost:5000/api";

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = () => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (!token) {
            navigate('/admin/login');
            return;
        }

        if (userData) {
            setUser(JSON.parse(userData));
        }

        fetchData(token);
    };

    const fetchData = async (token) => {
        try {
            setLoading(true);
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const [statsRes, uniRes, progRes, enqRes] = await Promise.all([
                axios.get(`${API_BASE}/admin/stats`, config),
                axios.get(`${API_BASE}/admin/universities`, config),
                axios.get(`${API_BASE}/admin/programs`, config),
                axios.get(`${API_BASE}/admin/enquiries`, config)
            ]);

            setStats(statsRes.data);
            setUniversities(uniRes.data);
            setPrograms(progRes.data);
            setEnquiries(enqRes.data);
        } catch (err) {
            console.error('Error fetching data:', err);
            if (err.response?.status === 401) {
                handleLogout();
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/admin/login');
    };

    const handleDelete = async (type, id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_BASE}/admin/${type}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchData(token);
        } catch (err) {
            console.error('Delete error:', err);
            alert('Failed to delete item');
        }
    };

    const handleToggleStatus = async (type, id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${API_BASE}/admin/${type}/${id}/toggle`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchData(token);
        } catch (err) {
            console.error('Toggle error:', err);
        }
    };

    const updateEnquiryStatus = async (id, status) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${API_BASE}/admin/enquiries/${id}/status`, 
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchData(token);
        } catch (err) {
            console.error('Update status error:', err);
        }
    };

    if (loading) {
        return (
            <div style={styles.loadingScreen}>
                <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2rem', color: '#FF6B35' }}></i>
                <p>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div style={styles.wrapper}>
            {/* Sidebar */}
            <aside style={styles.sidebar}>
                <div style={styles.sidebarHeader}>
                    <i className="fa-solid fa-graduation-cap" style={styles.sidebarLogo}></i>
                    <span style={styles.sidebarTitle}>EduFolio</span>
                </div>

                <nav style={styles.sidebarNav}>
                    <button
                        style={activeTab === 'overview' ? styles.navItemActive : styles.navItem}
                        onClick={() => setActiveTab('overview')}
                    >
                        <i className="fa-solid fa-chart-pie"></i>
                        <span>Overview</span>
                    </button>
                    <button
                        style={activeTab === 'universities' ? styles.navItemActive : styles.navItem}
                        onClick={() => setActiveTab('universities')}
                    >
                        <i className="fa-solid fa-building-columns"></i>
                        <span>Universities</span>
                    </button>
                    <button
                        style={activeTab === 'programs' ? styles.navItemActive : styles.navItem}
                        onClick={() => setActiveTab('programs')}
                    >
                        <i className="fa-solid fa-graduation-cap"></i>
                        <span>Programs</span>
                    </button>
                    <button
                        style={activeTab === 'enquiries' ? styles.navItemActive : styles.navItem}
                        onClick={() => setActiveTab('enquiries')}
                    >
                        <i className="fa-solid fa-envelope"></i>
                        <span>Enquiries</span>
                        {stats.newEnquiries > 0 && (
                            <span style={styles.badge}>{stats.newEnquiries}</span>
                        )}
                    </button>
                </nav>

                <div style={styles.sidebarFooter}>
                    <a href="/" target="_blank" style={styles.viewSiteLink}>
                        <i className="fa-solid fa-external-link"></i>
                        <span>View Website</span>
                    </a>
                    <button style={styles.logoutBtn} onClick={handleLogout}>
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={styles.main}>
                {/* Header */}
                <header style={styles.header}>
                    <div>
                        <h1 style={styles.pageTitle}>
                            {activeTab === 'overview' && 'Dashboard Overview'}
                            {activeTab === 'universities' && 'Manage Universities'}
                            {activeTab === 'programs' && 'Manage Programs'}
                            {activeTab === 'enquiries' && 'Enquiries'}
                        </h1>
                        <p style={styles.pageSubtitle}>
                            Welcome back, {user?.name || 'Admin'}!
                        </p>
                    </div>
                    <div style={styles.headerActions}>
                        {activeTab === 'universities' && (
                            <Link to="/admin/universities/add" style={styles.addBtn}>
                                <i className="fa-solid fa-plus"></i> Add University
                            </Link>
                        )}
                        {activeTab === 'programs' && (
                            <Link to="/admin/programs/add" style={styles.addBtn}>
                                <i className="fa-solid fa-plus"></i> Add Program
                            </Link>
                        )}
                    </div>
                </header>

                {/* Content */}
                <div style={styles.content}>
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <>
                            {/* Stats Grid */}
                            <div style={styles.statsGrid}>
                                <div style={styles.statCard}>
                                    <div style={{ ...styles.statIcon, background: '#DBEAFE', color: '#3B82F6' }}>
                                        <i className="fa-solid fa-building-columns"></i>
                                    </div>
                                    <div>
                                        <span style={styles.statNumber}>{stats.universities}</span>
                                        <span style={styles.statLabel}>Universities</span>
                                    </div>
                                </div>
                                <div style={styles.statCard}>
                                    <div style={{ ...styles.statIcon, background: '#DCFCE7', color: '#16A34A' }}>
                                        <i className="fa-solid fa-graduation-cap"></i>
                                    </div>
                                    <div>
                                        <span style={styles.statNumber}>{stats.programs}</span>
                                        <span style={styles.statLabel}>Programs</span>
                                    </div>
                                </div>
                                <div style={styles.statCard}>
                                    <div style={{ ...styles.statIcon, background: '#FEF3C7', color: '#D97706' }}>
                                        <i className="fa-solid fa-envelope"></i>
                                    </div>
                                    <div>
                                        <span style={styles.statNumber}>{stats.enquiries}</span>
                                        <span style={styles.statLabel}>Total Enquiries</span>
                                    </div>
                                </div>
                                <div style={styles.statCard}>
                                    <div style={{ ...styles.statIcon, background: '#F3E8FF', color: '#9333EA' }}>
                                        <i className="fa-solid fa-bell"></i>
                                    </div>
                                    <div>
                                        <span style={styles.statNumber}>{stats.newEnquiries}</span>
                                        <span style={styles.statLabel}>New Enquiries</span>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Enquiries */}
                            <div style={styles.card}>
                                <div style={styles.cardHeader}>
                                    <h2 style={styles.cardTitle}>Recent Enquiries</h2>
                                    <button 
                                        style={styles.viewAllBtn}
                                        onClick={() => setActiveTab('enquiries')}
                                    >
                                        View All <i className="fa-solid fa-arrow-right"></i>
                                    </button>
                                </div>
                                <div style={styles.tableWrapper}>
                                    <table style={styles.table}>
                                        <thead>
                                            <tr>
                                                <th style={styles.th}>Name</th>
                                                <th style={styles.th}>Email</th>
                                                <th style={styles.th}>Phone</th>
                                                <th style={styles.th}>Status</th>
                                                <th style={styles.th}>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {enquiries.slice(0, 5).map(enq => (
                                                <tr key={enq._id}>
                                                    <td style={styles.td}>{enq.name}</td>
                                                    <td style={styles.td}>{enq.email}</td>
                                                    <td style={styles.td}>{enq.phone}</td>
                                                    <td style={styles.td}>
                                                        <span style={{
                                                            ...styles.statusBadge,
                                                            background: enq.status === 'New' ? '#FEF3C7' : '#DCFCE7',
                                                            color: enq.status === 'New' ? '#D97706' : '#16A34A'
                                                        }}>
                                                            {enq.status}
                                                        </span>
                                                    </td>
                                                    <td style={styles.td}>
                                                        {new Date(enq.createdAt).toLocaleDateString()}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {enquiries.length === 0 && (
                                        <p style={styles.noData}>No enquiries yet</p>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Universities Tab */}
                    {activeTab === 'universities' && (
                        <div style={styles.card}>
                            <div style={styles.tableWrapper}>
                                <table style={styles.table}>
                                    <thead>
                                        <tr>
                                            <th style={styles.th}>University</th>
                                            <th style={styles.th}>Location</th>
                                            <th style={styles.th}>Rating</th>
                                            <th style={styles.th}>Status</th>
                                            <th style={styles.th}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {universities.map(uni => (
                                            <tr key={uni._id}>
                                                <td style={styles.td}>
                                                    <div style={styles.uniCell}>
                                                        <img
                                                            src={uni.logo || 'https://via.placeholder.com/40'}
                                                            alt={uni.name}
                                                            style={styles.uniLogo}
                                                        />
                                                        <div>
                                                            <span style={styles.uniName}>{uni.name}</span>
                                                            {uni.featured && (
                                                                <span style={styles.featuredBadge}>Featured</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={styles.td}>{uni.location}</td>
                                                <td style={styles.td}>
                                                    <span style={styles.ratingBadge}>{uni.rating || 'N/A'}</span>
                                                </td>
                                                <td style={styles.td}>
                                                    <button
                                                        style={{
                                                            ...styles.statusToggle,
                                                            background: uni.isActive ? '#DCFCE7' : '#FEE2E2',
                                                            color: uni.isActive ? '#16A34A' : '#DC2626'
                                                        }}
                                                        onClick={() => handleToggleStatus('universities', uni._id)}
                                                    >
                                                        {uni.isActive ? 'Active' : 'Inactive'}
                                                    </button>
                                                </td>
                                                <td style={styles.td}>
                                                    <div style={styles.actions}>
                                                        <Link
                                                            to={`/admin/universities/edit/${uni._id}`}
                                                            style={styles.editBtn}
                                                        >
                                                            <i className="fa-solid fa-pen"></i>
                                                        </Link>
                                                        <button
                                                            style={styles.deleteBtn}
                                                            onClick={() => handleDelete('universities', uni._id)}
                                                        >
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {universities.length === 0 && (
                                    <div style={styles.emptyState}>
                                        <i className="fa-solid fa-building-columns" style={styles.emptyIcon}></i>
                                        <h3>No Universities Yet</h3>
                                        <p>Start by adding your first university</p>
                                        <Link to="/admin/universities/add" style={styles.addBtn}>
                                            <i className="fa-solid fa-plus"></i> Add University
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Programs Tab */}
                    {activeTab === 'programs' && (
                        <div style={styles.card}>
                            <div style={styles.tableWrapper}>
                                <table style={styles.table}>
                                    <thead>
                                        <tr>
                                            <th style={styles.th}>Program</th>
                                            <th style={styles.th}>University</th>
                                            <th style={styles.th}>Category</th>
                                            <th style={styles.th}>Fee</th>
                                            <th style={styles.th}>Status</th>
                                            <th style={styles.th}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {programs.map(prog => (
                                            <tr key={prog._id}>
                                                <td style={styles.td}>
                                                    <div>
                                                        <span style={styles.progName}>{prog.name}</span>
                                                        <span style={styles.progLevel}>{prog.level}</span>
                                                    </div>
                                                </td>
                                                <td style={styles.td}>
                                                    {prog.universityId?.name || 'N/A'}
                                                </td>
                                                <td style={styles.td}>
                                                    <span style={styles.categoryBadge}>{prog.category}</span>
                                                </td>
                                                <td style={styles.td}>
                                                    ₹{Number(prog.fee).toLocaleString('en-IN')}
                                                </td>
                                                <td style={styles.td}>
                                                    <button
                                                        style={{
                                                            ...styles.statusToggle,
                                                            background: prog.isActive ? '#DCFCE7' : '#FEE2E2',
                                                            color: prog.isActive ? '#16A34A' : '#DC2626'
                                                        }}
                                                        onClick={() => handleToggleStatus('programs', prog._id)}
                                                    >
                                                        {prog.isActive ? 'Active' : 'Inactive'}
                                                    </button>
                                                </td>
                                                <td style={styles.td}>
                                                    <div style={styles.actions}>
                                                        <Link
                                                            to={`/admin/programs/edit/${prog._id}`}
                                                            style={styles.editBtn}
                                                        >
                                                            <i className="fa-solid fa-pen"></i>
                                                        </Link>
                                                        <button
                                                            style={styles.deleteBtn}
                                                            onClick={() => handleDelete('programs', prog._id)}
                                                        >
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {programs.length === 0 && (
                                    <div style={styles.emptyState}>
                                        <i className="fa-solid fa-graduation-cap" style={styles.emptyIcon}></i>
                                        <h3>No Programs Yet</h3>
                                        <p>Start by adding your first program</p>
                                        <Link to="/admin/programs/add" style={styles.addBtn}>
                                            <i className="fa-solid fa-plus"></i> Add Program
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Enquiries Tab */}
                    {activeTab === 'enquiries' && (
                        <div style={styles.card}>
                            <div style={styles.tableWrapper}>
                                <table style={styles.table}>
                                    <thead>
                                        <tr>
                                            <th style={styles.th}>Name</th>
                                            <th style={styles.th}>Contact</th>
                                            <th style={styles.th}>Program</th>
                                            <th style={styles.th}>Source</th>
                                            <th style={styles.th}>Status</th>
                                            <th style={styles.th}>Date</th>
                                            <th style={styles.th}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {enquiries.map(enq => (
                                            <tr key={enq._id}>
                                                <td style={styles.td}>{enq.name}</td>
                                                <td style={styles.td}>
                                                    <div>
                                                        <span style={styles.contactEmail}>{enq.email}</span>
                                                        <span style={styles.contactPhone}>{enq.phone}</span>
                                                    </div>
                                                </td>
                                                <td style={styles.td}>
                                                    {enq.programId?.name || enq.universityId?.name || 'General'}
                                                </td>
                                                <td style={styles.td}>
                                                    <span style={styles.sourceBadge}>{enq.source}</span>
                                                </td>
                                                <td style={styles.td}>
                                                    <select
                                                        value={enq.status}
                                                        onChange={(e) => updateEnquiryStatus(enq._id, e.target.value)}
                                                        style={styles.statusSelect}
                                                    >
                                                        <option value="New">New</option>
                                                        <option value="Contacted">Contacted</option>
                                                        <option value="Interested">Interested</option>
                                                        <option value="Not Interested">Not Interested</option>
                                                        <option value="Converted">Converted</option>
                                                        <option value="Closed">Closed</option>
                                                    </select>
                                                </td>
                                                <td style={styles.td}>
                                                    {new Date(enq.createdAt).toLocaleDateString()}
                                                </td>
                                                <td style={styles.td}>
                                                    <button
                                                        style={styles.deleteBtn}
                                                        onClick={() => handleDelete('enquiries', enq._id)}
                                                    >
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {enquiries.length === 0 && (
                                    <div style={styles.emptyState}>
                                        <i className="fa-solid fa-envelope" style={styles.emptyIcon}></i>
                                        <h3>No Enquiries Yet</h3>
                                        <p>Enquiries will appear here when users submit forms</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

const styles = {
    loadingScreen: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '15px',
        background: '#F8FAFC'
    },
    wrapper: {
        display: 'flex',
        minHeight: '100vh',
        background: '#F8FAFC'
    },
    sidebar: {
        width: '260px',
        background: '#0F172A',
        padding: '25px 20px',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 100
    },
    sidebarHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '40px',
        paddingBottom: '20px',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
    },
    sidebarLogo: {
        fontSize: '1.8rem',
        color: '#FF6B35'
    },
    sidebarTitle: {
        color: '#fff',
        fontSize: '1.4rem',
        fontWeight: '700'
    },
    sidebarNav: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        flex: 1
    },
    navItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 18px',
        background: 'transparent',
        border: 'none',
        color: '#94A3B8',
        fontSize: '0.95rem',
        fontWeight: '500',
        borderRadius: '10px',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.2s ease'
    },
    navItemActive: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 18px',
        background: 'rgba(255, 107, 53, 0.15)',
        border: 'none',
        color: '#FF6B35',
        fontSize: '0.95rem',
        fontWeight: '600',
        borderRadius: '10px',
        cursor: 'pointer',
        textAlign: 'left'
    },
    badge: {
        marginLeft: 'auto',
        background: '#FF6B35',
        color: '#fff',
        padding: '2px 8px',
        borderRadius: '10px',
        fontSize: '0.75rem',
        fontWeight: '600'
    },
    sidebarFooter: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        paddingTop: '20px',
        borderTop: '1px solid rgba(255,255,255,0.1)'
    },
    viewSiteLink: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 18px',
        color: '#94A3B8',
        textDecoration: 'none',
        fontSize: '0.9rem',
        borderRadius: '10px'
    },
    logoutBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 18px',
        background: 'rgba(220, 38, 38, 0.15)',
        border: 'none',
        color: '#F87171',
        fontSize: '0.9rem',
        borderRadius: '10px',
        cursor: 'pointer'
    },
    main: {
        flex: 1,
        marginLeft: '260px',
        padding: '30px'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
    },
    pageTitle: {
        color: '#0F172A',
        fontSize: '1.8rem',
        fontWeight: '700',
        marginBottom: '5px'
    },
    pageSubtitle: {
        color: '#64748B',
        fontSize: '0.95rem'
    },
    headerActions: {},
    addBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 24px',
        background: '#FF6B35',
        color: '#fff',
        borderRadius: '10px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '0.9rem'
    },
    content: {},
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        marginBottom: '30px'
    },
    statCard: {
        background: '#fff',
        padding: '25px',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
    },
    statIcon: {
        width: '60px',
        height: '60px',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem'
    },
    statNumber: {
        display: 'block',
        color: '#0F172A',
        fontSize: '1.8rem',
        fontWeight: '700'
    },
    statLabel: {
        color: '#64748B',
        fontSize: '0.9rem'
    },
    card: {
        background: '#fff',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 25px',
        borderBottom: '1px solid #E2E8F0'
    },
    cardTitle: {
        color: '#0F172A',
        fontSize: '1.1rem',
        fontWeight: '600'
    },
    viewAllBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        color: '#FF6B35',
        background: 'none',
        border: 'none',
        fontWeight: '600',
        fontSize: '0.9rem',
        cursor: 'pointer'
    },
    tableWrapper: {
        overflowX: 'auto'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse'
    },
    th: {
        textAlign: 'left',
        padding: '15px 20px',
        background: '#F8FAFC',
        color: '#64748B',
        fontSize: '0.85rem',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    td: {
        padding: '15px 20px',
        borderBottom: '1px solid #E2E8F0',
        color: '#334155',
        fontSize: '0.9rem'
    },
    uniCell: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    uniLogo: {
        width: '40px',
        height: '40px',
        borderRadius: '8px',
        objectFit: 'contain',
        background: '#F8FAFC'
    },
    uniName: {
        display: 'block',
        fontWeight: '600',
        color: '#0F172A'
    },
    featuredBadge: {
        display: 'inline-block',
        background: '#FEF3C7',
        color: '#D97706',
        padding: '2px 8px',
        borderRadius: '4px',
        fontSize: '0.7rem',
        fontWeight: '600',
        marginTop: '4px'
    },
    ratingBadge: {
        background: '#FEF3C7',
        color: '#D97706',
        padding: '4px 10px',
        borderRadius: '6px',
        fontSize: '0.8rem',
        fontWeight: '600'
    },
    statusToggle: {
        padding: '6px 12px',
        border: 'none',
        borderRadius: '6px',
        fontSize: '0.8rem',
        fontWeight: '600',
        cursor: 'pointer'
    },
    actions: {
        display: 'flex',
        gap: '8px'
    },
    editBtn: {
        width: '36px',
        height: '36px',
        borderRadius: '8px',
        background: '#DBEAFE',
        color: '#3B82F6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        fontSize: '0.9rem'
    },
    deleteBtn: {
        width: '36px',
        height: '36px',
        borderRadius: '8px',
        background: '#FEE2E2',
        color: '#DC2626',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '0.9rem'
    },
    progName: {
        display: 'block',
        fontWeight: '600',
        color: '#0F172A'
    },
    progLevel: {
        display: 'block',
        color: '#64748B',
        fontSize: '0.8rem'
    },
    categoryBadge: {
        background: '#DBEAFE',
        color: '#1D4ED8',
        padding: '4px 10px',
        borderRadius: '6px',
        fontSize: '0.8rem',
        fontWeight: '500'
    },
    contactEmail: {
        display: 'block',
        fontWeight: '500'
    },
    contactPhone: {
        display: 'block',
        color: '#64748B',
        fontSize: '0.85rem'
    },
    sourceBadge: {
        background: '#F1F5F9',
        color: '#475569',
        padding: '4px 10px',
        borderRadius: '6px',
        fontSize: '0.8rem'
    },
    statusSelect: {
        padding: '6px 10px',
        borderRadius: '6px',
        border: '1px solid #E2E8F0',
        fontSize: '0.8rem',
        cursor: 'pointer'
    },
    statusBadge: {
        padding: '4px 10px',
        borderRadius: '6px',
        fontSize: '0.8rem',
        fontWeight: '500'
    },
    emptyState: {
        padding: '60px 20px',
        textAlign: 'center',
        color: '#64748B'
    },
    emptyIcon: {
        fontSize: '3rem',
        color: '#CBD5E1',
        marginBottom: '15px'
    },
    noData: {
        padding: '40px 20px',
        textAlign: 'center',
        color: '#94A3B8'
    }
};

export default Dashboard;