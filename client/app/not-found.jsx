import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="my-10 flex flex-col items-center justify-center gap-6 h-full">
      <h1 className="text-4xl text-primary">404 Page Not Found</h1>
      <p>This page is not yet available</p>
      <Link className="btn btn--primary px-5 py-3" href="/">
        Back to home page
      </Link>
    </section>
  );
}
