import React, { Fragment, useState } from "react";

const Menu = ({
  openModal,
  closeModal,
  editDependency,
  onSaveDependency,
  onCancelDependency,
  openWarningModal,
  authUser,
  selectedBoard = { title: "", description: "" },
  openEditBoardModal
}) => {
  const onEditButton = () => {
    if (authUser === null) {
      openWarningModal();
    } else {
      openEditBoardModal();
    }
  };
  return (
    <div className='menu edit-board-menu'>
      {!editDependency && (
        <Fragment>
          <div className='btn btn-success btn-board' onClick={openModal}>
            <h4>Add New Task</h4>
          </div>
          <div className='btn btn-dark btn-board' onClick={onEditButton}>
            <h4>Edit Board</h4>
          </div>
        </Fragment>
      )}
      <div className='edit-board'>
        <div className='title'>
          <span>
            <strong>Title:</strong>
          </span>
          <br />
          <p>
            {selectedBoard.title.length > 0 ? selectedBoard.title : "No-title"}
          </p>
        </div>
        <div className='description'>
          <span>
            <strong>Description:</strong>
          </span>
          <br />
          <p>
            {selectedBoard.description.length > 0
              ? selectedBoard.description
              : "No description"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
