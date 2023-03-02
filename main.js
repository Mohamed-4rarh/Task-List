let newTask = document.querySelector(".newtask");
let addNewTask = document.querySelector(".add");
let tasksPage = document.querySelector(".tasks");

let tasksArray = []; //tasks array

if (localStorage.getItem("tasks")) {
  tasksArray = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorage();

addNewTask.onclick = function () {
  if (newTask.value !== "") {
    addTask(newTask.value);
    newTask.value = "";
  }
};

tasksPage.addEventListener("click", (element) => {
  //task done
  if (element.target.classList.contains("task")) {
    toggleTaskByID(element.target.getAttribute("data-id"));
    element.target.classList.toggle("done");
  }
  //delete task
  if (element.target.classList.contains("del")) {
    deleteTask(element.target.parentElement.getAttribute("data-id"));
    element.target.parentElement.remove();
  }
});

//fill the array
function addTask(taskTitle) {
  const task = {
    id: Date.now(),
    title: taskTitle,
    completed: false,
  };
  tasksArray.push(task); //add element to the array
  addTaskToPage(tasksArray); //element add to the page from the array of tasks
  addTaskToLocalStorage(tasksArray); //add task to local storage
}

function addTaskToPage(tasksArray) {
  tasksPage.innerHTML = "";
  tasksArray.forEach((task) => {
    let taskDiv = document.createElement("div");
    taskDiv.className = "task";
    if (task.completed) {
      taskDiv.className = "task done";
    }
    taskDiv.appendChild(document.createTextNode(task.title));
    taskDiv.setAttribute("data-id", task.id);

    let spanDelete = document.createElement("span");
    spanDelete.className = "del";
    spanDelete.appendChild(document.createTextNode("delete"));
    taskDiv.appendChild(spanDelete);
    tasksPage.appendChild(taskDiv);
  });
}

function addTaskToLocalStorage(tasksArray) {
  window.localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasksFromLocalStorage = JSON.parse(data);
    addTaskToPage(tasksFromLocalStorage);
  }
}

function deleteTask(taskId) {
  tasksArray = tasksArray.filter((task) => task.id != taskId);
  addTaskToLocalStorage(tasksArray);
}

function toggleTaskByID(taskId) {
  for (let i = 0; i < tasksArray.length; i++) {
    if (tasksArray[i].id == taskId) {
      tasksArray[i].completed == false
        ? (tasksArray[i].completed = true)
        : (tasksArray[i].completed = false);
    }
  }
  addTaskToLocalStorage(tasksArray);
}
