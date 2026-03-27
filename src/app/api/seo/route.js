import { NextResponse } from 'next/server';
import SEO from '@/models/seoModel';
import connectDB from '@/lib/db';
import { withAuth } from '@/lib/auth';

export async function GET() {
    try {
        await connectDB();
        let seo = await SEO.findOne();
        if (!seo) {
            seo = await SEO.create({});
        }
        return NextResponse.json(seo, {
            headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600' }
        });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export const PUT = withAuth(async (req) => {
    try {
        await connectDB();
        const body = await req.json();
        const { title, description, keywords, author, ogImage } = body;

        let seo = await SEO.findOne();
        if (!seo) {
            seo = new SEO();
        }

        seo.title = title || seo.title;
        seo.description = description || seo.description;
        seo.keywords = keywords || seo.keywords;
        seo.author = author || seo.author;
        seo.ogImage = ogImage || seo.ogImage;
        seo.updatedAt = Date.now();

        const updatedSeo = await seo.save();
        return NextResponse.json({ message: 'SEO settings updated successfully', seo: updatedSeo });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
