const validator = require("validator");

function validateRegister({ name, email, password, phone }) {
  const errors = [];
  if (!name || String(name).trim().length < 2)
    errors.push("Name is required (min 2 chars).");
  if (!email || !validator.isEmail(String(email)))
    errors.push("Valid email is required.");
  if (!password || String(password).length < 6)
    errors.push("Password must be at least 6 characters.");
  if (phone && !validator.isMobilePhone(String(phone))) {
    // don't force phone; just validate if present
    errors.push("Phone number is invalid.");
  }
  return errors;
}

function validateLogin({ email, password }) {
  const errors = [];
  if (!email || !validator.isEmail(String(email)))
    errors.push("Valid email is required.");
  if (!password || String(password).length < 6)
    errors.push("Password must be at least 6 characters.");
  return errors;
}

module.exports = { validateRegister, validateLogin };
