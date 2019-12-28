import React, { useEffect, useState } from "react";
import CardColumn from "./CardColumn";

const Board = ({
  tasks,
  editModal,
  editDependency,
  onAddNewDependency,
  onRemoveDependency,
  selectedDependencies
}) => {
  const [hoverTasksArray, setHoverTasksArray] = useState([]);
  const [dependenciesObject, setDependenciesObject] = useState({});
  let taskColumn = [];
  const onRefTasks = () => {
    let tasksCopy = [];
    let tasksWithReference = [];
    if (tasks.length > 0) {
      tasksCopy = tasks.map(task => JSON.parse(JSON.stringify(task)));
    }
    if (tasksCopy.length > 0) {
      tasksWithReference = tasksCopy.map(task => {
        task.dependencies = task.dependencies.reduce((filtered, dependency) => {
          if (dependency !== null && typeof dependency === "object") {
            filtered.push(dependency);
          } else {
            filtered = tasks.reduce((taskArray, task) => {
              if (task.id === dependency) {
                taskArray.push(task);
              }
              return taskArray;
            }, []);
          }
          return filtered;
        }, []);
        return task;
      });
    }

    taskColumn = [];
    for (let i = 0; tasksWithReference.length > 0; i++) {
      taskColumn.push(
        tasksWithReference.filter(task => {
          if (i > 0) {
            return getMaxDepth(task.id, tasksCopy) - 1 === i;
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
    setDependenciesObj();
  }, [tasks]);

  let dependenciesObj = {};
  const setDependenciesObj = () => {
    let tasksCopy = tasks.map(task => JSON.parse(JSON.stringify(task)));
    let nDependencyColor = 1;
    tasksCopy.map(task => {
      const bHasDependencies = task.dependencies.length > 0;
      const sDependencyColor = `background-color${nDependencyColor}`;
      if (task.dependencies.length > 0) {
        nDependencyColor = ((nDependencyColor + 1) % 20) + 1;
      }
      Object.assign(dependenciesObj, {
        [task.id]: {
          hasDependencies: bHasDependencies,
          dependencyColor: sDependencyColor,
          dependents: []
        }
      });
    });
    tasksCopy.map(task => {
      if (task.dependencies.length > 0) {
        task.dependencies.map(dependency => {
          dependenciesObj[dependency].dependents.push(
            dependenciesObj[task.id].dependencyColor
          );
          return dependency;
        });
      }
    });
    setDependenciesObject(dependenciesObj);
  };

  const showDependencies = task => {
    let tasksArray = [];
    pushAllDependencies(task.id, tasksArray);
    setHoverTasksArray(tasksArray);
  };

  const pushAllDependencies = (taskId, array) => {
    const dep = tasks.find(task => task.id === taskId);
    array.push(taskId);
    for (let i = 0; i < dep.dependencies.length; i++) {
      pushAllDependencies(dep.dependencies[i], array);
    }
  };

  const hideDependencies = () => {
    setHoverTasksArray([]);
  };

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
            selectedDependencies={selectedDependencies}
            showDependencies={showDependencies}
            hideDependencies={hideDependencies}
            dependenciesObj={dependenciesObject}
            hoverTasksArray={hoverTasksArray}
          />
        );
      })}
    </div>
  );
};

const getMaxDepth = (taskId, tasks) => {
  let n = 1;
  let taskObj = tasks.find(task => task.id === taskId);

  let taskList = [];
  if (taskObj) {
    taskList = taskObj.dependencies.map(dependency => {
      if (dependency !== null && typeof dependency === "object") {
        return dependency.id;
      } else {
        return dependency;
      }
    });
  }
  for (let i = 0; i < taskList.length; i++) {
    n = 1;
    n = n + getMaxDepth(taskList[i], tasks);
  }
  return n;
};

export default Board;
