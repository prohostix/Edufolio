import { NextResponse } from 'next/server';
import Enquiry from '@/models/Enquiry';
import Integration from '@/models/integrationModel';
import University from '@/models/University';
import Program from '@/models/Program';
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

        // PypeCRM Integration: Send lead to CRM if active
        try {
            const integration = await Integration.findOne({ isActive: true });
            if (integration && integration.pypeCrmApiKey) {
                // Fetch University and Program names for context
                let enquiryAbout = 'General Inquiry';
                if (universityId || programId) {
                    const [uni, prog] = await Promise.all([
                        universityId ? University.findById(universityId).select('name') : null,
                        programId ? Program.findById(programId).select('name') : null
                    ]);
                    
                    if (uni && prog) {
                        enquiryAbout = `${prog.name} at ${uni.name}`;
                    } else if (uni) {
                        enquiryAbout = `University: ${uni.name}`;
                    } else if (prog) {
                        enquiryAbout = `Program: ${prog.name}`;
                    }
                }

                // Forward enquiry to PypeCRM asynchronously
                fetch(integration.pypeCrmEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${integration.pypeCrmApiKey}`
                    },
                    body: JSON.stringify({
                        apiKey: integration.pypeCrmApiKey,
                        api_key: integration.pypeCrmApiKey, // Include both common formats
                        name,
                        email,
                        phone,
                        message: message || '',
                        source: 'Edufolio Website',
                        universityId: universityId || undefined,
                        programId: programId || undefined,
                        enquiryAbout, // Added descriptive field
                        enquiryId: newEnquiry._id
                    })
                }).catch(crmErr => console.error("PypeCRM API Error:", crmErr));
            }
        } catch (settingsErr) {
            console.error("CRM Settings Error:", settingsErr);
        }

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
