import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import classnames from 'classnames';
import isEmpty from 'is-empty';
import validator from 'validator';

const Register = ({ auth, registerUser, history, ...props }) => {
  const [errors, setErrors] = useState({});
  const [account, setAccount] = useState({
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    password2: '',
  });

  useEffect(() => {
    setErrors(props.errors);
  }, [props.errors]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/');
    }
  }, [auth, history]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (isEmpty(newErrors)) {
      setErrors({});
      registerUser(account, history);
    } else {
      setErrors(newErrors);
    }
  };

  const handleChangeInput = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {};
    const { firstName, lastName, username, password, password2 } = account;
    if(!firstName) {
      errors.firstName = 'First name field is required.'
    }

    if (!lastName) {
      errors.lastName = 'Last name field is required.'
    }

    if (!username) {
      errors.username = 'Username field is required.'
    }

    if (password) {
      if (!validator.isLength(password, { min: 6, max: 30 })) {
        errors.password = 'Password need at least 6 character and less then 30 character.'
      }
    } else {
      errors.password = 'Password field is required.';
    }

    if (!validator.equals(password, password2)) {
      errors.password2 = 'Confirm password is not matched.'
    }

    return errors;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat-waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to
            home
          </Link>
          <div
            className="col s12 center"
            style={{
              paddingLeft: '11.25px',
            }}
          >
            <h4>
              <b>Register</b>
            </h4>
            <p className="grey-text text-darken-1">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
          <form noValidate onSubmit={handleSubmit}>
            <div className="input-field col s6">
              <input
                onChange={handleChangeInput}
                value={account.firstName}
                className={classnames('', {
                  invalid: errors.firstName,
                })}
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First name"
              />
              <span className="helper-text" data-error={errors.firstName}></span>
            </div>
            <div className="input-field col s6">
              <input
                type="text"
                onChange={handleChangeInput}
                value={account.lastName}
                className={classnames('', {
                  invalid: errors.lastName,
                })}
                id="lastName"
                name="lastName"
                placeholder="Last name"
              />
              <span className="helper-text" data-error={errors.lastName}></span>
            </div>
            <div className="input-field col s12">
              <input
                type="text"
                onChange={handleChangeInput}
                value={account.username}
                className={classnames('', {
                  invalid: errors.username,
                })}
                id="username"
                name="username"
                placeholder="Username"
              />
              <span className="helper-text" data-error={errors.username}></span>
            </div>
            <div className="input-field col s12">
              <input
                type="password"
                onChange={handleChangeInput}
                value={account.password}
                className={classnames('', {
                  invalid: errors.password,
                })}
                id="password"
                name="password"
                placeholder="password"
              />
              <span className="helper-text" data-error={errors.password}></span>
            </div>
            <div className="input-field col s12">
              <input
                type="password"
                onChange={handleChangeInput}
                value={account.password2}
                className={classnames('', {
                  invalid: errors.password2,
                })}
                id="password2"
                name="password2"
                placeholder="Confirm password"
              />
              <span className="helper-text" data-error={errors.password2}></span>
            </div>
            <div
              className="col s12 center"
              style={{ marginTop: 20, paddingLeft: '11.25px' }}
            >
              <button className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth, errors }) => ({
  auth,
  errors,
});

export default connect(mapStateToProps, { registerUser })(Register);
