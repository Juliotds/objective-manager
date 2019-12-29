import React, { useState, useEffect } from "react";

const EditBoard = ({
  isEditBoardModalOpen,
  closeEditBoardModal,
  onAddNewBoard,
  onDeleteBoard,
  boardToEdit
}) => {
  const [board, setBoard] = useState({
    title: "",
    description: ""
  });
  const [validTitle, setValidTitle] = useState(false);

  const onTextChange = e => {
    const key = e.target.name;
    const val = e.target.value;
    setBoard(prev => {
      return { ...prev, [key]: val };
    });
    onFormValidation(key, val);
  };

  const onFormValidation = (name, value) => {
    let bValid;
    if (name === "title") {
      bValid = value !== "";
      setValidTitle(bValid);
    } else {
      const bValidForm = validTitle;
      return bValidForm;
    }
  };
  const onSave = async e => {
    if (onFormValidation()) {
      await onAddNewBoard(board);

      setBoard({
        title: "",
        description: ""
      });
      setValidTitle(false);

      closeEditBoardModal(true);
    } else {
      console.log(e.target);
      //TODO: error message
    }
  };

  const onDelete = async e => {
    await onDeleteBoard(board);

    setBoard({
      title: "",
      description: ""
    });
    setValidTitle(false);
    closeEditBoardModal(true);
  };
  const onCancel = e => {
    setBoard({
      title: "",
      description: ""
    });
    closeEditBoardModal(true);
  };

  const onCloseModal = e => {
    setBoard({
      title: "",
      description: ""
    });
    setValidTitle(false);
    closeEditBoardModal();
  };

  useEffect(() => {
    if (!(boardToEdit.title === "" && boardToEdit.description === "")) {
      if (isEditBoardModalOpen) {
        setBoard({ ...boardToEdit });
        setValidTitle(true);
      }
    }
  }, [isEditBoardModalOpen]);

  return (
    <React.Fragment>
      {isEditBoardModalOpen && (
        <div className='modal edit-task-modal' onClick={onCloseModal}>
          <div
            className='modal-content edit-task-modal-content'
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <h1>TESTE</h1>
            <label className='input-span' htmlFor='text-title'>
              Title:{" "}
            </label>
            <input
              className='input-title'
              type='text'
              name='title'
              id='text-title'
              onChange={onTextChange}
              value={board.title || ""}
            />
            <label className='input-span' htmlFor='text-title'>
              *required
            </label>
            <br />
            <label htmlFor='text-description'>Description: </label>
            <textarea
              className='input-description'
              name='description'
              id='text-description'
              onChange={onTextChange}
              value={board.description || ""}
            />
            <br />
            <br />
            <div className='button-wrapper'>
              <div className='btn btn-success' onClick={onSave}>
                Save
              </div>
              <div className='btn btn-dark' onClick={onCancel}>
                Cancel
              </div>
              <div className='btn btn-danger' onClick={onDelete}>
                Delete
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default EditBoard;
