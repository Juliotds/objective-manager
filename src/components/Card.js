import React from "react";

const Card = ({ task }) => {
  return (
    <div className='card'>
      <h4>{task.title}</h4>
      <span className='duration badge badge-danger'>{task.time}h</span>
    </div>
  );
};

export default Card;
