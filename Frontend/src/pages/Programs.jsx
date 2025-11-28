import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Programs = () => {
    const [searchParams] = useSearchParams();
    const [programs, setPrograms] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState({
        category: searchParams.get('category') || '',
        level: ''
    });

    const API_BASE = "http://localhost:5000/api";

    useEffect(() => {
        fetchData();
    }, [filter]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            
            if (filter.category) params.append('category', filter.category);
            if (filter.level) params.append('level', filter.level);

            const [programsRes, categoriesRes] = await Promise.all([
                axios.get(`${API_BASE}/public/programs?${params.toString()}`),
                axios.get(`${API_BASE}/public/categories`)
            ]);

            setPrograms(programsRes.data);
            setCategories(categoriesRes.data);
        } catch (err) {
            console.error('Error fetching programs:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchData();
    };

    const filteredPrograms = programs.filter(prog =>
        prog.name.toLowerCase().includes(search.toLowerCase()) ||
        prog.category.toLowerCase().includes(search.toLowerCase())
    );

    const clearFilters = () => {
        setSearch('');
        setFilter({ category: '', level: '' });
    };

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <section style={styles.hero}>
                <div style={styles.heroOverlay}></div>
                <div style={styles.heroContent}>
                    <span style={styles.heroBadge}>
                        <i className="fa-solid fa-graduation-cap"></i>
                        200+ Programs Available
                    </span>
                    <h1 style={styles.heroTitle}>Explore Programs</h1>
                    <p style={styles.heroSubtitle}>
                        Find the perfect program to advance your career from our wide selection of UGC-approved courses
                    </p>
                </div>
            </section>

            {/* Search & Filter */}
            <section style={styles.filterSection}>
                <div style={styles.container}>
                    <form onSubmit={handleSearch} style={styles.searchForm}>
                        <div style={styles.searchBox}>
                            <i className="fa-solid fa-search" style={styles.searchIcon}></i>
                            <input
                                type="text"
                                placeholder="Search programs by name, category..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={styles.searchInput}
                            />
                            {search && (
                                <button 
                                    type="button"
                                    style={styles.clearSearchBtn}
                                    onClick={() => setSearch('')}
                                >
                                    <i className="fa-solid fa-times"></i>
                                </button>
                            )}
                        </div>
                        <button type="submit" style={styles.searchBtn}>
                            <i className="fa-solid fa-search"></i>
                            Search
                        </button>
                    </form>

                    <div style={styles.filters}>
                        <div style={styles.filterLabel}>
                            <i className="fa-solid fa-filter"></i>
                            Filters:
                        </div>
                        <select
                            value={filter.category}
                            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                            style={styles.filterSelect}
                        >
                            <option value="">All Categories</option>
                            {categories.map((cat, i) => (
                                <option key={i} value={cat}>{cat}</option>
                            ))}
                        </select>

                        <select
                            value={filter.level}
                            onChange={(e) => setFilter({ ...filter, level: e.target.value })}
                            style={styles.filterSelect}
                        >
                            <option value="">All Levels</option>
                            <option value="Undergraduate">Undergraduate</option>
                            <option value="Postgraduate">Postgraduate</option>
                            <option value="Doctorate">Doctorate</option>
                            <option value="Diploma">Diploma</option>
                            <option value="Certificate">Certificate</option>
                        </select>

                        {(filter.category || filter.level || search) && (
                            <button onClick={clearFilters} style={styles.clearBtn}>
                                <i className="fa-solid fa-times"></i> Clear All
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Programs Grid */}
            <section style={styles.mainSection}>
                <div style={styles.container}>
                    {loading ? (
                        <div style={styles.loading}>
                            <div style={styles.spinner}></div>
                            <p>Loading programs...</p>
                        </div>
                    ) : filteredPrograms.length > 0 ? (
                        <>
                            <div style={styles.resultsHeader}>
                                <p style={styles.resultCount}>
                                    Showing <strong>{filteredPrograms.length}</strong> program{filteredPrograms.length !== 1 ? 's' : ''}
                                </p>
                                {(filter.category || filter.level) && (
                                    <div style={styles.activeTags}>
                                        {filter.category && (
                                            <span style={styles.activeTag}>
                                                {filter.category}
                                                <button onClick={() => setFilter({...filter, category: ''})}>
                                                    <i className="fa-solid fa-times"></i>
                                                </button>
                                            </span>
                                        )}
                                        {filter.level && (
                                            <span style={styles.activeTag}>
                                                {filter.level}
                                                <button onClick={() => setFilter({...filter, level: ''})}>
                                                    <i className="fa-solid fa-times"></i>
                                                </button>
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div style={styles.grid}>
                                {filteredPrograms.map(program => (
                                    <Link
                                        key={program._id}
                                        to={`/programs/${program.slug}`}
                                        style={styles.card}
                                    >
                                        {program.featured && (
                                            <span style={styles.featuredBadge}>
                                                <i className="fa-solid fa-star"></i> Featured
                                            </span>
                                        )}
                                        
                                        <div style={styles.cardHeader}>
                                            <span style={styles.categoryTag}>{program.category}</span>
                                            <span style={styles.levelTag}>{program.level}</span>
                                        </div>

                                        <h3 style={styles.cardTitle}>{program.name}</h3>

                                        {program.universityId && (
                                            <div style={styles.uniInfo}>
                                                <img
                                                    src={program.universityId.logo || 'https://via.placeholder.com/30'}
                                                    alt={program.universityId.name}
                                                    style={styles.uniLogo}
                                                    onError={(e) => {
                                                        e.target.src = 'https://placehold.co/30x30?text=U';
                                                    }}
                                                />
                                                <span>{program.universityId.name}</span>
                                            </div>
                                        )}

                                        <div style={styles.cardMeta}>
                                            <div style={styles.metaItem}>
                                                <i className="fa-regular fa-clock"></i>
                                                <span>{program.duration}</span>
                                            </div>
                                            <div style={styles.metaItem}>
                                                <i className="fa-solid fa-laptop"></i>
                                                <span>{program.mode || 'Online'}</span>
                                            </div>
                                        </div>

                                        <div style={styles.cardFooter}>
                                            <div style={styles.fee}>
                                                <span style={styles.feeLabel}>Total Fee</span>
                                                <span style={styles.feeValue}>
                                                    ₹{Number(program.fee).toLocaleString('en-IN')}
                                                </span>
                                            </div>
                                            <span style={styles.viewLink}>
                                                View Details <i className="fa-solid fa-arrow-right"></i>
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div style={styles.emptyState}>
                            <div style={styles.emptyIconWrapper}>
                                <i className="fa-solid fa-graduation-cap" style={styles.emptyIcon}></i>
                            </div>
                            <h3 style={styles.emptyTitle}>No Programs Found</h3>
                            <p style={styles.emptyText}>Try adjusting your search or filters to find what you're looking for</p>
                            <button onClick={clearFilters} style={styles.clearFiltersBtn}>
                                <i className="fa-solid fa-refresh"></i>
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section style={styles.ctaSection}>
                <div style={styles.container}>
                    <div style={styles.ctaContent}>
                        <div style={styles.ctaIcon}>
                            <i className="fa-solid fa-headset"></i>
                        </div>
                        <div style={styles.ctaText}>
                            <h3 style={styles.ctaTitle}>Need Help Choosing?</h3>
                            <p style={styles.ctaDesc}>Our expert counselors can help you find the perfect program</p>
                        </div>
                        <Link to="/contact" style={styles.ctaBtn}>
                            <i className="fa-solid fa-phone"></i>
                            Get Free Counseling
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

// Edufolio Brand Colors
const colors = {
    primaryDark: '#1E3A5F',
    primaryMaroon: '#8B2346',
    accentBlue: '#4A90A4',
    accentPink: '#C4567A',
    textLight: '#A8C5E2',
    bgLight: '#F5F7FA',
    bgDark: '#152A45'
};

const styles = {
    // Hero Section
    hero: {
        background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.bgDark} 100%)`,
        padding: '120px 20px 60px',
        textAlign: 'center',
        position: 'relative'
    },
    heroOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    },
    heroContent: {
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
    },
    heroBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: `rgba(139, 35, 70, 0.3)`,
        color: colors.accentPink,
        padding: '10px 20px',
        borderRadius: '30px',
        fontSize: '0.9rem',
        fontWeight: '600',
        marginBottom: '20px'
    },
    heroTitle: {
        color: '#fff',
        fontSize: '2.8rem',
        fontWeight: '800',
        marginBottom: '15px'
    },
    heroSubtitle: {
        color: colors.textLight,
        fontSize: '1.1rem',
        margin: 0,
        lineHeight: 1.6
    },

    // Filter Section
    filterSection: {
        background: '#fff',
        padding: '25px 20px',
        borderBottom: '1px solid #E2E8F0',
        position: 'sticky',
        top: '70px',
        zIndex: 100,
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto'
    },
    searchForm: {
        display: 'flex',
        gap: '15px',
        marginBottom: '20px'
    },
    searchBox: {
        flex: 1,
        position: 'relative'
    },
    searchIcon: {
        position: 'absolute',
        left: '18px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#94A3B8',
        fontSize: '1rem'
    },
    searchInput: {
        width: '100%',
        padding: '16px 50px 16px 50px',
        borderRadius: '12px',
        border: `2px solid #E2E8F0`,
        fontSize: '1rem',
        boxSizing: 'border-box',
        outline: 'none',
        transition: 'border-color 0.2s ease'
    },
    clearSearchBtn: {
        position: 'absolute',
        right: '15px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: '#E2E8F0',
        border: 'none',
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#64748B',
        fontSize: '0.8rem'
    },
    searchBtn: {
        padding: '16px 30px',
        background: `linear-gradient(135deg, ${colors.primaryMaroon} 0%, ${colors.accentPink} 100%)`,
        color: '#fff',
        border: 'none',
        borderRadius: '12px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '1rem',
        boxShadow: '0 4px 15px rgba(139, 35, 70, 0.3)',
        transition: 'transform 0.2s ease'
    },
    filters: {
        display: 'flex',
        gap: '15px',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    filterLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: colors.primaryDark,
        fontWeight: '600',
        fontSize: '0.9rem'
    },
    filterSelect: {
        padding: '12px 20px',
        borderRadius: '10px',
        border: '2px solid #E2E8F0',
        fontSize: '0.9rem',
        cursor: 'pointer',
        minWidth: '160px',
        background: '#fff',
        color: colors.primaryDark,
        outline: 'none',
        transition: 'border-color 0.2s ease'
    },
    clearBtn: {
        padding: '12px 20px',
        background: '#FEE2E2',
        color: '#DC2626',
        border: 'none',
        borderRadius: '10px',
        fontSize: '0.9rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontWeight: '600',
        transition: 'background 0.2s ease'
    },

    // Main Section
    mainSection: {
        padding: '50px 20px',
        background: colors.bgLight,
        minHeight: '50vh'
    },
    loading: {
        textAlign: 'center',
        padding: '80px 20px',
        color: '#64748B'
    },
    spinner: {
        width: '50px',
        height: '50px',
        border: '4px solid #E2E8F0',
        borderTopColor: colors.primaryMaroon,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 20px'
    },
    resultsHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px',
        flexWrap: 'wrap',
        gap: '15px'
    },
    resultCount: {
        color: '#64748B',
        margin: 0,
        fontSize: '0.95rem'
    },
    activeTags: {
        display: 'flex',
        gap: '10px'
    },
    activeTag: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: `${colors.primaryMaroon}15`,
        color: colors.primaryMaroon,
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: '500'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '25px'
    },
    card: {
        background: '#fff',
        borderRadius: '20px',
        padding: '25px',
        textDecoration: 'none',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        border: '1px solid #E2E8F0',
        position: 'relative'
    },
    featuredBadge: {
        position: 'absolute',
        top: '15px',
        right: '15px',
        background: `linear-gradient(135deg, ${colors.primaryMaroon} 0%, ${colors.accentPink} 100%)`,
        color: '#fff',
        padding: '5px 12px',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
    },
    cardHeader: {
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap'
    },
    categoryTag: {
        background: `${colors.primaryMaroon}15`,
        color: colors.primaryMaroon,
        padding: '6px 14px',
        borderRadius: '20px',
        fontSize: '0.8rem',
        fontWeight: '600'
    },
    levelTag: {
        background: `${colors.accentBlue}15`,
        color: colors.accentBlue,
        padding: '6px 14px',
        borderRadius: '20px',
        fontSize: '0.8rem',
        fontWeight: '500'
    },
    cardTitle: {
        margin: 0,
        color: colors.primaryDark,
        fontSize: '1.2rem',
        fontWeight: '700',
        lineHeight: 1.3
    },
    uniInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: '#64748B',
        fontSize: '0.9rem'
    },
    uniLogo: {
        width: '32px',
        height: '32px',
        borderRadius: '8px',
        objectFit: 'contain',
        background: colors.bgLight,
        padding: '2px'
    },
    cardMeta: {
        display: 'flex',
        gap: '20px'
    },
    metaItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#64748B',
        fontSize: '0.9rem'
    },
    cardFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '15px',
        borderTop: '1px solid #E2E8F0',
        marginTop: 'auto'
    },
    fee: {
        display: 'flex',
        flexDirection: 'column'
    },
    feeLabel: {
        color: '#64748B',
        fontSize: '0.8rem',
        marginBottom: '2px'
    },
    feeValue: {
        color: colors.primaryMaroon,
        fontSize: '1.25rem',
        fontWeight: '700'
    },
    viewLink: {
        color: colors.accentBlue,
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '0.9rem'
    },

    // Empty State
    emptyState: {
        textAlign: 'center',
        padding: '80px 20px',
        background: '#fff',
        borderRadius: '20px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
    },
    emptyIconWrapper: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: colors.bgLight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 25px'
    },
    emptyIcon: {
        fontSize: '3rem',
        color: '#CBD5E1'
    },
    emptyTitle: {
        color: colors.primaryDark,
        fontSize: '1.5rem',
        fontWeight: '700',
        marginBottom: '10px'
    },
    emptyText: {
        color: '#64748B',
        fontSize: '1rem',
        marginBottom: '25px'
    },
    clearFiltersBtn: {
        padding: '14px 28px',
        background: `linear-gradient(135deg, ${colors.primaryMaroon} 0%, ${colors.accentPink} 100%)`,
        color: '#fff',
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '1rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0 4px 15px rgba(139, 35, 70, 0.3)'
    },

    // CTA Section
    ctaSection: {
        padding: '40px 20px',
        background: '#fff',
        borderTop: '1px solid #E2E8F0'
    },
    ctaContent: {
        background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.bgDark} 100%)`,
        borderRadius: '20px',
        padding: '30px 40px',
        display: 'flex',
        alignItems: 'center',
        gap: '25px',
        flexWrap: 'wrap'
    },
    ctaIcon: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: `rgba(139, 35, 70, 0.3)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.accentPink,
        fontSize: '1.5rem',
        flexShrink: 0
    },
    ctaText: {
        flex: 1
    },
    ctaTitle: {
        color: '#fff',
        fontSize: '1.3rem',
        fontWeight: '700',
        marginBottom: '5px'
    },
    ctaDesc: {
        color: colors.textLight,
        fontSize: '0.95rem',
        margin: 0
    },
    ctaBtn: {
        padding: '14px 28px',
        background: `linear-gradient(135deg, ${colors.primaryMaroon} 0%, ${colors.accentPink} 100%)`,
        color: '#fff',
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0 4px 15px rgba(139, 35, 70, 0.3)'
    }
};

// Add keyframes for spinner
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .program-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .search-input:focus {
            border-color: #8B2346 !important;
        }
        
        .filter-select:focus {
            border-color: #8B2346 !important;
        }
        
        .active-tag button {
            background: none;
            border: none;
            color: #8B2346;
            cursor: pointer;
            padding: 0;
            font-size: 0.75rem;
        }
        
        @media (max-width: 768px) {
            .search-form {
                flex-direction: column;
            }
            .cta-content {
                flex-direction: column;
                text-align: center;
            }
        }
    `;
    document.head.appendChild(styleSheet);
}

export default Programs;