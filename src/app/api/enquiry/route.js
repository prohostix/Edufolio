import { NextResponse } from 'next/server';
import Enquiry from '@/models/Enquiry';
import connectDB from '@/lib/db';

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const { name, email, phone, message, universityId, programId } = body;

        if (!name || !email || !phone) {
            return NextResponse.json({ message: 'Please provide name, email, and phone number' }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ message: 'Please provide a valid email' }, { status: 400 });
        }

        const phoneDigits = phone.replace(/\D/g, '');
        if (phoneDigits.length < 10) {
            return NextResponse.json({ message: 'Please provide a valid phone number' }, { status: 400 });
        }

        const newEnquiry = new Enquiry({
            name,
            email,
            phone,
            message: message || '',
            universityId: universityId || null,
            programId: programId || null,
            status: 'New'
        });

        await newEnquiry.save();

        return NextResponse.json({
            message: 'Thank you! Your enquiry has been submitted successfully.',
            enquiry: {
                id: newEnquiry._id,
                name: newEnquiry.name
            }
        }, { status: 201 });
    } catch (error) {
        console.error("Enquiry Error:", error);
        return NextResponse.json({ message: 'Error submitting enquiry. Please try again.' }, { status: 500 });
    }
}
