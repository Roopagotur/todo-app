import React, { useState, useEffect } from "react";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [editIndex, setEditIndex] = useState(null); // Track edit mode

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add or Update Task
  const handleTask = () => {
    if (taskInput.trim() === "") return;

    if (editIndex !== null) {
      // Editing existing task
      const updatedTasks = [...tasks];
      updatedTasks[editIndex].text = taskInput;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      // Adding new task
      setTasks([...tasks, { text: taskInput, completed: false }]);
    }

    setTaskInput("");
  };

  // Toggle task completion
  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // Delete task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Edit task
  const editTask = (index) => {
    setTaskInput(tasks[index].text);
    setEditIndex(index);
  };

  return (
    <div style={styles.container}>
      <h2>To-Do List Application</h2>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Add or edit a task..."
          style={styles.input}
        />
        <button onClick={handleTask} style={styles.addButton}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <ul style={styles.list}>
        {tasks.map((task, index) => (
          <li key={index} style={{ ...styles.task, textDecoration: task.completed ? "line-through" : "none" }}>
            <span onClick={() => toggleTask(index)}>{task.text}</span>
            <div>
              <button onClick={() => editTask(index)} style={styles.editButton}>✏️</button>
              <button onClick={() => deleteTask(index)} style={styles.deleteButton}>❌</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Inline CSS Styles
const styles = {
  container: { width: "350px", margin: "auto", textAlign: "center", padding: "20px", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#f9f9f9" },
  inputContainer: { display: "flex", justifyContent: "space-between", marginBottom: "10px" },
  input: { flex: 1, padding: "5px" },
  addButton: { marginLeft: "10px", padding: "5px 10px", cursor: "pointer", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "3px" },
  list: { listStyle: "none", padding: 0 },
  task: { display: "flex", justifyContent: "space-between", padding: "8px", borderBottom: "1px solid #ddd", cursor: "pointer" },
  editButton: { background: "none", border: "none", cursor: "pointer", marginRight: "5px" },
  deleteButton: { background: "none", border: "none", cursor: "pointer" }
};

export default TodoApp;
