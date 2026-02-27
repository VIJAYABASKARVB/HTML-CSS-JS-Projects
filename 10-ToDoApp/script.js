// darkmode -> id name for the darkmode logo.
// tasksInput -> id for the input from the user.
// add-button -> id for the task add button.
// all-tasks -> class name for the "ALL" filter button.
// active-tasks -> class name for the "ACTIVE" filter button.
// completed-tasks -> class name for the "COMPLETED" filter button.
// left-task -> class name for the DISPLAYING task left.
// task-list -> class for list container

// -------------------------------
// ELEMENT SELECTION
// -------------------------------
const Input = document.getElementById('tasksInput');
const addbtn = document.getElementById('add-button');
const taskListContainer = document.getElementsByClassName('task-list')[0];
const leftTasks = document.getElementsByClassName('left-tasks')[0];

const allTasksBtn = document.getElementsByClassName('all-tasks')[0];
const activeTasksBtn = document.getElementsByClassName('active-tasks')[0];
const completedTasksBtn = document.getElementsByClassName('completed-tasks')[0];


// -------------------------------
// GLOBAL STATE (SOURCE OF TRUTH)
// -------------------------------
var taskArray = [];


// -------------------------------
// LOAD TASKS FROM LOCAL STORAGE (RUNS ON PAGE LOAD)
// -------------------------------
const storedTasks = JSON.parse(localStorage.getItem("storedTasks"));
if (storedTasks !== null) {
    taskArray = storedTasks;
}

renderAllTasks();  


// -------------------------------
// ADD TASK
// -------------------------------
addbtn.addEventListener('click', addTasktoList);

function addTasktoList() {

    let checkInput = Input.value.trim();
    if (checkInput === "") return;

    let uuid = self.crypto.randomUUID();

    let tempTask = {
        id: uuid,
        taskName: checkInput,
        completed: false
    };

    taskArray.push(tempTask);

    localStorage.setItem("storedTasks", JSON.stringify(taskArray));

    Input.value = "";               
    renderAllTasks();              
}


// -------------------------------
// RENDER ALL TASKS (NEW CLEAN FUNCTION)
// -------------------------------
function renderAllTasks() {

    taskListContainer.innerHTML = "";   

    taskArray.forEach(T => {
        updateTodiv(T);
    });

    updateTaskCount();
}


// -------------------------------
// RENDER ONE TASK
// -------------------------------
function updateTodiv(T) {

    var newDiv = document.createElement('div');
    newDiv.classList.add('task');

    newDiv.innerHTML = `
        <input type="checkbox" id="${T.id}">
        <div class='inside-text'>
            <label for="${T.id}">${T.taskName}</label>
            <button class="deletebtn">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;

    // -------------------------------
    // RESTORE COMPLETED STATE
    // -------------------------------
    const checkbox = newDiv.querySelector("input");

    if (T.completed === true) {
        checkbox.checked = true;
        newDiv.classList.add('completed');
    }

    // -------------------------------
    // CHECKBOX TOGGLE
    // -------------------------------
    checkbox.addEventListener("change", () => {

        T.completed = checkbox.checked;

        if (checkbox.checked) {
            newDiv.classList.add("completed");
        } else {
            newDiv.classList.remove("completed");
        }

        localStorage.setItem("storedTasks", JSON.stringify(taskArray));
        updateTaskCount();
    });

    // -------------------------------
    // DELETE BUTTON
    // -------------------------------
    newDiv.querySelector("button").addEventListener('click', () => {

        taskArray = taskArray.filter(task => task.id !== T.id);

        localStorage.setItem("storedTasks", JSON.stringify(taskArray));

        renderAllTasks();  
    });

    taskListContainer.append(newDiv);
}


// -------------------------------
// TASK COUNTER
// -------------------------------
function updateTaskCount() {

    let taskLeft = taskArray.filter(task => task.completed === false).length;

    leftTasks.innerText = `${taskLeft} tasks left`;
}


// -------------------------------
// FILTER BUTTONS
// -------------------------------
allTasksBtn.addEventListener('click', () => {
    document.querySelectorAll(".task").forEach(task => {
        task.classList.remove("hidden");
    });
});

activeTasksBtn.addEventListener('click', () => {
    document.querySelectorAll(".task").forEach(task => {
        if (task.querySelector("input").checked === false) {
            task.classList.remove("hidden");
        } else {
            task.classList.add("hidden");
        }
    });
});

completedTasksBtn.addEventListener('click', () => {
    document.querySelectorAll(".task").forEach(task => {
        if (task.querySelector("input").checked === true) {
            task.classList.remove("hidden");
        } else {
            task.classList.add("hidden");
        }
    });
});