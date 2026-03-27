import { NextResponse } from 'next/server';
import Program from '@/models/Program';
import University from '@/models/University';
import connectDB from '@/lib/db';

export async function GET(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const search = searchParams.get('search');
        const category = searchParams.get('category');
        const level = searchParams.get('level');
        const universityId = searchParams.get('university');
        const minFee = searchParams.get('minFee');
        const maxFee = searchParams.get('maxFee');
        const featured = searchParams.get('featured');

        let query = { isActive: true };

        if (featured === 'true') query.featured = true;

        if (category) query.category = category;
        if (level) query.level = level;
        if (universityId) query.universityId = universityId;

        if (minFee || maxFee) {
            query.fee = {};
            if (minFee) query.fee.$gte = Number(minFee);
            if (maxFee) query.fee.$lte = Number(maxFee);
        }

        if (search) {
            query.$text = { $search: search };
        }

        const programs = await Program.find(query)
            .populate('universityId', 'name logo location rating')
            .select('name slug category level fee duration mode universityId featured')
            .sort({ featured: -1, createdAt: -1 })
            .lean();

        return NextResponse.json(programs, {
            headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' }
        });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
