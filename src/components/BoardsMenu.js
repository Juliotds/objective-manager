import React, { Fragment } from "react";

const BoardsMenu = ({
  boards,
  selectedBoard,
  selectBoard,
  openEditBoardModal
}) => {
  const onSelectBoard = board => {
    selectBoard(board.uid);
  };
  return (
    <div className='menu boards-menu'>
      <div
        className='boards-element add-btn'
        onClick={openEditBoardModal.bind(this, {
          title: "",
          description: ""
        })}
      >
        <h1>+</h1>
      </div>
      {boards.map((board, index) => {
        let bSelected = false;
        if (selectedBoard.uid) {
          bSelected = selectBoard.uid === board.uid;
        }
        bSelected = selectedBoard === board;
        return (
          <div
            key={index}
            className={`boards-element ${bSelected && "selected"}`}
            onClick={onSelectBoard.bind(this, board)}
          >
            <h3>{board.title ? board.title : "no-title"}</h3>
            <p>{board.description ? board.description : "no-description"}</p>
          </div>
        );
      })}
    </div>
  );
};

export default BoardsMenu;
