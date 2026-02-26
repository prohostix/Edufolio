import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import Program from '@/models/Program';
import University from '@/models/University';
import connectDB from '@/lib/db';

export const GET = withAuth(async (req) => {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const universityId = searchParams.get('universityId');

        let query = {};
        if (universityId) query.universityId = universityId;

        const programs = await Program.find(query)
            .populate('universityId', 'name slug logo')
            .sort('-createdAt')
            .lean();

        return NextResponse.json(programs);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});

export const POST = withAuth(async (req) => {
    try {
        await connectDB();
        const body = await req.json();
        const { universityId, name, category, level, duration, mode, fee, feePeriod, description, eligibility, image, isActive } = body;

        if (!universityId || !name || !category || !level || !duration || !fee || !description) {
            return NextResponse.json({ message: 'Please fill all required fields' }, { status: 400 });
        }

        const university = await University.findById(universityId);
        if (!university) {
            return NextResponse.json({ message: 'University not found' }, { status: 400 });
        }

        const program = await Program.create({
            universityId,
            name: name.trim(),
            category,
            level,
            duration,
            mode: mode || 'Online',
            fee: Number(fee),
            feePeriod: feePeriod || 'Total',
            description,
            eligibility: eligibility || 'Graduate',
            image: image || '',
            isActive: isActive !== undefined ? isActive : true
        });

        await program.populate('universityId', 'name slug logo');

        return NextResponse.json({ message: 'Program added successfully!', program }, { status: 201 });
    } catch (error) {
        if (error.code === 11000) {
            return NextResponse.json({ message: 'A program with this name already exists' }, { status: 400 });
        }
        console.error('Add Program Error:', error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
