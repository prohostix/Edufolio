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
            .select('name slug logo banner location rating')
            .limit(6)
            .lean();

        return NextResponse.json(universities, {
            headers: { 'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=600' }
        });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
