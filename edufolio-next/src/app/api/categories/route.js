import { NextResponse } from 'next/server';
import Program from '@/models/Program';
import connectDB from '@/lib/db';

export async function GET() {
    try {
        await connectDB();
        const categories = await Program.distinct('category', { isActive: true });
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
