import React, { useState } from "react";

const LoginForm = ({ isLoginModalOpen, closeLoginModal }) => {
  const onCloseModal = () => {
    closeLoginModal();
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
            <h1>Login is required to do this action</h1>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default LoginForm;
