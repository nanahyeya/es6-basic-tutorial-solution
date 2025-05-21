## TodoList App

### index.html
```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>To Do List In JavaScript</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css"
    />
  </head>
  <body>
    <div id="app" class="container">
      <header>
        <div class="header">
          <h2>Todo-List</h2>
        </div>
        <div class="new-todo">
          <form id="todoform">
            <input
              type="text"
              name="newtodo"
              id="newtodo"
              placeholder="I will do ..."
            />
            <button type="submit">
              <i class="bi bi-plus-circle-fill"></i>
            </button>
          </form>
        </div>
      </header>
      <div id="todos-list">
        <!-- <div class="todo" id="0">
          <i class="bi bi-circle"></i>
          <i class="bi bi-check-circle-fill"></i>
          <p class="">Go get milk.</p>
          <i class="bi bi-pencil-square"></i>
          <i class="bi bi-trash"></i>
        </div> -->
      </div>
      <div class="notification"></div>
    </div>
    <script type="module" src="src/main.js"></script>
  </body>
</html>
```
<hr/>

### src/css/styles.css
```js
@import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swap');

:root {
  --container-height: 600px;
  --contaier-width: 400px;
  --header-height: 150px;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Ubuntu', monospace;
}
html {
  font-size: 20px;
}

body {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  background-color: rgb(237, 163, 67);
  width: var(--contaier-width);
  height: var(--container-height);

  position: relative;
  overflow: hidden;
}
header {
  width: 100%;
  height: var(--header-height);
  /* background-image: url('./img/bg.jpg'); */
  background-size: cover;
  border-radius: 5px 5px 0 0;
}
.header {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}
.new-todo {
  width: 100%;
  height: 50px;
  padding: 0.25rem 0;
}
.new-todo form {
  display: flex;
  align-items: center;
}
.new-todo form input {
  flex: 1;
  height: 40px;
  background-color: transparent;
  border: none;
  border-right: 0px;
  outline: transparent;
  padding-left: 0.5rem;
  font-size: 1rem;
  color: #fff;
}
.new-todo form button {
  width: 60px;
  height: 40px;
  font-size: 1rem;
  background-color: transparent;
  color: rgb(255, 247, 0);
  border: none;
  border-left: 0px;
  cursor: pointer;
}
.new-todo form button:hover {
  text-shadow: 1px 1px 20px rgba(0, 0, 0, 0.8);
}

#todos-list {
  height: calc(var(--container-height) - var(--header-height));
  background-color: #fff;
  padding: 0.5rem;
  border: 1px solid rgb(219, 219, 219);
  overflow: scroll;
  border-radius: 0 0 5px 5px;
}

#todos-list .todo {
  display: flex;
  align-items: center;
  padding: 0.75rem 0.5rem;
  border-radius: 5px;
}
#todos-list .todo:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
#todos-list .todo * {
  cursor: pointer;
  margin-right: 0.5rem;
}
#todos-list .todo i {
  font-size: 0.9rem;
}
#todos-list .todo p {
  flex: 1;
  word-break: break-all;
}
.checked {
  text-decoration: line-through;
  color: grey;
}
#todos-list .todo .bi-pencil-square {
  color: rgb(31, 177, 48);
}
#todos-list .todo .bi-trash {
  color: rgb(236, 82, 82);
  margin: 0;
}

.notification {
  position: absolute;

  width: calc(3 * var(--contaier-width) / 4);
  height: 60px;

  display: flex;
  justify-content: center;
  align-items: center;

  opacity: 0.9;

  border-radius: 8px;
  background-color: rgb(233, 81, 81);
  top: 10px;
  right: calc(-3 * var(--contaier-width) / 4);

  color: #fff;

  transition: 300ms right ease-in-out;
}

.notif-enter {
  right: 10px;
}
```
<hr/>

### src/main.js
```js

// SELECT ELEMENTS
const form = document.getElementById('todoform');
const todoInput = document.getElementById('newtodo');
const todosListEl = document.getElementById('todos-list');
const notificationEl = document.querySelector('.notification');

// VARS
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let EditTodoId = -1;

// 1st render
renderTodos(todoInput);

// FORM SUBMIT
form.addEventListener('submit', function (event) {
  event.preventDefault();

  saveTodo();
  renderTodos(todos, todosListEl);
  localStorage.setItem('todos', JSON.stringify(todos));
});

function saveTodo() {
  const todoValue = todoInput.value;

  // check if the todo is empty
  const isEmpty = todoValue === '';

  // check for duplicate todos
  const isDuplicate = todos.some((todo) => todo.value.toUpperCase() === todoValue.toUpperCase());

  if (isEmpty) {
    showNotification("Todo's input is empty");
  } else if (isDuplicate) {
    showNotification('Todo already exists!');
  } else {
    if (EditTodoId >= 0) {
      todos = todos.map((todo, index) => ({
        ...todo,
        value: index === EditTodoId ? todoValue : todo.value,
      }));
      EditTodoId = -1;
    } else {
      todos.push({
        value: todoValue,
        checked: false,
        color: '#' + Math.floor(Math.random() * 16777215).toString(16),
      });
    }
    todoInput.value = '';
  }
};

// RENDER TODOS
function renderTodos() {
  if (todos.length === 0) {
    todosListEl.innerHTML = '<center>Nothing to do!</center>';
    return;
  }

  // CLEAR ELEMENT BEFORE A RE-RENDER
  todosListEl.innerHTML = '';

  // RENDER TODOS
  todos.forEach((todo, index) => {
    todosListEl.innerHTML += `
    <div class="todo" id=${index}>
      <i 
        class="bi ${todo.checked ? 'bi-check-circle-fill' : 'bi-circle'}"
        style="color : ${todo.color}"
        data-action="check"
      ></i>
      <p class="${todo.checked ? 'checked' : ''}" data-action="check">${todo.value}</p>
      <i class="bi bi-pencil-square" data-action="edit"></i>
      <i class="bi bi-trash" data-action="delete"></i>
    </div>
    `;
  });
};

// CLICK EVENT LISTENER FOR ALL THE TODOS
todosListEl.addEventListener('click', (event) => {
  const target = event.target;
  const parentElement = target.parentNode;

  if (parentElement.className !== 'todo') return;

  // todo id
  const todo = parentElement;
  const todoId = Number(todo.id);

  // target action
  const action = target.dataset.action;
  action === 'check' && checkTodo(todos,todoId);
  action === 'edit' && editTodo(todoId);
  action === 'delete' && deleteTodo(todoId);
});

// CHECK A TODO
function checkTodo(todos,todoId) {
  todos = todos.map((todo, index) => ({
    ...todo,
    checked: index === todoId ? !todo.checked : todo.checked,
  }));

  renderTodos();
  localStorage.setItem('todos', JSON.stringify(todos));
}

// EDIT A TODO
function editTodo(todoId) {
  todoInput.value = todos[todoId].value;
  EditTodoId = todoId;
}

// DELETE TODO
function deleteTodo(todoId) {
  todos = todos.filter((todo, index) => index !== todoId);
  EditTodoId = -1;

  // re-render
  renderTodos();
  localStorage.setItem('todos', JSON.stringify(todos));
}

// SHOW A NOTIFICATION
function showNotification(msg) {  
  // change the message
  notificationEl.innerHTML = msg;

  // notification enter
  notificationEl.classList.add('notif-enter');

  // notification leave
  setTimeout(() => {
    notificationEl.classList.remove('notif-enter');
  }, 2000);
}

```