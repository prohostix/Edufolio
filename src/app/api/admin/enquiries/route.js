import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import Enquiry from '@/models/Enquiry';
import connectDB from '@/lib/db';

export const GET = withAuth(async (req) => {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const status = searchParams.get('status');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        let query = {};

        if (status && status !== 'all') query.status = status;

        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate);
            if (endDate) query.createdAt.$lte = new Date(endDate);
        }

        const enquiries = await Enquiry.find(query)
            .populate('programId', 'name slug')
            .populate('universityId', 'name slug')
            .sort('-createdAt');

        return NextResponse.json(enquiries);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
