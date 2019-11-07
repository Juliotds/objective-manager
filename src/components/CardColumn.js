import React from "react";
import Card from "./Card";

const CardColumn = ({
  tasks,
  editModal,
  editDependency,
  onAddNewDependency,
  onRemoveDependency
}) => {
  return (
    <div className='card-column'>
      {tasks.map((task, i) => {
        return (
          <Card
            key={i}
            task={task}
            editModal={editModal}
            editDependency={editDependency}
            onAddNewDependency={onAddNewDependency}
            onRemoveDependency={onRemoveDependency}
          />
        );
      })}
    </div>
  );
};

export default CardColumn;
