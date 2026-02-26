import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Save to public/uploads
        const uploadDir = join(process.cwd(), 'public/uploads');
        await mkdir(uploadDir, { recursive: true });

        const uniqueName = Date.now() + '-' + file.name.replace(/\s+/g, '-');
        const path = join(uploadDir, uniqueName);

        await writeFile(path, buffer);

        // Return protocol dynamically if possible, or relative path
        const fileUrl = `/uploads/${uniqueName}`;

        return NextResponse.json({
            message: 'File uploaded successfully',
            url: fileUrl,
            filename: uniqueName
        });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
