import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { withAuth } from '@/lib/auth';
import Enquiry from '@/models/Enquiry';
import connectDB from '@/lib/db';

export const PUT = withAuth(async (req, { params }) => {
    try {
        await connectDB();
        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: 'Invalid Enquiry ID' }, { status: 400 });
        }

        const { status, notes } = await req.json();

        const updateData = {};
        if (status) updateData.status = status;
        if (notes !== undefined) updateData.notes = notes;

        const enquiry = await Enquiry.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        )
            .populate('programId', 'name')
            .populate('universityId', 'name');

        if (!enquiry) {
            return NextResponse.json({ message: 'Enquiry not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Enquiry updated', enquiry });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});

export const DELETE = withAuth(async (req, { params }) => {
    try {
        await connectDB();
        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: 'Invalid Enquiry ID' }, { status: 400 });
        }

        const enquiry = await Enquiry.findByIdAndDelete(id);

        if (!enquiry) {
            return NextResponse.json({ message: 'Enquiry not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Enquiry deleted' });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
