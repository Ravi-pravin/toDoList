// Run everything when page loads
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  updateSaveButtonUI();
});

/* --------------------------
   Get tasks from storage
---------------------------*/
function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

/* --------------------------
   Save tasks to storage
---------------------------*/
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* --------------------------
   Add new task
---------------------------*/
function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  // prevent empty task
  if (taskText === "") {
    alert("Enter task");
    return;
  }

  const tasks = getTasks();

  tasks.push({
    text: taskText,
    status: ""
  });

  saveTasks(tasks);

  input.value = "";
  loadTasks();
}

/* --------------------------
   Show all tasks
---------------------------*/
function loadTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  // load saved list if exists, else normal tasks
  const tasks =
    JSON.parse(localStorage.getItem("savedTodoList")) || getTasks();

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="task-row">

        <span class="task-sno">${index + 1}.</span>

        <span class="task-topic">${task.text}</span>

        <div class="task-actions">

          <div class="tick-btn ${
            task.status === "tick" ? "tick-active" : ""
          }" onclick="updateStatus(${index}, 'tick')">
            <i class="fa-solid fa-check"></i>
          </div>

          <div class="x-btn ${
            task.status === "x" ? "x-active" : ""
          }" onclick="updateStatus(${index}, 'x')">
            <i class="fa-solid fa-xmark"></i>
          </div>

          <div class="trash-btn" onclick="deleteTask(${index})">
            <i class="fa-solid fa-trash-can"></i>
          </div>

        </div>

      </div>
    `;

    taskList.appendChild(li);
  });
}

/* --------------------------
   Update task status
---------------------------*/
function updateStatus(index, status) {
  const tasks =
    JSON.parse(localStorage.getItem("savedTodoList")) || getTasks();

  tasks[index].status = status;

  saveTasks(tasks);

  if (localStorage.getItem("savedTodoList")) {
    localStorage.setItem("savedTodoList", JSON.stringify(tasks));
  }

  loadTasks();
}

/* --------------------------
   Delete single task
---------------------------*/
function deleteTask(index) {
  const tasks =
    JSON.parse(localStorage.getItem("savedTodoList")) || getTasks();

  tasks.splice(index, 1);

  saveTasks(tasks);

  if (localStorage.getItem("savedTodoList")) {
    localStorage.setItem("savedTodoList", JSON.stringify(tasks));
  }

  loadTasks();
}

/* --------------------------
   Save full list
---------------------------*/
function saveList() {
  const tasks = getTasks();

  localStorage.setItem("savedTodoList", JSON.stringify(tasks));

  // mark as saved
  localStorage.setItem("isListSaved", "true");

  updateSaveButtonUI();

  alert("List saved successfully");
}

/* --------------------------
   Update Save button UI
---------------------------*/
function updateSaveButtonUI() {
  const saveBtn = document.getElementById("saveBtn");
  const isSaved = localStorage.getItem("isListSaved");

  if (isSaved === "true") {
    saveBtn.innerText = "List Saved";
    saveBtn.classList.add("saved-state");
  } else {
    saveBtn.innerText = "Save List";
    saveBtn.classList.remove("saved-state");
  }
}

/* --------------------------
   Delete full saved list
---------------------------*/
function deleteList() {
  localStorage.removeItem("savedTodoList");
  localStorage.removeItem("tasks");
  localStorage.removeItem("isListSaved");

  updateSaveButtonUI();
  loadTasks();

  alert("List deleted successfully");
}