import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CourseFinder = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({
        education: '',
        interest: '',
        goal: '',
        budget: '',
        mode: ''
    });
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const API_BASE = "http://localhost:5000/api";

    const questions = [
        {
            step: 1,
            question: "What is your highest education qualification?",
            field: 'education',
            options: [
                { value: '12th', label: '12th Pass / Higher Secondary', icon: 'fa-school' },
                { value: 'graduate', label: 'Graduate (Bachelor\'s Degree)', icon: 'fa-graduation-cap' },
                { value: 'postgraduate', label: 'Post Graduate (Master\'s)', icon: 'fa-user-graduate' },
                { value: 'working', label: 'Working Professional', icon: 'fa-briefcase' }
            ]
        },
        {
            step: 2,
            question: "Which field interests you the most?",
            field: 'interest',
            options: [
                { value: 'business', label: 'Business & Management', icon: 'fa-chart-line', categories: ['MBA', 'BBA'] },
                { value: 'technology', label: 'Technology & IT', icon: 'fa-laptop-code', categories: ['MCA', 'BCA'] },
                { value: 'commerce', label: 'Commerce & Finance', icon: 'fa-coins', categories: ['B.Com', 'M.Com', 'MBA'] },
                { value: 'arts', label: 'Arts & Humanities', icon: 'fa-palette', categories: ['BA', 'MA'] },
                { value: 'science', label: 'Science', icon: 'fa-flask', categories: ['B.Sc', 'M.Sc'] }
            ]
        },
        {
            step: 3,
            question: "What is your primary career goal?",
            field: 'goal',
            options: [
                { value: 'job', label: 'Get a Job / Career Switch', icon: 'fa-id-badge' },
                { value: 'promotion', label: 'Get Promotion / Salary Hike', icon: 'fa-arrow-up' },
                { value: 'business', label: 'Start Own Business', icon: 'fa-store' },
                { value: 'knowledge', label: 'Gain Knowledge & Skills', icon: 'fa-brain' }
            ]
        },
        {
            step: 4,
            question: "What is your preferred budget range?",
            field: 'budget',
            options: [
                { value: 'low', label: 'Under ₹50,000', icon: 'fa-wallet', max: 50000 },
                { value: 'medium', label: '₹50,000 - ₹1,00,000', icon: 'fa-money-bill', min: 50000, max: 100000 },
                { value: 'high', label: '₹1,00,000 - ₹2,00,000', icon: 'fa-money-bills', min: 100000, max: 200000 },
                { value: 'premium', label: 'Above ₹2,00,000', icon: 'fa-gem', min: 200000 }
            ]
        },
        {
            step: 5,
            question: "What is your preferred mode of learning?",
            field: 'mode',
            options: [
                { value: 'Online', label: 'Online (100% Remote)', icon: 'fa-laptop' },
                { value: 'Hybrid', label: 'Hybrid (Online + Campus)', icon: 'fa-building-user' },
                { value: 'Distance', label: 'Distance Learning', icon: 'fa-envelope-open-text' },
                { value: 'any', label: 'Any Mode is Fine', icon: 'fa-check-double' }
            ]
        }
    ];

    const handleOptionSelect = (field, value) => {
        setAnswers({ ...answers, [field]: value });
        
        if (step < questions.length) {
            setTimeout(() => setStep(step + 1), 300);
        }
    };

    const findCourses = async () => {
        setLoading(true);
        try {
            // Fetch all programs
            const res = await axios.get(`${API_BASE}/public/programs`);
            let programs = res.data;

            // Filter based on answers
            const interestOption = questions[1].options.find(o => o.value === answers.interest);
            const budgetOption = questions[3].options.find(o => o.value === answers.budget);

            // Filter by education level
            if (answers.education === '12th') {
                programs = programs.filter(p => p.level === 'Undergraduate');
            } else if (answers.education === 'graduate' || answers.education === 'working') {
                programs = programs.filter(p => ['Postgraduate', 'Undergraduate'].includes(p.level));
            }

            // Filter by interest/category
            if (interestOption?.categories) {
                programs = programs.filter(p => 
                    interestOption.categories.some(cat => 
                        p.category?.toLowerCase().includes(cat.toLowerCase()) ||
                        p.name?.toLowerCase().includes(cat.toLowerCase())
                    )
                );
            }

            // Filter by budget
            if (budgetOption) {
                programs = programs.filter(p => {
                    if (budgetOption.max && !budgetOption.min) {
                        return p.fee <= budgetOption.max;
                    } else if (budgetOption.min && budgetOption.max) {
                        return p.fee >= budgetOption.min && p.fee <= budgetOption.max;
                    } else if (budgetOption.min && !budgetOption.max) {
                        return p.fee >= budgetOption.min;
                    }
                    return true;
                });
            }

            // Filter by mode
            if (answers.mode !== 'any') {
                programs = programs.filter(p => p.mode === answers.mode);
            }

            // Sort by featured first
            programs.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

            setResults(programs.slice(0, 6));
            setShowResults(true);
        } catch (err) {
            console.error('Error finding courses:', err);
        } finally {
            setLoading(false);
        }
    };

    const resetFinder = () => {
        setStep(1);
        setAnswers({
            education: '',
            interest: '',
            goal: '',
            budget: '',
            mode: ''
        });
        setResults([]);
        setShowResults(false);
    };

    const currentQuestion = questions[step - 1];

    return (
        <>
            {/* Floating Button */}
            <button 
                style={styles.floatingBtn}
                onClick={() => setIsOpen(true)}
            >
                <i className="fa-solid fa-wand-magic-sparkles"></i>
                <span>Find My Course</span>
            </button>

            {/* Modal */}
            {isOpen && (
                <div style={styles.overlay} onClick={() => setIsOpen(false)}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <button style={styles.closeBtn} onClick={() => { setIsOpen(false); resetFinder(); }}>
                            <i className="fa-solid fa-times"></i>
                        </button>

                        {!showResults ? (
                            <>
                                {/* Header */}
                                <div style={styles.header}>
                                    <div style={styles.headerIcon}>
                                        <i className="fa-solid fa-compass"></i>
                                    </div>
                                    <h2 style={styles.title}>Find Your Perfect Course</h2>
                                    <p style={styles.subtitle}>
                                        Answer a few questions and we'll recommend the best programs for you
                                    </p>
                                </div>

                                {/* Progress Bar */}
                                <div style={styles.progressContainer}>
                                    <div style={styles.progressBar}>
                                        <div 
                                            style={{
                                                ...styles.progressFill,
                                                width: `${(step / questions.length) * 100}%`
                                            }}
                                        ></div>
                                    </div>
                                    <span style={styles.progressText}>
                                        Step {step} of {questions.length}
                                    </span>
                                </div>

                                {/* Question */}
                                <div style={styles.questionContainer}>
                                    <h3 style={styles.question}>{currentQuestion.question}</h3>
                                    
                                    <div style={styles.optionsGrid}>
                                        {currentQuestion.options.map((option) => (
                                            <button
                                                key={option.value}
                                                style={{
                                                    ...styles.optionBtn,
                                                    ...(answers[currentQuestion.field] === option.value ? styles.optionBtnSelected : {})
                                                }}
                                                onClick={() => handleOptionSelect(currentQuestion.field, option.value)}
                                            >
                                                <i className={`fa-solid ${option.icon}`} style={styles.optionIcon}></i>
                                                <span>{option.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Navigation */}
                                <div style={styles.navigation}>
                                    {step > 1 && (
                                        <button 
                                            style={styles.backBtn}
                                            onClick={() => setStep(step - 1)}
                                        >
                                            <i className="fa-solid fa-arrow-left"></i> Back
                                        </button>
                                    )}
                                    
                                    {step === questions.length && answers[currentQuestion.field] && (
                                        <button 
                                            style={styles.findBtn}
                                            onClick={findCourses}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <i className="fa-solid fa-spinner fa-spin"></i> Finding...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fa-solid fa-search"></i> Find Courses
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Results Header */}
                                <div style={styles.resultsHeader}>
                                    <div style={styles.resultsIcon}>
                                        <i className="fa-solid fa-sparkles"></i>
                                    </div>
                                    <h2 style={styles.resultsTitle}>
                                        {results.length > 0 ? 'Recommended Courses For You!' : 'No Exact Matches Found'}
                                    </h2>
                                    <p style={styles.resultsSubtitle}>
                                        {results.length > 0 
                                            ? `We found ${results.length} courses matching your preferences`
                                            : 'Try adjusting your preferences to see more options'
                                        }
                                    </p>
                                </div>

                                {/* Results List */}
                                <div style={styles.resultsList}>
                                    {results.length > 0 ? (
                                        results.map((program) => (
                                            <Link
                                                key={program._id}
                                                to={`/programs/${program.slug}`}
                                                style={styles.resultCard}
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <div style={styles.resultInfo}>
                                                    <h4 style={styles.resultName}>{program.name}</h4>
                                                    <p style={styles.resultUniversity}>
                                                        <i className="fa-solid fa-building-columns"></i>
                                                        {program.universityId?.name || 'University'}
                                                    </p>
                                                    <div style={styles.resultMeta}>
                                                        <span style={styles.resultBadge}>
                                                            <i className="fa-solid fa-clock"></i> {program.duration}
                                                        </span>
                                                        <span style={styles.resultBadge}>
                                                            <i className="fa-solid fa-laptop"></i> {program.mode}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div style={styles.resultPrice}>
                                                    <span style={styles.priceLabel}>Fee</span>
                                                    <span style={styles.priceValue}>
                                                        ₹{Number(program.fee).toLocaleString('en-IN')}
                                                    </span>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <div style={styles.noResults}>
                                            <i className="fa-solid fa-face-sad-tear" style={styles.noResultsIcon}></i>
                                            <p>No programs match your exact criteria.</p>
                                            <Link 
                                                to="/programs" 
                                                style={styles.browseAllBtn}
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Browse All Programs
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div style={styles.resultsActions}>
                                    <button style={styles.restartBtn} onClick={resetFinder}>
                                        <i className="fa-solid fa-redo"></i> Start Over
                                    </button>
                                    <Link 
                                        to="/programs" 
                                        style={styles.viewAllBtn}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        View All Programs <i className="fa-solid fa-arrow-right"></i>
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

const styles = {
    floatingBtn: {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        background: 'linear-gradient(135deg, #FF6B35 0%, #FF8B5C 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: '50px',
        padding: '18px 28px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0 8px 30px rgba(255, 107, 53, 0.4)',
        zIndex: 1000,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '20px',
        backdropFilter: 'blur(5px)'
    },
    modal: {
        background: '#fff',
        borderRadius: '24px',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative'
    },
    closeBtn: {
        position: 'absolute',
        top: '15px',
        right: '15px',
        background: 'rgba(255,255,255,0.2)',
        border: 'none',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.1rem',
        color: '#fff',
        zIndex: 1
    },
    header: {
        textAlign: 'center',
        padding: '40px 30px 30px',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        borderRadius: '24px 24px 0 0'
    },
    headerIcon: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #FF6B35 0%, #FF8B5C 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
        fontSize: '2rem',
        color: '#fff'
    },
    title: {
        color: '#fff',
        fontSize: '1.8rem',
        fontWeight: '700',
        margin: '0 0 10px'
    },
    subtitle: {
        color: '#94A3B8',
        fontSize: '1rem',
        margin: 0
    },
    progressContainer: {
        padding: '20px 30px',
        borderBottom: '1px solid #E2E8F0'
    },
    progressBar: {
        height: '8px',
        background: '#E2E8F0',
        borderRadius: '4px',
        overflow: 'hidden',
        marginBottom: '10px'
    },
    progressFill: {
        height: '100%',
        background: 'linear-gradient(135deg, #FF6B35 0%, #FF8B5C 100%)',
        borderRadius: '4px',
        transition: 'width 0.3s ease'
    },
    progressText: {
        color: '#64748B',
        fontSize: '0.85rem'
    },
    questionContainer: {
        padding: '30px'
    },
    question: {
        color: '#0F172A',
        fontSize: '1.3rem',
        fontWeight: '600',
        marginBottom: '25px',
        textAlign: 'center'
    },
    optionsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px'
    },
    optionBtn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        padding: '20px 15px',
        background: '#F8FAFC',
        border: '2px solid #E2E8F0',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textAlign: 'center',
        fontSize: '0.9rem',
        color: '#334155',
        fontWeight: '500'
    },
    optionBtnSelected: {
        background: '#FFF7ED',
        borderColor: '#FF6B35',
        color: '#FF6B35'
    },
    optionIcon: {
        fontSize: '1.5rem'
    },
    navigation: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 30px 30px',
        gap: '15px'
    },
    backBtn: {
        padding: '12px 24px',
        background: '#F1F5F9',
        color: '#64748B',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontWeight: '600',
        fontSize: '0.95rem'
    },
    findBtn: {
        padding: '14px 30px',
        background: 'linear-gradient(135deg, #FF6B35 0%, #FF8B5C 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontWeight: '600',
        fontSize: '1rem',
        marginLeft: 'auto'
    },
    resultsHeader: {
        textAlign: 'center',
        padding: '40px 30px 20px',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        borderRadius: '24px 24px 0 0'
    },
    resultsIcon: {
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
        fontSize: '1.8rem',
        color: '#fff'
    },
    resultsTitle: {
        color: '#fff',
        fontSize: '1.5rem',
        fontWeight: '700',
        margin: '0 0 10px'
    },
    resultsSubtitle: {
        color: '#94A3B8',
        fontSize: '0.95rem',
        margin: 0
    },
    resultsList: {
        padding: '20px',
        maxHeight: '350px',
        overflow: 'auto'
    },
    resultCard: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '18px',
        background: '#F8FAFC',
        borderRadius: '12px',
        marginBottom: '12px',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        border: '2px solid transparent'
    },
    resultInfo: {
        flex: 1
    },
    resultName: {
        color: '#0F172A',
        fontSize: '1.05rem',
        fontWeight: '600',
        marginBottom: '5px'
    },
    resultUniversity: {
        color: '#64748B',
        fontSize: '0.85rem',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
    },
    resultMeta: {
        display: 'flex',
        gap: '10px'
    },
    resultBadge: {
        background: '#E2E8F0',
        color: '#64748B',
        padding: '4px 10px',
        borderRadius: '6px',
        fontSize: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
    },
    resultPrice: {
        textAlign: 'right'
    },
    priceLabel: {
        display: 'block',
        color: '#64748B',
        fontSize: '0.8rem',
        marginBottom: '4px'
    },
    priceValue: {
        color: '#059669',
        fontSize: '1.1rem',
        fontWeight: '700'
    },
    noResults: {
        textAlign: 'center',
        padding: '40px 20px',
        color: '#64748B'
    },
    noResultsIcon: {
        fontSize: '3rem',
        marginBottom: '15px',
        color: '#CBD5E1'
    },
    browseAllBtn: {
        display: 'inline-block',
        marginTop: '15px',
        padding: '12px 24px',
        background: '#FF6B35',
        color: '#fff',
        borderRadius: '10px',
        textDecoration: 'none',
        fontWeight: '600'
    },
    resultsActions: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px 30px 30px',
        borderTop: '1px solid #E2E8F0'
    },
    restartBtn: {
        padding: '12px 20px',
        background: '#F1F5F9',
        color: '#64748B',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontWeight: '600'
    },
    viewAllBtn: {
        padding: '12px 24px',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        color: '#fff',
        borderRadius: '10px',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontWeight: '600'
    }
};

export default CourseFinder;