import React, { useState } from 'react';
import axios from 'axios'; 

const UniForm = ({ onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [uploadingImg, setUploadingImg] = useState(false);

    const [form, setForm] = useState({ 
        name: '', 
        slug: '', // Required for URL
        rating: '', 
        city: '',
        minFee: '',
        logo: '' // Stores the URL from the server
    });

    // 1. Handle File Selection -> Upload to Server immediately
    const handleFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadingImg(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            // Ensure this matches your backend route
            const res = await axios.post('http://localhost:5000/api/admin/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            // Save the returned URL to the form state
            setForm({ ...form, logo: res.data.url });
        } catch (err) {
            console.error("Image upload failed", err);
            alert("Image upload failed!");
        } finally {
            setUploadingImg(false);
        }
    };

    // 2. Handle Input Text Changes
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // 3. Submit the Final Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/admin/universities', form);
            setForm({ name: '', slug: '', rating: '', city: '', minFee: '', logo: '' }); // Reset
            if (onSuccess) onSuccess();
            alert("University Added Successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to save University.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginBottom: '20px', color: '#0F172A' }}>Add University</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <input 
                    name="name" 
                    placeholder="University Name" 
                    value={form.name} 
                    onChange={handleChange} 
                    style={styles.input} 
                />
                <input 
                    name="slug" 
                    placeholder="Slug (e.g. amity-online)" 
                    value={form.slug} 
                    onChange={handleChange} 
                    style={styles.input} 
                />
                <input 
                    name="rating" 
                    placeholder="Rating (e.g. NAAC A+)" 
                    value={form.rating} 
                    onChange={handleChange} 
                    style={styles.input} 
                />
                <input 
                    name="city" 
                    placeholder="City" 
                    value={form.city} 
                    onChange={handleChange} 
                    style={styles.input} 
                />
                <input 
                    name="minFee" 
                    type="number"
                    placeholder="Min Fee (₹)" 
                    value={form.minFee} 
                    onChange={handleChange} 
                    style={styles.input} 
                />
            </div>

            <div style={{ marginTop: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>University Logo</label>
                <input type="file" onChange={handleFile} accept="image/*" />
                
                {uploadingImg && <p style={{color: 'blue', fontSize: '0.8rem'}}>Uploading image...</p>}
                
                {form.logo && (
                    <div style={{ marginTop: '10px' }}>
                        <img src={form.logo} alt="Preview" style={{ height: '60px', borderRadius: '5px', border: '1px solid #ddd' }} />
                        <p style={{color: 'green', fontSize: '0.8rem'}}>Image Uploaded!</p>
                    </div>
                )}
            </div>

            <button 
                onClick={handleSubmit} 
                disabled={loading || uploadingImg}
                style={{ 
                    width: '100%', 
                    marginTop: '20px', 
                    padding: '12px', 
                    background: '#FF6B35', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '6px', 
                    cursor: 'pointer',
                    opacity: (loading || uploadingImg) ? 0.7 : 1
                }}
            >
                {loading ? 'Saving...' : 'Save University'}
            </button>
        </div>
    );
};

const styles = {
    input: {
        padding: '10px',
        borderRadius: '6px',
        border: '1px solid #CBD5E1',
        outline: 'none'
    }
};

export default UniForm;