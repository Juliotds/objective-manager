import React from "react";
import Card from "./Card";

const CardColumn = ({ tasks, editModal }) => {
  return (
    <div className='card-column'>
      {tasks.map((task, i) => {
        return <Card key={i} task={task} editModal={editModal} />;
      })}
    </div>
  );
};

export default CardColumn;
