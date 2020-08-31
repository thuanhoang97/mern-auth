import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

const Landing = ({ auth, logoutUser }) => {
  return (
    <div className="container valign-wrapper">
      <div className="row">
        <div className="col s12 center-align">
          <h4 style={{ marginBottom: 40 }}>
            <b>Build</b> a login/auth app with the{' '}
            <span style={{ fontFamily: 'monospace' }}>MERN</span> stack from
            scratch
          </h4>

          {auth.isAuthenticated ? (
            <div>
              <h5 style={{ marginBottom: 20 }}>You signed in !!!</h5>
              <div className="btn" onClick={logoutUser}>Logout</div>
            </div>
          ) : (
            <div>
              <div className="col s6">
                <Link
                  to="/register"
                  style={{
                    width: '140px',
                    borderRadius: '3px',
                    letterSpacing: '1.5px',
                  }}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Register
                </Link>
              </div>
              <div className="col s6">
                <Link
                  to="/login"
                  style={{
                    width: '140px',
                    borderRadius: '3px',
                    letterSpacing: '1.5px',
                  }}
                  className="btn btn-large waves-effect white black-text"
                >
                  Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { logoutUser })(Landing);
