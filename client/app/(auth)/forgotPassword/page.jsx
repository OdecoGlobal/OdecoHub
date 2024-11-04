'use client';
import useForgotPassword from '@/app/hooks/useForgotPassword';
import useValidation from '@/app/hooks/useValidation';
import { useState } from 'react';

// style
import '../auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const { forgotPassword, isPending } = useForgotPassword();
  const {
    validateField,
    getInputClassName,
    renderFieldErrors,
    getValidationRules,
  } = useValidation();

  const handleSubmit = e => {
    e.preventDefault();
    const isFormValid = validateField('email', email, rules.email);

    if (isFormValid) {
      forgotPassword(email);
      setEmail('');
    }
  };

  const rules = getValidationRules('email');

  return (
    <section className="mt-5 lg:mt-10 px-6 lg:px-52 pb-4">
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

          <button disabled={isPending} className=" btn--primary">
            {isPending ? 'Sending email...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </section>
  );
}
