import { NextResponse } from 'next/server';
import Admin from '@/models/Admin';
import connectDB from '@/lib/db';
import { generateToken } from '@/lib/auth';

export async function POST(req) {
    try {
        await connectDB();
        const { name, email, password, role } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ message: 'Please provide name, email, and password' }, { status: 400 });
        }

        const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });

        if (existingAdmin) {
            return NextResponse.json({ message: 'Admin with this email already exists' }, { status: 400 });
        }

        const admin = await Admin.create({
            name,
            email: email.toLowerCase(),
            password,
            role: role || 'superadmin',
            isActive: true
        });

        const token = generateToken(admin._id);

        return NextResponse.json({
            message: 'Admin created successfully',
            token,
            user: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        }, { status: 201 });
    } catch (error) {
        console.error('Register Error:', error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
