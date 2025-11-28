import React, { useState } from 'react';
import { addProgram, uploadImage } from '../../services/api';

const ProgramForm = ({ onSuccess }) => {
    const [form, setForm] = useState({ name: '', category: 'Management', image: '' });

    const handleFile = async (e) => {
        const data = new FormData();
        data.append('file', e.target.files[0]);
        const res = await uploadImage(data);
        setForm({ ...form, image: res.data.url });
    };

    const handleSubmit = async () => {
        await addProgram(form);
        setForm({ name: '', category: 'Management', image: '' });
        onSuccess();
    };

    return (
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
            <h3>Add Program</h3>
            <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={{padding: '8px'}} />
                <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} style={{padding: '8px'}}>
                    <option>Management</option>
                    <option>IT</option>
                    <option>Data Science</option>
                </select>
                <input type="file" onChange={handleFile} />
                <button onClick={handleSubmit} style={{ padding: '10px', background: '#FF6B35', color: 'white', border: 'none' }}>Save Program</button>
            </div>
        </div>
    );
};
export default ProgramForm;