import React, { useState } from "react";

const EditCard = ({ isOpen, closeModal, onEditDependency, onAddNewTask }) => {
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
    //TODO: validação
    if (onFormValidation(e.target.name)) {
      //TODO: salvar no estado do APP
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

      closeModal();
    } else {
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
    closeModal();
  };

  const onEnableEditDependency = e => {
    onEditDependency(true);
    closeModal();
  };

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
            <span>Dependencies:</span>
            <span>
              {task.dependencies.map((dependency, i) => {
                if (i === 0) {
                  return dependency.toString;
                } else {
                  return ", " + dependency.toString;
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
