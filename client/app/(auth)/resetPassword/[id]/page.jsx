'use client';
import { useState } from 'react';
import useValidation from '@/app/hooks/useValidation';
import useResetPassword from '@/app/hooks/useResetPassword';

export default function SignUp({ params: { id } }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { resetPassword, isPending } = useResetPassword();
  const {
    validateField,
    getInputClassName,
    getValidationRules,
    renderFieldErrors,
  } = useValidation();

  const handleSubmit = e => {
    e.preventDefault();

    const isFormValid =
      validateField('password', password, rules.password) &&
      validateField('confirmPassword', confirmPassword, rules.confirmPassword);
    if (isFormValid) {
      console.log(id);
      console.log(password, confirmPassword);
      resetPassword(id, password, confirmPassword);
      setPassword('');
      setConfirmPassword('');
    }
  };

  const rules = getValidationRules('password', 'confirmPassword');

  return (
    <section className="mt-5 lg:mt-10 px-5 lg:px-52 pb-4">
      <form className="mt-4 lg:mt-0 flex flex-col px-4" onSubmit={handleSubmit}>
        <div className="text-center mb-3">
          <h2 className="font-semibold text-4xl mb-1">Reset Password</h2>
          <p className="text-sm">Enter your details below</p>
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
          {isPending ? 'Resetting Password...' : 'Reset Password'}
        </button>
      </form>
    </section>
  );
}
