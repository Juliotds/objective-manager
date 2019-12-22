import React, { useState } from "react";

const SignUpForm = ({ isSignUpModalOpen, closeSignUpModal, onSignUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const onCloseModal = () => {
    closeSignUpModal();
  };

  const submitSignIn = async e => {
    e.preventDefault();
    if (
      password.length > 5 &&
      username.match(
        /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
      ) !== null &&
      password === confirmPassword
    ) {
      await onSignUp(username, password);
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setErrorMsg("");
    } else {
      setErrorMsg("Please, check your email and password again.");
    }
  };

  return (
    <React.Fragment>
      {isSignUpModalOpen && (
        <div className='modal login-modal' onClick={onCloseModal}>
          <div
            className='modal-content login-modal-content'
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <span className='login-form-title'>Register Account</span>

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

            <span className='login-span'>Confirm password</span>
            <div
              className='wrap-username'
              data-validate='Confirm Password is required'
            >
              <input
                className='input-login'
                type='password'
                name='confirm-password'
                value={confirmPassword}
                onChange={e => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <span className='focus-input'></span>
            </div>

            <div className='wrap-login-options'></div>

            <div className='container-login-btn'>
              <button className='loginbtn' onClick={submitSignIn}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default SignUpForm;
