import React, { Fragment } from "react";

const Card = ({
  task,
  editModal,
  editDependency,
  onAddNewDependency,
  onRemoveDependency,
  highlight
}) => {
  const showAsDependency = e => {
    if (highlight) {
      onRemoveDependency.bind(null, task)();
    } else {
      onAddNewDependency.bind(null, task)();
    }
  };

  return (
    <Fragment>
      {!editDependency && (
        <div className='card' id={task.id} onClick={editModal.bind(null, task)}>
          <h4>{task.title}</h4>
          <span className='duration badge badge-danger'>{task.time}h</span>
        </div>
      )}
      {editDependency && (
        <div
          className={highlight ? "card active" : "card"}
          id={task.id}
          onClick={showAsDependency}
        >
          <h4>{task.title}</h4>
          <span className='duration badge badge-danger'>{task.time}h</span>
        </div>
      )}
    </Fragment>
  );
};

export default Card;
