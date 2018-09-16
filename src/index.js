const lists = []
const listDiv = document.getElementById("app-content");
  
document.addEventListener('DOMContentLoaded', () => {
  // your solution here
  // grab DOM elements
  
  
  const listForm = document.querySelector("#create-list-form")
  listForm.addEventListener('submit', function(e) {
    e.preventDefault();

    let titleElement = document.querySelector('#new-list-title')
    let titleName = titleElement.value
    lists.push({ title: titleName, tasks:[] })
    renderTaskLister()
    
  })
});

const renderTaskLister = function(){
  let appElement = document.getElementById("app-content")
  let listBox = '';
  lists.forEach( list => {
    listBox += renderList(list)
  })
  appElement.innerHTML = `
    ${renderDetailsForm()}
    <div id="lists">
      ${listBox}
    </div>
  `
  let taskForm = document.getElementById("create-task-form")
    
  taskForm.addEventListener('submit', e => {
    e.preventDefault()
    const taskDescription = document.getElementById("new-task-description").value
    const priorityLevel = document.getElementById("new-task-priority").value
    const listName = document.getElementById("parent-list").value
    const list = lists.find(function(list){
      return list.title == listName
    })
    list.tasks.push({description:taskDescription, priority:priorityLevel})
    renderTaskLister()
  })
}

const renderDetailsForm = function(){
  let optionsHtml = '';
  lists.forEach( list => {
    optionsHtml += `
    <option value="${list.title}" selected>
      ${list.title}
    </option>`
  })
  return `<form id="create-task-form">
    <label for="parent-list">Select List:</label>
    <select id="parent-list">
      <!-- Major key alert:
      read the docs for HTML option selected:
      https://www.w3schools.com/tags/att_option_selected.asp -->
      ${optionsHtml}
    </select>

    <label for="new-task-description">Task description:</label>
    <input required type="text" id="new-task-description" placeholder="description">

    <label for="new-task-priority">Priority level:</label>
    <input type="text" id="new-task-priority" placeholder="priority">
    <input type="submit" value="Create New Task">
  </form>`
}

const renderList = function(list){
  let tasksHtml = '';
  list.tasks.forEach( task => {
   tasksHtml += renderListTask(task)
  })
  return `
  <div>
    <h2>${list.title}
      <button id="del-list-btn" data-title="${list.title}" class="delete-list">
        X
      </button>
    </h2>
    <ul id="taskbox">
      ${tasksHtml}
    </ul>
  </div>
  `
}

const renderListTask =  function(task){
  
  return `
  <li>
      Task: ${task.description}
        <button data-list-title="doughnuts" data-task-name="chocolate" class="delete-task">
          X
        </button>
        <br>
      Priority: ${task.priority}
  </li>
  `
  
}

// let deleteBtn = document.getElementById("del-list-btn")
// deleteBtn.addEventListener("click", e => {
//   console.log(e)
//   e.target.parentElement.remove()
// })


