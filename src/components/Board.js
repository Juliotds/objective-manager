import React, { useEffect } from "react";
import CardColumn from "./CardColumn";

const Board = ({
  tasks,
  editModal,
  editDependency,
  onAddNewDependency,
  onRemoveDependency
}) => {
  let taskColumn = [];
  const onRefTasks = () => {
    let tasksCopy = [...tasks];
    taskColumn = [];
    let tasksWithReference = tasksCopy.map(task => {
      task.dependencies = task.dependencies.reduce((filtered, dependency) => {
        if (dependency !== null && typeof dependency === "object") {
          filtered.push(dependency);
        } else {
          if (tasksCopy[dependency - 1]) {
            filtered.push(tasksCopy[dependency - 1]);
          } else {
            //TODO: Show Alert
          }
        }
        return filtered;
      }, []);
      return task;
    });
    for (let i = 0; tasksWithReference.length > 0; i++) {
      taskColumn.push(
        tasksWithReference.filter(task => {
          if (i > 0) {
            return getMaxDepth(task) - 1 === i;
          } else {
            return task.dependencies.length === 0;
          }
        })
      );
      tasksWithReference = tasksWithReference.filter(task => {
        for (let j = 0; j <= i; j++) {
          if (taskColumn[j].includes(task)) {
            return false;
          }
        }
        return true;
      });
    }
  };
  onRefTasks();
  useEffect(() => {
    onRefTasks();
  }, [tasks]);

  return (
    <div className='board'>
      {taskColumn.map((column, i) => {
        return (
          <CardColumn
            key={i}
            tasks={column}
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

const getMaxDepth = task => {
  let n = 1;
  const taskList = task.dependencies;
  for (let i = 0; i < taskList.length; i++) {
    n = 1;
    n = n + getMaxDepth(taskList[i]);
  }
  return n;
};

export default Board;
