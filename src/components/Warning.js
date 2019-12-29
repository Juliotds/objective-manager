import React, { useState } from "react";

const LoginForm = ({
  warningMessage = "",
  isWarningModalOpen,
  closeWarningModal
}) => {
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
            <h3>{warningMessage}</h3>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default LoginForm;
