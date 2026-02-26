"use client";
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import API_BASE from '../api';

const GlobalSeo = () => {
    const [seo, setSeo] = useState({
        title: 'Edufolio - Find Your Dream University',
        description: 'Discover top online universities and programs for your education.',
        keywords: 'education, online degrees, universities',
        author: 'Edufolio',
        ogImage: ''
    });

    useEffect(() => {
        const fetchSeo = async () => {
            try {
                const res = await axios.get(`${API_BASE}/seo`);
                // Only update if we got valid data
                if (res.data) {
                    setSeo(prev => ({
                        ...prev,
                        ...res.data
                    }));
                }
            } catch (error) {
                console.error('Failed to fetch global SEO settings:', error);
            }
        };

        fetchSeo();
    }, []);

    return (
        <Helmet>
            <title>{seo.title}</title>
            <meta name="description" content={seo.description} />
            <meta name="keywords" content={seo.keywords} />
            <meta name="author" content={seo.author} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:description" content={seo.description} />
            {seo.ogImage && <meta name="twitter:image" content={seo.ogImage} />}
        </Helmet>
    );
};

export default GlobalSeo;
