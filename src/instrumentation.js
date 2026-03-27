// Runs once when the Next.js server starts — warms up the DB connection
// so the first user request doesn't pay the cold-start penalty.
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { default: connectDB } = await import('./lib/db.js');
    try {
      await connectDB();
      console.log('🔥 DB warmed up at server start');
    } catch (e) {
      console.error('⚠️  DB warmup failed:', e.message);
    }
  }
}
