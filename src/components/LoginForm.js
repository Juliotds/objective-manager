import React, { useState } from "react";

const LoginForm = ({ isLoginModalOpen, closeLoginModal }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const onCloseModal = () => {
    closeLoginModal();
  };

  const submitSignIn = e => {
    e.preventDefault();
    if (
      password.length > 5 &&
      username.match(
        /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
      ) !== null
    ) {
      setUsername("");
      setPassword("");
      setErrorMsg("");
      closeLoginModal();
    } else {
      setErrorMsg("Please, check your email and password again.");
    }
  };

  return (
    <React.Fragment>
      {isLoginModalOpen && (
        <div className='modal login-modal' onClick={onCloseModal}>
          <div
            className='modal-content login-modal-content'
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <span className='login-form-title'>Account Login</span>

            <span className='login-span'>Email</span>
            <div className='wrap-username' data-validate='Email is required'>
              <input
                className='input-login'
                type='text'
                name='username'
                value={username}
                onChange={e => {
                  setUsername(e.target.value);
                }}
              />
              <span className='focus-input'></span>
            </div>

            <span className='login-span'>Password</span>
            <div className='wrap-username' data-validate='Password is required'>
              <input
                className='input-login'
                type='password'
                name='password'
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />
              <span className='focus-input'></span>
            </div>

            <div className='wrap-login-options'>
              <div className='wrap-remember-me'>
                <input
                  className='input-remember-me'
                  id='remember-me-checkbox'
                  type='checkbox'
                  name='remember-me'
                  onChange={e => {
                    setRememberMe(!rememberMe);
                  }}
                />
                <label
                  className='remember-me'
                  htmlFor='remember-me-checkbox'
                  onClick={e => {
                    setRememberMe(!rememberMe);
                  }}
                >
                  Remember me
                </label>
              </div>

              <div>
                <a href='#' className='forgot-password'>
                  Forgot Password?
                </a>
              </div>
            </div>

            <div className='container-login-btn'>
              <button className='loginbtn' onClick={submitSignIn}>
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default LoginForm;
