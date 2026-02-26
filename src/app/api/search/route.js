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

        const universities = await University.find({
            isActive: true,
            $text: { $search: q }
        })
            .select('name slug logo location')
            .limit(parseInt(limit, 10))
            .lean();

        const programs = await Program.find({
            isActive: true,
            $text: { $search: q }
        })
            .populate('universityId', 'name slug')
            .select('name slug category level fee')
            .limit(parseInt(limit, 10))
            .lean();

        // If no text results, fallback to exact name matches (optional but good for short strings)
        if (universities.length === 0 && programs.length === 0) {
            const searchRegex = new RegExp(q, 'i');
            const [fallbackUnis, fallbackProgs] = await Promise.all([
                University.find({ isActive: true, name: searchRegex }).select('name slug logo location').limit(5).lean(),
                Program.find({ isActive: true, name: searchRegex }).populate('universityId', 'name slug').select('name slug category level fee').limit(5).lean()
            ]);
            return NextResponse.json({ universities: fallbackUnis, programs: fallbackProgs });
        }

        return NextResponse.json({ universities, programs });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
