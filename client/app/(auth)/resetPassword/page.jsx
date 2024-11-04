import Link from 'next/link';

export default function resetPassword() {
  return (
    <section className="mt-5 lg:mt-10 px-10 pb-4 flex flex-row justify-evenly">
      <div className="text-center mb-5">
        <p className="font-semibold text-xl mb-1">
          Check your email and click on link to reset your password
        </p>
        <p className=" mt-2 text-center text-slate-400">
          Didn't request to reset your account?{' '}
          <Link
            className="font-bold hover:text-primary underline"
            href="/login"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
