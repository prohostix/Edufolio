import { NextResponse } from 'next/server';
import University from '@/models/University';
import connectDB from '@/lib/db';

export async function GET() {
    try {
        await connectDB();
        const universities = await University.find({
            isActive: true,
            featured: true
        })
            .limit(6)
            .select('name slug logo banner location rating')
            .lean();

        return NextResponse.json(universities);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
