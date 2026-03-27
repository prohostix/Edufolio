"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import API_BASE from '../api';
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

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchUniversities();
        }, 300);
        return () => clearTimeout(timer);
    }, [filter, search]);

    const fetchUniversities = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();

            if (filter.rating) params.append('rating', filter.rating);
            if (filter.featured) params.append('featured', filter.featured);
            if (search) params.append('search', search);

            const res = await axios.get(`${API_BASE}/universities?${params.toString()}`);
            setUniversities(res.data);
        } catch (err) {
            console.error('Error fetching universities:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredUniversities = universities;

    const clearFilters = () => {
        setSearch('');
        setFilter({ rating: '', featured: '' });
    };

    return (
        <>
            <style>{`
                /* ==================== UNIVERSITIES PAGE STYLES ==================== */
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
                .universities-page {
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
                .universities-hero {
                    background: linear-gradient(135deg, var(--dark-blue) 0%, #003D7A 100%);
                    padding: 100px 0 60px;
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
                    background: rgba(0, 153, 214, 0.2);
                    color: var(--light-blue);
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
                    margin-bottom: 20px;
                    color: var(--light-blue);
                    font-size: 1.1rem;
                    font-weight: 600;
                    font-style: italic;
                }

                .ugc-btns {
                    display: flex;
                    gap: 12px;
                    margin-bottom: 30px;
                    flex-wrap: wrap;
                }

                .ugc-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 20px;
                    background: rgba(255, 255, 255, 0.12);
                    color: #fff;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-radius: 10px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    text-decoration: none;
                    backdrop-filter: blur(8px);
                    transition: all 0.25s ease;
                }

                .ugc-btn i {
                    color: #ff6b6b;
                    font-size: 1rem;
                }

                .ugc-btn:hover {
                    background: rgba(255, 255, 255, 0.22);
                    border-color: rgba(255, 255, 255, 0.6);
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
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
                    width: 380px;
                    height: 300px;
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
                    height: 100px;
                    background: linear-gradient(to top, rgba(0, 82, 157, 0.6), transparent);
                }

                .floating-image {
                    position: absolute;
                    border-radius: var(--radius-lg);
                    overflow: hidden;
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
                    border: 4px solid rgba(255, 255, 255, 0.3);
                }

                .floating-image-1 {
                    top: 10px;
                    right: 20px;
                    width: 160px;
                    height: 110px;
                    animation: float1 6s ease-in-out infinite;
                }

                .floating-image-2 {
                    bottom: 40px;
                    left: 10px;
                    width: 140px;
                    height: 100px;
                    animation: float2 6s ease-in-out infinite;
                }

                .floating-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .floating-card {
                    position: absolute;
                    background: var(--white);
                    padding: 15px 20px;
                    border-radius: var(--radius-md);
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .floating-uni-card {
                    top: 30px;
                    left: 0;
                    animation: float1 5s ease-in-out infinite;
                }

                .floating-accred-card {
                    bottom: 20px;
                    right: 0;
                    animation: float2 5s ease-in-out infinite;
                }

                .floating-card-icon {
                    width: 45px;
                    height: 45px;
                    border-radius: var(--radius-md);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                }

                .floating-card-icon.gold {
                    background: #FEF3C7;
                    color: #D97706;
                }

                .floating-card-icon.blue {
                    background: rgba(0, 82, 157, 0.1);
                    color: var(--dark-blue);
                }

                .floating-card-content {
                    display: flex;
                    flex-direction: column;
                }

                .floating-card-number {
                    color: var(--text-dark);
                    font-size: 1.2rem;
                    font-weight: 800;
                }

                .floating-card-label {
                    color: var(--gray);
                    font-size: 0.75rem;
                }

                .decor-circle {
                    position: absolute;
                    border-radius: var(--radius-full);
                }

                .decor-circle-1 {
                    top: 15%;
                    right: 10%;
                    width: 70px;
                    height: 70px;
                    border: 3px solid rgba(0, 153, 214, 0.25);
                    animation: pulse 3s ease-in-out infinite;
                }

                .decor-circle-2 {
                    bottom: 20%;
                    left: 5%;
                    width: 50px;
                    height: 50px;
                    background: rgba(0, 153, 214, 0.15);
                    animation: pulse 4s ease-in-out infinite;
                }

                .decor-dots {
                    position: absolute;
                    top: 60%;
                    right: 5%;
                    width: 60px;
                    height: 60px;
                    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.3) 2px, transparent 2px);
                    background-size: 12px 12px;
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
                    border-color: var(--dark-blue);
                    box-shadow: 0 0 0 3px rgba(0, 82, 157, 0.1);
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
                    background: var(--dark-blue);
                    color: var(--white);
                    border: none;
                    border-radius: var(--radius-md);
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 1rem;
                    box-shadow: 0 4px 15px rgba(0, 82, 157, 0.3);
                    transition: all var(--transition-normal);
                    font-family: inherit;
                }

                .search-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(0, 82, 157, 0.4);
                }

                .filters {
                    display: flex;
                    gap: 15px;
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
                    padding: 12px 20px;
                    border-radius: var(--radius-sm);
                    border: 2px solid var(--light-gray);
                    font-size: 0.9rem;
                    cursor: pointer;
                    min-width: 160px;
                    background: var(--light-gray);
                    color: var(--text-dark);
                    font-weight: 500;
                    outline: none;
                    font-family: inherit;
                    transition: all var(--transition-normal);
                }

                .filter-select:focus {
                    border-color: var(--dark-blue);
                    background: var(--white);
                }

                .clear-filters-btn {
                    padding: 12px 20px;
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
                    border-top-color: var(--dark-blue);
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

                .sort-options {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .sort-label {
                    color: var(--gray);
                    font-size: 0.9rem;
                }

                .sort-select {
                    padding: 10px 15px;
                    border-radius: var(--radius-sm);
                    border: 1px solid var(--light-gray);
                    font-size: 0.9rem;
                    cursor: pointer;
                    background: var(--white);
                    color: var(--text-dark);
                    font-family: inherit;
                }

                /* ==================== UNIVERSITIES GRID ==================== */
                .universities-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
                    gap: 30px;
                }

                .university-card {
                    background: var(--white);
                    border-radius: var(--radius-xl);
                    overflow: hidden;
                    text-decoration: none;
                    box-shadow: var(--shadow-sm);
                    transition: all var(--transition-normal);
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    border: 1px solid var(--light-gray);
                }

                .university-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(0, 82, 157, 0.15);
                }

                .university-card:hover .banner-img {
                    transform: scale(1.05);
                }

                .featured-badge {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: linear-gradient(135deg, var(--maroon) 0%, var(--pink) 100%);
                    color: var(--white);
                    padding: 6px 14px;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    z-index: 2;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    box-shadow: 0 4px 10px rgba(139, 35, 70, 0.3);
                }

                .card-banner {
                    height: 160px;
                    overflow: hidden;
                    position: relative;
                }

                .banner-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform var(--transition-normal);
                }

                .banner-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 60px;
                    background: linear-gradient(to top, rgba(0, 82, 157, 0.6), transparent);
                }

                .card-content {
                    padding: 25px;
                    position: relative;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                .logo-wrapper {
                    position: absolute;
                    top: -40px;
                    left: 25px;
                    width: 80px;
                    height: 80px;
                    background: var(--white);
                    border-radius: var(--radius-lg);
                    padding: 8px;
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 3px solid var(--light-gray);
                }

                .logo {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    border-radius: var(--radius-sm);
                }

                .card-title {
                    margin-top: 45px;
                    margin-bottom: 5px;
                    color: var(--text-dark);
                    font-size: 1.25rem;
                    font-weight: 700;
                    line-height: 1.3;
                }

                .short-name {
                    color: var(--dark-blue);
                    font-size: 0.9rem;
                    margin: 0 0 10px 0;
                    font-weight: 500;
                }

                .location {
                    color: var(--gray);
                    font-size: 0.9rem;
                    margin: 0 0 15px 0;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .card-meta {
                    display: flex;
                    gap: 8px;
                    flex-wrap: wrap;
                    margin-bottom: 15px;
                }

                .rating-badge {
                    background: #FEF3C7;
                    color: #D97706;
                    padding: 6px 12px;
                    border-radius: var(--radius-sm);
                    font-size: 0.8rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }

                .acc-badge {
                    background: rgba(0, 82, 157, 0.1);
                    color: var(--dark-blue);
                    padding: 6px 12px;
                    border-radius: var(--radius-sm);
                    font-size: 0.8rem;
                    font-weight: 500;
                }

                .established {
                    color: var(--gray);
                    font-size: 0.85rem;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    margin: 0 0 15px 0;
                }

                .fee-range {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px;
                    background: var(--light-gray);
                    border-radius: var(--radius-md);
                    margin-bottom: 15px;
                    margin-top: auto;
                    flex-wrap: wrap;
                    gap: 10px;
                }

                .fee-info {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .fee-label {
                    color: var(--gray);
                    font-size: 0.8rem;
                }

                .fee-value {
                    color: var(--maroon);
                    font-weight: 700;
                    font-size: 0.95rem;
                }

                .program-count {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    color: var(--dark-blue);
                    font-size: 0.85rem;
                    background: var(--white);
                    padding: 8px 12px;
                    border-radius: var(--radius-sm);
                    font-weight: 600;
                }

                .view-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    padding: 14px;
                    background: linear-gradient(135deg, var(--dark-blue) 0%, #003D7A 100%);
                    color: var(--white);
                    border-radius: var(--radius-md);
                    font-weight: 600;
                    font-size: 0.95rem;
                    transition: all var(--transition-normal);
                }

                .university-card:hover .view-btn {
                    background: linear-gradient(135deg, #003D7A 0%, var(--dark-blue) 100%);
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
                    background: rgba(0, 82, 157, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 25px;
                }

                .empty-icon {
                    font-size: 2.5rem;
                    color: var(--dark-blue);
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
                    background: var(--dark-blue);
                    color: var(--white);
                    border: none;
                    border-radius: var(--radius-md);
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 1rem;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    box-shadow: 0 4px 15px rgba(0, 82, 157, 0.3);
                    font-family: inherit;
                    transition: all var(--transition-normal);
                }

                .empty-clear-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(0, 82, 157, 0.4);
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
                    background: rgba(139, 35, 70, 0.1);
                    color: var(--maroon);
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

                .why-icon.blue {
                    background: rgba(0, 82, 157, 0.1);
                    color: var(--dark-blue);
                }

                .why-icon.maroon {
                    background: rgba(139, 35, 70, 0.1);
                    color: var(--maroon);
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
                    background: linear-gradient(135deg, var(--dark-maroon) 0%, var(--maroon) 100%);
                    position: relative;
                    overflow: hidden;
                }

                .cta-pattern {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M40 10L50 30H30L40 10zM40 70L30 50H50L40 70zM10 40L30 30V50L10 40zM70 40L50 50V30L70 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
                    opacity: 0.5;
                    pointer-events: none;
                }

                .cta-content {
                    text-align: center;
                    max-width: 600px;
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

                .cta-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 16px 32px;
                    background: var(--light-blue);
                    color: var(--white);
                    border-radius: var(--radius-md);
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 1rem;
                    box-shadow: 0 4px 20px rgba(0, 153, 214, 0.4);
                    transition: all var(--transition-normal);
                }

                .cta-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 6px 25px rgba(0, 153, 214, 0.5);
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

                    .universities-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                /* ==================== MOBILE ==================== */
                @media screen and (max-width: 768px) {
                    .universities-hero {
                        padding: 90px 0 50px;
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
                        min-width: 140px;
                        flex-shrink: 0;
                    }

                    .main-section {
                        padding: 30px 15px;
                    }

                    .universities-grid {
                        grid-template-columns: 1fr;
                        gap: 25px;
                    }

                    .results-header {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .why-section,
                    .cta-section {
                        padding: 50px 15px;
                    }

                    .why-grid {
                        grid-template-columns: 1fr;
                        gap: 20px;
                    }

                    .fee-range {
                        flex-direction: column;
                        text-align: center;
                    }
                }

                /* ==================== SMALL MOBILE ==================== */
                @media screen and (max-width: 480px) {
                    .hero-badge {
                        font-size: 0.8rem;
                        padding: 8px 14px;
                    }

                    .card-meta {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .card-content {
                        padding: 20px;
                    }

                    .logo-wrapper {
                        width: 70px;
                        height: 70px;
                        top: -35px;
                        left: 20px;
                    }

                    .card-title {
                        margin-top: 40px;
                        font-size: 1.1rem;
                    }
                }

                /* ==================== TOUCH DEVICES ==================== */
                @media (hover: none) and (pointer: coarse) {
                    .university-card:hover,
                    .why-card:hover,
                    .search-btn:hover,
                    .cta-btn:hover {
                        transform: none;
                    }

                    .university-card:active,
                    .search-btn:active,
                    .cta-btn:active {
                        transform: scale(0.98);
                        opacity: 0.9;
                    }

                    .university-card:hover .banner-img {
                        transform: none;
                    }

                    .search-btn,
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
                .cta-btn:focus,
                .filter-select:focus,
                .university-card:focus {
                    outline: 3px solid var(--light-blue);
                    outline-offset: 2px;
                }
            `}</style>

            <div className="universities-page">
                <Navbar />

                {/* Hero Section */}
                <section className="universities-hero">
                    <div className="hero-pattern"></div>

                    <div className="hero-container">
                        <div className="hero-content">
                            <span className="hero-badge">
                                <i className="fa-solid fa-building-columns"></i>
                                Our Partners
                            </span>
                            <h1 className="hero-title">
                                Partner <span className="highlight">Universities</span>
                            </h1>
                            <p className="hero-subtitle">
                                Explore our network of accredited universities offering quality online education.
                                Choose from India's top institutions for your educational journey.
                            </p>
                            <div className="tagline">
                                <span>learn.</span>
                                <span>grow.</span>
                                <span>succeed.</span>
                            </div>

                            <div className="ugc-btns">
                                <a
                                    href="https://drive.google.com/file/d/1OOS-oIgoEb9EJ2oZfnfC4VceHW8_nAuF/view?usp=drive_link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ugc-btn"
                                >
                                    <i className="fa-solid fa-file-pdf"></i>
                                    <span>UGC Approval</span>
                                </a>
                                <a
                                    href="https://drive.google.com/file/d/1IsoYcLTa5zkOcOpyr8lwvUdhvhSZtMN1/view?usp=drive_link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ugc-btn"
                                >
                                    <i className="fa-solid fa-file-pdf"></i>
                                    <span>UGC Circular</span>
                                </a>
                            </div>

                            <div className="hero-stats">
                                <div className="hero-stat">
                                    <span className="hero-stat-number">50+</span>
                                    <span className="hero-stat-label">Universities</span>
                                </div>
                                <div className="hero-stat-divider"></div>
                                <div className="hero-stat">
                                    <span className="hero-stat-number">200+</span>
                                    <span className="hero-stat-label">Programs</span>
                                </div>
                                <div className="hero-stat-divider"></div>
                                <div className="hero-stat">
                                    <span className="hero-stat-number">100%</span>
                                    <span className="hero-stat-label">UGC Approved</span>
                                </div>
                            </div>
                        </div>

                        <div className="hero-images">
                            <div className="main-image-container">
                                <img
                                    src="https://images.unsplash.com/photo-1562774053-701939374585?w=500&h=400&fit=crop&auto=format&q=80"
                                    alt="University campus"
                                    className="main-image"
                                />
                                <div className="main-image-overlay"></div>
                            </div>

                            <div className="floating-image floating-image-1">
                                <img
                                    src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&h=150&fit=crop&auto=format&q=80"
                                    alt="Graduation ceremony"
                                    className="floating-img"
                                />
                            </div>

                            <div className="floating-image floating-image-2">
                                <img
                                    src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=180&h=130&fit=crop&auto=format&q=80"
                                    alt="Students studying"
                                    className="floating-img"
                                />
                            </div>

                            <div className="floating-card floating-uni-card">
                                <div className="floating-card-icon gold">
                                    <i className="fa-solid fa-award"></i>
                                </div>
                                <div className="floating-card-content">
                                    <span className="floating-card-number">NAAC A++</span>
                                    <span className="floating-card-label">Top Rated</span>
                                </div>
                            </div>

                            <div className="floating-card floating-accred-card">
                                <div className="floating-card-icon blue">
                                    <i className="fa-solid fa-shield-check"></i>
                                </div>
                                <div className="floating-card-content">
                                    <span className="floating-card-number">UGC-DEB</span>
                                    <span className="floating-card-label">Approved</span>
                                </div>
                            </div>

                            <div className="decor-circle decor-circle-1"></div>
                            <div className="decor-circle decor-circle-2"></div>
                            <div className="decor-dots"></div>
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
                                    placeholder="Search universities by name or location..."
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
                                <i className="fa-solid fa-filter"></i> Filter by:
                            </div>
                            <select
                                value={filter.rating}
                                onChange={(e) => setFilter({ ...filter, rating: e.target.value })}
                                className="filter-select"
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
                                className="filter-select"
                            >
                                <option value="">All Universities</option>
                                <option value="true">Featured Only</option>
                            </select>

                            {(filter.rating || filter.featured || search) && (
                                <button onClick={clearFilters} className="clear-filters-btn">
                                    <i className="fa-solid fa-times"></i> Clear All
                                </button>
                            )}
                        </div>
                    </div>
                </section>

                {/* Universities Grid */}
                <section className="main-section">
                    <div className="container">
                        {loading ? (
                            <div className="loading">
                                <div className="spinner"></div>
                                <p>Loading universities...</p>
                            </div>
                        ) : filteredUniversities.length > 0 ? (
                            <>
                                <div className="results-header">
                                    <p className="result-count">
                                        <i className="fa-solid fa-building-columns"></i>
                                        Showing <strong>{filteredUniversities.length}</strong> universit{filteredUniversities.length !== 1 ? 'ies' : 'y'}
                                    </p>
                                    <div className="sort-options">
                                        <span className="sort-label">Sort by:</span>
                                        <select className="sort-select">
                                            <option value="featured">Featured First</option>
                                            <option value="name">Name (A-Z)</option>
                                            <option value="rating">Rating</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="universities-grid">
                                    {filteredUniversities.map(university => (
                                        <Link
                                            key={university._id}
                                            href={`/universities/${university.slug}`}
                                            className="university-card"
                                        >
                                            {university.featured && (
                                                <span className="featured-badge">
                                                    <i className="fa-solid fa-star"></i> Featured
                                                </span>
                                            )}

                                            <div className="card-banner">
                                                <img
                                                    src={university.banner || 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop&auto=format&q=80'}
                                                    alt={university.name}
                                                    className="banner-img"
                                                    onError={(e) => {
                                                        e.target.src = 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop&auto=format&q=80';
                                                    }}
                                                />
                                                <div className="banner-overlay"></div>
                                            </div>

                                            <div className="card-content">
                                                <div className="logo-wrapper">
                                                    <img
                                                        src={university.logo || 'https://via.placeholder.com/70x70?text=Logo'}
                                                        alt={university.name}
                                                        className="logo"
                                                        onError={(e) => {
                                                            e.target.src = 'https://via.placeholder.com/70x70?text=Logo';
                                                        }}
                                                    />
                                                </div>

                                                <h3 className="card-title">{university.name}</h3>

                                                {university.shortName && (
                                                    <p className="short-name">({university.shortName})</p>
                                                )}

                                                <p className="location">
                                                    <i className="fa-solid fa-location-dot"></i>
                                                    {university.location || 'India'}
                                                </p>

                                                <div className="card-meta">
                                                    {university.rating && (
                                                        <span className="rating-badge">
                                                            <i className="fa-solid fa-award"></i> NAAC {university.rating}
                                                        </span>
                                                    )}
                                                    {university.accreditations?.slice(0, 2).map((acc, i) => (
                                                        <span key={i} className="acc-badge">{acc}</span>
                                                    ))}
                                                </div>

                                                {university.establishedYear && (
                                                    <p className="established">
                                                        <i className="fa-solid fa-calendar"></i>
                                                        Est. {university.establishedYear}
                                                    </p>
                                                )}

                                                <div className="fee-range">
                                                    <div className="fee-info">
                                                        <span className="fee-label">Fee Range</span>
                                                        <span className="fee-value">
                                                            ₹{Number(university.minFee || 0).toLocaleString('en-IN')} - ₹{Number(university.maxFee || 0).toLocaleString('en-IN')}
                                                        </span>
                                                    </div>
                                                    <div className="program-count">
                                                        <i className="fa-solid fa-graduation-cap"></i>
                                                        <span>{university.programCount || '10+'} Programs</span>
                                                    </div>
                                                </div>

                                                <div className="view-btn">
                                                    <span>View Details</span>
                                                    <i className="fa-solid fa-arrow-right"></i>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="empty-state">
                                <div className="empty-icon-wrapper">
                                    <i className="fa-solid fa-building-columns empty-icon"></i>
                                </div>
                                <h3 className="empty-title">No Universities Found</h3>
                                <p className="empty-text">
                                    We couldn't find any universities matching your criteria.
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
                            <h2 className="section-title">Why Our Partner Universities?</h2>
                            <p className="section-subtitle">All our partner universities meet the highest standards</p>
                        </div>

                        <div className="why-grid">
                            <div className="why-card">
                                <div className="why-icon blue">
                                    <i className="fa-solid fa-shield-check"></i>
                                </div>
                                <h3 className="why-card-title">UGC-DEB Approved</h3>
                                <p className="why-card-desc">
                                    All universities are approved by UGC-DEB for distance and online education
                                </p>
                            </div>
                            <div className="why-card">
                                <div className="why-icon maroon">
                                    <i className="fa-solid fa-award"></i>
                                </div>
                                <h3 className="why-card-title">NAAC Accredited</h3>
                                <p className="why-card-desc">
                                    Top-rated institutions with excellent NAAC grades ensuring quality
                                </p>
                            </div>
                            <div className="why-card">
                                <div className="why-icon blue">
                                    <i className="fa-solid fa-briefcase"></i>
                                </div>
                                <h3 className="why-card-title">Placement Support</h3>
                                <p className="why-card-desc">
                                    Dedicated placement cells and career support for all students
                                </p>
                            </div>
                            <div className="why-card">
                                <div className="why-icon maroon">
                                    <i className="fa-solid fa-certificate"></i>
                                </div>
                                <h3 className="why-card-title">Recognized Degrees</h3>
                                <p className="why-card-desc">
                                    Degrees valid for government jobs, higher studies, and abroad
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
                            <h2 className="cta-title">Can't find what you're looking for?</h2>
                            <p className="cta-text">
                                Our counselors can help you find the perfect university based on your requirements.
                            </p>
                            <div className="cta-tagline">
                                <span>learn.</span>
                                <span>grow.</span>
                                <span>succeed.</span>
                            </div>
                            <Link href="/contact" className="cta-btn">
                                <i className="fa-solid fa-phone"></i> Talk to a Counselor
                            </Link>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
};

export default Universities;
