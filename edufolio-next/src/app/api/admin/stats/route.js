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
            recentEnquiries
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
        ]);

        const enquiriesByStatus = await Enquiry.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        return NextResponse.json({
            stats: {
                universities: totalUniversities,
                programs: totalPrograms,
                enquiries: totalEnquiries,
                newEnquiries
            },
            enquiriesByStatus,
            recentEnquiries
        });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
