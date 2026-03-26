/**
 * Task Manager Frontend Logic
 */
document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  /**
   * Fetch all tasks from the API
   */
  const fetchTasks = async () => {
    try {
      const res = await fetch("api/tasks.php");
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const tasks = await res.json();
      renderTasks(tasks);
    } catch (error) {
      console.error("Error:", error);
      taskList.innerHTML = `<div class="empty-state">Error loading tasks. Is the database connected?</div>`;
    }
  };

  /**
   * Render the list of tasks to the DOM
   */
  const renderTasks = (tasks) => {
    if (tasks.length === 0) {
      taskList.innerHTML = `<div class="empty-state">No tasks found. Add one above!</div>`;
      return;
    }

    taskList.innerHTML = tasks
      .map((task) => {
        const date = new Date(task.created_at).toLocaleString([], {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        const statusClass = task.status.toLowerCase();

        return `
                <div class="task-card ${statusClass}">
                    <div class="task-info">
                        <strong>${escapeHTML(task.task_name)}</strong>
                        <span>${date}</span>
                    </div>
                    <button 
                        class="status-btn ${statusClass}" 
                        onclick="changeStatus(${task.id}, '${task.status}')"
                        title="Click to cycle status"
                    >
                        ${task.status}
                    </button>
                </div>
            `;
      })
      .join("");
  };

  /**
   * Cycle through statuses: Created -> WIP -> Completed -> Created
   */
  window.changeStatus = async (id, currentStatus) => {
    const flow = {
      Created: "WIP",
      WIP: "Completed",
      Completed: "Created",
    };

    const nextStatus = flow[currentStatus];

    try {
      const res = await fetch("api/tasks.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_status",
          id: id,
          status: nextStatus,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Update failed");
      }

      // Refresh list
      fetchTasks();
    } catch (error) {
      alert("Error updating status: " + error.message);
    }
  };

  /**
   * Handle new task submission
   */
  taskForm.onsubmit = async (e) => {
    e.preventDefault();
    const task_name = taskInput.value.trim();

    if (!task_name) return;

    try {
      const res = await fetch("api/tasks.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create", task_name }),
      });

      if (!res.ok || !res.headers.get('Content-Type')?.includes('application/json')) {
        const errText = await res.text();
        console.error('Response:', res.status, errText);
        throw new Error(`Server error ${res.status}: ${errText.slice(0,100)}`);
      }
      const data = await res.json();

      taskInput.value = "";
      fetchTasks();
    } catch (error) {
      alert("Error creating task: " + error.message);
    }
  };

  /**
   * Small utility to prevent XSS
   */
  function escapeHTML(str) {
    const p = document.createElement("p");
    p.textContent = str;
    return p.innerHTML;
  }

  // Initial load
  fetchTasks();
});
