import { NextResponse } from 'next/server';
import University from '@/models/University';
import connectDB from '@/lib/db';

export async function GET(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const search = searchParams.get('search');
        const rating = searchParams.get('rating');
        const featured = searchParams.get('featured');

        let query = { isActive: true };

        if (rating) query.rating = rating;
        if (featured === 'true') query.featured = true;

        if (search) {
            query.$text = { $search: search };
        }

        const universities = await University.find(query)
            .select('name slug logo banner location rating featured establishedYear shortName')
            .sort({ featured: -1, createdAt: -1 })
            .lean();

        return NextResponse.json(universities, {
            headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' }
        });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
