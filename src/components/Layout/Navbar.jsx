"use client";
import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  const navStyle = {
    background: 'white',
    padding: '1rem 2rem',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  return (
    <nav style={navStyle}>
      <Link href="/" style={{ textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold', color: '#0F172A' }}>
        Edufolio.
      </Link>
      <div>
        <Link href="/" style={{ margin: '0 15px', textDecoration: 'none', color: '#64748B' }}>Home</Link>
        <Link href="/admin" style={{ margin: '0 15px', textDecoration: 'none', color: '#64748B' }}>Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;