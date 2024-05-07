const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

function addTask(taskContent) {
  const li = document.createElement('li');
  const div = document.createElement('div');

  div.innerHTML = `
    <span>${taskContent}</span>
    <div>
        <button class="complete-btn">Concluído</button>
        <button class="delete-btn">Remover</button>
        <button class="edit-btn">Editar</button>
        <button class="save-btn">Salvar</button>
    </div>
    `;

  div.classList.add('box');
  
  li.appendChild(div);
  taskList.appendChild(li);
  
  saveTasksToLocalStorage();
}

function removeTask(task) {
  task.remove();
  saveTasksToLocalStorage();
}

function completeTask(task) {
  task.style.textDecoration = 'line-through';
  task.style.color = '#aaa';
}

function editTask(task) {
  const taskText = task.querySelector('span');
  const editButton = task.querySelector('.edit-btn');
  const saveButton = task.querySelector('.save-btn');

  taskText.contentEditable = true;
  taskText.focus();

  editButton.style.display = 'none';
  saveButton.style.display = 'inline-block';
}

function saveEditedTask(task) {
  const taskText = task.querySelector('span');
  const editButton = task.querySelector('.edit-btn');
  const saveButton = task.querySelector('.save-btn');

  taskText.contentEditable = false;

  editButton.style.display = 'inline-block';
  saveButton.style.display = 'none';

  saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
  const tasks = [];
  const taskItems = document.querySelectorAll('#task-list li span');
  taskItems.forEach(item => {
    tasks.push(item.textContent);
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks) {
    tasks.forEach(task => {
      addTask(task);
    });
  }
}

taskForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const taskContent = taskInput.value.trim();
  if (taskContent !== '') {
    addTask(taskContent);
    taskInput.value = '';
  }
});

taskList.addEventListener('click', function(e) {
  const clickedElement = e.target;
  const task = clickedElement.closest('li');

  if (clickedElement.classList.contains('complete-btn')) {
    completeTask(task);
  }

  if (clickedElement.classList.contains('delete-btn')) {
    removeTask(task);
  }

  if (clickedElement.classList.contains('edit-btn')) {
    editTask(task);
  }

  if (clickedElement.classList.contains('save-btn')) {
    saveEditedTask(task);
  }
});