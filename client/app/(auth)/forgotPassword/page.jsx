'use client';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <section className="mt-5 lg:mt-10 px-10 pb-4">
      <div>
        <form
          className="mt-4 lg:mt-0 flex flex-col px-4"
          onSubmit={handleSubmit}
        >
          <div className="text-center mb-5">
            <h2 className="font-semibold text-4xl mb-1">
              Forgot Your Password
            </h2>
            <p>Enter your email below to reset your password</p>
          </div>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="auth-input"
          />

          <button className=" mt-3 text-center rounded-lg  px-5 py-2 text-white bg-primary ">
            Reset Password
          </button>
        </form>
      </div>
    </section>
  );
}
