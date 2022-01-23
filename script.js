/* eslint-disable no-console */

const taskList = document.getElementById('lista-tarefas');
const inputTaks = document.getElementById('texto-tarefa');
const buttonAddTask = document.getElementById('criar-tarefa');
const buttonSaveTasks = document.getElementById('salvar-tarefas');
const buttonMoveToAbove = document.getElementById('mover-cima');
const buttonMoveToBelow = document.getElementById('mover-baixo');

function removeSelectedListItem(event) {
  taskList.removeChild(event.target.parentNode);
}

function markItemAsCompleted(click) {
  const markedItem = click.target;
  if (markedItem.classList.contains('fa-square')) {
    markedItem.classList.remove('fa-square');
    markedItem.classList.add('fa-check-square');
    markedItem.nextElementSibling.classList.add('completed');
  } else if (markedItem.classList.contains('fa-check-square')) {
    markedItem.classList.remove('fa-check-square');
    markedItem.classList.add('fa-square');
    markedItem.nextElementSibling.classList.remove('completed');
  }
}

function editButtonAction(click) {
  const editInput = click.target.previousElementSibling;
  const currentTask = editInput.previousElementSibling;
  editInput.value = currentTask.textContent;
  currentTask.style.display = 'none';
  editInput.style.display = 'flex';
  editInput.focus();
}

function editTask(input) {
  const editInput = input;
  const currentTask = editInput.previousElementSibling;
  if (editInput.value) {
    currentTask.textContent = editInput.value;
    editInput.style.display = 'none';
    currentTask.style.display = 'flex';
    editInput.value = '';
  } else {
    editInput.style.display = 'none';
    currentTask.style.display = 'flex';
    editInput.value = '';
  }
}

function changeToEditTask(event) {
  editTask(event.target);
}

function pressEnterToEditTask(event) {
  if (event.key === 'Enter') {
    editTask(event.target);
  }
}

function moveItemToAbove() {
  const selectedItem = document.querySelector('.selected');
  if (selectedItem) {
    const previousItem = selectedItem.previousElementSibling;
    if (previousItem) {
      taskList.insertBefore(previousItem, selectedItem.nextElementSibling);
    }
  }
}

buttonMoveToAbove.addEventListener('click', moveItemToAbove);

function moveItemToBelow() {
  const selectedItem = document.querySelector('.selected');
  if (selectedItem) {
    const nextItem = selectedItem.nextElementSibling;
    if (nextItem) {
      taskList.insertBefore(nextItem, selectedItem);
    }
  }
}

buttonMoveToBelow.addEventListener('click', moveItemToBelow);

function clearList() {
  taskList.innerHTML = '';
}

const buttonClearList = document.getElementById('apaga-tudo');
buttonClearList.addEventListener('click', clearList);

function clearCompletedTasks() {
  const arrayListItems = document.querySelectorAll('.completed');
  for (let i = 0; i < arrayListItems.length; i += 1) {
    taskList.removeChild(arrayListItems[i]);
  }
}

const buttonClearCompletedItems = document.getElementById('remover-finalizados');
buttonClearCompletedItems.addEventListener('click', clearCompletedTasks);

function createCheckbox() {
  const newCheckbox = document.createElement('span');
  newCheckbox.className = 'far fa-square checkbox';
  newCheckbox.title = 'Marcar tarefa como concluída';
  newCheckbox.addEventListener('click', markItemAsCompleted);
  return newCheckbox;
}

function createTaskText(string) {
  const newTaskText = document.createElement('span');
  newTaskText.className = 'list-text';
  newTaskText.title = 'Tarefa';
  newTaskText.textContent = string;
  return newTaskText;
}

function createEditButton() {
  const newEditButton = document.createElement('span');
  newEditButton.className = 'fas fa-edit edit-button';
  newEditButton.title = 'Editar tarefa';
  newEditButton.addEventListener('click', editButtonAction);
  return newEditButton;
}

function createInputEditTask() {
  const newEditInput = document.createElement('input');
  newEditInput.type = 'text';
  newEditInput.className = 'edit-input';
  newEditInput.style.display = 'none';
  newEditInput.style.flexGrow = '1';
  newEditInput.addEventListener('keypress', pressEnterToEditTask);
  newEditInput.addEventListener('blur', changeToEditTask);
  return newEditInput;
}

function createRemoveButton() {
  const newRemoveButton = document.createElement('span');
  newRemoveButton.className = 'fas fa-trash-alt remove-button';
  newRemoveButton.title = 'Remover tarefa';
  newRemoveButton.addEventListener('click', removeSelectedListItem);
  return newRemoveButton;
}

function dragOver(event) {
  event.preventDefault();
}

function dragStart() {
  console.log('dragstart disparado');
}

function dragEntersElement() {
  console.log('dragenter disparado');
}

function dragLeavesElement() {
  console.log('dragleaves disparado');
}

function dropElement() {
  console.log('drop disparado');
}

function addEventListenersToTasks(task) {
  task.addEventListener('dragover', dragOver);
  task.addEventListener('dragstart', dragStart);
  task.addEventListener('dragenter', dragEntersElement);
  task.addEventListener('dragleave', dragLeavesElement);
  task.addEventListener('drop', dropElement);
  task.draggable = 'true';
}

function addTaskOnTheList() {
  if (inputTaks.value) {
    const newTask = document.createElement('li');
    newTask.appendChild(createCheckbox());
    newTask.appendChild(createTaskText(inputTaks.value));
    newTask.appendChild(createInputEditTask());
    newTask.appendChild(createEditButton());
    newTask.appendChild(createRemoveButton());
    addEventListenersToTasks(newTask);
    taskList.appendChild(newTask);
    inputTaks.value = '';
  }
}

function pressEnterToAddTask(event) {
  if (event.key === 'Enter') {
    addTaskOnTheList();
  }
}

buttonAddTask.addEventListener('click', addTaskOnTheList);
inputTaks.addEventListener('keypress', pressEnterToAddTask);

function clearInputTask() {
  inputTaks.value = '';
}

function saveTasks() {
  localStorage.clear();
  const arrayListItems = taskList.children;
  localStorage.setItem('savedList', JSON.stringify(arrayListItems));
  console.log(arrayListItems);
}

buttonSaveTasks.addEventListener('click', saveTasks);

function loadSavedTasks() {
  const savedItems = JSON.parse(localStorage.getItem('savedList'));
  savedItems.forEach((task) => taskList.appendChild(task));
}

window.onload = () => {
  clearInputTask();
  if (localStorage.length !== 0) {
    loadSavedTasks();
  }
};
