
import Link from 'next/link';

export default function NotFound() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#F8FAFC',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <h1 style={{ fontSize: '6rem', color: '#FF6B35', margin: 0 }}>404</h1>
            <h2 style={{ color: '#0F172A', marginBottom: '10px' }}>Page Not Found</h2>
            <p style={{ color: '#64748B', marginBottom: '30px' }}>
                The page you're looking for doesn't exist.
            </p>
            <Link
                href="/"
                style={{
                    padding: '12px 24px',
                    background: '#FF6B35',
                    color: '#fff',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    fontWeight: '600'
                }}
            >
                Go Home
            </Link>
        </div>
    );
}
