"use client";
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
    return (
        <div className="font-outfit bg-gray-50 min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Privacy Policy</h1>

                <div className="bg-white p-8 rounded-xl shadow-sm space-y-6 text-gray-600 leading-relaxed">
                    <p>
                        Privacy Policy will be updated shortly.
                    </p>
                    <p>
                        EDU FOLIO PRIVATE LIMITED is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share your personal information.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
