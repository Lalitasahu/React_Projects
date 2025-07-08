import React from "react";

function CreateProject() {
  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("No token found. Please login first.");
      return;
    }

    // Change keys to match Django model fields
    const data = {
      name: e.target.projectName.value,
      description: e.target.description.value,
      start_date: e.target.startDate.value,
      end_date: e.target.endDate.value,
    };

    fetch("http://localhost:8000/api/projects/", {
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
        console.log("Success:", data);
        e.target.reset();
        alert("Project created successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to create project. Check console for details.");
      });
  };

  return (
    <div>
      <h2>Create Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Project Name:</label>
          <input type="text" name="projectName" required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" required></textarea>
        </div>
        <div>
          <label>Start Date:</label>
          <input type="date" name="startDate" required />
        </div>
        <div>
          <label>End Date:</label>
          <input type="date" name="endDate" required />
        </div>
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}

export default CreateProject;
