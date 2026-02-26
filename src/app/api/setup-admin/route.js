import { NextResponse } from 'next/server';
import Admin from '@/models/Admin';
import connectDB from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        await connectDB();
        const existing = await Admin.findOne({ email: 'admin@edufolio.com' });

        if (existing) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await Admin.updateOne(
                { email: 'admin@edufolio.com' },
                { password: hashedPassword, isActive: true }
            );
            return NextResponse.json({
                message: 'Admin exists! Password reset to: admin123',
                email: 'admin@edufolio.com'
            });
        }

        const hashedPassword = await bcrypt.hash('admin123', 10);
        const admin = new Admin({
            name: 'Admin',
            email: 'admin@edufolio.com',
            password: hashedPassword,
            role: 'superadmin',
            isActive: true
        });

        await admin.save();
        return NextResponse.json({
            message: 'Admin created successfully!',
            credentials: {
                email: 'admin@edufolio.com',
                password: 'admin123'
            }
        });
    } catch (error) {
        console.error('Setup error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
