// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // Add task event
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask)
  document.addEventListener('DOMContentLoaded', getTasks)
  taskList.addEventListener('click', editTask)
        
}

// Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
  }

  // Create li element
  const li = document.createElement('li');
  
  // Add class
  li.className = 'collection-item';
  
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));

  //link elemnet for edit
  const link2 = document.createElement('a');
  
  // Add class
  link2.className = 'edit-item secondary-content';
  
  // Add icon html
  link2.innerHTML = '<i class="fa fa-edit"></i>'
  
  // Append the link to li
  li.appendChild(link2);

  
  // Create new link element for delete
  const link = document.createElement('a');
  
  // Add class
  link.className = 'delete-item secondary-content';
  
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  
  // Append the link to li
  li.appendChild(link);

  
  // Append li to ul
  taskList.appendChild(li);

  //store in ls
  storeTaskInLocalStorage(taskInput.value)

  // Clear input
  taskInput.value = '';

  e.preventDefault();
}

function editTask(e) {
  if(e.target.parentElement.classList.contains('edit-item')) {
    if(confirm('Are you sure?')){

      
      
      e.target.parentElement.parentElement.remove()

      removeTaskFromLocalStorage(e.target.parentElement.parentElement)
  }
  }
}



function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove()

            

            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }

        taskInput.value = ''
        
    }

}

function removeTaskFromLocalStorage(taskItem) {
    
  let tasks
  if(localStorage.getItem('tasks') === null) {
      tasks = []

  } else{
      tasks = JSON.parse(localStorage.getItem('tasks'))

  } 

  tasks.forEach(function(task, index){
      if(taskItem.textContent === task){
        console.log(taskItem.textContent)
        taskInput.value = taskItem.textContent
        console.log(index, 1)

          tasks.splice(index, 1)
      }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function storeTaskInLocalStorage(task) {
  let tasks
  if(localStorage.getItem('tasks') === null) {
      tasks = []

  } else{
      tasks = JSON.parse(localStorage.getItem('tasks'))

  }
  tasks.push(task)

  localStorage.setItem('tasks', JSON.stringify(tasks))

  

}

function getTasks() {
  let tasks
  if(localStorage.getItem('tasks') === null) {
      tasks = []

  } else{
      tasks = JSON.parse(localStorage.getItem('tasks'))

  }

  tasks.forEach(function(task){
      const li = document.createElement('li')
      
      li.className = 'collection-item'
      
      li.appendChild(document.createTextNode(task))
      
      const link2 = document.createElement('a');
  
  
      link2.className = 'edit-item secondary-content';
  
  
      link2.innerHTML = '<i class="fa fa-edit"></i>'
  
  
      li.appendChild(link2);

      const link = document.createElement('a');
  
  
      link.className = 'delete-item secondary-content';
  
  
      link.innerHTML = '<i class="fa fa-remove"></i>';
  
  
      li.appendChild(link);


      
      taskList.appendChild(li)
  })
}