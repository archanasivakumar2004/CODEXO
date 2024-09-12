const taskInput = document.getElementById("task");
const addBtn = document.getElementById("add");
const taskList = document.getElementById("taskList");

// Add task
addBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        createTask(taskText);
        taskInput.value = "";
    }
});

// Create a new task
function createTask(text) {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        <span class="task-text">${text}</span>
        <div class="button-container">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>
    `;
    taskList.appendChild(taskItem);

    const taskText = taskItem.querySelector(".task-text");
    const editBtn = taskItem.querySelector(".edit");
    const deleteBtn = taskItem.querySelector(".delete");

    // Delete task
    deleteBtn.addEventListener("click", () => {
        taskItem.classList.add("fall");
        taskItem.addEventListener("transitionend", () => {
            taskItem.remove();
        });
    });

    // Mark as completed
    taskText.addEventListener("click", () => {
        taskItem.classList.toggle("completed");
    });

    // Edit task
    editBtn.addEventListener("click", () => {
        if (taskItem.classList.contains("editing")) {
            // Save changes
            const input = taskItem.querySelector(".edit-input");
            taskText.textContent = input.value;
            editBtn.textContent = "Edit";
        } else {
            // Enter edit mode
            const input = document.createElement("input");
            input.type = "text";
            input.className = "edit-input";
            input.value = taskText.textContent;
            taskText.replaceWith(input);
            input.focus();
            editBtn.textContent = "Save";
        }
        taskItem.classList.toggle("editing");
    });
}