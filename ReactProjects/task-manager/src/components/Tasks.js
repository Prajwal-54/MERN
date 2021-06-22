import Task from "./Task";

const Tasks = ({ tasks, deleteTask, onToggle }) => {
  return (
    <>
      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          deleteTask={() => deleteTask(task.id)}
          onToggle={onToggle}
        />
      ))}
    </>
  );
};

export default Tasks;
