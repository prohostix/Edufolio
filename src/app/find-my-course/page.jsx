"use client";
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CourseFinder from '../../components/CourseFinder';

export default function FindMyCoursePage() {
    return (
        <div style={{ background: '#F8FAFC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            
            <main style={{ flex: 1, paddingTop: '100px', paddingBottom: '60px' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '15px' }}>
                            Course <span style={{ color: '#FF6B35' }}>Finder</span>
                        </h1>
                        <p style={{ fontSize: '1.1rem', color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>
                            Answer a few questions about your background and interests, and we'll recommend the best programs for your career.
                        </p>
                    </div>

                    <CourseFinder standalone={true} />
                </div>
            </main>

            <Footer />
        </div>
    );
}
