import React from "react";
import Card from "./Card";

const CardColumn = ({
  tasks,
  editModal,
  editDependency,
  onAddNewDependency,
  onRemoveDependency,
  selectedDependencies,
  showDependencies,
  hideDependencies,
  dependenciesObj,
  hoverTasksArray
}) => {
  return (
    <div className='card-column'>
      {tasks.map((task, i) => {
        const highlight = selectedDependencies.includes(task.id);
        const onHover = hoverTasksArray.includes(task.id);
        const onNotHover =
          !hoverTasksArray.includes(task.id) && hoverTasksArray.length > 0;
        return (
          <Card
            key={i}
            task={task}
            editModal={editModal}
            editDependency={editDependency}
            onAddNewDependency={onAddNewDependency}
            onRemoveDependency={onRemoveDependency}
            highlight={highlight}
            showDependencies={showDependencies}
            hideDependencies={hideDependencies}
            dependenciesObj={dependenciesObj[task.id]}
            onHover={onHover}
            onNotHover={onNotHover}
          />
        );
      })}
    </div>
  );
};

export default CardColumn;
