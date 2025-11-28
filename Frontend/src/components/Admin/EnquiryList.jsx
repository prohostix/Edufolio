import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EnquiryList = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);

    const API_BASE = "http://localhost:5000/api";

    const statusColors = {
        'New': { bg: '#DBEAFE', color: '#1D4ED8' },
        'Contacted': { bg: '#FEF3C7', color: '#D97706' },
        'Interested': { bg: '#D1FAE5', color: '#059669' },
        'Converted': { bg: '#ECFDF5', color: '#047857' },
        'Closed': { bg: '#F3F4F6', color: '#6B7280' }
    };

    useEffect(() => {
        fetchEnquiries();
    }, [filter]);

    const fetchEnquiries = async () => {
        try {
            setLoading(true);
            const url = filter === 'all' 
                ? `${API_BASE}/admin/enquiries`
                : `${API_BASE}/admin/enquiries?status=${filter}`;
            const res = await axios.get(url);
            setEnquiries(res.data);
        } catch (error) {
            console.error("Error fetching enquiries:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await axios.put(`${API_BASE}/admin/enquiries/${id}`, { status: newStatus });
            setEnquiries(enquiries.map(enq => 
                enq._id === id ? { ...enq, status: newStatus } : enq
            ));
            if (selectedEnquiry?._id === id) {
                setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
            }
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status");
        }
    };

    const updateNotes = async (id, notes) => {
        try {
            await axios.put(`${API_BASE}/admin/enquiries/${id}`, { notes });
            setEnquiries(enquiries.map(enq => 
                enq._id === id ? { ...enq, notes } : enq
            ));
        } catch (error) {
            console.error("Error updating notes:", error);
        }
    };

    const deleteEnquiry = async (id) => {
        if (!window.confirm("Are you sure you want to delete this enquiry?")) return;
        
        try {
            await axios.delete(`${API_BASE}/admin/enquiries/${id}`);
            setEnquiries(enquiries.filter(enq => enq._id !== id));
            if (selectedEnquiry?._id === id) {
                setSelectedEnquiry(null);
            }
        } catch (error) {
            console.error("Error deleting enquiry:", error);
            alert("Failed to delete enquiry");
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '40px' }}>
                <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2rem', color: '#FF6B35' }}></i>
                <p>Loading enquiries...</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <h2 style={styles.title}>
                    <i className="fa-solid fa-inbox" style={{ marginRight: '10px', color: '#FF6B35' }}></i>
                    Enquiries
                    <span style={styles.count}>{enquiries.length}</span>
                </h2>

                {/* Filter Tabs */}
                <div style={styles.filters}>
                    {['all', 'New', 'Contacted', 'Interested', 'Converted', 'Closed'].map(status => (
                        <button 
                            key={status}
                            onClick={() => setFilter(status)}
                            style={{
                                ...styles.filterBtn,
                                ...(filter === status ? styles.filterBtnActive : {})
                            }}
                        >
                            {status === 'all' ? 'All' : status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div style={styles.content}>
                {/* Enquiry List */}
                <div style={styles.list}>
                    {enquiries.length === 0 ? (
                        <div style={styles.empty}>
                            <i className="fa-solid fa-inbox" style={{ fontSize: '3rem', color: '#CBD5E1' }}></i>
                            <p>No enquiries found</p>
                        </div>
                    ) : (
                        enquiries.map(enquiry => (
                            <div 
                                key={enquiry._id}
                                onClick={() => setSelectedEnquiry(enquiry)}
                                style={{
                                    ...styles.listItem,
                                    ...(selectedEnquiry?._id === enquiry._id ? styles.listItemActive : {})
                                }}
                            >
                                <div style={styles.listItemHeader}>
                                    <strong style={{ color: '#0F172A' }}>{enquiry.name}</strong>
                                    <span style={{
                                        ...styles.statusBadge,
                                        background: statusColors[enquiry.status]?.bg,
                                        color: statusColors[enquiry.status]?.color
                                    }}>
                                        {enquiry.status}
                                    </span>
                                </div>
                                <p style={styles.listItemEmail}>{enquiry.email}</p>
                                <p style={styles.listItemDate}>
                                    <i className="fa-regular fa-clock" style={{ marginRight: '5px' }}></i>
                                    {formatDate(enquiry.createdAt)}
                                </p>
                            </div>
                        ))
                    )}
                </div>

                {/* Detail Panel */}
                <div style={styles.detail}>
                    {selectedEnquiry ? (
                        <EnquiryDetail 
                            enquiry={selectedEnquiry}
                            statusColors={statusColors}
                            formatDate={formatDate}
                            onUpdateStatus={updateStatus}
                            onUpdateNotes={updateNotes}
                            onDelete={deleteEnquiry}
                            onClose={() => setSelectedEnquiry(null)}
                        />
                    ) : (
                        <div style={styles.noSelection}>
                            <i className="fa-solid fa-hand-pointer" style={{ fontSize: '3rem', color: '#CBD5E1' }}></i>
                            <p>Select an enquiry to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Detail Component
const EnquiryDetail = ({ enquiry, statusColors, formatDate, onUpdateStatus, onUpdateNotes, onDelete, onClose }) => {
    const [notes, setNotes] = useState(enquiry.notes || '');
    const [saving, setSaving] = useState(false);

    const handleSaveNotes = async () => {
        setSaving(true);
        await onUpdateNotes(enquiry._id, notes);
        setSaving(false);
    };

    return (
        <div style={{ padding: '20px' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                    <h3 style={{ margin: 0, color: '#0F172A' }}>{enquiry.name}</h3>
                    <p style={{ margin: '5px 0 0', color: '#64748B', fontSize: '0.9rem' }}>
                        {formatDate(enquiry.createdAt)}
                    </p>
                </div>
                <button onClick={onClose} style={detailStyles.closeBtn}>
                    <i className="fa-solid fa-times"></i>
                </button>
            </div>

            {/* Contact Info */}
            <div style={detailStyles.section}>
                <h4 style={detailStyles.sectionTitle}>Contact Information</h4>
                <div style={detailStyles.infoRow}>
                    <i className="fa-solid fa-envelope" style={detailStyles.icon}></i>
                    <a href={`mailto:${enquiry.email}`} style={detailStyles.link}>{enquiry.email}</a>
                </div>
                <div style={detailStyles.infoRow}>
                    <i className="fa-solid fa-phone" style={detailStyles.icon}></i>
                    <a href={`tel:${enquiry.phone}`} style={detailStyles.link}>{enquiry.phone}</a>
                </div>
            </div>

            {/* Program/University Info */}
            {(enquiry.programId || enquiry.universityId) && (
                <div style={detailStyles.section}>
                    <h4 style={detailStyles.sectionTitle}>Interested In</h4>
                    {enquiry.programId && (
                        <p style={{ margin: '5px 0' }}>
                            <strong>Program:</strong> {enquiry.programId.name || 'N/A'}
                        </p>
                    )}
                    {enquiry.universityId && (
                        <p style={{ margin: '5px 0' }}>
                            <strong>University:</strong> {enquiry.universityId.name || 'N/A'}
                        </p>
                    )}
                </div>
            )}

            {/* Message */}
            {enquiry.message && (
                <div style={detailStyles.section}>
                    <h4 style={detailStyles.sectionTitle}>Message</h4>
                    <p style={detailStyles.message}>{enquiry.message}</p>
                </div>
            )}

            {/* Status Update */}
            <div style={detailStyles.section}>
                <h4 style={detailStyles.sectionTitle}>Update Status</h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {['New', 'Contacted', 'Interested', 'Converted', 'Closed'].map(status => (
                        <button
                            key={status}
                            onClick={() => onUpdateStatus(enquiry._id, status)}
                            style={{
                                ...detailStyles.statusBtn,
                                background: enquiry.status === status ? statusColors[status]?.bg : '#F1F5F9',
                                color: enquiry.status === status ? statusColors[status]?.color : '#64748B',
                                fontWeight: enquiry.status === status ? '600' : '400'
                            }}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Notes */}
            <div style={detailStyles.section}>
                <h4 style={detailStyles.sectionTitle}>Internal Notes</h4>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add notes about this enquiry..."
                    style={detailStyles.notesInput}
                    rows="3"
                />
                <button 
                    onClick={handleSaveNotes}
                    disabled={saving}
                    style={detailStyles.saveNotesBtn}
                >
                    {saving ? 'Saving...' : 'Save Notes'}
                </button>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <a 
                    href={`mailto:${enquiry.email}`}
                    style={detailStyles.actionBtn}
                >
                    <i className="fa-solid fa-envelope"></i> Email
                </a>
                <a 
                    href={`tel:${enquiry.phone}`}
                    style={{ ...detailStyles.actionBtn, background: '#059669' }}
                >
                    <i className="fa-solid fa-phone"></i> Call
                </a>
                <button 
                    onClick={() => onDelete(enquiry._id)}
                    style={{ ...detailStyles.actionBtn, background: '#DC2626' }}
                >
                    <i className="fa-solid fa-trash"></i> Delete
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        background: '#fff',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    },
    header: {
        padding: '20px',
        borderBottom: '1px solid #E2E8F0'
    },
    title: {
        margin: '0 0 15px',
        color: '#0F172A',
        display: 'flex',
        alignItems: 'center'
    },
    count: {
        background: '#FF6B35',
        color: '#fff',
        padding: '2px 10px',
        borderRadius: '20px',
        fontSize: '0.9rem',
        marginLeft: '10px'
    },
    filters: {
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap'
    },
    filterBtn: {
        padding: '8px 16px',
        border: '1px solid #E2E8F0',
        borderRadius: '20px',
        background: '#fff',
        cursor: 'pointer',
        fontSize: '0.85rem',
        transition: 'all 0.2s ease'
    },
    filterBtnActive: {
        background: '#FF6B35',
        color: '#fff',
        borderColor: '#FF6B35'
    },
    content: {
        display: 'grid',
        gridTemplateColumns: '350px 1fr',
        minHeight: '500px'
    },
    list: {
        borderRight: '1px solid #E2E8F0',
        overflowY: 'auto',
        maxHeight: '600px'
    },
    listItem: {
        padding: '15px 20px',
        borderBottom: '1px solid #F1F5F9',
        cursor: 'pointer',
        transition: 'background 0.2s ease'
    },
    listItemActive: {
        background: '#FFF7ED',
        borderLeft: '3px solid #FF6B35'
    },
    listItemHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    listItemEmail: {
        margin: '5px 0',
        color: '#64748B',
        fontSize: '0.9rem'
    },
    listItemDate: {
        margin: 0,
        color: '#94A3B8',
        fontSize: '0.8rem'
    },
    statusBadge: {
        padding: '3px 10px',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: '600'
    },
    detail: {
        background: '#FAFAFA'
    },
    empty: {
        textAlign: 'center',
        padding: '60px 20px',
        color: '#94A3B8'
    },
    noSelection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: '#94A3B8'
    }
};

const detailStyles = {
    closeBtn: {
        background: 'none',
        border: 'none',
        fontSize: '1.2rem',
        color: '#94A3B8',
        cursor: 'pointer'
    },
    section: {
        marginBottom: '20px',
        padding: '15px',
        background: '#fff',
        borderRadius: '8px'
    },
    sectionTitle: {
        margin: '0 0 10px',
        color: '#64748B',
        fontSize: '0.85rem',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    infoRow: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '8px'
    },
    icon: {
        width: '20px',
        color: '#FF6B35',
        marginRight: '10px'
    },
    link: {
        color: '#0F172A',
        textDecoration: 'none'
    },
    message: {
        margin: 0,
        color: '#334155',
        lineHeight: '1.6',
        background: '#F8FAFC',
        padding: '10px',
        borderRadius: '6px'
    },
    statusBtn: {
        padding: '6px 12px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.85rem',
        transition: 'all 0.2s ease'
    },
    notesInput: {
        width: '100%',
        padding: '10px',
        border: '1px solid #E2E8F0',
        borderRadius: '6px',
        resize: 'vertical',
        fontSize: '0.9rem',
        boxSizing: 'border-box'
    },
    saveNotesBtn: {
        marginTop: '10px',
        padding: '8px 16px',
        background: '#0F172A',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.85rem'
    },
    actionBtn: {
        flex: 1,
        padding: '10px',
        background: '#3B82F6',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        textAlign: 'center',
        textDecoration: 'none',
        fontSize: '0.9rem'
    }
};

export default EnquiryList;