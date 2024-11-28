// document.addEventListener("DOMContentLoaded", function() {
//   // Select elements
//   const addButton = document.getElementById("add");
//   const inputBox = document.getElementById("input-box");
//   const taskList = document.querySelector(".tasklist");

//   // Load tasks from localStorage and render them
//   loadTasks();

//   // Function to add a new task
//   function addTask() {
//     const taskText = inputBox.value.trim();

//     if (taskText === "") {
//       alert("Please enter a task!");
//       return; // Do nothing if input is empty
//     }

//     // Create elements for the task
//     const taskWrapper = document.createElement("div");
//     taskWrapper.classList.add("wrapper");

//     const checkbox = document.createElement("input");
//     checkbox.type = "checkbox";

//     const taskSpan = document.createElement("span");
//     taskSpan.classList.add("text");
//     taskSpan.textContent = taskText;

//     const crossBtn = document.createElement("button");
//     crossBtn.classList.add("cross-btn");
//     crossBtn.innerHTML = "&times;";
//     crossBtn.addEventListener("click", removeTask);

//     // Append elements to the task wrapper
//     taskWrapper.appendChild(checkbox);
//     taskWrapper.appendChild(taskSpan);
//     taskWrapper.appendChild(crossBtn);

//     // Append task wrapper to the task list
//     taskList.appendChild(taskWrapper);

//     // Add the task to the localStorage
//     const tasks = getTasksFromStorage();
//     tasks.push({ text: taskText, completed: false }); // New task is not completed
//     saveTasksToStorage(tasks);

//     // Clear input box
//     inputBox.value = "";
//   }

//   // Function to remove a task
//   function removeTask(event) {
//     const task = event.target.parentElement;
//     const taskText = task.querySelector(".text").textContent;
//     task.remove();

//     // Remove the task from localStorage
//     const tasks = getTasksFromStorage().filter(t => t.text !== taskText);
//     saveTasksToStorage(tasks);
//   }

//   // Function to toggle task completion
//   function toggleTaskCompletion(event) {
//     const checkbox = event.target;
//     const taskText = checkbox.parentElement.querySelector(".text").textContent;

//     const tasks = getTasksFromStorage();
//     const task = tasks.find(t => t.text === taskText);
//     task.completed = checkbox.checked;

//     saveTasksToStorage(tasks);
//   }

//   // Function to load tasks from localStorage
//   function loadTasks() {
//     const tasks = getTasksFromStorage();
//     tasks.forEach(task => {
//       const taskWrapper = document.createElement("div");
//       taskWrapper.classList.add("wrapper");

//       const checkbox = document.createElement("input");
//       checkbox.type = "checkbox";
//       checkbox.checked = task.completed; // Set the checkbox state based on stored data
//       checkbox.addEventListener("change", toggleTaskCompletion);

//       const taskSpan = document.createElement("span");
//       taskSpan.classList.add("text");
//       taskSpan.textContent = task.text;

//       const crossBtn = document.createElement("button");
//       crossBtn.classList.add("cross-btn");
//       crossBtn.innerHTML = "&times;";
//       crossBtn.addEventListener("click", removeTask);

//       taskWrapper.appendChild(checkbox);
//       taskWrapper.appendChild(taskSpan);
//       taskWrapper.appendChild(crossBtn);

//       taskList.appendChild(taskWrapper);
//     });
//   }

//   // Function to get tasks from localStorage
//   function getTasksFromStorage() {
//     const tasks = localStorage.getItem("tasks");
//     return tasks ? JSON.parse(tasks) : [];
//   }

//   // Function to save tasks to localStorage
//   function saveTasksToStorage(tasks) {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   }

//   // Event listener for the "Add" button
//   addButton.addEventListener("click", addTask);

//   // Optional: Add a listener for pressing "Enter" to add a task
//   inputBox.addEventListener("keypress", function(event) {
//     if (event.key === "Enter") {
//       addTask();
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  // Global variables for commonly used DOM elements
  const addButton = document.getElementById("add");
  const inputBox = document.getElementById("input-box");
  const taskList = document.querySelector(".tasklist");

  // Function to add a new task
  const addTask = () => {
    const taskText = inputBox.value.trim();
    if (taskText === "") {
      alert("Please enter a task!");
      return;
    }

    const taskWrapper = document.createElement("div");
    taskWrapper.classList.add("wrapper");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const taskSpan = document.createElement("span");
    taskSpan.classList.add("text");
    taskSpan.textContent = taskText;

    const crossBtn = document.createElement("button");
    crossBtn.classList.add("cross-btn");
    crossBtn.innerHTML = "&times;";
    crossBtn.addEventListener("click", removeTask);

    taskWrapper.append(checkbox, taskSpan, crossBtn);
    taskList.appendChild(taskWrapper);

    const tasks = getTasksFromStorage();
    tasks.push({ text: taskText, completed: false });
    saveTasksToStorage(tasks);
    inputBox.value = "";
  };

  const removeTask = (event) => {
    const task = event.target.parentElement;
    const taskText = task.querySelector(".text").textContent;
    task.remove();

    const tasks = getTasksFromStorage().filter(t => t.text !== taskText);
    saveTasksToStorage(tasks);
  };

  const toggleTaskCompletion = (event) => {
    const checkbox = event.target;
    const taskText = checkbox.parentElement.querySelector(".text").textContent;

    const tasks = getTasksFromStorage();
    const task = tasks.find(t => t.text === taskText);
    task.completed = checkbox.checked;

    saveTasksToStorage(tasks);
  };

  const loadTasks = () => {
    const tasks = getTasksFromStorage();
    tasks.forEach(task => {
      const taskWrapper = document.createElement("div");
      taskWrapper.classList.add("wrapper");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", toggleTaskCompletion);

      const taskSpan = document.createElement("span");
      taskSpan.classList.add("text");
      taskSpan.textContent = task.text;

      const crossBtn = document.createElement("button");
      crossBtn.classList.add("cross-btn");
      crossBtn.innerHTML = "&times;";
      crossBtn.addEventListener("click", removeTask);

      taskWrapper.append(checkbox, taskSpan, crossBtn);
      taskList.appendChild(taskWrapper);
    });
  };

  const getTasksFromStorage = () => JSON.parse(localStorage.getItem("tasks")) || [];
  const saveTasksToStorage = (tasks) => localStorage.setItem("tasks", JSON.stringify(tasks));

  loadTasks();
  addButton.addEventListener("click", addTask);
  inputBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") addTask();
  });
});
