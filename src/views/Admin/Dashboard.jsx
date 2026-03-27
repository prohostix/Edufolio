"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import API_BASE from '../../api';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';

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
    const [seoSettings, setSeoSettings] = useState({
        title: '',
        description: '',
        keywords: '',
        author: '',
        ogImage: ''
    });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const { isAuthenticated, admin, logout, loading: authLoading } = useContext(AuthContext);
    const router = useRouter();

    // Search & Filter States
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    // Delete confirmation modal
    const [deleteModal, setDeleteModal] = useState({ show: false, type: '', id: '', name: '' });
    const [deleting, setDeleting] = useState(false);

    // Toast notification
    const [toast, setToast] = useState({ show: false, message: '', type: '' });

    const categories = ['MBA', 'MCA', 'BBA', 'BCA', 'B.Com', 'M.Com', 'BA', 'MA', 'B.Sc', 'M.Sc', 'B.Tech', 'M.Tech', 'PhD', 'Diploma', 'Certificate'];

    useEffect(() => {
        if (!authLoading) {
            if (!isAuthenticated) {
                router.push('/admin/login');
            } else {
                fetchData(localStorage.getItem('adminToken'));
            }
        }
    }, [isAuthenticated, authLoading, router]);

    // Auto-hide toast
    useEffect(() => {
        if (toast.show) {
            const timer = setTimeout(() => {
                setToast({ show: false, message: '', type: '' });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toast.show]);

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
    };

    const fetchData = async (token) => {
        try {
            setLoading(true);
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const [statsRes, uniRes, progRes, enqRes, seoRes] = await Promise.all([
                axios.get(`${API_BASE}/admin/stats`, config),
                axios.get(`${API_BASE}/admin/universities`, config),
                axios.get(`${API_BASE}/admin/programs`, config),
                axios.get(`${API_BASE}/admin/enquiries`, config),
                axios.get(`${API_BASE}/seo`)
            ]);

            setStats(statsRes.data);
            setUniversities(uniRes.data);
            setPrograms(progRes.data);
            setEnquiries(enqRes.data);
            if (seoRes.data) setSeoSettings(seoRes.data);
        } catch (err) {
            console.error('Error fetching data:', err);
            if (err.response?.status === 401) {
                handleLogout();
            } else {
                showToast('Failed to fetch data', 'error');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        router.push('/admin/login');
    };

    // Open delete confirmation modal
    const openDeleteModal = (type, id, name) => {
        setDeleteModal({ show: true, type, id, name });
    };

    // Close delete modal
    const closeDeleteModal = () => {
        setDeleteModal({ show: false, type: '', id: '', name: '' });
    };

    // Confirm delete
    const confirmDelete = async () => {
        setDeleting(true);
        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`${API_BASE}/admin/${deleteModal.type}/${deleteModal.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            showToast(`${deleteModal.type.slice(0, -1)} deleted successfully`, 'success');
            fetchData(token);
        } catch (err) {
            console.error('Delete error:', err);
            showToast('Failed to delete item', 'error');
        } finally {
            setDeleting(false);
            closeDeleteModal();
        }
    };

    const handleToggleStatus = async (type, id, currentStatus) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.put(`${API_BASE}/admin/${type}/${id}/toggle`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            showToast(`Status updated to ${currentStatus ? 'Inactive' : 'Active'}`, 'success');
            fetchData(token);
        } catch (err) {
            console.error('Toggle error:', err);
            showToast('Failed to update status', 'error');
        }
    };

    const handleToggleFeatured = async (type, id, currentFeatured) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.put(`${API_BASE}/admin/${type}/${id}/featured`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            showToast(`${currentFeatured ? 'Removed from' : 'Added to'} featured`, 'success');
            fetchData(token);
        } catch (err) {
            console.error('Toggle featured error:', err);
            showToast('Failed to update featured status', 'error');
        }
    };

    const updateEnquiryStatus = async (id, status) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.put(`${API_BASE}/admin/enquiries/${id}/status`,
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            showToast('Enquiry status updated', 'success');
            fetchData(token);
        } catch (err) {
            console.error('Update status error:', err);
            showToast('Failed to update status', 'error');
        }
    };

    const handleSeoUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('adminToken');
            await axios.put(`${API_BASE}/seo`, seoSettings, {
                headers: { Authorization: `Bearer ${token}` }
            });
            showToast('SEO settings updated successfully', 'success');
        } catch (err) {
            console.error('SEO update error:', err);
            showToast('Failed to update SEO settings', 'error');
        }
    };

    // Filter functions
    const getFilteredUniversities = () => {
        let filtered = [...universities];

        if (searchTerm) {
            filtered = filtered.filter(uni =>
                uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                uni.location?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterStatus === 'active') {
            filtered = filtered.filter(uni => uni.isActive);
        } else if (filterStatus === 'inactive') {
            filtered = filtered.filter(uni => !uni.isActive);
        } else if (filterStatus === 'featured') {
            filtered = filtered.filter(uni => uni.featured);
        }

        // Sort
        if (sortBy === 'newest') {
            filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortBy === 'oldest') {
            filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else if (sortBy === 'name') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        }

        return filtered;
    };

    const getFilteredPrograms = () => {
        let filtered = [...programs];

        if (searchTerm) {
            filtered = filtered.filter(prog =>
                prog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                prog.universityId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterCategory) {
            filtered = filtered.filter(prog => prog.category === filterCategory);
        }

        if (filterStatus === 'active') {
            filtered = filtered.filter(prog => prog.isActive);
        } else if (filterStatus === 'inactive') {
            filtered = filtered.filter(prog => !prog.isActive);
        } else if (filterStatus === 'featured') {
            filtered = filtered.filter(prog => prog.featured);
        }

        // Sort
        if (sortBy === 'newest') {
            filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortBy === 'oldest') {
            filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else if (sortBy === 'name') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'fee-low') {
            filtered.sort((a, b) => a.fee - b.fee);
        } else if (sortBy === 'fee-high') {
            filtered.sort((a, b) => b.fee - a.fee);
        }

        return filtered;
    };

    const getFilteredEnquiries = () => {
        let filtered = [...enquiries];

        if (searchTerm) {
            filtered = filtered.filter(enq =>
                enq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                enq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                enq.phone.includes(searchTerm)
            );
        }

        if (filterStatus) {
            filtered = filtered.filter(enq => enq.status === filterStatus);
        }

        // Sort
        if (sortBy === 'newest') {
            filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortBy === 'oldest') {
            filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }

        return filtered;
    };

    // Reset filters when changing tabs
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSearchTerm('');
        setFilterCategory('');
        setFilterStatus('');
        setSortBy('newest');
    };

    if (loading) {
        return (
            <div style={styles.loadingScreen}>
                <div style={styles.loadingSpinner}>
                    <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2.5rem', color: '#FF6B35' }}></i>
                </div>
                <p style={{ color: '#64748B', marginTop: '20px' }}>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div style={styles.wrapper}>
            {/* Toast Notification */}
            {toast.show && (
                <div style={{
                    ...styles.toast,
                    background: toast.type === 'error' ? '#FEE2E2' : '#D1FAE5',
                    color: toast.type === 'error' ? '#DC2626' : '#059669',
                    borderColor: toast.type === 'error' ? '#FECACA' : '#A7F3D0'
                }}>
                    <i className={`fa-solid ${toast.type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'}`}></i>
                    {toast.message}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteModal.show && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <div style={styles.modalIcon}>
                            <i className="fa-solid fa-trash-alt"></i>
                        </div>
                        <h3 style={styles.modalTitle}>Delete {deleteModal.type.slice(0, -1)}?</h3>
                        <p style={styles.modalText}>
                            Are you sure you want to delete <strong>"{deleteModal.name}"</strong>?
                            This action cannot be undone.
                        </p>
                        <div style={styles.modalActions}>
                            <button
                                style={styles.modalCancelBtn}
                                onClick={closeDeleteModal}
                                disabled={deleting}
                            >
                                Cancel
                            </button>
                            <button
                                style={styles.modalDeleteBtn}
                                onClick={confirmDelete}
                                disabled={deleting}
                            >
                                {deleting ? (
                                    <>
                                        <i className="fa-solid fa-spinner fa-spin"></i> Deleting...
                                    </>
                                ) : (
                                    <>
                                        <i className="fa-solid fa-trash"></i> Delete
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Sidebar */}
            <aside style={styles.sidebar}>
                <div style={styles.sidebarHeader}>
                    <i className="fa-solid fa-graduation-cap" style={styles.sidebarLogo}></i>
                    <span style={styles.sidebarTitle}>EduFolio</span>
                </div>

                <nav style={styles.sidebarNav}>
                    <button
                        style={activeTab === 'overview' ? styles.navItemActive : styles.navItem}
                        onClick={() => handleTabChange('overview')}
                    >
                        <i className="fa-solid fa-chart-pie"></i>
                        <span>Overview</span>
                    </button>
                    <button
                        style={activeTab === 'universities' ? styles.navItemActive : styles.navItem}
                        onClick={() => handleTabChange('universities')}
                    >
                        <i className="fa-solid fa-building-columns"></i>
                        <span>Universities</span>
                        <span style={styles.countBadge}>{universities.length}</span>
                    </button>
                    <button
                        style={activeTab === 'programs' ? styles.navItemActive : styles.navItem}
                        onClick={() => handleTabChange('programs')}
                    >
                        <i className="fa-solid fa-graduation-cap"></i>
                        <span>Programs</span>
                        <span style={styles.countBadge}>{programs.length}</span>
                    </button>
                    <button
                        style={activeTab === 'enquiries' ? styles.navItemActive : styles.navItem}
                        onClick={() => handleTabChange('enquiries')}
                    >
                        <i className="fa-solid fa-envelope"></i>
                        <span>Enquiries</span>
                        {stats.newEnquiries > 0 && (
                            <span style={styles.badge}>{stats.newEnquiries}</span>
                        )}
                    </button>
                    <button
                        style={activeTab === 'seo' ? styles.navItemActive : styles.navItem}
                        onClick={() => handleTabChange('seo')}
                    >
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <span>SEO Settings</span>
                    </button>
                    <button
                        style={activeTab === 'coursefinder' ? styles.navItemActive : styles.navItem}
                        onClick={() => handleTabChange('coursefinder')}
                    >
                        <i className="fa-solid fa-wand-magic-sparkles"></i>
                        <span>Course Finder</span>
                    </button>
                </nav>

                <div style={styles.sidebarFooter}>
                    <a href="/" target="_blank" rel="noreferrer" style={styles.viewSiteLink}>
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
                            {activeTab === 'seo' && 'SEO Configuration'}
                            {activeTab === 'coursefinder' && 'Course Finder Questions'}
                        </h1>
                        <p style={styles.pageSubtitle}>
                            Welcome back, {admin?.name || 'Admin'}! 👋
                        </p>
                    </div>
                    <div style={styles.headerActions}>
                        {activeTab === 'universities' && (
                            <Link href="/admin/universities/add" style={styles.addBtn}>
                                <i className="fa-solid fa-plus"></i> Add University
                            </Link>
                        )}
                        {activeTab === 'programs' && (
                            <Link href="/admin/programs/add" style={styles.addBtn}>
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
                                <div
                                    style={styles.statCard}
                                    onClick={() => handleTabChange('universities')}
                                >
                                    <div style={{ ...styles.statIcon, background: '#DBEAFE', color: '#3B82F6' }}>
                                        <i className="fa-solid fa-building-columns"></i>
                                    </div>
                                    <div>
                                        <span style={styles.statNumber}>{stats.universities}</span>
                                        <span style={styles.statLabel}>Universities</span>
                                    </div>
                                    <i className="fa-solid fa-arrow-right" style={styles.statArrow}></i>
                                </div>
                                <div
                                    style={styles.statCard}
                                    onClick={() => handleTabChange('programs')}
                                >
                                    <div style={{ ...styles.statIcon, background: '#DCFCE7', color: '#16A34A' }}>
                                        <i className="fa-solid fa-graduation-cap"></i>
                                    </div>
                                    <div>
                                        <span style={styles.statNumber}>{stats.programs}</span>
                                        <span style={styles.statLabel}>Programs</span>
                                    </div>
                                    <i className="fa-solid fa-arrow-right" style={styles.statArrow}></i>
                                </div>
                                <div
                                    style={styles.statCard}
                                    onClick={() => handleTabChange('enquiries')}
                                >
                                    <div style={{ ...styles.statIcon, background: '#FEF3C7', color: '#D97706' }}>
                                        <i className="fa-solid fa-envelope"></i>
                                    </div>
                                    <div>
                                        <span style={styles.statNumber}>{stats.enquiries}</span>
                                        <span style={styles.statLabel}>Total Enquiries</span>
                                    </div>
                                    <i className="fa-solid fa-arrow-right" style={styles.statArrow}></i>
                                </div>
                                <div
                                    style={styles.statCard}
                                    onClick={() => {
                                        handleTabChange('enquiries');
                                        setFilterStatus('New');
                                    }}
                                >
                                    <div style={{ ...styles.statIcon, background: '#F3E8FF', color: '#9333EA' }}>
                                        <i className="fa-solid fa-bell"></i>
                                    </div>
                                    <div>
                                        <span style={styles.statNumber}>{stats.newEnquiries}</span>
                                        <span style={styles.statLabel}>New Enquiries</span>
                                    </div>
                                    <i className="fa-solid fa-arrow-right" style={styles.statArrow}></i>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div style={styles.quickActions}>
                                <h3 style={styles.quickActionsTitle}>Quick Actions</h3>
                                <div style={styles.quickActionsGrid}>
                                    <Link href="/admin/universities/add" style={styles.quickActionCard}>
                                        <div style={{ ...styles.quickActionIcon, background: '#DBEAFE' }}>
                                            <i className="fa-solid fa-plus" style={{ color: '#3B82F6' }}></i>
                                        </div>
                                        <span>Add University</span>
                                    </Link>
                                    <Link href="/admin/programs/add" style={styles.quickActionCard}>
                                        <div style={{ ...styles.quickActionIcon, background: '#DCFCE7' }}>
                                            <i className="fa-solid fa-plus" style={{ color: '#16A34A' }}></i>
                                        </div>
                                        <span>Add Program</span>
                                    </Link>
                                    <button
                                        style={styles.quickActionCard}
                                        onClick={() => handleTabChange('enquiries')}
                                    >
                                        <div style={{ ...styles.quickActionIcon, background: '#FEF3C7' }}>
                                            <i className="fa-solid fa-envelope-open" style={{ color: '#D97706' }}></i>
                                        </div>
                                        <span>View Enquiries</span>
                                    </button>
                                    <a href="/" target="_blank" rel="noreferrer" style={styles.quickActionCard}>
                                        <div style={{ ...styles.quickActionIcon, background: '#F3E8FF' }}>
                                            <i className="fa-solid fa-eye" style={{ color: '#9333EA' }}></i>
                                        </div>
                                        <span>Preview Site</span>
                                    </a>
                                </div>
                            </div>

                            {/* Recent Enquiries */}
                            <div style={styles.card}>
                                <div style={styles.cardHeader}>
                                    <h2 style={styles.cardTitle}>
                                        <i className="fa-solid fa-clock" style={{ marginRight: '10px', color: '#FF6B35' }}></i>
                                        Recent Enquiries
                                    </h2>
                                    <button
                                        style={styles.viewAllBtn}
                                        onClick={() => handleTabChange('enquiries')}
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
                                                <tr key={enq._id} style={styles.tableRow}>
                                                    <td style={styles.td}>
                                                        <span style={styles.enquiryName}>{enq.name}</span>
                                                    </td>
                                                    <td style={styles.td}>{enq.email}</td>
                                                    <td style={styles.td}>{enq.phone}</td>
                                                    <td style={styles.td}>
                                                        <span style={{
                                                            ...styles.statusBadge,
                                                            background: enq.status === 'New' ? '#FEF3C7' : enq.status === 'Contacted' ? '#DBEAFE' : '#DCFCE7',
                                                            color: enq.status === 'New' ? '#D97706' : enq.status === 'Contacted' ? '#3B82F6' : '#16A34A'
                                                        }}>
                                                            {enq.status}
                                                        </span>
                                                    </td>
                                                    <td style={styles.td}>
                                                        {new Date(enq.createdAt).toLocaleDateString('en-IN', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        })}
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
                            {/* Filters */}
                            <div style={styles.filters}>
                                <div style={styles.searchBox}>
                                    <i className="fa-solid fa-search" style={styles.searchIcon}></i>
                                    <input
                                        type="text"
                                        placeholder="Search universities..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        style={styles.searchInput}
                                    />
                                    {searchTerm && (
                                        <button
                                            style={styles.clearSearch}
                                            onClick={() => setSearchTerm('')}
                                        >
                                            <i className="fa-solid fa-times"></i>
                                        </button>
                                    )}
                                </div>
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    style={styles.filterSelect}
                                >
                                    <option value="">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="featured">Featured</option>
                                </select>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    style={styles.filterSelect}
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                    <option value="name">Name (A-Z)</option>
                                </select>
                            </div>

                            {/* Results count */}
                            <div style={styles.resultsInfo}>
                                Showing {getFilteredUniversities().length} of {universities.length} universities
                            </div>

                            <div style={styles.tableWrapper}>
                                <table style={styles.table}>
                                    <thead>
                                        <tr>
                                            <th style={styles.th}>University</th>
                                            <th style={styles.th}>Location</th>
                                            <th style={styles.th}>Rating</th>
                                            <th style={styles.th}>Featured</th>
                                            <th style={styles.th}>Status</th>
                                            <th style={styles.th}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getFilteredUniversities().map(uni => (
                                            <tr key={uni._id} style={styles.tableRow}>
                                                <td style={styles.td}>
                                                    <div style={styles.uniCell}>
                                                        <img
                                                            src={uni.logo || 'https://placehold.co/40?text=U'}
                                                            alt={uni.name}
                                                            style={styles.uniLogo}
                                                            onError={(e) => e.target.src = 'https://placehold.co/40?text=U'}
                                                        />
                                                        <div>
                                                            <span style={styles.uniName}>{uni.name}</span>
                                                            <span style={styles.uniType}>{uni.type || 'University'}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={styles.td}>
                                                    <span style={styles.locationText}>
                                                        <i className="fa-solid fa-location-dot" style={{ marginRight: '6px', color: '#94A3B8' }}></i>
                                                        {uni.location || 'N/A'}
                                                    </span>
                                                </td>
                                                <td style={styles.td}>
                                                    <span style={styles.ratingBadge}>
                                                        <i className="fa-solid fa-star" style={{ marginRight: '4px' }}></i>
                                                        {uni.rating || 'N/A'}
                                                    </span>
                                                </td>
                                                <td style={styles.td}>
                                                    <button
                                                        style={{
                                                            ...styles.featuredToggle,
                                                            background: uni.featured ? '#FEF3C7' : '#F1F5F9',
                                                            color: uni.featured ? '#D97706' : '#94A3B8'
                                                        }}
                                                        onClick={() => handleToggleFeatured('universities', uni._id, uni.featured)}
                                                        title={uni.featured ? 'Remove from featured' : 'Add to featured'}
                                                    >
                                                        <i className={`fa-solid fa-star`}></i>
                                                    </button>
                                                </td>
                                                <td style={styles.td}>
                                                    <button
                                                        style={{
                                                            ...styles.statusToggle,
                                                            background: uni.isActive ? '#DCFCE7' : '#FEE2E2',
                                                            color: uni.isActive ? '#16A34A' : '#DC2626'
                                                        }}
                                                        onClick={() => handleToggleStatus('universities', uni._id, uni.isActive)}
                                                    >
                                                        <i className={`fa-solid ${uni.isActive ? 'fa-check-circle' : 'fa-times-circle'}`} style={{ marginRight: '6px' }}></i>
                                                        {uni.isActive ? 'Active' : 'Inactive'}
                                                    </button>
                                                </td>
                                                <td style={styles.td}>
                                                    <div style={styles.actions}>
                                                        <Link href={`/admin/universities/edit/${uni._id}`}
                                                            style={styles.editBtn}
                                                            title="Edit"
                                                        >
                                                            <i className="fa-solid fa-pen"></i>
                                                        </Link>
                                                        <button
                                                            style={styles.deleteBtn}
                                                            onClick={() => openDeleteModal('universities', uni._id, uni.name)}
                                                            title="Delete"
                                                        >
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {getFilteredUniversities().length === 0 && universities.length > 0 && (
                                    <div style={styles.noResults}>
                                        <i className="fa-solid fa-search" style={styles.noResultsIcon}></i>
                                        <h3>No universities found</h3>
                                        <p>Try adjusting your search or filters</p>
                                        <button
                                            style={styles.clearFiltersBtn}
                                            onClick={() => {
                                                setSearchTerm('');
                                                setFilterStatus('');
                                            }}
                                        >
                                            Clear Filters
                                        </button>
                                    </div>
                                )}
                                {universities.length === 0 && (
                                    <div style={styles.emptyState}>
                                        <i className="fa-solid fa-building-columns" style={styles.emptyIcon}></i>
                                        <h3>No Universities Yet</h3>
                                        <p>Start by adding your first university</p>
                                        <Link href="/admin/universities/add" style={styles.addBtn}>
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
                            {/* Filters */}
                            <div style={styles.filters}>
                                <div style={styles.searchBox}>
                                    <i className="fa-solid fa-search" style={styles.searchIcon}></i>
                                    <input
                                        type="text"
                                        placeholder="Search programs..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        style={styles.searchInput}
                                    />
                                    {searchTerm && (
                                        <button
                                            style={styles.clearSearch}
                                            onClick={() => setSearchTerm('')}
                                        >
                                            <i className="fa-solid fa-times"></i>
                                        </button>
                                    )}
                                </div>
                                <select
                                    value={filterCategory}
                                    onChange={(e) => setFilterCategory(e.target.value)}
                                    style={styles.filterSelect}
                                >
                                    <option value="">All Categories</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    style={styles.filterSelect}
                                >
                                    <option value="">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="featured">Featured</option>
                                </select>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    style={styles.filterSelect}
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                    <option value="name">Name (A-Z)</option>
                                    <option value="fee-low">Fee: Low to High</option>
                                    <option value="fee-high">Fee: High to Low</option>
                                </select>
                            </div>

                            {/* Results count */}
                            <div style={styles.resultsInfo}>
                                Showing {getFilteredPrograms().length} of {programs.length} programs
                            </div>

                            <div style={styles.tableWrapper}>
                                <table style={styles.table}>
                                    <thead>
                                        <tr>
                                            <th style={styles.th}>Program</th>
                                            <th style={styles.th}>University</th>
                                            <th style={styles.th}>Category</th>
                                            <th style={styles.th}>Fee</th>
                                            <th style={styles.th}>Featured</th>
                                            <th style={styles.th}>Status</th>
                                            <th style={styles.th}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getFilteredPrograms().map(prog => (
                                            <tr key={prog._id} style={styles.tableRow}>
                                                <td style={styles.td}>
                                                    <div>
                                                        <span style={styles.progName}>{prog.name}</span>
                                                        <span style={styles.progLevel}>
                                                            <i className="fa-solid fa-clock" style={{ marginRight: '4px' }}></i>
                                                            {prog.duration} • {prog.mode}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td style={styles.td}>
                                                    <span style={styles.uniNameSmall}>
                                                        {prog.universityId?.name || 'N/A'}
                                                    </span>
                                                </td>
                                                <td style={styles.td}>
                                                    <span style={styles.categoryBadge}>{prog.category}</span>
                                                </td>
                                                <td style={styles.td}>
                                                    <span style={styles.feeText}>
                                                        ₹{Number(prog.fee).toLocaleString('en-IN')}
                                                    </span>
                                                    <span style={styles.feePeriod}>{prog.feePeriod}</span>
                                                </td>
                                                <td style={styles.td}>
                                                    <button
                                                        style={{
                                                            ...styles.featuredToggle,
                                                            background: prog.featured ? '#FEF3C7' : '#F1F5F9',
                                                            color: prog.featured ? '#D97706' : '#94A3B8'
                                                        }}
                                                        onClick={() => handleToggleFeatured('programs', prog._id, prog.featured)}
                                                        title={prog.featured ? 'Remove from featured' : 'Add to featured'}
                                                    >
                                                        <i className={`fa-solid fa-star`}></i>
                                                    </button>
                                                </td>
                                                <td style={styles.td}>
                                                    <button
                                                        style={{
                                                            ...styles.statusToggle,
                                                            background: prog.isActive ? '#DCFCE7' : '#FEE2E2',
                                                            color: prog.isActive ? '#16A34A' : '#DC2626'
                                                        }}
                                                        onClick={() => handleToggleStatus('programs', prog._id, prog.isActive)}
                                                    >
                                                        <i className={`fa-solid ${prog.isActive ? 'fa-check-circle' : 'fa-times-circle'}`} style={{ marginRight: '6px' }}></i>
                                                        {prog.isActive ? 'Active' : 'Inactive'}
                                                    </button>
                                                </td>
                                                <td style={styles.td}>
                                                    <div style={styles.actions}>
                                                        <Link href={`/admin/programs/edit/${prog._id}`}
                                                            style={styles.editBtn}
                                                            title="Edit"
                                                        >
                                                            <i className="fa-solid fa-pen"></i>
                                                        </Link>
                                                        <button
                                                            style={styles.deleteBtn}
                                                            onClick={() => openDeleteModal('programs', prog._id, prog.name)}
                                                            title="Delete"
                                                        >
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {getFilteredPrograms().length === 0 && programs.length > 0 && (
                                    <div style={styles.noResults}>
                                        <i className="fa-solid fa-search" style={styles.noResultsIcon}></i>
                                        <h3>No programs found</h3>
                                        <p>Try adjusting your search or filters</p>
                                        <button
                                            style={styles.clearFiltersBtn}
                                            onClick={() => {
                                                setSearchTerm('');
                                                setFilterCategory('');
                                                setFilterStatus('');
                                            }}
                                        >
                                            Clear Filters
                                        </button>
                                    </div>
                                )}
                                {programs.length === 0 && (
                                    <div style={styles.emptyState}>
                                        <i className="fa-solid fa-graduation-cap" style={styles.emptyIcon}></i>
                                        <h3>No Programs Yet</h3>
                                        <p>Start by adding your first program</p>
                                        <Link href="/admin/programs/add" style={styles.addBtn}>
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
                            {/* Filters */}
                            <div style={styles.filters}>
                                <div style={styles.searchBox}>
                                    <i className="fa-solid fa-search" style={styles.searchIcon}></i>
                                    <input
                                        type="text"
                                        placeholder="Search by name, email, phone..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        style={styles.searchInput}
                                    />
                                    {searchTerm && (
                                        <button
                                            style={styles.clearSearch}
                                            onClick={() => setSearchTerm('')}
                                        >
                                            <i className="fa-solid fa-times"></i>
                                        </button>
                                    )}
                                </div>
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    style={styles.filterSelect}
                                >
                                    <option value="">All Status</option>
                                    <option value="New">New</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="Interested">Interested</option>
                                    <option value="Not Interested">Not Interested</option>
                                    <option value="Converted">Converted</option>
                                    <option value="Closed">Closed</option>
                                </select>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    style={styles.filterSelect}
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                </select>
                            </div>

                            {/* Results count */}
                            <div style={styles.tablePagination}>
                                <span>Showing {getFilteredEnquiries().length} of {enquiries.length} enquiries</span>
                            </div>

                            <div style={styles.tableWrapper}>
                                <table style={styles.table}>
                                    <thead>
                                        <tr>
                                            <th style={styles.th}>Name</th>
                                            <th style={styles.th}>Contact</th>
                                            <th style={styles.th}>Program/University</th>
                                            <th style={styles.th}>Message</th>
                                            <th style={styles.th}>Status</th>
                                            <th style={styles.th}>Date</th>
                                            <th style={styles.th}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getFilteredEnquiries().map(enq => (
                                            <tr key={enq._id} style={styles.tableRow}>
                                                <td style={styles.td}>
                                                    <span style={styles.enquiryName}>{enq.name}</span>
                                                </td>
                                                <td style={styles.td}>
                                                    <div>
                                                        <a href={`mailto:${enq.email}`} style={styles.contactEmail}>
                                                            <i className="fa-solid fa-envelope" style={{ marginRight: '6px' }}></i>
                                                            {enq.email}
                                                        </a>
                                                        <a href={`tel:${enq.phone}`} style={styles.contactPhone}>
                                                            <i className="fa-solid fa-phone" style={{ marginRight: '6px' }}></i>
                                                            {enq.phone}
                                                        </a>
                                                    </div>
                                                </td>
                                                <td style={styles.td}>
                                                    <span style={styles.enquiryProgram}>
                                                        {enq.programId?.name || enq.universityId?.name || 'General Enquiry'}
                                                    </span>
                                                </td>
                                                <td style={styles.td}>
                                                    <span style={styles.messagePreview} title={enq.message}>
                                                        {enq.message ? (enq.message.length > 50 ? enq.message.substring(0, 50) + '...' : enq.message) : '-'}
                                                    </span>
                                                </td>
                                                <td style={styles.td}>
                                                    <select
                                                        value={enq.status}
                                                        onChange={(e) => updateEnquiryStatus(enq._id, e.target.value)}
                                                        style={{
                                                            ...styles.statusSelect,
                                                            background: enq.status === 'New' ? '#FEF3C7' :
                                                                enq.status === 'Contacted' ? '#DBEAFE' :
                                                                    enq.status === 'Interested' ? '#D1FAE5' :
                                                                        enq.status === 'Converted' ? '#DCFCE7' :
                                                                            enq.status === 'Not Interested' ? '#FEE2E2' : '#F1F5F9',
                                                            color: enq.status === 'New' ? '#D97706' :
                                                                enq.status === 'Contacted' ? '#3B82F6' :
                                                                    enq.status === 'Interested' ? '#059669' :
                                                                        enq.status === 'Converted' ? '#16A34A' :
                                                                            enq.status === 'Not Interested' ? '#DC2626' : '#64748B'
                                                        }}
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
                                                    <span style={styles.dateText}>
                                                        {new Date(enq.createdAt).toLocaleDateString('en-IN', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                    <span style={styles.timeText}>
                                                        {new Date(enq.createdAt).toLocaleTimeString('en-IN', {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </span>
                                                </td>
                                                <td style={styles.td}>
                                                    <div style={styles.actions}>
                                                        <a
                                                            href={`https://wa.me/${enq.phone.replace(/\D/g, '')}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            style={styles.whatsappBtn}
                                                            title="WhatsApp"
                                                        >
                                                            <i className="fa-brands fa-whatsapp"></i>
                                                        </a>
                                                        <button
                                                            style={styles.deleteBtn}
                                                            onClick={() => openDeleteModal('enquiries', enq._id, enq.name)}
                                                            title="Delete"
                                                        >
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {getFilteredEnquiries().length === 0 && enquiries.length > 0 && (
                                    <div style={styles.noResults}>
                                        <i className="fa-solid fa-search" style={styles.noResultsIcon}></i>
                                        <h3>No enquiries found</h3>
                                        <p>Try adjusting your search or filters</p>
                                        <button
                                            style={styles.clearFiltersBtn}
                                            onClick={() => {
                                                setSearchTerm('');
                                                setFilterStatus('');
                                            }}
                                        >
                                            Clear Filters
                                        </button>
                                    </div>
                                )}
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

                    {/* SEO Tab */}
                    {activeTab === 'seo' && (
                        <div style={styles.card}>
                            <div style={styles.cardHeader}>
                                <h2 style={styles.cardTitle}>Global SEO Settings</h2>
                            </div>
                            <form onSubmit={handleSeoUpdate} style={styles.form}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Website Title</label>
                                    <input
                                        type="text"
                                        value={seoSettings.title}
                                        onChange={(e) => setSeoSettings({ ...seoSettings, title: e.target.value })}
                                        style={styles.input}
                                        placeholder="e.g. Edufolio - Find Your Dream University"
                                    />
                                    <small style={styles.helperText}>The main title tag for your website homepage</small>
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Meta Description</label>
                                    <textarea
                                        value={seoSettings.description}
                                        onChange={(e) => setSeoSettings({ ...seoSettings, description: e.target.value })}
                                        style={styles.textarea}
                                        rows="3"
                                        placeholder="Brief description of your website for search engines..."
                                    />
                                    <small style={styles.helperText}>Ideally between 150-160 characters</small>
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Keywords</label>
                                    <input
                                        type="text"
                                        value={seoSettings.keywords}
                                        onChange={(e) => setSeoSettings({ ...seoSettings, keywords: e.target.value })}
                                        style={styles.input}
                                        placeholder="education, universities, degrees, online learning"
                                    />
                                    <small style={styles.helperText}>Comma separated keywords</small>
                                </div>

                                <div style={styles.formRow}>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Author</label>
                                        <input
                                            type="text"
                                            value={seoSettings.author}
                                            onChange={(e) => setSeoSettings({ ...seoSettings, author: e.target.value })}
                                            style={styles.input}
                                            placeholder="Edufolio"
                                        />
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>OG Image URL</label>
                                        <input
                                            type="text"
                                            value={seoSettings.ogImage}
                                            onChange={(e) => setSeoSettings({ ...seoSettings, ogImage: e.target.value })}
                                            style={styles.input}
                                            placeholder="https://example.com/banner.jpg"
                                        />
                                    </div>
                                </div>

                                <div style={styles.formActions}>
                                    <button type="submit" style={styles.submitBtn}>
                                        <i className="fa-solid fa-save"></i> Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Course Finder Questions Tab */}
                    {activeTab === 'coursefinder' && (
                        <CourseFinderQuestionsTab showToast={showToast} token={localStorage.getItem('adminToken')} />
                    )}
                </div>
            </main>
        </div>
    );
};

const styles = {
    // Loading
    loadingScreen: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F8FAFC'
    },
    loadingSpinner: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: '#FFF7ED',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    // Toast
    toast: {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '16px 24px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '0.95rem',
        fontWeight: '600',
        boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
        zIndex: 1000,
        animation: 'slideIn 0.3s ease',
        border: '1px solid'
    },

    // Modal
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(15, 23, 42, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(4px)'
    },
    modal: {
        background: '#fff',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '400px',
        width: '90%',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
    },
    modalIcon: {
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        background: '#FEE2E2',
        color: '#DC2626',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.8rem',
        margin: '0 auto 20px'
    },
    modalTitle: {
        color: '#0F172A',
        fontSize: '1.3rem',
        fontWeight: '700',
        marginBottom: '10px'
    },
    modalText: {
        color: '#64748B',
        fontSize: '0.95rem',
        marginBottom: '30px',
        lineHeight: '1.6'
    },
    modalActions: {
        display: 'flex',
        gap: '12px',
        justifyContent: 'center'
    },
    modalCancelBtn: {
        padding: '12px 28px',
        background: '#F1F5F9',
        color: '#475569',
        border: 'none',
        borderRadius: '10px',
        fontSize: '0.95rem',
        fontWeight: '600',
        cursor: 'pointer'
    },
    modalDeleteBtn: {
        padding: '12px 28px',
        background: '#DC2626',
        color: '#fff',
        border: 'none',
        borderRadius: '10px',
        fontSize: '0.95rem',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },

    // Layout
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
    countBadge: {
        marginLeft: 'auto',
        background: 'rgba(148, 163, 184, 0.2)',
        color: '#94A3B8',
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
        marginBottom: '30px',
        flexWrap: 'wrap',
        gap: '20px'
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
        background: 'linear-gradient(135deg, #FF6B35 0%, #FF8B5C 100%)',
        color: '#fff',
        borderRadius: '10px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '0.9rem',
        boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)'
    },
    content: {},

    // Stats
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
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative'
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
    statArrow: {
        position: 'absolute',
        right: '20px',
        color: '#CBD5E1',
        fontSize: '0.9rem'
    },

    // Quick Actions
    quickActions: {
        marginBottom: '30px'
    },
    quickActionsTitle: {
        color: '#0F172A',
        fontSize: '1.1rem',
        fontWeight: '600',
        marginBottom: '15px'
    },
    quickActionsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '15px'
    },
    quickActionCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        padding: '20px',
        background: '#fff',
        borderRadius: '14px',
        textDecoration: 'none',
        color: '#334155',
        fontSize: '0.9rem',
        fontWeight: '600',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        cursor: 'pointer',
        border: 'none',
        transition: 'all 0.2s ease'
    },
    quickActionIcon: {
        width: '50px',
        height: '50px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem'
    },

    // Card
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
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center'
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

    // Filters
    filters: {
        display: 'flex',
        gap: '15px',
        padding: '20px 25px',
        borderBottom: '1px solid #E2E8F0',
        flexWrap: 'wrap'
    },
    searchBox: {
        flex: 1,
        minWidth: '250px',
        position: 'relative'
    },
    searchIcon: {
        position: 'absolute',
        left: '15px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#94A3B8'
    },
    searchInput: {
        width: '100%',
        padding: '12px 40px',
        border: '2px solid #E2E8F0',
        borderRadius: '10px',
        fontSize: '0.9rem',
        outline: 'none',
        boxSizing: 'border-box'
    },
    clearSearch: {
        position: 'absolute',
        right: '15px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        color: '#94A3B8',
        cursor: 'pointer'
    },
    filterSelect: {
        padding: '12px 16px',
        border: '2px solid #E2E8F0',
        borderRadius: '10px',
        fontSize: '0.9rem',
        outline: 'none',
        cursor: 'pointer',
        background: '#fff',
        minWidth: '150px'
    },
    resultsInfo: {
        padding: '12px 25px',
        color: '#64748B',
        fontSize: '0.85rem',
        borderBottom: '1px solid #E2E8F0'
    },

    // Table
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
        fontSize: '0.8rem',
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
    tableRow: {
        transition: 'background 0.2s ease'
    },

    // University cell
    uniCell: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    uniLogo: {
        width: '45px',
        height: '45px',
        borderRadius: '10px',
        objectFit: 'contain',
        background: '#F8FAFC',
        padding: '5px'
    },
    uniName: {
        display: 'block',
        fontWeight: '600',
        color: '#0F172A'
    },
    uniType: {
        display: 'block',
        color: '#94A3B8',
        fontSize: '0.8rem'
    },
    uniNameSmall: {
        color: '#334155',
        fontWeight: '500',
        fontSize: '0.85rem'
    },
    locationText: {
        color: '#64748B',
        display: 'flex',
        alignItems: 'center'
    },
    ratingBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        background: '#FEF3C7',
        color: '#D97706',
        padding: '6px 12px',
        borderRadius: '8px',
        fontSize: '0.85rem',
        fontWeight: '600'
    },

    // Program cell
    progName: {
        display: 'block',
        fontWeight: '600',
        color: '#0F172A',
        marginBottom: '4px'
    },
    progLevel: {
        display: 'flex',
        alignItems: 'center',
        color: '#94A3B8',
        fontSize: '0.8rem'
    },
    categoryBadge: {
        display: 'inline-block',
        background: '#DBEAFE',
        color: '#1D4ED8',
        padding: '6px 12px',
        borderRadius: '8px',
        fontSize: '0.8rem',
        fontWeight: '600'
    },
    feeText: {
        display: 'block',
        fontWeight: '600',
        color: '#0F172A'
    },
    feePeriod: {
        display: 'block',
        color: '#94A3B8',
        fontSize: '0.75rem'
    },

    // Buttons
    featuredToggle: {
        width: '36px',
        height: '36px',
        borderRadius: '8px',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '0.9rem',
        transition: 'all 0.2s ease'
    },
    statusToggle: {
        padding: '6px 12px',
        border: 'none',
        borderRadius: '8px',
        fontSize: '0.8rem',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.2s ease'
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
        fontSize: '0.9rem',
        transition: 'all 0.2s ease'
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
        fontSize: '0.9rem',
        transition: 'all 0.2s ease'
    },
    whatsappBtn: {
        width: '36px',
        height: '36px',
        borderRadius: '8px',
        background: '#D1FAE5',
        color: '#059669',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        fontSize: '1rem'
    },

    // Enquiry specific
    enquiryName: {
        fontWeight: '600',
        color: '#0F172A'
    },
    contactEmail: {
        display: 'flex',
        alignItems: 'center',
        color: '#3B82F6',
        textDecoration: 'none',
        fontSize: '0.85rem',
        marginBottom: '4px'
    },
    contactPhone: {
        display: 'flex',
        alignItems: 'center',
        color: '#64748B',
        textDecoration: 'none',
        fontSize: '0.85rem'
    },
    enquiryProgram: {
        color: '#334155',
        fontWeight: '500'
    },
    messagePreview: {
        color: '#64748B',
        fontSize: '0.85rem',
        maxWidth: '150px',
        display: 'block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    statusSelect: {
        padding: '8px 12px',
        borderRadius: '8px',
        border: 'none',
        fontSize: '0.8rem',
        fontWeight: '600',
        cursor: 'pointer',
        outline: 'none'
    },
    dateText: {
        display: 'block',
        fontWeight: '500'
    },
    timeText: {
        display: 'block',
        color: '#94A3B8',
        fontSize: '0.8rem'
    },
    statusBadge: {
        padding: '6px 12px',
        borderRadius: '8px',
        fontSize: '0.8rem',
        fontWeight: '600'
    },

    // Empty & No Results
    emptyState: {
        padding: '80px 20px',
        textAlign: 'center',
        color: '#64748B'
    },
    emptyIcon: {
        fontSize: '4rem',
        color: '#CBD5E1',
        marginBottom: '20px'
    },
    noResults: {
        padding: '60px 20px',
        textAlign: 'center',
        color: '#64748B'
    },
    noResultsIcon: {
        fontSize: '3rem',
        color: '#CBD5E1',
        marginBottom: '15px'
    },
    clearFiltersBtn: {
        marginTop: '15px',
        padding: '10px 24px',
        background: '#FF6B35',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '0.9rem',
        fontWeight: '600',
        cursor: 'pointer'
    },
    noData: {
        padding: '40px 20px',
        textAlign: 'center',
        color: '#94A3B8'
    },

    // Form Styles
    form: {
        padding: '25px'
    },
    formGroup: {
        marginBottom: '20px'
    },
    formRow: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginBottom: '20px'
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontWeight: '600',
        color: '#334155',
        fontSize: '0.9rem'
    },
    input: {
        width: '100%',
        padding: '12px 16px',
        borderRadius: '10px',
        border: '2px solid #E2E8F0',
        fontSize: '0.95rem',
        outline: 'none',
        transition: 'border-color 0.2s',
        boxSizing: 'border-box'
    },
    textarea: {
        width: '100%',
        padding: '12px 16px',
        borderRadius: '10px',
        border: '2px solid #E2E8F0',
        fontSize: '0.95rem',
        outline: 'none',
        transition: 'border-color 0.2s',
        fontFamily: 'inherit',
        resize: 'vertical',
        boxSizing: 'border-box'
    },
    helperText: {
        display: 'block',
        marginTop: '6px',
        color: '#94A3B8',
        fontSize: '0.8rem'
    },
    formActions: {
        marginTop: '30px',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    submitBtn: {
        padding: '12px 28px',
        background: 'linear-gradient(135deg, #FF6B35 0%, #FF8B5C 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: '10px',
        fontSize: '0.95rem',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)'
    }
};

export default Dashboard;

// ─── Course Finder Questions Tab ─────────────────────────────────────────────
const BLANK_OPT = { value: '', label: '', icon: 'fa-circle', categories: [], min: '', max: '' };
const BLANK_Q = { question: '', field: '', order: 0, isActive: true, options: [{ ...BLANK_OPT }] };

function CourseFinderQuestionsTab({ showToast, token }) {
    const [questions, setQuestions] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [modal, setModal] = React.useState(null);
    const [saving, setSaving] = React.useState(false);
    const [seeding, setSeeding] = React.useState(false);

    const h = () => ({ Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' });

    const load = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/course-finder-questions', { headers: h() });
            const data = await res.json();
            setQuestions(Array.isArray(data) ? data : []);
        } catch { showToast('Failed to load questions', 'error'); }
        finally { setLoading(false); }
    };

    React.useEffect(() => { load(); }, []);

    const seed = async () => {
        setSeeding(true);
        try {
            const res = await fetch('/api/admin/course-finder-questions/seed', { method: 'POST', headers: h() });
            const d = await res.json();
            showToast(d.message); load();
        } catch { showToast('Seed failed', 'error'); }
        finally { setSeeding(false); }
    };

    const save = async () => {
        const { data, mode } = modal;
        if (!data.question.trim() || !data.field.trim() || !data.options.length) {
            showToast('Question, field, and at least one option are required', 'error'); return;
        }
        setSaving(true);
        try {
            const url = mode === 'add' ? '/api/admin/course-finder-questions' : `/api/admin/course-finder-questions/${data._id}`;
            const cleanOptions = data.options.map(o => ({
                value: o.value, label: o.label, icon: o.icon || 'fa-circle',
                ...(o.categories?.length ? { categories: o.categories } : {}),
                ...(o.min !== '' && o.min !== undefined ? { min: Number(o.min) } : {}),
                ...(o.max !== '' && o.max !== undefined ? { max: Number(o.max) } : {}),
            }));
            const res = await fetch(url, { method: mode === 'add' ? 'POST' : 'PUT', headers: h(), body: JSON.stringify({ ...data, options: cleanOptions }) });
            if (!res.ok) { const d = await res.json(); throw new Error(d.message); }
            showToast(mode === 'add' ? 'Question added!' : 'Question updated!');
            setModal(null); load();
        } catch (err) { showToast(err.message || 'Save failed', 'error'); }
        finally { setSaving(false); }
    };

    const deleteQ = async (id, question) => {
        if (!confirm(`Delete: "${question}"?`)) return;
        try {
            await fetch(`/api/admin/course-finder-questions/${id}`, { method: 'DELETE', headers: h() });
            showToast('Deleted'); load();
        } catch { showToast('Delete failed', 'error'); }
    };

    const toggleActive = async (q) => {
        try {
            await fetch(`/api/admin/course-finder-questions/${q._id}`, { method: 'PUT', headers: h(), body: JSON.stringify({ isActive: !q.isActive }) });
            showToast('Status updated'); load();
        } catch { showToast('Failed', 'error'); }
    };

    const setField = (key, val) => setModal(m => ({ ...m, data: { ...m.data, [key]: val } }));
    const setOpt = (i, key, val) => setModal(m => { const opts = [...m.data.options]; opts[i] = { ...opts[i], [key]: val }; return { ...m, data: { ...m.data, options: opts } }; });
    const addOpt = () => setModal(m => ({ ...m, data: { ...m.data, options: [...m.data.options, { ...BLANK_OPT }] } }));
    const removeOpt = (i) => setModal(m => ({ ...m, data: { ...m.data, options: m.data.options.filter((_, idx) => idx !== i) } }));

    const cfCard = { background: '#fff', borderRadius: '16px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '15px' };
    const cfInput = { width: '100%', padding: '11px 14px', border: '2px solid #E2E8F0', borderRadius: '10px', fontSize: '0.95rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' };
    const cfBtn = (bg) => ({ padding: '10px 18px', background: bg, color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '8px' });
    const cfIconBtn = (color) => ({ width: '34px', height: '34px', background: color + '18', color, border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' });

    return (
        <div>
            {/* Header card */}
            <div style={cfCard}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px' }}>
                    <div>
                        <h2 style={{ margin: '0 0 6px', fontSize: '1.2rem', fontWeight: 700, color: '#0F172A' }}>
                            <i className="fa-solid fa-wand-magic-sparkles" style={{ color: '#FF6B35', marginRight: '10px' }}></i>
                            Course Finder Questions
                        </h2>
                        <p style={{ margin: 0, color: '#64748B', fontSize: '0.9rem' }}>
                            Users must submit an enquiry before accessing the quiz. Manage questions and options below.
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {questions.length === 0 && (
                            <button onClick={seed} disabled={seeding} style={cfBtn('#6366F1')}>
                                <i className="fa-solid fa-seedling"></i> {seeding ? 'Seeding...' : 'Seed Defaults'}
                            </button>
                        )}
                        <button onClick={() => setModal({ mode: 'add', data: { ...BLANK_Q, options: [{ ...BLANK_OPT }] } })} style={cfBtn('#FF6B35')}>
                            <i className="fa-solid fa-plus"></i> Add Question
                        </button>
                    </div>
                </div>
            </div>

            {/* Questions */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '60px', color: '#64748B' }}>
                    <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2rem', color: '#FF6B35' }}></i>
                    <p style={{ marginTop: '15px' }}>Loading...</p>
                </div>
            ) : questions.length === 0 ? (
                <div style={{ ...cfCard, textAlign: 'center', padding: '60px' }}>
                    <i className="fa-solid fa-circle-question" style={{ fontSize: '3rem', color: '#CBD5E1', display: 'block', marginBottom: '15px' }}></i>
                    <h3 style={{ color: '#334155', margin: '0 0 10px' }}>No questions yet</h3>
                    <p style={{ color: '#64748B' }}>Click "Seed Defaults" to add the standard 5-question quiz, or add your own.</p>
                </div>
            ) : questions.map((q, idx) => (
                <div key={q._id} style={{ ...cfCard, borderLeft: `4px solid ${q.isActive ? '#FF6B35' : '#CBD5E1'}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '15px', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                                <span style={{ background: '#FFF7ED', color: '#FF6B35', padding: '3px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>Q{idx + 1}</span>
                                <span style={{ background: '#F1F5F9', color: '#64748B', padding: '3px 10px', borderRadius: '20px', fontSize: '0.8rem' }}>field: {q.field}</span>
                                <span style={{ background: '#F1F5F9', color: '#64748B', padding: '3px 10px', borderRadius: '20px', fontSize: '0.8rem' }}>order: {q.order}</span>
                                <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, background: q.isActive ? '#DCFCE7' : '#FEE2E2', color: q.isActive ? '#16A34A' : '#DC2626' }}>{q.isActive ? 'Active' : 'Inactive'}</span>
                            </div>
                            <h3 style={{ margin: '0 0 12px', fontSize: '1.05rem', color: '#0F172A' }}>{q.question}</h3>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {q.options.map(o => (
                                    <span key={o.value} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '5px 12px', borderRadius: '8px', fontSize: '0.82rem', color: '#334155', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                        <i className={`fa-solid ${o.icon || 'fa-circle'}`} style={{ color: '#FF6B35', fontSize: '0.75rem' }}></i>
                                        {o.label}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                            <button onClick={() => toggleActive(q)} style={cfIconBtn(q.isActive ? '#D97706' : '#16A34A')} title={q.isActive ? 'Deactivate' : 'Activate'}>
                                <i className={`fa-solid ${q.isActive ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                            <button onClick={() => setModal({ mode: 'edit', data: JSON.parse(JSON.stringify(q)) })} style={cfIconBtn('#3B82F6')} title="Edit">
                                <i className="fa-solid fa-pen"></i>
                            </button>
                            <button onClick={() => deleteQ(q._id, q.question)} style={cfIconBtn('#DC2626')} title="Delete">
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Modal */}
            {modal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
                    <div style={{ background: '#fff', borderRadius: '20px', width: '100%', maxWidth: '680px', maxHeight: '90vh', overflow: 'auto', padding: '35px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                            <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700, color: '#0F172A' }}>
                                {modal.mode === 'add' ? 'Add New Question' : 'Edit Question'}
                            </h2>
                            <button onClick={() => setModal(null)} style={{ background: '#F1F5F9', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '1rem', color: '#64748B' }}>✕</button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', fontWeight: 600, color: '#334155', fontSize: '0.9rem', marginBottom: '6px' }}>Question Text *</label>
                                <input value={modal.data.question} onChange={e => setField('question', e.target.value)} placeholder="e.g. What is your highest education?" style={cfInput} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                                <div>
                                    <label style={{ display: 'block', fontWeight: 600, color: '#334155', fontSize: '0.9rem', marginBottom: '6px' }}>Field Name *</label>
                                    <input value={modal.data.field} onChange={e => setField('field', e.target.value)} placeholder="education" style={cfInput} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontWeight: 600, color: '#334155', fontSize: '0.9rem', marginBottom: '6px' }}>Order</label>
                                    <input type="number" value={modal.data.order} onChange={e => setField('order', Number(e.target.value))} style={cfInput} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontWeight: 600, color: '#334155', fontSize: '0.9rem', marginBottom: '6px' }}>Status</label>
                                    <select value={String(modal.data.isActive)} onChange={e => setField('isActive', e.target.value === 'true')} style={cfInput}>
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            {/* Options */}
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    <label style={{ fontWeight: 600, color: '#334155', fontSize: '0.9rem' }}>Options *</label>
                                    <button onClick={addOpt} style={{ ...cfBtn('#10B981'), padding: '6px 14px', fontSize: '0.82rem' }}>
                                        <i className="fa-solid fa-plus"></i> Add Option
                                    </button>
                                </div>
                                {modal.data.options.map((opt, i) => (
                                    <div key={i} style={{ background: '#F8FAFC', borderRadius: '12px', padding: '14px', marginBottom: '10px', border: '1px solid #E2E8F0' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                            <span style={{ fontWeight: 600, color: '#64748B', fontSize: '0.82rem' }}>Option {i + 1}</span>
                                            {modal.data.options.length > 1 && (
                                                <button onClick={() => removeOpt(i)} style={{ background: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: '6px', padding: '3px 10px', cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'inherit' }}>Remove</button>
                                            )}
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#64748B', marginBottom: '4px' }}>Value *</label>
                                                <input value={opt.value} onChange={e => setOpt(i, 'value', e.target.value)} placeholder="graduate" style={{ ...cfInput, padding: '8px 12px' }} />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#64748B', marginBottom: '4px' }}>Label *</label>
                                                <input value={opt.label} onChange={e => setOpt(i, 'label', e.target.value)} placeholder="Graduate (Bachelor's)" style={{ ...cfInput, padding: '8px 12px' }} />
                                            </div>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#64748B', marginBottom: '4px' }}>FA Icon</label>
                                                <input value={opt.icon} onChange={e => setOpt(i, 'icon', e.target.value)} placeholder="fa-graduation-cap" style={{ ...cfInput, padding: '8px 12px' }} />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#64748B', marginBottom: '4px' }}>Min Fee</label>
                                                <input type="number" value={opt.min ?? ''} onChange={e => setOpt(i, 'min', e.target.value)} placeholder="50000" style={{ ...cfInput, padding: '8px 12px' }} />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#64748B', marginBottom: '4px' }}>Max Fee</label>
                                                <input type="number" value={opt.max ?? ''} onChange={e => setOpt(i, 'max', e.target.value)} placeholder="100000" style={{ ...cfInput, padding: '8px 12px' }} />
                                            </div>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#64748B', marginBottom: '4px' }}>Categories (comma-separated)</label>
                                            <input value={Array.isArray(opt.categories) ? opt.categories.join(', ') : ''} onChange={e => setOpt(i, 'categories', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} placeholder="MBA, BBA" style={{ ...cfInput, padding: '8px 12px' }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '25px', paddingTop: '20px', borderTop: '1px solid #E2E8F0' }}>
                            <button onClick={() => setModal(null)} style={{ padding: '12px 24px', background: '#F1F5F9', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontFamily: 'inherit', color: '#64748B' }}>Cancel</button>
                            <button onClick={save} disabled={saving} style={{ ...cfBtn('#FF6B35'), padding: '12px 28px', opacity: saving ? 0.7 : 1 }}>
                                {saving ? <><i className="fa-solid fa-spinner fa-spin"></i> Saving...</> : <><i className="fa-solid fa-check"></i> {modal.mode === 'add' ? 'Add Question' : 'Save Changes'}</>}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
