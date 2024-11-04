import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import '../(auth)/auth.css';

// Validation rules for specific validation types
const validationRules = {
  required: value => (value ? '' : 'This field is required.'),
  minLength: (value, length) =>
    value.length >= length ? '' : `Must be at least ${length} characters long.`,
  pattern: (value, regex, message) =>
    regex && regex.test(value) ? '' : message || 'Invalid format.',
  validate: (value, validationFn, message) =>
    validationFn && validationFn(value) ? '' : message || 'Validation failed.',
};

const useValidation = () => {
  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState({});

  const getValidationRules = (...fieldNames) => {
    const rules = {
      name: [{ type: 'required' }, { type: 'minLength', value: 3 }],
      userName: [{ type: 'required' }, { type: 'minLength', value: 3 }],
      email: [
        { type: 'required' },
        {
          type: 'pattern',
          value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
          message: 'Invalid email format',
        },
      ],
      password: [
        { type: 'required' },
        { type: 'minLength', value: 8 },
        {
          type: 'pattern',
          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
          message: 'Password must contain at least one letter and one number',
        },
      ],
      confirmPassword: [
        { type: 'required' },
        {
          type: 'validate',
          validate: value => value === fields.password,
          message: 'Passwords do not match',
        },
      ],
    };

    // Add the return statement here
    return Object.fromEntries(
      Object.entries(rules).filter(([key]) => fieldNames.includes(key))
    );
  };

  // Also, in validateField, we need to handle validate type differently
  const validateField = (name, value, rules) => {
    setFields(prev => ({ ...prev, [name]: value }));
    const fieldErrors = [];
    rules.forEach(rule => {
      if (rule.type in validationRules) {
        const error = validationRules[rule.type](
          value,
          rule.type === 'validate' ? rule.validate : rule.value,
          rule.message
        );
        if (error) fieldErrors.push(error);
      }
    });
    setErrors(prevErrors => ({ ...prevErrors, [name]: fieldErrors }));
    return fieldErrors.length === 0;
  };

  // Function to get the class name for input fields based on validation status
  const getInputClassName = (fieldName, value) => {
    const hasError = errors[fieldName] && errors[fieldName].length > 0;
    const isEmpty = !value;

    return `auth-input ${
      isEmpty
        ? 'border-b-slate-200 focus:border-b-primary'
        : hasError
        ? 'border-b-red-500 focus:border-b-red-500'
        : 'border-b-green-500 focus:border-b-green-500'
    }`;
  };

  // Function to render field-specific error messages
  const renderFieldErrors = fieldName => {
    if (!errors[fieldName] || errors[fieldName].length === 0) return null;

    return (
      <div className=" h-6 mt-2 text-sm text-red-600">
        <AlertCircle className="inline-block w-4 h-4 mr-1" />
        {errors[fieldName][0]}
      </div>
    );
  };

  return {
    errors,
    validateField,
    getInputClassName,
    renderFieldErrors,
    getValidationRules,
  };
};

export default useValidation;
