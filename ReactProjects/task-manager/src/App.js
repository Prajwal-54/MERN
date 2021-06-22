import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  //addButton state
  const [showAddButton, setShowAddButton] = useState(false);

  //tasksLists state
  const [tasks, setTask] = useState([]);

  //initialy when page loads
  useEffect(() => {
    const getTask = async () => {
      const getdata = await fetchTasks();
      setTask(getdata);
    };

    getTask();
  }, []);

  //fetching tasks
  const fetchTasks = async () => {
    const data = await fetch("http://localhost:5000/tasks");
    const res = await data.json();
    return res;
  };

  //add task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const newTask = await res.json();

    setTask([...tasks, newTask]);
    //without backend sever adding task
    // let idd=tasks.length+1;
    //   setTask([...tasks,{idd,...task}])
  };

  //delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    setTask(tasks.filter((task) => task.id !== id));
  };

  // fetching task with id to update reminder
  const fetchTask = async (id) => {
    const data = await fetch(`http://localhost:5000/tasks/${id}`);
    const res = await data.json();
    return res;
  };

  //toggle remainder
  const toggleRemainder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updatedTask),
    });

    const NewupdatedTask = await res.json();

    setTask(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: NewupdatedTask.reminder } : task
      )
    );
  };

  return (
    <Router>
      <div className="container">
        <Header
          toggleAddButton={() => setShowAddButton(!showAddButton)}
          showAdd={showAddButton}
        />

        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddButton && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  deleteTask={deleteTask}
                  onToggle={toggleRemainder}
                />
              ) : (
                "No Task To Do"
              )}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
