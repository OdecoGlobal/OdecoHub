import Link from 'next/link';
import React from 'react';

export default function notFound() {
  return (
    <section>
      <h1>404 Not Found</h1>
      <p>This page is not available click below to go back to the home page</p>
      <Link className="btn--primary">Back o home page</Link>
    </section>
  );
}
