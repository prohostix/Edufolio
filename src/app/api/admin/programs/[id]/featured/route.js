import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { withAuth } from '@/lib/auth';
import Program from '@/models/Program';
import connectDB from '@/lib/db';

export const PATCH = withAuth(async (req, { params }) => {
    try {
        await connectDB();
        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: 'Invalid Program ID' }, { status: 400 });
        }

        const program = await Program.findById(id);
        
        if (!program) {
            return NextResponse.json({ message: 'Program not found' }, { status: 404 });
        }

        // Toggle the featured status
        program.featured = !program.featured;
        await program.save();

        return NextResponse.json({ 
            message: `Program ${program.featured ? 'featured' : 'unfeatured'} successfully!`, 
            featured: program.featured 
        });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
