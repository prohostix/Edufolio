import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import Program from '@/models/Program';
import connectDB from '@/lib/db';

export const PUT = withAuth(async (req, { params }) => {
    try {
        await connectDB();
        const id = params.id;
        const body = await req.json();

        if (body.fee) body.fee = Number(body.fee);

        const program = await Program.findByIdAndUpdate(
            id,
            { ...body, updatedAt: new Date() },
            { new: true, runValidators: true }
        ).populate('universityId', 'name slug logo');

        if (!program) {
            return NextResponse.json({ message: 'Program not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Program updated successfully!', program });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});

export const DELETE = withAuth(async (req, { params }) => {
    try {
        await connectDB();
        const program = await Program.findByIdAndDelete(params.id);

        if (!program) {
            return NextResponse.json({ message: 'Program not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Program deleted successfully' });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
