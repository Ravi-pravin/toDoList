document.addEventListener("DOMContentLoaded", loadTasks);

/* LocalStorage helpers */
function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* Add Task */
function addTask() {

    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

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

/* Load Tasks */
function loadTasks() {

    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    const tasks = getTasks();

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
        <div class="task-row">

            <span class="task-sno">${index + 1}.</span>

            <span class="task-topic">${task.text}</span>

            <div class="task-actions">

                <div class="tick-btn ${task.status === 'tick' ? 'tick-active' : ''}"
                    onclick="updateStatus(${index}, 'tick')">
                    <i class="fa-solid fa-check"></i>
                </div>

                <div class="x-btn ${task.status === 'x' ? 'x-active' : ''}"
                    onclick="updateStatus(${index}, 'x')">
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

/* Update Status */
function updateStatus(index, status) {

    const tasks = getTasks();

    tasks[index].status = status;

    saveTasks(tasks);

    loadTasks();
}

/* Delete Task */
function deleteTask(index) {

    const tasks = getTasks();

    tasks.splice(index, 1);

    saveTasks(tasks);

    loadTasks();
}