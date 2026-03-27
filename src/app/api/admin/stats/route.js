import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import University from '@/models/University';
import Program from '@/models/Program';
import Enquiry from '@/models/Enquiry';
import connectDB from '@/lib/db';

export const GET = withAuth(async (req, { admin }) => {
    try {
        await connectDB();
        const [
            totalUniversities,
            totalPrograms,
            totalEnquiries,
            newEnquiries,
            recentEnquiriesResult,
            enquiriesByStatusResult
        ] = await Promise.all([
            University.countDocuments(),
            Program.countDocuments(),
            Enquiry.countDocuments(),
            Enquiry.countDocuments({ status: 'New' }),
            Enquiry.find()
                .sort('-createdAt')
                .limit(5)
                .populate('programId', 'name')
                .populate('universityId', 'name')
                .lean(),
            Enquiry.aggregate([
                { $group: { _id: '$status', count: { $sum: 1 } } }
            ])
        ]);

        const recentEnquiries = recentEnquiriesResult || [];
        const enquiriesByStatus = enquiriesByStatusResult || [];

        return NextResponse.json({
            stats: {
                universities: totalUniversities || 0,
                programs: totalPrograms || 0,
                enquiries: totalEnquiries || 0,
                newEnquiries: newEnquiries || 0
            },
            enquiriesByStatus,
            recentEnquiries
        });
    } catch (error) {
        console.error('Stats API Error:', error);
        return NextResponse.json({ 
            message: 'Error fetching stats', 
            error: error.message,
            stats: { universities: 0, programs: 0, enquiries: 0, newEnquiries: 0 },
            enquiriesByStatus: [],
            recentEnquiries: []
        }, { status: 500 });
    }
});
