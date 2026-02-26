"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import API_BASE from '../api';

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
    const [animateQuestion, setAnimateQuestion] = useState(true);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Handle escape key to close modal
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
                resetFinder();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen]);

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
            setAnimateQuestion(false);
            setTimeout(() => {
                setStep(step + 1);
                setAnimateQuestion(true);
            }, 300);
        }
    };

    const handleBack = () => {
        setAnimateQuestion(false);
        setTimeout(() => {
            setStep(step - 1);
            setAnimateQuestion(true);
        }, 150);
    };

    const findCourses = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_BASE}/programs`);
            let programs = res.data;

            const interestOption = questions[1].options.find(o => o.value === answers.interest);
            const budgetOption = questions[3].options.find(o => o.value === answers.budget);

            if (answers.education === '12th') {
                programs = programs.filter(p => p.level === 'Undergraduate');
            } else if (answers.education === 'graduate' || answers.education === 'working') {
                programs = programs.filter(p => ['Postgraduate', 'Undergraduate'].includes(p.level));
            }

            if (interestOption?.categories) {
                programs = programs.filter(p =>
                    interestOption.categories.some(cat =>
                        p.category?.toLowerCase().includes(cat.toLowerCase()) ||
                        p.name?.toLowerCase().includes(cat.toLowerCase())
                    )
                );
            }

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

            if (answers.mode !== 'any') {
                programs = programs.filter(p => p.mode === answers.mode);
            }

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
        setAnimateQuestion(true);
    };

    const currentQuestion = questions[step - 1];

    return (
        <>
            <style>{`
                /* ==================== COURSE FINDER STYLES ==================== */
                
                /* ==================== CSS VARIABLES ==================== */
                .cf-floating-btn,
                .cf-overlay {
                    --cf-primary: #FF6B35;
                    --cf-primary-light: #FF8B5C;
                    --cf-primary-shadow: rgba(255, 107, 53, 0.4);
                    --cf-dark: #0F172A;
                    --cf-dark-light: #1E293B;
                    --cf-gray-100: #F1F5F9;
                    --cf-gray-200: #E2E8F0;
                    --cf-gray-300: #CBD5E1;
                    --cf-gray-400: #94A3B8;
                    --cf-gray-500: #64748B;
                    --cf-gray-700: #334155;
                    --cf-gray-800: #F8FAFC;
                    --cf-white: #FFFFFF;
                    --cf-success: #10B981;
                    --cf-success-light: #34D399;
                    --cf-emerald: #059669;
                    --cf-radius: 10px;
                    --cf-radius-lg: 12px;
                    --cf-radius-xl: 24px;
                    --cf-radius-full: 50px;
                    --cf-transition: 0.3s ease;
                    --cf-transition-fast: 0.2s ease;
                }

                /* ==================== FLOATING BUTTON ==================== */
                .cf-floating-btn {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    background: linear-gradient(135deg, var(--cf-primary) 0%, var(--cf-primary-light) 100%);
                    color: var(--cf-white);
                    border: none;
                    border-radius: var(--cf-radius-full);
                    padding: 18px 28px;
                    font-size: 1rem;
                    font-weight: 600;
                    font-family: inherit;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    box-shadow: 0 8px 30px var(--cf-primary-shadow);
                    z-index: 1000;
                    transition: transform var(--cf-transition), box-shadow var(--cf-transition);
                    animation: cf-float-pulse 3s ease-in-out infinite;
                }

                @keyframes cf-float-pulse {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-5px);
                    }
                }

                .cf-floating-btn:hover {
                    transform: translateY(-3px) scale(1.02);
                    box-shadow: 0 12px 40px var(--cf-primary-shadow);
                    animation: none;
                }

                .cf-floating-btn:active {
                    transform: translateY(0) scale(0.98);
                }

                .cf-floating-btn:focus {
                    outline: 3px solid var(--cf-primary);
                    outline-offset: 3px;
                }

                .cf-floating-btn i {
                    font-size: 1.1rem;
                    animation: cf-sparkle 2s ease-in-out infinite;
                }

                @keyframes cf-sparkle {
                    0%, 100% {
                        transform: rotate(0deg) scale(1);
                    }
                    25% {
                        transform: rotate(-10deg) scale(1.1);
                    }
                    75% {
                        transform: rotate(10deg) scale(1.1);
                    }
                }

                /* ==================== OVERLAY ==================== */
                .cf-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.7);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    padding: 20px;
                    backdrop-filter: blur(5px);
                    -webkit-backdrop-filter: blur(5px);
                    animation: cf-overlay-fade-in 0.2s ease;
                }

                @keyframes cf-overlay-fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                /* ==================== MODAL ==================== */
                .cf-modal {
                    background: var(--cf-white);
                    border-radius: var(--cf-radius-xl);
                    max-width: 600px;
                    width: 100%;
                    max-height: 90vh;
                    overflow: auto;
                    position: relative;
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
                    animation: cf-modal-slide-up 0.3s ease;
                }

                @keyframes cf-modal-slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px) scale(0.97);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                .cf-modal::-webkit-scrollbar {
                    width: 6px;
                }

                .cf-modal::-webkit-scrollbar-track {
                    background: var(--cf-gray-100);
                }

                .cf-modal::-webkit-scrollbar-thumb {
                    background: var(--cf-gray-400);
                    border-radius: 3px;
                }

                /* ==================== CLOSE BUTTON ==================== */
                .cf-close-btn {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.1rem;
                    color: var(--cf-white);
                    z-index: 1;
                    transition: all var(--cf-transition-fast);
                }

                .cf-close-btn:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: rotate(90deg);
                }

                .cf-close-btn:focus {
                    outline: 3px solid var(--cf-primary);
                    outline-offset: 2px;
                }

                /* ==================== HEADER ==================== */
                .cf-header {
                    text-align: center;
                    padding: 40px 30px 30px;
                    background: linear-gradient(135deg, var(--cf-dark) 0%, var(--cf-dark-light) 100%);
                    border-radius: var(--cf-radius-xl) var(--cf-radius-xl) 0 0;
                    position: relative;
                    overflow: hidden;
                }

                .cf-header::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    right: -20%;
                    width: 250px;
                    height: 250px;
                    background: rgba(255, 107, 53, 0.1);
                    border-radius: 50%;
                    pointer-events: none;
                }

                .cf-header-icon {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, var(--cf-primary) 0%, var(--cf-primary-light) 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                    font-size: 2rem;
                    color: var(--cf-white);
                    box-shadow: 0 10px 30px var(--cf-primary-shadow);
                    position: relative;
                    animation: cf-icon-pulse 2s ease-in-out infinite;
                }

                @keyframes cf-icon-pulse {
                    0%, 100% {
                        box-shadow: 0 10px 30px var(--cf-primary-shadow);
                    }
                    50% {
                        box-shadow: 0 15px 40px var(--cf-primary-shadow);
                    }
                }

                .cf-title {
                    color: var(--cf-white);
                    font-size: 1.8rem;
                    font-weight: 700;
                    margin: 0 0 10px;
                    position: relative;
                }

                .cf-subtitle {
                    color: var(--cf-gray-400);
                    font-size: 1rem;
                    margin: 0;
                    position: relative;
                }

                /* ==================== PROGRESS ==================== */
                .cf-progress-container {
                    padding: 20px 30px;
                    border-bottom: 1px solid var(--cf-gray-200);
                }

                .cf-progress-bar {
                    height: 8px;
                    background: var(--cf-gray-200);
                    border-radius: 4px;
                    overflow: hidden;
                    margin-bottom: 10px;
                }

                .cf-progress-fill {
                    height: 100%;
                    background: linear-gradient(135deg, var(--cf-primary) 0%, var(--cf-primary-light) 100%);
                    border-radius: 4px;
                    transition: width 0.4s ease;
                    position: relative;
                }

                .cf-progress-fill::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255, 255, 255, 0.3),
                        transparent
                    );
                    animation: cf-progress-shine 1.5s infinite;
                }

                @keyframes cf-progress-shine {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(100%); }
                }

                .cf-progress-text {
                    color: var(--cf-gray-500);
                    font-size: 0.85rem;
                    font-weight: 500;
                }

                /* ==================== QUESTION ==================== */
                .cf-question-container {
                    padding: 30px;
                }

                .cf-question-container.animate {
                    animation: cf-question-fade-in 0.3s ease;
                }

                @keyframes cf-question-fade-in {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .cf-question {
                    color: var(--cf-dark);
                    font-size: 1.3rem;
                    font-weight: 600;
                    margin-bottom: 25px;
                    text-align: center;
                    line-height: 1.4;
                }

                /* ==================== OPTIONS GRID ==================== */
                .cf-options-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 12px;
                }

                .cf-option-btn {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                    padding: 20px 15px;
                    background: var(--cf-gray-800);
                    border: 2px solid var(--cf-gray-200);
                    border-radius: var(--cf-radius-lg);
                    cursor: pointer;
                    transition: all var(--cf-transition-fast);
                    text-align: center;
                    font-size: 0.9rem;
                    color: var(--cf-gray-700);
                    font-weight: 500;
                    font-family: inherit;
                }

                .cf-option-btn:hover {
                    border-color: var(--cf-primary);
                    background: #FFF7ED;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 15px rgba(255, 107, 53, 0.15);
                }

                .cf-option-btn:focus {
                    outline: 3px solid var(--cf-primary);
                    outline-offset: 2px;
                }

                .cf-option-btn.selected {
                    background: #FFF7ED;
                    border-color: var(--cf-primary);
                    color: var(--cf-primary);
                }

                .cf-option-btn.selected .cf-option-icon {
                    color: var(--cf-primary);
                    transform: scale(1.1);
                }

                .cf-option-icon {
                    font-size: 1.5rem;
                    transition: all var(--cf-transition-fast);
                }

                /* ==================== NAVIGATION ==================== */
                .cf-navigation {
                    display: flex;
                    justify-content: space-between;
                    padding: 0 30px 30px;
                    gap: 15px;
                }

                .cf-back-btn {
                    padding: 12px 24px;
                    background: var(--cf-gray-100);
                    color: var(--cf-gray-500);
                    border: none;
                    border-radius: var(--cf-radius);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 600;
                    font-size: 0.95rem;
                    font-family: inherit;
                    transition: all var(--cf-transition-fast);
                }

                .cf-back-btn:hover {
                    background: var(--cf-gray-200);
                    color: var(--cf-gray-700);
                }

                .cf-back-btn:focus {
                    outline: 3px solid var(--cf-gray-400);
                    outline-offset: 2px;
                }

                .cf-find-btn {
                    padding: 14px 30px;
                    background: linear-gradient(135deg, var(--cf-primary) 0%, var(--cf-primary-light) 100%);
                    color: var(--cf-white);
                    border: none;
                    border-radius: var(--cf-radius);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 600;
                    font-size: 1rem;
                    font-family: inherit;
                    margin-left: auto;
                    box-shadow: 0 4px 15px var(--cf-primary-shadow);
                    transition: all var(--cf-transition-fast);
                }

                .cf-find-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px var(--cf-primary-shadow);
                }

                .cf-find-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .cf-find-btn:focus {
                    outline: 3px solid var(--cf-primary);
                    outline-offset: 2px;
                }

                /* ==================== RESULTS HEADER ==================== */
                .cf-results-header {
                    text-align: center;
                    padding: 40px 30px 20px;
                    background: linear-gradient(135deg, var(--cf-dark) 0%, var(--cf-dark-light) 100%);
                    border-radius: var(--cf-radius-xl) var(--cf-radius-xl) 0 0;
                    position: relative;
                    overflow: hidden;
                }

                .cf-results-icon {
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, var(--cf-success) 0%, var(--cf-success-light) 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                    font-size: 1.8rem;
                    color: var(--cf-white);
                    animation: cf-results-icon-bounce 0.6s ease;
                }

                @keyframes cf-results-icon-bounce {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.15); }
                }

                .cf-results-title {
                    color: var(--cf-white);
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin: 0 0 10px;
                }

                .cf-results-subtitle {
                    color: var(--cf-gray-400);
                    font-size: 0.95rem;
                    margin: 0;
                }

                /* ==================== RESULTS LIST ==================== */
                .cf-results-list {
                    padding: 20px;
                    max-height: 350px;
                    overflow: auto;
                }

                .cf-results-list::-webkit-scrollbar {
                    width: 5px;
                }

                .cf-results-list::-webkit-scrollbar-track {
                    background: var(--cf-gray-100);
                    border-radius: 3px;
                }

                .cf-results-list::-webkit-scrollbar-thumb {
                    background: var(--cf-gray-300);
                    border-radius: 3px;
                }

                .cf-result-card {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 18px;
                    background: var(--cf-gray-800);
                    border-radius: var(--cf-radius-lg);
                    margin-bottom: 12px;
                    text-decoration: none;
                    transition: all var(--cf-transition-fast);
                    border: 2px solid transparent;
                    animation: cf-result-card-fade-in 0.3s ease backwards;
                }

                .cf-result-card:nth-child(1) { animation-delay: 0.05s; }
                .cf-result-card:nth-child(2) { animation-delay: 0.1s; }
                .cf-result-card:nth-child(3) { animation-delay: 0.15s; }
                .cf-result-card:nth-child(4) { animation-delay: 0.2s; }
                .cf-result-card:nth-child(5) { animation-delay: 0.25s; }
                .cf-result-card:nth-child(6) { animation-delay: 0.3s; }

                @keyframes cf-result-card-fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .cf-result-card:hover {
                    border-color: var(--cf-primary);
                    background: var(--cf-white);
                    transform: translateX(5px);
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
                }

                .cf-result-card:focus {
                    outline: 3px solid var(--cf-primary);
                    outline-offset: 2px;
                }

                .cf-result-info {
                    flex: 1;
                    min-width: 0;
                }

                .cf-result-name {
                    color: var(--cf-dark);
                    font-size: 1.05rem;
                    font-weight: 600;
                    margin-bottom: 5px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .cf-result-university {
                    color: var(--cf-gray-500);
                    font-size: 0.85rem;
                    margin-bottom: 8px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .cf-result-meta {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .cf-result-badge {
                    background: var(--cf-gray-200);
                    color: var(--cf-gray-500);
                    padding: 4px 10px;
                    border-radius: 6px;
                    font-size: 0.75rem;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }

                .cf-result-price {
                    text-align: right;
                    flex-shrink: 0;
                    margin-left: 15px;
                }

                .cf-price-label {
                    display: block;
                    color: var(--cf-gray-500);
                    font-size: 0.8rem;
                    margin-bottom: 4px;
                }

                .cf-price-value {
                    color: var(--cf-emerald);
                    font-size: 1.1rem;
                    font-weight: 700;
                }

                /* ==================== NO RESULTS ==================== */
                .cf-no-results {
                    text-align: center;
                    padding: 40px 20px;
                    color: var(--cf-gray-500);
                    animation: cf-no-results-fade-in 0.4s ease;
                }

                @keyframes cf-no-results-fade-in {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .cf-no-results-icon {
                    font-size: 3rem;
                    margin-bottom: 15px;
                    color: var(--cf-gray-300);
                }

                .cf-browse-all-btn {
                    display: inline-block;
                    margin-top: 15px;
                    padding: 12px 24px;
                    background: var(--cf-primary);
                    color: var(--cf-white);
                    border-radius: var(--cf-radius);
                    text-decoration: none;
                    font-weight: 600;
                    transition: all var(--cf-transition-fast);
                }

                .cf-browse-all-btn:hover {
                    background: var(--cf-primary-light);
                    transform: translateY(-2px);
                }

                /* ==================== RESULTS ACTIONS ==================== */
                .cf-results-actions {
                    display: flex;
                    justify-content: space-between;
                    padding: 20px 30px 30px;
                    border-top: 1px solid var(--cf-gray-200);
                    gap: 15px;
                }

                .cf-restart-btn {
                    padding: 12px 20px;
                    background: var(--cf-gray-100);
                    color: var(--cf-gray-500);
                    border: none;
                    border-radius: var(--cf-radius);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 600;
                    font-family: inherit;
                    transition: all var(--cf-transition-fast);
                }

                .cf-restart-btn:hover {
                    background: var(--cf-gray-200);
                    color: var(--cf-gray-700);
                }

                .cf-restart-btn:focus {
                    outline: 3px solid var(--cf-gray-400);
                    outline-offset: 2px;
                }

                .cf-view-all-btn {
                    padding: 12px 24px;
                    background: linear-gradient(135deg, var(--cf-dark) 0%, var(--cf-dark-light) 100%);
                    color: var(--cf-white);
                    border-radius: var(--cf-radius);
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 600;
                    transition: all var(--cf-transition-fast);
                }

                .cf-view-all-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(15, 23, 42, 0.3);
                }

                .cf-view-all-btn:focus {
                    outline: 3px solid var(--cf-dark);
                    outline-offset: 2px;
                }

                /* ==================== RESPONSIVE ==================== */
                @media screen and (max-width: 768px) {
                    .cf-floating-btn {
                        bottom: 20px;
                        right: 20px;
                        padding: 14px 20px;
                        font-size: 0.9rem;
                    }

                    .cf-floating-btn span {
                        display: none;
                    }

                    .cf-floating-btn i {
                        font-size: 1.3rem;
                    }

                    .cf-overlay {
                        padding: 15px;
                        align-items: flex-end;
                    }

                    .cf-modal {
                        max-height: 85vh;
                        border-radius: var(--cf-radius-xl) var(--cf-radius-xl) 0 0;
                        animation: cf-modal-slide-up-mobile 0.3s ease;
                    }

                    @keyframes cf-modal-slide-up-mobile {
                        from {
                            opacity: 0;
                            transform: translateY(100%);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    .cf-header {
                        padding: 30px 20px 25px;
                    }

                    .cf-header-icon {
                        width: 65px;
                        height: 65px;
                        font-size: 1.7rem;
                    }

                    .cf-title {
                        font-size: 1.5rem;
                    }

                    .cf-subtitle {
                        font-size: 0.9rem;
                    }

                    .cf-progress-container {
                        padding: 15px 20px;
                    }

                    .cf-question-container {
                        padding: 20px;
                    }

                    .cf-question {
                        font-size: 1.15rem;
                        margin-bottom: 20px;
                    }

                    .cf-options-grid {
                        grid-template-columns: 1fr;
                        gap: 10px;
                    }

                    .cf-option-btn {
                        flex-direction: row;
                        padding: 15px;
                        text-align: left;
                        justify-content: flex-start;
                    }

                    .cf-option-icon {
                        font-size: 1.3rem;
                        width: 40px;
                    }

                    .cf-navigation {
                        padding: 0 20px 20px;
                    }

                    .cf-back-btn,
                    .cf-find-btn {
                        padding: 12px 18px;
                        font-size: 0.9rem;
                    }

                    .cf-results-header {
                        padding: 30px 20px 20px;
                    }

                    .cf-results-icon {
                        width: 60px;
                        height: 60px;
                        font-size: 1.5rem;
                    }

                    .cf-results-title {
                        font-size: 1.3rem;
                    }

                    .cf-results-list {
                        padding: 15px;
                        max-height: 300px;
                    }

                    .cf-result-card {
                        flex-direction: column;
                        align-items: flex-start;
                        padding: 15px;
                    }

                    .cf-result-price {
                        text-align: left;
                        margin-left: 0;
                        margin-top: 12px;
                        padding-top: 12px;
                        border-top: 1px solid var(--cf-gray-200);
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }

                    .cf-results-actions {
                        padding: 15px 20px 25px;
                        flex-direction: column;
                    }

                    .cf-restart-btn,
                    .cf-view-all-btn {
                        justify-content: center;
                        width: 100%;
                    }
                }

                @media screen and (max-width: 400px) {
                    .cf-floating-btn {
                        bottom: 15px;
                        right: 15px;
                        padding: 12px;
                        border-radius: 50%;
                        width: 56px;
                        height: 56px;
                        justify-content: center;
                    }

                    .cf-option-btn {
                        font-size: 0.85rem;
                        padding: 12px;
                    }
                }

                /* ==================== REDUCED MOTION ==================== */
                @media (prefers-reduced-motion: reduce) {
                    .cf-floating-btn,
                    .cf-modal,
                    .cf-option-btn,
                    .cf-result-card,
                    .cf-close-btn,
                    .cf-back-btn,
                    .cf-find-btn,
                    .cf-restart-btn,
                    .cf-view-all-btn,
                    .cf-progress-fill,
                    .cf-header-icon,
                    .cf-question-container {
                        animation: none !important;
                        transition-duration: 0.01ms !important;
                    }

                    .cf-progress-fill::after {
                        animation: none !important;
                    }
                }

                /* ==================== TOUCH DEVICES ==================== */
                @media (hover: none) and (pointer: coarse) {
                    .cf-floating-btn:hover,
                    .cf-option-btn:hover,
                    .cf-result-card:hover,
                    .cf-find-btn:hover:not(:disabled),
                    .cf-view-all-btn:hover {
                        transform: none;
                    }

                    .cf-floating-btn:active {
                        transform: scale(0.95);
                    }

                    .cf-option-btn:active {
                        background: #FFF7ED;
                        border-color: var(--cf-primary);
                    }

                    .cf-result-card:active {
                        border-color: var(--cf-primary);
                    }
                }

                /* ==================== HIGH CONTRAST ==================== */
                @media (prefers-contrast: high) {
                    .cf-option-btn {
                        border-width: 3px;
                    }

                    .cf-result-card {
                        border: 2px solid var(--cf-gray-300);
                    }
                }
            `}</style>

            {/* Floating Button */}
            <button
                className="cf-floating-btn"
                onClick={() => setIsOpen(true)}
                aria-label="Open course finder"
            >
                <i className="fa-solid fa-wand-magic-sparkles"></i>
                <span>Find My Course</span>
            </button>

            {/* Modal */}
            {isOpen && (
                <div
                    className="cf-overlay"
                    onClick={() => { setIsOpen(false); resetFinder(); }}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="cf-modal-title"
                >
                    <div className="cf-modal" onClick={(e) => e.stopPropagation()} role="document">
                        <button
                            className="cf-close-btn"
                            onClick={() => { setIsOpen(false); resetFinder(); }}
                            aria-label="Close course finder"
                            type="button"
                        >
                            <i className="fa-solid fa-times"></i>
                        </button>

                        {!showResults ? (
                            <>
                                {/* Header */}
                                <div className="cf-header">
                                    <div className="cf-header-icon">
                                        <i className="fa-solid fa-compass"></i>
                                    </div>
                                    <h2 id="cf-modal-title" className="cf-title">Find Your Perfect Course</h2>
                                    <p className="cf-subtitle">
                                        Answer a few questions and we'll recommend the best programs for you
                                    </p>
                                </div>

                                {/* Progress Bar */}
                                <div className="cf-progress-container">
                                    <div className="cf-progress-bar" role="progressbar" aria-valuenow={(step / questions.length) * 100} aria-valuemin="0" aria-valuemax="100">
                                        <div
                                            className="cf-progress-fill"
                                            style={{ width: `${(step / questions.length) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="cf-progress-text">
                                        Step {step} of {questions.length}
                                    </span>
                                </div>

                                {/* Question */}
                                <div className={`cf-question-container ${animateQuestion ? 'animate' : ''}`}>
                                    <h3 className="cf-question">{currentQuestion.question}</h3>

                                    <div className="cf-options-grid" role="radiogroup" aria-label={currentQuestion.question}>
                                        {currentQuestion.options.map((option) => (
                                            <button
                                                key={option.value}
                                                className={`cf-option-btn ${answers[currentQuestion.field] === option.value ? 'selected' : ''}`}
                                                onClick={() => handleOptionSelect(currentQuestion.field, option.value)}
                                                role="radio"
                                                aria-checked={answers[currentQuestion.field] === option.value}
                                                type="button"
                                            >
                                                <i className={`fa-solid ${option.icon} cf-option-icon`}></i>
                                                <span>{option.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Navigation */}
                                <div className="cf-navigation">
                                    {step > 1 && (
                                        <button
                                            className="cf-back-btn"
                                            onClick={handleBack}
                                            type="button"
                                        >
                                            <i className="fa-solid fa-arrow-left"></i> Back
                                        </button>
                                    )}

                                    {step === questions.length && answers[currentQuestion.field] && (
                                        <button
                                            className="cf-find-btn"
                                            onClick={findCourses}
                                            disabled={loading}
                                            type="button"
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
                                <div className="cf-results-header">
                                    <div className="cf-results-icon">
                                        <i className="fa-solid fa-sparkles"></i>
                                    </div>
                                    <h2 className="cf-results-title">
                                        {results.length > 0 ? 'Recommended Courses For You!' : 'No Exact Matches Found'}
                                    </h2>
                                    <p className="cf-results-subtitle">
                                        {results.length > 0
                                            ? `We found ${results.length} courses matching your preferences`
                                            : 'Try adjusting your preferences to see more options'
                                        }
                                    </p>
                                </div>

                                {/* Results List */}
                                <div className="cf-results-list">
                                    {results.length > 0 ? (
                                        results.map((program) => (
                                            <Link
                                                key={program._id}
                                                href={`/programs/${program.slug}`}
                                                className="cf-result-card"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <div className="cf-result-info">
                                                    <h4 className="cf-result-name">{program.name}</h4>
                                                    <p className="cf-result-university">
                                                        <i className="fa-solid fa-building-columns"></i>
                                                        {program.universityId?.name || 'University'}
                                                    </p>
                                                    <div className="cf-result-meta">
                                                        <span className="cf-result-badge">
                                                            <i className="fa-solid fa-clock"></i> {program.duration}
                                                        </span>
                                                        <span className="cf-result-badge">
                                                            <i className="fa-solid fa-laptop"></i> {program.mode}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="cf-result-price">
                                                    <span className="cf-price-label">Fee</span>
                                                    <span className="cf-price-value">
                                                        ₹{Number(program.fee).toLocaleString('en-IN')}
                                                    </span>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <div className="cf-no-results">
                                            <i className="fa-solid fa-face-sad-tear cf-no-results-icon"></i>
                                            <p>No programs match your exact criteria.</p>
                                            <Link href="/programs"
                                                className="cf-browse-all-btn"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Browse All Programs
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="cf-results-actions">
                                    <button className="cf-restart-btn" onClick={resetFinder} type="button">
                                        <i className="fa-solid fa-redo"></i> Start Over
                                    </button>
                                    <Link href="/programs"
                                        className="cf-view-all-btn"
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

export default CourseFinder;
