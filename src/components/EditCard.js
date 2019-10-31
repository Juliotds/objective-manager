import React from "react";

const EditCard = ({ isOpen, closeModal }) => {
  return (
    <React.Fragment>
      {isOpen && (
        <div className='modal' onClick={closeModal}>
          <div
            className='modal-content'
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <h1>TESTE</h1>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default EditCard;
