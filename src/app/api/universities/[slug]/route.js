import { NextResponse } from 'next/server';
import University from '@/models/University';
import Program from '@/models/Program';
import connectDB from '@/lib/db';

export async function GET(req, { params }) {
    try {
        await connectDB();
        const { slug } = await params;

        const university = await University.findOne({
            slug,
            isActive: true
        });

        if (!university) {
            return NextResponse.json({ message: 'University not found' }, { status: 404 });
        }

        const programs = await Program.find({
            universityId: university._id,
            isActive: true
        }).select('name slug category level duration fee mode').lean();

        return NextResponse.json({ ...university.toObject(), programs });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
