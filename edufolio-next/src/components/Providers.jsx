"use client";

import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { DataProvider } from '../context/DataContext';

import { HelmetProvider } from 'react-helmet-async';
import GlobalSeo from './GlobalSeo';

export function Providers({ children }) {
    return (
        <HelmetProvider>
            <AuthProvider>
                <DataProvider>
                    <GlobalSeo />
                    {children}
                </DataProvider>
            </AuthProvider>
        </HelmetProvider>
    );
}
