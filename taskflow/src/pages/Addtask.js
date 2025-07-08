import React, { useEffect, useState } from "react";

function CreateTask() {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("TODO");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [project, setProject] = useState("");

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      console.error("No token found. Please login first.");
      return;
    }

    // Fetch users
    fetch("http://localhost:8000/api/users/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const usersData = Array.isArray(data.results) ? data.results : data;
        setUsers(usersData);
      })
      .catch((error) => console.error("Error fetching users:", error));

    // Fetch projects
    fetch("http://localhost:8000/api/projects/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const projectsData = Array.isArray(data.results) ? data.results : data;
        setProjects(projectsData);
      })
      .catch((error) => console.error("Error fetching projects:", error));
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!token) {
      console.error("No token found. Please login first.");
      return;
    }

    const data = {
    title,
    description,
    status,
    due_date: dueDate || null,
    assigned_to_id: assignedTo ? parseInt(assignedTo) : null,
    project: project ? parseInt(project) : null,
    };


    // Convert assigned_to to integer if selected
    if (assignedTo) {
      data.assigned_to = parseInt(assignedTo);
    }

    // Convert project to integer if selected
    if (project) {
      data.project = parseInt(project);
    }

    console.log("Submitting task data:", data); // For debugging final payload

    fetch("http://localhost:8000/api/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const text = await response.text();
        console.log("Response status:", response.status);
        console.log("Response text:", text);

        if (!response.ok) {
          throw new Error(
            `Network response was not ok. Status: ${response.status}, Body: ${text}`
          );
        }

        return JSON.parse(text);
      })
      .then((data) => {
        console.log("Task created successfully:", data);
        // Reset form
        setTitle("");
        setDescription("");
        setStatus("TODO");
        setDueDate("");
        setAssignedTo("");
        setProject("");
        alert("Task created successfully!");
      })
      .catch((error) => {
        console.error("Error creating task:", error);
        alert("Failed to create task. Check console for details.");
      });
  };

  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
        </div>

        <div>
          <label>Due Date:</label>
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div>
          <label>Assign To:</label>
            <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                required
                >
                <option value="">Select user</option>
                {users.map((user) => (
                    <option key={user.id} value={user.id}>
                    {user.username}
                    </option>
                ))}
            </select>
        </div>

        <div>
          <label>Project:</label>
          <select
            value={project}
            onChange={(e) => setProject(e.target.value)}
          >
            <option value="">Select project (optional)</option>
            {projects.map((proj) => (
              <option key={proj.id} value={proj.id}>
                {proj.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}

export default CreateTask;
