import React from "react";

const Card = ({ task }) => {
  return (
    <div className='card'>
      <h4>
        {task.title} - {task.id}
      </h4>
      <p>{task.content}</p>
      <span className='duration badge badge-danger'>{task.time}h</span>
    </div>
  );
};

export default Card;
