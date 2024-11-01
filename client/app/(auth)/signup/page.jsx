'use client';
import { useState } from 'react';
import SideImage from '../SideImage';
import Link from 'next/link';

export default function SignUp() {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log(name, email, userName, password);
  };

  return (
    <section className="mt-5 lg:mt-10 px-10 pb-4 flex flex-row justify-evenly">
      <SideImage />
      <div>
        <form
          className="mt-4 lg:mt-0 flex flex-col px-4"
          onSubmit={handleSubmit}
        >
          <div className="text-center mb-3">
            <h2 className="font-semibold text-4xl mb-1">Create an account</h2>
            <p className="text-sm">Enter your details below</p>
          </div>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="auth-input"
          />

          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            required
            className="auth-input"
          />

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

          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            className="auth-input"
          />

          <button className=" mt-3 text-center rounded-lg w-full py-2 text-white bg-primary">
            Create Account
          </button>
        </form>
        <p className=" mt-2 text-center text-slate-400">
          Already have account?{' '}
          <Link className="font-bold underline" href="/login">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
}
