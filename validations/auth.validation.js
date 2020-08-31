const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = {
  validateRegister: (data) => {
    const errors = {};
    const { firstName, lastName, username, password, password2 } = data;

    if (!firstName) {
      errors.firstName = 'First name field is required.';
    }

    if (!lastName) {
      errors.lastName = 'Last name field is required.';
    }

    if (username) {
      if (!Validator.isLength(username, { min: 6, max: 30 })) {
        errors.username = 'Username must be at least 6 characters.';
      }
    } else {
      errors.username = 'Username field is required.';
    }

    if (password) {
      if (!Validator.isLength(password, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters.';
      }
    } else {
      errors.password = 'Password field is required.';
    }

    if (password2) {
      if (!Validator.equals(password, password2)) {
        errors.password2 = 'Password must match.';
      }
    } else {
      errors.password2 = 'Confirm password field is required.';
    }

    return {
      errors,
      isValid: isEmpty(errors),
    };
  },

  validateLogin: (data) => {
    const errors = {};
    const { username, password } = data;

    if (!username) {
      errors.username = 'Username field is required.';
    }

    if (!password) {
      errors.password = 'Password field is required.';
    }

    return {
      errors,
      isValid: isEmpty(errors),
    };
  },
};
