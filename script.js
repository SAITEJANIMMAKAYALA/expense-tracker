const taskList = document.getElementById("taskList");

// Add a new task with optional due date
function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  const dueDate = prompt("Enter due date (e.g. 2025-06-10):");

  const li = document.createElement("li");
  li.innerHTML = `
    <div>
      <span ondblclick="editTask(this)">${taskText}</span><br>
      <small>Due: ${dueDate || "Not set"}</small>
    </div>
    <button onclick="deleteTask(this)">❌</button>
  `;

  taskList.appendChild(li);
  input.value = "";
  saveTasks();
}

// Delete a task
function deleteTask(button) {
  button.parentElement.remove();
  saveTasks();
}

// Edit a task text on double click
function editTask(span) {
  const newText = prompt("Edit your task:", span.textContent);
  if (newText !== null && newText.trim() !== "") {
    span.textContent = newText.trim();
    saveTasks();
  }
}

// Save current task list to localStorage
function saveTasks() {
  localStorage.setItem("tasks", taskList.innerHTML);
}

// Load saved tasks from localStorage
function loadTasks() {
  taskList.innerHTML = localStorage.getItem("tasks") || "";
}

// Toggle dark mode and save preference
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}

// Load saved tasks and dark mode on page load
window.onload = function () {
  loadTasks();

  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
  }
};
