const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

addBtn.addEventListener("click", addTask);

// Press Enter to add a task
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {

    if (input.value.trim() === "") {
        return;
    }

    tasks.push({
        text: input.value.trim(),
        completed: false
    });

    saveTasks();
    displayTasks();

    input.value = "";
}

function displayTasks() {

    taskList.innerHTML = "";

    // Update task counter
    taskCount.textContent = `Total Tasks: ${tasks.length}`;

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        if (task.completed) {
            taskText.classList.add("completed");
        }

        taskText.addEventListener("click", function() {

            tasks[index].completed = !tasks[index].completed;

            saveTasks();
            displayTasks();

        });

        const deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function() {

            tasks.splice(index, 1);

            saveTasks();
            displayTasks();

        });

        li.appendChild(taskText);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });

}

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}
