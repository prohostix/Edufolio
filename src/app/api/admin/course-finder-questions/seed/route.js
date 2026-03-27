import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import connectDB from '@/lib/db';
import CourseFinderQuestion from '@/models/CourseFinderQuestion';

const DEFAULT_QUESTIONS = [
  {
    order: 1,
    question: 'What is your highest education qualification?',
    field: 'education',
    options: [
      { value: '12th', label: '12th Pass / Higher Secondary', icon: 'fa-school' },
      { value: 'graduate', label: 'Graduate (Bachelor\'s Degree)', icon: 'fa-graduation-cap' },
      { value: 'postgraduate', label: 'Post Graduate (Master\'s)', icon: 'fa-user-graduate' },
      { value: 'working', label: 'Working Professional', icon: 'fa-briefcase' },
    ],
  },
  {
    order: 2,
    question: 'Which field interests you the most?',
    field: 'interest',
    options: [
      { value: 'business', label: 'Business & Management', icon: 'fa-chart-line', categories: ['MBA', 'BBA'] },
      { value: 'technology', label: 'Technology & IT', icon: 'fa-laptop-code', categories: ['MCA', 'BCA'] },
      { value: 'commerce', label: 'Commerce & Finance', icon: 'fa-coins', categories: ['B.Com', 'M.Com', 'MBA'] },
      { value: 'arts', label: 'Arts & Humanities', icon: 'fa-palette', categories: ['BA', 'MA'] },
      { value: 'science', label: 'Science', icon: 'fa-flask', categories: ['B.Sc', 'M.Sc'] },
    ],
  },
  {
    order: 3,
    question: 'What is your primary career goal?',
    field: 'goal',
    options: [
      { value: 'job', label: 'Get a Job / Career Switch', icon: 'fa-id-badge' },
      { value: 'promotion', label: 'Get Promotion / Salary Hike', icon: 'fa-arrow-up' },
      { value: 'business', label: 'Start Own Business', icon: 'fa-store' },
      { value: 'knowledge', label: 'Gain Knowledge & Skills', icon: 'fa-brain' },
    ],
  },
  {
    order: 4,
    question: 'What is your preferred budget range?',
    field: 'budget',
    options: [
      { value: 'low', label: 'Under ₹50,000', icon: 'fa-wallet', max: 50000 },
      { value: 'medium', label: '₹50,000 - ₹1,00,000', icon: 'fa-money-bill', min: 50000, max: 100000 },
      { value: 'high', label: '₹1,00,000 - ₹2,00,000', icon: 'fa-money-bills', min: 100000, max: 200000 },
      { value: 'premium', label: 'Above ₹2,00,000', icon: 'fa-gem', min: 200000 },
    ],
  },
  {
    order: 5,
    question: 'What is your preferred mode of learning?',
    field: 'mode',
    options: [
      { value: 'Online', label: 'Online (100% Remote)', icon: 'fa-laptop' },
      { value: 'Hybrid', label: 'Hybrid (Online + Campus)', icon: 'fa-building-user' },
      { value: 'Distance', label: 'Distance Learning', icon: 'fa-envelope-open-text' },
      { value: 'any', label: 'Any Mode is Fine', icon: 'fa-check-double' },
    ],
  },
];

export const POST = withAuth(async () => {
  try {
    await connectDB();
    const existing = await CourseFinderQuestion.countDocuments();
    if (existing > 0) {
      return NextResponse.json({ message: `Already seeded (${existing} questions exist). Delete them first to re-seed.` });
    }
    await CourseFinderQuestion.insertMany(DEFAULT_QUESTIONS);
    return NextResponse.json({ message: 'Seeded 5 default questions successfully.' });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
});
