import React, { useState, useContext } from 'react';
import { DataContext } from '../../context/DataContext';

const UniForm = ({ onSuccess }) => {
    const { addUniversity } = useContext(DataContext);
    const [loading, setLoading] = useState(false);

    // Match the backend University schema exactly
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        logo: '',
        banner: '',
        location: '',
        rating: '',
        accreditations: [],
        description: '',
        minFee: '',
        maxFee: '',
        featured: false,
        isActive: true
    });

    // Generate slug from name automatically
    const generateSlug = (name) => {
        return name
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')    // Remove special characters
            .replace(/\s+/g, '-')         // Replace spaces with hyphens
            .replace(/-+/g, '-');         // Remove duplicate hyphens
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        } else if (name === 'name') {
            // Auto-generate slug when name changes
            setFormData({ 
                ...formData, 
                name: value,
                slug: generateSlug(value)
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleAccreditationChange = (e) => {
        const options = Array.from(e.target.selectedOptions, option => option.value);
        setFormData({ ...formData, accreditations: options });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validation
        if (!formData.name || !formData.slug || !formData.location) {
            alert("Please fill in all required fields (Name, Slug, Location).");
            setLoading(false);
            return;
        }

        try {
            // Prepare data - convert fee strings to numbers
            const dataToSubmit = {
                ...formData,
                minFee: formData.minFee ? Number(formData.minFee) : 0,
                maxFee: formData.maxFee ? Number(formData.maxFee) : 0
            };

            await addUniversity(dataToSubmit);
            
            // Reset form
            setFormData({
                name: '',
                slug: '',
                logo: '',
                banner: '',
                location: '',
                rating: '',
                accreditations: [],
                description: '',
                minFee: '',
                maxFee: '',
                featured: false,
                isActive: true
            });

            if (onSuccess) onSuccess();
        } catch (error) {
            console.error("Error adding university:", error);
            alert(error.response?.data?.message || "Failed to add university. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
            <h3 style={{ marginBottom: '25px', color: '#0F172A' }}>
                <i className="fa-solid fa-university" style={{ marginRight: '10px', color: '#FF6B35' }}></i>
                Add New University
            </h3>

            {/* === SECTION 1: Basic Info === */}
            <div style={styles.section}>
                <h4 style={styles.sectionTitle}>Basic Information</h4>
                
                <div style={styles.grid}>
                    <div style={styles.field}>
                        <label style={styles.label}>University Name *</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="e.g. Amity University Online"
                            required 
                            style={styles.input} 
                            onChange={handleChange}
                            value={formData.name}
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Slug (URL) *</label>
                        <input 
                            type="text" 
                            name="slug" 
                            placeholder="auto-generated-from-name"
                            required 
                            style={{...styles.input, backgroundColor: '#F8FAFC'}} 
                            onChange={handleChange}
                            value={formData.slug}
                        />
                        <small style={styles.hint}>URL: /university/{formData.slug || 'your-slug'}</small>
                    </div>
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Location *</label>
                    <input 
                        type="text" 
                        name="location" 
                        placeholder="e.g. Noida, Uttar Pradesh, India"
                        required 
                        style={styles.input} 
                        onChange={handleChange}
                        value={formData.location}
                    />
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Description</label>
                    <textarea 
                        name="description" 
                        rows="3"
                        placeholder="Brief description about the university, its history, and achievements..."
                        style={styles.input} 
                        onChange={handleChange}
                        value={formData.description}
                    />
                </div>
            </div>

            {/* === SECTION 2: Media === */}
            <div style={styles.section}>
                <h4 style={styles.sectionTitle}>Media & Images</h4>
                
                <div style={styles.grid}>
                    <div style={styles.field}>
                        <label style={styles.label}>Logo URL</label>
                        <input 
                            type="url" 
                            name="logo" 
                            placeholder="https://example.com/logo.png"
                            style={styles.input} 
                            onChange={handleChange}
                            value={formData.logo}
                        />
                        {formData.logo && (
                            <div style={styles.preview}>
                                <img 
                                    src={formData.logo} 
                                    alt="Logo Preview" 
                                    style={{ maxHeight: '60px', borderRadius: '4px' }}
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                            </div>
                        )}
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Banner URL</label>
                        <input 
                            type="url" 
                            name="banner" 
                            placeholder="https://example.com/banner.jpg"
                            style={styles.input} 
                            onChange={handleChange}
                            value={formData.banner}
                        />
                        {formData.banner && (
                            <div style={styles.preview}>
                                <img 
                                    src={formData.banner} 
                                    alt="Banner Preview" 
                                    style={{ maxHeight: '60px', borderRadius: '4px' }}
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* === SECTION 3: Ratings & Accreditations === */}
            <div style={styles.section}>
                <h4 style={styles.sectionTitle}>Ratings & Accreditations</h4>
                
                <div style={styles.grid}>
                    <div style={styles.field}>
                        <label style={styles.label}>Rating</label>
                        <select 
                            name="rating" 
                            style={styles.input} 
                            onChange={handleChange}
                            value={formData.rating}
                        >
                            <option value="">-- Select Rating --</option>
                            <option value="NAAC A++">NAAC A++</option>
                            <option value="NAAC A+">NAAC A+</option>
                            <option value="NAAC A">NAAC A</option>
                            <option value="NAAC B++">NAAC B++</option>
                            <option value="NAAC B+">NAAC B+</option>
                            <option value="4.5/5">4.5/5 Stars</option>
                            <option value="4/5">4/5 Stars</option>
                        </select>
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Accreditations</label>
                        <select 
                            multiple 
                            name="accreditations" 
                            style={{...styles.input, height: '120px'}} 
                            onChange={handleAccreditationChange}
                            value={formData.accreditations}
                        >
                            <option value="UGC">UGC Approved</option>
                            <option value="UGC-DEB">UGC-DEB</option>
                            <option value="AICTE">AICTE Approved</option>
                            <option value="NAAC">NAAC Accredited</option>
                            <option value="NIRF">NIRF Ranked</option>
                            <option value="WES">WES Recognized</option>
                            <option value="AIU">AIU Member</option>
                        </select>
                        <small style={styles.hint}>Hold Ctrl/Cmd to select multiple</small>
                    </div>
                </div>

                {formData.accreditations.length > 0 && (
                    <div style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {formData.accreditations.map((acc, idx) => (
                            <span key={idx} style={styles.tag}>{acc}</span>
                        ))}
                    </div>
                )}
            </div>

            {/* === SECTION 4: Fee Range === */}
            <div style={styles.section}>
                <h4 style={styles.sectionTitle}>Fee Range</h4>
                
                <div style={styles.grid}>
                    <div style={styles.field}>
                        <label style={styles.label}>Minimum Fee (₹)</label>
                        <input 
                            type="number" 
                            name="minFee" 
                            placeholder="e.g. 50000"
                            style={styles.input} 
                            onChange={handleChange}
                            value={formData.minFee}
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Maximum Fee (₹)</label>
                        <input 
                            type="number" 
                            name="maxFee" 
                            placeholder="e.g. 300000"
                            style={styles.input} 
                            onChange={handleChange}
                            value={formData.maxFee}
                        />
                    </div>
                </div>
            </div>

            {/* === SECTION 5: Settings === */}
            <div style={styles.section}>
                <h4 style={styles.sectionTitle}>Settings</h4>
                
                <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
                    <label style={styles.checkboxLabel}>
                        <input 
                            type="checkbox" 
                            name="featured" 
                            onChange={handleChange}
                            checked={formData.featured}
                            style={styles.checkbox}
                        />
                        <span>
                            <strong>Featured</strong>
                            <small style={{ display: 'block', color: '#64748B' }}>Show on homepage carousel</small>
                        </span>
                    </label>

                    <label style={styles.checkboxLabel}>
                        <input 
                            type="checkbox" 
                            name="isActive" 
                            onChange={handleChange}
                            checked={formData.isActive}
                            style={styles.checkbox}
                        />
                        <span>
                            <strong>Active</strong>
                            <small style={{ display: 'block', color: '#64748B' }}>Visible on website</small>
                        </span>
                    </label>
                </div>
            </div>

            {/* Submit Button */}
            <button 
                type="submit" 
                disabled={loading} 
                className="btn btn-primary" 
                style={{ 
                    width: '100%', 
                    marginTop: '20px',
                    padding: '14px',
                    fontSize: '1rem',
                    opacity: loading ? 0.7 : 1 
                }}
            >
                {loading ? (
                    <>
                        <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                        Saving University...
                    </>
                ) : (
                    <>
                        <i className="fa-solid fa-plus" style={{ marginRight: '8px' }}></i>
                        Add University
                    </>
                )}
            </button>
        </form>
    );
};

const styles = {
    section: {
        marginBottom: '30px',
        padding: '20px',
        background: '#F8FAFC',
        borderRadius: '12px'
    },
    sectionTitle: {
        margin: '0 0 20px 0',
        color: '#FF6B35',
        fontSize: '1rem',
        borderBottom: '2px solid #E2E8F0',
        paddingBottom: '10px'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px'
    },
    field: {
        marginBottom: '15px'
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        color: '#334155',
        fontWeight: '600',
        fontSize: '0.9rem'
    },
    input: {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #CBD5E1',
        fontSize: '1rem',
        transition: 'border-color 0.2s ease',
        boxSizing: 'border-box'
    },
    hint: {
        display: 'block',
        marginTop: '5px',
        fontSize: '0.8rem',
        color: '#94A3B8'
    },
    preview: {
        marginTop: '10px',
        padding: '10px',
        background: '#fff',
        borderRadius: '6px',
        border: '1px dashed #CBD5E1'
    },
    tag: {
        background: '#DBEAFE',
        color: '#1E40AF',
        padding: '4px 10px',
        borderRadius: '20px',
        fontSize: '0.8rem',
        fontWeight: '500'
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
        cursor: 'pointer'
    },
    checkbox: {
        width: '20px',
        height: '20px',
        cursor: 'pointer',
        marginTop: '2px'
    }
};

export default UniForm;