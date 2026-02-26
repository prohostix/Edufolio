import { NextResponse } from 'next/server';
import Program from '@/models/Program';
import University from '@/models/University';
import connectDB from '@/lib/db';

export async function GET(req, { params }) {
    try {
        await connectDB();
        const { slug } = await params;

        const program = await Program.findOne({
            slug,
            isActive: true
        }).populate('universityId', 'name logo location rating accreditations website');

        if (!program) {
            return NextResponse.json({ message: 'Program not found' }, { status: 404 });
        }

        const relatedPrograms = await Program.find({
            _id: { $ne: program._id },
            category: program.category,
            isActive: true
        })
            .populate('universityId', 'name logo')
            .limit(4)
            .select('name slug fee duration universityId')
            .lean();

        return NextResponse.json({ ...program.toObject(), relatedPrograms });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
