import React, { useState, useContext } from 'react';
import { DataContext } from '../../context/DataContext';

const ProgramForm = ({ onSuccess }) => {
    const { addProgram, universities } = useContext(DataContext); 
    
    const [formData, setFormData] = useState({
        universityId: '', 
        name: '', 
        category: '',      // Changed from 'department' to match backend
        fee: '', 
        duration: '', 
        level: 'Masters',
        description: '',
        image: ''          // Added image field
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // --- VALIDATION ---
        if (!formData.universityId) {
            alert("Please select a University first!");
            return;
        }
        if (!formData.name) {
            alert("Program Name is required!");
            return;
        }
        if (!formData.category) {
            alert("Please select a Category.");
            return;
        }

        setIsSubmitting(true);

        try {
            // Call the async addProgram from Context
            await addProgram(formData);
            
            // Reset form after successful submission
            setFormData({
                universityId: '', 
                name: '', 
                category: '',
                fee: '', 
                duration: '', 
                level: 'Masters',
                description: '',
                image: ''
            });

            if (onSuccess) onSuccess();
        } catch (error) {
            console.error("Error adding program:", error);
            alert("Failed to add program. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // If no universities exist, warn the user
    if (!universities || universities.length === 0) {
        return (
            <div style={{ padding: '20px', textAlign: 'center', color: '#EF4444' }}>
                <i className="fa-solid fa-circle-exclamation" style={{fontSize: '2rem', marginBottom: '10px'}}></i>
                <h4>No Universities Found!</h4>
                <p>Please add a University first before adding programs.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
            <h3 style={{ marginBottom: '20px', color: '#0F172A' }}>Add New Program</h3>

            {/* --- SELECT UNIVERSITY --- */}
            <div style={styles.field}>
                <label style={{fontWeight: 'bold', color: '#FF6B35'}}>Select University*</label>
                <select 
                    name="universityId" 
                    required 
                    style={styles.input} 
                    onChange={handleChange} 
                    value={formData.universityId}
                >
                    <option value="">-- Choose University --</option>
                    {universities.map((uni) => (
                        // Use _id for MongoDB
                        <option key={uni._id} value={uni._id}>
                            {uni.name}
                        </option>
                    ))}
                </select>
            </div>

            <div style={styles.grid}>
                <div style={styles.field}>
                    <label>Program Name*</label>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="e.g. MBA Online" 
                        required 
                        style={styles.input} 
                        onChange={handleChange}
                        value={formData.name}
                    />
                </div>
                <div style={styles.field}>
                    <label>Level</label>
                    <select name="level" style={styles.input} onChange={handleChange} value={formData.level}>
                        <option value="Masters">Masters (Post-Grad)</option>
                        <option value="Bachelors">Bachelors (Under-Grad)</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Certificate">Certificate</option>
                    </select>
                </div>
            </div>

            <div style={styles.grid}>
                <div style={styles.field}>
                    <label>Category*</label>
                    <select 
                        name="category" 
                        required 
                        style={styles.input} 
                        onChange={handleChange}
                        value={formData.category}
                    >
                        <option value="">-- Select --</option>
                        <option value="MBA">MBA</option>
                        <option value="MCA">MCA</option>
                        <option value="BBA">BBA</option>
                        <option value="BCA">BCA</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Arts">Arts & Humanities</option>
                        <option value="Commerce">Commerce</option>
                    </select>
                </div>
                <div style={styles.field}>
                    <label>Duration</label>
                    <input 
                        type="text" 
                        name="duration" 
                        placeholder="e.g. 2 Years" 
                        style={styles.input} 
                        onChange={handleChange}
                        value={formData.duration}
                    />
                </div>
            </div>

            <div style={styles.grid}>
                <div style={styles.field}>
                    <label>Total Fee (₹)</label>
                    <input 
                        type="number" 
                        name="fee" 
                        placeholder="e.g. 150000" 
                        style={styles.input} 
                        onChange={handleChange}
                        value={formData.fee}
                    />
                </div>
                <div style={styles.field}>
                    <label>Image URL</label>
                    <input 
                        type="text" 
                        name="image" 
                        placeholder="https://example.com/image.jpg" 
                        style={styles.input} 
                        onChange={handleChange}
                        value={formData.image}
                    />
                </div>
            </div>

            <div style={styles.field}>
                <label>Description / Highlights</label>
                <textarea 
                    name="description" 
                    rows="4" 
                    style={styles.input} 
                    onChange={handleChange}
                    value={formData.description}
                    placeholder="Enter program details, highlights, and key features..."
                ></textarea>
            </div>

            <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: '20px', opacity: isSubmitting ? 0.7 : 1 }}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Adding...' : 'Add Program'}
            </button>
        </form>
    );
};

const styles = {
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
    field: { marginBottom: '15px' },
    input: { 
        width: '100%', 
        padding: '10px', 
        borderRadius: '6px', 
        border: '1px solid #CBD5E1', 
        marginTop: '5px',
        fontSize: '1rem'
    }
};

export default ProgramForm;