import React, { Fragment } from "react";

const BoardsMenu = ({ boards, selectedBoard, selectBoard, editBoard }) => {
  console.log(selectedBoard);
  return (
    <div className='menu boards-menu'>
      <div className='boards-element add-btn'>
        <h1>+</h1>
      </div>
      {boards.map((board, index) => {
        return (
          <div key={index} className='boards-element'>
            <h3>{board.title ? board.title : "no-title"}</h3>
            <p>{board.description ? board.description : "no-description"}</p>
          </div>
        );
      })}
    </div>
  );
};

export default BoardsMenu;
