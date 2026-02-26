import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import University from '@/models/University';
import Program from '@/models/Program';
import connectDB from '@/lib/db';

export const PUT = withAuth(async (req, { params }) => {
    try {
        await connectDB();
        const id = params.id;
        const body = await req.json();

        if (body.slug) {
            const existing = await University.findOne({
                slug: body.slug.toLowerCase(),
                _id: { $ne: id }
            });
            if (existing) {
                return NextResponse.json({ message: 'This slug is already in use' }, { status: 400 });
            }
            body.slug = body.slug.toLowerCase();
        }

        if (body.minFee) body.minFee = Number(body.minFee);
        if (body.maxFee) body.maxFee = Number(body.maxFee);

        const university = await University.findByIdAndUpdate(
            id,
            { ...body, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!university) {
            return NextResponse.json({ message: 'University not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'University updated successfully!', university });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});

export const DELETE = withAuth(async (req, { params }) => {
    try {
        await connectDB();
        const id = params.id;

        const university = await University.findById(id);
        if (!university) {
            return NextResponse.json({ message: 'University not found' }, { status: 404 });
        }

        const deletedPrograms = await Program.deleteMany({ universityId: id });
        await University.findByIdAndDelete(id);

        return NextResponse.json({
            message: `University and ${deletedPrograms.deletedCount} associated programs deleted`
        });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
