import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { withAuth } from '@/lib/auth';
import Program from '@/models/Program';
import connectDB from '@/lib/db';

export const GET = withAuth(async (req, { params }) => {
    try {
        await connectDB();
        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: 'Invalid Program ID' }, { status: 400 });
        }

        const program = await Program.findById(id).populate('universityId', 'name slug logo');

        if (!program) {
            return NextResponse.json({ message: 'Program not found' }, { status: 404 });
        }

        return NextResponse.json(program);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});

export const PUT = withAuth(async (req, { params }) => {
    try {
        await connectDB();
        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: 'Invalid Program ID' }, { status: 400 });
        }

        const body = await req.json();

        if (body.fee) body.fee = Number(body.fee);

        const program = await Program.findByIdAndUpdate(
            id,
            body,
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
        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: 'Invalid Program ID' }, { status: 400 });
        }

        const program = await Program.findByIdAndDelete(id);

        if (!program) {
            return NextResponse.json({ message: 'Program not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Program deleted successfully' });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
