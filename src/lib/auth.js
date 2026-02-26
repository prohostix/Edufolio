import jwt from 'jsonwebtoken';
import Admin from '@/models/Admin';
import connectDB from '@/lib/db';
import { NextResponse } from 'next/server';

export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret_key', {
        expiresIn: process.env.JWT_EXPIRE || '30d'
    });
};

/**
 * Wrapper for Next.js App Router API Handlers to protect routes
 * Example usage:
 * export const GET = withAuth(async (req, { params, admin }) => { ... })
 */
export const withAuth = (handler) => {
    return async (req, context) => {
        let token;

        const authHeader = req.headers.get('authorization');
        if (authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1];
        }

        if (!token) {
            return NextResponse.json({ message: 'Not authorized - No token' }, { status: 401 });
        }

        try {
            await connectDB();
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
            const admin = await Admin.findById(decoded.id).select('-password');

            if (!admin) {
                return NextResponse.json({ message: 'Not authorized - Admin not found' }, { status: 401 });
            }

            if (!admin.isActive) {
                return NextResponse.json({ message: 'Account is disabled' }, { status: 401 });
            }

            // Execute the handler with admin injected into the context or req
            return await handler(req, { ...context, admin });
        } catch (error) {
            console.error('Auth Error:', error.message);
            return NextResponse.json({ message: 'Not authorized - Invalid token' }, { status: 401 });
        }
    };
};

/**
 * Wrapper for Next.js App Router API Handlers to authorize specific roles
 * Must be used in conjunction with withAuth, but actually it's easier to just 
 * check the admin role inside the handler or within a combined withAuthorize wrapper.
 */
export const withAuthorize = (roles, handler) => {
    return withAuth(async (req, context) => {
        const { admin } = context;
        if (!roles.includes(admin.role)) {
            return NextResponse.json({
                message: `Role '${admin.role}' is not authorized to access this resource`
            }, { status: 403 });
        }
        return await handler(req, context);
    });
};
