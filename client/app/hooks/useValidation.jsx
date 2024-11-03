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
};

// Custom validation hook
const useValidation = () => {
  const [errors, setErrors] = useState({});

  const getValidationRules = (...fields) => {
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
          type: 'pattern',
          value: fields.password ? new RegExp(`^${fields.password}$`) : null,
          message: 'Passwords do not match',
        },
      ],
    };

    // Return only the requested fields
    return Object.fromEntries(
      Object.entries(rules).filter(([key]) => fields.includes(key))
    );
  };

  // Function to validate a specific field based on rules
  const validateField = (name, value, rules = []) => {
    const fieldErrors = [];
    rules.forEach(rule => {
      if (rule.type in validationRules) {
        const error = validationRules[rule.type](
          value,
          rule.value,
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

/*
// Validation types as plain JavaScript object
const VALIDATION_TYPES = {
  REQUIRED: 'required',
  MIN_LENGTH: 'minLength',
  MAX_LENGTH: 'maxLength',
  PATTERN: 'pattern',
  EMAIL: 'email',
  MATCH: 'match',
  CUSTOM: 'custom',
};

// Enhanced validation rules
const validationRules = {
  required: value =>
    value && value.toString().trim() !== '' ? '' : 'This field is required.',

  minLength: (value, length) =>
    !value || value.length >= length
      ? ''
      : `Must be at least ${length} characters long.`,

  maxLength: (value, length) =>
    !value || value.length <= length
      ? ''
      : `Must be no more than ${length} characters long.`,

  pattern: (value, regex, message) =>
    !value || regex.test(value) ? '' : message || 'Invalid format.',

  email: value =>
    !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ? ''
      : 'Please enter a valid email address.',

  match: (value, targetValue, message) =>
    value === targetValue ? '' : message || 'Values must match.',

  custom: (value, validationFn) => validationFn(value),
};

const useValidation = (initialValues = {}) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [values, setValues] = useState(initialValues);

  // Handle input change
  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  // Handle input blur
  const handleBlur = name => {
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  // Reset form state
  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  // Validate a single field
  const validateField = (name, value, rules) => {
    const fieldErrors = [];

    rules.forEach(rule => {
      if (rule.type in validationRules) {
        const error = validationRules[rule.type](
          value,
          rule.value,
          rule.message
        );
        if (error) fieldErrors.push(error);
      }
    });

    setErrors(prev => ({ ...prev, [name]: fieldErrors }));
    return fieldErrors.length === 0;
  };

  // Validate all fields
  const validateForm = validationSchema => {
    const formErrors = {};
    let isValid = true;

    Object.keys(validationSchema).forEach(fieldName => {
      const value = values[fieldName];
      const fieldRules = validationSchema[fieldName];

      const fieldIsValid = validateField(fieldName, value, fieldRules);
      if (!fieldIsValid) {
        isValid = false;
      }
    });

    return isValid;
  };

  // Get input className based on validation state
  const getInputClassName = (fieldName, baseClassName = 'auth-input') => {
    const hasError = errors[fieldName]?.length > 0;
    const isTouched = touched[fieldName];
    const value = values[fieldName];
    const isEmpty = !value;

    return `${baseClassName} ${
      !isTouched
        ? 'border-b-slate-200 focus:border-b-slate-200'
        : isEmpty
        ? 'border-b-slate-200 focus:border-b-slate-200'
        : hasError
        ? 'border-b-red-500 focus:border-b-red-500'
        : 'border-b-green-500 focus:border-b-green-500'
    }`;
  };

  // Render field errors
  const renderFieldErrors = fieldName => {
    if (!errors[fieldName] || errors[fieldName].length === 0) return null;

    return (
      <div className="h-6 mt-2 text-sm text-red-600">
        <AlertCircle className="inline-block w-4 h-4 mr-1" />
        {errors[fieldName][0]}
      </div>
    );
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateField,
    validateForm,
    getInputClassName,
    renderFieldErrors,
    reset,
  };
};
 */

export { useValidation };
