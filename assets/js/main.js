let tasks = [
    { id: 1, name: "Desayunar.", completed: false },
    { id: 2, name: "Estudiar.", completed: false },
    { id: 3, name: "Trabajar.", completed: false },
  ];
  
  const taskList = document.querySelector(".tasks");
  const addButton = document.querySelector(".add");
  const total = document.querySelector("#total");
  const done = document.querySelector("#done");
  const addValue = document.querySelector(".addInput");
  
  addButton.addEventListener("click", () => {
    if(addValue.value === ""){
      alert('Agrega un nombre para la tarea');
      return;
    }
    if(tasks.length != 0) {
      const idMapping = tasks[tasks.length-1].id;
      const newTask = { id: idMapping+1, name: addValue.value, completed: false }
      tasks.push(newTask);
    } else {
      const newTask = { id: 1, name: addValue.value, completed: false }
      tasks.push(newTask);
    }
    addValue.value = "";
    renderTasks();
  });
  
  deleteTask = (id) => {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    tasks.splice(taskIndex, 1);
    renderTasks();
  }
  
  changeStatus = (id) => {  
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if(tasks[taskIndex].completed == false) {
      const newObject = { id: tasks[taskIndex].id, name: tasks[taskIndex].name, completed: true };
      tasks.splice(taskIndex, 1, newObject);
    } else {
      const newObject = { id: tasks[taskIndex].id, name: tasks[taskIndex].name, completed: false };
      tasks.splice(taskIndex, 1, newObject);
    }
    renderTasks();
  }
  
  const renderTasks = () => {
    let html = "";
    let inputCheck ="";
    let doneCount= [];
    for (const task of tasks) {
      inputCheck = task.completed ? 
      `<input class="checkbox" type="checkbox" onclick="changeStatus(${task.id})" checked="true">`
      : `<input class="checkbox" type="checkbox" onclick="changeStatus(${task.id})" >`;
      html += `
        <tr>
          <td>${task.id}</td>
          <td class="name">${task.name}</td>
          <td>${inputCheck}</td>
          <td><button class="delete" onclick="deleteTask(${task.id})"> x </button></td>
        </tr> 
      `;
      if(task.completed === true) {
        doneCount.push(task);
      }
    }
    taskList.innerHTML = html;
    total.innerHTML = tasks.length;
    done.innerHTML = doneCount.length;
  }
  
  renderTasks();