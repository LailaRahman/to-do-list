document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add");
  const inputBox = document.getElementById("input-box");
  const taskList = document.querySelector(".tasklist");

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
