import React from "react";
import Card from "./Card";

const CardColumn = ({ tasks }) => {
  return (
    <div className='card-column'>
      {tasks.map((task, i) => {
        return <Card key={i} task={task} />;
      })}
    </div>
  );
};

export default CardColumn;
