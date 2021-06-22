import { useState } from "react";

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);

  //after submiting add task
  const submitTask = (e) => {
    e.preventDefault();
    if (!text) {
      alert("please add task");
      return;
    }
    if (!day) {
      alert("please add date and time");
      return;
    }
    onAdd({ text, day, reminder });

    setReminder(false);
    setText("");
    setDay("");
  };

  return (
    <form className="add-form" onSubmit={(e) => submitTask(e)}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="add task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Day & time</label>
        <input
          type="text"
          placeholder="add date and time"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className="form-control form-control-checkbox ">
        <label>Reminder</label>
        <input
          type="checkbox"
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>
      <input type="submit" value="Add task" className="btn btn-block" />
    </form>
  );
};

export default AddTask;
