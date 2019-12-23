import React, { useState } from "react";

const LoginForm = ({ isWarningModalOpen, closeWarningModal }) => {
  const onCloseModal = () => {
    closeWarningModal();
  };

  return (
    <React.Fragment>
      {isWarningModalOpen && (
        <div className='modal login-modal' onClick={onCloseModal}>
          <div
            className='modal-content login-modal-content'
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <h3>Login is required to do this action</h3>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default LoginForm;
