import React, { useState, useEffect } from "react";

const EditCard = ({
  isOpen,
  closeModal,
  onEditDependency,
  onAddNewTask,
  selectedDependencies,
  selectedTask
}) => {
  const [task, setTask] = useState({
    title: "",
    content: "",
    priority: 0,
    time: 0,
    dependencies: []
  });
  const [validTitle, setValidTitle] = useState(false);
  const [validContent, setValidContent] = useState(false);
  const [validPriority, setValidPriority] = useState(false);
  const [validTime, setValidTime] = useState(false);
  const [validDependencies, setValidDependencies] = useState(true);

  const onChange = e => {
    const key = e.target.name;
    const val = e.target.value;
    setTask(prev => {
      return { ...prev, [key]: val };
    });
    onFormValidation(key, val);
  };

  const onFormValidation = (name, value) => {
    let bValid;
    switch (name) {
      case "title":
        bValid = value !== "";
        setValidTitle(bValid);
        break;
      case "content":
        bValid = value !== "";
        setValidContent(bValid);
        break;
      case "priority":
        bValid = value > 0;
        setValidPriority(bValid);
        break;
      case "time":
        bValid = value > 0;
        setValidTime(bValid);
        break;
      case "dependencies":
        bValid = value !== null && typeof value === "object";
        setValidDependencies(bValid);
        break;
      default:
        break;
    }
    const bValidForm =
      validTitle &&
      validContent &&
      validPriority &&
      validTime &&
      validDependencies;
    return bValidForm;
  };
  const onSave = e => {
    if (onFormValidation()) {
      onAddNewTask(task);

      setTask({
        title: "",
        content: "",
        priority: 0,
        time: 0,
        dependencies: []
      });
      setValidTitle(false);
      setValidContent(false);
      setValidPriority(false);
      setValidTime(false);
      setValidDependencies(false);
      onEditDependency(false);

      closeModal(true);
    } else {
      console.log(e.target);
      //TODO: error message
    }
  };
  const onCancel = e => {
    onEditDependency(false);
    setTask({
      title: "",
      content: "",
      priority: 0,
      time: 0,
      dependencies: []
    });
    closeModal(true);
  };

  const onEnableEditDependency = e => {
    onEditDependency(true, task);
    closeModal();
  };

  useEffect(() => {
    if (selectedDependencies) {
      setTask({ ...task, dependencies: selectedDependencies });
    }
  }, [selectedDependencies]);

  useEffect(() => {
    if (
      !(
        Object.keys(selectedTask).length === 0 &&
        selectedTask.constructor === Object
      )
    ) {
      setTask(selectedTask);
      setValidTitle(true);
      setValidContent(true);
      setValidPriority(true);
      setValidTime(true);
      setValidDependencies(true);
    }
  }, [selectedTask]);

  return (
    <React.Fragment>
      {isOpen && (
        <div className='modal' onClick={closeModal}>
          <div
            className='modal-content'
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <h1>TESTE</h1>
            <label htmlFor='text-title'>Title: </label>
            <input
              type='text'
              name='title'
              id='text-title'
              onChange={onChange}
              value={task.title}
            />
            <br />
            <label htmlFor='text-content'>Description:</label>
            <input
              type='text'
              name='content'
              id='text-content'
              onChange={onChange}
              value={task.content}
            />
            <br />
            <label htmlFor='text-priority'>Priority:</label>
            <input
              type='number'
              name='priority'
              id='text-priority'
              onChange={onChange}
              value={task.priority}
            />
            <br />
            <label htmlFor='text-time'>Time:</label>
            <input
              type='number'
              name='time'
              id='text-time'
              onChange={onChange}
              value={task.time}
            />
            <br />
            <span>Dependency IDs:</span>
            <span>
              {task.dependencies.map((dependency, i) => {
                if (dependency) {
                  if (i === 0) {
                    return dependency.id.toString();
                  } else {
                    return ", " + dependency.id.toString();
                  }
                }
              })}
            </span>
            <div className='btn btn-primary' onClick={onEnableEditDependency}>
              Edit Dependencies
            </div>
            <br />
            <div className='btn btn-success' onClick={onSave}>
              Save
            </div>
            <div className='btn btn-dark' onClick={onCancel}>
              Cancel
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default EditCard;
