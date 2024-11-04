'use client';
import { useState } from 'react';
import SideImage from '../SideImage';
import useLogin from '@/app/hooks/useLogin';
import Link from 'next/link';
import useValidation from '@/app/hooks/useValidation';

// style
import '../auth.css';

export default function Login() {
  const {
    validateField,
    getInputClassName,
    renderFieldErrors,
    getValidationRules,
  } = useValidation();
  const { login, isPending } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const isFormValid =
      validateField('email', email, rules.email) &&
      validateField('password', password, rules.password);
    if (isFormValid) {
      login(email, password);
      setEmail('');
      setPassword('');
    }
  };

  const rules = getValidationRules('email', 'password');

  return (
    <section className="mt-5 lg:mt-10 pb-4 px-4 lg:flex flex-row justify-evenly">
      <SideImage />
      <div>
        <form className="mt-4 lg:mt-0" onSubmit={handleSubmit}>
          <div className="text-center mb-5">
            <h2 className="font-semibold text-3xl lg:text-4xl mb-1">
              Log in to Odecohub
            </h2>
            <p>Enter your details below</p>
          </div>

          <div className="auth-div">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                validateField('email', e.target.value, rules.email);
              }}
              className={getInputClassName('email', email)}
            />
            {renderFieldErrors('email')}
          </div>

          <div className="auth-div">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                validateField('password', e.target.value, rules.password);
              }}
              className={getInputClassName('password', password)}
            />
            {renderFieldErrors('password')}
          </div>

          <div className="flex items-center justify-between">
            <button disabled={isPending} className=" btn--primary px-5">
              {isPending ? 'Logging In....' : 'Log In'}
            </button>
            <Link
              href="/forgotPassword"
              className="text-primary hover:text-slate-400"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
        <p className=" mt-2 text-center text-slate-400 ">
          Don't have an account?{' '}
          <Link
            className="font-bold underline hover:text-primary"
            href="/signup"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}
