'use client';
import { useState } from 'react';

import Link from 'next/link';

export default function SignUp() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log(password, confirmPassword);
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <section className="mt-5 lg:mt-10 px-10 pb-4">
      <form className="mt-4 lg:mt-0 flex flex-col px-4" onSubmit={handleSubmit}>
        <div className="text-center mb-3">
          <h2 className="font-semibold text-4xl mb-1">Reset Password</h2>
          <p className="text-sm">Enter your details below</p>
        </div>

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
          Reset Password
        </button>
      </form>
    </section>
  );
}
