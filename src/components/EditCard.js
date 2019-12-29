import React, { useState, useEffect } from "react";

const EditCard = ({
  tasks,
  isOpen,
  closeModal,
  onEditDependency,
  onAddNewTask,
  onDeleteTask,
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
      default:
        break;
    }
    const bValidForm = validTitle && validContent && validPriority && validTime;
    return bValidForm;
  };
  const onSave = async e => {
    if (onFormValidation()) {
      await onAddNewTask(task);

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
      onEditDependency(false);

      closeModal(true);
    } else {
      console.log(e.target);
      //TODO: error message
    }
  };

  const onDelete = async e => {
    if (!task.dependents) {
      await onDeleteTask(task);

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
      onEditDependency(false);

      closeModal(true);
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

  const onCloseModal = e => {
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
    onEditDependency(false);
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
    }
  }, [selectedTask]);

  return (
    <React.Fragment>
      {isOpen && (
        <div className='modal edit-task-modal' onClick={onCloseModal}>
          <div
            className='edit-task-modal-content'
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <label className='input-span' htmlFor='text-title'>
              Task Title:{" "}
            </label>
            <input
              className='input-title'
              type='text'
              name='title'
              id='text-title'
              onChange={onChange}
              value={task.title}
            />
            <br />
            <label className='input-span' htmlFor='text-content'>
              Description:
            </label>
            <textarea
              className='input-description'
              name='content'
              id='text-content'
              onChange={onChange}
              value={task.content}
            ></textarea>
            <br />
            <div className='task-wrapper'>
              <div className='half'>
                <label className='input-span' htmlFor='text-priority'>
                  Priority:
                </label>
                <input
                  className='input-title'
                  type='number'
                  name='priority'
                  id='text-priority'
                  onChange={onChange}
                  value={task.priority}
                />
              </div>
              <div className='half'>
                <label className='input-span' htmlFor='text-time'>
                  Time:
                </label>
                <input
                  className='input-title'
                  type='number'
                  name='time'
                  id='text-time'
                  onChange={onChange}
                  value={task.time}
                />
              </div>
            </div>
            <br />
            <span className='input-span'>Dependencies:</span>
            <ul className='dependencies-ul'>
              {task.dependencies.map((dependency, index) => {
                let taskTitle = "";
                if (dependency !== null && typeof dependency === "object") {
                  taskTitle = dependency.title;
                } else {
                  const aux = tasks.find(tsk => tsk.id === dependency);
                  if (aux) {
                    taskTitle = aux.title;
                  }
                }
                return (
                  <li key={index}>
                    {taskTitle.toString().length > 15
                      ? taskTitle.toString().substr(0, 15) + "..."
                      : taskTitle.toString()}
                  </li>
                );
              })}
            </ul>
            <div
              className='btn btn-primary edit-dependencies-button'
              onClick={onEnableEditDependency}
            >
              Edit Dependencies
            </div>
            <br />
            <div className='button-wrapper'>
              <div className='btn btn-success' onClick={onSave}>
                Save
              </div>
              <div className='btn btn-dark' onClick={onCancel}>
                Cancel
              </div>
              <div
                className={`btn btn-danger ${task.dependents && "inactive"}`}
                onClick={onDelete}
              >
                Delete
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default EditCard;
