import React, { useEffect, useState } from "react";

function Home() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      console.error("No token found. Please login first.");
      return;
    }
    
    fetch("http://localhost:8000/api/tasks/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTasks(data.results || []))
      .catch((error) => console.error("Error fetching tasks:", error));
      
  }, [token]);
  
  return (
    <div>
      <h2>All Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
            {tasks.map((task) => {
                return (
                <li key={task.id}>
                    <strong>{task.title}</strong> - {task.status}
                    <br />
                    <span>Assigned to: {typeof task.assigned_to === 'object' ? task.assigned_to.username : task.assigned_to || 'Unassigned'}</span>
                    <br />
                    <span>Due Date: {task.due_date ? new Date(task.due_date).toLocaleDateString() : "No due date"}</span>
                    <br />
                    <span>Description: {task.description || "No description"}</span>
                    <br />
                </li>
                );
            })}
        </ul>

      )}
    </div>
  );
}

export default Home;
