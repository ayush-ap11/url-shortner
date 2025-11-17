// Form validation utilities

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const minLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);

  return {
    isValid: minLength && hasUpperCase && hasLowerCase && hasNumber,
    errors: {
      minLength: !minLength ? "Password must be at least 8 characters" : null,
      hasUpperCase: !hasUpperCase
        ? "Password must contain an uppercase letter"
        : null,
      hasLowerCase: !hasLowerCase
        ? "Password must contain a lowercase letter"
        : null,
      hasNumber: !hasNumber ? "Password must contain a number" : null,
    },
  };
};

export const validatePhone = (phone) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
};

export const validateName = (name) => {
  return name && name.trim().length >= 2;
};

export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
