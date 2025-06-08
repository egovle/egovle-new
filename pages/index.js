import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Welcome to eGoVLE</h1>
      <p>Your trusted digital service partner in Goa.</p>
      <Link href="/login">Login</Link> | <Link href="/about">About Us</Link>
    </div>
  );
}