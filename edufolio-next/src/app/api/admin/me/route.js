import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';

export const GET = withAuth(async (req, { admin }) => {
    try {
        return NextResponse.json({
            id: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.role
        });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
