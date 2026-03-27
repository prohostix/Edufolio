import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import connectDB from '@/lib/db';
import CourseFinderQuestion from '@/models/CourseFinderQuestion';

// GET all questions (admin)
export const GET = withAuth(async () => {
  try {
    await connectDB();
    const questions = await CourseFinderQuestion.find().sort({ order: 1 }).lean();
    return NextResponse.json(questions);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
});

// POST create new question
export const POST = withAuth(async (req) => {
  try {
    await connectDB();
    const body = await req.json();
    const { question, field, order, options, isActive } = body;

    if (!question || !field || !options?.length) {
      return NextResponse.json({ message: 'question, field, and options are required' }, { status: 400 });
    }

    const q = await CourseFinderQuestion.create({ question, field, order: order ?? 0, options, isActive: isActive ?? true });
    return NextResponse.json(q, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
});
