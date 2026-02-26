import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';

export const GET = withAuth(async (req, { admin }) => {
    return NextResponse.json({
        valid: true,
        user: {
            id: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.role
        }
    });
});
