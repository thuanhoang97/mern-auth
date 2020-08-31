import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';
import isEmpty from 'is-empty';

const Login = ({ auth, loginUser, history, ...props }) => {
  const [errors, setErrors] = useState({});
  const [account, setAccount] = useState({
    username: '',
    password: '',
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
      loginUser(account);
    } else {
      console.log(newErrors);
      setErrors(newErrors);
    }
  };

  const handleInputChange = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {};
    const { username, password } = account;

    if (!username) {
      errors.username = 'Username field is required.';
    }

    if (!password) {
      errors.password = 'Password field is required.';
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
          <div className="col s12 center" style={{ paddingLeft: 11.25 }}>
            <h4>
              <b>Login</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
          <form noValidate onSubmit={handleSubmit}>
            <div className="input-filed col s12">
              <input
                type="text"
                onChange={handleInputChange}
                value={account.username}
                name="username"
                placeholder="Username"
                className={classnames('', {
                  invalid: errors.username,
                })}
              />
              <span className="helper-text" data-error={errors.username}></span>
            </div>
            <div className="input-filed col s12">
              <input
                type="password"
                onChange={handleInputChange}
                value={account.password}
                name="password"
                placeholder="Password"
                className={classnames('', {
                  invalid: errors.password,
                })}
              />
              <span className="helper-text" data-error={errors.password}></span>
            </div>

            <div className="col s12 center" style={{ paddingLeft: 11.25 }}>
              <button
                type="submit"
                style={{
                  width: 150,
                  borderRadius: 3,
                  letterSpacing: 1.5,
                  marginTop: '1rem',
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth, errors }) => ({
  auth,
  errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
