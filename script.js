let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  tasks.push({ text: taskText, done: false });
  taskInput.value = "";
  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskEl = document.createElement("div");
    taskEl.className = "task-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.onchange = () => toggleTask(index);

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.done) span.style.textDecoration = "line-through";

    taskEl.appendChild(checkbox);
    taskEl.appendChild(span);
    taskList.appendChild(taskEl);
  });

  updateProgressBar();
}

function updateProgressBar() {
  const completed = tasks.filter(t => t.done).length;
  const percent = tasks.length === 0 ? 0 : (completed / tasks.length) * 100;
  document.getElementById("progressBar").style.width = percent + "%";
}

function displayAllTasks() {
  const displayDiv = document.getElementById("displayedTasks");
  const messageField = document.getElementById("taskMessage");

  if (tasks.length === 0) {
    displayDiv.innerText = "No tasks added yet!";
    displayDiv.style.display = "block";
    messageField.value = "";
    return;
  }

  const formattedTasks = tasks
    .map((t, i) => `${i + 1}. ${t.text} - ${t.done ? "✅ Completed" : "❌ Not Done"}`)
    .join("\n");

  displayDiv.innerText = formattedTasks;
  displayDiv.style.display = "block";
  messageField.value = formattedTasks;  // pre-fill for email
}
