import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(req) {
    try {
        const formData = await req.formData();
        const rawFiles = formData.getAll('files');

        if (!rawFiles || rawFiles.length === 0) {
            return NextResponse.json({ message: 'No files uploaded' }, { status: 400 });
        }

        const uploadDir = join(process.cwd(), 'public/uploads');
        await mkdir(uploadDir, { recursive: true });

        let files = [];
        for (const file of rawFiles) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uniqueName = Date.now() + '-' + file.name.replace(/\s+/g, '-');
            const path = join(uploadDir, uniqueName);

            await writeFile(path, buffer);
            const fileUrl = `/uploads/${uniqueName}`;

            files.push({
                url: fileUrl,
                filename: uniqueName
            });
        }

        return NextResponse.json({ message: 'Files uploaded', files });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
