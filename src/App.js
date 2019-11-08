import React, { Fragment, useState } from "react";
import Navbar from "./components/Navbar";
import Board from "./components/Board";
import Menu from "./components/Menu";
import EditCardModal from "./components/EditCardModal";
import EditCard from "./components/EditCard";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "task1",
      time: 30,
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae reprehenderit harum nisi, blanditiis labore voluptate minus hic quia esse, ullam et id molestiae quae officia incidunt aliquid quidem nesciunt fugiat.",
      priority: 0,
      dependencies: []
    },
    {
      id: 2,
      title: "task2",
      time: 40,
      content: "links e comentários sobre o task 2",
      priority: 2,
      dependencies: []
    },
    {
      id: 3,
      title: "task3",
      time: 20,
      content: "links e comentários sobre o task 3",
      priority: 3,
      dependencies: []
    },
    {
      id: 4,
      title: "supertask 1",
      time: 10,
      content: "links e comentários sobre o supertask 1",
      priority: 1,
      dependencies: [1]
    },
    {
      id: 5,
      title: "supertask 2",
      time: 60,
      content: "links e comentários sobre o supertask 2",
      priority: 2,
      dependencies: [2]
    },
    {
      id: 6,
      title: "supertask 3",
      time: 80,
      content: "links e comentários sobre o supertask 3",
      priority: 10,
      dependencies: [3, 4]
    },
    {
      id: 7,
      title: "supertask 3",
      time: 80,
      content: "links e comentários sobre o supertask 3",
      priority: 10,
      dependencies: [6]
    },
    {
      id: 8,
      title: "supertask 3",
      time: 80,
      content: "links e comentários sobre o supertask 3",
      priority: 10,
      dependencies: [7]
    },
    {
      id: 9,
      title: "supertask 3",
      time: 80,
      content: "links e comentários sobre o supertask 3",
      priority: 10,
      dependencies: [8]
    }
  ]);
  const [isOpen, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const [editDependency, setEditDependency] = useState(false);
  const [
    initialSelectedDependencies,
    setInitialSelectedDependencies
  ] = useState([]);
  const [selectedDependencies, setSelectedDependencies] = useState([]);
  const [saveDependencies, setSaveDependencies] = useState(false);

  const editModal = (objTask, e) => {
    e.preventDefault();
    setOpen(true);
    setSelectedTask(objTask);
  };

  const openModal = e => {
    setOpen(true);
  };
  function closeModal(bResetSelectedTask) {
    setOpen(false);
    if (bResetSelectedTask) {
      setSelectedTask({});
      setInitialSelectedDependencies([]);
      setSelectedDependencies([]);
    }
    setSaveDependencies(false);
  }

  const onEditDependency = (bEnable, objTask) => {
    if (bEnable) {
      setSelectedTask(objTask);
      setEditDependency(bEnable);
      setInitialSelectedDependencies([...objTask.dependencies]);
      setSelectedDependencies([...objTask.dependencies]);
    } else {
      setEditDependency(false);
    }
  };
  const onAddNewTask = obj => {
    const bTaskExists = tasks.map(task => task.id).includes(obj.id);
    if (bTaskExists) {
      const newArray = tasks.filter(task => {
        return task.id !== obj.id;
      });
      setTasks([...newArray, obj]);
    } else {
      setTasks([...tasks, obj]);
    }
  };

  const onSaveDependency = () => {
    setOpen(true);
    setEditDependency(false);
    setSaveDependencies(true);
  };

  const onCancelDependency = () => {
    setSelectedDependencies([...initialSelectedDependencies]);
    setOpen(true);
    setEditDependency(false);
    setSaveDependencies(false);
  };

  const onAddNewDependency = (objDependency, e) => {
    const bIncludesInDependency = findInDependencies(
      objDependency,
      selectedTask.id
    );
    if (!bIncludesInDependency) {
      setSelectedDependencies([...selectedDependencies, objDependency]);
    }
  };

  const onRemoveDependency = (objDependency, e) => {
    let arrayCopy = [...selectedDependencies];
    const index = arrayCopy.indexOf(objDependency);
    if (index !== -1) {
      arrayCopy.splice(index, 1);
      setSelectedDependencies([...arrayCopy]);
    }
  };

  const findInDependencies = (objTask, id) => {
    if (!objTask) {
      return false;
    }
    if (objTask.id === id) {
      return true;
    }
    console.log(objTask, id);
    let bIdFound = false;
    for (let dependency in objTask.dependencies) {
      bIdFound =
        findInDependencies(objTask.dependencies[dependency], id) || bIdFound;
    }
    console.log(bIdFound);
    return bIdFound;
  };

  return (
    <Fragment>
      <Navbar />
      <div className='container'>
        <Board
          tasks={tasks}
          editModal={editModal}
          editDependency={editDependency}
          onAddNewDependency={onAddNewDependency}
          onRemoveDependency={onRemoveDependency}
          selectedDependencies={selectedDependencies}
        />
        <Menu
          openModal={openModal}
          closeModal={closeModal}
          editDependency={editDependency}
          onSaveDependency={onSaveDependency}
          onCancelDependency={onCancelDependency}
        />
      </div>
      <EditCardModal>
        <EditCard
          isOpen={isOpen}
          closeModal={closeModal}
          onEditDependency={onEditDependency}
          onAddNewTask={onAddNewTask}
          selectedDependencies={
            saveDependencies ? selectedDependencies : undefined
          }
          selectedTask={selectedTask ? selectedTask : undefined}
        />
      </EditCardModal>
    </Fragment>
  );
}

export default App;
