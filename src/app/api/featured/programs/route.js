import { NextResponse } from 'next/server';
import Program from '@/models/Program';
import University from '@/models/University';
import connectDB from '@/lib/db';

export async function GET() {
    try {
        await connectDB();
        const programs = await Program.find({
            isActive: true,
            featured: true
        })
            .populate('universityId', 'name logo')
            .select('name slug category level fee duration universityId')
            .limit(8)
            .lean();

        return NextResponse.json(programs);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
