import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

const EditUniversity = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        shortName: '',
        logo: '',
        banner: '',
        description: '',
        establishedYear: '',
        location: '',
        address: '',
        website: '',
        email: '',
        phone: '',
        rating: '',
        accreditations: '',
        approvals: '',
        facilities: '',
        highlights: '',
        featured: false
    });

    const API_BASE = "http://localhost:5000/api";

    useEffect(() => {
        fetchUniversity();
    }, [id]);

    const fetchUniversity = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${API_BASE}/admin/universities/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const uni = res.data;
            setFormData({
                name: uni.name || '',
                shortName: uni.shortName || '',
                logo: uni.logo || '',
                banner: uni.banner || '',
                description: uni.description || '',
                establishedYear: uni.establishedYear || '',
                location: uni.location || '',
                address: uni.address || '',
                website: uni.website || '',
                email: uni.email || '',
                phone: uni.phone || '',
                rating: uni.rating || '',
                accreditations: uni.accreditations?.join(', ') || '',
                approvals: uni.approvals?.join(', ') || '',
                facilities: uni.facilities?.join(', ') || '',
                highlights: uni.highlights?.join(', ') || '',
                featured: uni.featured || false
            });
        } catch (err) {
            console.error('Error fetching university:', err);
            setError('Failed to load university');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSaving(true);

        try {
            const token = localStorage.getItem('token');
            
            const dataToSend = {
                ...formData,
                establishedYear: formData.establishedYear ? Number(formData.establishedYear) : null,
                accreditations: formData.accreditations ? formData.accreditations.split(',').map(s => s.trim()) : [],
                approvals: formData.approvals ? formData.approvals.split(',').map(s => s.trim()) : [],
                facilities: formData.facilities ? formData.facilities.split(',').map(s => s.trim()) : [],
                highlights: formData.highlights ? formData.highlights.split(',').map(s => s.trim()) : []
            };

            await axios.put(`${API_BASE}/admin/universities/${id}`, dataToSend, {
                headers: { Authorization: `Bearer ${token}` }
            });

            navigate('/admin/dashboard');
        } catch (err) {
            console.error('Error updating university:', err);
            setError(err.response?.data?.message || 'Failed to update university');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div style={styles.loadingScreen}>
                <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2rem', color: '#FF6B35' }}></i>
                <p>Loading university data...</p>
            </div>
        );
    }

    return (
        <div style={styles.wrapper}>
            {/* Header */}
            <div style={styles.header}>
                <div style={styles.headerContent}>
                    <Link to="/admin/dashboard" style={styles.backBtn}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </Link>
                    <div>
                        <h1 style={styles.title}>Edit University</h1>
                        <p style={styles.subtitle}>Update university information</p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div style={styles.container}>
                <form onSubmit={handleSubmit} style={styles.form}>
                    {error && (
                        <div style={styles.error}>
                            <i className="fa-solid fa-exclamation-circle"></i> {error}
                        </div>
                    )}

                    {/* Basic Info */}
                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>
                            <i className="fa-solid fa-info-circle"></i> Basic Information
                        </h2>
                        <div style={styles.grid}>
                            <div style={styles.field}>
                                <label style={styles.label}>University Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    style={styles.input}
                                    required
                                />
                            </div>
                            <div style={styles.field}>
                                <label style={styles.label}>Short Name</label>
                                <input
                                    type="text"
                                    name="shortName"
                                    value={formData.shortName}
                                    onChange={handleChange}
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.field}>
                                <label style={styles.label}>Location *</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    style={styles.input}
                                    required
                                />
                            </div>
                            <div style={styles.field}>
                                <label style={styles.label}>Established Year</label>
                                <input
                                    type="number"
                                    name="establishedYear"
                                    value={formData.establishedYear}
                                    onChange={handleChange}
                                    style={styles.input}
                                />
                            </div>
                        </div>
                        <div style={styles.field}>
                            <label style={styles.label}>Description *</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                style={styles.textarea}
                                rows="4"
                                required
                            />
                        </div>
                    </div>

                    {/* Media */}
                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>
                            <i className="fa-solid fa-image"></i> Media
                        </h2>
                        <div style={styles.grid}>
                            <div style={styles.field}>
                                <label style={styles.label}>Logo URL</label>
                                <input
                                    type="url"
                                    name="logo"
                                    value={formData.logo}
                                    onChange={handleChange}
                                    style={styles.input}
                                />
                                {formData.logo && (
                                    <img src={formData.logo} alt="Logo Preview" style={styles.preview} />
                                )}
                            </div>
                            <div style={styles.field}>
                                <label style={styles.label}>Banner URL</label>
                                <input
                                    type="url"
                                    name="banner"
                                    value={formData.banner}
                                    onChange={handleChange}
                                    style={styles.input}
                                />
                                {formData.banner && (
                                    <img src={formData.banner} alt="Banner Preview" style={{ ...styles.preview, height: '80px' }} />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>
                            <i className="fa-solid fa-address-book"></i> Contact Information
                        </h2>
                        <div style={styles.grid}>
                            <div style={styles.field}>
                                <label style={styles.label}>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.field}>
                                <label style={styles.label}>Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.field}>
                                <label style={styles.label}>Website</label>
                                <input
                                    type="url"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.field}>
                                <label style={styles.label}>Full Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    style={styles.input}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Accreditation */}
                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>
                            <i className="fa-solid fa-certificate"></i> Accreditation & Rating
                        </h2>
                        <div style={styles.grid}>
                            <div style={styles.field}>
                                <label style={styles.label}>NAAC Rating</label>
                                <select
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleChange}
                                    style={styles.select}
                                >
                                    <option value="">Select Rating</option>
                                    <option value="A++">A++</option>
                                    <option value="A+">A+</option>
                                    <option value="A">A</option>
                                    <option value="B++">B++</option>
                                    <option value="B+">B+</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="Not Rated">Not Rated</option>
                                </select>
                            </div>
                            <div style={styles.field}>
                                <label style={styles.label}>Accreditations (comma separated)</label>
                                <input
                                    type="text"
                                    name="accreditations"
                                    value={formData.accreditations}
                                    onChange={handleChange}
                                    style={styles.input}
                                />
                            </div>
                            <div style={{ ...styles.field, gridColumn: '1 / -1' }}>
                                <label style={styles.label}>Approvals (comma separated)</label>
                                <input
                                    type="text"
                                    name="approvals"
                                    value={formData.approvals}
                                    onChange={handleChange}
                                    style={styles.input}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>
                            <i className="fa-solid fa-list"></i> Additional Information
                        </h2>
                        <div style={styles.field}>
                            <label style={styles.label}>Highlights (comma separated)</label>
                            <textarea
                                name="highlights"
                                value={formData.highlights}
                                onChange={handleChange}
                                style={styles.textarea}
                                rows="2"
                            />
                        </div>
                        <div style={styles.field}>
                            <label style={styles.label}>Facilities (comma separated)</label>
                            <textarea
                                name="facilities"
                                value={formData.facilities}
                                onChange={handleChange}
                                style={styles.textarea}
                                rows="2"
                            />
                        </div>
                        <div style={styles.checkboxField}>
                            <input
                                type="checkbox"
                                name="featured"
                                checked={formData.featured}
                                onChange={handleChange}
                                style={styles.checkbox}
                                id="featured"
                            />
                            <label htmlFor="featured" style={styles.checkboxLabel}>
                                Mark as Featured University
                            </label>
                        </div>
                    </div>

                    {/* Actions */}
                    <div style={styles.actions}>
                        <Link to="/admin/dashboard" style={styles.cancelBtn}>
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            style={{ ...styles.submitBtn, opacity: saving ? 0.7 : 1 }}
                            disabled={saving}
                        >
                            {saving ? (
                                <>
                                    <i className="fa-solid fa-spinner fa-spin"></i> Saving...
                                </>
                            ) : (
                                <>
                                    <i className="fa-solid fa-save"></i> Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
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
        minHeight: '100vh',
        background: '#F8FAFC'
    },
    header: {
        background: '#0F172A',
        padding: '30px 40px'
    },
    headerContent: {
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
    },
    backBtn: {
        width: '45px',
        height: '45px',
        borderRadius: '12px',
        background: 'rgba(255,255,255,0.1)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        fontSize: '1.1rem'
    },
    title: {
        color: '#fff',
        fontSize: '1.5rem',
        fontWeight: '700',
        margin: 0
    },
    subtitle: {
        color: '#94A3B8',
        fontSize: '0.9rem',
        margin: 0
    },
    container: {
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '30px 40px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '30px'
    },
    error: {
        background: '#FEF2F2',
        color: '#DC2626',
        padding: '15px 20px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    section: {
        background: '#fff',
        padding: '30px',
        borderRadius: '16px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
    },
    sectionTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: '#0F172A',
        fontSize: '1.1rem',
        fontWeight: '600',
        marginBottom: '25px',
        paddingBottom: '15px',
        borderBottom: '1px solid #E2E8F0'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px'
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    label: {
        color: '#334155',
        fontSize: '0.9rem',
        fontWeight: '600'
    },
    input: {
        padding: '12px 16px',
        borderRadius: '10px',
        border: '2px solid #E2E8F0',
        fontSize: '0.95rem',
        width: '100%',
        boxSizing: 'border-box'
    },
    select: {
        padding: '12px 16px',
        borderRadius: '10px',
        border: '2px solid #E2E8F0',
        fontSize: '0.95rem',
        width: '100%',
        boxSizing: 'border-box',
        background: '#fff',
        cursor: 'pointer'
    },
    textarea: {
        padding: '12px 16px',
        borderRadius: '10px',
        border: '2px solid #E2E8F0',
        fontSize: '0.95rem',
        width: '100%',
        boxSizing: 'border-box',
        resize: 'vertical'
    },
    preview: {
        marginTop: '10px',
        height: '60px',
        objectFit: 'contain',
        borderRadius: '8px',
        background: '#F8FAFC'
    },
    checkboxField: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginTop: '15px'
    },
    checkbox: {
        width: '20px',
        height: '20px',
        cursor: 'pointer'
    },
    checkboxLabel: {
        color: '#334155',
        fontSize: '0.95rem',
        cursor: 'pointer'
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '15px',
        paddingTop: '20px'
    },
    cancelBtn: {
        padding: '14px 28px',
        background: '#F1F5F9',
        color: '#475569',
        borderRadius: '10px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '0.95rem'
    },
    submitBtn: {
        padding: '14px 28px',
        background: '#FF6B35',
        color: '#fff',
        border: 'none',
        borderRadius: '10px',
        fontWeight: '600',
        fontSize: '0.95rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    }
};

export default EditUniversity;