import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import connectDB from '@/lib/db';
import CourseFinderQuestion from '@/models/CourseFinderQuestion';

// PUT update question
export const PUT = withAuth(async (req, { params }) => {
  try {
    const { id } = await params;
    await connectDB();
    const body = await req.json();
    const updated = await CourseFinderQuestion.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );
    if (!updated) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
});

// DELETE question
export const DELETE = withAuth(async (req, { params }) => {
  try {
    const { id } = await params;
    await connectDB();
    const deleted = await CourseFinderQuestion.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
});
