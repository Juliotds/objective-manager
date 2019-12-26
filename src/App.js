import React, { Fragment, useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Board from "./components/Board";
import Menu from "./components/Menu";
import BoardsMenu from "./components/BoardsMenu";
import EditBoardModal from "./components/EditBoardModal";
import EditBoard from "./components/EditBoard";
import EditCardModal from "./components/EditCardModal";
import EditCard from "./components/EditCard";
import LoginModal from "./components/LoginModal";
import LoginForm from "./components/LoginForm";
import SignUpModal from "./components/SignUpModal";
import SignUpForm from "./components/SignUpForm";
import WarningModal from "./components/WarningModal";
import Warning from "./components/Warning";
import { firebase, FieldValue } from "./Firestore";

function App() {
  const [tasks, setTasks] = useState([]);
  const [boards, setBoards] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const [selectedBoard, setSelectedBoard] = useState({
    title: "",
    description: ""
  });
  const [boardToEdit, setBoardToEdit] = useState({
    title: "",
    description: ""
  });
  const [editDependency, setEditDependency] = useState(false);
  const [
    initialSelectedDependencies,
    setInitialSelectedDependencies
  ] = useState([]);
  const [selectedDependencies, setSelectedDependencies] = useState([]);
  const [saveDependencies, setSaveDependencies] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);

  // read data from database
  const db = firebase.firestore();
  const auth = firebase.auth();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        listenToUserBoards(user);
        setAuthUser(user);
      } else {
        setAuthUser(null);
        setTasks([]);
        setBoards([]);
      }
      console.log(user);
    });
  }, []);

  const listenToUserBoards = user => {
    setSelectedBoard({ title: "", description: "" });
    setBoards([]);
    setTasks([]);
    db.collection("users")
      .doc(user.uid)
      .collection("boards")
      .orderBy("lastUpdate", "desc")
      .onSnapshot(boardSnapshot => {
        let tasksArray = [];
        if (!boardSnapshot.empty) {
          let boardsArray = boardSnapshot.docs.map(doc => ({
            ...doc.data(),
            uid: doc.id
          }));
          setBoards(boardsArray);
          setSelectedBoard(boardsArray[0] || { title: "", description: "" });

          let tasks = boardSnapshot.docs[0].data().tasks || {};
          if (Object.keys(tasks).length > 0) {
            tasksArray = Object.keys(tasks).map(key => tasks[key]);
          }
        }
        setTasks(tasksArray);
      });
  };

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
      setInitialSelectedDependencies([
        ...objTask.dependencies.map(dependency => {
          if (dependency !== null && typeof dependency === "object") {
            return dependency.id;
          } else {
            return dependency;
          }
        })
      ]);
      setSelectedDependencies([
        ...objTask.dependencies.map(dependency => {
          if (dependency !== null && typeof dependency === "object") {
            return dependency.id;
          } else {
            return dependency;
          }
        })
      ]);
    } else {
      setEditDependency(false);
    }
  };
  const onAddNewTask = async obj => {
    if (!obj.id) {
      obj["id"] = tasks.reduce((maxId, task) => {
        if (maxId <= task.id) {
          maxId = task.id + 1;
        }
        return maxId;
      }, 1);
    }
    const bTaskExists = tasks.map(task => task.id).includes(obj.id);
    if (bTaskExists) {
      const newArray = tasks.reduce((filtered, task) => {
        if (task.dependencies.length > 0) {
          task.dependencies = task.dependencies.map(dependency => {
            if (dependency !== null && typeof dependency === "object") {
              return dependency.id;
            } else {
              return dependency;
            }
          });
        }
        if (task.id !== obj.id) {
          filtered.push(task);
        }
        return filtered;
      }, []);
      newArray.push(obj);
      let tasksObj = {};
      for (let i = 0; i < newArray.length; i++) {
        Object.assign(tasksObj, { [newArray[i].id]: newArray[i] });
      }
      if (authUser !== null) {
        let userRef, boardRef;
        if (authUser) {
          userRef = db.collection("users").doc(authUser.uid);
        } else {
          userRef = db.collection("users").doc();
        }
        if (selectedBoard.uid) {
          boardRef = userRef.collection("boards").doc(selectedBoard.uid);
        } else {
          boardRef = userRef.collection("boards").doc();
        }

        await boardRef
          .set({ tasks: tasksObj, lastUpdate: Date.now() }, { merge: true })
          .then(() => {
            console.log("update!");
          })
          .catch(err => {
            console.log(err);
          });
        listenToUserBoards(authUser);
      } else {
        setTasks(tasksObj);
      }
    } else {
      if (authUser !== null) {
        let userRef, boardRef;
        if (authUser) {
          userRef = db.collection("users").doc(authUser.uid);
        } else {
          userRef = db.collection("users").doc();
        }
        if (selectedBoard.uid) {
          boardRef = userRef.collection("boards").doc(selectedBoard.uid);
        } else {
          boardRef = userRef.collection("boards").doc();
        }

        await boardRef
          .set(
            { [`tasks`]: { [obj.id]: obj }, lastUpdate: Date.now() },
            { merge: true }
          )
          .then(() => {
            console.log("update!");
          })
          .catch(err => {
            console.log(err);
          });
        listenToUserBoards(authUser);
      } else {
        let newArray = [];
        if (tasks.length > 0) {
          newArray = [...tasks];
        }
        newArray.push(obj);
        setTasks(newArray);
      }
    }
  };

  const onDeleteTask = async obj => {
    const bTaskExists = tasks.map(task => task.id).includes(obj.id);
    if (bTaskExists) {
      if (authUser !== null) {
        let userRef, boardRef;
        if (authUser) {
          userRef = db.collection("users").doc(authUser.uid);
        } else {
          userRef = db.collection("users").doc();
        }
        if (selectedBoard.uid) {
          boardRef = userRef.collection("boards").doc(selectedBoard.uid);
        } else {
          boardRef = userRef.collection("boards").doc();
        }
        await boardRef
          .set(
            {
              [`tasks`]: { [obj.id]: FieldValue.delete() },
              lastUpdate: Date.now()
            },
            { merge: true }
          )
          .then(() => {
            console.log("update!");
          })
          .catch(err => {
            console.log(err);
          });
        listenToUserBoards(authUser);
      } else {
        let newTasksArray = tasks.reduce((filtered, task) => {
          if (task.dependencies.length > 0) {
            task.dependencies = task.dependencies.map(dependency => {
              if (dependency !== null && typeof dependency === "object") {
                return dependency.id;
              } else {
                return dependency;
              }
            });
          }
          if (task.id !== obj.id) {
            filtered.push(task);
          }
          return filtered;
        }, []);
        setTasks(newTasksArray);
      }
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
      setSelectedDependencies([...selectedDependencies, objDependency.id]);
    }
  };

  const onRemoveDependency = (idDependency, e) => {
    let arrayCopy = [...selectedDependencies];
    const index = arrayCopy.indexOf(idDependency);
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
    let bIdFound = false;
    for (let dependency in objTask.dependencies) {
      bIdFound =
        findInDependencies(objTask.dependencies[dependency], id) || bIdFound;
    }
    return bIdFound;
  };

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const onLogin = async (email, password) => {
    try {
      const cred = await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {}
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const openSignUpModal = () => {
    setSignUpModalOpen(true);
  };

  const onSignUp = async (email, password) => {
    await auth.createUserWithEmailAndPassword(email, password);
    setSignUpModalOpen(false);
  };

  const closeSignUpModal = () => {
    setSignUpModalOpen(false);
  };

  const onLogOut = () => {
    auth.signOut();
    setLoginModalOpen(false);
  };

  const openWarningModal = () => {
    setIsWarningModalOpen(true);
  };

  const closeWarningModal = () => {
    setIsWarningModalOpen(false);
  };

  const selectBoard = uid => {
    const boardToSet = boards.find(board => board.uid === uid) || {};
    console.log(boardToSet);
    setSelectedBoard(boardToSet);
  };

  const openEditBoardModal = boardObj => {
    if (
      !(Object.keys(boardObj).length === 0 && boardObj.constructor === Object)
    ) {
      setBoardToEdit(boardObj);
    } else {
      setBoardToEdit({
        title: "",
        description: ""
      });
    }

    setIsEditBoardModalOpen(true);
  };

  const closeEditBoardModal = () => {
    setBoardToEdit({
      title: "",
      description: ""
    });
    setIsEditBoardModalOpen(false);
  };

  const onAddNewBoard = async boardObj => {
    const bBoardExists = boards.map(board => board.uid).includes(boardObj.uid);
    if (bBoardExists) {
      const newArray = boards.reduce((filtered, board) => {
        if (board.uid !== boardObj.uid) {
          filtered.push(board);
        }
        return filtered;
      }, []);
      newArray.push(boardObj);
      if (authUser !== null) {
        let userRef, boardRef;
        if (authUser) {
          userRef = db.collection("users").doc(authUser.uid);
        } else {
          userRef = db.collection("users").doc();
        }
        boardRef = userRef.collection("boards").doc(boardObj.uid);

        await boardRef
          .set(
            {
              lastUpdate: Date.now(),
              uid: boardObj.uid,
              title: boardObj.title,
              description: boardObj.description
            },
            { merge: true }
          )
          .then(() => {
            console.log("update!");
          })
          .catch(err => {
            console.log(err);
          });
        listenToUserBoards(authUser);
      } else {
        setTasks(newArray);
      }
    } else {
      if (authUser !== null) {
        let userRef, boardRef;
        if (authUser) {
          userRef = db.collection("users").doc(authUser.uid);
        } else {
          userRef = db.collection("users").doc();
        }
        boardRef = userRef.collection("boards").doc();
        boardObj.uid = boardRef.id;
        console.log(boardObj.uid);
        await boardRef
          .set(
            {
              tasks: [],
              lastUpdate: Date.now(),
              uid: boardObj.uid,
              title: boardObj.title,
              description: boardObj.description
            },
            { merge: true }
          )
          .then(() => {
            console.log("update!");
          })
          .catch(err => {
            console.log(err);
          });
        listenToUserBoards(authUser);
      } else {
        let newArray = [];
        if (boards.length > 0) {
          newArray = [...boards];
        }
        newArray.push(boardObj);
        setBoards(newArray);
      }
    }
  };

  const onDeleteBoard = async boardObj => {
    const bBoardExists = boards.map(board => board.uid).includes(boardObj.uid);
    if (bBoardExists) {
      if (authUser !== null) {
        let userRef, boardRef;
        if (authUser) {
          userRef = db.collection("users").doc(authUser.uid);
        } else {
          userRef = db.collection("users").doc();
        }
        boardRef = userRef.collection("boards").doc(boardObj.uid);
        await boardRef
          .delete()
          .then(() => {
            console.log("update!");
          })
          .catch(err => {
            console.log(err);
          });
      }
      let newBoardsArray = boards.reduce((filtered, board) => {
        if (board.uid !== boardObj.uid) {
          filtered.push(board);
        }
        return filtered;
      }, []);
      setBoards(newBoardsArray);
      if (authUser !== null) {
        listenToUserBoards(authUser);
      }
    }
  };

  return (
    <Fragment>
      <Navbar
        openLoginModal={openLoginModal}
        openSignUpModal={openSignUpModal}
        onLogOut={onLogOut}
        authUser={authUser}
      />
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
          editDependency={editDependency}
          onSaveDependency={onSaveDependency}
          onCancelDependency={onCancelDependency}
          openWarningModal={openWarningModal}
          authUser={authUser}
          selectedBoard={selectedBoard}
          openEditBoardModal={openEditBoardModal}
        />
        <BoardsMenu
          boards={boards}
          selectedBoard={selectedBoard}
          selectBoard={selectBoard}
          openEditBoardModal={openEditBoardModal}
        />
      </div>
      <EditCardModal>
        <EditCard
          isOpen={isOpen}
          closeModal={closeModal}
          onEditDependency={onEditDependency}
          onAddNewTask={onAddNewTask}
          onDeleteTask={onDeleteTask}
          selectedDependencies={
            saveDependencies ? selectedDependencies : undefined
          }
          selectedTask={selectedTask ? selectedTask : undefined}
        />
      </EditCardModal>
      <LoginModal>
        <LoginForm
          isLoginModalOpen={isLoginModalOpen}
          closeLoginModal={closeLoginModal}
          onLogin={onLogin}
        />
      </LoginModal>
      <SignUpModal>
        <SignUpForm
          isSignUpModalOpen={isSignUpModalOpen}
          closeSignUpModal={closeSignUpModal}
          onSignUp={onSignUp}
        />
      </SignUpModal>
      <WarningModal>
        <Warning
          isWarningModalOpen={isWarningModalOpen}
          closeWarningModal={closeWarningModal}
        />
      </WarningModal>
      <EditBoardModal>
        <EditBoard
          isEditBoardModalOpen={isEditBoardModalOpen}
          closeEditBoardModal={closeEditBoardModal}
          onAddNewBoard={onAddNewBoard}
          onDeleteBoard={onDeleteBoard}
          boardToEdit={boardToEdit}
        />
      </EditBoardModal>
    </Fragment>
  );
}

export default App;
