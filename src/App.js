import React, { Fragment, useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Board from "./components/Board";
import Menu from "./components/Menu";
import EditCardModal from "./components/EditCardModal";
import EditCard from "./components/EditCard";
import LoginModal from "./components/LoginModal";
import LoginForm from "./components/LoginForm";
import SignUpModal from "./components/SignUpModal";
import SignUpForm from "./components/SignUpForm";
import WarningModal from "./components/WarningModal";
import Warning from "./components/Warning";
import firebase from "./Firestore";

function App() {
  const [tasks, setTasks] = useState([]);
  const [program, setProgram] = useState("Gsqs8V3DijJL03kZBeDK");
  const [isOpen, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
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

  // read data from database
  const db = firebase.firestore();
  const auth = firebase.auth();

  useEffect(() => {
    db.collection("program")
      .doc(program)
      .onSnapshot(docSnapshot => {
        let tasksArray = [];
        if (!docSnapshot.empty) {
          let objectives = docSnapshot.data().objectives || {};
          if (Object.keys(objectives).length > 0) {
            tasksArray = Object.keys(objectives).map(key => objectives[key]);
          }
        }
        setTasks(tasksArray);
      });

    auth.onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
  }, []);

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
  const onAddNewTask = obj => {
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
      let objectivesObj = {};
      for (let i = 0; i < newArray.length; i++) {
        Object.assign(objectivesObj, { [newArray[i].id]: newArray[i] });
      }
      db.collection("program")
        .doc(program)
        .set({ objectives: objectivesObj }, { merge: true })
        .then(() => {
          console.log("update!");
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      db.collection("program")
        .doc(program)
        .set({ [`objectives`]: { [obj.id]: obj } }, { merge: true })
        .then(() => {
          console.log("update!");
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const onDeleteTask = obj => {
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
      db.collection("program")
        .doc(program)
        .set(
          {
            [`objectives`]: { [obj.id]: firebase.firestore.FieldValue.delete() }
          },
          { merge: true }
        )
        .then(() => {
          console.log("update!");
        })
        .catch(err => {
          console.log(err);
        });
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
    console.log(objTask, id);
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
    return bIdFound;
  };

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const onLogin = async (email, password) => {
    try {
      const cred = await auth.signInWithEmailAndPassword(email, password);
      console.log(cred);
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
          closeModal={closeModal}
          editDependency={editDependency}
          onSaveDependency={onSaveDependency}
          onCancelDependency={onCancelDependency}
          openWarningModal={openWarningModal}
          authUser={authUser}
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
    </Fragment>
  );
}

export default App;
