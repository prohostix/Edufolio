import { NextResponse } from 'next/server';
import University from '@/models/University';
import Program from '@/models/Program';
import connectDB from '@/lib/db';

export async function GET(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const q = searchParams.get('q');
        const limit = searchParams.get('limit') || 10;

        if (!q || q.length < 2) {
            return NextResponse.json({ universities: [], programs: [] });
        }

        const searchRegex = new RegExp(q, 'i');

        const universities = await University.find({
            isActive: true,
            $or: [
                { name: searchRegex },
                { location: searchRegex }
            ]
        })
            .select('name slug logo location')
            .limit(parseInt(limit, 10));

        const programs = await Program.find({
            isActive: true,
            $or: [
                { name: searchRegex },
                { category: searchRegex }
            ]
        })
            .populate('universityId', 'name slug')
            .select('name slug category level fee')
            .limit(parseInt(limit, 10));

        return NextResponse.json({ universities, programs });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
