import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Enquiry from '@/models/Enquiry';

export async function PATCH(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await req.json();
        const { programId, universityId } = body;

        if (!id) {
            return NextResponse.json({ message: 'Enquiry ID is required' }, { status: 400 });
        }

        const updatedEnquiry = await Enquiry.findByIdAndUpdate(
            id,
            { 
                $set: { 
                    programId: programId || undefined,
                    universityId: universityId || undefined
                } 
            },
            { new: true }
        );

        if (!updatedEnquiry) {
            return NextResponse.json({ message: 'Enquiry not found' }, { status: 404 });
        }

        return NextResponse.json({
            message: 'Enquiry updated successfully',
            enquiry: updatedEnquiry
        }, { status: 200 });
    } catch (error) {
        console.error("Update Enquiry Error:", error);
        return NextResponse.json({ message: 'Error updating enquiry' }, { status: 500 });
    }
}
