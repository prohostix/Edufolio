import { NextResponse } from 'next/server';
import Program from '@/models/Program';
import connectDB from '@/lib/db';

export async function GET() {
    try {
        await connectDB();
        const programs = await Program.find({
            isActive: true,
            featured: true
        })
            .populate('universityId', 'name logo')
            .limit(8)
            .select('name slug category level fee duration universityId')
            .lean();

        return NextResponse.json(programs);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
