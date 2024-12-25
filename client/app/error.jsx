'use client';
import Link from 'next/link';

export default function ErrorBoundary({ error }) {
  return (
    <section className="my-10 flex flex-col items-center justify-center gap-6 h-full">
      <h1 className="text-4xl text-primary">Unauthorized Access</h1>
      <p className="text-lg text-center">{error.message}</p>
      <Link className="btn btn--primary px-5 py-3" href="/login">
        Login
      </Link>
    </section>
  );
}
