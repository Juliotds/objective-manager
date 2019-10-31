import React from "react";

const Menu = ({ openModal, closeModal }) => {
  return (
    <div className='menu'>
      <div className='btn btn-success' onClick={openModal}>
        Add New
      </div>
      <div className='btn btn-dark' onClick={closeModal}>
        Save
      </div>
    </div>
  );
};

export default Menu;
