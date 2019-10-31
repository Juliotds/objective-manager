import React from "react";
import CardColumn from "./CardColumn";

const Board = ({ tasks }) => {
  let tasksWithReference = tasks.map(task => {
    task.dependencies = task.dependencies.reduce((filtered, dependency) => {
      if (tasks[dependency - 1]) {
        filtered.push(tasks[dependency - 1]);
      } else {
        //TODO: Show Alert
      }
      return filtered;
    }, []);
    return task;
  });
  let taskColumn = [];
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
    console.log(tasksWithReference);
  }

  return (
    <div className='board'>
      {taskColumn.map((column, i) => {
        return <CardColumn key={i} tasks={column} />;
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
  console.log("depth: " + n);
  return n;
};

export default Board;
