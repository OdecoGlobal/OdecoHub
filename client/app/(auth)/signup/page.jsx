'use client';
import { useState } from 'react';
import SideImage from '../SideImage';
import Link from 'next/link';
import useSignup from '@/app/hooks/useSignup';
import useValidation from '@/app/hooks/useValidation';

// style
import '../auth.css';

export default function SignUp() {
  const {
    validateField,
    getInputClassName,
    renderFieldErrors,
    getValidationRules,
  } = useValidation();
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup, isPending } = useSignup();

  const handleSubmit = async e => {
    e.preventDefault();

    const isFormValid =
      validateField('name', name, rules.name) &&
      validateField('userName', userName, rules.userName) &&
      validateField('email', email, rules.email) &&
      validateField('password', password, rules.password) &&
      validateField('confirmPassword', confirmPassword, rules.confirmPassword);

    if (isFormValid) {
      signup(name, email, userName, password, confirmPassword);
    }
  };

  const rules = getValidationRules(
    'name',
    'userName',
    'email',
    'password',
    'confirmPassword'
  );
  return (
    <section className="mt-5 lg:mt-10 px-6 lg:px-10 pb-4 lg:flex flex-row justify-evenly">
      <SideImage />
      <div>
        <form className="mt-4 lg:mt-0 lg:flex flex-col" onSubmit={handleSubmit}>
          <div className="text-center mb-3">
            <h2 className="font-semibold text-xl lg:text-4xl mb-1">
              Create an account
            </h2>
            <p className="text-sm">Enter your details below</p>
          </div>

          <div className="auth-div">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => {
                setName(e.target.value);
                validateField('name', e.target.value, rules.name);
              }}
              className={getInputClassName('name', name)}
            />
            {renderFieldErrors('name')}
          </div>

          <div className="auth-div">
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={e => {
                setUserName(e.target.value);
                validateField('userName', e.target.value, rules.userName);
              }}
              className={getInputClassName('userName', userName)}
            />
            {renderFieldErrors('userName')}
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
          <div className="auth-div">
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={e => {
                setConfirmPassword(e.target.value);
                validateField(
                  'confirmPassword',
                  e.target.value,
                  rules.confirmPassword
                );
              }}
              className={getInputClassName('confirmPassword', confirmPassword)}
            />
            {renderFieldErrors('confirmPassword')}
          </div>

          <button disabled={isPending} className="w-full btn--primary">
            {isPending ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        <p className=" mt-2 text-center text-slate-400">
          Already have account?{' '}
          <Link
            className="font-bold underline hover:text-primary"
            href="/login"
          >
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
}
