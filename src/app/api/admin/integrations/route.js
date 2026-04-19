import { NextResponse } from 'next/server';
import Integration from '@/models/integrationModel';
import connectDB from '@/lib/db';
import { withAuth } from '@/lib/auth';

export async function GET() {
    try {
        await connectDB();
        let integration = await Integration.findOne();
        if (!integration) {
            integration = await Integration.create({});
        }
        return NextResponse.json(integration);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export const PUT = withAuth(async (req) => {
    try {
        await connectDB();
        const body = await req.json();
        const { pypeCrmApiKey, pypeCrmEndpoint, isActive } = body;

        let integration = await Integration.findOne();
        if (!integration) {
            integration = new Integration();
        }

        if (pypeCrmApiKey !== undefined) integration.pypeCrmApiKey = pypeCrmApiKey;
        if (pypeCrmEndpoint !== undefined) integration.pypeCrmEndpoint = pypeCrmEndpoint;
        if (isActive !== undefined) integration.isActive = isActive;
        
        integration.updatedAt = Date.now();

        const updatedIntegration = await integration.save();
        return NextResponse.json({ message: 'Settings updated successfully', integration: updatedIntegration });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
