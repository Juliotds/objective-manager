import React from "react";

const Card = ({ task, editModal }) => {
  return (
    <div className='card' id={task.id} onClick={editModal.bind(null, task.id)}>
      <h4>{task.title}</h4>
      <span className='duration badge badge-danger'>{task.time}h</span>
    </div>
  );
};

export default Card;
