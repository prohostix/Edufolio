import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const AddProgram = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [universities, setUniversities] = useState([]);

    const [formData, setFormData] = useState({
        universityId: '',
        name: '',
        category: '',
        level: '',
        duration: '',
        mode: 'Online',
        fee: '',
        feePeriod: 'Total',
        description: '',
        eligibility: '',
        image: '',
        syllabus: '',
        highlights: '',
        careerOptions: '',
        specializations: '',
        featured: false
    });

    const API_BASE = "http://localhost:5000/api";

    const categories = ['MBA', 'MCA', 'BBA', 'BCA', 'B.Tech', 'M.Tech', 'B.Com', 'M.Com', 'BA', 'MA', 'B.Sc', 'M.Sc', 'PhD', 'Diploma', 'Certificate', 'Other'];
    const levels = ['Undergraduate', 'Postgraduate', 'Doctorate', 'Diploma', 'Certificate'];
    const modes = ['Online', 'Offline', 'Hybrid', 'Distance'];
    const feePeriods = ['Total', 'Per Year', 'Per Semester', 'Per Month'];

    useEffect(() => {
        fetchUniversities();
    }, []);

    const fetchUniversities = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${API_BASE}/admin/universities`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUniversities(res.data);
        } catch (err) {
            console.error('Error fetching universities:', err);
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
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            
            const dataToSend = {
                ...formData,
                fee: Number(formData.fee),
                syllabus: formData.syllabus ? formData.syllabus.split(',').map(s => s.trim()) : [],
                highlights: formData.highlights ? formData.highlights.split(',').map(s => s.trim()) : [],
                careerOptions: formData.careerOptions ? formData.careerOptions.split(',').map(s => s.trim()) : [],
                specializations: formData.specializations ? formData.specializations.split(',').map(s => s.trim()) : []
            };

            await axios.post(`${API_BASE}/admin/programs`, dataToSend, {
                headers: { Authorization: `Bearer ${token}` }
            });

            navigate('/admin/dashboard');
        } catch (err) {
            console.error('Error creating program:', err);
            setError(err.response?.data?.message || 'Failed to create program');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.wrapper}>
            {/* Header */}
            <div style={styles.header}>
                <div style={styles.headerContent}>
                    <Link to="/admin/dashboard" style={styles.backBtn}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </Link>
                    <div>
                        <h1 style={styles.title}>Add New Program</h1>
                        <p style={styles.subtitle}>Fill in the details to add a new program</p>
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
                            <div style={{ ...styles.field, gridColumn: '1 / -1' }}>
                                <label style={styles.label}>Select University *</label>
                                <select
                                    name="universityId"
                                    value={formData.universityId}
                                    onChange={handleChange}
                                    style={styles.select}
                                    required
                                >
                                    <option value="">Choose a university</option>
                                    {universities.map(uni => (
                                        <option key={uni._id} value={uni._id}>{uni.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div style={{ ...styles.field, gridColumn: '1 / -1' }}>
                                <label style={styles.label}>Program Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g., Master of Business Administration"
                                    style={styles.input}
                                    required
                                />
                            </div>
                            <div style={styles.field}>
                                <label style={styles.label}>Category *</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    style={styles.select}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div style={styles.field}>
                                <label style={styles.label}>Level *</label>
                                <select
                                    name="level"
                                    value={formData.level}
                                    onChange={handleChange}
                                    style={styles.select}
                                    required
                                >
                                    <option value="">Select Level</option>
                                    {levels.map(level => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                            </div>
                            <div style={styles.field}>
                                <label style={styles.label}>Duration *</label>
                                <input
                                    type="text"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    placeholder="e.g., 2 Years"
                                    style={styles.input}
                                    required
                                />
                            </div>
                            <div style={styles.field}>
                                <label style={styles.label}>Mode</label>
                                <select
                                    name="mode"
                                    value={formData.mode}
                                    onChange={handleChange}
                                    style={styles.select}
                                >
                                    {modes.map(mode => (
                                        <option key={mode} value={mode}>{mode}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div style={styles.field}>
                            <label style={styles.label}>Description *</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Write a detailed description about the program..."
                                style={styles.textarea}
                                rows="4"
                                required
                            />
                        </div>
                    </div>

                    {/* Fee & Eligibility */}
                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>
                            <i className="fa-solid fa-indian-rupee-sign"></i> Fee & Eligibility
                        </h2>
                        <div style={styles.grid}>
                            <div style={styles.field}>
                                <label style={styles.label}>Fee (₹) *</label>
                                <input
                                    type="number"
                                    name="fee"
                                    value={formData.fee}
                                    onChange={handleChange}
                                    placeholder="e.g., 150000"
                                    style={styles.input}
                                    required
                                />
                            </div>
                            <div style={styles.field}>
                                <label style={styles.label}>Fee Period</label>
                                <select
                                    name="feePeriod"
                                    value={formData.feePeriod}
                                    onChange={handleChange}
                                    style={styles.select}
                                >
                                    {feePeriods.map(period => (
                                        <option key={period} value={period}>{period}</option>
                                    ))}
                                </select>
                            </div>
                            <div style={{ ...styles.field, gridColumn: '1 / -1' }}>
                                <label style={styles.label}>Eligibility</label>
                                <input
                                    type="text"
                                    name="eligibility"
                                    value={formData.eligibility}
                                    onChange={handleChange}
                                    placeholder="e.g., Graduate in any discipline"
                                    style={styles.input}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Media */}
                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>
                            <i className="fa-solid fa-image"></i> Media
                        </h2>
                        <div style={styles.field}>
                            <label style={styles.label}>Program Image URL</label>
                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://example.com/program-image.jpg"
                                style={styles.input}
                            />
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
                                placeholder="Industry-aligned curriculum, Expert faculty, Placement support"
                                style={styles.textarea}
                                rows="2"
                            />
                        </div>
                        <div style={styles.field}>
                            <label style={styles.label}>Syllabus / Subjects (comma separated)</label>
                            <textarea
                                name="syllabus"
                                value={formData.syllabus}
                                onChange={handleChange}
                                placeholder="Marketing Management, Financial Accounting, Human Resource Management"
                                style={styles.textarea}
                                rows="2"
                            />
                        </div>
                        <div style={styles.field}>
                            <label style={styles.label}>Specializations (comma separated)</label>
                            <textarea
                                name="specializations"
                                value={formData.specializations}
                                onChange={handleChange}
                                placeholder="Finance, Marketing, HR, Operations"
                                style={styles.textarea}
                                rows="2"
                            />
                        </div>
                        <div style={styles.field}>
                            <label style={styles.label}>Career Options (comma separated)</label>
                            <textarea
                                name="careerOptions"
                                value={formData.careerOptions}
                                onChange={handleChange}
                                placeholder="Business Analyst, Marketing Manager, HR Manager, Consultant"
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
                                Mark as Featured Program
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
                            style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <i className="fa-solid fa-spinner fa-spin"></i> Creating...
                                </>
                            ) : (
                                <>
                                    <i className="fa-solid fa-plus"></i> Create Program
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

export default AddProgram;