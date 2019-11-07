import React from "react";
import Card from "./Card";

const CardColumn = ({
  tasks,
  editModal,
  editDependency,
  onAddNewDependency,
  onRemoveDependency,
  selectedDependencies
}) => {
  return (
    <div className='card-column'>
      {tasks.map((task, i) => {
        const highlight = selectedDependencies.includes(task.id);
        return (
          <Card
            key={i}
            task={task}
            editModal={editModal}
            editDependency={editDependency}
            onAddNewDependency={onAddNewDependency}
            onRemoveDependency={onRemoveDependency}
            highlight={highlight}
          />
        );
      })}
    </div>
  );
};

export default CardColumn;
