import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import University from '@/models/University';
import connectDB from '@/lib/db';

export const GET = withAuth(async (req) => {
    try {
        await connectDB();
        const universities = await University.find().sort('-createdAt');
        return NextResponse.json(universities);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});

export const POST = withAuth(async (req) => {
    try {
        await connectDB();
        const body = await req.json();
        const { name, slug, logo, banner, location, rating, accreditations, description, minFee, maxFee, featured, isActive } = body;

        if (!name || !slug || !location) {
            return NextResponse.json({ message: 'Name, slug, and location are required' }, { status: 400 });
        }

        const existing = await University.findOne({ slug: slug.toLowerCase() });
        if (existing) {
            return NextResponse.json({ message: 'A university with this slug already exists' }, { status: 400 });
        }

        const university = await University.create({
            name: name.trim(),
            slug: slug.toLowerCase().trim(),
            logo: logo || '',
            banner: banner || '',
            location: location.trim(),
            rating: rating || 'NA',
            accreditations: accreditations || [],
            description: description || '',
            minFee: Number(minFee) || 0,
            maxFee: Number(maxFee) || 0,
            featured: featured || false,
            isActive: isActive !== undefined ? isActive : true
        });

        return NextResponse.json({ message: 'University added successfully!', university }, { status: 201 });
    } catch (error) {
        console.error('Add University Error:', error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
