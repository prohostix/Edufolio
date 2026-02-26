import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import Admin from '@/models/Admin';
import connectDB from '@/lib/db';

export const PUT = withAuth(async (req, { admin }) => {
    try {
        await connectDB();
        const { currentPassword, newPassword } = await req.json();

        if (!currentPassword || !newPassword) {
            return NextResponse.json({ message: 'Please provide current and new password' }, { status: 400 });
        }

        const adminDoc = await Admin.findById(admin._id);
        const isMatch = await adminDoc.comparePassword(currentPassword);

        if (!isMatch) {
            return NextResponse.json({ message: 'Current password is incorrect' }, { status: 401 });
        }

        adminDoc.password = newPassword;
        await adminDoc.save();

        return NextResponse.json({ message: 'Password updated successfully' });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
