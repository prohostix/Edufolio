import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Universities = () => {
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState({
        rating: '',
        featured: ''
    });

    const API_BASE = "http://localhost:5000/api";

    useEffect(() => {
        fetchUniversities();
    }, [filter]);

    const fetchUniversities = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            
            if (filter.rating) params.append('rating', filter.rating);
            if (filter.featured) params.append('featured', filter.featured);

            const res = await axios.get(`${API_BASE}/public/universities?${params.toString()}`);
            setUniversities(res.data);
        } catch (err) {
            console.error('Error fetching universities:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredUniversities = universities.filter(uni =>
        uni.name.toLowerCase().includes(search.toLowerCase()) ||
        uni.location?.toLowerCase().includes(search.toLowerCase())
    );

    const clearFilters = () => {
        setSearch('');
        setFilter({ rating: '', featured: '' });
    };

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <section style={styles.hero}>
                <div style={styles.heroOverlay}></div>
                <div style={styles.heroContent}>
                    <span style={styles.heroBadge}>
                        <i className="fa-solid fa-building-columns"></i> Our Partners
                    </span>
                    <h1 style={styles.heroTitle}>Partner Universities</h1>
                    <p style={styles.heroSubtitle}>
                        Explore our network of accredited universities offering quality online education
                    </p>
                </div>
            </section>

            {/* Search & Filter */}
            <section style={styles.filterSection}>
                <div style={styles.container}>
                    <div style={styles.searchForm}>
                        <div style={styles.searchBox}>
                            <i className="fa-solid fa-search" style={styles.searchIcon}></i>
                            <input
                                type="text"
                                placeholder="Search universities by name or location..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={styles.searchInput}
                            />
                            {search && (
                                <button 
                                    onClick={() => setSearch('')}
                                    style={styles.clearSearchBtn}
                                >
                                    <i className="fa-solid fa-times"></i>
                                </button>
                            )}
                        </div>
                    </div>

                    <div style={styles.filters}>
                        <div style={styles.filterLabel}>
                            <i className="fa-solid fa-filter"></i> Filter by:
                        </div>
                        <select
                            value={filter.rating}
                            onChange={(e) => setFilter({ ...filter, rating: e.target.value })}
                            style={styles.filterSelect}
                        >
                            <option value="">All Ratings</option>
                            <option value="A++">A++ Rating</option>
                            <option value="A+">A+ Rating</option>
                            <option value="A">A Rating</option>
                            <option value="B++">B++ Rating</option>
                            <option value="B+">B+ Rating</option>
                            <option value="B">B Rating</option>
                        </select>

                        <select
                            value={filter.featured}
                            onChange={(e) => setFilter({ ...filter, featured: e.target.value })}
                            style={styles.filterSelect}
                        >
                            <option value="">All Universities</option>
                            <option value="true">Featured Only</option>
                        </select>

                        {(filter.rating || filter.featured || search) && (
                            <button onClick={clearFilters} style={styles.clearBtn}>
                                <i className="fa-solid fa-times"></i> Clear All
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Universities Grid */}
            <section style={styles.mainSection}>
                <div style={styles.container}>
                    {loading ? (
                        <div style={styles.loading}>
                            <div style={styles.spinner}></div>
                            <p>Loading universities...</p>
                        </div>
                    ) : filteredUniversities.length > 0 ? (
                        <>
                            <div style={styles.resultsHeader}>
                                <p style={styles.resultCount}>
                                    <i className="fa-solid fa-building-columns"></i>
                                    Showing <strong>{filteredUniversities.length}</strong> universit{filteredUniversities.length !== 1 ? 'ies' : 'y'}
                                </p>
                                <div style={styles.sortOptions}>
                                    <span style={styles.sortLabel}>Sort by:</span>
                                    <select style={styles.sortSelect}>
                                        <option value="featured">Featured First</option>
                                        <option value="name">Name (A-Z)</option>
                                        <option value="rating">Rating</option>
                                    </select>
                                </div>
                            </div>

                            <div style={styles.grid}>
                                {filteredUniversities.map(university => (
                                    <Link
                                        key={university._id}
                                        to={`/universities/${university.slug}`}
                                        style={styles.card}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-8px)';
                                            e.currentTarget.style.boxShadow = '0 20px 40px rgba(30, 58, 95, 0.15)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                                        }}
                                    >
                                        {/* Featured Badge */}
                                        {university.featured && (
                                            <span style={styles.featuredBadge}>
                                                <i className="fa-solid fa-star"></i> Featured
                                            </span>
                                        )}
                                        
                                        {/* Banner Image */}
                                        <div style={styles.cardBanner}>
                                            <img
                                                src={university.banner || 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop'}
                                                alt={university.name}
                                                style={styles.bannerImg}
                                                onError={(e) => {
                                                    e.target.src = 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop';
                                                }}
                                            />
                                            <div style={styles.bannerOverlay}></div>
                                        </div>

                                        {/* Card Content */}
                                        <div style={styles.cardContent}>
                                            {/* Logo */}
                                            <div style={styles.logoWrapper}>
                                                <img
                                                    src={university.logo || 'https://via.placeholder.com/70x70?text=Logo'}
                                                    alt={university.name}
                                                    style={styles.logo}
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/70x70?text=Logo';
                                                    }}
                                                />
                                            </div>

                                            {/* University Name */}
                                            <h3 style={styles.cardTitle}>{university.name}</h3>
                                            
                                            {/* Short Name */}
                                            {university.shortName && (
                                                <p style={styles.shortName}>({university.shortName})</p>
                                            )}
                                            
                                            {/* Location */}
                                            <p style={styles.location}>
                                                <i className="fa-solid fa-location-dot"></i>
                                                {university.location || 'India'}
                                            </p>

                                            {/* Badges Row */}
                                            <div style={styles.cardMeta}>
                                                {university.rating && (
                                                    <span style={styles.ratingBadge}>
                                                        <i className="fa-solid fa-award"></i> NAAC {university.rating}
                                                    </span>
                                                )}
                                                {university.accreditations?.slice(0, 2).map((acc, i) => (
                                                    <span key={i} style={styles.accBadge}>{acc}</span>
                                                ))}
                                            </div>

                                            {/* Established Year */}
                                            {university.establishedYear && (
                                                <p style={styles.established}>
                                                    <i className="fa-solid fa-calendar"></i>
                                                    Est. {university.establishedYear}
                                                </p>
                                            )}

                                            {/* Fee Range */}
                                            <div style={styles.feeRange}>
                                                <div style={styles.feeInfo}>
                                                    <span style={styles.feeLabel}>Fee Range</span>
                                                    <span style={styles.feeValue}>
                                                        ₹{Number(university.minFee || 0).toLocaleString('en-IN')} - ₹{Number(university.maxFee || 0).toLocaleString('en-IN')}
                                                    </span>
                                                </div>
                                                <div style={styles.programCount}>
                                                    <i className="fa-solid fa-graduation-cap"></i>
                                                    <span>{university.programCount || '10+'} Programs</span>
                                                </div>
                                            </div>

                                            {/* View Button */}
                                            <div style={styles.viewBtn}>
                                                <span>View Details</span>
                                                <i className="fa-solid fa-arrow-right"></i>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div style={styles.emptyState}>
                            <div style={styles.emptyIconWrapper}>
                                <i className="fa-solid fa-building-columns" style={styles.emptyIcon}></i>
                            </div>
                            <h3 style={styles.emptyTitle}>No Universities Found</h3>
                            <p style={styles.emptyText}>
                                We couldn't find any universities matching your criteria. 
                                Try adjusting your search or filters.
                            </p>
                            <button onClick={clearFilters} style={styles.clearFiltersBtn}>
                                <i className="fa-solid fa-refresh"></i> Clear All Filters
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
                        <h2 style={styles.ctaTitle}>Can't find what you're looking for?</h2>
                        <p style={styles.ctaText}>
                            Our counselors can help you find the perfect university based on your requirements.
                        </p>
                        <Link to="/contact" style={styles.ctaBtn}>
                            <i className="fa-solid fa-phone"></i> Talk to a Counselor
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
        position: 'relative',
        overflow: 'hidden'
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
        marginBottom: '15px',
        lineHeight: 1.2
    },
    heroSubtitle: {
        color: colors.textLight,
        fontSize: '1.15rem',
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
        marginBottom: '20px'
    },
    searchBox: {
        position: 'relative',
        maxWidth: '500px'
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
        border: '2px solid #E2E8F0',
        fontSize: '1rem',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        outline: 'none'
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
        fontSize: '0.9rem',
        fontWeight: '600'
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
        fontWeight: '500',
        outline: 'none'
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
        gap: '8px',
        fontWeight: '600',
        transition: 'background 0.2s ease'
    },

    // Main Section
    mainSection: {
        padding: '50px 20px',
        background: colors.bgLight,
        minHeight: '60vh'
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
        fontSize: '0.95rem',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        margin: 0
    },
    sortOptions: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    sortLabel: {
        color: '#64748B',
        fontSize: '0.9rem'
    },
    sortSelect: {
        padding: '10px 15px',
        borderRadius: '8px',
        border: '1px solid #E2E8F0',
        fontSize: '0.9rem',
        cursor: 'pointer',
        background: '#fff',
        color: colors.primaryDark
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: '30px'
    },
    card: {
        background: '#fff',
        borderRadius: '20px',
        overflow: 'hidden',
        textDecoration: 'none',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #E2E8F0'
    },
    featuredBadge: {
        position: 'absolute',
        top: '15px',
        right: '15px',
        background: `linear-gradient(135deg, ${colors.primaryMaroon} 0%, ${colors.accentPink} 100%)`,
        color: '#fff',
        padding: '6px 14px',
        borderRadius: '20px',
        fontSize: '0.8rem',
        fontWeight: '600',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        boxShadow: '0 4px 10px rgba(139, 35, 70, 0.3)'
    },
    cardBanner: {
        height: '160px',
        overflow: 'hidden',
        position: 'relative'
    },
    bannerImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.3s ease'
    },
    bannerOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60px',
        background: `linear-gradient(to top, rgba(30, 58, 95, 0.4), transparent)`
    },
    cardContent: {
        padding: '25px',
        position: 'relative',
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    logoWrapper: {
        position: 'absolute',
        top: '-40px',
        left: '25px',
        width: '80px',
        height: '80px',
        background: '#fff',
        borderRadius: '16px',
        padding: '8px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `3px solid ${colors.bgLight}`
    },
    logo: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        borderRadius: '10px'
    },
    cardTitle: {
        marginTop: '45px',
        marginBottom: '5px',
        color: colors.primaryDark,
        fontSize: '1.25rem',
        fontWeight: '700',
        lineHeight: 1.3
    },
    shortName: {
        color: colors.accentBlue,
        fontSize: '0.9rem',
        margin: '0 0 10px 0',
        fontWeight: '500'
    },
    location: {
        color: '#64748B',
        fontSize: '0.9rem',
        marginBottom: '15px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
    },
    cardMeta: {
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        marginBottom: '15px'
    },
    ratingBadge: {
        background: '#FEF3C7',
        color: '#D97706',
        padding: '6px 12px',
        borderRadius: '8px',
        fontSize: '0.8rem',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
    },
    accBadge: {
        background: `${colors.accentBlue}15`,
        color: colors.accentBlue,
        padding: '6px 12px',
        borderRadius: '8px',
        fontSize: '0.8rem',
        fontWeight: '500'
    },
    established: {
        color: '#64748B',
        fontSize: '0.85rem',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        marginBottom: '15px'
    },
    feeRange: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px',
        background: colors.bgLight,
        borderRadius: '12px',
        marginBottom: '15px',
        marginTop: 'auto'
    },
    feeInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    },
    feeLabel: {
        color: '#64748B',
        fontSize: '0.8rem'
    },
    feeValue: {
        color: colors.primaryMaroon,
        fontWeight: '700',
        fontSize: '0.95rem'
    },
    programCount: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        color: colors.primaryDark,
        fontSize: '0.85rem',
        background: '#fff',
        padding: '8px 12px',
        borderRadius: '8px',
        fontWeight: '500'
    },
    viewBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '14px',
        background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.bgDark} 100%)`,
        color: '#fff',
        borderRadius: '12px',
        fontWeight: '600',
        fontSize: '0.95rem',
        transition: 'all 0.2s ease'
    },

    // Empty State
    emptyState: {
        textAlign: 'center',
        padding: '100px 20px',
        maxWidth: '500px',
        margin: '0 auto',
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
        fontSize: '2.5rem',
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
        lineHeight: 1.6,
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
        padding: '80px 20px',
        background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.bgDark} 100%)`
    },
    ctaContent: {
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto'
    },
    ctaIcon: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: `rgba(139, 35, 70, 0.2)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 25px',
        fontSize: '2rem',
        color: colors.accentPink
    },
    ctaTitle: {
        color: '#fff',
        fontSize: '2rem',
        fontWeight: '800',
        marginBottom: '15px'
    },
    ctaText: {
        color: colors.textLight,
        fontSize: '1.1rem',
        marginBottom: '30px',
        lineHeight: 1.6
    },
    ctaBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '16px 32px',
        background: `linear-gradient(135deg, ${colors.primaryMaroon} 0%, ${colors.accentPink} 100%)`,
        color: '#fff',
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '1rem',
        boxShadow: '0 4px 20px rgba(139, 35, 70, 0.4)',
        transition: 'transform 0.2s ease'
    }
};

// Add keyframes and responsive styles
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .search-input:focus {
            border-color: #8B2346 !important;
            box-shadow: 0 0 0 3px rgba(139, 35, 70, 0.1) !important;
        }
        
        .filter-select:focus {
            border-color: #8B2346 !important;
        }
        
        .university-card:hover .banner-img {
            transform: scale(1.05);
        }
        
        .view-btn:hover {
            background: linear-gradient(135deg, #8B2346 0%, #C4567A 100%) !important;
        }
        
        @media (max-width: 768px) {
            .hero-title { font-size: 2rem !important; }
            .grid { grid-template-columns: 1fr !important; }
            .results-header { flex-direction: column; align-items: flex-start; }
        }
    `;
    document.head.appendChild(styleSheet);
}

export default Universities;