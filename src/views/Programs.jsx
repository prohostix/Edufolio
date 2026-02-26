"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import API_BASE from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EnrollModal from '../components/EnrollModal';

const Programs = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [showEnrollModal, setShowEnrollModal] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [filter, setFilter] = useState({
        category: '',
        level: '',
        mode: '',
        university: ''
    });
    const [universities, setUniversities] = useState([]);

    useEffect(() => {
        fetchPrograms();
        fetchUniversities();
    }, [filter]);

    const fetchPrograms = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            
            if (filter.category) params.append('category', filter.category);
            if (filter.level) params.append('level', filter.level);
            if (filter.mode) params.append('mode', filter.mode);
            if (filter.university) params.append('universityId', filter.university);

            const res = await axios.get(`${API_BASE}/programs?${params.toString()}`);
            setPrograms(res.data);
        } catch (err) {
            console.error('Error fetching programs:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchUniversities = async () => {
        try {
            const res = await axios.get(`${API_BASE}/universities`);
            setUniversities(res.data);
        } catch (err) {
            console.error('Error fetching universities:', err);
        }
    };

    const filteredPrograms = programs.filter(prog =>
        prog.name.toLowerCase().includes(search.toLowerCase()) ||
        prog.category?.toLowerCase().includes(search.toLowerCase()) ||
        prog.universityId?.name?.toLowerCase().includes(search.toLowerCase())
    );

    const clearFilters = () => {
        setSearch('');
        setFilter({ category: '', level: '', mode: '', university: '' });
    };

    const handleEnrollClick = (program) => {
        setSelectedProgram(program);
        setShowEnrollModal(true);
    };

    const categories = ['MBA', 'MCA', 'BBA', 'BCA', 'B.Com', 'M.Com', 'BA', 'MA', 'B.Sc', 'M.Sc'];
    const levels = ['UG', 'PG', 'Diploma', 'Certificate'];
    const modes = ['Online', 'Distance', 'Hybrid'];

    return (
        <>
            <style>{`
                /* ==================== PROGRAMS PAGE STYLES ==================== */
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

                /* ==================== CSS VARIABLES ==================== */
                :root {
                    --light-blue: #0099D6;
                    --dark-blue: #00529D;
                    --maroon: #8B2346;
                    --dark-maroon: #6B1D3A;
                    --pink: #C4567A;
                    --light-pink: #E8B4C4;
                    --white: #FFFFFF;
                    --light-gray: #F5F7FA;
                    --gray: #64748B;
                    --dark-gray: #1E293B;
                    --text-dark: #2D1B4E;
                    --text-light: #FFFFFF;
                    --text-muted: #94A3B8;
                    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
                    --shadow-md: 0 4px 20px rgba(0, 0, 0, 0.1);
                    --shadow-lg: 0 15px 40px rgba(0, 0, 0, 0.15);
                    --radius-sm: 8px;
                    --radius-md: 12px;
                    --radius-lg: 16px;
                    --radius-xl: 20px;
                    --radius-2xl: 24px;
                    --radius-full: 50%;
                    --transition-fast: 0.2s ease;
                    --transition-normal: 0.3s ease;
                    --container-max: 1200px;
                }

                /* ==================== BASE ==================== */
                .programs-page {
                    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    overflow-x: hidden;
                    color: var(--text-dark);
                    line-height: 1.6;
                }

                .container {
                    max-width: var(--container-max);
                    margin: 0 auto;
                    padding: 0 20px;
                    position: relative;
                    z-index: 1;
                }

                /* ==================== HERO SECTION ==================== */
                .programs-hero {
                    background: linear-gradient(135deg, var(--dark-maroon) 0%, var(--maroon) 100%);
                    padding: 100px 0 30px;
                    position: relative;
                    overflow: hidden;
                }

                .hero-pattern {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M40 10L50 30H30L40 10zM40 70L30 50H50L40 70zM10 40L30 30V50L10 40zM70 40L50 50V30L70 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
                    opacity: 0.5;
                    pointer-events: none;
                }

                .hero-container {
                    max-width: var(--container-max);
                    margin: 0 auto;
                    padding: 0 20px;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 60px;
                    align-items: center;
                    position: relative;
                    z-index: 2;
                }

                .hero-content {
                    max-width: 550px;
                }

                .hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(255, 255, 255, 0.15);
                    color: var(--white);
                    padding: 10px 20px;
                    border-radius: 30px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    margin-bottom: 20px;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                }

                .hero-title {
                    color: var(--white);
                    font-size: clamp(2rem, 5vw, 2.8rem);
                    font-weight: 800;
                    line-height: 1.2;
                    margin-bottom: 20px;
                }

                .hero-title .highlight {
                    color: var(--light-blue);
                }

                .hero-subtitle {
                    color: rgba(255, 255, 255, 0.85);
                    font-size: clamp(0.95rem, 2vw, 1.1rem);
                    line-height: 1.7;
                    margin-bottom: 20px;
                }

                .tagline {
                    display: flex;
                    gap: 15px;
                    margin-bottom: 30px;
                    color: var(--light-blue);
                    font-size: 1.1rem;
                    font-weight: 600;
                    font-style: italic;
                }

                .hero-stats {
                    display: flex;
                    align-items: center;
                    gap: 25px;
                    background: rgba(255, 255, 255, 0.1);
                    padding: 20px 30px;
                    border-radius: var(--radius-lg);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .hero-stat {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                }

                .hero-stat-number {
                    color: var(--white);
                    font-size: clamp(1.5rem, 3vw, 1.8rem);
                    font-weight: 800;
                }

                .hero-stat-label {
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 0.85rem;
                }

                .hero-stat-divider {
                    width: 1px;
                    height: 40px;
                    background: rgba(255, 255, 255, 0.2);
                }

                /* ==================== HERO IMAGES ==================== */
                .hero-images {
                    position: relative;
                    height: 450px;
                }

                .main-image-container {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 340px;
                    height: 280px;
                    border-radius: var(--radius-2xl);
                    overflow: hidden;
                    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
                    border: 5px solid rgba(255, 255, 255, 0.2);
                }

                .main-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .main-image-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 80px;
                    background: linear-gradient(to top, rgba(107, 29, 58, 0.7), transparent);
                }

                .floating-image {
                    position: absolute;
                    border-radius: var(--radius-md);
                    overflow: hidden;
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
                    border: 4px solid rgba(255, 255, 255, 0.3);
                }

                .floating-image-1 {
                    top: 5px;
                    right: 30px;
                    width: 150px;
                    height: 100px;
                    animation: float1 6s ease-in-out infinite;
                }

                .floating-image-2 {
                    bottom: 50px;
                    left: 0;
                    width: 140px;
                    height: 95px;
                    animation: float2 6s ease-in-out infinite;
                }

                .floating-image-3 {
                    top: 45%;
                    right: 0;
                    width: 120px;
                    height: 85px;
                    border-width: 3px;
                    animation: float1 5s ease-in-out infinite;
                }

                .floating-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .floating-card {
                    position: absolute;
                    background: var(--white);
                    padding: 14px 18px;
                    border-radius: var(--radius-md);
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .floating-program-card {
                    top: 20px;
                    left: 10px;
                    animation: float1 5s ease-in-out infinite;
                }

                .floating-success-card {
                    bottom: 30px;
                    right: 20px;
                    animation: float2 5s ease-in-out infinite;
                }

                .floating-card-icon {
                    width: 42px;
                    height: 42px;
                    border-radius: var(--radius-sm);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.1rem;
                }

                .floating-card-icon.maroon {
                    background: rgba(139, 35, 70, 0.15);
                    color: var(--maroon);
                }

                .floating-card-icon.gold {
                    background: #FEF3C7;
                    color: #D97706;
                }

                .floating-card-content {
                    display: flex;
                    flex-direction: column;
                }

                .floating-card-number {
                    color: var(--text-dark);
                    font-size: 1.1rem;
                    font-weight: 800;
                }

                .floating-card-label {
                    color: var(--gray);
                    font-size: 0.7rem;
                }

                .decor-circle {
                    position: absolute;
                    border-radius: var(--radius-full);
                }

                .decor-circle-1 {
                    top: 10%;
                    right: 15%;
                    width: 60px;
                    height: 60px;
                    border: 3px solid rgba(0, 153, 214, 0.25);
                    animation: pulse 3s ease-in-out infinite;
                }

                .decor-circle-2 {
                    bottom: 15%;
                    left: 10%;
                    width: 45px;
                    height: 45px;
                    background: rgba(0, 153, 214, 0.15);
                    animation: pulse 4s ease-in-out infinite;
                }

                .decor-dots {
                    position: 'absolute';
                    top: 60%;
                    right: 8%;
                    width: 50px;
                    height: 50px;
                    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.3) 2px, transparent 2px);
                    background-size: 10px 10px;
                }

                /* ==================== HERO CATEGORIES ==================== */
                .hero-category-section {
                    margin-top: 40px;
                    padding-top: 25px;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }

                .hero-category-container {
                    max-width: var(--container-max);
                    margin: 0 auto;
                    padding: 0 20px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .hero-category-label {
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 0.9rem;
                    font-weight: 500;
                }

                .hero-category-pills {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .hero-category-pill {
                    padding: 10px 20px;
                    border-radius: 25px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    background: rgba(255, 255, 255, 0.1);
                    color: var(--white);
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 0.9rem;
                    transition: all var(--transition-normal);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                }

                .hero-category-pill:hover,
                .hero-category-pill.active {
                    background: var(--light-blue);
                }

                /* ==================== FILTER SECTION ==================== */
                .filter-section {
                    background: var(--white);
                    padding: 25px 20px;
                    border-bottom: 3px solid var(--light-gray);
                    position: sticky;
                    top: 70px;
                    z-index: 100;
                    box-shadow: var(--shadow-md);
                }

                .search-form {
                    display: flex;
                    gap: 15px;
                    margin-bottom: 20px;
                    flex-wrap: wrap;
                }

                .search-box {
                    position: relative;
                    flex: 1;
                    min-width: 250px;
                    max-width: 500px;
                }

                .search-icon {
                    position: absolute;
                    left: 18px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--gray);
                    font-size: 1rem;
                }

                .search-input {
                    width: 100%;
                    padding: 16px 50px;
                    border-radius: var(--radius-md);
                    border: 2px solid var(--light-gray);
                    font-size: 1rem;
                    box-sizing: border-box;
                    transition: all var(--transition-normal);
                    outline: none;
                    background: var(--light-gray);
                    font-family: inherit;
                }

                .search-input:focus {
                    border-color: var(--maroon);
                    box-shadow: 0 0 0 3px rgba(139, 35, 70, 0.1);
                    background: var(--white);
                }

                .clear-search-btn {
                    position: absolute;
                    right: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: var(--gray);
                    border: none;
                    width: 28px;
                    height: 28px;
                    border-radius: var(--radius-full);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--white);
                    font-size: 0.8rem;
                    transition: all var(--transition-fast);
                }

                .clear-search-btn:hover {
                    background: var(--dark-gray);
                }

                .search-btn {
                    padding: 16px 30px;
                    background: var(--maroon);
                    color: var(--white);
                    border: none;
                    border-radius: var(--radius-md);
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 1rem;
                    box-shadow: 0 4px 15px rgba(139, 35, 70, 0.3);
                    transition: all var(--transition-normal);
                    font-family: inherit;
                }

                .search-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(139, 35, 70, 0.4);
                }

                .filters {
                    display: flex;
                    gap: 12px;
                    flex-wrap: wrap;
                    align-items: center;
                }

                .filter-label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: var(--text-dark);
                    font-size: 0.9rem;
                    font-weight: 600;
                }

                .filter-select {
                    padding: 12px 18px;
                    border-radius: var(--radius-sm);
                    border: 2px solid var(--light-gray);
                    font-size: 0.9rem;
                    cursor: pointer;
                    min-width: 140px;
                    background: var(--light-gray);
                    color: var(--text-dark);
                    font-weight: 500;
                    outline: none;
                    font-family: inherit;
                    transition: all var(--transition-normal);
                }

                .filter-select:focus {
                    border-color: var(--maroon);
                    background: var(--white);
                }

                .clear-filters-btn {
                    padding: 12px 18px;
                    background: rgba(139, 35, 70, 0.1);
                    color: var(--maroon);
                    border: none;
                    border-radius: var(--radius-sm);
                    font-size: 0.9rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 600;
                    font-family: inherit;
                    transition: all var(--transition-normal);
                }

                .clear-filters-btn:hover {
                    background: rgba(139, 35, 70, 0.15);
                }

                /* ==================== MAIN SECTION ==================== */
                .main-section {
                    padding: 50px 20px;
                    background: var(--light-gray);
                    min-height: 60vh;
                }

                .loading {
                    text-align: center;
                    padding: 80px 20px;
                    color: var(--gray);
                }

                .spinner {
                    width: 50px;
                    height: 50px;
                    border: 4px solid var(--light-gray);
                    border-top-color: var(--maroon);
                    border-radius: var(--radius-full);
                    animation: spin 1s linear infinite;
                    margin: 0 auto 20px;
                }

                .results-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 25px;
                    flex-wrap: wrap;
                    gap: 15px;
                }

                .result-count {
                    color: var(--gray);
                    font-size: 0.95rem;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin: 0;
                }

                .view-toggle {
                    display: flex;
                    gap: 5px;
                }

                .view-btn {
                    width: 40px;
                    height: 40px;
                    border-radius: var(--radius-sm);
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all var(--transition-fast);
                }

                .view-btn.active {
                    background: var(--maroon);
                    color: var(--white);
                }

                .view-btn.inactive {
                    background: var(--white);
                    color: var(--gray);
                }

                /* ==================== PROGRAMS GRID ==================== */
                .programs-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                    gap: 25px;
                }

                .program-card {
                    background: var(--white);
                    border-radius: var(--radius-xl);
                    padding: 25px;
                    box-shadow: var(--shadow-sm);
                    position: relative;
                    transition: all var(--transition-normal);
                    border: 1px solid var(--light-gray);
                }

                .program-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(139, 35, 70, 0.15);
                }

                .featured-badge {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: linear-gradient(135deg, var(--maroon) 0%, var(--pink) 100%);
                    color: var(--white);
                    padding: 5px 12px;
                    border-radius: 15px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    box-shadow: 0 4px 10px rgba(139, 35, 70, 0.3);
                }

                .card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 15px;
                    flex-wrap: wrap;
                    gap: 10px;
                }

                .category-wrapper {
                    display: flex;
                    gap: 8px;
                    flex-wrap: wrap;
                }

                .category-badge {
                    background: rgba(139, 35, 70, 0.1);
                    color: var(--maroon);
                    padding: 6px 14px;
                    border-radius: var(--radius-sm);
                    font-size: 0.8rem;
                    font-weight: 600;
                }

                .level-badge {
                    background: rgba(0, 82, 157, 0.1);
                    color: var(--dark-blue);
                    padding: 6px 14px;
                    border-radius: var(--radius-sm);
                    font-size: 0.8rem;
                    font-weight: 500;
                }

                .mode-badge {
                    background: #DCFCE7;
                    color: #15803D;
                    padding: 6px 12px;
                    border-radius: var(--radius-sm);
                    font-size: 0.75rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }

                .card-title {
                    color: var(--text-dark);
                    font-size: 1.2rem;
                    font-weight: 700;
                    margin-bottom: 15px;
                    line-height: 1.3;
                }

                .university-row {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 15px;
                    padding: 12px;
                    background: var(--light-gray);
                    border-radius: var(--radius-md);
                }

                .university-logo {
                    width: 45px;
                    height: 45px;
                    border-radius: var(--radius-sm);
                    background: var(--white);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 5px;
                    box-shadow: var(--shadow-sm);
                    flex-shrink: 0;
                }

                .uni-logo-img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    border-radius: 4px;
                }

                .university-name {
                    color: var(--text-dark);
                    font-size: 0.9rem;
                    font-weight: 600;
                    margin: 0 0 4px 0;
                }

                .uni-rating {
                    color: #D97706;
                    font-size: 0.75rem;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .details-row {
                    display: flex;
                    gap: 20px;
                    margin-bottom: 15px;
                    flex-wrap: wrap;
                }

                .detail-item {
                    color: var(--gray);
                    font-size: 0.85rem;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .eligibility {
                    color: var(--gray);
                    font-size: 0.85rem;
                    margin: 0 0 15px;
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    padding: 10px 12px;
                    background: rgba(0, 82, 157, 0.05);
                    border-radius: var(--radius-sm);
                    border-left: 3px solid var(--dark-blue);
                }

                .fee-section {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px;
                    background: var(--light-gray);
                    border-radius: var(--radius-md);
                    margin-bottom: 15px;
                    flex-wrap: wrap;
                    gap: 10px;
                }

                .fee-info,
                .emi-info {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .emi-info {
                    text-align: right;
                }

                .fee-label,
                .emi-label {
                    color: var(--gray);
                    font-size: 0.75rem;
                }

                .fee-amount {
                    color: var(--maroon);
                    font-size: 1.3rem;
                    font-weight: 700;
                }

                .emi-amount {
                    color: var(--dark-blue);
                    font-size: 1rem;
                    font-weight: 600;
                }

                .card-actions {
                    display: flex;
                    gap: 10px;
                }

                .view-details-btn,
                .enroll-now-btn {
                    flex: 1;
                    padding: 14px;
                    border-radius: var(--radius-md);
                    font-weight: 600;
                    font-size: 0.95rem;
                    text-align: center;
                    transition: all var(--transition-normal);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    cursor: pointer;
                    font-family: inherit;
                }

                .view-details-btn {
                    background: var(--light-gray);
                    color: var(--text-dark);
                    text-decoration: none;
                    border: none;
                }

                .view-details-btn:hover {
                    background: #e2e8f0;
                }

                .enroll-now-btn {
                    background: linear-gradient(135deg, var(--maroon) 0%, var(--pink) 100%);
                    color: var(--white);
                    border: none;
                    box-shadow: 0 4px 15px rgba(139, 35, 70, 0.3);
                }

                .enroll-now-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(139, 35, 70, 0.4);
                }

                /* ==================== EMPTY STATE ==================== */
                .empty-state {
                    text-align: center;
                    padding: 100px 20px;
                    max-width: 500px;
                    margin: 0 auto;
                    background: var(--white);
                    border-radius: var(--radius-xl);
                    box-shadow: var(--shadow-sm);
                }

                .empty-icon-wrapper {
                    width: 100px;
                    height: 100px;
                    border-radius: var(--radius-full);
                    background: rgba(139, 35, 70, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 25px;
                }

                .empty-icon {
                    font-size: 2.5rem;
                    color: var(--maroon);
                }

                .empty-title {
                    color: var(--text-dark);
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: 10px;
                }

                .empty-text {
                    color: var(--gray);
                    font-size: 1rem;
                    line-height: 1.6;
                    margin-bottom: 25px;
                }

                .empty-clear-btn {
                    padding: 14px 28px;
                    background: var(--maroon);
                    color: var(--white);
                    border: none;
                    border-radius: var(--radius-md);
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 1rem;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    box-shadow: 0 4px 15px rgba(139, 35, 70, 0.3);
                    font-family: inherit;
                    transition: all var(--transition-normal);
                }

                .empty-clear-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(139, 35, 70, 0.4);
                }

                /* ==================== WHY SECTION ==================== */
                .why-section {
                    padding: 80px 20px;
                    background: var(--white);
                }

                .section-header {
                    text-align: center;
                    margin-bottom: 50px;
                }

                .section-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(0, 82, 157, 0.1);
                    color: var(--dark-blue);
                    padding: 10px 20px;
                    border-radius: 30px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    margin-bottom: 15px;
                }

                .section-title {
                    color: var(--text-dark);
                    font-size: clamp(1.5rem, 4vw, 2rem);
                    font-weight: 800;
                    margin-bottom: 10px;
                }

                .section-subtitle {
                    color: var(--gray);
                    font-size: 1.05rem;
                    margin: 0;
                }

                .why-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 25px;
                }

                .why-card {
                    text-align: center;
                    padding: 30px 20px;
                    border-radius: var(--radius-lg);
                    background: var(--light-gray);
                    transition: all var(--transition-normal);
                    border: 1px solid var(--light-gray);
                }

                .why-card:hover {
                    transform: translateY(-5px);
                    box-shadow: var(--shadow-md);
                    background: var(--white);
                }

                .why-icon {
                    width: 70px;
                    height: 70px;
                    border-radius: var(--radius-full);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                    font-size: 1.5rem;
                }

                .why-icon.maroon {
                    background: rgba(139, 35, 70, 0.1);
                    color: var(--maroon);
                }

                .why-icon.blue {
                    background: rgba(0, 82, 157, 0.1);
                    color: var(--dark-blue);
                }

                .why-card-title {
                    color: var(--text-dark);
                    font-size: 1.1rem;
                    font-weight: 700;
                    margin-bottom: 10px;
                }

                .why-card-desc {
                    color: var(--gray);
                    font-size: 0.9rem;
                    line-height: 1.6;
                    margin: 0;
                }

                /* ==================== CTA SECTION ==================== */
                .cta-section {
                    padding: 80px 20px;
                    background: linear-gradient(135deg, var(--dark-blue) 0%, #003D7A 100%);
                    position: relative;
                    overflow: hidden;
                }

                .cta-pattern {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M40 10L50 30H30L40 10zM40 70L30 50H50L40 70zM10 40L30 30V50L10 40zM70 40L50 50V30L70 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
                    opacity: 0.5;
                    pointer-events: none;
                }

                .cta-content {
                    text-align: center;
                    max-width: 650px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 1;
                }

                .cta-icon {
                    width: 80px;
                    height: 80px;
                    border-radius: var(--radius-full);
                    background: rgba(0, 153, 214, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 25px;
                    font-size: 2rem;
                    color: var(--light-blue);
                }

                .cta-title {
                    color: var(--white);
                    font-size: clamp(1.5rem, 4vw, 2rem);
                    font-weight: 800;
                    margin-bottom: 15px;
                }

                .cta-text {
                    color: rgba(255, 255, 255, 0.85);
                    font-size: clamp(0.95rem, 2vw, 1.1rem);
                    margin-bottom: 20px;
                    line-height: 1.6;
                }

                .cta-tagline {
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    margin-bottom: 30px;
                    color: var(--light-blue);
                    font-size: 1.1rem;
                    font-weight: 600;
                    font-style: italic;
                }

                .cta-buttons {
                    display: flex;
                    gap: 15px;
                    justify-content: center;
                    flex-wrap: wrap;
                }

                .cta-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 16px 32px;
                    border-radius: var(--radius-md);
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 1rem;
                    transition: all var(--transition-normal);
                }

                .cta-btn.primary {
                    background: var(--light-blue);
                    color: var(--white);
                    box-shadow: 0 4px 20px rgba(0, 153, 214, 0.4);
                }

                .cta-btn.primary:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 6px 25px rgba(0, 153, 214, 0.5);
                }

                .cta-btn.secondary {
                    background: transparent;
                    color: var(--white);
                    border: 2px solid rgba(255, 255, 255, 0.3);
                }

                .cta-btn.secondary:hover {
                    background: rgba(255, 255, 255, 0.1);
                    transform: translateY(-3px);
                }

                /* ==================== ANIMATIONS ==================== */
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                @keyframes float1 {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                }

                @keyframes float2 {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(1.1); opacity: 0.8; }
                }

                /* ==================== TABLET ==================== */
                @media screen and (max-width: 1024px) {
                    .hero-container {
                        grid-template-columns: 1fr;
                        text-align: center;
                    }

                    .hero-content {
                        max-width: 100%;
                    }

                    .hero-images {
                        display: none;
                    }

                    .tagline {
                        justify-content: center;
                    }

                    .why-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .programs-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                /* ==================== MOBILE ==================== */
                @media screen and (max-width: 768px) {
                    .programs-hero {
                        padding: 90px 0 25px;
                    }

                    .hero-title {
                        font-size: 1.75rem;
                    }

                    .hero-stats {
                        flex-direction: column;
                        gap: 15px;
                        padding: 20px;
                    }

                    .hero-stat-divider {
                        display: none;
                    }

                    .filter-section {
                        padding: 20px 15px;
                        top: 60px;
                    }

                    .search-form {
                        flex-direction: column;
                    }

                    .search-box {
                        max-width: 100%;
                    }

                    .search-btn {
                        width: 100%;
                        justify-content: center;
                    }

                    .filters {
                        overflow-x: auto;
                        padding-bottom: 10px;
                        flex-wrap: nowrap;
                    }

                    .filter-select {
                        min-width: 120px;
                        flex-shrink: 0;
                    }

                    .main-section {
                        padding: 30px 15px;
                    }

                    .programs-grid {
                        grid-template-columns: 1fr;
                        gap: 20px;
                    }

                    .program-card {
                        padding: 20px;
                    }

                    .card-header {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .fee-section {
                        flex-direction: column;
                        text-align: center;
                    }

                    .emi-info {
                        text-align: center;
                    }

                    .card-actions {
                        flex-direction: column;
                    }

                    .why-section,
                    .cta-section {
                        padding: 50px 15px;
                    }

                    .why-grid {
                        grid-template-columns: 1fr;
                        gap: 20px;
                    }

                    .cta-buttons {
                        flex-direction: column;
                        width: 100%;
                    }

                    .cta-btn {
                        width: 100%;
                        justify-content: center;
                    }

                    .results-header {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                }

                /* ==================== SMALL MOBILE ==================== */
                @media screen and (max-width: 480px) {
                    .hero-badge {
                        font-size: 0.8rem;
                        padding: 8px 14px;
                    }

                    .hero-category-pill {
                        padding: 8px 14px;
                        font-size: 0.8rem;
                    }

                    .category-wrapper {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .details-row {
                        flex-direction: column;
                        gap: 10px;
                    }
                }

                /* ==================== TOUCH DEVICES ==================== */
                @media (hover: none) and (pointer: coarse) {
                    .program-card:hover,
                    .why-card:hover,
                    .search-btn:hover,
                    .enroll-now-btn:hover,
                    .cta-btn:hover {
                        transform: none;
                    }

                    .program-card:active,
                    .search-btn:active,
                    .enroll-now-btn:active,
                    .cta-btn:active {
                        transform: scale(0.98);
                        opacity: 0.9;
                    }

                    .search-btn,
                    .enroll-now-btn,
                    .view-details-btn,
                    .cta-btn,
                    .empty-clear-btn {
                        min-height: 48px;
                    }
                }

                /* ==================== REDUCED MOTION ==================== */
                @media (prefers-reduced-motion: reduce) {
                    *,
                    *::before,
                    *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }

                /* ==================== FOCUS STATES ==================== */
                .search-btn:focus,
                .enroll-now-btn:focus,
                .view-details-btn:focus,
                .cta-btn:focus,
                .filter-select:focus,
                .hero-category-pill:focus {
                    outline: 3px solid var(--light-blue);
                    outline-offset: 2px;
                }
            `}</style>

            <div className="programs-page">
                <Navbar />

                {/* Hero Section */}
                <section className="programs-hero">
                    <div className="hero-pattern"></div>
                    
                    <div className="hero-container">
                        <div className="hero-content">
                            <span className="hero-badge">
                                <i className="fa-solid fa-graduation-cap"></i>
                                Explore Programs
                            </span>
                            <h1 className="hero-title">
                                Find Your Perfect <span className="highlight">Program</span>
                            </h1>
                            <p className="hero-subtitle">
                                Browse through 200+ UGC-approved programs from India's top universities. 
                                From undergraduate to postgraduate, find the right fit for your career goals.
                            </p>
                            <div className="tagline">
                                <span>learn.</span>
                                <span>grow.</span>
                                <span>succeed.</span>
                            </div>
                            
                            <div className="hero-stats">
                                <div className="hero-stat">
                                    <span className="hero-stat-number">200+</span>
                                    <span className="hero-stat-label">Programs</span>
                                </div>
                                <div className="hero-stat-divider"></div>
                                <div className="hero-stat">
                                    <span className="hero-stat-number">50+</span>
                                    <span className="hero-stat-label">Universities</span>
                                </div>
                                <div className="hero-stat-divider"></div>
                                <div className="hero-stat">
                                    <span className="hero-stat-number">100%</span>
                                    <span className="hero-stat-label">Online</span>
                                </div>
                            </div>
                        </div>

                        <div className="hero-images">
                            <div className="main-image-container">
                                <img 
                                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=350&fit=crop" 
                                    alt="Students studying"
                                    className="main-image"
                                />
                                <div className="main-image-overlay"></div>
                            </div>

                            <div className="floating-image floating-image-1">
                                <img 
                                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=180&h=130&fit=crop" 
                                    alt="Student with laptop"
                                    className="floating-img"
                                />
                            </div>

                            <div className="floating-image floating-image-2">
                                <img 
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=160&h=120&fit=crop" 
                                    alt="Team collaboration"
                                    className="floating-img"
                                />
                            </div>

                            <div className="floating-image floating-image-3">
                                <img 
                                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=140&h=100&fit=crop" 
                                    alt="Online learning"
                                    className="floating-img"
                                />
                            </div>

                            <div className="floating-card floating-program-card">
                                <div className="floating-card-icon maroon">
                                    <i className="fa-solid fa-book-open"></i>
                                </div>
                                <div className="floating-card-content">
                                    <span className="floating-card-number">MBA</span>
                                    <span className="floating-card-label">Most Popular</span>
                                </div>
                            </div>

                            <div className="floating-card floating-success-card">
                                <div className="floating-card-icon gold">
                                    <i className="fa-solid fa-trophy"></i>
                                </div>
                                <div className="floating-card-content">
                                    <span className="floating-card-number">95%</span>
                                    <span className="floating-card-label">Placement</span>
                                </div>
                            </div>

                            <div className="decor-circle decor-circle-1"></div>
                            <div className="decor-circle decor-circle-2"></div>
                            <div className="decor-dots"></div>
                        </div>
                    </div>

                    <div className="hero-category-section">
                        <div className="hero-category-container">
                            <span className="hero-category-label">Popular:</span>
                            <div className="hero-category-pills">
                                {['MBA', 'MCA', 'BBA', 'BCA', 'B.Com'].map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setFilter({ ...filter, category: cat })}
                                        className={`hero-category-pill ${filter.category === cat ? 'active' : ''}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Filter Section */}
                <section className="filter-section">
                    <div className="container">
                        <div className="search-form">
                            <div className="search-box">
                                <i className="fa-solid fa-search search-icon"></i>
                                <input
                                    type="text"
                                    placeholder="Search programs, universities..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="search-input"
                                />
                                {search && (
                                    <button 
                                        onClick={() => setSearch('')}
                                        className="clear-search-btn"
                                    >
                                        <i className="fa-solid fa-times"></i>
                                    </button>
                                )}
                            </div>
                            <button className="search-btn">
                                <i className="fa-solid fa-search"></i>
                                Search
                            </button>
                        </div>

                        <div className="filters">
                            <div className="filter-label">
                                <i className="fa-solid fa-filter"></i> Filter:
                            </div>
                            
                            <select
                                value={filter.category}
                                onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                                className="filter-select"
                            >
                                <option value="">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>

                            <select
                                value={filter.level}
                                onChange={(e) => setFilter({ ...filter, level: e.target.value })}
                                className="filter-select"
                            >
                                <option value="">All Levels</option>
                                {levels.map(level => (
                                    <option key={level} value={level}>{level}</option>
                                ))}
                            </select>

                            <select
                                value={filter.mode}
                                onChange={(e) => setFilter({ ...filter, mode: e.target.value })}
                                className="filter-select"
                            >
                                <option value="">All Modes</option>
                                {modes.map(mode => (
                                    <option key={mode} value={mode}>{mode}</option>
                                ))}
                            </select>

                            <select
                                value={filter.university}
                                onChange={(e) => setFilter({ ...filter, university: e.target.value })}
                                className="filter-select"
                            >
                                <option value="">All Universities</option>
                                {universities.map(uni => (
                                    <option key={uni._id} value={uni._id}>{uni.name}</option>
                                ))}
                            </select>

                            {(filter.category || filter.level || filter.mode || filter.university || search) && (
                                <button onClick={clearFilters} className="clear-filters-btn">
                                    <i className="fa-solid fa-times"></i> Clear
                                </button>
                            )}
                        </div>
                    </div>
                </section>

                {/* Programs Grid */}
                <section className="main-section">
                    <div className="container">
                        {loading ? (
                            <div className="loading">
                                <div className="spinner"></div>
                                <p>Loading programs...</p>
                            </div>
                        ) : filteredPrograms.length > 0 ? (
                            <>
                                <div className="results-header">
                                    <p className="result-count">
                                        <i className="fa-solid fa-graduation-cap"></i>
                                        Showing <strong>{filteredPrograms.length}</strong> program{filteredPrograms.length !== 1 ? 's' : ''}
                                    </p>
                                    <div className="view-toggle">
                                        <button className="view-btn active">
                                            <i className="fa-solid fa-grid-2"></i>
                                        </button>
                                        <button className="view-btn inactive">
                                            <i className="fa-solid fa-list"></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="programs-grid">
                                    {filteredPrograms.map(program => (
                                        <div key={program._id} className="program-card">
                                            {program.featured && (
                                                <span className="featured-badge">
                                                    <i className="fa-solid fa-star"></i> Featured
                                                </span>
                                            )}

                                            <div className="card-header">
                                                <div className="category-wrapper">
                                                    <span className="category-badge">{program.category}</span>
                                                    <span className="level-badge">{program.level}</span>
                                                </div>
                                                <span className="mode-badge">
                                                    <i className="fa-solid fa-wifi"></i> {program.mode}
                                                </span>
                                            </div>

                                            <h3 className="card-title">{program.name}</h3>

                                            <div className="university-row">
                                                <div className="university-logo">
                                                    <img
                                                        src={program.universityId?.logo || 'https://via.placeholder.com/40x40?text=U'}
                                                        alt={program.universityId?.name}
                                                        className="uni-logo-img"
                                                        onError={(e) => {
                                                            e.target.src = 'https://via.placeholder.com/40x40?text=U';
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <p className="university-name">{program.universityId?.name || 'University'}</p>
                                                    {program.universityId?.rating && (
                                                        <span className="uni-rating">
                                                            <i className="fa-solid fa-award"></i> NAAC {program.universityId.rating}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="details-row">
                                                <span className="detail-item">
                                                    <i className="fa-solid fa-clock"></i> {program.duration}
                                                </span>
                                                <span className="detail-item">
                                                    <i className="fa-solid fa-calendar"></i> {program.semesters || '4'} Semesters
                                                </span>
                                            </div>

                                            {program.eligibility && (
                                                <p className="eligibility">
                                                    <i className="fa-solid fa-user-check"></i>
                                                    <span>Eligibility: {program.eligibility.substring(0, 50)}...</span>
                                                </p>
                                            )}

                                            <div className="fee-section">
                                                <div className="fee-info">
                                                    <span className="fee-label">Total Fee</span>
                                                    <span className="fee-amount">
                                                        ₹{Number(program.fee).toLocaleString('en-IN')}
                                                    </span>
                                                </div>
                                                <div className="emi-info">
                                                    <span className="emi-label">EMI from</span>
                                                    <span className="emi-amount">
                                                        ₹{Math.round(program.fee / 24).toLocaleString('en-IN')}/mo
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="card-actions">
                                                <Link href={`/programs/${program.slug}`} 
                                                    className="view-details-btn"
                                                >
                                                    View Details
                                                </Link>
                                                <button 
                                                    className="enroll-now-btn"
                                                    onClick={() => handleEnrollClick(program)}
                                                >
                                                    <i className="fa-solid fa-paper-plane"></i>
                                                    Enroll Now
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="empty-state">
                                <div className="empty-icon-wrapper">
                                    <i className="fa-solid fa-graduation-cap empty-icon"></i>
                                </div>
                                <h3 className="empty-title">No Programs Found</h3>
                                <p className="empty-text">
                                    We couldn't find any programs matching your criteria. 
                                    Try adjusting your search or filters.
                                </p>
                                <button onClick={clearFilters} className="empty-clear-btn">
                                    <i className="fa-solid fa-refresh"></i> Clear All Filters
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* Why Section */}
                <section className="why-section">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-badge">
                                <i className="fa-solid fa-star"></i> Why Choose Us
                            </span>
                            <h2 className="section-title">Why Our Programs Stand Out</h2>
                            <p className="section-subtitle">Industry-aligned curriculum designed for your success</p>
                        </div>

                        <div className="why-grid">
                            <div className="why-card">
                                <div className="why-icon maroon">
                                    <i className="fa-solid fa-laptop-code"></i>
                                </div>
                                <h3 className="why-card-title">100% Online Learning</h3>
                                <p className="why-card-desc">
                                    Study from anywhere with our flexible online learning platform
                                </p>
                            </div>
                            <div className="why-card">
                                <div className="why-icon blue">
                                    <i className="fa-solid fa-certificate"></i>
                                </div>
                                <h3 className="why-card-title">UGC-DEB Approved</h3>
                                <p className="why-card-desc">
                                    All programs are approved by UGC-DEB for online education
                                </p>
                            </div>
                            <div className="why-card">
                                <div className="why-icon maroon">
                                    <i className="fa-solid fa-briefcase"></i>
                                </div>
                                <h3 className="why-card-title">Career Support</h3>
                                <p className="why-card-desc">
                                    Dedicated placement assistance and career guidance
                                </p>
                            </div>
                            <div className="why-card">
                                <div className="why-icon blue">
                                    <i className="fa-solid fa-indian-rupee-sign"></i>
                                </div>
                                <h3 className="why-card-title">Affordable EMI</h3>
                                <p className="why-card-desc">
                                    Easy payment options with 0% interest EMI available
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="cta-section">
                    <div className="cta-pattern"></div>
                    <div className="container">
                        <div className="cta-content">
                            <div className="cta-icon">
                                <i className="fa-solid fa-headset"></i>
                            </div>
                            <h2 className="cta-title">Need Help Choosing a Program?</h2>
                            <p className="cta-text">
                                Our expert counselors can help you find the perfect program based on your career goals and interests.
                            </p>
                            <div className="cta-tagline">
                                <span>learn.</span>
                                <span>grow.</span>
                                <span>succeed.</span>
                            </div>
                            <div className="cta-buttons">
                                <Link href="/contact" className="cta-btn primary">
                                    <i className="fa-solid fa-phone"></i> Talk to Counselor
                                </Link>
                                <a href="https://wa.me/919876543210" className="cta-btn secondary">
                                    <i className="fa-brands fa-whatsapp"></i> WhatsApp Us
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <EnrollModal
                    isOpen={showEnrollModal}
                    onClose={() => setShowEnrollModal(false)}
                    program={selectedProgram}
                    university={selectedProgram?.universityId}
                />

                <Footer />
            </div>
        </>
    );
};

export default Programs;
