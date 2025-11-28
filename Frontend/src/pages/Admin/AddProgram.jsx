import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../../components/Admin/AdminLayout';

const AddProgram = () => {
    const navigate = useNavigate();
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchingUni, setFetchingUni] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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
        brochureUrl: '',
        youtubeUrl: '',
        syllabus: '',
        highlights: '',
        careerOptions: '',
        specializations: '',
        featured: false,
        isActive: true
    });

    const API_BASE = "http://localhost:5000/api";

    // Options for dropdowns
    const categories = [
        'MBA', 'MCA', 'BBA', 'BCA', 'B.Com', 'M.Com', 
        'BA', 'MA', 'B.Sc', 'M.Sc', 'B.Tech', 'M.Tech', 
        'PhD', 'Diploma', 'Certificate', 'Other'
    ];
    
    const levels = [
        'Undergraduate', 
        'Postgraduate', 
        'Doctorate', 
        'Diploma', 
        'Certificate'
    ];
    
    const modes = ['Online', 'Offline', 'Hybrid', 'Distance'];
    
    const durations = [
        '6 Months', 
        '1 Year', 
        '18 Months', 
        '2 Years', 
        '3 Years', 
        '4 Years',
        '5 Years'
    ];
    
    const feePeriods = ['Total', 'Per Year', 'Per Semester', 'Per Month'];

    useEffect(() => {
        fetchUniversities();
    }, []);

    const fetchUniversities = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const res = await axios.get(`${API_BASE}/admin/universities`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUniversities(res.data);
        } catch (err) {
            console.error('Error fetching universities:', err);
            setError('Failed to load universities. Please refresh the page.');
        } finally {
            setFetchingUni(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        
        // Clear errors when user starts typing
        if (error) setError('');
        if (success) setSuccess('');
    };

    const validateForm = () => {
        if (!formData.universityId) {
            setError('Please select a university');
            return false;
        }
        if (!formData.name.trim()) {
            setError('Program name is required');
            return false;
        }
        if (formData.name.trim().length < 5) {
            setError('Program name must be at least 5 characters');
            return false;
        }
        if (!formData.category) {
            setError('Please select a category');
            return false;
        }
        if (!formData.level) {
            setError('Please select a level');
            return false;
        }
        if (!formData.duration) {
            setError('Please select duration');
            return false;
        }
        if (!formData.fee || Number(formData.fee) <= 0) {
            setError('Please enter a valid fee amount');
            return false;
        }
        if (!formData.description.trim()) {
            setError('Description is required');
            return false;
        }
        if (formData.description.trim().length < 50) {
            setError('Description must be at least 50 characters');
            return false;
        }
        
        // Validate YouTube URL if provided
        if (formData.youtubeUrl && !isValidYouTubeUrl(formData.youtubeUrl)) {
            setError('Please enter a valid YouTube URL');
            return false;
        }
        
        return true;
    };

    const isValidYouTubeUrl = (url) => {
        const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)[\w-]+/;
        return pattern.test(url);
    };

    const getYouTubeVideoId = (url) => {
        if (!url) return null;
        const match = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/);
        return match ? match[1] : null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            // Scroll to top to show error
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('adminToken');
            
            // Convert comma-separated strings to arrays
            const programData = {
                ...formData,
                name: formData.name.trim(),
                description: formData.description.trim(),
                eligibility: formData.eligibility.trim(),
                fee: Number(formData.fee),
                syllabus: formData.syllabus 
                    ? formData.syllabus.split(',').map(s => s.trim()).filter(s => s) 
                    : [],
                highlights: formData.highlights 
                    ? formData.highlights.split(',').map(s => s.trim()).filter(s => s) 
                    : [],
                careerOptions: formData.careerOptions 
                    ? formData.careerOptions.split(',').map(s => s.trim()).filter(s => s) 
                    : [],
                specializations: formData.specializations 
                    ? formData.specializations.split(',').map(s => s.trim()).filter(s => s) 
                    : []
            };

            await axios.post(`${API_BASE}/admin/programs`, programData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setSuccess('Program created successfully! Redirecting...');
            
            // Redirect after showing success message
            setTimeout(() => {
                navigate('/admin/programs');
            }, 1500);

        } catch (err) {
            console.error('Error creating program:', err);
            setError(err.response?.data?.message || 'Failed to create program. Please try again.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset the form? All entered data will be lost.')) {
            setFormData({
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
                brochureUrl: '',
                youtubeUrl: '',
                syllabus: '',
                highlights: '',
                careerOptions: '',
                specializations: '',
                featured: false,
                isActive: true
            });
            setError('');
            setSuccess('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <AdminLayout>
            <div style={styles.container}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <h1 style={styles.title}>
                            <i className="fa-solid fa-plus-circle" style={styles.titleIcon}></i>
                            Add New Program
                        </h1>
                        <p style={styles.subtitle}>Create a new educational program for students</p>
                    </div>
                    <button 
                        style={styles.backBtn}
                        onClick={() => navigate('/admin/programs')}
                    >
                        <i className="fa-solid fa-arrow-left"></i> Back to Programs
                    </button>
                </div>

                {/* Alert Messages */}
                {error && (
                    <div style={styles.errorAlert}>
                        <div style={styles.alertContent}>
                            <i className="fa-solid fa-exclamation-circle"></i>
                            <span>{error}</span>
                        </div>
                        <button style={styles.alertClose} onClick={() => setError('')}>
                            <i className="fa-solid fa-times"></i>
                        </button>
                    </div>
                )}

                {success && (
                    <div style={styles.successAlert}>
                        <div style={styles.alertContent}>
                            <i className="fa-solid fa-check-circle"></i>
                            <span>{success}</span>
                        </div>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} style={styles.form}>
                    
                    {/* Section 1: Basic Information */}
                    <div style={styles.section}>
                        <div style={styles.sectionHeader}>
                            <div style={styles.sectionIcon}>
                                <i className="fa-solid fa-info-circle"></i>
                            </div>
                            <div>
                                <h2 style={styles.sectionTitle}>Basic Information</h2>
                                <p style={styles.sectionDesc}>Enter the basic details of the program</p>
                            </div>
                        </div>
                        
                        <div style={styles.grid}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>
                                    University <span style={styles.required}>*</span>
                                </label>
                                <select
                                    name="universityId"
                                    value={formData.universityId}
                                    onChange={handleChange}
                                    style={styles.select}
                                    disabled={fetchingUni}
                                >
                                    <option value="">
                                        {fetchingUni ? 'Loading universities...' : 'Select University'}
                                    </option>
                                    {universities.map((uni) => (
                                        <option key={uni._id} value={uni._id}>
                                            {uni.name}
                                        </option>
                                    ))}
                                </select>
                                {universities.length === 0 && !fetchingUni && (
                                    <small style={styles.errorHint}>
                                        No universities found. Please add universities first.
                                    </small>
                                )}
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>
                                    Program Name <span style={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g., Master of Business Administration (MBA)"
                                    style={styles.input}
                                />
                                <small style={styles.hint}>
                                    {formData.name.length}/100 characters
                                </small>
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>
                                    Category <span style={styles.required}>*</span>
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    style={styles.select}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>
                                    Level <span style={styles.required}>*</span>
                                </label>
                                <select
                                    name="level"
                                    value={formData.level}
                                    onChange={handleChange}
                                    style={styles.select}
                                >
                                    <option value="">Select Level</option>
                                    {levels.map((level) => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>
                                    Duration <span style={styles.required}>*</span>
                                </label>
                                <select
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    style={styles.select}
                                >
                                    <option value="">Select Duration</option>
                                    {durations.map((dur) => (
                                        <option key={dur} value={dur}>{dur}</option>
                                    ))}
                                </select>
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>
                                    Mode <span style={styles.required}>*</span>
                                </label>
                                <select
                                    name="mode"
                                    value={formData.mode}
                                    onChange={handleChange}
                                    style={styles.select}
                                >
                                    {modes.map((mode) => (
                                        <option key={mode} value={mode}>{mode}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Fee Information */}
                    <div style={styles.section}>
                        <div style={styles.sectionHeader}>
                            <div style={styles.sectionIcon}>
                                <i className="fa-solid fa-indian-rupee-sign"></i>
                            </div>
                            <div>
                                <h2 style={styles.sectionTitle}>Fee Information</h2>
                                <p style={styles.sectionDesc}>Set the program fee structure</p>
                            </div>
                        </div>
                        
                        <div style={styles.grid}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>
                                    Fee Amount (₹) <span style={styles.required}>*</span>
                                </label>
                                <div style={styles.inputWithIcon}>
                                    <span style={styles.inputPrefix}>₹</span>
                                    <input
                                        type="number"
                                        name="fee"
                                        value={formData.fee}
                                        onChange={handleChange}
                                        placeholder="150000"
                                        style={{...styles.input, paddingLeft: '35px'}}
                                        min="0"
                                    />
                                </div>
                                {formData.fee && (
                                    <small style={styles.hint}>
                                        ₹{Number(formData.fee).toLocaleString('en-IN')}
                                    </small>
                                )}
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Fee Period</label>
                                <select
                                    name="feePeriod"
                                    value={formData.feePeriod}
                                    onChange={handleChange}
                                    style={styles.select}
                                >
                                    {feePeriods.map((period) => (
                                        <option key={period} value={period}>{period}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Description & Eligibility */}
                    <div style={styles.section}>
                        <div style={styles.sectionHeader}>
                            <div style={styles.sectionIcon}>
                                <i className="fa-solid fa-file-lines"></i>
                            </div>
                            <div>
                                <h2 style={styles.sectionTitle}>Description & Eligibility</h2>
                                <p style={styles.sectionDesc}>Provide detailed information about the program</p>
                            </div>
                        </div>
                        
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>
                                Description <span style={styles.required}>*</span>
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Provide a detailed description of the program, including key features, learning outcomes, and benefits..."
                                style={styles.textarea}
                                rows="6"
                            ></textarea>
                            <small style={{
                                ...styles.hint,
                                color: formData.description.length < 50 ? '#DC2626' : '#64748B'
                            }}>
                                {formData.description.length}/500 characters (minimum 50 required)
                            </small>
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Eligibility Criteria</label>
                            <textarea
                                name="eligibility"
                                value={formData.eligibility}
                                onChange={handleChange}
                                placeholder="e.g., Bachelor's degree in any discipline from a recognized university with minimum 50% marks"
                                style={styles.textarea}
                                rows="3"
                            ></textarea>
                        </div>
                    </div>

                    {/* Section 4: Media */}
                    <div style={styles.section}>
                        <div style={styles.sectionHeader}>
                            <div style={styles.sectionIcon}>
                                <i className="fa-solid fa-photo-video"></i>
                            </div>
                            <div>
                                <h2 style={styles.sectionTitle}>Media</h2>
                                <p style={styles.sectionDesc}>Add images, brochures, and videos</p>
                            </div>
                        </div>
                        
                        <div style={styles.grid}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>
                                    <i className="fa-solid fa-image" style={styles.labelIcon}></i>
                                    Program Image URL
                                </label>
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="https://example.com/program-image.jpg"
                                    style={styles.input}
                                />
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>
                                    <i className="fa-solid fa-file-pdf" style={styles.labelIcon}></i>
                                    Brochure URL
                                </label>
                                <input
                                    type="url"
                                    name="brochureUrl"
                                    value={formData.brochureUrl}
                                    onChange={handleChange}
                                    placeholder="https://example.com/brochure.pdf"
                                    style={styles.input}
                                />
                            </div>
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>
                                <i className="fa-brands fa-youtube" style={{...styles.labelIcon, color: '#FF0000'}}></i>
                                YouTube Video URL
                            </label>
                            <input
                                type="url"
                                name="youtubeUrl"
                                value={formData.youtubeUrl}
                                onChange={handleChange}
                                placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                                style={styles.input}
                            />
                            <small style={styles.hint}>
                                <i className="fa-solid fa-info-circle"></i>
                                This video will be displayed on the program detail page
                            </small>

                            {/* YouTube Preview */}
                            {formData.youtubeUrl && getYouTubeVideoId(formData.youtubeUrl) && (
                                <div style={styles.videoPreview}>
                                    <label style={styles.previewLabel}>Video Preview:</label>
                                    <div style={styles.videoContainer}>
                                        <iframe
                                            src={`https://www.youtube.com/embed/${getYouTubeVideoId(formData.youtubeUrl)}`}
                                            title="YouTube video preview"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            style={styles.videoIframe}
                                        ></iframe>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Section 5: Program Details */}
                    <div style={styles.section}>
                        <div style={styles.sectionHeader}>
                            <div style={styles.sectionIcon}>
                                <i className="fa-solid fa-list-check"></i>
                            </div>
                            <div>
                                <h2 style={styles.sectionTitle}>Program Details</h2>
                                <p style={styles.sectionDesc}>Add syllabus, highlights, career options, and specializations</p>
                            </div>
                        </div>
                        
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>
                                <i className="fa-solid fa-book" style={styles.labelIcon}></i>
                                Syllabus / Subjects
                            </label>
                            <textarea
                                name="syllabus"
                                value={formData.syllabus}
                                onChange={handleChange}
                                placeholder="Enter subjects separated by commas (e.g., Management Principles, Financial Accounting, Marketing Management, Human Resource Management)"
                                style={styles.textarea}
                                rows="3"
                            ></textarea>
                            <small style={styles.hint}>
                                Separate each subject with a comma. 
                                {formData.syllabus && ` (${formData.syllabus.split(',').filter(s => s.trim()).length} subjects)`}
                            </small>
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>
                                <i className="fa-solid fa-star" style={styles.labelIcon}></i>
                                Program Highlights
                            </label>
                            <textarea
                                name="highlights"
                                value={formData.highlights}
                                onChange={handleChange}
                                placeholder="Enter highlights separated by commas (e.g., Industry-Ready Curriculum, Placement Support, Live Projects, 24/7 Learning Access)"
                                style={styles.textarea}
                                rows="3"
                            ></textarea>
                            <small style={styles.hint}>
                                Separate each highlight with a comma.
                                {formData.highlights && ` (${formData.highlights.split(',').filter(s => s.trim()).length} highlights)`}
                            </small>
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>
                                <i className="fa-solid fa-briefcase" style={styles.labelIcon}></i>
                                Career Options
                            </label>
                            <textarea
                                name="careerOptions"
                                value={formData.careerOptions}
                                onChange={handleChange}
                                placeholder="Enter career options separated by commas (e.g., Business Analyst, Marketing Manager, Financial Analyst, Entrepreneur)"
                                style={styles.textarea}
                                rows="3"
                            ></textarea>
                            <small style={styles.hint}>
                                Separate each career option with a comma.
                                {formData.careerOptions && ` (${formData.careerOptions.split(',').filter(s => s.trim()).length} careers)`}
                            </small>
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>
                                <i className="fa-solid fa-layer-group" style={styles.labelIcon}></i>
                                Specializations Available
                            </label>
                            <textarea
                                name="specializations"
                                value={formData.specializations}
                                onChange={handleChange}
                                placeholder="Enter specializations separated by commas (e.g., Marketing, Finance, Human Resources, Operations, Business Analytics)"
                                style={styles.textarea}
                                rows="2"
                            ></textarea>
                            <small style={styles.hint}>
                                Separate each specialization with a comma.
                                {formData.specializations && ` (${formData.specializations.split(',').filter(s => s.trim()).length} specializations)`}
                            </small>
                        </div>
                    </div>

                    {/* Section 6: Settings */}
                    <div style={styles.section}>
                        <div style={styles.sectionHeader}>
                            <div style={styles.sectionIcon}>
                                <i className="fa-solid fa-cog"></i>
                            </div>
                            <div>
                                <h2 style={styles.sectionTitle}>Settings</h2>
                                <p style={styles.sectionDesc}>Configure visibility and featured status</p>
                            </div>
                        </div>
                        
                        <div style={styles.checkboxGroup}>
                            <label style={{
                                ...styles.checkboxLabel,
                                ...(formData.featured ? styles.checkboxLabelActive : {})
                            }}>
                                <input
                                    type="checkbox"
                                    name="featured"
                                    checked={formData.featured}
                                    onChange={handleChange}
                                    style={styles.checkbox}
                                />
                                <div style={styles.checkboxContent}>
                                    <div style={styles.checkboxIcon}>
                                        <i className={`fa-solid ${formData.featured ? 'fa-star' : 'fa-regular fa-star'}`}></i>
                                    </div>
                                    <div style={styles.checkboxText}>
                                        <strong>Featured Program</strong>
                                        <small>Display on homepage and featured sections</small>
                                    </div>
                                </div>
                            </label>

                            <label style={{
                                ...styles.checkboxLabel,
                                ...(formData.isActive ? styles.checkboxLabelActive : {})
                            }}>
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    checked={formData.isActive}
                                    onChange={handleChange}
                                    style={styles.checkbox}
                                />
                                <div style={styles.checkboxContent}>
                                    <div style={styles.checkboxIcon}>
                                        <i className={`fa-solid ${formData.isActive ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                                    </div>
                                    <div style={styles.checkboxText}>
                                        <strong>Active</strong>
                                        <small>Program is visible to students</small>
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div style={styles.actions}>
                        <button 
                            type="button" 
                            style={styles.resetBtn}
                            onClick={handleReset}
                        >
                            <i className="fa-solid fa-rotate-left"></i>
                            Reset Form
                        </button>
                        <div style={styles.actionRight}>
                            <button 
                                type="button" 
                                style={styles.cancelBtn}
                                onClick={() => navigate('/admin/programs')}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                style={{
                                    ...styles.submitBtn,
                                    opacity: loading ? 0.7 : 1,
                                    cursor: loading ? 'not-allowed' : 'pointer'
                                }}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <i className="fa-solid fa-spinner fa-spin"></i>
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <i className="fa-solid fa-plus"></i>
                                        Create Program
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

const styles = {
    container: {
        padding: '30px',
        maxWidth: '1000px',
        margin: '0 auto'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '30px',
        flexWrap: 'wrap',
        gap: '20px'
    },
    headerLeft: {},
    title: {
        color: '#0F172A',
        fontSize: '1.8rem',
        fontWeight: '700',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    titleIcon: {
        color: '#FF6B35'
    },
    subtitle: {
        color: '#64748B',
        fontSize: '0.95rem',
        margin: 0
    },
    backBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 24px',
        background: '#F1F5F9',
        color: '#334155',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '0.9rem',
        transition: 'all 0.2s ease'
    },
    
    // Alerts
    errorAlert: {
        background: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
        border: '1px solid #FCA5A5',
        color: '#DC2626',
        padding: '16px 20px',
        borderRadius: '12px',
        marginBottom: '25px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    successAlert: {
        background: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
        border: '1px solid #6EE7B7',
        color: '#059669',
        padding: '16px 20px',
        borderRadius: '12px',
        marginBottom: '25px'
    },
    alertContent: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '0.95rem',
        fontWeight: '500'
    },
    alertClose: {
        background: 'none',
        border: 'none',
        color: '#DC2626',
        cursor: 'pointer',
        fontSize: '1.1rem',
        padding: '5px'
    },
    
    // Form
    form: {
        background: '#fff',
        borderRadius: '20px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        overflow: 'hidden'
    },
    
    // Section
    section: {
        padding: '30px',
        borderBottom: '1px solid #E2E8F0'
    },
    sectionHeader: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '15px',
        marginBottom: '25px'
    },
    sectionIcon: {
        width: '45px',
        height: '45px',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #FF6B35 0%, #FF8B5C 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '1.1rem',
        flexShrink: 0
    },
    sectionTitle: {
        color: '#0F172A',
        fontSize: '1.15rem',
        fontWeight: '700',
        marginBottom: '4px'
    },
    sectionDesc: {
        color: '#64748B',
        fontSize: '0.9rem',
        margin: 0
    },
    
    // Grid & Inputs
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px'
    },
    inputGroup: {
        marginBottom: '20px'
    },
    label: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#334155',
        fontSize: '0.9rem',
        fontWeight: '600',
        marginBottom: '10px'
    },
    labelIcon: {
        color: '#64748B'
    },
    required: {
        color: '#DC2626'
    },
    input: {
        width: '100%',
        padding: '14px 16px',
        border: '2px solid #E2E8F0',
        borderRadius: '12px',
        fontSize: '0.95rem',
        boxSizing: 'border-box',
        transition: 'all 0.2s ease',
        outline: 'none'
    },
    inputWithIcon: {
        position: 'relative'
    },
    inputPrefix: {
        position: 'absolute',
        left: '16px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#64748B',
        fontWeight: '600'
    },
    select: {
        width: '100%',
        padding: '14px 16px',
        border: '2px solid #E2E8F0',
        borderRadius: '12px',
        fontSize: '0.95rem',
        boxSizing: 'border-box',
        cursor: 'pointer',
        background: '#fff',
        outline: 'none',
        transition: 'all 0.2s ease'
    },
    textarea: {
        width: '100%',
        padding: '14px 16px',
        border: '2px solid #E2E8F0',
        borderRadius: '12px',
        fontSize: '0.95rem',
        boxSizing: 'border-box',
        resize: 'vertical',
        fontFamily: 'inherit',
        outline: 'none',
        transition: 'all 0.2s ease',
        minHeight: '100px'
    },
    hint: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        color: '#64748B',
        fontSize: '0.8rem',
        marginTop: '8px'
    },
    errorHint: {
        color: '#DC2626',
        fontSize: '0.8rem',
        marginTop: '8px'
    },
    
    // Video Preview
    videoPreview: {
        marginTop: '15px',
        padding: '15px',
        background: '#F8FAFC',
        borderRadius: '12px'
    },
    previewLabel: {
        display: 'block',
        color: '#334155',
        fontSize: '0.85rem',
        fontWeight: '600',
        marginBottom: '10px'
    },
    videoContainer: {
        position: 'relative',
        paddingBottom: '56.25%',
        height: 0,
        overflow: 'hidden',
        borderRadius: '10px',
        background: '#000'
    },
    videoIframe: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none'
    },
    
    // Checkboxes
    checkboxGroup: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '15px'
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        cursor: 'pointer',
        padding: '20px',
        background: '#F8FAFC',
        borderRadius: '14px',
        transition: 'all 0.2s ease',
        border: '2px solid transparent'
    },
    checkboxLabelActive: {
        background: '#FFF7ED',
        borderColor: '#FF6B35'
    },
    checkbox: {
        display: 'none'
    },
    checkboxContent: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
    },
    checkboxIcon: {
        width: '45px',
        height: '45px',
        borderRadius: '12px',
        background: '#E2E8F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.1rem',
        color: '#64748B',
        transition: 'all 0.2s ease'
    },
    checkboxText: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    },
    
    // Actions
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '25px 30px',
        background: '#F8FAFC',
        flexWrap: 'wrap',
        gap: '15px'
    },
    actionRight: {
        display: 'flex',
        gap: '12px'
    },
    resetBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '14px 24px',
        background: '#fff',
        color: '#64748B',
        border: '2px solid #E2E8F0',
        borderRadius: '12px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '0.95rem',
        transition: 'all 0.2s ease'
    },
    cancelBtn: {
        padding: '14px 28px',
        background: '#fff',
        color: '#64748B',
        border: '2px solid #E2E8F0',
        borderRadius: '12px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '0.95rem',
        transition: 'all 0.2s ease'
    },
    submitBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '14px 32px',
        background: 'linear-gradient(135deg, #FF6B35 0%, #FF8B5C 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '0.95rem',
        boxShadow: '0 4px 15px rgba(255, 107, 53, 0.35)',
        transition: 'all 0.2s ease'
    }
};

// Responsive styles
if (typeof window !== 'undefined') {
    const updateResponsiveStyles = () => {
        if (window.innerWidth < 768) {
            styles.grid.gridTemplateColumns = '1fr';
            styles.checkboxGroup.gridTemplateColumns = '1fr';
            styles.actions.flexDirection = 'column';
            styles.actionRight.width = '100%';
            styles.actionRight.justifyContent = 'flex-end';
        }
    };
    updateResponsiveStyles();
    window.addEventListener('resize', updateResponsiveStyles);
}

export default AddProgram;