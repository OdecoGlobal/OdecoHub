'use client';
import { useState } from 'react';
import SideImage from '../SideImage';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <section className="mt-5 lg:mt-10 px-10 pb-4 flex flex-row justify-evenly">
      <SideImage />
      <div>
        <form
          className="mt-4 lg:mt-0 flex flex-col px-4"
          onSubmit={handleSubmit}
        >
          <div className="text-center mb-5">
            <h2 className="font-semibold text-4xl mb-1">Log in to Odecohub</h2>
            <p>Enter your details below</p>
          </div>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="auth-input"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="auth-input"
            required
          />
          <div className="flex items-center justify-between">
            <button className=" mt-3 text-center rounded-lg  px-5 py-2 text-white bg-primary ">
              Log In
            </button>
            <Link
              href="/forgotPassword"
              className="text-primary hover:border focus:border-b-primary"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
        <p className=" mt-2 text-center text-slate-400">
          Don't have an account?{' '}
          <Link className="font-bold underline" href="/signup">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}
