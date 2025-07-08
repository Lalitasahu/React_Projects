import React, { useEffect, useState } from "react";

function AddComment() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState("");
  const [comment, setComment] = useState("");

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      console.error("No token found. Please login first.");
      return;
    }

    // Fetch tasks for dropdown
    fetch("http://localhost:8000/api/tasks/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTasks(data.results || data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, [token]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (!token) {
      console.error("No token found. Please login first.");
      return;
    }

    if (!selectedTask) {
      alert("Please select a task to comment on.");
      return;
    }

    const commentData = {
      task: selectedTask,
      comment: comment,
    };

    fetch("http://localhost:8000/api/task-comments/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(commentData),
    })
      .then(async (response) => {
        const text = await response.text();
        if (!response.ok) {
          console.error("Failed to add comment:", text);
          throw new Error(`Error ${response.status}: ${text}`);
        }
        return JSON.parse(text);
      })
      .then((data) => {
        console.log("Comment added:", data);
        alert("Comment added successfully!");
        setComment("");
        setSelectedTask("");
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
        alert("Failed to add comment. Check console for details.");
      });
  };

  return (
    <div>
      <h2>Add Comment to Task</h2>
      <form onSubmit={handleCommentSubmit}>
        <div>
          <label>Select Task:</label>
          <select
            value={selectedTask}
            onChange={(e) => setSelectedTask(e.target.value)}
            required
          >
            <option value="">Select task</option>
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
}

export default AddComment;
