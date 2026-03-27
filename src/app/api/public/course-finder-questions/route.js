import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import CourseFinderQuestion from '@/models/CourseFinderQuestion';

export async function GET() {
  try {
    await connectDB();
    const questions = await CourseFinderQuestion.find({ isActive: true })
      .sort({ order: 1 })
      .lean();
    return NextResponse.json(questions);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
