document.addEventListener('DOMContentLoaded', function () {
const state = getStoredStateOrDefault({
counter: 40
})

const $incrButton = document.querySelector('.incr')
const $decrButton = document.querySelector('.decr')

const $gauge = document.querySelector('.gauge')
setGaugePercent($gauge, state.counter)

$incrButton.addEventListener('click', function() {
state.counter = Math.min(state.counter + 10, 100)
saveState(state)
setGaugePercent($gauge, state.counter)
})

$decrButton.addEventListener('click', function() {
state.counter = Math.max(state.counter - 10, 0)
saveState(state)
setGaugePercent($gauge, state.counter)
})
})

const addTaskBtn = document.querySelector('.form__button');
const descTaskInput = document.querySelector('.form__text');
const toDoWrapper = document.querySelector('.todo__container');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

function Task(description){
  this.description = description;
  this.completed = false;
}

const createTemplate = (task, index) => {
  return `
    <div class="todo__item" ${task.completed ? 'checked' : ''}>
    <div class="description">${task.description}</div>
      <div class="buttons">
        <input onclick="completedTask(${index})" class="btn__complete" type="checkbox" ${task.completed ? 'checked' : ''}>
        <button class="btn__delete">x</button>
      </div>
    </div>
  `
}

const fillHtmlList = () => {
  toDoWrapper.innerHTML = "";
    if(tasks.length > 0) {
      tasks.forEach((item, index) => {
        toDoWrapper.innerHTML += createTemplate(item, index); 
      })
  }
}

const updateLocal = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = index => {
  console.log(index);
  tasks[index].completed = !tasks[index].completed;
}

window.onload=function(){
  addTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(descTaskInput.value));
    updateLocal();
    fillHtmlList();
    descTaskInput.value = '';
  })
}