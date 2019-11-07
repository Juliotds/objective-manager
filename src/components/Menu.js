import React, { Fragment } from "react";

const Menu = ({
  openModal,
  closeModal,
  editDependency,
  onSaveDependency,
  onCancelDependency
}) => {
  return (
    <div className='menu'>
      {!editDependency && (
        <Fragment>
          <div className='btn btn-success' onClick={openModal}>
            Add New
          </div>
          <div className='btn btn-dark' onClick={closeModal}>
            Save
          </div>{" "}
        </Fragment>
      )}
      {editDependency && (
        <Fragment>
          <div className='btn btn-success' onClick={onSaveDependency}>
            Save Dependencies
          </div>
          <div className='btn btn-dark' onClick={onCancelDependency}>
            Cancel
          </div>{" "}
        </Fragment>
      )}
    </div>
  );
};

export default Menu;
