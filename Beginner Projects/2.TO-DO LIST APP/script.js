let tasksarr = JSON.parse(localStorage.getItem("tasks")) || [];

function display() {
    let list = document.getElementById('tasklist');
    list.innerHTML = "";

    for (let i = 0; i < tasksarr.length; i++) {
        list.innerHTML += `
            <li>
                ${tasksarr[i]}
                <button class="delbtn" data-index="${i}">Delete</button>
            </li>`;
    }

    // Add event listeners to all delete buttons
    let delButtons = document.querySelectorAll(".delbtn");

    delButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            let index = this.getAttribute("data-index");
            tasksarr.splice(index, 1); // remove task
            localStorage.setItem("tasks", JSON.stringify(tasksarr)); 
            display();
        });
    });
}

document.getElementById('add').addEventListener('click', function () {

    let input_text = document.getElementById('taskinput').value;

    if (input_text.trim() === "") return; 

    tasksarr.push(input_text);
    localStorage.setItem("tasks", JSON.stringify(tasksarr));

    display();

    document.getElementById('taskinput').value = "";
});

display();   // load tasks on page load
