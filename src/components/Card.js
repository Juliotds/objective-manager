import React, { Fragment } from "react";

const Card = ({
  task,
  editModal,
  editDependency,
  onAddNewDependency,
  onRemoveDependency,
  highlight,
  showDependencies,
  hideDependencies,
  dependenciesObj = {
    hasDependencies: false,
    dependencyColor: "",
    dependents: []
  },
  onHover = false,
  onNotHover = false
}) => {
  const showAsDependency = e => {
    if (highlight) {
      onRemoveDependency.bind(null, task.id)();
    } else {
      onAddNewDependency.bind(null, task)();
    }
  };
  return (
    <Fragment>
      {!editDependency && (
        <div
          className={`card ${onHover && "active"} ${onNotHover && "inactive"}`}
          id={task.id}
          onClick={editModal.bind(null, task)}
          onMouseEnter={showDependencies.bind(this, task)}
          onMouseLeave={hideDependencies}
        >
          <span
            className={`dependencies ${dependenciesObj.hasDependencies &&
              dependenciesObj.dependencyColor}`}
          ></span>
          <div className='card-container'>
            <h4>{task.title}</h4>
            <span className='duration badge badge-danger'>{task.time}h</span>
          </div>
          <div className='dependents'>
            {dependenciesObj.dependents.map((dependent, index) => (
              <span className={`${dependent}`} key={index}></span>
            ))}
          </div>
        </div>
      )}
      {editDependency && (
        <div
          className={
            highlight
              ? "card-edit-dependencies active"
              : "card-edit-dependencies"
          }
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
