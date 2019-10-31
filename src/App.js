import React, { Fragment } from "react";
import Navbar from "./components/Navbar";
import Board from "./components/Board";
import Menu from "./components/Menu";
import EditCardModal from "./components/EditCardModal";

function App() {
  const tasks = [
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
  ];

  return (
    <Fragment>
      <Navbar />
      <div className='container'>
        <Board tasks={tasks} />
        <Menu />
      </div>
      <EditCardModal />
    </Fragment>
  );
}

export default App;
